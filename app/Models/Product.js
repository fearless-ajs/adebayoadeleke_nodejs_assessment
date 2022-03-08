const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require("validator");

//Product Schema
const productSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.ObjectId,
        ref: 'Business',
        required: [true, 'Business ObjectId must be supplied']
    },
    name: {
        type: String,
        unique: [true, 'The product name exists, please choose another name'],
        required: [true, 'Please supply your product Name'],
        trim: true,
        maxlength: [40, 'The product Name must not have than 40 characters'],
        minlength: [2, 'The product Name must have more than 2 characters']
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [40, 'The product brand must not have than 40 characters'],
      minlength: [2, 'The product brand must have more than 2 characters']
    },
    description: {
        type: String,
        required: [true, 'Please describe your product'],
        trim: true,
        maxlength: [4000, 'The product description must not have than 4000 characters'],
        minlength: [2, 'The product description must have more than 2 characters']
    },
    category: {
         type: String,
         required: [true, 'The product must belong to a category'],
         enum: {
                values: ['material', 'shoes', 'clothing', 'wears'], //Accepts values only between the supplied array
                message: 'Selected category is not available'
         },
    },
    price: {
        type: Number,
        required: [true, 'The product price is needed'],
    },
    discount: {
        type: Number,
        default: 0.00
    },
    stock: {
        type: Number,
        required: [true, 'The product price is required'],
    },
    slug: String,
    sizes: {
        type: [String],
        required: [true, 'Please supply the available sizes']
    },
    colors: {
        type: [String],
        required: [true, 'Please supply the available colors']
    },
    tags: [String],
    frontView: {
        type: String,
        required: [true, 'The product front view image is required'],
    },
    backView:{
        type: String,
        required: [true, 'The product back view image is required'],
    },
    leftView: {
        type: String
    },
    rightView: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    availability: {
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
}, {
    //to make virtual properties show up on object and JSON
    //Virtual Properties are Fields that are not saved in the database but calculated using other values
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

productSchema.pre('save', function (next) {
    if (!this.isModified() || this.isNew) return next();

    this.updatedAt = Date.now() - 1000; //Put at 1s in the past
    next();
});

productSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'business',
        select: '_id address name email phone user'
    }); //We use populate to make it return the ref values
    next();
});


module.exports = mongoose.model('Product', productSchema);