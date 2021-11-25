const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/main.routes");
const methodOverride = require('method-override');

//configuration
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");
app.use("/", routes);

//error 404

app.use((req, res, next) => {
  res.status(404).render('notFound', {tittle: "Error 404"});
})

app.listen(port, () => {
  console.log("Servidor funcionando");
});
