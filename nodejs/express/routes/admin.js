const path = require('path');
const express = require('express');
// rootDir - /Users/suykim21/Desktop/dev/js/nodejs/express
const rootDir = require('../util/path'); 
const router = express.Router();

const products = [];

// Filtering path /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// Accepts only POST request /admin/add-product => POST
router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router; // Exporting routes
exports.products = products; // in app.js - adminData.products