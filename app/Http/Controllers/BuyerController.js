const catchAsync = require('./../../Exceptions/catchAsync');
// const factory = require('./../../Providers/FactoryServiceProvider');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const BuyerModel = require('../../Models/Buyer');
const roleGuard = require('./RBAC/RoleUserController');

class BuyerController extends Controller{
    constructor() {
        super();
    }

    //Creates New Business Account
    createBuyer = catchAsync(async (req, res, next) => {
        req.body.user = req.user._id
        const doc = await BuyerModel.create(req.body);

        //Attach Business Role to the user
        const role = await roleGuard.attachRoleWithName(req.user._id, 'buyer');

        res.status(201).json({
            status: 'success',
            data: {
                role:role,
                data: doc
            }
        });
    });

    //Returns the list of all Businesses
    getAllBuyers = this.getAll(BuyerModel);

    //Returns The Business with the given Id
    getBuyer = this.getOne(BuyerModel);

    //Updates the business with the given Id
    updateBuyer = catchAsync(async (req, res, next) => {
        //1.Verify if the account exists
        const account = await BuyerModel.findById(req.params.id);
        if (!account){
            return next(new AppError('No business found with that id', 404));
        }

        //2.Verify if the current User Owns the account
        if (account.user._id.toString() !== req.user._id.toString()){
            return next(new AppError('You are not Authorized to perform this update', 404));
        }

        //3. Perform the Account update
        const doc = await BuyerModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //To return the updated version of the document
            runValidators: true // To validate inputs based on the Business schema
        });

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

    //Deletes the Business with given Id
    deleteBuyer = this.deleteOne(BuyerModel);

}
module.exports = new BuyerController;