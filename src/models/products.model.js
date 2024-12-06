const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true
    },

    subcategory_id: {
        type: mongoose.Types.ObjectId,
        ref: 'subcategories',
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    color: {
        type: String,
        required: true,
        trim: true
    },

    weight: {
        type: Number,
        required: true,
        trim: true
    },

    sizesAndStocks: [{
        size: {
            type: String,
            required: true,
            trim: true
        },
        stock: {
            type: Number,
            required: true
        }
    }],

    price: {
        type: Number,
        required: true,
        trim: true
    },

    mrp: {
        type: Number,
        required: true,
        trim: true
    },

    sku: {
        type: Number,
        required: true,
        trim: true
    },

    material: {
        type: String,
        required: true,
        trim: true
    },

    sleeves: {
        type: String,
        required: true,
        trim: true
    },

    topfit: {
        type: String,
        required: true,
        trim: true
    },

    neck: {
        type: String,
        required: true,
        trim: true
    },

    print: {
        type: String,
        required: true,
        trim: true
    },

    peacenum: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    avatar: [{
        public_id: String,
        url: String,
        originalname: String
    }],

    isActive: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;