const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false },
        notification_code: { type: DataTypes.STRING(20), allowNull: false },
        scheduled_date: { type: DataTypes.DATEONLY, allowNull: false },
        scheduled_time: { type: DataTypes.TIME, allowNull: false },
        scheduled_timezone: { type: DataTypes.STRING(20), allowNull: false },
        status: { type: DataTypes.ENUM('SCH', 'SENT', 'CANCL', 'DEC'), allowNull: false, defaultValue: 'SCH' },
        // scheduled_timezone: { type: DataTypes.STRING(20), allowNull: false},
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(50), allowNull: false },
        sent_date: { type: DataTypes.DATEONLY, allowNull: false, },
        sent_time: { type: DataTypes.TIME, allowNull: false, },
        sent_timezone: { type: DataTypes.STRING(50), allowNull: false, },
        update_date: { type: DataTypes.DATEONLY, allowNull: false },
    };


    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('notification', attributes, options);
}