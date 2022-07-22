const STATUS_CODES = require("http").STATUS_CODES;
const API_KEY = "9aedecc2fbd0f97ca5d2753134d39e8b";
const WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  API_KEY +
  "&units=metric&q=";
const WEATHER_URL_HTTP =
  "http://api.openweathermap.org/data/2.5/weather?appid=" +
  API_KEY +
  "&units=metric";

module.exports = {
  STATUS_CODES,
  WEATHER_URL,
  WEATHER_URL_HTTP,
};
