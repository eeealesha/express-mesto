const router = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
  updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getProfile);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

module.exports = router;
