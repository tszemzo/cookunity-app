const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../setup');
const { MIN_RATING, MAX_RATING } = require('../../utils/constants');

class Rating extends Model {
  /*
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Meal, { as: 'meal', foreignKey: 'mealId' });
    this.belongsTo(models.User, { as: 'customer', foreignKey: 'customerId' });
  }
}

Rating.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
      min: MIN_RATING,
      max: MAX_RATING
    }
  },
}, {
  sequelize,
  tableName: 'ratings',
  paranoid: true,
  timestamps: true,
  modelName: 'Rating',
  hooks: {},
});

module.exports = { Rating };
