const catchAsync = require('./../../Exceptions/catchAsync');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const OrderModel = require('../../Models/Order');
const OrderedProductModel = require('../../Models/OrderedProduct');
const BuyerModel = require('../../Models/Buyer');
const roleGuard = require('./RBAC/RoleUserController');

class OrderController extends Controller{
    constructor() {
        super();

        this.checkoutId = false;
        this.totalCost = null;
        this.orderedProducts = [];

        this.errorStatus = false;
        this.errorMessage = null;
    }

    processPayment = () => {

    }

    // Check for an empty Object
    isEmptyObject = (obj) => {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }

    validateOrderDetails = (req, res, next) => {
        // 1. Needs an array of products, check if it is supplied
        if (!req.body.products){
            this.errorStatus = true;
            this.errorMessage = "Please supply the products for checkout as an array of Object";
            return;
        }

        //1b. Check if the data sent is an array
        if (!Array.isArray(req.body.products)){
            this.errorStatus = true;
            this.errorMessage = "Please supply the products for checkout as an array of Object";
            return;
        }

        //1c. Check if its an empty array
        if (typeof req.body.products !== 'undefined' && req.body.products.length === 0){
            this.errorStatus = true;
            this.errorMessage = "Please supply the products for checkout as an array of Object";
            return;
        }

        //1d. Check if product object is empty in the array of products
        req.body.products.every(product => {
            if (this.isEmptyObject(product)) {
                this.errorStatus = true;
                this.errorMessage = "A product has an empty body";
                return false;
            }
            // Make sure you return true. If you don't return a value, `every()` will stop.
            return true;
        });

    }

    createOrder = catchAsync(async (req, res, next) => {
        //1. Validate Order details before processing
       this.validateOrderDetails(req, res, next);
       if (this.errorStatus){
           return next(new AppError(this.errorMessage, 400))
       }

        //2.) Process payment
        const buyer = BuyerModel.findOne({user: req.user._id});
        // 3. Generate Checkout Id for the products
        if (!this.checkoutId){
           this.checkoutId = `${req.user._id}_${this.randomString(50)}_${Date.now()}`;
        }

        //4. Loop through each of the product and assign the same checkoutId
        new Promise((resolve, reject) => {
            req.body.products.forEach(product => {
                const prod = OrderedProductModel.create({
                    checkoutId: this.checkoutId,
                    product: product._id,
                    quantity: product.quantity,
                    color: product.color,
                    size: product.size,
                    price: product.price
                });
                //Accumulates cost of items
                this.totalCost += product.price;
                //Save product ID in an array for Order record
                this.orderedProducts.push(prod._id);
            });
        });

        //5. Create the order record with the list of ordered products and save to the database
        const order = await OrderModel.create({
            checkoutId: this.checkoutId,
            orderedProducts: this.orderedProducts,
            totalPrice: this.totalCost,
            buyer: buyer._id,
            status: req.body.status
        });

        res.status(201).json({
            status: 'success',
            data: {
                order: order
            }
        });
    });

    //Get All orders
    getAllOrders = this.getAll(OrderModel);

    //Get all checkouts


    //Get orders with checkout_id
    getCheckout = catchAsync(async (req, res, next) => {
        let query = OrderModel.find({ checkoutId: req.params.checkout_id });
        const doc  = await query;
        // Tour.findOne({ _id: req.params.id });

        if(!doc){
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            }
        })
    });

    //Remove orders with checkout_id
    removeCheckout = catchAsync(async (req, res, next) => {
        const doc = await OrderModel.find({ checkoutId: req.params.checkout_id }).remove();

        if(!doc){
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(202).json({ //204 means no data but i chose 202 because i need to show data
            status: 'success',
            message: "Document deleted"
        });
    });


}
module.exports = new OrderController;