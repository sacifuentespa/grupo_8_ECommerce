//modules
const fs = require("fs");
const path = require("path");

//db
const usersFilePath = path.resolve(__dirname, "./users.json");
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
  newUser: (user) => {
   
    let newUser = {
      id: newId(),
    first_name: user.name,
    last_name: user.lastName,
    email: user.email,
    password: user.password,
    };

    let db = dbUsers;
    db.push(newUser)
    db = JSON.stringify(db, null, 4);
    fs.writeFileSync(usersFilePath, db)

    return newUser
  },
 
  
};

module.exports = usersModel