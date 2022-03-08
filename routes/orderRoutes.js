const express = require('express');
const OrderController = require('./../app/Http/Controllers/OrderController');
const Guard = require('./../app/Providers/GuardServiceProvider');


const router = express.Router();
router.route('/')
    .get()
    .post(
        Guard.authGuard,
        Guard.restrictToRoles(['buyer', 'administrator', 'super-administrator']),
        OrderController.createOrder
    );

router.route('/checkout/:checkout_id')
    .get(
        Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'buyer', 'super-administrator']),
        OrderController.getCheckout
    )
    .delete(
      Guard.authGuard,
      Guard.restrictToRoles(['administrator', 'super-administrator']),
      OrderController.removeCheckout
    );

module.exports = router;