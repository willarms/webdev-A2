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
router.get('/', async (req, res) => {
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
router.get('/:postId', async (req, res) => {
    try {
        const post = Post.findById(req.params.postId)
        res.send(post)
    } catch(err) {
        res.send({message: err})
    }
})

// PUT /posts/:id -> update a post (only post creator can update)
router.put('/:postId', verifyToken, async (req, res) => {
    try {
        const updatePostById = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {
                title:req.body.title,
                description:req.body.description,
                createdBy: req.user._id 
            }}
        )
        res.send(updatePostById)
    } catch(err) {
        res.send({message: err})
    }
})

// DELETE /posts/:id -> delete a post (only post creator can delete)
router.delete('/:postId', verifyToken, async(req, res) => {
    try {
        const deletePostById = await Post.deleteOne(
            {_id: req.params.postId}
        )
        res.send(deletePostById)
    } catch(err) {
        res.send({message: err})
    }  
})


module.exports = router