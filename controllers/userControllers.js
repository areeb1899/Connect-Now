const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        throw new Error('Please fill in all fields')
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed to create the user")
    }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Correctly destructuring email and password from the request body
    const user = await User.findOne({ email }); // Finding user by email

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id) 
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});


module.exports = { registerUser, authUser };