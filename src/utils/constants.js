const USER_ROLES = Object.freeze({
  CUSTOMER: 1,
  CHEF: 2,
});

const MIN_RATING = 1;
const MAX_RATING = 5;

const SALT_ROUNDS = 10;

const TOKEN_EXPIRATION = 86400; // 24hs

module.exports = {
  USER_ROLES,
  MIN_RATING,
  MAX_RATING,
  SALT_ROUNDS,
  TOKEN_EXPIRATION,
};
