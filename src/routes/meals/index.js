const router = require('express').Router();

const logger = require('../../logger');
const { verifyToken } = require('../../middleware/verifyToken');
const { isCustomer, isChef } = require('../../middleware/permission');
const mealsController = require('../../controllers/meals');

/* ****** route definitions ****** */
router.get('/ratings', verifyToken, isChef, getMealsWithRatings);
router.get('/', verifyToken, isCustomer, getMeals);
router.post('/', verifyToken, isChef, createMeal);

module.exports = router;

async function getMealsWithRatings(req, res) {
  try {
    const { id: chefId } = req.currentUser;
    const meals = await mealsController.getMealsWithRatings(chefId);
    res.status(200).json(meals);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getMeals(req, res) {
  try {
    const { chef } = req.query;
    const meals = await mealsController.getMeals(chef);
    res.status(200).json(meals);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function createMeal(req, res) {
  try {
    const { id: chefId } = req.currentUser;
    const { name, description = '' } = req.body;

    const meals = await mealsController.createMeal({
      chefId,
      name,
      description
    });
    
    res.status(201).json(meals);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}
