const mongoose = require('mongoose'),
    reqString = {type: String, required: true}

const socialmediaSchema = mongoose.Schema({
    user: reqString,
    date: {
        type: Number,
        required: true,
        default: Date.now()
    },
    image: reqString,
    title: reqString,
    data: reqString,
    name: reqString,
    likes: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('media', socialmediaSchema)