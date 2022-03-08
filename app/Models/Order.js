const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   checkoutId: { //For grouping orders
     type: String,
     required: [true, 'We need a  checkout Id for this order']
   },
    orderedProducts: {
       type: [mongoose.Schema.ObjectId],
       ref: 'OrderedProduct',
       required: [true, 'Ordered Products ObjectIds must be supplied']
   },
    totalPrice: {
        type: Number,
        required: [true, 'Please supply the total price']
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Buyer',
        required: [true, 'Buyer ObjectId must be supplied']
    },
    status: {
       type: String,
       enum: ['Pending', 'Cancelled', 'Fulfilled', 'Progress'],
       default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

orderSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'buyer',
        select: '_id, name email'
    }); //We use populate to make it return the ref values
    next();
});

orderSchema.pre(/^find/, function (next) { //This fires whenever any query command with find is encountered
    this.populate({
        path: 'orderedProducts',
        // select: '_id, name'
    }); //We use populate to make it return the ref values
    next();
});

module.exports = mongoose.model('Order', orderSchema);
