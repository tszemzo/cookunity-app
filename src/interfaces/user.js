const { Meal } = require('../db/models/meal');
const { User } = require('../db/models/user');
const { USER_ROLES } = require('../utils/constants');

const self = {
  createUser,
  getChefById,
  getCustomerById,
  getUserByEmail,
  getUserById,
};

module.exports = self;

function getCustomerById(customerId) {
  return User.findOne({
    where: {
      id: customerId,
      roleId: USER_ROLES.CUSTOMER,
    },
    raw: true
  });
}

function getChefById(chefId, {
  includeMeals = false,
  includeRatings = false,
} = {}) {
  const options = {
    raw: true,
  };

  if (includeMeals) {
    options.include = [{
      model: Meal,
      as: 'meals',
    }];
  }

  if (includeRatings) {
    options.include = [{
      model: Meal,
      as: 'meals',
      include: [{
        model: MealRating,
        as: 'ratings',
      }],
    }];
  }

  return User.findOne({
    where: {
      id: chefId,
      roleId: USER_ROLES.CHEF,
    },
    ...options,
  });
}

function getUserByEmail(email) {
  return User.findOne({
    where: {
      email,
    },
    raw: true
  });
}

function getUserById(id) {
  return User.findOne({
    where: {
      id,
    },
    raw: true
  });
}

function createUser({
  name,
  email,
  password,
  roleId,
}) {
  return User.create({
    name,
    email,
    password,
    roleId,
  });
}

