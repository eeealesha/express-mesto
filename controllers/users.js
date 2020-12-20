const User = require('../models/user');

const getProfile = (req,res) => {
  const {id} = req.params;
  User.findOne({id})
    .then(user => {
      if (!user) {
        return res.status(404).send({'message':'Нет пользователя с таким id'})
      }
      return res.status(200).send(user);
    })
    .catch(err =>  res.status(500).send({'message':`${err}`}))
};

const getUsers = (req,res) => {
  User.find({})
        .then(users => res.status(200).send(users))
        .catch(err =>  res.status(500).send(err))
};

const createUser = (req,res) => {
  return User.countDocuments()
    .then(count => {
      return User.create({id: count, ...req.body})
        .then(users => res.status(200).send(users))
        .catch(err =>  res.status(400).send(err))
    })
};

module.exports = {getUsers, getProfile, createUser};