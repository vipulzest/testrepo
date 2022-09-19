const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        trailer_type: { type: DataTypes.STRING(250), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        indexes:[{
            unique: false,
            fields:['trailer_type']
        }]
    };

    return sequelize.define('trailer_type', attributes, options);
}