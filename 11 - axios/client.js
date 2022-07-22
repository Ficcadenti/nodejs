const { STATUS_CODES } = require("./constants");

const http = require("http");
const httpConstants = require("http2").constants;
const { processResponse } = require("./functions");

const REQ_URL = "http://localhost:2000/";
console.log(process.argv);
const path = process.argv[2] || "";

try {
  const req = http.get(REQ_URL + path, (resp) => {
    // resp.pipe(process.stdout);

    switch (resp.statusCode) {
      case httpConstants.HTTP_STATUS_OK:
        let response = "";
        resp.on("data", (chunk) => {
          response += chunk;
        });

        resp.on("end", () => {
          try {
            console.log(response);
          } catch (e) {
            console.error(e.message);
          }
        });

        break;
      case httpConstants.HTTP_STATUS_UNAUTHORIZED:
        console.log("pPlease verify your appid !!!");
        break;
      case httpConstants.HTTP_STATUS_NOT_FOUND:
        console.log("City not found !!!");
        break;
      default:
        console.log(
          `Status code : ${resp.statusCode} - ${
            STATUS_CODES[resp.statusCode] || "Unknown"
          }`
        );
        break;
    }
  });
} catch (e) {
  console.log(e.message);
}
