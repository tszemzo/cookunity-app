const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const logger = require('../logger');
const { JWT_KEY } = require('../config');

const userInterface = require('../interfaces/user');
const { validateEmail, validatePassword } = require('../utils/validator');
const { TOKEN_EXPIRATION, USER_ROLES , SALT_ROUNDS } = require('../utils/constants');

const self = {
  signUp,
  signIn,
};

module.exports = self;

async function signIn({ email, password }) {
  if (!email || !validateEmail(email)) {
    throw new Error('Email must be valid');
  }

  if (!password) {
    throw new Error('You must supply a password');
  }

  const existingUser = await userInterface.getUserByEmail(email);
  if (!existingUser) {
    throw new Error('Invalid credentials');
  }

  const passwordsMatch = bcrypt.compareSync(password, existingUser.password);
  if (!passwordsMatch) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign({ id: existingUser.id }, JWT_KEY, {
    expiresIn: TOKEN_EXPIRATION
  });

  return {
    id: existingUser.id,
    email: existingUser.email,
    roleId: existingUser.roleId,
    accessToken: token
  };
};

async function signUp({ email, password, name = '', isChef = false}) {
  if (!email || !validateEmail(email)) {
    throw new Error('Email must be valid');
  }

  if (!password || !validatePassword(password)) {
    throw new Error('Password must be between 8 and 20 characters');
  }

  const existingUser = await userInterface.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Failed! Email is already in use!');
  }

  const user = await userInterface.createUser({
    email,
    password: bcrypt.hashSync(password, SALT_ROUNDS),
    name,
    roleId: isChef ? USER_ROLES.CHEF : USER_ROLES.CUSTOMER
  })
  
  logger.info(`User ${email} created successfully`);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
