const controller = {
  getIndex: (req, res) => {
    res.render("products/index", {tittle: "Trueque Online"});
  },

  getLogin: (req, res) => {
    res.render("users/login", {tittle: "Iniciar Sesión"});
  },
  getRegister: (req, res) => {
    res.render("users/register", {tittle: "Crear Usuario"});
  },
  getCart: (req, res) => {
    res.render("products/cart", {tittle: "Mi Carrito"});
  }
};

module.exports = controller;
