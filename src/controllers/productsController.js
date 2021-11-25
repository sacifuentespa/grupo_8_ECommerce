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

    getProductWithId: (req, res) => {
        let idProduct = req.params.id
        let product = products.find((item)=>{
          return item.id == idProduct
      })
      if(product){
        res.render("products/productId", {title: product.productName, product});
      }else{
        res.status(404).render('notFound', {tittle: "Error 404"});
      }        
      },


    storeNewProduct: 
    (req,res) => {
      let product = {
        id: newId(),
        ...req.body,
        mainImageUpload: req.files['mainImageUpload'],
        imagesUpload: req.files['imagesUpload'],
      }
      if (product.imagesUpload==undefined){
        product.imagesUpload = []      
    }
  
      products.push(product);
  
          let jsonProducts = JSON.stringify(products, null, 4);
          fs.writeFileSync(productsFilePath, jsonProducts);
  
      res.redirect('/')
    },
    getProductEdition: (req, res) => {
      let idProduct = req.params.id
      let productToEdit = products.find((item)=>{
        return item.id == idProduct
    })
      res.render("products/productEdit", {title: "Editar Producto", productToEdit: productToEdit});
    },

    editProduct: (req, res) => {


    res.redirect('/')
    },    
  };
  
  module.exports = controller;
  