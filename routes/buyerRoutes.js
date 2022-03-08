const express = require('express');
const BusinessController = require('./../app/Http/Controllers/BuyerController');
const Guard = require('./../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator']),
        BusinessController.getAllBuyers)
    .post(Guard.authGuard,
        BusinessController.createBuyer);

router.route('/:id')
    .get(Guard.authGuard, BusinessController.getBuyer)
    .delete(Guard.authGuard,
        BusinessController.deleteBuyer)
    .patch(Guard.authGuard,
        BusinessController.updateBuyer);


module.exports = router;