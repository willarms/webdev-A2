// Selecting data (posts) from database to show to user

const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// with verify token ->
router.get('/', verifyToken, async (req, res) => {
// without verify token ->
// router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch(err) {
        res.status(400).send({message: err})
    }
})

module.exports = router