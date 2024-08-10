const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config()

const mongoURI = process.env.CONNECTION_URL;

const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURI)
        console.log('Mongo connected')
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;