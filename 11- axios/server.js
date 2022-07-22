const { STATUS_CODES, WEATHER_URL_HTTP } = require("./constants");

const http = require("http");
const https = require("https");
const httpConstants = require("http2").constants;
const url = require("url");
const fs = require("fs");
const axios = require("axios");

http
  .createServer((req, resp) => {
    const { pathname, query } = url.parse(req.url, true);
    console.log(`pathname = ${pathname}`);
    console.log(query);

    switch (pathname) {
      case "/":
        console.log("/");
        const index = fs.createReadStream("./index.html");
        resp.writeHead(httpConstants.HTTP_STATUS_OK, {
          "Content-Type": "text/html",
        });
        index.pipe(resp);
        break;

      case "/get-weather":
        console.log("/get-weather");
        const params = {};
        if (query.city) {
          params.q = query.city;
        }
        if (query.lang) {
          params.lang = query.lang;
        }
        if (query.zip) {
          params.zip = query.zip;
        }
        console.log(WEATHER_URL_HTTP);
        console.log(params);
        axios
          .get(WEATHER_URL_HTTP, {
            params,
          })
          .then((weather) => {
            resp.writeHead(httpConstants.HTTP_STATUS_OK, {
              "Content-Type": "application/json",
            });
            resp.end(JSON.stringify(weather.data));
            console.log(weather);
          })
          .catch((err) => {
            console.log(err);
            resp.writeHead(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
            resp.end();
          });
        break;

      default:
        resp.writeHead(httpConstants.HTTP_STATUS_BAD_REQUEST);
        resp.end();
        break;
    }
  })
  .listen(2000);

console.log("Listening");
