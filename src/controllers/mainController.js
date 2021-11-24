const controller = {
  getIndex: (req, res) => {
    res.render("products/index", {title: "Trueque Online"});
  },
  getCart: (req, res) => {
    res.render("products/cart", {title: "Mi Carrito"});
  }
};

module.exports = controller;
