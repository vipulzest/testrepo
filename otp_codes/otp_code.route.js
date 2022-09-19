const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require("./otp_code.controller")
const { sendOtpSchema, verifyOtpSchema } = require('./otp_code.validation')

router.post('/send_otp', sendOtpSchema, sendOtp);
router.post('/verify_otp', verifyOtpSchema, verifyOtp);

module.exports = router;