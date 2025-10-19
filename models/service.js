module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define("Service", {
        service_name: {type: DataTypes.STRING, allowNull: false},
        service_type: {type: DataTypes.STRING},
        unit: {type: DataTypes.STRING},
        price_per_unit: {type: DataTypes.FLOAT},
        duration_hours: {type: DataTypes.FLOAT},
        is_active: {type: DataTypes.BOOLEAN, defaultValue: true},
    }, {
        tableName: "services",
        timestamps: true,
        underscored: true
    });

    Service.associate = (models) => {
        Service.hasMany(models.OrderItem, {foreignKey: "service_id"});
    };

    return Service;
};
