const User = require('../models/user');

// hashing password
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('I AM AT POST LOGIN');
  User.findOne({email: email})
    .then(user => {
      // if user is not found through email
      if (!user) {
        return res.redirect('/login');
      }
      // Unhasing password and comparing to user's password
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          // if password are equal to hashed password
          if (doMatch) {
            // Storing user data to session
            req.session.isLoggedIn = true;
            req.session.user = user;
            // return to avoid code execution on line 47 res.redirect('/login')
            return req.session.save(err => {
              console.log(err);
              res.redirect('/'); // redirecting to homepage
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.error(err);
          res.redirect('/login');
        })
      
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // Checking if email exists
  User.findOne({email: email})
    .then(userDoc => {
      if(userDoc) { // if user exists redirec them for now.
        return res.redirect('/signup');
      }
      // first value is string (password to be hashed) - how many rounds to salt
      return bcrypt
        .hash(password, 12)// returns promise
        .then(hashedPassword => { // from bcrypt.hash - then only executed during hashing
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: []}
          });
    
          return user.save();
        })
        .then(result => {
          res.redirect('/login'); // Redirect to login page after sign up
        })
        .catch(err => console.error('errored during hashing process', err));
    }) // for catcthing any signup eror - ex: line 42
    .catch(err => console.error('im errored out in postSignup', err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
