const express = require("express");
const app = express();
const { getWeather } = require("./funzioni.js");

console.log(express);

app.listen(3000);
app.use(express.static("public"));

app.get("/", (req, resp) => {
  resp.send({ name: "Raffale", surname: "Ficcadenti" });
});

app.get("/get-weather/:zip([0-9]+)", async (req, resp) => {
  try {
    console.log(req.url);
    const weather = await getWeather({ zip: req.params.zip, lang: "IT" });
    resp.json(weather);
  } catch (err) {
    resp.status(500).send(err.message);
  }
});

app.get("/get-weather/:city([a-zA-Z]+)", async (req, resp) => {
  try {
    console.log(req.url);
    const weather = await getWeather({ q: req.params.city, lang: "IT" });
    resp.json(weather);
  } catch (err) {
    resp.status(500).send(err.message);
  }
});
