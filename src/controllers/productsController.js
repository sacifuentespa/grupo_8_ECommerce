const controller = {

    getNewProduct: (req, res) => {
      res.render("products/productUpload", {tittle: "Publicar Producto"});
    },
    getProduct: (req, res) => {
        res.render("products/product", {tittle: "nameProduct"});
      },
    storeNewProduct: 
    (req,res) => {
      let product = {
        id: newId(),
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        listCategoriesProduct: req.body.listCategoriesProduct,
        productDescriptionUpload: req.body.productDescriptionUpload,
        mainImageUpload: 'default-image.png',
        imagesUpload: 'default-image.png',
        aimUpload: req.body.aimUpload,
        categoryExchange: req.body.categoryExchange,
      }
  
      products.push(product);
  
          let jsonProducts = JSON.stringify(products, null, 4);
          fs.writeFileSync(productsFilePath, jsonProducts);
  
      res.redirect('products/index')
    }
  };
  
  module.exports = controller;
  