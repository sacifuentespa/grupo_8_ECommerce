function defaultUser (req, res, next){
    res.locals.isLogged = false;

    //implement the code for cookie

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged
    }

    next()
}

module.exports = defaultUser