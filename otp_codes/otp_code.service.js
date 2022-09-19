var moment = require('moment');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const crypto = require("crypto");
const { send_text_message } = require("../_helpers/general_helper");

module.exports = {
    getAll,
    getById,
    sendOtp,
    update,
    delete: _delete,
    verifyOtp
};

async function getAll() {
    const users = await db.OtpCode.findAll({
        order: [
            ['id', 'DESC'],
        ],
    });
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getuser(id);
    return basicDetails(user);
}

async function sendOtp(params) {

    const user = await db.User.findOne({ where: { user_name: params.user_name } })
    if (user) {
        if (params.type == "forgot") {
            user.resetToken = randomTokenString();
            user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await user.save();


            const otp_sended = await generateOTP(user);
            

            const to = '+916353047075';
            const message = 'Your one time otp for project is ' + otp_sended + ' This will auto expire after 20 minutes';
            await send_text_message(to, message)
            /* twillio code ends */
            return { status: 200, token: user.resetToken, OTP: otp_sended, message: "otp sended successfully" };

        }
        const user2 = await db.User.findOne({ where: { user_name: params.user_name } })
        // user2.verificationToken = randomTokenString();
        // await user2.save()

        const token = (!user2.isVerified) ? user2.resetToken : user2.verificationToken;
        const otp_sended = await generateOTP(user2);

        const to = '<number>';
        const message = 'Your one time otp for <project name> is ' + otp_sended + ' This will auto expire after 20 minutes';
        await send_text_message(to, message)

        return { status: 200, token: token, OTP: otp_sended, message: "otp sended successfully" };
    } else {
        return { status: 412, message: "user not exist" };
    }


}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}


async function generateOTP(user) {
    let generated_otp = await generateUniqueOtp(111111, 999999);
    const valid_time_period = 20; //in minutes
    // var curr_time = moment().format('YYYY-MM-DD HH:MM:SS')
    var curr_time = Date.now()
    var minutesToAdd = 20;
    var temp_time = moment().add(minutesToAdd, 'minutes').format('YYYY-MM-DD HH:MM:SS');
    otpData = {
        otp_code: generated_otp,
        valid_timeperiod: valid_time_period,
        timestamp_started: curr_time,
        timestamp_stopped: temp_time,
        user_id: user.id,
        user_name: user.user_name,
        created_at: Date.now(),
    }
    const otps = new db.OtpCode(otpData);
    await otps.save();

    return generated_otp;
}

async function generateUniqueOtp(min, max) {
    const number = Math.floor(
        Math.random() * (max - min) + min
    )
    if (await db.OtpCode.findOne({ where: { otp_code: number } })) {
        generateUniqueOtp(min, max);
    } else {
        return number;
    }

}

async function verifyOtp({ token }) {
    let user = await db.User.findOne({ where: { verificationToken: token } });
    let verification_on_signup = true;
    let verification_on_reset_password = false;

    if (!user) {
        user = await db.User.findOne({ where: { resetToken: token } });
        verification_on_signup = false;
        verification_on_reset_password = true;
    }

    if (!user) {
        return { status: 412, message: "token not exist" };
    }

    if (verification_on_signup == true) {
        user.verified = Date.now();
        user.verificationToken = null;

        await user.save();
        const otp_code = await db.OtpCode.findOne({ where: { user_id: user.id } })
        if (otp_code !== null) { otp_code.destroy() }

        return { status: 200, token: "", message: "user verified successfully" };
    } else {
        return { status: 200, token: token, message: "ready for set a new password" };
    }

}

async function update(id, params) {
    const user = await getuser(id);

    // validate (if email was changed)
    if (params.email && user.email !== params.email && await db.OtpCode.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await hash(params.password);
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
    await user.save();

    return basicDetails(user);
}

async function _delete(id) {
    const user = await getuser(id);
    await user.destroy();
}


function basicDetails(user) {
    const { id, otp_code, valid_timeperiod, timestamp_started, timestamp_stopped } = user;
    return { id, otp_code, valid_timeperiod, timestamp_started, timestamp_stopped };
}