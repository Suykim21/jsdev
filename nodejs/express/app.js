const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const adminRoutes = require('./routes/admin'); // requires module.exports = router
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); //exposes the resulting object (key/values) on req.body - Extended: false does not allow nested objects

app.use(adminRoutes); // uses routes from routes/admin.js
app.use(shopRoutes);

// 404 error - using use method to capture every request
app.use((req, res, next) => { 
    res.status(404).send('<h1>Page not found</h1>')
});

app.listen(3000);
