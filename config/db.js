const mongoose = require("mongoose");
const color = require("colors");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Connected to DB ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`mongodb database eror ${error}`.bgRed.cyan);
    }
}

module.exports = connectDB;