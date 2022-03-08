const Controller = require('./../Controller');
const Role = require('../../../Models/RBAC/Role');

class RoleController extends Controller{
    constructor() {
        super();
    }
    //Create a new Role
    createRole = this.createOne(Role);

    //Update Existing Role
    updateRole = this.updateOne(Role);

    //Removes Role
    deleteRole = this.deleteOne(Role);

    //Fetch Role with a given ID
    getRole = this.getOne(Role);

    //Fetch all Role
    getAllRoles = this.getAll(Role);

}

module.exports = new RoleController;