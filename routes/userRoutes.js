const express = require('express');
const UserController = require('./../app/Http/Controllers/UserController');
const Guard = require('./../app/Providers/GuardServiceProvider');
const validationMiddleware = require("../app/Http/Middleware/validation.middleware");
const  userValidation  = require("./../app/Http/Validations/user.validation");

const router = express.Router();

router.route('/')
    .get(
        Guard.authGuard,
        Guard.restrictToAdmin(),
        UserController.getAllUsers);

router.route('/:id')
    .patch(
        Guard.authGuard,
        validationMiddleware(userValidation.update),
        UserController.uploadUserPhoto,
        UserController.resizeUserPhoto,
        UserController.update
    );

router.route('/:id')
    .get(
        Guard.authGuard,
        Guard.restrictToOwnerOrAdmin(),
        UserController.getUser
    );

router.route('/:id')
    .delete(
        Guard.authGuard,
        Guard.restrictToOwnerOrAdmin(),
        UserController.delete
    );

router.route('/user-operation/set-active/:id')
    .patch(
        Guard.authGuard,
        Guard.restrictToAdmin(),
        validationMiddleware(userValidation.activeStatus),
        UserController.setUserActiveStatus
    );

router.route('/user-operation/set-admin/:id')
    .patch(
        Guard.authGuard,
        Guard.restrictToAdmin(),
        validationMiddleware(userValidation.adminStatus),
        UserController.setUserAdminStatus
    );


module.exports = router;