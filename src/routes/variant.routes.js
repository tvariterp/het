const express = require('express');
const validate = require('../middleware/validate');
const { variantValidation } = require('../validation/validation_index');
const { variantController } = require('../controller/controller_index');
const router = express.Router();

// {
//   "_id": 50,
//   "product_id": 1,
//   "attributes": {
//     "Color": "Red",
//     "Size": "5GB",
//     "Price": 999.99,
//     "Quantity": 50
//   },
//   "isActive": false
// }
router.post('/create-variant',
  validate(variantValidation.createVariant),
  variantController.createVariants
);

router.get('/list-variant',
  variantController.listVariants
);

router.put('/update-variant/:variantId',
  validate(variantValidation.updateVariant),
  variantController.updateVariants
);

router.delete('/delete-variant/:variantId',
  validate(variantValidation.deleteVariant),
  variantController.deleteVariant
);

module.exports = router;