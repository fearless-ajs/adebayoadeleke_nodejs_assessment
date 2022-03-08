const catchAsync = require('./../../Exceptions/catchAsync');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const ProductRating = require('../../Models/ProductRating');
const roleGuard = require('./RBAC/RoleUserController');

class ProductRatingController extends Controller{
    
    addRating = catchAsync(async (req, res, next) => {
       //1.) Check if the user is a buyer of the product


        const doc = ProductRating.create({

       });

    });

}
module.exports = new ProductRatingController;