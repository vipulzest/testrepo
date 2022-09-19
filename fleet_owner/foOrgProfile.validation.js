const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

module.exports = { registerSchema }

function registerSchema(req, res, next) {

    const schema = Joi.object({
        title_gender: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        user_name: Joi.string().required(),
        country_code: Joi.string().required().valid('+1'),
        state_code: Joi.number().integer(3).max(999).required(),
        ph_numb: Joi.number().integer(7).max(999999999).required(),
        password: Joi.string().min(6).required(),
        terms_conditions_viewed: Joi.string().required(),
        acceptTerms: Joi.string().required(),



        terms_conditions_viewed: Joi.string().required().valid('Y', 'N'),
        employer_name: Joi.string().required(),
        employer_streetaddress: Joi.string().required(),
        employer_city: Joi.string().required(),
        employer_state: Joi.string().length(2).required(),
        employer_zipcode: Joi.string().required(),
        in_bus_since: Joi.string().required(),
        cdl_type: Joi.string().valid('CDL-A', 'Other'),
        min_drvr_exp: Joi.string().required(),
        trailer_types: Joi.string().required(),
        num_trucks: Joi.string().required(),
        employer_usdot: Joi.string().required(),
        user_role: Joi.string(),
        referral_code: Joi.string().allow(null, '').optional(),
        device_id: Joi.string().required(),
        push_token: Joi.string().required(),
        type: Joi.string().valid('android', 'ios'),
        create_date: Joi.date().raw().required(),
        create_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        create_timezone: Joi.string().required()




    });

    validateRequest(req, next, schema);
}