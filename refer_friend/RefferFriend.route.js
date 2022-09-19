const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const { sendReferFriend } = require('./RefferFriend.controller')
const { referFriendSchema } = require('./RefferalFriend.validation')

router.post('/refer_friend', referFriendSchema, authorize(), sendReferFriend);

module.exports = router;