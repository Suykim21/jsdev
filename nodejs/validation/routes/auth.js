const express = require('express');
// Destructuring - grabs the function
const { check } = require('express-validator/check'); // grabbing specific subpackage called check

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);
// check - name="prop" - withMessage - adding custom message;
router.post('/signup', check('email').isEmail().withMessage('Please enter valid email').custom((value, {req}) => {
  if (value === 'test@test.com') {
    throw new Error('This email address is forbidden');
  }
  return true;
}), authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
