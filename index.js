const express = require('express');
const app = express();
const path = require('path');
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

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.get('*', function(req, res){
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () =>{
  console.log(`App is on port ${PORT}`)
})