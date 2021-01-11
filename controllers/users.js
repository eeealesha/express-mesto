const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');

const getProfile = (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getCurrentUser = (req, res) => {
  const id = req.user._id;
  User.find({ _id: id })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(400).send({ message: `Пользователь с email: ${req.body.email} уже существует` });
      }
      return res.status(500).send(err);
    });
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const newName = req.body.name;
  const newAbout = req.body.about;
  User.findOneAndUpdate(
    { _id: id },
    { name: newName, about: newAbout },
    { runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send(err);
    });
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const newAvatar = req.body.avatar;
  User.findOneAndUpdate(
    { _id: id },
    { avatar: newAvatar },
    { runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    // аутентификация успешна! пользователь в переменной user
    })
    .catch((err) => {
    // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateUser, updateAvatar, login, getCurrentUser,
};
