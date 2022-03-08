const express = require('express');
const UserController = require('./../app/Http/Controllers/UserController');
const AuthController = require('./../app/Http/Controllers/AuthController');

const router = express.Router()

router.route('/sign-up')
    .post(AuthController.signUp);

router.route('/sign-in')
    .post(AuthController.signIn);

router.route('/sign-out')
    .post(AuthController.logout);

router.route('/is-logged-in')
    .post(AuthController.isLoggedIn);

router.route('/reset-password')
    .post(AuthController.forgotPassword);

router.route('/reset-password/:token')
    .patch(AuthController.resetPassword);


module.exports = router;