const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const { getAll, getById } = require('./phone_area_code.controller')


router.get('/getAll', getAll);
router.get('/:id', authorize(), getById);


module.exports = router;