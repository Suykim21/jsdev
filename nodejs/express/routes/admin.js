const path = require('path');
const express = require('express');
// rootDir - /Users/suykim21/Desktop/dev/js/nodejs/express
const rootDir = require('../util/path'); 
const router = express.Router();

// Filtering path /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  console.log(rootDir);
  console.log('hi im here')
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// Accepts only POST request /admin/add-product => POST
router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router; // Exporting routes