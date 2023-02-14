const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const { 
  fakeMeal,
  fakeCustomer,

  CUSTOMER_ID,
} = require('../mockData/data');

const { MIN_RATING, MAX_RATING } = require('../../utils/constants');

const mealsInterface = require('../../interfaces/meals');
const userInterface = require('../../interfaces/user');
const ratingsInterface = require('../../interfaces/ratings');

describe('controllers/ratings', () => {
  let ratingsController;
  let mealsInterfaceStub;
  let userInterfaceStub;
  let ratingsInterfaceStub;

  before(() => {
    // import file to test
    ratingsController = require('../ratings');
  });

  afterEach(() => {
    if (ratingsInterfaceStub) {
      ratingsInterfaceStub.restore();
    }

    if (userInterfaceStub) {
      userInterfaceStub.restore();
    }

    if (mealsInterfaceStub) {
      mealsInterfaceStub.restore();
    }
  });

  describe('createRating', () => {
    it('should throw an error when no required params provided', async () => {
      try {
        await ratingsController.createRating();
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Missing required fields');
      }
    });

    it('should throw an error when empty object provided', async () => {
      try {
        await ratingsController.createRating({});
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Missing required fields');
      }
    });

    it('should throw an error when rate is provided but still missing customer and meal IDs', async () => {
      try {
        await ratingsController.createRating({
          rate: 3,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Missing required fields');
      }
    });

    it('should throw an error when rate and customer ID are provided but still missing meal IDs', async () => {
      try {
        await ratingsController.createRating({
          rate: 3,
          customerId: CUSTOMER_ID,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Missing required fields');
      }
    });

    it('should throw an error when rate is above the MAX RATE', async () => {
      try {
        await ratingsController.createRating({
          rate: 999,
          customerId: CUSTOMER_ID,
          mealId: fakeMeal.id,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql(`Rate must be between ${MIN_RATING} and ${MAX_RATING}`);
      }
    });

    it('should throw an error when rate is below the MIN RATE', async () => {
      try {
        await ratingsController.createRating({
          rate: -1,
          customerId: CUSTOMER_ID,
          mealId: fakeMeal.id,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql(`Rate must be between ${MIN_RATING} and ${MAX_RATING}`);
      }
    });

    it('should throw an error when customer is not found', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getCustomerById').returns(null);

      try {
        await ratingsController.createRating({
          rate: 3,
          customerId: CUSTOMER_ID,
          mealId: fakeMeal.id,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(userInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Customer ${CUSTOMER_ID} not found`);
      }
    });

    it('should throw an error when meal is not found', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getCustomerById').returns(fakeCustomer);
      mealsInterfaceStub = sinon.stub(mealsInterface, 'getMealById').returns(null);

      try {
        await ratingsController.createRating({
          rate: 3,
          customerId: CUSTOMER_ID,
          mealId: fakeMeal.id,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(userInterfaceStub.calledOnce).to.be.true;
        expect(mealsInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Meal ${fakeMeal.id} not found`);
      }
    });

    it('should throw an error the meal was already rated by yourself', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getCustomerById').returns(fakeCustomer);
      mealsInterfaceStub = sinon.stub(mealsInterface, 'getMealById').returns(fakeMeal);
      ratingsInterfaceStub = sinon.stub(ratingsInterface, 'getRating').returns({ id: 1000, rate: 3 });

      try {
        await ratingsController.createRating({
          rate: 3,
          customerId: CUSTOMER_ID,
          mealId: fakeMeal.id,
        });
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(userInterfaceStub.calledOnce).to.be.true;
        expect(mealsInterfaceStub.calledOnce).to.be.true;
        expect(ratingsInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql('You already rated this meal');
      }
    });

    it('should create the rating correctly', async () => {
      userInterfaceStub = sinon.stub(userInterface, 'getCustomerById').returns(fakeCustomer);
      mealsInterfaceStub = sinon.stub(mealsInterface, 'getMealById').returns(fakeMeal);
      ratingsInterfaceStub = sinon.stub(ratingsInterface, 'getRating').returns(null);
      ratingsInterfaceStub = sinon.stub(ratingsInterface, 'createRating').returns('ok');

      await ratingsController.createRating({
        rate: 3,
        customerId: CUSTOMER_ID,
        mealId: fakeMeal.id,
      });
      expect(userInterfaceStub.calledOnce).to.be.true;
      expect(mealsInterfaceStub.calledOnce).to.be.true;
      expect(ratingsInterfaceStub.calledOnce).to.be.true;
    });
  });
});
