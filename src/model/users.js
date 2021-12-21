//modules
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");

//db
const usersFilePath = path.resolve(__dirname, "../database/users.json");
let dbUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

//ruta imagenes; para usar función deleteFileImage más facilmente
const usersFileImagesPath = path.resolve(__dirname,'../public/img/imgUsers')

const newId = () => {
  let last = 0;
  let db = dbUsers;
  db.forEach(user => {
    last = user.id > last ? user.id : last;
  });

  return (parseInt(last) + 1);
}

const usersModel = {
  id: newId(),
  getUsers: () => {
    return dbUsers;
  },
  deleteFileImage: function (imageName){
    //Funcion para eliminar imagenes de una ruta 
    fs.rmSync(usersFileImagesPath + '/' + imageName)
  }
  ,
  newUser: (user, file) => {
    
    let fileAvatar = "default.png"
    if (file){
      fileAvatar = file.filename
    }

    let newUser = {
    id: newId(),
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: bcrypt.hashSync(user.password,10),
    avatar: fileAvatar
    };

    let db = dbUsers;
    db.push(newUser)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(usersFilePath, db)

    return newUser
  },
  findAll: function(){
    return dbUsers;
  },
  findById: function(id){
    let db = dbUsers;

    let searchUser = db.find(user => {
      return  user.id == id;
    });
    
    return searchUser;
  },
  findByEmail: function(email){
    let db = dbUsers;

    let searchUser = db.find(user => {
      return  user.email == email;
    });
    
    return searchUser;
  },
  update: function(user, file){
    let db = dbUsers;
    let userToEdit = this.findById(user.id)

    db = db.filter(userUpdate => {
      return userUpdate.id != user.id;
    })

    let avatar = userToEdit.avatar;

    if(file["avatar"]){
      avatar = file["avatar"][0].filename
    }

    let updateUser = {
    id: user.id,
    name: userToEdit.name,
    lastName: userToEdit.lastName,
    email: userToEdit.email,
    password: userToEdit.password,
    avatar: avatar
    };

    db.push(updateUser)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(usersFilePath, db)
    dbUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  },
  delete: (id) => {
    let db = dbUsers;
    db = db.filter((user) => {
      return user.id != id;
    });

    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(usersFilePath, db);
    dbUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  } 
};

module.exports = usersModel