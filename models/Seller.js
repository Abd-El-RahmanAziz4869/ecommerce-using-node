const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeDescription: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});



const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
