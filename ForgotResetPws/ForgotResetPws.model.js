const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        logged_in_status: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        forgotResetPwd_date: { type: DataTypes.DATEONLY, allowNull: false},
        forgotResetPwd_time: { type: DataTypes.TIME, allowNull: false },
        forgotResetPwd_timezone: { type: DataTypes.STRING(50), allowNull: false},
        otp_codes_id: { type: DataTypes.INTEGER(5), allowNull: true},
        reset_status: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'forgot_reset_pwd_hist',
    };

    return sequelize.define('forgot_pwd_hist', attributes, options);
}