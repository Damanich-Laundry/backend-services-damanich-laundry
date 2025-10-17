module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    order_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    order_date: { type: DataTypes.DATE, allowNull: false },
    estimated_done: { type: DataTypes.DATE },
    actual_done: { type: DataTypes.DATE },
    pickup_date: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
    payment_status: { type: DataTypes.STRING },
    payment_method: { type: DataTypes.STRING },
    total_weight: { type: DataTypes.FLOAT },
    subtotal: { type: DataTypes.FLOAT },
    discount: { type: DataTypes.FLOAT },
    total_amount: { type: DataTypes.FLOAT },
    notes: { type: DataTypes.TEXT },
  }, {
    tableName: "orders",
    timestamps: true,
    underscored: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Order.belongsTo(models.User, { foreignKey: "user_id" });
    Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
    Order.hasOne(models.Payment, { foreignKey: "order_id" });
    Order.hasMany(models.InventoryLog, { foreignKey: "order_id" });
  };

  return Order;
};
