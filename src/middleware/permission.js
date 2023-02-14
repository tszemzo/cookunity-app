const { USER_ROLES } = require('../utils/constants');

const isChef = async (req, res, next) => {
  const { roleId } = req.currentUser;
  if (roleId !== USER_ROLES.CHEF) {
    return res.status(403).send({ message: "Forbidden!" });
  }
  next();
};

const isCustomer = async (req, res, next) => {
  const { roleId } = req.currentUser;
  if (roleId !== USER_ROLES.CUSTOMER) {
    return res.status(403).send({ message: "Forbidden!" });
  }
  next();
};

module.exports = { 
  isChef,
  isCustomer
 };