const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        num_trucks_bin: { type: DataTypes.STRING(20), allowNull: false }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('num_trucks', attributes, options);
}