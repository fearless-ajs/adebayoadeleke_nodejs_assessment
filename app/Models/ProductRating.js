const mongoose = require('mongoose');

const productRatingSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product ObjectId must be supplied']
    },
    rating: {
        type: Number,
        required: [true, 'Rating value missing'],
        maxlength: [5, 'Rating should not be higher than 5'],
        minlength: [1, 'Rating should not be less than 1']
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Buyer',
        required: [true, 'Buyer ObjectId must be supplied']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

productRatingSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'buyer',
        select: '_id, name email'
    }); //We use populate to make it return the ref values
    next();
});

productRatingSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'product',
        select: '_id, name'
    }); //We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('ProductRating', productRatingSchema);