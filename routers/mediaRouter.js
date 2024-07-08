const router = require('express').Router(),
    Media = require('../models/socialMedia'),
    User = require('../models/users.js')

router.post('/create', async (req, res) => {
    try {
        const {userid, title, data, image} = req.body
        if (!userid || !title || !data || !image) {
            return res.json({success: false, message: "Please enter all the values!"})
        }
        const foundUser = await User.findById(userid)
        if (!foundUser) {
            return res.json({success: false, message: "Invalid user! Please login again."})
        }
        const response = await axios.post('https://api.imgur.com/3/upload', {
            image: image,
            }, {
                headers: {
                    Authorization: `Client-ID ${process.env.IMGUR_ID}`,
                },
            });
        const newMedia = new Media({
            user: foundUser.email,
            title: title,
            data: data,
            image: response.data.data.link
        })
        return res.json({success: true, message: response.data.data.link})
    } catch (error) {
        return res.json({success: false, message: "There was an error. Please login again."})
    }
})

router.post('/get', async (req, res) => {
    try {
        const {id, userid} = req.body
        if (!id || !userid) {
            return res.json({success: false, message: "Please provide all the details."})
        }
        const foundUser = await User.findById(userid)
        if (!foundUser) {
            return res.json({success: false, message: 'Invalid user. Please login again.'})
        }
        const foundMedia = await Media.findById(id)
        if (!foundMedia) {
            return res.json({success: false, message: "Invalid media post. Please try again."})
        }
        const mediaUser = await User.findById(foundMedia.user)
        return res.json({success: true, message: {
            user: mediaUser.email,
            date: new Date(foundMedia.date).toLocaleString('en-IN'),
            image: foundMedia.image,
            title: foundMedia.title,
            data: foundMedia.data
        }})
    } catch (error) {
        return res.json({success: false, message: 'There was an error. Please login again.'})
    }
})

router.post('/myposts', async (req, res) => {
    try {
        const {userid} = req.body
        if (!id) return res.json({success: false, message: "Invalid user. Please login again."})
        const foundMedia = await Media.findOne({user: userid})
        if (!foundMedia) return res.json({success: false, message: "No posts found."})
        return res.json({success: true, message: {
            image: foundMedia.image,
            user: foundMedia.user,
            title: foundMedia.title,
            data: foundMedia.data,
            date: new Date(foundMedia.date).toLocaleString('en-IN')
        }})     
    } catch (error) {
        return res.json({success: false, message: "There was an error. Please login again."})
    }
})

router.post('/getallposts', async (req, res) => {
    try {
        const allPosts = await Media.find().sort({date: 'desc'})
        if (!allPosts) {
            return res.json({success: false, message: "No posts found."})
        }
        return res.json({success: true, message: allPosts})
    } catch (error) {
        return res.json({success: false, message: "There was an error. Please login again."})
    }
})

module.exports = router