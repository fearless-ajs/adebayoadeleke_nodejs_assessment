const mongoose = require('mongoose');

const orderedProductSchema = new mongoose.Schema({
   checkoutId: { //For grouping orders
     type: String,
     required: [true, 'We need a  checkout Id for this order']
   },
    product: {
       type: mongoose.Schema.ObjectId,
       ref: 'Product',
       required: [true, 'Product ObjectId must be supplied']
   },
    quantity: {
        type: Number,
        required: [true, 'Please supply quantity']
    },
    color: {
        type: String,
        required: [true, 'Please supply color']
    },
    size: {
        type: String,
        required: [true, 'Please supply the size']
    },
    price: {
        type: Number,
        required: [true, 'Please supply the total price']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

orderedProductSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'product',
        select: '_id, name'
    }); //We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('OrderedProduct', orderedProductSchema);
