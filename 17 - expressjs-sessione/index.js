const express = require("express");
const { router: todosRouters } = require("./routes/api/todos.js");
const { router: listsRouters } = require("./routes/api/lists.js");
const { router: lists } = require("./routes/lists.js");
const session = require("express-session");
const flash = require("connect-flash");

const ehb = require("express-handlebars");
var methodOverride = require("method-override");

const app = express();

//Congigure session
const MAX_AGE = process.env.MAX_AGE || 60 * 60 * 1000;
const SECRET = process.env.SECRET || "Our beautiful secret";
const DEFAULT_ENV = process.env.DEFAULT_ENV || "development";

app.use(
  session({
    cookie: {
      maxAge: MAX_AGE,
      secure: DEFAULT_ENV === "production",
    },

    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, resp, next) => {
  req.session.user_id = 1;
  next();
});
// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/bootsrtap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use(
  "/sweetalert2",
  express.static(__dirname + "/node_modules/sweetalert2/dist")
);
app.use(express.static(__dirname + "/public"));

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

//app.use("/api/todos", todosRouters);
//app.use("/api/lists", listsRouters);
app.use(["/lists", "/"], lists);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
