const productsModel = require("../model/products");

const controller = {
  getIndex: async (req, res) => {
    try{let products = await productsModel.getProducts()
    res.render("products/index", {title: "Trueque Online", products: products});
  }catch(error){console.error(error)}},
  getCart: (req, res) => {
    res.render("products/cart", {title: "Mi Carrito"});
  }
};

module.exports = controller;
