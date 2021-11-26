const productsModel = require("../model/products");

const controller = {
  getIndex: (req, res) => {
    let products = productsModel.getProducts();
    res.render("products/index", {title: "Trueque Online", products: products});
  },
  getCart: (req, res) => {
    res.render("products/cart", {title: "Mi Carrito"});
  }
};

module.exports = controller;
