const User = require('../models/user');

// hashing password
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  // req.flash has empty array to begin with
  // the code below is to prevent flash message to not persist in views
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  // req.flash has empty array to begin with
  // the code below is to prevent flash message to not persist in views
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      // if user is not found through email
      if (!user) {
        // req.flash - key / value
        req.flash('error', 'Invalid email or password.'); // connect-flash package;
        return res.redirect('/login');
      }
      // Unhasing password and comparing to user's password
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          // if password are equal to hashed password
          if (doMatch) {
            // Storing user data to session
            console.log('im at postlogin 1st')
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log('im at postlogin 2');
            // return to avoid code execution on line 47 res.redirect('/login')
            return req.session.save(err => {
              console.log(err);
              res.redirect('/'); // redirecting to homepage
            });
          }
          req.flash('error', 'Invalid email or password.'); // connect-flash 
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
        req.flash('error', 'Email exists already. Please choose different email'); // connect-flash 
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
