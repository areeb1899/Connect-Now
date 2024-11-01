const express = require('express');
const router = express.Router();
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { authorizedUser } = require('../middlewares/authMiddleware');


router.route('/').post(registerUser).get(authorizedUser, allUsers)
router.post('/login', authUser)




module.exports = router;