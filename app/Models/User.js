const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

    userSchema = new mongoose.Schema({
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        middlename: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            trim: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        phone: {
            type: String,
            required: [true, 'We need a phone number '],
            trim: true,
            validate: [validator.isMobilePhone, 'Please provide a valid phone number']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false //Prevents the password field from showing in any output
        },
        image: {
            type: String,
            default: "user-avatar.jpg"
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
        },
        is_admin: {
            type: Boolean,
            default: false,
        }
    });

    // Hash the password whenever it it updated
userSchema.pre('save', async function (next) {
    //Only runs this function if password is modified
    if (!this.isModified('password')) return next();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Now we remove the confirm password field so it won't be saved in the database
    this.passwordConfirm = undefined;
    next();
});

//Updates the passwordChangedAt field whenever the password is updated
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; //Put at 1s in the past because of async action behaviour
    next();
});

// Returns only active users during queries
userSchema.pre(/^find/, function (next) {
    // This points to the current query
    this.find({ active: { $ne: false } }); //Returns documents only with active field equal to 2
    next();
});

//Compare supplied password with existing password for authentication
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    //False means Not Changed
    return false;
}

//Generates password reset token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    //Hashing the reset token before being saved to the database
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    //Sets the token expiry time to 10mins
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};


module.exports = mongoose.model('User', userSchema);