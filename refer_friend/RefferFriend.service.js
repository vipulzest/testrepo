var moment = require('moment');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const authorize = require('_middleware/authorize')
const { generateUniqueString } = require('_helpers/general_helper');

module.exports = {
    sendReferal,
};


async function sendReferal(params, userdata) {

    const user = await db.User.findOne({ where: { id: userdata.id } });
    if (user) {
        const whereCondition = {
            user_referrer_code: user.user_referrer_code,
            receiver_ph_num_part1: params.receiver_ph_num_part1,
            receiver_ph_num_part2: params.receiver_ph_num_part2,
            receiver_ph_num_part3: params.receiver_ph_num_part3,
        }
        const alreadySend = await db.RefferalSend.findOne({ where: whereCondition });
        if (alreadySend) {
            return { status: 412, message: "Already invitation send." };
        }

        const refferalCode = await generateUniqueString(5, 'REFS-', 'referrals_sent', 'referral_code');

        //var formatted = moment().format('YYYY-MM-DD HH:MM:SS');
        var formattedDate = moment().format('YYYY-MM-DD');
        const ReferalSend = new db.RefferalSend(params);

        ReferalSend.referral_code = refferalCode;
        ReferalSend.user_referrer_code = user.user_referrer_code;
        ReferalSend.last_update_date = formattedDate;
        // ReferalSend.receiver_first_name = user.receiver_first_name
        console.log(ReferalSend, "==============ReferalSend========");
        // ReferalSend.created_at = formatted;
        // ReferalSend.updated_at = formatted;
        await ReferalSend.save();
        if (ReferalSend) {
            return { status: 200, message: "Referer sended successfully" };

        } else {
            return { status: 412, message: "Something went wrong" };
        }
    } else {
        return { status: 412, message: "user not exist" };
    }

}






