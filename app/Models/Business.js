const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator");

//Business Schema
const businessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User ObjectId must be supplied'],
        unique: [true, 'You are not allowed to have more than one business account'],
    },
    name: {
        type: String,
        unique: [true, 'The business name exists, please choose another name'],
        required: [true, 'Please supply your business Name'],
        trim: true,
        maxlength: [40, 'The business Name must not have than 40 characters'],
        minlength: [2, 'The business Name must have more than 2 characters']
    },
    slug: String,
    website: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'We need your business email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid business email']
    },
    banner: {
        type: String,
        required: [true, 'Business banner is required'],
        default: "business-banner.jpg"
    },
    phone: {
        type: String,
        required: [true, 'We need your business phone number'],
        trim: true,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    facebookPageLink: {
        type: String,
        required: false,
        lowercase: true,
    },
    twitterPageLink: {
        type: String,
        required: false,
        lowercase: true,
    },
    instagramPageLink: {
        type: String,
        required: false,
        lowercase: true,
    },
    address: {
        type: String,
        required: [true, 'Please we need an address for this brand'],
        maxlength: [200, 'The address must have less or equal than 200 characters'],
        minlength: [4, 'The address page link must have more or equal than 4 characters']
    },
    location: {
        //GeoJSON, For Geo Spacial Data, Data that describes location on the earth with longitude and latitude
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        //Array of numbers is expected  for the coordinates
        //It represents the coordinate point with longitude first followed by the latitude (reverse of the normal format)
        coordinates: [Number],
        address: String,
        description: String
    },
    city: {
        type: String,
        required: [true, 'Please supply your city'],
        maxlength: [20, 'The city must have less or equal than 20 characters'],
    },
    state: {
        type: String,
        required: [true, 'Please supply your state'],
        maxlength: [20, 'The state must have less or equal than 20 characters'],
    },
    country: {
        type: String,
        required: [true, 'Please supply your country'],
        maxlength: [20, 'The country must have less or equal than 20 characters'],
    },
    postcode: {
        type: Number,
        required: [true, 'we need your postal code to process packages'],
        // validate: [validator.isPostalCode, 'Please provide a valid postal code near you']
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    //to make virtual properties show up on object and JSON
    //Virtual Properties are Fields that are not saved in the database but calculated using other values
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// DOCUMENT MIDDLEWARE(PRE): runs before .save() and .create() except .insertMany()
// They work like mutators in laravel
businessSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});


businessSchema.pre('save', function (next) {
    if (!this.isModified() || this.isNew) return next();

    this.updatedAt = Date.now() - 1000; //Put at 1s in the past
    next();
});

businessSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'user',
        field: '-__v _id name email' //These are the fields we don't want
    }); //We use populate to make it return the ref values
    next();
});


module.exports = mongoose.model('Business', businessSchema);

