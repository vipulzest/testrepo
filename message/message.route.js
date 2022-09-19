const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const { sendMessageSchema } = require('./message.validation')
const { getAll, getById, sendMessage } = require('./message.controller')

router.get('/getAll', getAll);
router.get('/:id', authorize(), getById);
router.post('/send_message', sendMessageSchema, sendMessage);

module.exports = router;