const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../setup');

class Meal extends Model {
  /*
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.hasMany(models.Rating, { as: 'ratings', foreignKey: 'mealId' });
    this.belongsTo(models.User, { as: 'chef', foreignKey: 'chefId' });
  }
}

Meal.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {
  sequelize,
  tableName: 'meals',
  paranoid: true,
  timestamps: true,
  modelName: 'Meal',
  hooks: {},
});

module.exports = { Meal };
