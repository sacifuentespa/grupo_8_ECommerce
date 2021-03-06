const productsModel = require("../model/products");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { searchProduct } = require("../model/products");
const Op = db.Sequelize.Op;


const controller = {
  getNewProduct: (req, res) => {
    res.render("products/productUpload", { title: "Publicar Producto" });
  },
  getProduct: async (req, res) => {
    try {
      let product = await productsModel.searchProduct(req.params.id);
      let products = await productsModel.getProducts()
      if (product) {
        res.render("products/product", {
          title: product.productName,
          product: product,
          products:products
        });
      } else {
        res.render("notFound", { tittle: "Error 404" });
      }
    } catch (error) {
      console.error(error);
    }
  },
  apiProducts: async function (req, res) {
    try {
      let items = await productsModel.getProducts();
      let newItems = items.map(item=> item.dataValues)
      newItems.forEach (item => item.detail = 'https://trueque-online.herokuapp.com/products/'+item.id )
      let categories = await productsModel.getCategories()
      
      return res.json({
        count: newItems.length, 
        categories: categories,
        products: newItems
        });
    } catch (error) {
      console.error(error);
    }
  }
  ,
  apiCategories: async function (req, res) {
    try {
      let categories = await productsModel.getCategories();
      let response = {}

      categories.forEach(oneCategory => {
        response[oneCategory.dataValues.listCategoriesProduct] = oneCategory.dataValues.Count
      })
      return res.json({
        categories: response,
      });
    } catch (error) {
      console.error(error);
    }
  }
  ,
  apiDetailProduct: async function (req, res) {
    try {
      let item = await productsModel.searchProduct(req.params.id);
      let newItem = item.dataValues
      let image = 'https://trueque-online.herokuapp.com/img/imgProducts/'+newItem.images[0].dataValues.path

      return res.json({
        product:item,
        image:image
        });
    } catch (error) {
      console.error(error);
    }
  }
  ,
  getProducts: async (req, res) => {
    try {
      let products = await productsModel.getProducts();
      res.render("products/listProducts", {
        title: "Productos",
        products: products,
      });
    } catch (error) {
      console.error(error);
    }
  },
  uploadNewProduct: async (req, res) => {
    let resultValidation = validationResult(req);
    //para borrar documentos subidos de un producto que no cumpla con las validaciones
    if (resultValidation.errors.length > 0) {
      if (req.files["mainImageUpload"]) {
        productsModel.deleteFileImage(req.files["mainImageUpload"][0].filename);
      }

      if (req.files["imagesUpload"] && req.files["imagesUpload"].length > 0) {
        for (let i = 0; i < req.files["imagesUpload"].length; i++) {
          productsModel.deleteFileImage(req.files["imagesUpload"][i].filename);
        }
      }

      res.render("products/productUpload", {
        title: "Publicar Producto",
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else
      try {
        let newProduct = await productsModel.newProduct(req.body, req.files);
        let product = await productsModel.searchProduct(
          newProduct.dataValues.id
        );

        res.redirect(newProduct.dataValues.id);
      } catch (error) {
        console.error(error);
      }
    // res.redirect(`product/${req.body.id}`);
  },
  getUpdateProduct: async (req, res) => {
    try {
      let product = await productsModel.searchProduct(req.params.id);

      if (product) {
        res.render("products/productEdit", {
          title: "Actualizar producto",
          product: product,
        });
      } else {
        res.status(404).render("notFound", { tittle: "Error 404" });
      }
    } catch (error) {
      console.error(error);
    }
  },
  uploadUpdateProduct: async (req, res) => {
    let resultValidation = validationResult(req);

    //para borrar documentos subidos de un producto que no cumpla con las validaciones
    if (resultValidation.errors.length > 0) {
      if (req.files["mainImageUpload"]) {
        productsModel.deleteFileImage(req.files["mainImageUpload"][0].filename);
      }
      if (req.files["imagesUpload"] && req.files["imagesUpload"].length > 0) {
        for (let i = 0; i < req.files["imagesUpload"].length; i++) {
          productsModel.deleteFileImage(req.files["imagesUpload"][i].filename);
        }
      }
      res.render("products/productEdit", {
        title: "Actualizar producto",
        errors: resultValidation.mapped(),
        product: product,
      });
    } else
      try {
        await productsModel.updateProduct(req.body, req.files);
        res.redirect(`/products/${req.body.id}`);
      } catch (error) {
        console.error(error);
      }
  },

  deleteProduct: async (req, res) => {
    try {
      await productsModel.deleteProduct(req.params.id);
      res.redirect("/products/admin/314"); 
    } catch (err) {
      console.log(err)
    }
  },

  search: async (req, res) => {
    try {
      let products = await productsModel.search(req.body.qu);
      res.render("products/listProducts", {
        title: "Productos",
        products: products,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = controller;
