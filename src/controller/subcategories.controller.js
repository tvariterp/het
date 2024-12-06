const Subcategories = require("../models/subcategories.model");
const { uploadFile } = require("../services/cloudinary");

const createSubcategories = async (request, response) => {
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

        const createSubcategory = await Subcategories.create({
            ...request.body,
            avatar
        });

        if (!createSubcategory) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            });
        }

        return response.status(200).json({
            success: true,
            data: createSubcategory,
            message: 'Subcategory Data Added Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};

const getSubcategories = async (request, response) => {
    try {
        const getSubcategory = await Subcategories.find();

        if (!getSubcategory) {
            return response.status(500).json({
                message: 'Internal Server Error!'
            })
        };

        return response.status(200).json({
            success: true,
            data: getSubcategory,
            message: 'Subcategory Data Get Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const updateSubcategory = async (request, response) => {
    try {
        const subcategoryId = request.params.subcategoryId;
        const subcategoryUpdates = request.body;

        if (!subcategoryId) {
            return response.status(400).json({
                success: false,
                message: 'Subcategory ID is required'
            });
        }

        const updatedCategory = await Subcategories.findByIdAndUpdate(subcategoryId, subcategoryUpdates, { new: true });

        if (!updatedCategory) {
            return response.status(404).json({
                success: false,
                message: 'Subcategory not found'
            });
        }

        return response.status(200).json({
            success: true,
            data: updatedCategory,
            message: 'Subcategory Data Update Successfully!'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const deleteSubcategory = async (request, response) => {
    try {
        const SubcategoryDelete = await Subcategories.findByIdAndDelete(request.params.subcategoryId);

        if (!SubcategoryDelete) {
            return response.status(404).json({
                success: false,
                message: 'Subcategory not found'
            });
        }

        return response.status(200).json({
            success: true,
            data: SubcategoryDelete,
            message: 'Subcategory Data Deleted Successfully!'
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

module.exports = {
    createSubcategories,
    getSubcategories,
    updateSubcategory,
    deleteSubcategory
}