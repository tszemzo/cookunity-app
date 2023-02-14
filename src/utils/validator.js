const PASSWORD_MAX = 20;
const PASSWORD_MIN = 8;

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;
}

module.exports = {
  validateEmail,
  validatePassword,
};
