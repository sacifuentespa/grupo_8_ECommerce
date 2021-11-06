const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/main.routes");

//configuration
app.use(express.static(path.resolve(__dirname, "./public")));
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");
app.use("/", routes);

app.listen(port, () => {
  console.log("Servidor funcionando");
});
