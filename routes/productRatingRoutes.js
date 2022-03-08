const express = require('express');
const ProductRatingController = require('./../app/Http/Controllers/ProductRatingController');
const Guard = require('./../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get()
    .post(
      Guard.authGuard,
      Guard.restrictToRoles(['buyer']),
      ProductRatingController.addRating
    );

module.exports = router;