const { promisify } = require('util');
const jwt  = require('jsonwebtoken');
const catchAsync = require('./../Exceptions/catchAsync');
const AppError = require('./../Exceptions/appError');
const AuthServiceProvider = require('./AuthServiceProvider');
const User = require('./../Models/User');

class GuardServiceProvider extends AuthServiceProvider{
    constructor() {
        super();
        this.isAuthorized = false;
        this.isPermitted = false;
    }

    authGuard = catchAsync( async (req, res, next) => {
        //1. Getting token and check if it's there
        let token;
        if(
            req.headers.authorization  &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1]
        }else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        if (!token){
            return next(new AppError('You are not logged in! Please log in to gain access', 401));
        }

        //2. Verify the token
        //Error coming from here has been handled globally via errorController
        const decoded  = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // returns the token user data

        //3. Check if the user still exist
        const currentUser  = await User.findById(decoded.id);
        if (!currentUser){
            return next(new AppError('The user belonging to this token does not exist'));
        }

        //4. Check if user changed password after the token was issued
        //Will return true if user changed password after authentication token is issued
        if(currentUser.changedPasswordAfter(decoded.iat)){
            return next(new AppError('User recently changed password! Please login again', 401));
        }

        //GRANT ACCESS TO PROTECTED ROUTES
        const permissions = this.userPermissions(currentUser._id);
        const roles = this.userRoles(currentUser._id);
        req.user = currentUser; //This user details will be useful in the future
        req.user.roles = roles; //This user roles will be useful in the future
        req.user.permissiona = permissions; //This user permissions will be useful in the future
        next();

    });


    //We cannot pass argument to a middleware so we wrap it in another function
    // that returns the middleware
    restrictToRoles = (roles) => {
        return async (req, res, next) => {
            let authorizedRoles = [...roles];
            const userRoles = await this.userRoles(req.user._id);

            userRoles.forEach(role => {
                if (authorizedRoles.includes(role.role.name)){
                    this.isAuthorized = true;
                }
            });
            if (!this.isAuthorized){
                return next(
                    new AppError('Your are not authorized to perform this action', 403)
                );
            }
            next();
        };
    };

    //We cannot pass argument to a middleware so we wrap it in another function
    // that returns the middleware
    restrictToPermissions = (permissions) => {
        return async (req, res, next) => {
            let authorizedPermissions = [...permissions];
            const userPermissions = await this.userPermissions(req.user._id);

            userPermissions.forEach(permission => {
                this.isPermitted = authorizedPermissions.includes(permission.permission.name);
            });
            if (!this.isPermitted){
                return next(
                    new AppError('Your are not permitted to perform this action', 403)
                );
            }
            next();
        };
    };

}


module.exports = new GuardServiceProvider;