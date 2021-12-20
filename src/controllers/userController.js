const usersModel = require("../model/users.js");
const bycrypt = require("bcryptjs")
const { validationResult } = require("express-validator");


const controller = {
  getRegister: (req, res) => {
    res.render("users/register", { title: "Registro Usuario" });
  },
  uploadNewUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let user = req.body;
      usersModel.newUser(req.body);
      res.redirect("/login");
    } else {
      res.render("users/register", { title: "Registro Usuario", errors: errors.array(), old: req.body });
    }
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  comprobationLogin: (req, res) => {
    let userToLoggin = usersModel.findByEmail(req.body.email)
    if (userToLoggin) {
      // let validatePassword = bycrypt.compareSync(req.body.password, userToLoggin.password)
      let validatePassword = req.body.password == userToLoggin.password;
      if (validatePassword) {
        delete userToLoggin.password;
        req.session.userLogged = userToLoggin
        res.redirect("/")
      }
    }
    res.render("users/login", {
      title: "Iniciar Sesión",
      errors:
        { msg: "Crendenciales inválidas" }
    })
  },
  logOut: (req, res) => {
    //destroy the cookie
    //res.clearCookie('userEmail')
    req.session.destroy();
    res.redirect('/')
  },
  deleteUser: (req, res) => {
    usersModel.deleteUser(req.body.id);
    res.redirect("/admin/users/314");
  },
};

module.exports = controller;