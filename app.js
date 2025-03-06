const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

// middleware
const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

// endpoints
app.get('/', (req, res) => {
    res.send('Piazza Homepage')
})
app.use('/api/posts', postRoute)
app.use('/api/user', authRoute)

// const MURL = 'mongodb+srv://warmswor:12345@cluster0.6fspo.mongodb.net/Piazza?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(MURL)

// using with callbacks (above) is no longer supported??
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTOR)
        console.log('DB is now connected')
    } catch (error) {
        console.error('DB connection error:', error)
    }
}

connectDB()

app.listen(3000, () => {
    console.log('Server is up and running...')
})