//import db

const controller = {
  getIndex: (req, res) => {
    res.render("products/index");
  },
  getProduct: (req, res) => {
    res.render("products/product");
  },
  getNewProduct: (req, res) => {
    res.render("products/productUpload");
  },
  getCart: (req, res) => {
    res.render("products/cart");
  },
  getLogin: (req, res) => {
    res.render("users/login");
  },
  getRegister: (req, res) => {
    res.render("users/register");
  },
};

module.exports = controller;
