const express = require('express');
const { authorizedUser } = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatControllers');


const router = express.Router();

router.route('/').post(authorizedUser,accessChat);
router.route('/').get(authorizedUser,fetchChats);
router.route('/group').post(authorizedUser,createGroupChat);
router.route('/rename').put(authorizedUser,renameGroup);
router.route('/groupadd').put(authorizedUser,addToGroup);
router.route('/groupremove').put(authorizedUser,removeFromGroup);


module.exports = router;