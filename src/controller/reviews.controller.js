const Reviews = require("../models/reviews.model");

const createReviews = async (req, res) => {
  try {
    const review = await Reviews.create(req.body);

    if (!review) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    return res.status(200).json({
      success: true,
      data: req.body,
      message: 'Create Review Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const listReviews = async (req, res) => {

  try {
    const review = await Reviews.find();

    if (!review || review.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Review found'
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
      message: 'Get Review List Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const updateReviews = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewUpdates = req.body;

    if (!reviewId) {
      return res.status(400).json({
        success: false,
        message: 'Review ID is required'
      });
    }

    const updatedReview = await Reviews.findByIdAndUpdate(reviewId, reviewUpdates, { new: true });

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedReview,
      message: 'Update Review Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const deleteReviews = async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'review Not Found'
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
      message: 'review deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  createReviews,
  listReviews,
  updateReviews,
  deleteReviews,
}