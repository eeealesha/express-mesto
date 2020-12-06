const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.get('*', function(req, res){
  res.send({ "message": "Запрашиваемый ресурс не найден" }, 404);
});

app.listen(PORT, () =>{
  console.log(`App is on port ${PORT}`)
})