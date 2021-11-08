//import db

const controller = {
  getIndex: (req, res) => {
    res.render("products/index", {tittle: "Trueque Online"});
  },
  getProduct: (req, res) => {
    res.render("products/product", {tittle: "nameProduct"});
  },
  getNewProduct: (req, res) => {
    res.render("products/productUpload", {tittle: "Publicar Producto"});
  },
  getCart: (req, res) => {
    res.render("products/cart", {tittle: "Mi Carrito"});
  },
  getLogin: (req, res) => {
    res.render("users/login", {tittle: "Iniciar Sesión"});
  },
  getRegister: (req, res) => {
    res.render("users/register", {tittle: "Crear Usuario"});
  },
};

module.exports = controller;
