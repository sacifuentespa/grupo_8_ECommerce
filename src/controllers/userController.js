const usersModel = require("../model/users.js");
const bycrypt = require("bcryptjs")

const controller = {
  getRegister: (req, res) => {
    res.render("users/register", { title: "Registro Usuario" });
  },
  uploadNewUser: (req, res) => {
    usersModel.newUser(req.body);
    res.redirect("/");
  },
  getLogin: (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión" });
  },
  comprobationLogin: (req, res) => {
    let userToLoggin = usersModel.findByEmail(req.body.email)
    console.log(userToLoggin)
    if (userToLoggin) {
      // let validatePassword = bycrypt.compareSync(req.body.password, userToLoggin.password)
      let validatePassword = req.body.password == userToLoggin.password;
      if(validatePassword){
        let userNoPassword = Object.assign({}, userToLoggin)
        delete userNoPassword.password
        req.session.userLogged = userNoPassword;
        res.redirect("/");
      }
    }
    res.render("users/login", {
      title: "Iniciar Sesión",
      errors: 
        {msg:"Crendenciales invalidas"}
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