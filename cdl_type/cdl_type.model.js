const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        cdl_type: { type: DataTypes.STRING(50), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
            unique: false,
            fields:['cdl_type']
        }]
    };

    return sequelize.define('cdl_Type', attributes, options);
}