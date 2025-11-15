module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estimated_done: { type: DataTypes.DATE },
      actual_done: { type: DataTypes.DATE },
      pickup_date: { type: DataTypes.DATE },
      status: {
        type: DataTypes.ENUM("RECEIVED", "PROCESSING", "DONE", "CANCELLED"),
        defaultValue: "RECEIVED",
      },
      payment_status: {
        type: DataTypes.ENUM("UNPAID", "PENDING", "PAID", "FAILED"),
        defaultValue: "UNPAID",
      },
      payment_method: { type: DataTypes.STRING },
      total_weight: { type: DataTypes.FLOAT, defaultValue: 0 },
      subtotal: { type: DataTypes.FLOAT, defaultValue: 0 },
      discount: { type: DataTypes.FLOAT, defaultValue: 0 },
      total_amount: { type: DataTypes.FLOAT, defaultValue: 0 },
      notes: { type: DataTypes.TEXT },
    },
    {
      tableName: "orders",
      timestamps: true,
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: "customer_id",
    });
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: "order_id",
    });
    Order.hasOne(models.Payment, {
      foreignKey: "order_id",
    });
    Order.hasMany(models.InventoryLog, {
      foreignKey: "order_id",
    });
  };

  return Order;
};
