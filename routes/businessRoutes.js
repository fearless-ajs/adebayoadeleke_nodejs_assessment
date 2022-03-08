const express = require('express');
const BusinessController = require('./../app/Http/Controllers/BusinessController');
const Guard = require('./../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator']),
        BusinessController.getAllBusinesses)
    .post(
        Guard.authGuard,
        BusinessController.uploadBusinessBanner,
        BusinessController.resizeBusinessBanner,
        BusinessController.createBusiness
    );

router.route('/:id')
    .get(Guard.authGuard, BusinessController.getBusiness)
    .delete(Guard.authGuard,
        BusinessController.deleteBusiness)
    .patch(
        Guard.authGuard,
        BusinessController.uploadBusinessBanner,
        BusinessController.resizeBusinessBanner,
        BusinessController.updateBusiness);


module.exports = router;