const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://suykim21:mUFwxi3FWU0chSPn@cluster0-nrlgb.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 1");
    console.log('Favicon blocked...');
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

const csrfProtection = csrf();

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 2");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 3");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.set('views', 'views');

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 4");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
const adminRoutes = require('./routes/admin');

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 5");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 6");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
const authRoutes = require('./routes/auth');
app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 7");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 8");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 9");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 10");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use(csrfProtection);

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 11");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use(flash());

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 12");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      console.log('session?');
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 13");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 14");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 15");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.use(shopRoutes);

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 16");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.use(authRoutes);

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 17");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 18");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 19");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
app.use(errorController.get404);
app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    console.log("=====blocked 20");
    console.log('Favicon blocked...')
    return res.send('Blocking favicon to not create more sessions... Implement code for handling favicons.')
  }
  next();
});
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
