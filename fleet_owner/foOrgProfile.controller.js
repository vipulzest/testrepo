const foService = require('./fo_org_profile.service');


module.exports = {
    register,
    setTokenCookie
}

function register(req, res, next) {


    foService.register(req.body, req.get('origin'))
        .then((response) => {
            return res.send(response);
            res.status(response.status).json(response)
        })
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

