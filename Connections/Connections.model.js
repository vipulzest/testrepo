const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false },
        user_connections: { type: DataTypes.TEXT, allowNull: false },
        connection_recs: { type: DataTypes.TEXT, allowNull: false },
        total_connections: { type: DataTypes.INTEGER(5), allowNull: false, defaultValue:0 },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('connections', attributes, options);
}