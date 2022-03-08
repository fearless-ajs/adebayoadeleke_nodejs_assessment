const express = require('express');
const SystemController = require('./../app/Http/Controllers/SystemController');
const Guard = require('./../app/Providers/GuardServiceProvider');



const router = express.Router();

router.route('/')
    .get(SystemController.getSystemSettings)
    .patch(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator']),
        SystemController.uploadSystemImages,
        SystemController.resizeSystemImages,
        SystemController.initializeSystemSettings);

router.route('/:id')
    .get(SystemController.getSystemSettings)
    .delete(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator']),
        SystemController.deleteSystemSettings)
    // .patch(Guard.authGuard,
    //     Guard.restrictToRoles(['administrator', 'super-administrator']),
    //     SystemController.updateSystemSettings);


module.exports = router;