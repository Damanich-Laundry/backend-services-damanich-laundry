module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: { type: DataTypes.STRING },
    payment_date: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT },
  }, {
    tableName: "payments",
    timestamps: true,
    underscored: true
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: "order_id" });
  };

  return Payment;
};
