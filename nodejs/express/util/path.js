const path = require('path');

// mainModule - app.js - gives us the path to the file that is responsible for the fact that our app is running
module.exports = path.dirname(process.mainModule.filename);