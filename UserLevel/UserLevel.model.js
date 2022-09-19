const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_level: { type: DataTypes.STRING(100), allowNull: false },
        min_points_earned: { type: DataTypes.INTEGER(10),allowNull: false},
        max_points_earned: { type: DataTypes.INTEGER(10),allowNull: false},
        level_name: { type: DataTypes.STRING(255), allowNull: false},
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('user_level', attributes, options);
}