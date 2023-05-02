const express = require('express');
const AuthController = require('./../app/Http/Controllers/AuthController');
const validationMiddleware = require("../app/Http/Middleware/validation.middleware");
const  userValidation  = require("./../app/Http/Validations/user.validation");
const Guard = require('./../app/Providers/GuardServiceProvider');
const router = express.Router()

router.route('/register')
    .post(
        validationMiddleware(userValidation.register),
        AuthController.uploadUserPhoto,
        AuthController.resizeUserPhoto,
        AuthController.signUp
    );

router.route('/login')
    .post(
        validationMiddleware(userValidation.login),
        AuthController.signIn
    );

router.route('/logout')
    .post(AuthController.logout);

router.route('/me')
    .post(
        Guard.authGuard,
        AuthController.isLoggedIn
    );

router.route('/reset-password')
    .post(
        validationMiddleware(userValidation.resetPassword),
        AuthController.forgotPassword
    );

router.route('/choose-new-password/:token')
    .patch(
        validationMiddleware(userValidation.updatePassword),
        AuthController.resetPassword
    );


module.exports = router;