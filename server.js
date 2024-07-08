require('dotenv').config()

const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    cors = require('cors')

const loginRouter = require('./routers/loginRouter')
const regRouter = require('./routers/regRouter')
const mediaRouter = require('./routers/mediaRouter')

app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res) => {
    res.end('Server running')
})
app.use('/login', loginRouter)
app.use('/register', regRouter)
app.use('/media', mediaRouter)
app.get('/testapi', (req, res) => {
    const path = require('path')
    return res.sendFile(path.join(__dirname, 'test.html'))
})

mongoose.connect(process.env.MONGO_URI, console.log('MONGO CONNECTED'))

app.listen(PORT, console.log(`DAV APP listening on port ${PORT}`))