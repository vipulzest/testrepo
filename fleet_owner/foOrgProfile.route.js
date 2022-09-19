const express = require('express');
const router = express.Router();
const { registerSchema } = require('./foOrgProfile.validation')
const { register } = require('./foOrgProfile.controller')

router.post('/register', registerSchema, register);

module.exports = router;