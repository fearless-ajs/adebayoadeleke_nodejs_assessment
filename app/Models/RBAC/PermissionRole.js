const mongoose = require('mongoose');

/*
    | When permission was assigned to a role
 */
const permissionRoleSchema = new mongoose.Schema({
    permission: {
        type: mongoose.Schema.ObjectId,
        ref: 'Permission',
        required: [true, 'Permission ObjectId must be supplied']
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'Role',
        required: [true, 'Role ObjectId must be supplied']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('PermissionRole', permissionRoleSchema);