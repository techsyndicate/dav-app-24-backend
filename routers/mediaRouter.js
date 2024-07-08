const router = require('express').Router(),
    Media = require('../models/socialMedia')

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
        const newMedia = new Media({
            user: foundUser.email
        })
    } catch (error) {
        return res.json({success: false, message: "There was an error."})
    }
})

module.exports = router