const Joi = require('joi');

const createCategory = {
    body: {
        category_name: Joi.string().required().trim(),
        category_desc: Joi.string().required().trim(),
        // category_image: Joi.string().required().trim(),
        isActive: Joi.boolean()
    }
}
const updateCategory = {
    body: {
        // category_image: Joi.string().trim(),
        category_name: Joi.string().trim(),
        category_desc: Joi.string().trim(),
        isActive: Joi.boolean()
    },
    params: {
        categoryId: Joi.string().required().trim()
    }
};

const deleteCategory = {
    params: {
        categoryId: Joi.string().required().trim()
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}