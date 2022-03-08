const Controller = require('./../Controller');
const catchAsync = require('./../../../Exceptions/catchAsync');
const RoleUser = require('../../../Models/RBAC/RoleUser');
const Role = require('../../../Models/RBAC/Role');


class RoleUserController extends Controller{
    constructor() {
        super();
    }

    //
    attachRole = async (user, role) => {
        //Check if role name exist
        let doc = await Role.findById(role);
        if (!doc){
            console.log(role);
            return false
        }

        //Add the user with the role to the record
        await RoleUser.create({
            user,
            role
        });
        return true;
    };

    attachRoleWithName = async (user, roleName) => {
        //Check if role name exist
        let role = await Role.findOne({name: roleName});
        if (!role){
            return false
        }
        console.log(role._id);

        //Add the user with the role to the record
        await RoleUser.create({
            user: user,
            role: role._id
        });
        return role.name;
    };

    detachRole = async (user, role) => {
        let doc = await Role.findById(role);
        if (!doc){
            console.log(role);
            return false
        }

        //Detach the role from the user
       const roleUser = await RoleUser.findOneAndDelete({ role: role, user: user })
       if (roleUser){
           return true;
       }else {
           return -1;
       }
    }
}
module.exports = new RoleUserController;