const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authorizedUser = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find user by token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.send(400)
            throw new Error("Not Authorized, token failed")
        }
    }
    if(!token){
        res.status(400)
         throw new Error("Not Authorized, no token")
    }
})


module.exports = {authorizedUser};