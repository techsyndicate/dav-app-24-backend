const router = require('express').Router(),
    bcrypt = require('bcrypt'),
    User = require('../models/users')

router.post('/', async (req, res) => {
    try {      
        const {email, password} = req.body
        if (!email || !password) {
            return res.json({success: false, message: "Please enter all the credentials!"})
        }
        const foundUser = await User.findOne({email: email})
        if (!foundUser) {
            return res.json({success: false, message: "No user with this email!"})
        }
        if (await bcrypt.compare(password, foundUser.password)) {
            return res.json({success: true, message: foundUser.id})
        } else {
            return res.json({success: false, message: "The password is incorrect!"})
        }
    } catch (error) {
        
    }
})

module.exports = router