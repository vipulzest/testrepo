const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const zipCode = require('./zip_code.service');

// routes

router.get('/getAll', getAll);
router.get('/:id', authorize(), getById); ``


module.exports = router;


function getAll(req, res, next) {
    zipCode.getAll()
        .then((items) => {
            if (items) {
                res.json({ status: 200, 'items': items }); // send 200 response if record found
            } else {
                res.json({ status: 404, 'message': 'No records found' });
            }
        })
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own user and admins can get any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    zipCode.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}