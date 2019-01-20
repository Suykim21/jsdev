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
  User.findById('5c43dc649db9990486a561b6')
    .then(user => {
      req.user = user;
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
    "mongodb+srv://suykim21:mUFwxi3FWU0chSPn@cluster0-nrlgb.mongodb.net/shop?retryWrites=true"
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Steve',
          email: 'steve@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.error(err);
  });
