const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) { // if there is no data in products.json - return empty arr
            return cb([]);
        }
        cb(JSON.parse(fileContent)); // gets Products count for length
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => { // JSON.parse(fileContent)
            products.push(this); // appending new product to products
            fs.writeFile(p, JSON.stringify(products), err => console.log(err)); // writing new product in json format to products.json
        });
    }

    static fetchAll(cb) { // Products.fetchAll(products => {}) ...
        getProductsFromFile(cb);
    }
}