const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        max: 100
    },
    description:{
        type: String,
        required: true,
        max: 500
    },
    likes:{
        type: Number,
        default: 0
    },
    createdBy:{
        // need a "reference to the User model" -> figure out what this is
        // required: true
    }
})

module.exports = mongoose.model('posts', postSchema)