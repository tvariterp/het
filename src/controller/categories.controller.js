const CategoriesModels = require("../models/categories.model");
const { uploadFile } = require("../services/cloudinary");

const createCategories = async (request, response) => {
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

        const createCategory = await CategoriesModels.create({
            ...request.body,
            avatar
        });

        if (!createCategory) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }

        return response.status(200).json({
            success: true,
            data: createCategory,
            message: 'Category Data Added Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};

const getCategories = async (request, response) => {
    try {
        const GetCategory = await CategoriesModels.find();

        if (!GetCategory) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            })
        };

        return response.status(200).json({
            success: true,
            data: GetCategory,
            message: 'Category Data Get Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

const updateCategories = async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const categoryUpdates = request.body;

        console.log(categoryId, categoryUpdates)

        if (!categoryId) {
            return response.status(400).json({
                success: false,
                message: 'Category ID is required'
            });
        }

        const updatedCategory = await CategoriesModels.findByIdAndUpdate(categoryId, categoryUpdates, { new: true });

        if (!updatedCategory) {
            return response.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        return response.status(200).json({
            success: true,
            data: updatedCategory,
            message: 'Category Data Update Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

const deleteCategories = async (request, response) => {
    try {
        const categoryDelete = await CategoriesModels.findByIdAndDelete(request.params.categoryId);

        if (!categoryDelete) {
            return response.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        return response.status(200).json({
            success: true,
            data: categoryDelete,
            message: 'Category Data Deleted Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

module.exports = {
    createCategories,
    getCategories,
    updateCategories,
    deleteCategories
}