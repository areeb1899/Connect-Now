const express = require("express");


const {allMessages,sendMessage} = require("../controllers/messageControllers");
const { authorizedUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(authorizedUser, allMessages);
router.route("/").post(authorizedUser, sendMessage);

module.exports = router;