const express = require('express');
const router = express.Router();
const validate = require("../middleware/validate");
const { productValidation } = require('../validation/validation_index');
const upload = require('../services/upload');
const { productController } = require('../controller/controller_index');

router.post('/create-product',
    upload.array('avatar', 12),
    validate(productValidation.createProduct),
    productController.createProduct
);

router.get('/list-product',
    productController.getProduct
)

router.put('/update-product/:productId',
    validate(productValidation.updateProduct),
    productController.putProduct
)

router.delete('/delete-product/:productId',
    validate(productValidation.deleteProduct),
    productController.deleteProduct
)

module.exports = router;