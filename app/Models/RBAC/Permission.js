const mongoose = require('mongoose');

/*
    | Permission assigned to Users of the system and roles on the system
 */
const permissionSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'The permission must have a name'],
       trim: true,
       unique: true,
       maxlength: [40, 'Permission name must not have more than 40 characters'],
   },
    displayName: {
        type: String,
        required: [true, 'The permission must have a display name'],
        trim: true,
        maxlength: [40, 'Permission display name must not have more than 40 characters'],
    },
    description: {
        type: String,
        required: false,
        maxlength: [400, 'Permission display description must not have more than 400 characters'],
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

module.exports = mongoose.model('Permission', permissionSchema);