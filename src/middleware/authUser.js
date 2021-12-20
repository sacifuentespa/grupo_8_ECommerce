const usersModel = require("../model/users.js");

function defaultUser (req, res, next){
    res.locals.isLogged = false;

    //implement the code for cookie

     if(req.cookies.remindMe != undefined && req.session.userLogged == undefined){
         
         let userToLoggin = usersModel.findByEmail(req.cookies.remindMe)
         req.session.userLogged = userToLoggin
     }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged
    }

    next()
}

module.exports = defaultUser