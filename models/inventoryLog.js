module.exports = (sequelize, DataTypes) => {
  const InventoryLog = sequelize.define("InventoryLog", {
    type: { type: DataTypes.STRING, allowNull: false }, // e.g. "IN" / "OUT"
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    notes: { type: DataTypes.TEXT },
  }, {
    tableName: "inventory_log",
    timestamps: true,
    underscored: true
  });

  InventoryLog.associate = (models) => {
    InventoryLog.belongsTo(models.Inventory, { foreignKey: "inventory_id" });
    InventoryLog.belongsTo(models.Order, { foreignKey: "order_id" });
  };

  return InventoryLog;
};
