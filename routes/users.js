const router = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getProfile);

router.get('/user/me', getCurrentUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
