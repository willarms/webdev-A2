const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min:3,
        max:256 // ask about "properly formatted" email
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:1024    // make sure this is "properly formatted" password
    }
})

module.exports = mongoose.model('users', userSchema)