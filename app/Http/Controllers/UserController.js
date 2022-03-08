const multer = require('multer');
const sharp = require('sharp');
const Controller = require('./Controller');
const User = require('./../../Models/User');
const catchAsync = require('./../../Exceptions/catchAsync');
const AppError = require('./../../Exceptions/appError');
const RoleUser = require('./../../Models/RBAC/RoleUser');
const PermissionUser = require('./../../Models/RBAC/PermissionUser');

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
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/uploads/images/users/${req.file.filename}`);

        next();
    });

    // Fetch All Users
    getAllUsers = this.getAll(User);

    getUser = catchAsync(async (req, res, next) => {
        let query = User.findById(req.params.id).select(['name', 'email', 'phone', 'active',  'createdAt', 'updatedAt']);

        const doc  = await query;
        // Tour.findOne({ _id: req.params.id });

        if(!doc){
            return next(new AppError('No document found with that ID', 404))
        }

        //Fetch user Roles also
        const roles = await RoleUser.find({user: doc._id}).select('-__v');

        //Fetch user Permissions
        const permissions = await PermissionUser.find({user: doc._id}).select('-__v');

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
            roles: roles,
            permissions
        })
    });

    updateMe = catchAsync(async (req, res, next) => {
        // 1) Create error if user POSTs password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = this.filterObj(req.body, 'name', 'phone');
        //For saving image name to user record
        if (req.file) filteredBody.image = req.file.filename;

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    });

}

module.exports = new UserController;