const { STATUS_CODES, WEATHER_URL } = require("./constants");

const http = require("http");
const https = require("https");
const httpConstants = require("http2").constants;
const url = require("url");

http
  .createServer((req, resp) => {
    const { pathname, query } = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);
    resp.end("Mi hai chiamato con " + req.url);
  })
  .listen(2000);

console.log("Listening");
