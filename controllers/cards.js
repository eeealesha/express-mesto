const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  Card.create({ owner, ...req.body })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: `${err}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send({ message: `${err}` }));
};

module.exports = { getCards, createCard, deleteCard };
