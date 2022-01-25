const productsModel = require("../model/products");
const usersModel = require("../model/users.js");

const controller = {
  getAllProducts: async (req, res) => {
    try {
      let products = await productsModel.getProducts();
      if (req.params.password == 314) {
        res.render("admin", { title: "Admin Productos", products: products });
      } else {
        res.render("notFound", { title: "Error 404" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await usersModel.getUsers();
      if (req.params.password == 271) {
        res.render("admin", { title: "Admin Users", users: users });
      } else {
        res.render("notFound", { title: "Error 404" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
