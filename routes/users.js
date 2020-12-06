const router = require('express').Router();
const getUser = require('../controllers/users');
const getProfile = require('../controllers/users');

router.get('/users', getUser);

router.get('/users/:id', getProfile);

module.exports = router;