const crypto = require('crypto');
const { promisify } = require('util');
const jwt  = require('jsonwebtoken');
const catchAsync = require('./../../Exceptions/catchAsync');
const AppError = require('./../../Exceptions/appError');
const sendEmail = require('./../../../utils/email');
const AuthServiceProvider = require('./../../Providers/AuthServiceProvider');
const roleGuard = require('./RBAC/RoleUserController');
const permissionGuard = require('./RBAC/PermissionUserController');
const RoleUser = require('./../../Models/RBAC/RoleUser');
const Role = require('./../../Models/RBAC/Role');
const PermissionUser = require('./../../Models/RBAC/PermissionUser');
const User = require('./../../Models/User');

class AuthController extends AuthServiceProvider{
    constructor() {
        super();
        this.isAuthorized = false;
        this.isPermitted = false;
    }

    signUp = catchAsync(async (req, res, next) => {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
        //Attach Role to the user
        const role = roleGuard.attachRole(newUser._id, '614de5afaab0093d00d9cd4b');

        //Return Error if role note found
        if(!role){
            //Remove the created User data
            await User.findByIdAndDelete(newUser._id);
            return next(new AppError(`No role found with that name`, 404))
        }

        const permission = permissionGuard.attachPermission(newUser._id, '61538fc45cc87d3378467d79');
        if (!permission){
            //Remove the created User data
            await roleGuard.detachRole(newUser._id, '61538fc45cc87d3378467d79');
            await User.findByIdAndDelete(newUser._id);
            return next(new AppError(`No permission found with that id`, 404))
        }

        //Sign the user in with Jwt token and send response
        // Regular RoleId  = 614de5afaab0093d00d9cd4b, PermissionId for view-product = 61538fc45cc87d3378467d79
        await this.createSendToken(newUser, '614de5afaab0093d00d9cd4b', '61538fc45cc87d3378467d79',201, res);
    });

    signIn = catchAsync(async (req, res, next) => {
        const {email, password} = req.body;

        //1.) Check if email and password exist in the sent body
        if (!email || !password){
            return next(new AppError('Please provide email and password', 400))
        }

        //2.) Check if the user exists and the password is correct
        const user = await User.findOne({ email: email }).select('+password');

        //3.) If everything is ok, send client the token
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect Email or password', 401));
        }

        //Sign the user in with Jwt token and send response
       await this.createSendToken(user, undefined, undefined,200, res);

    });

    isLoggedIn =async (req, res, next) => {
        if (req.cookies.jwt) {
            try {
                if (req.cookies.jwt === 'logged_out'){
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You have logged out already'
                    });
                }

                // 1) verify token
                const decoded = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    process.env.JWT_SECRET
                );

                // 2) Check if user still exists
                const currentUser = await User.findById(decoded.id);
                if (!currentUser) {
                    return next();
                }

                // 3) Check if user changed password after the token was issued
                if (currentUser.changedPasswordAfter(decoded.iat)) {
                    return next();
                }

                // THERE IS A LOGGED IN USER
                // RETURN THE USER TO THE FRONT-END
               this.permission = await PermissionUser.find({user: currentUser._id}).select(['-_id', 'permission'])
               this.role = await RoleUser.find({user: currentUser._id}).select(['-_id', 'role'])

                const user = currentUser._doc;
                return res.status(200).json({
                    status: 'success',
                    user: {
                        ...user
                    },
                    roles: this.role,
                    permissions: this.permission
                });
            } catch (err) {
                return res.status(401).json({
                    status: 'fail',
                    error: err,
                });
            }
        }

        return res.status(400).json({
            status: 'fail',
            error: {
                message: 'You are Not logged In, Mission Token!'
            }
        });
    };

   logout = (req, res) => {
        res.cookie('jwt', 'logged_out', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    };


    forgotPassword = catchAsync(async (req, res, next) => {
        //1. Get user based on Posted email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new AppError('There is no user with the email address', 404))
        }

        //2. Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        //3. Send it to user's email
        const resetURL = `${req.protocol}://${req.get('host'
        )}/api/v1/users/resetPassword/${resetToken}`;

        const message = `Forgot your password? Submit a patch 
       request with your new password and passwordConfirm to
       : ${resetURL}.\n If you didn't forget your password please ignore
       this email!`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset token (Valid for 10min)',
                message
            });

            res.status(200).json({
                status: 'Success',
                message: 'Token sent to email'
            });

        }catch (err) {
            console.log(err);
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new AppError('There was an error sending the email, try again later', 500));
        }


    });

    resetPassword = catchAsync( async (req, res, next) => {
    // 1) Get user based on the token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } //And time is in the future
        });

        //2) If token has not expired and there is a user, set the new password
        if (!user){
            return next(new AppError('Token is invalid or expired', 400));
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        //3) update changePasswordAt property for the user
        //4) Log the user in, send JWT
        //Sign the user in with Jwt token and send response
        await this.createSendToken(user, 200, res);

    });

    //For already logged in user
   updatePassword = catchAsync(async (req, res, next) => {
        // 1) Get user from collection
        const user = await User.findById(req.user.id).select('+password');

        // 2)Check if the posted current password is correct
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))){
            return next(new AppError('Your current password is wrong', 401));
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        //User.findBuIdAndUpdate will not work as intended(Validation and pre middleware will not wrk)

        // 4) Log user in, send JWT
        //Sign the user in with Jwt token and send response
        this.createSendToken(user, 200, res);
    });


}


module.exports = new AuthController;