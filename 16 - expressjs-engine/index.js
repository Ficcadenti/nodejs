const express = require("express");
const { router: todosRouters } = require("./routes/api/todos.js");
const { router: listsRouters } = require("./routes/api/lists.js");
const { router: lists } = require("./routes/lists.js");

const ehb = require("express-handlebars");
var methodOverride = require("method-override");

const app = express();

// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.engine(".hbs", ehb({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use("/api/todos", todosRouters);
app.use("/api/lists", listsRouters);
app.use(["/lists", "/"], lists);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
