module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    member_since: { type: DataTypes.DATE },
    total_orders: { type: DataTypes.INTEGER, defaultValue: 0 },
    loyalty_points: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {
    tableName: "customers",
    timestamps: true,
    underscored: true
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Order, { foreignKey: "customer_id" });
  };

  return Customer;
};
