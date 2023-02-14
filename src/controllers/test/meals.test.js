const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const { 
  fakeMeal,
  fakeChef,

  CHEF_ID,
} = require('../mockData/data');

const mealsInterface = require('../../interfaces/meals');
const userInterface = require('../../interfaces/user');

describe('controllers/meals', () => {
  let mealsController;
  let mealsInterfaceStub;
  let userInterfaceStub;

  before(() => {
    // import file to test
    mealsController = require('../meals');
  });

  afterEach(() => {
    if (mealsInterfaceStub) {
      mealsInterfaceStub.restore();
    }

    if (userInterfaceStub) {
      userInterfaceStub.restore();
    }
  });

  describe('getMealsWithRatings', () => {
    it('should throw an error when no chef ID provided', async () => {
      try {
        await mealsController.getMealsWithRatings();
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Chef ID is required');
      }
    });

    it('should return an empty array as there are no meals for this chefId', async () => {
      const mockedRecords = [];
      mealsInterfaceStub = sinon.stub(mealsInterface, 'getMealsWithRatings').returns(mockedRecords);

      const records = await mealsController.getMealsWithRatings(CHEF_ID);
      expect(mealsInterfaceStub.calledOnce).to.be.true;
      expect(records).to.equal(mockedRecords);
      expect(records).to.have.lengthOf(0);
    });

    it('should return all records', async () => {
      const mockedRecords = [fakeMeal];
      mealsInterfaceStub = sinon.stub(mealsInterface, 'getMealsWithRatings').returns(mockedRecords);

      const records = await mealsController.getMealsWithRatings(CHEF_ID);
      expect(mealsInterfaceStub.calledOnce).to.be.true;
      expect(records).to.equal(mockedRecords);
      expect(records).to.have.lengthOf(1);
    });
  });

  describe('createMeal', () => {
    it('should throw an error when no chef ID provided', async () => {
      try {
        await mealsController.createMeal();
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Chef ID is required');
      }
    });

    it('should throw an error when empty object provided', async () => {
      try {
        await mealsController.createMeal({});
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Chef ID is required');
      }
    });

    it('should throw an error when no name for the meal provided', async () => {
      try {
        await mealsController.createMeal({
          chefId: CHEF_ID,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Name is required to create a Meal');
      }
    });

    it('should throw an error when the chef is not found', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getChefById').returns(null);

      try {
        await mealsController.createMeal({
          chefId: CHEF_ID,
          name: fakeMeal.name,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(userInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Chef ${CHEF_ID} not found`);
      }
    });

    it('should create a meal correctly', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getChefById').returns(fakeChef);
      mealsInterfaceStub = sinon.stub(mealsInterface, 'createMeal');

      await mealsController.createMeal({
        chefId: CHEF_ID,
        name: fakeMeal.name,
        description: fakeMeal.description
      });
      expect(userInterfaceStub.calledOnce).to.be.true;
      expect(mealsInterfaceStub.calledOnce).to.be.true;
    });
  });
});
