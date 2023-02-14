const { Meal } = require('./meal');
const { User } = require('./user');
const { Rating } = require('./rating');

const db = {
  Meal,
  User,
  Rating,
};

const associate = () => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

module.exports = { associate };
