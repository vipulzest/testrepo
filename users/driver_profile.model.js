const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        zip_code: { type: DataTypes.INTEGER(5), allowNull: false },
        lat_of_zip_code: { type: DataTypes.FLOAT, allowNull: false, defaultValue: "0" },
        long_of_zip_code: { type: DataTypes.FLOAT, allowNull: false, defaultValue: "0" },
        us_work_6mth_auth: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        auth_work_until: { type: DataTypes.DATEONLY, allowNull: false },
        trailer_type_2yrs: { type: DataTypes.STRING(250), allowNull: false },
        cdl_type: { type: DataTypes.STRING(30), allowNull: false },
        cdl_experience: { type: DataTypes.STRING(10), allowNull: false },
        cdl_state: { type: DataTypes.STRING(2), allowNull: false, defaultValue: "MI" },
        cdl_exp_date: { type: DataTypes.DATEONLY, allowNull: false },
        cdl_doc_uploaded: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        uploaded_files_id: { type: DataTypes.INTEGER(10) },
        // cdl_doc_name: { type: DataTypes.STRING(255), allowNull: true,defaultValue: null},
        validated_cdl: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        referral_code: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
        currently_employed: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        terms_conditions_viewed: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        terms_conditions_accepted: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N', allowNull: false },
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(50), allowNull: false },
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        tableName: 'driver_profile',
    };

    return sequelize.define('driver_profile', attributes, options);
}