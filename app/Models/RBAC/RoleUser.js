const mongoose = require('mongoose');
/*
    | When role was assigned to a user
 */
const roleUserSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'Role',
        required: [true, 'Role ObjectId must be supplied']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User ObjectId must be supplied'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

roleUserSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'role',
        select: '-__v -user -createdAt -updatedAt' //These are the fields we don't want
    });
    // We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('RoleUser', roleUserSchema);