//modules
const fs = require("fs");
const path = require("path");

//db
const db = require("../database/models")

const dbProducts = db.Product
const dbUsers = db.User
const dbDetails = db.Detail
const dbCart = db.Cart
const dbusers_has_products = db.users_has_products
const dbcart_has_products = db.cart_has_products
const dbImages = db.Image
const Op = db.Sequelize.Op


//ruta imagenes; para usar función deleteFileImage más facilmente
const productsFileImagesPath = path.resolve(__dirname, '../public/img/imgProducts')


const productsModel = {
  // async function, needed async treatment when called

  getProducts: async () => {
    try {
      let result = await dbProducts.findAll({
        include: [{ association: "images" }],
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  // async function, needed async treatment when called

  searchProduct: async function (id) {
    try {
      let product = await dbProducts.findByPk(id, {
        include: [{ association: "images" }],
      });
      return product;
    } catch (error) {
      console.error(error);
    }
  },

  deleteFileImage: function (imageName) {
    //Funcion para eliminar imagenes de una ruta
    fs.rmSync(productsFileImagesPath + "/" + imageName);
  },
  newProduct: async function (product, files) {
    try {
      let images = [];

      if (files["imagesUpload"]) {
        images = files["imagesUpload"].map((image) => {
          return image.filename;
        });
      }
      let newProduct = await dbProducts.create({
        productName: product.productName,
        productPrice: parseInt(product.productPrice),
        listCategoriesProduct: product.listCategoriesProduct,
        productDescriptionUpload: product.productDescriptionUpload,
        aimUpload: product.aimUpload,
        active: 1,
        categoryExchange: product.categoryExchange,
      });
      await dbImages.create({
        path: files["mainImageUpload"][0].filename,
        type: "mainImage",
        products_id: newProduct.dataValues.id,
      });
      if (images.length > 1) {
        for (let i = 0; i < images.length; i++) {
          await dbImages.create({
            path: images[i],
            type: "secondaryImage",
            products_id: newProduct.dataValues.id,
          });
        }
      }
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  },
  //updateProduct sirve para editar un producto
  updateProduct: async function (product, files) {

    try {
      let idProduct = product.id

      let productToEdit = await this.searchProduct(idProduct)


      let mainImage = productToEdit.images[0].dataValues.path
      let images = await dbImages.findAll({ where: { products_id: idProduct, type: "secondaryImage" } })
      images = images.map((image) => { return image.dataValues.path })
      // //se agregan dos variables que seran los nombres de los archivos de imagenes originales
      let originalMainImage = mainImage
      let originalImages = images
      
      // si se actualizan las imagenes se cambian los nombres de tales imagenes por los nuevos
      if (files["mainImageUpload"]) {
        mainImage = files["mainImageUpload"][0].filename
      }

      if (files["imagesUpload"]) {
        images = files["imagesUpload"].map((image) => {
          return image.filename;
        })
      }

      await dbProducts.update({
        productName: product.productName,
        productPrice: parseInt(product.productPrice),
        listCategoriesProduct: product.listCategoriesProduct,
        productDescriptionUpload: product.productDescriptionUpload,
        aimUpload: product.aimUpload,
        categoryExchange: product.categoryExchange,
      }, {
        where: { id: idProduct }
      }
      )

      // si los nombres difieren con los originales se eliminan los archivos originales y se agregan los nuevos
      if (originalMainImage != mainImage) {
         this.deleteFileImage(originalMainImage)
         await dbImages.update({
           path: mainImage
         },
           {where : {path : originalMainImage}})        
       }
    
       if (originalImages != images) {

        for (let i = 0; i < images.length; i++){
        await dbImages.create({
          path: images[i],
          type: 'secondaryImage',
          products_id: idProduct,
        })}
        
         if (originalImages.length >= 1) {
           for (let i = 0; i < originalImages.length; i++) {
             this.deleteFileImage(originalImages[i])
             console.log(originalImages[i])
             await dbImages.destroy({where : {path : originalImages[i]}})
           }
         }
       } 
    }  catch (error) {
      console.error(error)
    }
  },


  deleteProduct: function (id) {
    let db = dbProducts;

    // Selecciona el producto a remover
    let productToDelete = this.searchProduct(id);

    // Guarda los nombres de los archivos de imagenes a eliminar
    let mainImage = productToDelete.mainImageUpload;
    let images = productToDelete.imagesUpload;

    this.deleteFileImage(mainImage);

    if (images.length >= 1) {
      for (let i = 0; i < images.length; i++) {
        this.deleteFileImage(images[i]);
      }
    }

    db = db.filter((product) => {
      return product.id != id;
    });

    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(productsFilePath, db);
    dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  },
  search: async function(arg) {
    try {
      let products = await dbProducts.findAll({
        include: [{ association: "images" }],
        where: {
          productName: {[Op.like]: `%${arg}%`}
        },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = productsModel;

