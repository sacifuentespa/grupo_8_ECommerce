//modules
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

//db
const db = require("../database/models");

const dbUsers = db.User;
const dbCart = db.Cart;
const Op = db.Sequelize.Op;

//ruta imagenes; para usar función deleteFileImage más facilmente
const usersFileImagesPath = path.resolve(__dirname, "../public/img/imgUsers");

const usersModel = {
  deleteFileImage: function (imageName) {
    //Funcion para eliminar imagenes de una ruta
    fs.rmSync(usersFileImagesPath + "/" + imageName);
  },
  getUsers: async () => {
    try {
      let users = await dbUsers.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  },
  getUser: async function (id) {
    try {
      let user = await dbUsers.findByPk(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  findByEmail: async function (email) {
    try {
      let user = dbUsers.findOne({
        where: { email: email },
      });

      return user;
    } catch (err) {
      console.log(err);
    }
  },
  newUser: async function (user, file) {
    let fileAvatar = "default.png";
    if (file) {
      fileAvatar = file;
    }

    try {
      await dbUsers.create({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        avatar: fileAvatar,
      });
      return true;
    } catch (err) {
      this.deleteFileImage(fileAvatar);
      console.log(err);
      return false;
    }
  },
  update: async function (user, file) {
    try {
      let fileAvatar = user.avatar;
      if (file) {
        this.deleteFileImage(user.avatar)
        fileAvatar = file.filename;
      }

      await dbUsers.update(
        {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: bcrypt.hashSync(user.password, 10),
          avatar: fileAvatar,
        },
        {
          where: { id: user.id },
        }
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  delete: async (id) => {
    try {
      await dbUsers.destroy({
        where: { id: id },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = usersModel;
