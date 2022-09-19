const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        notification_id: { type: DataTypes.STRING(50), allowNull: false},
        notification_type: { type: DataTypes.STRING(50), allowNull: false},
        notification_text: { type: DataTypes.STRING(200), allowNull: false},
        user_role: { type: DataTypes.ENUM('All', 'Driver','Fo','Admin'), defaultValue: 'Admin',allowNull: false },
        frequency_type: { type: DataTypes.ENUM('one_time', 'recurring'), defaultValue: 'one_time' ,allowNull: false},
        valid_from_date: { type: DataTypes.DATEONLY, allowNull: false},
        valid_to_date: { type: DataTypes.DATEONLY, allowNull: true,defaultValue:null},
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'notifications_list',
    };

    return sequelize.define('notification_list', attributes, options);
}