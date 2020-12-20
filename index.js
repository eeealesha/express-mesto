const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const mongoose = require('mongoose');
const {PORT = 3000} = process.env;
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb',{
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true
  })

app.use((req, res, next) => {
  req.user = {
    _id: '5fdf7fde4ecda44055e14854' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(bodyParser.json());

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.get('*', function(req, res){
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () =>{
  console.log(`App is on port ${PORT}`)
})