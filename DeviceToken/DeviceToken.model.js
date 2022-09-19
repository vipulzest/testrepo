const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        push_token: { type: DataTypes.STRING(255), allowNull: true, defaultValue: null },
        type: { type: DataTypes.ENUM('android', 'ios'), defaultValue: 'android'},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };
    
    return sequelize.define('device_tokens', attributes, options);
}