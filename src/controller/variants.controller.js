const Variants = require("../models/variants.model");

const createVariants = async (req, res) => {
  try {
    const variant = await Variants.create(req.body);

    if (!variant) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }

    return res.status(200).json({
      success: true,
      data: variant,
      message: 'Create Variant Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const listVariants = async (req, res) => {

  try {
    const variant = await Variants.find();

    if (!variant || variant.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Variants found'
      });
    }

    return res.status(200).json({
      success: true,
      data: variant,
      message: 'Variant List Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const updateVariants = async (req, res) => {
  try {
    const variantId = req.params.variantId;
    const bodyData = req.body;


    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: 'Variant ID is required'
      });
    }
    const variant = await Variants.findByIdAndUpdate(variantId, bodyData, { new: true });

    if (!variant) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }

    return res.status(200).json({
      success: true,
      data: variant,
      message: 'Update Variant Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const variantId = req.params.variantId;

    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: 'Variant Not Found'
      })
    }

    const variant = await Variants.findByIdAndDelete(variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: 'Variant Not Found'
      })
    }

    return res.status(200).json({
      success: true,
      data: variant,
      message: 'Delete Variant Successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
};

module.exports = {
  createVariants,
  listVariants,
  updateVariants,
  deleteVariant,
}