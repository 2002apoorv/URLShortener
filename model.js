const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL);


const urlSchema=new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,       
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {     // stores the timestamp of when the URL was created
        type: Date,
        default: Date.now,
    },
    visited:{
        type: Number,
        default: 0
    }
})

const Url=mongoose.model("Url",urlSchema);

module.exports = {Url};
