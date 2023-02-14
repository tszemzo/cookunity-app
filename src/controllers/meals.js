const mealsInterface = require('../interfaces/meals');
const userInterface = require('../interfaces/user');

const self = {
  getMealById,
  getMealsWithRatings,
  getMeals,
  createMeal,
};

module.exports = self;

function getMealsWithRatings(chefId) {
  if (!chefId) {
    throw new Error('Chef ID is required');
  }

  return mealsInterface.getMealsWithRatings(chefId);
}

function getMealById(id) {
  if (!id) {
    throw new Error('Meal ID is required');
  }

  return mealsInterface.getMealById(id);
}

function getMeals(chef) {
  return mealsInterface.getMeals(chef);
}

async function createMeal({
  chefId,
  name,
  description = '',
} = {}) {
  if (!chefId) {
    throw new Error('Chef ID is required');
  }

  if (!name) {
    throw new Error('Name is required to create a Meal');
  }

  const chef = await userInterface.getChefById(chefId);
  if (!chef) {
    throw new Error(`Chef ${chefId} not found`);
  };

  return mealsInterface.createMeal({
    chefId,
    name,
    description,
  });
}
