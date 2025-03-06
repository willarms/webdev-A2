const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req, res) => {
    // Validation 1 to check user input
    const {error} = (registerValidation(req.body))

    // check if error exists
    if (error) {
        res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists
    const userExists = await User.findOne({email:req.body.email})
    if (userExists) {
        return res.status(400).send({message: 'User already exists'})
    }

    // adding randomness to increase key complexity
    const salt = await bcryptjs.genSalt(5)
    // created hashed representation of password
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    // insert data
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

router.post('/login', async(req, res) => {
    // Validation 1 to check user input
    const {error} = (loginValidation(req.body))

    // check if error exists
    if (error) {
        res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists
    const user = await User.findOne({email:req.body.email})
    if (!user) {
        return res.status(400).send({message: 'User does not exist'})
    }

    // Validation 3 to see if password is correct --> need to decrypt first
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if (!passwordValidation) {
        return res.status(400).send({message: 'Password is wrong'})
    }

    // Generate auth-token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token': token})
})

module.exports=router