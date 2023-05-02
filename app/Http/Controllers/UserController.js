const multer = require('multer');
const sharp = require('sharp');
const Controller = require('./Controller');
const User = require('./../../Models/User');
const catchAsync = require('./../../Exceptions/catchAsync');
const AppError = require('./../../Exceptions/appError');
const mongoose = require("mongoose");


class UserController extends Controller{
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
    uploadUserPhoto = this.upload.single('image');

    resizeUserPhoto = catchAsync(async (req, res, next) => {
        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(150, 150)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/uploads/images/${req.file.filename}`);

        next();
    });

    // Fetch All Users
    getAllUsers = this.getAll(User);

    getUser = catchAsync(async (req, res, next) => {
        let query = User.findById(req.params.id).select(['lastname', 'firstname', 'middlename', 'email', 'phone', 'active']);

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

    update = catchAsync(async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(
                new AppError(
                    'Invalid user id.',
                    422
                )
            );
        }
        // 1) Create error if user POSTs password data
        if (req.body.password) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = this.filterObj(req.body, 'lastname', 'middlename', 'firstname', 'image', 'email', 'phone');
        //For saving image name to user record
        if (req.file) filteredBody.image = req.file.filename;

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        });

        res.status(200).json({
            statusCode: 'SUCCESS',
            data: {
                user: updatedUser
            }
        });
    });

    setUserAdminStatus = catchAsync(async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(
                new AppError(
                    'Invalid user id.',
                    422
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = this.filterObj(req.body, 'is_admin');
        //For saving image name to user record


        const user = await User.findOne({ _id: req.params.id })
        console.log(user);
        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        });


        res.status(200).json({
            statusCode: 'SUCCESS',
            data: {
                user: updatedUser
            }
        });
    });

    setUserActiveStatus = catchAsync(async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(
                new AppError(
                    'Invalid user id.',
                    422
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = this.filterObj(req.body, 'active');
        //For saving image name to user record

        // 3) Update user document
        // console.log(req.params.id);
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, filteredBody, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            statusCode: 'SUCCESS',
            data: {
                user: updatedUser
            }
        });
    });

    delete = this.deleteOne(User);
}

module.exports = new UserController;