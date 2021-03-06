const usersModel = require("../model/users.js");
const bycrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//
const db = require("../database/models");
const { searchUser } = require("../model/users");
const Op = db.Sequelize.Op;

const controller = {
  getRegister: (req, res) => {
    res.render("users/register", { title: "Registro Usuario" });
  },
  uploadNewUser: async (req, res) => {
    let errors = validationResult(req);
    
    try {
      let condition = await usersModel.findByEmail(req.body.email);
      if(condition==null){
      if (errors.isEmpty()) {
        await usersModel.newUser(req.body, req.file);
        res.redirect("/users/login");
      } else {
        if (req.file) {
          usersModel.deleteFileImage(req.file.filename);
        }
        res.render("users/register", {
          title: "Registro Usuario",
          errors: errors.mapped(),
          old: req.body,
        });
      }
    }else{res.render("users/register", {
      title: "Registro Usuario",
      errors: "Correo electrónico ya registrado",
      old: req.body,
    });}

    } catch (err) {
      console.log(err);
    }
  },
  apiUsers: async function (req, res) {
    try {
      let items = await usersModel.getUsers();
      let newItems = items.map((item) => {
        delete item.dataValues.password;
        item.dataValues.avatar =
          "https://trueque-online.herokuapp.com/img/imgUsers/" +
          item.dataValues.avatar;
        return item.dataValues;
      });
      newItems.forEach(
        (item) =>
          (item.detail =
            "https://trueque-online.herokuapp.com/users/" + item.id)
      );
      return res.json({
        count: newItems.length,
        users: newItems,
      });
    } catch (error) {
      console.error(error);
    }
  },
  apiDetailUser: async function (req, res) {
    try {
      let item = await usersModel.getUser(req.params.id);
      delete item.dataValues.password;
      item.dataValues.avatar =
        "https://trueque-online.herokuapp.com/img/imgUsers/" +
        item.dataValues.avatar;
      item.dataValues.detail =
        "https://trueque-online.herokuapp.com/users/" + item.dataValues.id;
      return res.json({
        user: item.dataValues,
      });
    } catch (error) {
      console.error(error);
    }
  },
  getUpdateUser: async (req, res) => {
    try {
      let user = await usersModel.getUser(req.session.userLogged.id);

      res.render("users/userEdit", {
        title: "Actualizar usuario",
        user: user,
      });
    } catch (error) {
      console.error(error);
    }
  },
  updateUser: async function (req, res) {
    let errors = validationResult(req);

    if (errors.errors.length > 0) {
      if (req.file) {
        usersModel.deleteFileImage(req.file.filename);
      }
      res.render("users/userEdit", {
        title: "Edición Usuario",
        errors: errors.mapped(),
        user: req.session.userLogged,
      });
    } else
      try {
        await usersModel.updateUser(req.body, req.file);
        res.clearCookie("remindMe");
        req.session.destroy();
        res.redirect("/");
      } catch (error) {
        console.error(error);
      }
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  getProfile: async (req, res) => {
    let id = req.params.id ? req.params.id: req.session.userLogged.id;
    try {
      let user = await usersModel.getUser(id);
      res.render("users/userProfile", { title: "Iniciada Sesión", userData: user });
    } catch (err) {
      console.log(err);
    }
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
          delete userNoPassword.dataValues.password;
          req.session.userLogged = userNoPassword.dataValues;

          if (req.body.remindMe) {
            res.cookie("remindMe", userToLoggin.email, { maxAge: 3600000 });
          }

          res.redirect("/");
        } else {
          res.render("users/login", {
            title: "Iniciar Sesión",
            errors: { msg: "Crendenciales inválidas" },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  isEmailAvaible: async (req, res) => {
    try {
      let userToLoggin = await usersModel.findByEmail(req.body.email);
      if (userToLoggin) res.json({ isAvaible: false });
      else res.json({ isAvaible: true });
    } catch (err) {
      console.log(err);
    }
  },
  logOut: function (req, res) {
    //destroy the cookie
    res.clearCookie("remindMe");
    req.session.destroy();
    res.redirect("/");
  },
  deleteUser: async (req, res) => {
    try {
      res.clearCookie("remindMe");
      req.session.destroy();
      await usersModel.delete(req.params.id);
      res.redirect("/users/admin/271");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = controller;
