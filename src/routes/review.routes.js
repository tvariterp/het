const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { reviewValidation } = require('../validation/validation_index');
const { reviewController } = require('../controller/controller_index');

// {
//   "_id": 50,
//   "user_id": 1,
//   "product_id": 1,
//   "rating": 4.2,
//   "comment": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
// }
router.post('/create-review',
  validate(reviewValidation.createReview),
  reviewController.createReviews
);

router.get('/list-review',
  reviewController.listReviews
);

router.put('/update-review/:reviewId',
  validate(reviewValidation.updateReview),
  reviewController.updateReviews
);

router.delete('/delete-review/:reviewId',
  validate(reviewValidation.deleteReview),
  reviewController.deleteReviews
);

module.exports = router;