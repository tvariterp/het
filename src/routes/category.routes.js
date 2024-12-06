const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { categoryValidation } = require('../validation/validation_index');
const { categoryController } = require('../controller/controller_index');
const upload = require('../services/upload');

router.post('/create-category',
    upload.array('avatar', 12),
    validate(categoryValidation.createCategory),
    categoryController.createCategories
);

router.get('/list-category',
    categoryController.getCategories
)

router.put('/update-category/:categoryId',
    validate(categoryValidation.updateCategory),
    categoryController.updateCategories
)

router.delete('/delete-category/:categoryId',
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategories
)

module.exports = router;