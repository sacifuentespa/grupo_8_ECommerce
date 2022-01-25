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
  findByEmailNoPassword: async function (email) {
    try {
      let user = dbUsers.findOne({
        attributes: { exclude: ["password"] },
        where: { email: email },
      });

      return user;
    } catch (err) {
      console.log(err);
    }
  },
  newUser: async function (user, file) {
    try {
      let fileAvatar = "default.png";
      if (file) {
        fileAvatar = file.filename;
      }

      let newUser = await dbUsers.create({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        avatar: fileAvatar,
      });

      await dbCart.create({
        users_id: newUser.dataValues.id,
      });
      return true;
    } catch (err) {
      this.deleteFileImage(fileAvatar);
      console.log(err);
      return false;
    }
  },
  updateUser: async function (user, file) {
    try {
      let userToEdit = await this.getUser(user.id);

      let fileAvatar = userToEdit.avatar;

      if (file) {
        fileAvatar = file.filename;
        if (userToEdit.avatar != "default.png") {
          this.deleteFileImage(userToEdit.avatar);
        }
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
      await dbCart.destroy({
        where: { users_id: id },
      });
      await dbUsers.destroy({
        where: { id: id },
      });
      let user = await this.getUser(id);
      this.deleteFileImage(user.avatar)
      return true;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = usersModel;
