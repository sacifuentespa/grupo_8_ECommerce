//modules
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

//db
const usersFilePath = path.resolve(__dirname, "../database/users.json");
let dbUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

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
  newUser: (user, file) => {

    let nameAvatar = file!==null ? req.file.filename : "defaultUser.jpg"


    let newUser = {
    id: newId(),
    first_name: user.name,
    last_name: user.lastName,
    email: user.email,
    password: bcrypt.hashSync(user.password,10),
    avatar: nameAvatar
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
    first_name: userToEdit.name,
    last_name: userToEdit.lastName,
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