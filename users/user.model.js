const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER(5), autoIncrement: true, primaryKey: true },
        user_role: { type: DataTypes.STRING(20), allowNull: false },
        first_name: { type: DataTypes.STRING(30), allowNull: false },
        last_name: { type: DataTypes.STRING(30), allowNull: false },
        title_gender: { type: DataTypes.STRING(3), allowNull: false },
        user_name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        create_date: { type: DataTypes.DATEONLY, allowNull: false },
        create_time: { type: DataTypes.TIME, allowNull: false },
        create_timezone: { type: DataTypes.STRING(3), allowNull: false },
        last_update_date: { type: DataTypes.DATEONLY, allowNull: false },
        user_referrer_code: { type: DataTypes.STRING(20), allowNull: false },
        acct_status: { type: DataTypes.STRING(1), allowNull: false, defaultValue: 'U' },
        deact_Reason: { type: DataTypes.STRING(10), allowNull: false },
        uploaded_files_Prfimg_ID: { type: DataTypes.INTEGER(11), allowNull: true, defaultValue: null },
        rewards_curr_total: { type: DataTypes.INTEGER(5), allowNull: false, defaultValue: 0 },
        reg_steps_completed: { type: DataTypes.SMALLINT(1), allowNull: false, defaultValue: 0 },
        verificationToken: { type: DataTypes.STRING },
        resetToken: { type: DataTypes.STRING },
        resetTokenExpires: { type: DataTypes.DATE },

        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return true; }
            //get() { return !!(this.verified || this.passwordReset); }
        }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('user', attributes, options);
}