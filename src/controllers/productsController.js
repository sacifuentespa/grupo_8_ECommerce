const productsModel = require("../model/products");
const { validationResult } = require("express-validator");

const controller = {
  getNewProduct: (req, res) => {
    res.render("products/productUpload", { title: "Publicar Producto" });
  },
  getProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    if (product) {
      res.render("products/product", {
        title: product.productName,
        product: product,
      });
    } else {
      res.render("notFound", { tittle: "Error 404" });
    }
  },
  getProducts: (req, res) => {
    let products = productsModel.getProducts();
    res.render("products/listProducts", {
      title: "Productos",
      products: products,
    });
  },
  uploadNewProduct: (req, res) => {
    let resultValidation = validationResult(req)
    //para borrar documentos subidos de un producto que no cumpla con las validaciones
    if (resultValidation.errors.length > 0){
      if(req.files["mainImageUpload"]){
        productsModel.deleteFileImage(req.files["mainImageUpload"][0].filename)}
      if(req.files["imagesUpload"] && req.files["imagesUpload"].length>0){
        for(let i = 0;i<req.files["imagesUpload"].length;i++){
          productsModel.deleteFileImage(req.files["imagesUpload"][i].filename)
        }
      }
      res.render("products/productUpload", {
        title: "Publicar Producto",
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      let product = productsModel.newProduct(req.body, req.files);
      res.render("products/product", {
        title: product.productName,
        product: product,
      });
    }
    // res.redirect(`product/${req.body.id}`);
  },
  getUpdateProduct: (req, res) => {
    let product = productsModel.searchProduct(req.params.id);
    if (product) {
      res.render("products/productEdit", {
        title: "Actualizar producto",
        product: product,
      });
    } else {
      res.status(404).render("notFound", { tittle: "Error 404" });
    }
  },
  uploadUpdateProduct: (req, res) => {
<<<<<<< HEAD
    let resultValidation = validationResult(req);
    let product = productsModel.searchProduct(req.body.id);
    if (resultValidation.errors.length > 0) {
      if (req.files["mainImageUpload"]) {
        productsModel.deleteFileImage(req.files["mainImageUpload"][0].filename);
      }
      if (req.files["imagesUpload"] && req.files["imagesUpload"].length > 0) {
        for (let i = 0; i < req.files["imagesUpload"].length; i++) {
          productsModel.deleteFileImage(req.files["imagesUpload"][i].filename);
=======
    let resultValidation = validationResult(req)
    let product = productsModel.searchProduct(req.body.id)
    //para borrar documentos subidos de un producto que no cumpla con las validaciones
    if (resultValidation.errors.length > 0){
      if(req.files["mainImageUpload"]){
      productsModel.deleteFileImage(req.files["mainImageUpload"][0].filename)}
      if(req.files["imagesUpload"] && req.files["imagesUpload"].length>0){
        for(let i = 0;i<req.files["imagesUpload"].length;i++){
          productsModel.deleteFileImage(req.files["imagesUpload"][i].filename)
>>>>>>> 56af990b719ee1a863e3cbe891c575baa5bf47ae
        }
      }
      res.render("products/productEdit", {
        title: "Actualizar producto",
        errors: resultValidation.mapped(),
        product: product,
      });
    } else {
      productsModel.updateProduct(req.body, req.files);
      res.redirect(`product/${req.body.id}`);
    }
  },

  deleteProduct: (req, res) => {
    productsModel.deleteProduct(req.params.id);
    res.redirect("/admin/products/314");
  },
};

module.exports = controller;
