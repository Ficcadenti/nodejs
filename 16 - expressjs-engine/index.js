const express = require("express");
const { router: todosRouters } = require("./routes/api/todos.js");
const { router: listsRouters } = require("./routes/api/lists.js");
const ehb = require("express-handlebars");

const app = express();

// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.engine(".hbs", ehb({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use("/api/todos", todosRouters);
app.use("/api/lists", listsRouters);
app.use("/lists", require("./routes/lists"));
app.get("/", (req, res) => {
  res.render("home");
});
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
