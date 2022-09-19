const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        otp_code: { type: DataTypes.STRING(6), allowNull: false },
        valid_timeperiod: { type: DataTypes.STRING(5), allowNull: false },
        timestamp_started: { type: DataTypes.DATE, allowNull: false },
        timestamp_stopped: { type: DataTypes.DATE, allowNull: false },
        validity_status: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'Y' , allowNull: false },
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('otp_code', attributes, options);
}