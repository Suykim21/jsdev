const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; // {id: 1234, qty: 1} Giving same object by spread by copying the array not reference to avoid destruction of initial object and array
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct]; // Adding new product to cart.products array
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) { // If deleted items are not available - ignore
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);

      if (!product) { // If product is not part of the cart
        return;
      }
      const productQty = product.qty; // find the quantity
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id); // Creating new array that does not match product id - deleting
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  };

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) { // If cart is empty, pass in null value
        cb(null);
      } else {
        cb(cart);
      }
    });
  };
};
