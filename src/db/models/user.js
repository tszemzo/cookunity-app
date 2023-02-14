const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../setup');
const { USER_ROLES } = require('../../utils/constants');

class User extends Model {
  /*
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.hasMany(models.Meal, { as: 'meals', foreignKey: 'chefId' });
    this.hasMany(models.Rating, { as: 'ratings', foreignKey: 'customerId' });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  roleId: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[
        USER_ROLES.CUSTOMER,
        USER_ROLES.CHEF,
      ]],
    },
  },
}, {
  sequelize,
  tableName: 'users',
  paranoid: true,
  timestamps: true,
  modelName: 'User',
  hooks: {},
});

module.exports = { User };
