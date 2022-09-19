const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        employer_name: { type: DataTypes.STRING(100), allowNull: false },
        employer_orgcode: { type: DataTypes.STRING(250), allowNull: false},
        in_bus_since: { type: DataTypes.INTEGER(4) ,allowNull: false},
        cdl_type: { type: DataTypes.STRING(30), allowNull: false },
        min_drvr_exp: { type: DataTypes.STRING(10), allowNull: false },
        trailer_types: { type: DataTypes.TEXT, allowNull: false},
        num_trucks: { type: DataTypes.STRING(255), allowNull: false},
        usdot: { type: DataTypes.STRING(50), allowNull: false },
        referral_code: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
        terms_conditions_viewed: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        terms_conditions_accepted: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        num_drivers: { type: DataTypes.INTEGER(5), allowNull: false, defaultValue: 0 },
        drivers_joined_last6mo: { type: DataTypes.INTEGER('5'), defaultValue: 0, allowNull: false},
        drivers_left_last24mo: { type: DataTypes.INTEGER('5'), defaultValue: 0, allowNull: false},
        current_subscription: { type: DataTypes.STRING(15), allowNull: false, defaultValue: 'trial' },
        subscription_package: { type: DataTypes.STRING(15), allowNull: false, defaultValue: 'basic' },
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(50), allowNull: false},
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
        org_status: { type:DataTypes.ENUM('A', 'D'), allowNull: false, defaultValue: 'A' },
         
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        logging: false,
        tableName: 'fo_org_profile',
    };

    return sequelize.define('fo_org_profile', attributes, options);
}