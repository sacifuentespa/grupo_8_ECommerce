//modules
const fs = require("fs");
const path = require("path");

//db
const productsFilePath = path.resolve(__dirname, "../database/products.json");
let dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//ruta imagenes; para usar función deleteFileImage más facilmente
const productsFileImagesPath = path.resolve(__dirname,'../public/img/imgProducts')

const newId = () => {
    let last = 0;
    let db = dbProducts;
    db.forEach(product => {
      last = product.id > last ? product.id : last;
    });

    return (parseInt(last) + 1);
}

const productsModel = {
  id: newId(),
  getProducts: () => {
    return dbProducts;
  },deleteFileImage: function (imageName){
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

    let newProduct = {
      id: newId(),
      productName: product.productName,
      productPrice: parseInt(product.productPrice),
      listCategoriesProduct: product.listCategoriesProduct,
      productDescriptionUpload: product.productDescriptionUpload,
      mainImageUpload: files["mainImageUpload"][0].filename,
      imagesUpload: images,
      aimUpload: product.aimUpload,
      categoryExchange: product.categoryExchange,
    };

    


    let db = dbProducts;
    db.push(newProduct)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(productsFilePath, db)

    return newProduct
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

