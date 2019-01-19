const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5baa2528563f16379fc8a610')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Lands here if no routes is available
app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://suykim21:mUFwxi3FWU0chSPn@cluster0-ntrwp.mongodb.net/test?retryWrites=true'
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.error(err);
  });
