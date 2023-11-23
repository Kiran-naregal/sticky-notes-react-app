const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.mongoURI;

const connectToMongo = async() => {
    mongoose.connect(mongoURI,)
    .then (() => {
        console.log(`Connect to BD`);
    })
}

module.exports = connectToMongo;