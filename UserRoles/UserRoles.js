const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_role: { type: DataTypes.STRING(20), allowNull: false}
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
            unique: true,
            fields:['user_role']
        }]
    };

    return sequelize.define('user_roles', attributes, options);
}