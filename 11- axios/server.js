const { STATUS_CODES, WEATHER_URL } = require("./constants");

const http = require("http");
const https = require("https");
const httpConstants = require("http2").constants;
const url = require("url");
const fs = require("fs");

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
    }
  })
  .listen(2000);

console.log("Listening");
