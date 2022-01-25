const usersModel = require("../model/users.js");
const bycrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const controller = {
  getRegister: (req, res) => {
    res.render("users/register", { title: "Registro Usuario" });
  },
  uploadNewUser: async (req, res) => {
    let errors = validationResult(req);
    

    try {
      if (errors.isEmpty()) {
        await usersModel.newUser(req.body, req.file);
        res.redirect("/login");
      }
      else {
        if (req.file) {
          usersModel.deleteFileImage(req.file.filename);
        }
        res.render("users/register", {
          title: "Registro Usuario",
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (err) {
      console.log(err);
    }

    
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  getProfile: (req, res) => {
    res.render("users/userProfile", { title: "Iniciar Sesión" });
  },
  comprobationLogin: async (req, res) => {
    try {
      let userToLoggin = await usersModel.findByEmail(req.body.email);

      if (userToLoggin) {
        let validatePassword = bycrypt.compareSync(
          req.body.password,
          userToLoggin.password
        );

        if (validatePassword) {
          let userNoPassword = Object.assign({}, userToLoggin);
          delete userNoPassword.password;
          req.session.userLogged = userNoPassword;

          if (req.body.remindMe) {
            res.cookie("remindMe", userToLoggin.email, { maxAge: 3600000 });
          }

          res.redirect("/");
        } else {res.render("users/login", {
          title: "Iniciar Sesión",
          errors: { msg: "Crendenciales inválidas" },
        });}
      }

      
    } catch (err) {
      console.log(err);
    }
  },
  logOut: (req, res) => {
    //destroy the cookie
    res.clearCookie("remindMe");
    req.session.destroy();
    res.redirect("/");
  },
  deleteUser: async (req, res) => {
    try {
      await usersModel.deleteUser(req.body.id);
      res.redirect("/admin/users/271");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = controller;
