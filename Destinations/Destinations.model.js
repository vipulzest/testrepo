const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        destination_business_name: { type: DataTypes.STRING(100), allowNull: false},
        destination_street_address: { type: DataTypes.STRING(250), allowNull: false},
        destination_city: { type: DataTypes.STRING(250), allowNull: false},
        destination_state: { type: DataTypes.STRING(2), allowNull: false},
        destination_zipcode: { type: DataTypes.INTEGER(5), allowNull: false},
        create_date: { type: DataTypes.DATEONLY, allowNull: false},
       
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('destination', attributes, options);
}