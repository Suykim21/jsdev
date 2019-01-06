const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  // __dirname points to routes - ex: /Users/suykim21/Desktop/dev/js/nodejs/express/routes
  console.log('shop.js', adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html')); // from routes go to express project folder and go to views and access shop.html
});

module.exports = router;
