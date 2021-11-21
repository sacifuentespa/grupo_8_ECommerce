const controller = {
  getIndex: (req, res) => {
    res.render("products/index", {title: "Trueque Online"});
  },

  getLogin: (req, res) => {
    res.render("users/login", {title: "Iniciar Sesión"});
  },
  getRegister: (req, res) => {
    res.render("users/register", {title: "Crear Usuario"});
  },
  getCart: (req, res) => {
    res.render("products/cart", {title: "Mi Carrito"});
  }
};

module.exports = controller;
