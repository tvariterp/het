const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { subcategoryValidation } = require('../validation/validation_index');
const { subcategoryController } = require('../controller/controller_index');
const upload = require('../services/upload');

router.post('/create-subcategory',
    upload.array('avatar', 12),
    validate(subcategoryValidation.createSubcategory),
    subcategoryController.createSubcategories
)

router.get('/get-subcategory',
    subcategoryController.getSubcategories
)

router.put('/update-subcategory/:subcategoryId',
    validate(subcategoryValidation.updateSubcategory),
    subcategoryController.updateSubcategory
)

router.delete('/delete-subcategory/:subcategoryId',
    validate(subcategoryValidation.deleteSubcategory),
    subcategoryController.deleteSubcategory
)

module.exports = router;