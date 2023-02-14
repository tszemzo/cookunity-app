const mealsInterface = require('../interfaces/meals');
const userInterface = require('../interfaces/user');
const ratingsInterface = require('../interfaces/ratings');
const { MIN_RATING, MAX_RATING } = require('../utils/constants');

const self = {
  createRating,
};

module.exports = self;

async function createRating({
  rate,
  customerId,
  mealId,
} = {}) {
  if (!rate || !customerId || !mealId) {
    throw new Error('Missing required fields');
  }

  if (rate < MIN_RATING || rate > MAX_RATING) {
    throw new Error(`Rate must be between ${MIN_RATING} and ${MAX_RATING}`);
  }

  const customer = await userInterface.getCustomerById(customerId);
  if (!customer) {
    throw new Error(`Customer ${customerId} not found`);
  };
 
  const meal = await mealsInterface.getMealById(mealId);
  if (!meal) {
    throw new Error(`Meal ${mealId} not found`);
  };

  const rating = await ratingsInterface.getRating(customerId, mealId);
  if (rating) {
    throw new Error('You already rated this meal');
  };

  return ratingsInterface.createRating({
    rate,
    customerId,
    mealId,
  });
}
