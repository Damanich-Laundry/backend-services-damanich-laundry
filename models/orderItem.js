module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.FLOAT, allowNull: false },
    subtotal: { type: DataTypes.FLOAT },
    notes: { type: DataTypes.TEXT },
  }, {
    tableName: "order_items",
    timestamps: true,
    underscored: true
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
    OrderItem.belongsTo(models.Service, { foreignKey: "service_id" });
  };

  return OrderItem;
};
