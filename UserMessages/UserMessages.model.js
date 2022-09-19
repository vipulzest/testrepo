const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        sender_user_id: { type: DataTypes.INTEGER(5), allowNull: false },
        sender_user_name: { type: DataTypes.STRING(20), allowNull: false },
        sender_user_id_post_num: { type: DataTypes.INTEGER(5), allowNull: false },
        post_date: { type: DataTypes.DATEONLY, allowNull: false },
        post_time: { type: DataTypes.TIME, allowNull: false},
        post_timezone: { type: DataTypes.STRING(50), allowNull: false},
        post_text: { type: DataTypes.TEXT, allowNull: false},
        uploaded_file_postImg: { type: DataTypes.STRING(255), allowNull: true,defaultValue:null},
        delivered_status: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'N' },
        text_approved: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },
        image_approved: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'Y' },

        text_status: { type: DataTypes.ENUM('U', 'R','D'), allowNull:false, defaultValue: 'U' },
        image_status: { type: DataTypes.ENUM('U', 'R','D'), allowNull:false, defaultValue: 'U' },
        recvr_user_id: { type: DataTypes.INTEGER(5), allowNull: false },

        
        

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'user_messages',
    };

    return sequelize.define('user_messages', attributes, options);
}