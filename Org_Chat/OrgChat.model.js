const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        employer_orgcode: { type: DataTypes.STRING(250), allowNull: false},
        post_num: { type: DataTypes.INTEGER(5), allowNull: false},
        post_date: { type: DataTypes.DATEONLY, allowNull: false},
        post_time: { type: DataTypes.TIME, allowNull: false},
        post_timezone: { type: DataTypes.STRING(50), allowNull: false},
        post_text: { type: DataTypes.TEXT, allowNull: false, defaultValue:null},
        uploaded_file_postImg: { type: DataTypes.STRING(255), allowNull: true,defaultValue:null},
        delivered_status: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'N' },
        text_approved: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        image_approved: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        text_status: { type: DataTypes.ENUM('V', 'D'), allowNull:false, defaultValue: 'V' },
        image_status: { type: DataTypes.ENUM('V', 'D'), allowNull:false, defaultValue: 'V' },

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName:'org_chats'
    };

    return sequelize.define('OrgChat', attributes, options);
}