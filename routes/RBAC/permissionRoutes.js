const express = require('express');
const PermissionController = require('./../../app/Http/Controllers/RBAC/PermissionController');
const Guard = require('./../../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        PermissionController.getAllPermissions)
    .post(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        PermissionController.createPermission);

router.route('/:id')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        PermissionController.getPermission)
    .patch(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        PermissionController.updatePermission)
    .delete(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        PermissionController.deletePermission);

module.exports = router;