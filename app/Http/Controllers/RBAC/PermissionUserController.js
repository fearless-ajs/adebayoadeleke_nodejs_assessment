const Controller = require('./../Controller');
const catchAsync = require('./../../../Exceptions/catchAsync');
const PermissionUser = require('../../../Models/RBAC/PermissionUser');
const Permission = require('../../../Models/RBAC/Permission');


class PermissionUserController extends Controller{
    constructor() {
        super();
    }

    //
    attachPermission = async (user, permission) => {
        //Check if role name exist
        let doc = await Permission.findById(permission);
        if (!doc){
            console.log(doc);
            return false
        }

        //Add the user with the role to the record
        await PermissionUser.create({
            user,
            permission
        });
        return true;
    };
}
module.exports = new PermissionUserController;