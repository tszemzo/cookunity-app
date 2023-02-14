const router = require('express').Router();

const logger = require('../../logger');
const userController = require('../../controllers/user');

/* ****** route definitions ****** */
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;

async function signUp(req, res) {
  try {
    const { email, password, name, isChef } = req.body;
    const response = await userController.signUp({ email, password, name, isChef });
    res.status(201).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ error: err.message });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userController.signIn({
      email,
      password,
    });
    
    res.status(200).json(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}
