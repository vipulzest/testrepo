const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
module.exports = {
    referFriendSchema
}

function referFriendSchema(req, res, next) {

    const schema = Joi.object({
        receiver_first_name: Joi.string().required(),
        receiver_ph_num_part1: Joi.string().required(),
        receiver_ph_num_part2: Joi.number().integer(3).max(999).required(),
        receiver_ph_num_part3: Joi.number().integer(7).max(9999999).required(),
        referral_sent_date: Joi.date().raw().required(),
        referral_sent_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
        referral_sent_timezone: Joi.string().required(),
    });

    validateRequest(req, next, schema);
}