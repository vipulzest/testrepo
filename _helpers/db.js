const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database_local;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);


  // connect to db
  const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql', logging: true });



  // init models and add them to the exported db object
  db.AdminUser = require('../Admin/Admin.model')(sequelize);
  db.User = require('../users/user.model')(sequelize);
  db.UserRoles = require('../UserRoles/UserRoles')(sequelize);
  db.UserPhNum = require('../user_ph_nums/user_ph_num.model')(sequelize);
  db.OtpCode = require('../otp_codes/otp_code.model')(sequelize);
  db.DriverProfile = require('../users/driver_profile.model')(sequelize);
  db.File = require('../users/files.model')(sequelize);
  db.Content = require('../users/content.model')(sequelize);
  db.PhoneAreaCode = require('../phone_area_codes/phone_area_code.model')(sequelize);
  db.RefreshToken = require('../users/refresh-token.model')(sequelize);
  db.TrailerType = require('../trailer_type/trailer_type.model')(sequelize);
  db.CdlYearExp = require('../CdlYearExp/CdlYearExp.model')(sequelize);
  db.CdlType = require('../cdl_type/cdl_type.model')(sequelize);
  db.CdlStates = require('../CdlStates/CdlStates.model')(sequelize);
  db.driverEmpWorkedAt = require('../drivers_employers_workedAt/drivers_employers_workedAt.model')(sequelize);
  db.NumTrucks = require('../NumTrucks/NumTrucks.model')(sequelize);
  db.FoOrgProfile = require('../fleet_owner/fo_org_profile.model')(sequelize);
  db.AccountStatusValues = require('../AccountStatusValues/AccountStatusValues.model')(sequelize);
  db.FoOrgMember = require('../FoOrgMember/FoOrgMember.model')(sequelize);
  db.RefferalSend = require('../refer_friend/RefferalSend.model')(sequelize);
  db.NotificationList = require('../NotificationList/NotificationList.model')(sequelize);
  db.RewardPointList = require('../RewardPointList/RewardPointList.model')(sequelize);
  db.UserRewardPoint = require('../UserRewardPoints/UserRewardPoints.model')(sequelize);
  db.DeviceToken = require('../DeviceToken/DeviceToken.model')(sequelize);
  db.Notifications = require('../Notificaions/Notification.model')(sequelize);

  db.TruckModel = require('../truck_model/truck_model.model')(sequelize);
  // db.Message = require('../message/message.model')(sequelize);
  db.ZipCode = require('../Zip_code/zip_code.model')(sequelize);
  db.AllFeetCompany = require('../fleet_owner/all_fleet_companies.model')(sequelize);
  db.UserLevel = require('../UserLevel/UserLevel.model')(sequelize);
  db.vis_Comm_UserPref = require('../vis_Comm_UserPref/vis_Comm_UserPref.model')(sequelize);

  db.UserFormSub = require('../UserFormSub/UserFormSub.model')(sequelize);
  db.DeactReason = require('../DeactReason/DeactReason.model')(sequelize);
  db.ForgotResetPws = require('../ForgotResetPws/ForgotResetPws.model')(sequelize);
  db.OrgChats = require('../Org_Chat/OrgChat.model')(sequelize);
  db.Connections = require('../Connections/Connections.model')(sequelize);
  db.UserMessages = require('../UserMessages/UserMessages.model')(sequelize);
  db.SentInvites = require('../SentInvites/SentInvites.model')(sequelize);
  db.DefaultMessages = require('../DefaultMessages/Default_Messages.model')(sequelize);
  db.FoRatings = require('../FoRatings/FoRatings.model')(sequelize);
  db.TruckRatings = require('../TruckRatings/TruckRatings.model')(sequelize);
  db.Destinations = require('../Destinations/Destinations.model')(sequelize);
  db.DestinationsRatings = require('../DestinationsRatings/DestinationsRatings.model')(sequelize);
  db.TruckMileRanges = require('../TruckMileRanges/TruckMileRanges.model')(sequelize);
  db.JobRadius = require('../JobRadius/JobRadius.model')(sequelize);
  db.DriverJobSettings = require('../DriverJobSettings/DriverJobSettings.model')(sequelize);

  db.FODrvSearchQualSettings = require('../FODrvSearchQualSettings/FODrvSearchQualSettings.model')(sequelize);

  db.FoDrvResults = require('../FoDrvResults/FoDrvResults.model')(sequelize);
  db.Driverjobmatches = require('../Driverjobmatches/Driverjobmatches.model')(sequelize);
  db.Subscriptions = require('../Subscriptions/Subscriptions.model')(sequelize);
  db.Subscriptions_History = require('../Subscription_History/Subscription_History.model')(sequelize)









  // db.UserSubscription = require('../UserSubscription/UserSubscription.model')(sequelize);


  // define relationships
  db.User.hasMany(db.RefreshToken, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.UserFormSub.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.DeactReason.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.ForgotResetPws.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.OrgChats.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.Connections.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.FoRatings.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.TruckRatings.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.DestinationsRatings.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.DriverJobSettings.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });
  db.FODrvSearchQualSettings.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false } });



  //db.User.hasOne(db.UserPhNum, { onDelete: 'CASCADE' });
  db.UserPhNum.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.Notifications.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });

  db.File.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.DriverProfile.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.OtpCode.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.driverEmpWorkedAt.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });

  db.UserRewardPoint.belongsTo(db.User, {
    foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE'
  });
  db.FoOrgProfile.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.DeviceToken.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.FoOrgMember.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.Driverjobmatches.belongsTo(db.FoDrvResults, { foreignKey: 'fo_drv_results_id', onDelete: 'CASCADE' });


  db.FoDrvResults.belongsTo(db.User, {
    foreignKey: "fo_user_id", // change column name
    targetKey: "id", // change the referenced column
    constraints: false, // remove ON DELETE and ON UPDATE constraints
  });

  db.FoDrvResults.belongsTo(db.User, {
    foreignKey: "driver_user_id", // change column name
    targetKey: "id", // change the referenced column
    constraints: false, // remove ON DELETE and ON UPDATE constraints
  });

  db.RefferalSend.belongsTo(db.User, {
    foreignKey: "user_referrer_code", // change column name
    targetKey: "user_referrer_code", // change the referenced column
    // uniqueKey: "task_user_fk", // foreign key constraint name
    // onDelete: "SET DEFAULT", // ON DELETE config
    // onUpdate: "SET DEFAULT", // ON UPDATE config
    constraints: false, // remove ON DELETE and ON UPDATE constraints
  });
  db.vis_Comm_UserPref.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.Subscriptions_History.belongsTo(db.User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  db.Sequelize = sequelize;
  // sync all models with database
  await sequelize.sync();
}