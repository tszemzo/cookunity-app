const { Meal } = require('../db/models/meal');
const { User } = require('../db/models/user');
const { USER_ROLES } = require('../utils/constants');

const { sequelize } = require('../db/setup');

const self = {
  createMeal,
  getMealById,
  getMeals,
  getMealsWithRatings,
};

module.exports = self;

function createMeal({
  chefId,
  name,
  description,
}) {
  return Meal.create({
    chefId,
    name,
    description,
  });
}

function getMealsWithRatings(chefId) {
  const mealsWithRatings = sequelize.query(
    `
      SELECT
        m.id,
        m.name,
        m.description,
        m."chefId",
        AVG(rate) AS "avgRate"
      FROM meals m
      INNER JOIN "ratings" r ON m.id = r."mealId"
      WHERE "chefId" = :chefId
      GROUP BY m.id;
    `,
    {
      replacements: { chefId },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return mealsWithRatings;
}

function getMealById(id, includeChef = false) {
  const options = {
    raw: true,
  };

  if (includeChef) {
    options.include = {
      model: User,
      as: 'chef'
    }
  }

  return Meal.findOne({
    where: {
      id,
    },
    ...options,
  });
}

function getMeals(chefName) {
  const chef = {
    model: User,
    as: 'chef'
  };

  if (chefName) {
    chef.where = {
      name: chefName, // Exact match, this could be a LIKE operator
      roleId: USER_ROLES.CHEF,
    };
  }

  return Meal.findAll({
    include: chef,
  });
}
