const Controller = require('./../Controller');
const Permission = require('../../../Models/RBAC/Permission');

class PermissionController extends Controller{
    constructor() {
        super();
    }

    //Creates New Permission
    createPermission = this.createOne(Permission);

    //Update Existing Permission
    updatePermission = this.updateOne(Permission);

    //Removes Permission
    deletePermission = this.deleteOne(Permission);

    //Fetch Permission with a given ID
    getPermission = this.getOne(Permission);

    //Fetch all Permission
    getAllPermissions = this.getAll(Permission);
}

module.exports = new PermissionController;