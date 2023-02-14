const router = require('express').Router();

router.use('/meals', require('./meals'));
router.use('/ratings', require('./ratings'));
router.use('/user', require('./user'));

module.exports = router;
