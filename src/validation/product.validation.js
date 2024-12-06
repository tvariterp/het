const Joi = require('joi');

const createProduct = {
    body: {
        category_id: Joi.string().required(),
        subcategory_id: Joi.string().required(),
        sku: Joi.number().required(),
        sizesAndStocks: Joi.array().items(
            Joi.object({
                size: Joi.string().required(),
                stock: Joi.number().required()
            })
        ).required(),
        name: Joi.string().required().trim(),
        color: Joi.string().required(),
        weight: Joi.number().required(),
        price: Joi.number().required(),
        mrp: Joi.number().required(),
        description: Joi.string().required(),
        material: Joi.string().required(),
        sleeves: Joi.string().required(),
        topfit: Joi.string().required(),
        neck: Joi.string().required(),
        print: Joi.string().required(),
        peacenum: Joi.string().required(),
        isActive: Joi.boolean()
    }
}

const getProduct = {
    body: Joi.object().keys()
}

const deleteProduct = {
    params: {
        productId: Joi.string().required().trim()
    }
}

const updateProduct = {
    params: {
        productId: Joi.string().required().trim()
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
}