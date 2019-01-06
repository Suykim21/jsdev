const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
  // __dirname points to routes - ex: /Users/suykim21/Desktop/dev/js/nodejs/express/routes
  res.sendFile(path.join(rootDir, 'views', 'shop.html')); // from routes go to express project folder and go to views and access shop.html
});

module.exports = router;
