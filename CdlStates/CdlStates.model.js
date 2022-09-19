const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        cdl_state: { type: DataTypes.STRING(2), allowNull: false}
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
            unique: false,
            fields:['cdl_State']
        }]
    };

    return sequelize.define('cdl_state', attributes, options);
}