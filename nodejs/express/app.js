const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin'); // requires module.exports = router
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); //exposes the resulting object (key/values) on req.body - Extended: false does not allow nested objects
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files in public folder

// Filtering Path - makes all routes from admin to start with /admin/add-product
app.use('/admin', adminRoutes); // uses routes from routes/admin.js
app.use(shopRoutes);

// 404 error - using use method to capture every request
app.use((req, res, next) => { 
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
