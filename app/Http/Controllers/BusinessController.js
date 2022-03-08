const filesystem = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../../Exceptions/catchAsync');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const BusinessModel = require('../../Models/Business');
const roleGuard = require('./RBAC/RoleUserController');

class BusinessController extends Controller{
    constructor() {
        super();
        this.multerStorage = multer.memoryStorage();
    }

    filterObj = (obj, ...allowedFields) => {
        const newObj = {};
        Object.keys(obj).forEach(el => {
            if (allowedFields.includes(el)) newObj[el] = obj[el];
        });
        return newObj;
    };

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

    //User Image Processing methods
    uploadBusinessBanner = this.upload.single('banner');

    resizeBusinessBanner = catchAsync(async (req, res, next) => {
        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(800, 200)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/uploads/images/businesses/${req.file.filename}`);

        next();
    });


    //Creates New Business Account
    createBusiness = catchAsync(async (req, res, next) => {
        req.body.user = req.user._id;
        req.body.banner = req.file.filename;
        const doc = await BusinessModel.create(req.body);

        //Attach Business Role to the user
        const role = await roleGuard.attachRoleWithName(req.user._id, 'business');

        res.status(201).json({
            status: 'success',
            data: {
                role: role,
                data: doc
            }
        });
    });

    //Returns the list of all Businesses
    getAllBusinesses = this.getAll(BusinessModel);

    //Returns The Business with the given Id
    getBusiness = this.getOne(BusinessModel);

    //Updates the business with the given Id
    updateBusiness = catchAsync(async (req, res, next) => {
        if (req.file){
            req.body.banner = req.file.filename;
        }
        //1.Verify if the account exists
        const account = await BusinessModel.findById(req.params.id);
        if (!account){
            if (req.file){
                await this.removeBusinessBanner(req.body.banner);
            }
            return next(new AppError('No business found with that id', 404));
        }

        //2.Verify if the current User Owns the account
        if (account.user._id.toString() !== req.user._id.toString()){
            if (req.file){
                await this.removeBusinessBanner(req.body.banner);
            }
            return next(new AppError('You are not Authorized to perform this update', 404));
        }

        //Fetch the old record
       const oldDoc = await BusinessModel.findById(req.params.id);

        // 3. Perform the Account update
        const doc = await BusinessModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //To return the updated version of the document
            runValidators: true // To validate inputs based on the Business schema
        });

        //If new one is supplied Delete the old file
        if (req.file){
            await this.removeBusinessBanner(oldDoc.banner);
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

    //Deletes the Business with given Id
    deleteBusiness = catchAsync(async (req, res, next) => {
        const doc = await BusinessModel.findByIdAndDelete(req.params.id);

        if(!doc){
            return next(new AppError('No document found with that ID', 404))
        }

        //Delete the business banner
        await this.removeBusinessBanner(doc.banner);

        res.status(202).json({ //204 means no data but i chose 202 because i need to show data
            status: 'success',
            message: "Document deleted"
        });
    });

    removeBusinessBanner = async (filename) => {
        await filesystem.unlink(`public/uploads/images/businesses/${filename}`, function (err) {
        });
    }

}
module.exports = new BusinessController;
