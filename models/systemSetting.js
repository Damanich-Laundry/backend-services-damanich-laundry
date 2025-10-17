module.exports = (sequelize, DataTypes) => {
    return sequelize.define("SystemSetting", {
        setting_key: {type: DataTypes.STRING, allowNull: false, unique: true},
        setting_value: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT},
    }, {
        tableName: "system_settings",
        timestamps: false,
        underscored: true
    });
};
