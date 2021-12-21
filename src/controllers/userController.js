const usersModel = require("../model/users.js");
const bycrypt = require("bcryptjs")
const { validationResult } = require("express-validator");


const controller = {
  getRegister: (req, res) => {
    if (req.session.userLogged){
      res.redirect("/")
    }else{
    res.render("users/register", { title: "Registro Usuario" })};
  },
  uploadNewUser: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = req.body;
      usersModel.newUser(req.body, req.file);
      res.redirect("/login");
    } else {
      usersModel.deleteFileImage(req.file.filename)
      res.render("users/register", { title: "Registro Usuario", errors: errors.mapped(), old: req.body });
    }
    
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  getProfile: (req, res) => {
   
    res.render("users/userProfile", { title: "Iniciar Sesión" });
  }
  ,
  comprobationLogin: (req, res) => {

    let userToLoggin = usersModel.findByEmail(req.body.email)


    if (userToLoggin) {
      let validatePassword = bycrypt.compareSync(req.body.password, userToLoggin.password)
      if(validatePassword){
        let userNoPassword = Object.assign({}, userToLoggin)
        delete userNoPassword.password
        req.session.userLogged = userNoPassword;
        if(req.body.remindMe != undefined){
          res.cookie('remindMe', userToLoggin.email, {maxAge : 3600000})
        }
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
    res.redirect("/admin/users/271");
  },
};

module.exports = controller;