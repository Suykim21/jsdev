const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);

const Cart = require('./cart');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { // if there is no data in products.json - return empty arr
            return cb([]);
        }
        cb(JSON.parse(fileContent)); // gets Products count for length
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id; // Used for already existing product that has id for update.
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => { // JSON.parse(fileContent)
            // if Product has id already - update product
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                // Pull out from exisitng array to create new array (copy)
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this // this refers to updated product (object)
                console.log(updatedProducts);
                fs.writeFile(p, JSON.stringify(updatedProducts), err => console.log(err))
            } else {
                this.id = Math.random().toString(); // unique id for each product - New Product only
                products.push(this); // appending new product to products
                fs.writeFile(p, JSON.stringify(products), err => console.log(err)); // writing new product in json format to products.json
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            // Filter - Creates new array with all elements that pass the test
            const updatedProducts = products.filter(prod => prod.id !== id);
            console.log('updatedProducts', updatedProducts);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) { // If no error, remove from cart
                    Cart.deleteProduct(id, product.price);
                } else {
                    console.log('error at deletebyid', err)
                }
            });
        });
    }

    static fetchAll(cb) { // Products.fetchAll(products => {}) ...
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    };
}