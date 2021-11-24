//modules
const fs = require("fs");
const path = require("path");

//db
const productsFilePath = path.resolve(__dirname, "./products.json");
let dbProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const newId = () => {
    let last = 0;
    dbProducts.forEach(product => {
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
    let images = undefined;

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

    dbProducts.push(newProduct)
    dbProducts = JSON.stringify(dbProducts, null, 4);
    fs.writeFileSync(productsFilePath, dbProducts)

    return newProduct
  },
  searchProduct: (id) => {
    let searchProduct = dbProducts.filter(product => {
      return  product.id == id;
    });
    
    return searchProduct;
  },
  updateProduct: (product) => {
    dbProducts = dbProducts.filter(productUpdate => {
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

    this.addProductDb(newProduct)
  },
  deleteProduct: (id) => {
    let products = dbProducts.filter(product => {
      return product.id != id;
    })

    this.updateDb(products)
  }
};

module.exports = productsModel