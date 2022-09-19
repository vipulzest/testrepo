const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        sender_user_id: { type: DataTypes.INTEGER(5), allowNull: false },
        recvr_user_id: { type: DataTypes.INTEGER(5), allowNull: false },
        invite_sent_date: { type: DataTypes.DATEONLY, allowNull: false},
        invite_sent_timezone: { type: DataTypes.STRING(50), allowNull: false},
        invite_recvd_date: { type: DataTypes.DATEONLY, allowNull: false},
        invite_recvd_timezone: { type: DataTypes.STRING(50), allowNull: false},
        invite_viewed: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'N' },
        invite_status: { type: DataTypes.ENUM('Y', 'N'), allowNull:false, defaultValue: 'N' },
        last_update_date: { type: DataTypes.DATEONLY, allowNull:false},
        

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'Sent_Invites',
    };

    return sequelize.define('SentInvites', attributes, options);
}