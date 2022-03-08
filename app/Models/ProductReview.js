const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product ObjectId must be supplied']
    },
    review: {
        type: String,
        required: [true, 'Review value missing'],
        maxlength: [500, 'Review should not be higher than 500 characters'],
        minlength: [1, 'Review should not be less than 1 character']
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

productReviewSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'buyer',
    }); //We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('ProductReview', productReviewSchema);