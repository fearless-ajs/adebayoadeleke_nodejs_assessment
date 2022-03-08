const express = require('express');
const UserController = require('./../app/Http/Controllers/UserController');
const Guard = require('./../app/Providers/GuardServiceProvider');


const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator', 'administrator']),
        UserController.getAllUsers);
router.route('/update-me')
    .patch(
        Guard.authGuard,
        UserController.uploadUserPhoto,
        UserController.resizeUserPhoto,
        UserController.updateMe
    );

router.route('/:id')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator', 'administrator']),
        UserController.getUser);

module.exports = router;