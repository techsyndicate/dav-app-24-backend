const mongoose = require('mongoose'),
    reqString = {type: String, required: true}

const userSchema = mongoose.Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    password: reqString
})

module.exports = mongoose.model('user', userSchema)