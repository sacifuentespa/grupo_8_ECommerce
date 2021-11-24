const productsModel = require("../model/products");

const controller = {
  getNewProduct: (req, res) => {
    res.render("products/productUpload", { title: "Publicar Producto" });
  },
  getProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    res.render("products/product", {title: product.productName, product: product});
  },
  getProducts: (req, res) => {
    let products = productsModel.getProducts;
    res.render("products/listProducts", {title: "Productos", products: products})
  },
  uploadNewProduct: (req, res) => {
    let product = productsModel.newProduct(req.body, req.files)
    res.render("products/product", {title: product.productName, product: product});
  },
  getUpdateProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    res.render("products/productUpload", {title: "Actualizar producto", product: product})
  },
  uploadUpdateProduct: (req, res) => {
    productsModel.updateProduct(req.body)
    res.redirect(`product/${req.body.id}`);
  },
  deleteProduct: (req, res) => {
    productsModel.deleteProduct(req.body.id)
    res.redirect("/")
  }
}

module.exports = controller;
