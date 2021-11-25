//modules
const fs = require("fs");
const path = require("path");

//db
const productsFilePath = path.resolve(__dirname, "./products.json");
const dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const newId = () => {
    let last = 0;
    let db = dbProducts;
    db.forEach(product => {
      last = product.id > last ? product.id : last;
    });

    return last + 1;
}

const productsModel = {
  id: newId(),
  getProducts: () => {
    return dbProducts;
  },
  newProduct: (product, files) => {
    let images = [];

    if(files["imagesUpload"]){
      images = files["imagesUpload"].map((image) => {
        return image.filename;
      })
    }

    let newProduct = {
      id: newId(),
      productName: product.productName,
      productPrice: product.productPrice,
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
  searchProduct: (id) => {
    let db = dbProducts;
    let searchProduct = db.filter(product => {
      return  product.id == id;
    });
    
    return searchProduct[0];
  },
  updateProduct: (product) => {
    let db = dbProducts;
    db = db.filter(productUpdate => {
      return productUpdate.id != product.id;
    })

    let newProduct = {
      id: product.id,
      productName: product.productName,
      productPrice: product.productPrice,
      listCategoriesProduct: product.listCategoriesProduct,
      productDescriptionUpload: product.productDescriptionUpload,
      mainImageUpload: product.mainImageUpload,
      imagesUpload: product.imagesUpload,
      aimUpload: product.aimUpload,
      categoryExchange: product.categoryExchange,
    };

    db.push(newProduct)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(productsFilePath, db)
  },
  deleteProduct: (id) => {
    let db = dbProducts;
    db = db.filter(product => {
      return product.id != id;
    })

    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(productsFilePath, db)
  }
};

module.exports = productsModel