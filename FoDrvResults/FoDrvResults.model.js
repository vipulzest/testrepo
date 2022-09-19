const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        fo_user_id: { type: DataTypes.INTEGER(5), allowNull: false},
        FO_User_name: { type: DataTypes.STRING(20), allowNull: false},
        driver_user_id: { type: DataTypes.INTEGER(5), allowNull: false},
        Driver_User_name: { type: DataTypes.STRING(20), allowNull: false},
        FO_Settings_snapshot: { type: DataTypes.TEXT, allowNull: false},
        Driver_Settings_snapshot: { type: DataTypes.TEXT, allowNull: false},
        Date_StartShow_NewDrvrs: { type: DataTypes.DATEONLY, allowNull: false},
        Overall_Match_Percent: { type: DataTypes.DECIMAL(8,2), allowNull: false,defaultValue:0},
        Saved_Status:{ type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Saved_date: { type: DataTypes.DATEONLY, allowNull: false},
        Saved_StatusChange_date: { type: DataTypes.DATEONLY, allowNull: false},
        
        Sent_Contact_Form: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Check_QualsInSettings: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Received_Contact_Approval: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Uploaded_Files_ID_OfApproval: { type: DataTypes.INTEGER(5),allowNull: false},
        Emailed_ContactAppr_Form:{ type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Qual_Results_CDL:{ type: DataTypes.ENUM('Y', 'N','NR'), defaultValue: 'N' ,allowNull: false},
        Qual_Results_MVR:{ type: DataTypes.ENUM('Y', 'N','NR'), defaultValue: 'N' ,allowNull: false},
        Qual_Results_WorkAuth:{ type: DataTypes.ENUM('Y', 'N','NR'), defaultValue: 'N' ,allowNull: false},
        Driver_Qualified:{ type: DataTypes.ENUM('Y', 'N','NR'), defaultValue: 'N' ,allowNull: false},
        FO_Called_Drvr:{ type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' ,allowNull: false},
        Date_StopShow_NewDrvrs:{ type: DataTypes.DATEONLY, allowNull: false},
        Reason_StopShow_NewDrvrs:{ type: DataTypes.TEXT, allowNull: false},
        Date_StopShow_Saved:{ type: DataTypes.DATEONLY, allowNull: false},
        Reason_StopShow_Saved:{ type: DataTypes.TEXT, allowNull: false},
        Date_StopShow_Contacted:{ type: DataTypes.DATEONLY, allowNull: false},
        Reason_StopShow_Contacted:{ type: DataTypes.TEXT, allowNull: false},
        Date_StopShow_Qualified:{ type: DataTypes.DATEONLY, allowNull: false},
        Reason_StopShow_Qualified:{ type: DataTypes.TEXT, allowNull: false},
        Create_date:{ type: DataTypes.DATEONLY, allowNull: false},
        Last_updated_date:{ type: DataTypes.DATEONLY, allowNull: false},
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'fo_drv_results',
    };

    return sequelize.define('fo_drv_results', attributes, options);
}