const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        User_name: { type: DataTypes.STRING(20), allowNull: false},
        Job_Search_on: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Open_to_contact: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        DSearchval_trailertype: { type: DataTypes.STRING('250'),allowNull: false},
        DSearchval_hometimedays_yr: { type: DataTypes.INTEGER(3),allowNull: false,defaultValue:0},
        Hometime_priority: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:1},
        DSearchval_pmt_type: { type: DataTypes.ENUM('Pay per mile', 'pay per hour'),allowNull: false,defaultValue:'Pay per mile'},
        DSearchval_payperunit_$: { type: DataTypes.DECIMAL(8,2),allowNull: false,defaultValue:0},
        // DSearchval_paypermile_$: { type: DataTypes.DECIMAL('8,2'),allowNull: false,defaultValue:0},
        // DSearchval_payperhr_$: { type: DataTypes.DECIMAL('8,2'),allowNull: false,defaultValue:0},
        Priority_pay: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:1},
        DSearchval_totalmilesperyr: { type: DataTypes.INTEGER('6'),allowNull: false,defaultValue:0},
        Priority_Totalmiles: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:1},
        DSearchval_avgtruckage_yrs: { type: DataTypes.INTEGER(2),allowNull: false,defaultValue:0},
        Priority_Truckage: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:1},
        DSearchval_bonusyr_$: { type: DataTypes.INTEGER(5),allowNull: false,defaultValue:0},
        Priority_Bonus: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:0},
        DSearchval_radius_distancefromlocation_miles: { type: DataTypes.INTEGER(3),allowNull: false,defaultValue:50},
        Priority_Radius: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:0},
        DSearchval_languages: { type: DataTypes.TEXT,allowNull: false,defaultValue:'English'},
        Priority_Lang: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:0},
        DSearchval_respect: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:5},
        Priority_Respect: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:5},
        DSearchval_retire_plan: { type: DataTypes.ENUM('Y','N'),allowNull: false,defaultValue:'N'},
        Priority_Retireplan: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:0},
        DSearchval_health_plan: { type: DataTypes.ENUM('Y','N'),allowNull: false,defaultValue:'Y'},
        Priority_Healthplan: { type: DataTypes.INTEGER(1),allowNull: false,defaultValue:0},
        Last_updated_date: { type: DataTypes.DATEONLY,allowNull: false},
        
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'driver_job_settings',
    };

    return sequelize.define('Driver_Job_Settings', attributes, options);
}