const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newId = () => {
	let ultimo = 0;
	products.forEach(product => {
		if (product.id > ultimo) {
			ultimo = product.id;
		}
	});
	return ultimo + 1;
}

const controller = {

    getNewProduct: (req, res) => {
      res.render("products/productUpload", {title: "Publicar Producto"});
    },
    getProduct: (req, res) => {
        res.render("products/product", {title: "nameProduct"});
      },
    storeNewProduct: 
    (req,res) => {
      console.log(req.body)

      let product = {
        id: newId(),
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        listCategoriesProduct: req.body.listCategoriesProduct,
        productDescriptionUpload: req.body.productDescriptionUpload,
        mainImageUpload: req.file,
        imagesUpload: 'default-image.png',
        aimUpload: req.body.aimUpload,
        categoryExchange: req.body.categoryExchange,
      }
  
      products.push(product);
  
          let jsonProducts = JSON.stringify(products, null, 4);
          fs.writeFileSync(productsFilePath, jsonProducts);
  
      res.redirect('/')
    }
  };
  
  module.exports = controller;
  