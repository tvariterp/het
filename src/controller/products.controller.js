const Products = require("../models/products.model");
const { uploadFile } = require("../services/cloudinary");

const createProduct = async (request, response) => {
    try {
        const files = request.files;
        if (!files || files.length === 0) {
            return response.status(400).json({ message: 'No files uploaded!' });
        }

        const uploadPromises = files.map(file => uploadFile(file.path));
        const uploadResults = await Promise.all(uploadPromises);

        const avatar = uploadResults.map((result, index) => ({
            public_id: result.public_id,
            url: result.url,
            originalname: files[index].originalname
        }));

        const createProducts = await Products.create({
            ...request.body,
            avatar
        });

        if (!createProducts) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }

        return response.status(200).json({
            success: true,
            data: createProducts,
            message: 'Product Data Added Successfully!'
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

const getProduct = async (request, response) => {
    try {
        const GetProduct = await Products.find();

        if (!GetProduct) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            })
        };

        return response.status(200).json({
            success: true,
            data: GetProduct,
            message: 'Product Data Get Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const putProduct = async (request, response) => {
    try {
        const productId = request.params.productId;
        const ProductUpdates = request.body;

        if (!productId) {
            return response.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        if (!ProductUpdates || Object.keys(ProductUpdates).length === 0) {
            return response.status(400).json({
                success: false,
                message: 'Product update data is required'
            });
        }

        const updatedProduct = await Products.findByIdAndUpdate(productId, ProductUpdates, { new: true });

        if (!updatedProduct) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return response.status(200).json({
            success: true,
            data: updatedProduct,
            message: 'Product Data Updated Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!',
            error: error.message
        });
    }
}

const deleteProduct = async (request, response) => {
    try {
        const productId = request.params.productId;
        const ProductDelete = await Products.findByIdAndDelete(productId);
        if (!ProductDelete) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        return response.status(200).json({
            success: true,
            data: ProductDelete,
            message: 'Product Data Deleted Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

module.exports = {
    createProduct,
    getProduct,
    putProduct,
    deleteProduct
}