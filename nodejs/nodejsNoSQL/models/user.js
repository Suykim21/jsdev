const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id; 
  }

  save() {
    const db = getDb;
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items] // new array - copy not ref

    if (cartProductIndex >= 0) { // if there are items inside the cart - increment
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else { // new item being added;
      updatedCartItems.push({
        productId: new ObjectId(product._id), 
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {_id: new ObjectId(this._id)},
        { $set: {cart: updatedCart}}
      );
  }

  getCart() {
    const db = getDb();
    // Creates array with product ids
    const productIds = this.cart.items.map(i => {
      console.log('map', i.productId);
      return i.productId;
    });
    return db.collection('products')
    // Looks at products collection where _id field is equal to productIds
      .find({_id: {$in: productIds}})
      .toArray() // Returns an array that contains all the documents
      .then(products => { 
        return products.map(p => { // Creates new array 
          // Returns array that productId matching product_id from database
          // along iwth its quantity
          return {...p, quantity: this.cart.items.find(i => { 
              return i.productId.toString() === p._id.toString();
          }).quantity
        }
      });
    });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString(); // Return items that won't be deleted
    });

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {_id: new ObjectId(this._id)},
        { $set: { cart: {items: updatedCartItems }}}
      );
  }

  // Sending Order
  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => { // Get Array of products (cart)
        const order = { // Create order with cart data
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          }
        };
        return db.collection('orders').insertOne(order);
      })
      .then(result => {
          this.cart = {items: []}; // Clear cart when new order has been added
          return db
            .collection('users')
            .updateOne( // Clear items in cart object as well.
              {_id: new ObjectId(this._id)},
              { $set: { cart: {items: [] }}}
          )
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders')
      // Look for user id that matches db _id
      .find({'user._id': new ObjectId(this._id)})
      // Return array of orders
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new ObjectId(userId)})
      .then(user => {
        console.log(user)
        return user;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
