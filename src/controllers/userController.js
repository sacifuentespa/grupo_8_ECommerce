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
        res.redirect("/users/login");
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
  getUpdateUser: async (req, res) => {
    try {
      let user = await usersModel.getUser(req.session.userLogged.dataValues.id)

        res.render("users/userEdit", {
          title: "Actualizar usuario",
          user:user,
        })
    } catch (error) {
      console.error(error);
    }
  },
  updateUser: async function (req,res) {
    let errors = validationResult(req)
    
    if (errors.errors.length > 0) {
      if (req.file) {
        usersModel.deleteFileImage(req.file.filename);
      }
      res.render("users/userEdit", {
        title: "Edición Usuario",
        errors: errors.mapped(),
        user: req.session.userLogged,
      })
    }else 
    try{
    await usersModel.updateUser(req.body, req.file)
    res.clearCookie("remindMe");
    req.session.destroy();
    res.redirect("/");
    }
    catch (error) {
      console.error(error);
    }
  }
  ,
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  getProfile: async (req, res) => {
    try{
    
    let user = await usersModel.getUser(req.session.userLogged.id)
    res.render("users/userProfile", { title: "Iniciada Sesión", user:user });
  }catch (err) {
    console.log(err);
  }},
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
          delete userNoPassword.dataValues.password;
          req.session.userLogged = userNoPassword.dataValues;
          console.log(req.session.userLogged)
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
  logOut: function (req, res){
    //destroy the cookie
    res.clearCookie("remindMe");
    req.session.destroy();
    res.redirect("/");
  },
  deleteUser: async (req, res) => {
    try {
      res.clearCookie("remindMe");
      req.session.destroy();
      res.redirect("/");
      await usersModel.delete(req.params.id);
      res.redirect("/admin/users/271");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = controller;
