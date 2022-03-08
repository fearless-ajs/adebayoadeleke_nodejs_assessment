const express = require('express');
const RoleController = require('./../../app/Http/Controllers/RBAC/RoleController');
const Guard = require('./../../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        RoleController.getAllRoles)
    .post(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        RoleController.createRole);

router.route('/:id')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        RoleController.getRole)
    .patch(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        RoleController.updateRole)
    .delete(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator']),
        RoleController.deleteRole);

module.exports = router;