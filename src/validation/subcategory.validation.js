const Joi = require("joi");

const createSubcategory = {
  body: {
    category_id: Joi.string().required(),
    subcategory_name: Joi.string().required().trim(),
    subcategory_desc: Joi.string().required().trim(),
    isActive: Joi.boolean()
  }
}

const updateSubcategory = {
  body: {
    category_id: Joi.number(),
    subcategory_name: Joi.string().trim(),
    subcategory_desc: Joi.string().trim(),
    isActive: Joi.boolean()
  },
  params: {
    subcategoryId: Joi.string().required().trim()
  }
};

const deleteSubcategory = {
  params: {
    subcategoryId: Joi.string().required().trim()
  }
};


module.exports = {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
}