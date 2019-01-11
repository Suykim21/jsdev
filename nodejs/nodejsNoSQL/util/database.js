const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// private variable to only interact in this file only
let _db;

const mongoConnect = callback => { // callback from app.js
  MongoClient.connect(
    "mongodb+srv://suykim21:mUFwxi3FWU0chSPn@cluster0-nrlgb.mongodb.net/shop?retryWrites=true"
  )//S12 - L178 1:05
    .then(client => {
      console.log('Connected!');
      _db = client.db(); // ex: shop
      callback(); // app.listen(3000)
    })
    .catch(err => {
      console.log(err);
      throw err;
    }); // creating connection;
};

// Checks if database is connected or exist
const getDb = () => {
  if (_db) { // If database is set, return db
    return _db;
  }
  throw 'No database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;