const controller = {
  getIndex: (req, res) => {
    res.render("products/index", {tittle: "Trueque Online"});
  },
  getNewProduct: (req, res) => {
    res.render("products/productUpload", {tittle: "Publicar Producto"});
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
  },
  getCart: (req, res) => {
    res.render("products/cart", {tittle: "Mi Carrito"});
  },
  getLogin: (req, res) => {
    res.render("users/login", {tittle: "Iniciar Sesión"});
  },
  getRegister: (req, res) => {
    res.render("users/register", {tittle: "Crear Usuario"});
  }
};

module.exports = controller;
