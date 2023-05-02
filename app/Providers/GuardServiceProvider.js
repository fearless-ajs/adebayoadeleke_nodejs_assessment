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


        //GRANT ACCESS TO PROTECTED ROUTES
        req.user = currentUser; //This user details will be useful in the future
        next();

    });


    //We cannot pass argument to a middleware so we wrap it in another function
    // that returns the middleware
    restrictToAdmin = () => {
        return async (req, res, next) => {
            if (!req.user.is_admin){
                return next(
                    new AppError('Your are not authorized to perform this action', 403)
                );
            }
            next();
        };
    };

    restrictToOwnerOrAdmin = () => {
        return async (req, res, next) => {
            if (!req.user.is_admin && !(req.params._id === req.user._id)){
                return next(
                    new AppError('Your are not authorized to perform this action', 403)
                );
            }
            next();
        };
    };

}


module.exports = new GuardServiceProvider;