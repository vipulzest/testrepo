const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        Job_radius: { type: DataTypes.INTEGER(5), allowNull: false}
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'Job_radius',
    };

    return sequelize.define('JobRadius', attributes, options);
}