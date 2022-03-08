const filesystem = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../../Exceptions/catchAsync');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const ProductModel = require('../../Models/Product');
const BusinessModel = require('../../Models/Business');

class ProductController extends Controller{
    constructor() {
        super();
        this.multerStorage = multer.memoryStorage();
    }

    multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')){
            cb(null, true);
        }else {
            cb(new AppError('Not an image, please upload only images', 400), false);
        }
    }

    upload = multer({
        storage: this.multerStorage,
        fileFilter: this.multerFilter
    });

    uploadProductImages = this.upload.fields([
        { name: 'frontView', maxCount: 1 },
        { name: 'backView', maxCount: 1 },
        { name: 'leftView', maxCount: 1 },
        { name: 'rightView', maxCount: 1 },
    ]);

    resizeProductImages = catchAsync(async (req, res, next) => {

        if (req.files){
            // 1) FrontView Image
            if (req.files.frontView) {
                req.body.frontView = `product-${req.user._id}-${this.randomString(10)}-${Date.now()}-front-view.jpeg`;
                await sharp(req.files.frontView[0].buffer)
                    .resize(700, 700)
                    .toFormat('jpeg')
                    .jpeg({quality: 90})
                    .toFile(`public/uploads/images/products/${req.body.frontView}`);
            }

            // 2) BackView Image
            if (req.files.backView) {
                req.body.backView = `product-${req.user._id}-${this.randomString(10)}-${Date.now()}-back-view.jpeg`
                await sharp(req.files.backView[0].buffer)
                    .resize(700, 700)
                    .toFormat('jpeg')
                    .jpeg({quality: 90})
                    .toFile(`public/uploads/images/products/${req.body.backView}`);
            }

            // 3) LeftView Image
            if (req.files.leftView){
                req.body.leftView = `product-${req.user._id}-${this.randomString(10)}-${Date.now()}-left-view.jpeg`
                await sharp(req.files.leftView[0].buffer)
                    .resize(700, 700)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`public/uploads/images/products/${req.body.leftView}`);
            }
            //
            // // 4) RightView Image
            if (req.files.rightView) {
                req.body.rightView = `product-${req.user._id}-${this.randomString(10)}-${Date.now()}-right-view.jpeg`
                await sharp(req.files.rightView[0].buffer)
                    .resize(700, 700)
                    .toFormat('jpeg')
                    .jpeg({quality: 90})
                    .toFile(`public/uploads/images/products/${req.body.rightView}`);
            }
        }

        next();
    });

    //Creates New Business Account
    addProduct = catchAsync(async (req, res, next) => {
        //1.) Fetch the business id
        const business = await BusinessModel.findOne({user: req.user._id});

        //3.)  
        const doc = await ProductModel.create({
            business: business._id,
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            sizes: req.body.sizes,
            colors: req.body.colors,
            frontView: req.body.frontView,
            backView: req.body.backView,
            leftView: req.body.leftView,
            rightView: req.body.rightView,
        });

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

    //Returns the list of all Businesses
    getAllProducts = this.getAll(ProductModel);

    //Returns The Business with the given Id
    getProduct = this.getOne(ProductModel);

    //Updates the business with the given Id
    updateProduct = catchAsync(async (req, res, next) => {
        //1.Verify if the account exists
        const product = await ProductModel.findById(req.params.id);
        if (!product){
            await this.removeUnsavedUploadedProductImages(req);
            return next(new AppError('No product found with that id', 404));
        }

        //2.Verify if the current User Owns the account
        console.log(product.business.user);
        if (product.business.user._id.toString() !== req.user._id.toString()){
            await this.removeUnsavedUploadedProductImages(req);
            return next(new AppError('You are not Authorized to perform this update', 404));
        }

        //Fetch the old record
        const oldDoc = await ProductModel.findById(req.params.id);

        //3. Perform the Account update
        const doc = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //To return the updated version of the document
            runValidators: true // To validate inputs based on the Business schema
        });

        if (!doc){
            await this.removeUnsavedUploadedProductImages(req);
        }else {
            //If new version of any of the images is supplied Delete the old file
            if (req.files){
                await this.removeOldProductImages(req, oldDoc);
            }
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

    //Deletes the Product with given Id
    deleteProduct = catchAsync(async (req, res, next) => {
        const doc = await ProductModel.findByIdAndDelete(req.params.id);

        if(!doc){
            return next(new AppError('No document found with that ID', 404))
        }

        // * Delete Images
        await this.removeProductImage(doc.frontView);
        await this.removeProductImage(doc.backView);
        await this.removeProductImage(doc.leftView);
        await this.removeProductImage(doc.rightView);

        // * Delete Reviews

        // * Delete Ratings

        // * Detach Business role from user

        res.status(202).json({ //204 means no data but i chose 202 because i need to show data
            status: 'success',
            message: "Document deleted"
        });
    });

    removeUnsavedUploadedProductImages = async (req) => {
        if (req.files.frontView){await this.removeProductImage(req.body.frontView);}
        if (req.files.backView){await this.removeProductImage(req.body.backView);}
        if (req.files.leftView){await this.removeProductImage(req.body.leftView);}
        if (req.files.rightView){await this.removeProductImage(req.body.rightView);}
    }

    removeOldProductImages = async (req, oldProduct) => {
        if (req.files.frontView){await this.removeProductImage(oldProduct.frontView);}
        if (req.files.backView){await this.removeProductImage(oldProduct.backView);}
        if (req.files.leftView){await this.removeProductImage(oldProduct.leftView);}
        if (req.files.rightView){await this.removeProductImage(oldProduct.rightView);}
    }

    removeProductImage = async (filename) => {
        await filesystem.unlink(`public/uploads/images/products/${filename}`, function (err) {
        });
    }

}
module.exports = new ProductController;