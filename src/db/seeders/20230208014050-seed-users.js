const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Chef',
      email: 'johnchef@gmail.com',
      password: bcrypt.hashSync('asdasdasd', 8),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Peter Chef',
      email: 'peterchef@gmail.com',
      password: bcrypt.hashSync('asdasdasd', 8),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Derek Customer',
      email: 'derekcustomer@gmail.com',
      password: bcrypt.hashSync('asdasdasd', 8),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
