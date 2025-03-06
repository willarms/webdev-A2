// Selecting data (posts) from database to show to user

const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// POST /posts -> create a post (requires authentication)
router.post('/', verifyToken, async (req, res) => {
    const postData = new Post({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id
    })
    
    try {
        const postToSave = await postData.save()
        res.send(postToSave)
    } catch(err) {
        res.status(400).send({message: err})
    }
})

// GET /posts -> get all posts (publicly available)
// with verify token ->
// get all posts
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

// GET /posts/:id -> publicly available

// PUT /posts/:id -> update a post (only post creator can update)

// DELETE /posts/:id -> delete a post (only post creator can delete)



module.exports = router