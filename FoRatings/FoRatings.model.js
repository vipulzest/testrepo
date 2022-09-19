const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        employer_orgcode: { type: DataTypes.STRING(250), allowNull: false},
        all_fleet_companies_id: { type: DataTypes.INTEGER(5), allowNull: false},
        driver_employers_id: { type: DataTypes.INTEGER(5), allowNull: false},
        trailer_type: { type: DataTypes.STRING(250), allowNull: false},
        home_time_days_yr: { type: DataTypes.INTEGER(5), allowNull: false,defaultValue:0},
        Pay_per_mile_$: { type: DataTypes.DECIMAL(8,2), allowNull: false,defaultValue:0.00},
        total_miles_per_yr: { type: DataTypes.INTEGER(10), allowNull: false,defaultValue:0},

        avg_truck_age_yrs: { type: DataTypes.INTEGER(2), allowNull: false,defaultValue:0},
        bonus_yr_$: { type: DataTypes.INTEGER(4), allowNull: false,defaultValue:0},
        respect_inclusivity_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        overall_experience_rating: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:5},
        create_date: { type: DataTypes.DATEONLY, allowNull: false},
        create_time: { type: DataTypes.TIME, allowNull: false},
        create_timezone: { type: DataTypes.STRING(20), allowNull: false},

        
        
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('fo_ratings', attributes, options);
}