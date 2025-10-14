module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {type: DataTypes.STRING, allowNull: false, unique: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password_hash: {type: DataTypes.STRING, allowNull: false},
        full_name: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        is_active: {type: DataTypes.BOOLEAN, defaultValue: true},
    }, {
        tableName: "users",
        timestamps: true,
        underscored: true
    });

    User.associate = (models) => {
        User.hasMany(models.Order, {foreignKey: "user_id"});
        User.hasMany(models.Expense, {foreignKey: "user_id"});
    };

    return User;
};
