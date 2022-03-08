const express = require('express');
const ProductController = require('./../app/Http/Controllers/ProductController');
const Guard = require('./../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(ProductController.getAllProducts)
    .post
    (Guard.authGuard,
      Guard.restrictToRoles(['super-administrator', 'administrator', 'business']),
      ProductController.uploadProductImages,
      ProductController.resizeProductImages,
      ProductController.addProduct
    );

router.route('/:id')
    .get(ProductController.getProduct)
    .patch(Guard.authGuard,
        Guard.restrictToRoles(['super-administrator', 'administrator', 'business']),
        ProductController.uploadProductImages,
        ProductController.resizeProductImages,
        ProductController.updateProduct
     )
    .delete (Guard.authGuard,
        Guard.restrictToRoles(['super-administrator', 'administrator', 'business']),
        ProductController.deleteProduct
    );


module.exports = router;