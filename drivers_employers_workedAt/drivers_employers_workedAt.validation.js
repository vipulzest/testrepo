const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = { register_step3_for_driver_schema }

function register_step3_for_driver_schema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        employer_name: Joi.string().required(),
        current_Employer: Joi.string().required(),
        employer_streetaddress: Joi.string().required(),
        employer_city: Joi.string().required(),
        employer_state: Joi.string().required(),
        employer_zipcode: Joi.string().required(),
        employer_orgcode: Joi.string().allow(null, '').optional(),
        date_joined: Joi.string().required()
    });
    validateRequest(req, next, schema);
}