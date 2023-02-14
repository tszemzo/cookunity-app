module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('meals', [{
      name: 'NoodleSoup',
      description: 'Delicious noodle soup',
      chefId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'EggplantParmesan',
      description: 'Delicious eggplant parmesan salad',
      chefId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('meals', null, {});
  },
};
