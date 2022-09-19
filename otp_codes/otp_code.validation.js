
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = { sendOtpSchema, verifyOtpSchema }

function sendOtpSchema(req, res, next) {

    const schema = Joi.object({
        user_name: Joi.string().required(),
        type: Joi.string().required()
    });

    validateRequest(req, next, schema);
}
function verifyOtpSchema(req, res, next) {

    const schema = Joi.object({
        token: Joi.string().required()
    });

    validateRequest(req, next, schema);
}
