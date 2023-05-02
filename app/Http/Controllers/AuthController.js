const crypto = require('crypto');
const { promisify } = require('util');
const jwt  = require('jsonwebtoken');
const catchAsync = require('./../../Exceptions/catchAsync');
const AppError = require('./../../Exceptions/appError');
const sendEmail = require('./../../../utils/email');
const AuthServiceProvider = require('./../../Providers/AuthServiceProvider');
const User = require('./../../Models/User');
const multer = require("multer");
const sharp = require("sharp");
const Email = require("../../../utils/Email");

class AuthController extends AuthServiceProvider{

    constructor() {
        super();
        this.isAuthorized = false;
        this.isPermitted = false;
        this.multerStorage = multer.memoryStorage();
    }

    filterObj = (obj, ...allowedFields) => {
        const newObj = {};
        Object.keys(obj).forEach(el => {
            if (allowedFields.includes(el)) newObj[el] = obj[el];
        });
        return newObj;
    };


    multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')){
            cb(null, true);
        }else {
            cb(new AppError('Not an image, please upload only images', 400), false);
        }

    }

    upload = multer({
        storage: this.multerStorage,
        fileFilter: this.multerFilter
    });

    //User Image Processing methods
    uploadUserPhoto = this.upload.single('image');

    resizeUserPhoto = catchAsync(async (req, res, next) => {
        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(150, 150)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/uploads/images/${req.file.filename}`);

        next();
    });


    signUp = catchAsync(async (req, res, next) => {
        // Check if email exist
        const user = await User.findOne({ email: req.body.email });
        if (user){
            return next(new AppError('Email taken', 409));
        }

        const newUser = await User.create({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            image: req.file?req.file.filename:null
        });

        // Check for image upload

        //Sign the user in with Jwt token and send response
        // Regular RoleId  = 614de5afaab0093d00d9cd4b, PermissionId for view-product = 61538fc45cc87d3378467d79
        await this.createSendToken(newUser, 201, res);
    });

    signIn = catchAsync(async (req, res, next) => {
        const {email, password} = req.body;

        //1.) Check if the user exists and the password is correct
        const user = await User.findOne({ email: email }).select('+password');

        //2.) If everything is ok, send client the token
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect Email or password', 401));
        }

        //Sign the user in with Jwt token and send response
       await this.createSendToken(user, 200, res);

    });

    isLoggedIn =async (req, res, next) => {
        await res.status(200).json({
            statusCode: 'SUCCESS',
            data: req.user
        });
        // await this.createSendToken(req.user, 200, res);
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
        // 1) Get user based on POSTed email
        const user = await User.findOne({ email: req.body.email, active: true });
        if (!user) {
            return next(new AppError('There is no active user with email address.', 404));
        }

        // 2) Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // 3) Send it to user's email
        try {
            // const resetURL = `${req.protocol}://${req.get(
            //     'host'
            // )}/api/v1/users/resetPassword/${resetToken}`;


            const resetURL = `${process.env.PRODUCTION_URL}/choose-password/${resetToken}`;
            await new Email(user, resetURL).sendPasswordReset();

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            });
        } catch (err) {
            // user.passwordResetToken = undefined;
            // user.passwordResetExpires = undefined;
            // await user.save({ validateBeforeSave: false });

            return next(
                new AppError(err),
                500
            );
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