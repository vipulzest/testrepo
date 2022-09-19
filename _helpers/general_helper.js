const db = require('./db');
const { QueryTypes } = require('sequelize');
const moment = require('moment');
const sequelize = require('sequelize');
const userService = require('../users/user.service');


async function checkFeetCompnay(param) {
  console.log('address' + param.employer_streetaddress);
  const feetCompany = await db.AllFeetCompany.findOne({ where: { employer_streetaddress: param.employer_streetaddress, employer_city: param.employer_city } })
  if (feetCompany) {
    return feetCompany
  } else {
    return false;
  }

}

function addPushTokentoUser(userData, user) {
  //required deviceid,pustoken,and type
  const deviceToken = new db.DeviceToken({
    user_id: user.id,
    ...userData

  });

  return deviceToken.save();

}

async function referEarn(param) {
  var formatted = moment().format('YYYY-MM-DD HH:mm:ss');

  const phoneNumber = param.ph_numb;
  const referalCode = param.referral_code;

  if (referalCode.length > 0) {
    const CheckUser = await db.RefferalSend.findOne({ where: { referral_code: referalCode } });

    if (CheckUser === null) {
      return { status: 412, user_reward_point_id: 0, message: "Code is not valid" };
    }

    const findUser = await db.User.findOne({ where: { user_referrer_code: CheckUser.user_referrer_code } });
    if (findUser === null) {
      return { status: 412, user_reward_point_id: 0, message: "Code is not valid" };
    }

    const checkSendRequest = await db.RefferalSend.findOne({
      include: [{ model: db.User }], where: { referral_code: referalCode, receiver_ph_num_part3: param.ph_numb, registration_status: 'N' }, order: [
        ['id', 'DESC'],
      ]
    });

    if (checkSendRequest) {
      checkSendRequest.registration_status = "Y";
      checkSendRequest.save();
      const RewardList = await db.RewardPointList.findOne({ where: { reward_reason_code: 'RWR_01' } });
      if (RewardList) {
        var finaltotal = parseFloat(RewardList.reward_points);

        const currentTotal = await db.UserRewardPoint.findAll({
          where: { user_id: checkSendRequest.user.id },
          // attributes: [[sequelize.fn('sum', sequelize.col('current_total')), 'total']],
          raw: true,
          order: [
            ['id', 'DESC'],
          ],
        });

        if (currentTotal.length > 0) {
          if (currentTotal[0].current_total > 0) {
            finaltotal = parseFloat(RewardList.reward_points) + parseFloat(currentTotal[0].current_total);
          }
        }

        const refferaluser = {
          'user_name': checkSendRequest.user.user_name,
          'reward_reason_code': 'RWR_01',
          'reward_points': RewardList.reward_points,
          'reward_action_date': formatted,
          'award_date': checkSendRequest.referral_sent_date,
          'user_id': checkSendRequest.user.id,
          'current_total': finaltotal
        };

        const UserReferal = new db.UserRewardPoint(refferaluser);
        await UserReferal.save();

        const user = await await db.User.findByPk(checkSendRequest.user.id)
        if (user) {
          user.rewards_curr_total = finaltotal
          await user.save()
        }
        return { status: 200, user_reward_point_id: UserReferal.id, message: 'Reffer point get' };

      } else {
        console.log("no reward defined");

        return { status: 412, user_reward_point_id: 0, message: 'No Reward define' };
      }
    } else {
      console.log("Already rewarded");
      return { status: 400, user_reward_point_id: 0, message: 'Already rewarded' };
    }

  } else {
    console.log("call Else");
    try {
      const checkSendRequest = await db.RefferalSend.findOne({
        include: [{ model: db.User }], where: { receiver_ph_num_part3: param.ph_numb, registration_status: 'N' }, order: [
          ['id', 'DESC'],
        ]
      });
      if (checkSendRequest) {
        checkSendRequest.registration_status = "Y";
        checkSendRequest.save();
        const RewardList = await db.RewardPointList.findOne({ where: { reward_reason_code: 'RWR_01' } });
        if (RewardList) {

          var finaltotal = RewardList.reward_points;

          const currentTotal = await db.UserRewardPoint.findAll({
            where: { user_id: checkSendRequest.user.id },
            // attributes: [[sequelize.fn('sum', sequelize.col('current_total')), 'total']],
            raw: true,
            order: [
              ['id', 'DESC'],
            ],
          });

          if (currentTotal.length > 0) {
            if (currentTotal[0].current_total > 0) {
              finaltotal = parseFloat(RewardList.reward_points) + parseFloat(currentTotal[0].current_total);
            }

          }

          const refferaluser = {
            "user_name": checkSendRequest.user_name,
            'reward_reason_code': 'RWR_01',
            'reward_points': RewardList.reward_points,
            'reward_action_date': formatted,
            'award_date': checkSendRequest.referral_sent_date,
            'current_total': finaltotal,
            'user_id': checkSendRequest.user.id,
            'user_name': checkSendRequest.user.user_name
          };
          const UserReferal = new db.UserRewardPoint(refferaluser);
          await UserReferal.save();

          const user = await await db.User.findByPk(checkSendRequest.user.id)
          if (user) {
            user.rewards_curr_total = finaltotal
            await user.save()
          }
          return { status: 200, user_reward_point_id: UserReferal.id, message: 'Reffer point get' };

        } else {

          return { status: 412, user_reward_point_id: 0, message: 'No Reward define' };
        }
      } else {
        console.log('Already rewarded');
        return { status: 400, user_reward_point_id: 0, message: 'Already rewarded' }
      }
    }
    catch (e) {
      console.log(e);
      return { status: 412, user_reward_point_id: 0, message: 'Something went wrong' };
    }
  }
}

async function addOrgCodeEarnPoint(params) {
  let userRewardList = await db.UserRewardPoint.findOne({
    where: { user_id: params.id }, order: [
      ['id', 'DESC']]
  })
  const RewardList = await db.RewardPointList.findOne({ where: { reward_reason_code: 'RWR_03' } });
  if (RewardList) {
    let previousTotal = userRewardList === null ? 0 : parseFloat(userRewardList.current_total)
    let finalTotal = previousTotal + parseFloat(RewardList.reward_points)
    params.reward_reason_code = RewardList.reward_reason_code
    params.reward_points = RewardList.reward_points
    params.current_total = finalTotal
    const userReward = saveRewardPoint(params)
    await userReward.save()
    return userReward
  } else {
    return { status: 412, user_reward_point_id: 0, message: 'No Reward define' };
  }
}

function saveRewardPoint(params) {
  return new db.UserRewardPoint({
    user_id: params.id,
    reward_reason_code: params.reward_reason_code,
    reward_points: params.reward_points,
    reward_action_date: params.create_date,
    award_date: Date.now(),
    current_total: params.current_total,
    user_name: params.user_name
  })
}
generateUniqueCode = function (length, prefix = "") {
  try {
    if (typeof length === "undefined")
      length = 6;
    var UniqueCode = "";
    var possible = "123456789";
    for (var i = 0;i < length;i++)
      UniqueCode += possible.charAt(Math.floor(Math.random() * possible.length));
    return prefix + UniqueCode;
  } catch (error) {
    console.error(error);
  }

};

async function generateUniqueString(length, prefix = "", table, field, isAlpha = false) {
  if (typeof length === "undefined")
    length = 6;
  var UniqueCode = "";
  var possible = "123456789";
  if (isAlpha === true) {
    var possible = "123456789ABCDEFGHIJKLMNOPQRSTUVWZYZ";
  }
  for (var i = 0;i < length;i++)
    UniqueCode += possible.charAt(Math.floor(Math.random() * possible.length));
  var finalCode = prefix + UniqueCode;
  //console.log('final code' + finalCode);

  const queryResult = await db.Sequelize.query('SELECT * FROM ' + table + ' WHERE ' + field + ' = :values', {
    replacements: { values: finalCode },
    type: QueryTypes.SELECT
  });

  if (queryResult.length > 0) {
    generateUniqueString(length, prefix, table, field);
  } else {
    return finalCode.toString();
  }

}

async function send_text_message(to, message) {
  const accountSid = '<account>';
  const authToken = '<token>';
  const from = "<number>";

  const client = require('twilio')(accountSid, authToken);


  client.messages
    .create({
      to: to,
      body: message,
      from: from
    })
    .then(message => console.log(message.sid))
    .done();
}

module.exports = {
  checkFeetCompnay,
  generateUniqueCode,
  generateUniqueString,
  send_text_message,
  referEarn,
  addOrgCodeEarnPoint,
  addPushTokentoUser
};