const mongoose = require('mongoose');

/*
    | When permission was assigned to a user
 */
const permissionUserSchema = new mongoose.Schema({
    permission: {
        type: mongoose.Schema.ObjectId,
        ref: 'Permission',
        required: [true, 'Permission ObjectId must be supplied']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User ObjectId must be supplied']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
permissionUserSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'permission',
        select: '-__v -user -createdAt -updatedAt' //These are the fields we don't want
    }); //We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('PermissionUser', permissionUserSchema);