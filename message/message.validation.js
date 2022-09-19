
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = { sendMessageSchema }

function sendMessageSchema(req, res, next) {

    const schema = Joi.object({
        user_name: Joi.string().required(),
        submitted_form_type: Joi.string().valid('C', 'F', 'H').required(),
        user_email: Joi.string().required(),
        form_submission_message: Joi.string().required(),
        form_submission_date: Joi.date().raw().required(),
        form_submission_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        form_submission_timezone: Joi.string().required()
    });

    validateRequest(req, next, schema);
}