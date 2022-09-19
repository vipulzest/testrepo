const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        reason_desc: { type: DataTypes.STRING(500), allowNull: false},
        submission_date: { type: DataTypes.DATEONLY, allowNull: false }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('deact_reasons', attributes, options);
}