const { WEATHER_URL_HTTP } = require("./constants");
const axios = require("axios");

const getWeather = async (params) => {
  try {
    console.log(params);
    const result = await axios.get(WEATHER_URL_HTTP, { params });
    return result.data;
  } catch (err) {
    console.log(err);
    throw err.response.data;
  }
};

module.exports = { getWeather };
