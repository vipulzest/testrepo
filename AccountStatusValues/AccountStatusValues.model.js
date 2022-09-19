const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        account_status_value: { type: DataTypes.STRING(1), allowNull: false},
        account_status_description: { type: DataTypes.STRING(150), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('acct_status_value', attributes, options);
}