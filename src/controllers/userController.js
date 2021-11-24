const usersModel = require("../model/users.js");

const controller = {
  getRegister: (req, res) => {
    res.render("users/register", { title: "Registro Usuario" });
  },
  uploadNewUser: (req, res) => {
    // usersModel.newUser(req.body);
    res.redirect("/");
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  comprobationLogin: (req, res) => {
    //usersModel.comprobation(req.body.email, req.body.password);
    res.redirect("/");
  },
  deleteUser: (req, res) => {
    // usersModel.deleteUser(req.body.id);
    res.redirect("/");
  },
};

module.exports = controller;