const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator");

/*
    | Role assigned to Users of the system
 */
const roleSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'The role must have a name'],
       trim: true,
       unique: true,
       maxlength: [40, 'Role name must not have more than 40 characters'],
   },
    displayName: {
        type: String,
        required: [true, 'The role must have a display name'],
        trim: true,
        maxlength: [40, 'Role display name must not have more than 40 characters'],
    },
    description: {
        type: String,
        required: false,
        maxlength: [400, 'Role display description must not have more than 400 characters'],
    },
    createdAt: {
       type: Date,
       default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Role', roleSchema);