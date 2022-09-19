const Role = require('_helpers/role');
const userService = require('./user.service');
const contentService = require('./content.service');
const moment = require('moment');


module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    checkUsername,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    get_terms_condition,
    create,
    update,
    _delete

}

function authenticate(req, res, next) {

    const { user_name, password } = req.body;
    const ipAddress = req.ip;
    userService.authenticate({ user_name, password, ipAddress })
        .then(({ refreshToken, ...user }) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    userService.refreshToken({ token, ipAddress })
        .then(({ refreshToken, ...user }) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

function revokeToken(req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}

function register(req, res, next) {
    userService.register(req.body, req.get('origin'))
        .then((response) => {
            return res.send(response);
            // res.json({ userId: userId, message: 'Registration successful, please check your email for verification instructions' })
        })
        .catch(next);
}

function checkUsername(req, res, next) {
    userService.getByUsername(req.body, req.get('origin'))
        .then((response) => res.json((response === true) ? { status: 200, message: 'Username is valid' } : { status: 412, message: 'Username is not valid' }))
        .catch(next);
}

function verifyEmail(req, res, next) {
    userService.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function forgotPassword(req, res, next) {
    userService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function validateResetToken(req, res, next) {
    userService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetPassword(req, res, next) {
    userService.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own user and admins can get any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function get_terms_condition(req, res, next) {

    contentService.get_terms_condition(2)
        .then(content => content ? res.json(content) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function update(req, res, next) {
    // users can update their own user and admins can update any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own user and admins can delete any user
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.delete(req.params.id)
        .then(() => res.json({ message: 'user deleted successfully' }))
        .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}

