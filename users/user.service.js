const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const moment = require('moment');
const { addPushTokentoUser, referEarn } = require('../_helpers/general_helper');
const sequelize = require('sequelize');
const notificationService = require('../Notificaions/Notification.service')

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    getByUsername,
    getUserIdByUsername,
    create,
    update,
    delete: _delete,
    upload_file

};

async function authenticate({ user_name, password, ipAddress }) {
    const user = await db.User.scope('withHash').findOne({ where: { user_name } });

    //if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    if (!user || !user.isVerified || !(await bcrypt.compare(password, user.passwordHash))) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.user_id = user.id;
    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const user = await refreshToken.getuser();

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(user);

    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function foPhoneCheckSave(params) {
    // validate
    let { users_ph_num_part1, users_ph_num_part2, users_ph_num_part3, user_name, user_id } = params

    if (await db.UserPhNum.findOne({ where: { users_ph_num_part1, users_ph_num_part2, users_ph_num_part3 } })) {
        throw 'Phone Number "' + params.users_ph_num_part3 + '" is already registered';
    }

    const userph = new db.UserPhNum(params);
    await userph.save();

    return userph.id;
}

async function register(params, origin) {

    var formatted = moment().format('YYYY-MM-DD HH:MM:SS');
    // validate
    if (await db.User.findOne({ where: { user_name: params.user_name } })) {
        // send already registered error in email to prevent user enumeration
        //return await sendAlreadyRegisteredEmail(params.email, origin);
        throw 'UserName "' + params.user_name + '" is already taken';
    }
    if (await db.UserPhNum.findOne({ where: { Users_ph_num_part1: params.country_code, Users_ph_num_part2: params.state_code, Users_ph_num_part3: params.ph_numb } })) {
        throw 'Phone Number "' + params.ph_numb + '" is already registered';
    }

    const chekReferCode = await referEarn(params)

    let userRewardPointId = 0;
    if (chekReferCode.status === 412) {
        return chekReferCode;
    }
    // if (chekReferCode.status === 400) {
    //     return chekReferCode;
    // }
    if (chekReferCode.status === 200) {
        userRewardPointId = chekReferCode.user_reward_point_id;
    }

    // params.create_date = Date.now()
    // create user object
    const user = new db.User(params);

    // first registered user is an admin
    // const isFirstuser = (await db.User.count()) === 0;
    const userRole = await db.UserRoles.findByPk(1)
    user.user_role = userRole.user_role
    user.verificationToken = randomTokenString();
    user.email = "";
    user.phoneNumber = params.country_code + " " + params.ph_numb;
    user.profile_image = "";
    user.reg_steps_completed = "2";
    user.user_referrer_code = await generateUniqueRefferreCode(100, 999, params.user_name);
    user.create_date = params.create_date;
    user.create_time = params.create_time;
    user.create_timezone = params.create_timezone;
    user.last_update_date = Date.now();
    user.deact_Reason = ""

    // hash password
    user.passwordHash = await hash(params.password);
    user.password = "";
    // save user

    await user.save();

    //use for only push notification
    const deviceToken = addPushTokentoUser(params, user);

    const driver = generateDriverProfile(params, user);
    await driver.save();

    // let notificationPrams = {
    //     user_id: user.id,
    //     user_name: user.user_name,
    //     notification_code: "D01",
    //     scheduled_date: moment(user.create_date, "DD-MM-YYYY").add(30, 'days'),
    //     scheduled_time: '11:30:00',
    //     scheduled_timezone: "EST",
    //     create_date: user.create_date,
    //     create_time: user.create_time,
    //     create_timezone: user.create_timezone,
    //     sent_date: user.create_date,
    //     sent_time: user.create_time,
    //     sent_timezone: user.create_timezone,
    //     update_date: user.create_date
    // }
    user.notification_code = "D01"
    user.scheduled_date = moment(user.create_date, "DD-MM-YYYY").add(30, 'days')
    user.scheduled_time = '11:30:00'
    user.scheduled_timezone = "EST"

    const notification = notificationService.createNotification(user)

    if (userRewardPointId > 0) {
        const PreviousRewardPoint = await db.UserRewardPoint.findOne({ where: { 'id': userRewardPointId } });
        if (PreviousRewardPoint) {

            var finaltotal = parseFloat(PreviousRewardPoint.reward_points);

            const currentTotal = await db.UserRewardPoint.findAll({
                where: { user_id: user.id },
                // attributes: [[sequelize.fn('sum', sequelize.col('current_total')), 'total']],
                raw: true,
                order: [
                    ['id', 'DESC'],
                ],
            });

            if (currentTotal.length > 0) {
                if (currentTotal[0].current_total > 0) {
                    finaltotal = parseFloat(PreviousRewardPoint.reward_points) + parseFloat(currentTotal[0].current_total);
                }
            }

            const refferaluser = {
                'reward_reason_code': 'RWR_01',
                'reward_points': PreviousRewardPoint.reward_points,
                'reward_action_date': formatted,
                'award_date': PreviousRewardPoint.award_date,
                'user_id': user.id,
                'user_name': user.user_name,
                'current_total': finaltotal,


            };
            const UserReferal = new db.UserRewardPoint(refferaluser);
            await UserReferal.save();

            user.rewards_curr_total = finaltotal
            await user.save()
        }

    }


    const phonenum = {

        user_name: user.user_name,
        users_ph_num_part1: params.country_code,
        users_ph_num_part2: params.state_code,
        users_ph_num_part3: params.ph_numb,
        user_id: user.id,
    };
    const phonesave = await foPhoneCheckSave(phonenum);
    // return user.id;
    return { status: 200, user_name: user.user_name, user_id: user.id, message: 'Registration successful, please check your email for verification instructions' };

    // send email
    //await sendVerificationEmail(user, origin);
}

async function verifyEmail({ token }) {
    const user = await db.User.findOne({ where: { verificationToken: token } });

    if (!user) throw 'Verification failed';

    user.verified = Date.now();
    user.verificationToken = null;
    await user.save();
}

async function forgotPassword({ email }, origin) {
    const user = await db.User.findOne({ where: { email } });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // send email
    await sendPasswordResetEmail(user, origin);
}

async function validateResetToken({ token }) {
    const user = await db.User.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: { [Op.gt]: Date.now() }
        }
    });

    if (!user) throw 'Invalid token';

    return user;
}

async function resetPassword({ token, password }) {
    const user = await validateResetToken({ token });

    // update password and remove reset token
    user.passwordHash = await hash(password);
    user.passwordReset = Date.now();
    user.resetToken = null;
    await user.save();
}

async function getAll() {
    const users = await db.User.findAll();
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getuser(id);
    return basicDetails(user);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    user.verified = Date.now();

    // hash password
    user.passwordHash = await hash(params.password);

    // save user
    await user.save();

    return basicDetails(user);
}

async function upload_file(params) {
    const file = new db.File(params);
    await file.save();
    return file.id;
}

async function update(id, params) {
    const user = await getuser(id);

    // validate (if email was changed)
    // if (params.email && user.email !== params.email && await db.User.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already taken';
    // }

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

// helper functions

async function getuser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'user not found';
    return user;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ where: { token } });
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        userId: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
}

function generateDriverProfile(userData, user) {
    let auth_work_until = moment(new Date(), "DD-MM-YYYY").add(180, 'days');
    userData.auth_work_until = userData.us_work_6mth_auth === 'Y' ? auth_work_until : user.Create_date
    return new db.DriverProfile({
        user_id: user.id,
        create_time: user.create_time,
        create_timezone: user.create_timezone,
        last_update_date: user.last_update_date,
        lat_of_zip_code: parseFloat(userData.lat_of_zip_code),
        long_of_zip_code: parseFloat(userData.long_of_zip_code),
        uploaded_files_id: userData.cdl_doc_id !== '' ? userData.cdl_doc_id : null,
        ...userData
    });
}


function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function generateUniqueRefferreCode(min, max, username) {
    const number = Math.floor(
        Math.random() * (max - min) + min
    )
    const unique_numb = username.slice(0, 2).toUpperCase() + number;
    if (await db.User.findOne({ where: { user_referrer_code: unique_numb } })) {
        generateUniqueRefferreCode(min, max, username);
    } else {
        return unique_numb.toString();
    }

}

function basicDetails(user) {
    const { id, title, first_name, last_name, role, isVerified, user_name } = user;
    return { id, title, first_name, last_name, role, isVerified, user_name };
}

async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/user/verify-email?token=${user.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/user/verify-email</code> api route:</p>
                   <p><code>${user.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Sign-up Verification API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/user/forgot-password">forgot password</a> page.</p>`;
    } else {
        message = `<p>If you don't know your password you can reset it via the <code>/user/forgot-password</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Sign-up Verification API - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(user, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/user/reset-password?token=${user.resetToken}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/user/reset-password</code> api route:</p>
                   <p><code>${user.resetToken}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}

async function getByUsername(params) {
    const user = await db.User.findOne({ where: { user_name: params.user_name } });
    if (!user) return false;
    return true;
}
async function getUserIdByUsername(params) {
    const user = await db.User.findOne({ where: { user_name: params.user_name } });
    if (!user) return "user not found"
    return basicDetails(user)
}