const express = require("express");
const { router: todosRouters } = require("./routes/todos.js");
const { router: listsRouters } = require("./routes/lists.js");
const app = express();

// app.all("*", (req, resp, next) => {
//   console.log("I'am the all * middlewere");
//   //   next(new Error("Simulazione errore"));
//   next();
// });

// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", todosRouters);
app.use("/lists", listsRouters);
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
