const otpService = require('./otp_code.service');

module.exports = {
    sendOtp, verifyOtp
}


function sendOtp(req, res, next) {

    otpService.sendOtp(req.body, req.get('origin'))
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch(next);
}

function verifyOtp(req, res, next) {

    otpService.verifyOtp(req.body, req.get('origin'))
        .then((response) => {
            res.json(response)
        })
        .catch(next);
}
