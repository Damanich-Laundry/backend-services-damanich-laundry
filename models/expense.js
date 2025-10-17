module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    expense_date: { type: DataTypes.DATE, allowNull: false },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: { type: DataTypes.STRING },
  }, {
    tableName: "expenses",
    timestamps: true,
    underscored: true
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Expense;
};
