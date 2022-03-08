const filesystem = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../../Exceptions/catchAsync');
const Controller = require('./Controller');
const SystemModel = require('../../Models/System');

class SystemController extends Controller{
    //Restrict this route to the admin and Super Admin Only
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

    uploadSystemImages = this.upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
    ]);

    resizeSystemImages = catchAsync(async (req, res, next) => {

        if (req.files){
            // 1) IconImage
            if (req.files.icon) {
                req.body.icon = `system-${this.randomString(30)}-${Date.now()}-icon.png`;
                await sharp(req.files.icon[0].buffer)
                    .resize(128, 128)
                    .toFormat('png')
                    .png()
                    .toFile(`public/uploads/images/system/${req.body.icon}`);
            }

            // 2) Favicon Image
            if (req.files.favicon) {
                req.body.favicon = `system-${this.randomString(30)}-${Date.now()}-favicon.png`;
                await sharp(req.files.favicon[0].buffer)
                    .resize(128, 128)
                    .toFormat('png')
                    .png()
                    .toFile(`public/uploads/images/system/${req.body.favicon}`);
            }
        }

        next();
    });

    removeSystemImage = async (filename) => {
        await filesystem.unlink(`public/uploads/images/system/${filename}`, function (err) {
        });
    }

    //Creates if not exist otherwise update
    initializeSystemSettings = catchAsync(async (req, res, next) => {
        //Check if settings Exist, then update
       // const settings = await SystemModel.find({$query: {}, $orderby: {$natural : -1}}).sort({_id:-1}).limit(1);
       const settings = await SystemModel.findOne().sort({ createdAt: 1 });
       let newSettings = null;

        if (settings) {
                //Remove old files, if new one supplied
                if (req.files){
                    // Delete old favicon if supplied
                    if (req.files.favicon) {await this.removeSystemImage(settings.favicon);}
                    // Delete old icon if supplied
                    if (req.files.icon) {await this.removeSystemImage(settings.icon);}
                }

                // Update Settings
                newSettings = await SystemModel.findByIdAndUpdate(settings._id, req.body, {
                    new: true, //To return the updated version of the document
                    runValidators: true, // To validate inputs based on the System schema
                    useFindAndModify: false
                });
        }else {
            newSettings = await SystemModel.create(req.body);
        }

        res.status(201).json({
            status: 'success',
            data: {
                 settings: newSettings
            }
        });
    });

    //Returns all system settings
    getAllSystemSettings = this.getAll(SystemModel);

    //Returns one system settings
    getSystemSettings = catchAsync(async (req, res, next) => {
        const settings = await SystemModel.findOne().sort({ createdAt: 1 });
        //Check if settings Exist, then update
        return res.status(200).json({
            status: 'success',
            data: {
                settings
            }
        });
    });

    //Updates system settings
    updateSystemSettings = this.updateOne(SystemModel);

    //Delete System settings
    deleteSystemSettings = this.deleteOne(SystemModel);

}
module.exports = new SystemController;