module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define("Inventory", {
    item_name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    unit: { type: DataTypes.STRING },
    min_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    price_per_unit: { type: DataTypes.FLOAT },
    supplier: { type: DataTypes.STRING },
    last_restock: { type: DataTypes.DATE },
  }, {
    tableName: "inventory",
    timestamps: true,
    underscored: true
  });

  Inventory.associate = (models) => {
    Inventory.hasMany(models.InventoryLog, { foreignKey: "inventory_id" });
  };

  return Inventory;
};
