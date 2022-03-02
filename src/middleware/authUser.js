const usersModel = require("../model/users.js");

async function defaultUser (req, res, next){
    res.locals.isLogged = false;

    //implement the code for cookie

     if(req.cookies.remindMe != undefined && req.session.userLogged == undefined){
         try {
            let userToLoggin = await usersModel.findByEmailNoPassword(req.cookies.remindMe)
            req.session.userLogged = userToLoggin.dataValues;
         } catch (err) {
            console.log(err)
         }

     }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged
        // console.log(res.locals.user)
    }

    next()
}

module.exports = defaultUser