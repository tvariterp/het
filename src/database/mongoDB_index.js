require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_DATABASE)
            .then(() => {
                console.log("* MongoDB Database connected successfully!!");
            })
            .catch((error) => console.log(error.message));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectMongoDatabase;