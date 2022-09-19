
const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const { getAll, getById } = require('./cdl_type.controller')

router.get('/getAll', getAll);
router.get('/:id', authorize(), getById);


module.exports = router;