const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // when id is passed, create new mongodb id else put null - creating new id product
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb(); // Returns connected database mongodb
    let dbOp; // database operation
    if (this._id) { // if id is set
      // Update the product
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this}); // second arg - how to update, $set (reserved name) - this refers to {title: this.tile, price: this.price} etc. (short hand)
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err =>{
      console.log(err);
    });
  }

  static fetchAll() {
    const db = getDb(); // Returns connected database mongodb
    // toArray turns all data into js array
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      }); 
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectId(prodId)}) // to access _id: ObjectId(...)
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.error(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log('Deleted');
      })
      .catch( err => {
        console.error(err);
      })
  }
}

module.exports = Product;
