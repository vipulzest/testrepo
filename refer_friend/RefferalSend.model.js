const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
        referral_code: { type: DataTypes.STRING(20),allowNull: false },
        user_referrer_code: { type: DataTypes.STRING(20),allowNull: false },
        receiver_first_name: { type: DataTypes.STRING(30),allowNull:false  },
        receiver_ph_num_part1: { type: DataTypes.STRING(5),allowNull: false, defaultValue:'+1'},
        receiver_ph_num_part2: { type: DataTypes.INTEGER(3), allowNull: false },
        receiver_ph_num_part3: { type: DataTypes.INTEGER(7), allowNull: false },
        delivered_status: { type: DataTypes.ENUM('Y', 'N'), allowNull: false, defaultValue: 'N' },
        link_click_status: { type: DataTypes.ENUM('Y', 'N'), allowNull: false,defaultValue: 'N' },
        app_download_status: { type: DataTypes.ENUM('Y', 'N'), allowNull: false, defaultValue: 'N' },
        registration_status: { type: DataTypes.ENUM('Y', 'N'), allowNull: false, defaultValue: 'N' },
        referral_sent_date: { type: DataTypes.DATEONLY, allowNull: false },
        referral_sent_time: { type: DataTypes.TIME, allowNull: false},
        referral_sent_timezone:  { type: DataTypes.STRING(50), allowNull: false },
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'referrals_sent',
    };

    return sequelize.define('referrals_sent', attributes, options);
}