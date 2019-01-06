const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const adminData = require('./routes/admin'); // requires module.exports = router
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs') // Use ejs templating engine
app.set('views', 'views') // Instructing nodejs where templating engine will be used - 'views', folder name

app.use(bodyParser.urlencoded({extended: false})); //exposes the resulting object (key/values) on req.body - Extended: false does not allow nested objects
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files in public folder

// Filtering Path - makes all routes from admin to start with /admin/add-product
app.use('/admin', adminData.routes); // uses routes from routes/admin.js
app.use(shopRoutes);

// 404 error - using use method to capture every request
app.use((req, res, next) => { 
    res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

app.listen(3000);
