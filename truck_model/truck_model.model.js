const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Truck_make_model: { type: DataTypes.STRING(250), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'truck_makes',
    };

    return sequelize.define('truck_model', attributes, options);
}