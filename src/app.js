require('dotenv').config()

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;
const routesMain = require("./routes/main.routes");
const routesProducts = require("./routes/products.routes");
const routesUsers = require("./routes/users.routes");
const methodOverride = require('method-override');
const session = require("express-session")
const cookieParser = require ('cookie-parser')
const autUser = require("./middleware/authUser")

//check heroku headers has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

//configuration
app.use(session({
  secret: "exampleSecret",
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use(autUser)
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(methodOverride('_method'));
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", routesMain);
app.use("/products", routesProducts);
app.use("/users", routesUsers);

//error 404

app.use((req, res, next) => {
  res.status(404).render('notFound', {title: "Error 404"});
})

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});