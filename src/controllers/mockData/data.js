const { USER_ROLES } = require('../../utils/constants');

const CHEF_ID = 999;
const CUSTOMER_ID = 888;

const fakeMeal = {
  id: 4,
  chefId: CHEF_ID,
  description: "Amazing pasta",
  name: 'Pasta alfredo',
  createdAt: "2022-12-07T06:33:42.354Z",
  updatedAt: "2022-12-07T06:33:42.354Z",
};

const fakeChef = {
  id: CHEF_ID,
  name: 'Harry Chef',
  email: 'harry@gmail.com',
  roleId: USER_ROLES.CHEF,
}

const fakeCustomer = {
  id: CHEF_ID,
  name: 'Peter Customer',
  email: 'peter@gmail.com',
  roleId: USER_ROLES.CUSTOMER,
}


module.exports = {
  fakeMeal,
  fakeChef,
  fakeCustomer,

  CHEF_ID,
  CUSTOMER_ID,
};
