const productsModel = require("../model/products");
const usersModel = require("../model/users.js");

const controller = {
    getAllProducts: (req, res) => {
        let products = productsModel.getProducts()
        if(req.params.password == 314){
            res.render("admin", {title:"Admin Productos", products: products})
        }else{
            res.render('notFound', {tittle: "Error 404"});
        }
    },
    getAllUsers: (req, res) => {
        let users = usersModel.getAllUsers
        if(req.params.password == 271){
            res.render("/admin", {tittle:"Admin Users", users: users})
        }else{
            res.render('notFound', {tittle: "Error 404"});
        }
    }
}

module.exports = controller;