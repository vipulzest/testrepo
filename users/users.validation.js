const validateRequest = require('_middleware/validate-request');
const Joi = require('joi');
const Role = require('_helpers/role');

module.exports = {
    authenticateSchema,
    revokeTokenSchema,
    registerSchema,
    checkUsernameSchema,
    verifyEmailSchema,
    forgotPasswordSchema,
    validateResetTokenSchema,
    resetPasswordSchema,
    createSchema,
    updateSchema
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function registerSchema(req, res, next) {

    const schema = Joi.object({
        title_gender: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        user_name: Joi.string().required(),
        country_code: Joi.string().required().valid('+1'),
        state_code: Joi.string().required(),
        ph_numb: Joi.string().required(),
        password: Joi.string().min(6).required(),
        zip_code: Joi.string().required(),
        lat_of_zip_code: Joi.string().required(),
        long_of_zip_code: Joi.string().required(),
        terms_conditions_accepted: Joi.string().required(),
        terms_conditions_viewed: Joi.string().required(),
        us_work_6mth_auth: Joi.string().required(),
        cdl_type: Joi.string().valid('CDL-A', 'Other'),
        cdl_experience: Joi.string().required(),
        cdl_state: Joi.string().required(),
        cdl_doc_uploaded: Joi.string().required(),
        cdl_doc_id: Joi.number().valid(null, "").optional(),
        referral_code: Joi.string().allow(null, '').optional(),
        currently_employed: Joi.string().required(),
        trailer_type_2yrs: Joi.string().required(),
        cdl_exp_date: Joi.date().required(),
        device_id: Joi.string().required(),
        push_token: Joi.string().required(),
        type: Joi.string().valid('android', 'ios'),
        create_date: Joi.date().raw().required(),
        create_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        create_timezone: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function checkUsernameSchema(req, res, next) {

    const schema = Joi.object({
        user_name: Joi.string().required(),
    });

    validateRequest(req, next, schema);
}

function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(Role.Admin, Role.User).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    };

    // only admins can update role
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}