const { STATUS_CODES, WEATHER_URL } = require("./constants");

const https = require("https");
const httpConstants = require("http2").constants;
const { processResponse } = require("./functions");

console.log(process.argv);
const citta = process.argv[2] || "";

const REQ_URL = WEATHER_URL + citta;
console.log(REQ_URL);

try {
  const req = https.get(REQ_URL, (resp) => {
    // resp.pipe(process.stdout);

    switch (resp.statusCode) {
      case httpConstants.HTTP_STATUS_OK:
        processResponse(resp);
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
