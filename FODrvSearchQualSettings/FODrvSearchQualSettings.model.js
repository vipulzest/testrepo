const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING(20), allowNull: false},
        Searchfor_driver_on: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'Y' ,allowNull: false},
        FSearch_Drvr_ExpYrs: { type: DataTypes.STRING(10), allowNull: false},
        FSearch_trailertype: { type: DataTypes.STRING(250), allowNull: false},
        FSearch_CDL_Type: { type: DataTypes.STRING(250), allowNull: false},
        FSearch_min_hmtmdys_yr: { type: DataTypes.INTEGER(3), allowNull: false,defaultValue:0},
        FSearch_max_htmdys_yr: { type: DataTypes.INTEGER(3), allowNull: false,defaultValue:0},
        FSearch_payunit: { type: DataTypes.ENUM('Pay per mile','Pay per hour'), allowNull: false,defaultValue:'Pay per mile'},
        FSearch_min_ppu_$: { type: DataTypes.DECIMAL(8,5), allowNull: false,defaultValue:0},
        FSearch_max_ppu_$: { type: DataTypes.DECIMAL(8,5), allowNull: false,defaultValue:0},
        FSearch_min_totmiles_yr: { type: DataTypes.INTEGER(6), allowNull: false,defaultValue:0},
        FSearch_max_totmiles_yr: { type: DataTypes.INTEGER(6), allowNull: false,defaultValue:0},
        FSearch_min_truckage_yrs: { type: DataTypes.INTEGER(2), allowNull: false,defaultValue:0},
        FSearch_max_truckage_yrs: { type: DataTypes.INTEGER(2), allowNull: false,defaultValue:0},

        
        FSearch_min_bonusyr_$: { type: DataTypes.INTEGER(4), allowNull: false,defaultValue:0},
        FSearch_max_bonusyr_$: { type: DataTypes.INTEGER(4), allowNull: false,defaultValue:0},
        FSearch_max_rd_Locd_miles: { type: DataTypes.INTEGER(3), allowNull: false,defaultValue:50},
        FSearch_overrides_max_rd_Locd_miles: { type: DataTypes.INTEGER(3), allowNull: false},
        FSearch_overrides_Drvr_ExpYrs: { type: DataTypes.STRING(10), allowNull: false},
        FSearch_overrides_trailertype: { type: DataTypes.STRING(250), allowNull: false},
        FSearch_languages: { type: DataTypes.TEXT, allowNull: false,defaultValue:'English'},
        FSearch_retire_plan: { type: DataTypes.ENUM('Y','N'), allowNull: false,defaultValue:'N'},
        FSearch_health_plan: { type: DataTypes.ENUM('Y','N'), allowNull: false,defaultValue:'N'},
        FSearch__respect: { type: DataTypes.INTEGER(1), allowNull: false,defaultValue:0},
        
        FSearch__WhichQual_CDL: { type: DataTypes.ENUM('Y','N'), allowNull: false,defaultValue:'Y'},
        FSearch__WhichQual_MVR: { type: DataTypes.ENUM('Y','N'), allowNull: false,defaultValue:'Y'},
        FSearch__WhichQual_WorkAuth: { type: DataTypes.ENUM('Y','N'), allowNull: false,defaultValue:'Y'},
        Fsearch_JobDesc_Uploadedfiles_ID: { type: DataTypes.TEXT, allowNull: false,defaultValue:'No job description'},
        Last_updated_date: { type: DataTypes.DATEONLY, allowNull: false},
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'fo_drv_searchqual_settings',
    };

    return sequelize.define('FO_Drv_SearchQual_Settings', attributes, options);
}