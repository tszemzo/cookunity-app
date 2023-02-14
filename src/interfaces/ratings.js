const { Rating } = require('../db/models/rating');

const self = {
  createRating,
  getRating,
};

module.exports = self;

function createRating({
  rate,
  customerId,
  mealId,
}) {
  return Rating.create({
    rate,
    customerId,
    mealId,
  });
}

function getRating(customerId, mealId) {
  return Rating.findOne({
    where: {
      customerId,
      mealId
    },
    raw: true,
  });
}
