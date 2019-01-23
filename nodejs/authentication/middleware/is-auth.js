module.exports = (req, res, next) => {
  // If user accessing the pages by manually typing the url, check to see if they're logged in, if they're not redirect them to login page.
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  // if user is logged in allow middleware to continue
  next(); // ex: adminController.getProducts etc.
}