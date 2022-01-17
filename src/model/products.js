//modules
const fs = require("fs");
const path = require("path");

//db

const db = require("../database/models")

const dbProducts = db.Product
const dbUser = db.User
const dbDetail = db.Detail
const dbCart = db.Cart
const dbusers_has_products = db.users_has_products
const dbcart_has_products = db.cart_has_products
const dbImage = db.Image

//ruta imagenes; para usar función deleteFileImage más facilmente
const productsFileImagesPath = path.resolve(__dirname,'../public/img/imgProducts')


const productsModel = {
  
  deleteFileImage: function (imageName){
    //Funcion para eliminar imagenes de una ruta 
    fs.rmSync(productsFileImagesPath + '/' + imageName)
  }
  ,
  newProduct: function(product, files) {
    let images = [];

    if(files["imagesUpload"]){
      images = files["imagesUpload"].map((image) => {
        return image.filename;
      })
    }

    dbProducts.create({
      productName: product.productName,
      productPrice: parseInt(product.productPrice),
      listCategoriesProduct: product.listCategoriesProduct,
      productDescriptionUpload: product.productDescriptionUpload,
      aimUpload: product.aimUpload,
      active: 1,
      categoryExchange: product.categoryExchange,
    })

    // dbImage.create = {
      
    //   mainImageUpload: files["mainImageUpload"][0].filename,
    //   imagesUpload: images,
    //   aimUpload: product.aimUpload,
    //   categoryExchange: product.categoryExchange,
    // };

  },
  searchProduct: function(id){
    let db = dbProducts;
  
    let searchProduct = db.filter(product => {
      return  product.id == id;
    });
    
    return searchProduct[0];
  },
  //updateProduct sirve para editar un producto
  updateProduct: function(product, files){
    let db = dbProducts;
    let idProduct = product.id

    let productToEdit = this.searchProduct(idProduct)

    db = db.filter(productUpdate => {
      return productUpdate.id != idProduct;
    })

    let mainImage = productToEdit.mainImageUpload 
    let images = productToEdit.imagesUpload
    //se agregan dos variables que seran los nombres de los archivos de imagenes originales
    let originalMainImage = mainImage
    let originalImages = images

    // si se actualizan las imagenes se cambian los nombres de tales imagenes por los nuevos
    if(files["mainImageUpload"]){
      mainImage = files["mainImageUpload"][0].filename
    }

    if(files["imagesUpload"]){
      images = files["imagesUpload"].map((image) => {
        return image.filename;
      })
    } 
    
    //si los nombres difieren con los originales se eliminan los archivos originales
    if(originalMainImage != mainImage){
      this.deleteFileImage(originalMainImage)
    }

    if(originalImages != images){
    if(originalImages.length>=1){
      for(let i = 0; i<originalImages.length;i++){
         this.deleteFileImage(originalImages[i])
     }
   }}
    
    let updatedProduct = {
      id: parseInt(idProduct),
      productName: product.productName,
      productPrice: parseInt(product.productPrice),
      listCategoriesProduct: product.listCategoriesProduct,
      productDescriptionUpload: product.productDescriptionUpload,
      mainImageUpload: mainImage,
      imagesUpload: images,
      aimUpload: product.aimUpload,
      categoryExchange: product.categoryExchange,
    };

    db.push(updatedProduct)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(productsFilePath, db)
    dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  },
  
  deleteProduct: function(id) {
    let db = dbProducts;
    
    // Selecciona el producto a remover
    let productToDelete = this.searchProduct(id)
    
    // Guarda los nombres de los archivos de imagenes a eliminar
    let mainImage = productToDelete.mainImageUpload 
    let images = productToDelete.imagesUpload

    this.deleteFileImage(mainImage)
    

    if(images.length>=1){
       for(let i = 0; i<images.length;i++){
          this.deleteFileImage(images[i])
      }
    }

     db = db.filter(product => {
     return product.id != id;
     })
    
    db = JSON.stringify(db, null, 4);
     fs.writeFileSync(productsFilePath, db)
     dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  }
};

module.exports = productsModel

