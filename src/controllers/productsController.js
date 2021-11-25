const productsModel = require("../model/products");

const controller = {
  getNewProduct: (req, res) => {
    res.render("products/productUpload", { title: "Publicar Producto" });
  },
  getProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    if(product){
      res.render("products/product", {title: product.productName, product:product});
    }else{
      res.status(404).render('notFound', {tittle: "Error 404"});
    } 
  },
  getProducts: (req, res) => {
    let products = productsModel.getProducts();
    res.render("products/listProducts", {title: "Productos", products: products})
  },
  uploadNewProduct: (req, res) => {
    let product = productsModel.newProduct(req.body, req.files)
    res.render("products/product", {title: product.productName, product: product});
    // res.redirect(`product/${req.body.id}`);
  },
  getUpdateProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    if(product){
      res.render("products/productEdit", {title: "Actualizar producto", product: product})
    }else{
      res.status(404).render('notFound', {tittle: "Error 404"});
    } 
  },
  uploadUpdateProduct: (req, res) => {

    productsModel.updateProduct(req.body, req.files)
    
    res.redirect(`product/${req.body.id}`);
  },
  
  deleteProduct: (req, res) => {
    productsModel.deleteProduct(req.body.id)
    res.redirect("/")
  }
}

  module.exports = controller;
  
