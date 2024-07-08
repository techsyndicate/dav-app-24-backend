const router = require('express').Router(),
    User = require('../models/users'),
    bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {     
        const {fname, lname, email, password, cnfpassword} = req.body
        if (!fname || !lname || !email || !password || !cnfpassword) {
            return res.json({success: false, message: "Please fill all the credentials!"})
        }
        if (password != cnfpassword) {
            return res.json({success: false, message: "The passwords don't match!"})
        }
        const foundUser = await User.findOne({email: email})
        if (foundUser) {
            return res.json({success: false, message: "A user already exists with this email!"})
        }
        const hashedPwd = await bcrypt.hash(password, 10)
        const newUser = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPwd
        })
        await newUser.save()
        return res.json({success: true, message: newUser.id})
    } catch (error) {
        return res.end({success: false, message: "An error occured. Please try again."})
    }
})

module.exports = router