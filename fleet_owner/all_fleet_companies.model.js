const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employer_orgcode: { type: DataTypes.STRING(250), allowNull: false },
        employer_name: { type: DataTypes.STRING(100), allowNull: false},
        employer_streetaddress: { type: DataTypes.STRING(250), allowNull: false },
        employer_city: { type: DataTypes.STRING(250), allowNull: false },
        employer_state: { type: DataTypes.STRING(2), allowNull: false },
        employer_zipcode: { type: DataTypes.INTEGER(5),allowNull: false },
        employer_usdot: { type: DataTypes.STRING(20), allowNull: false },
        insert_date: { type: DataTypes.DATEONLY, allowNull: false},
        last_update_date:{ type: DataTypes.DATEONLY, allowNull: false},
        company_status: { type: DataTypes.ENUM('Unchecked', 'Approved','Not approved'), allowNull: false, defaultValue: 'Unchecked' },
    };

    
    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        logging: false
    };

    return sequelize.define('all_fleet_companies', attributes, options);
}