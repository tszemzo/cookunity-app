const router = require('express').Router();

const logger = require('../../logger');
const { verifyToken } = require('../../middleware/verifyToken');
const { isCustomer } = require('../../middleware/permission');
const ratingsController = require('../../controllers/ratings');

/* ****** route definitions ****** */
router.post('/', verifyToken, isCustomer, createRating);

module.exports = router;

async function createRating(req, res) {
  try {
    const { id: customerId } = req.currentUser;
    const { mealId, rate } = req.body;
    const rating = await ratingsController.createRating({
      rate,
      customerId,
      mealId
    });
    
    res.status(201).json(rating);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}
