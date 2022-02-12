function comprobationGuest(req, res, next) {
    if(!req.session.userLogged){
        res.redirect("/users/login")
    }
    next();
}

module.exports = comprobationGuest