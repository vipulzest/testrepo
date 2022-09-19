const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const { getAll, getById, register_step3_for_driver } = require('./drivers_employers_workedAt.controller')
const { register_step3_for_driver_schema } = require('./drivers_employers_workedAt.validation')

router.get('/getAll', getAll);
router.get('/:id', authorize(), getById);
router.post('/register_step3_for_driver', register_step3_for_driver_schema, register_step3_for_driver);


module.exports = router;