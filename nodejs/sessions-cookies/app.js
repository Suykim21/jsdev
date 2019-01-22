const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// Storing session into mongodb
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://suykim21:mUFwxi3FWU0chSPn@cluster0-nrlgb.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI, // requires connection string
  collection: 'sessions' // storing onto sessions collection
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret', // used for signing the hash which secretly stors id in the cookie
    resave: false, // Session will not be saved on every response
    saveUninitialized: false, // Session will not bget saved for a request
    store: store // Stroing const store = new MongoDBStore ...
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next(); // Return so User.findById does not get run
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next(); // next to app.use('/admin) ...
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
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
    console.log(err);
  });
