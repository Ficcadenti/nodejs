import { WEATHER_SERVER } from "./costanti.js";
const btn = document.getElementById("btn");

const city = document.getElementById("city");
const zip = document.getElementById("zip");
const response = document.getElementById("response");
const city_r = document.getElementById("city_r");
const weather_r = document.getElementById("weather");
const temp = document.getElementById("temp");
const temp_min = document.getElementById("temp-min");
const temp_max = document.getElementById("temp-max");

console.log(`WEATHER_SERVER=${WEATHER_SERVER}`);
console.log(navigator.language);
btn.addEventListener("click", function () {
  const city_p = city.value.trim();
  const zip_p = zip.value.trim();
  const lang = "IT";

  console.log(`city=${city_p}`);
  console.log(`zip=${zip_p}`);
  let serverUrl = WEATHER_SERVER + "get-weather";
  if (city_p) {
    serverUrl += "/" + city_p;
  } else {
    serverUrl += "/" + zip_p;
  }

  console.log(`serverUrl=${serverUrl}`);
  city.value = "";
  zip.value = "";

  axios
    .get(serverUrl)
    .then((weather) => {
      console.log(weather.data);
      city_r.innerHTML = weather.data.name;
      weather_r.innerHTML = weather.data.weather[0].description;
      temp.innerHTML = weather.data.main.temp;
      temp_min.innerHTML = weather.data.main.temp_min;
      temp_max.innerHTML = weather.data.main.temp_max;
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.toString());
    });
});

document.addEventListener("DOMContentLoaded", function () {
  axios.get(WEATHER_SERVER + "get-countries").then((result) => {
    const countryList = document.getElementById("country_code");
    const countries = result.data;
    countries.forEach((c) => {
      const option = new Option();
      option.value = c.code;
      option.text = c.name;
      countryList.appendChild(option);
    });
  });
});
