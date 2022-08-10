const express = require("express");
const router = express.Router();

const logger = (req, resp, next) => {
  console.log(`AUTH: user_id=${req.session.user_id}`);
  console.log(
    "AUTH: Chiamata al server con params=" + JSON.stringify(req.params)
  );
  next();
};

router.get("/signup", logger, async (req, res) => {
  res.render("login", { signup: true });
});

module.exports = { router };
