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

console.log(`WEATHER_SERVER ${WEATHER_SERVER}`);
btn.addEventListener("click", function () {
  const params = {};
  if (city.value) {
    params.city = city.value;
  }
  if (zip.value) {
    params.zip = city.zip;
  }
  params.lang = "IT";
  city.value = "";
  zip.value = "";
  console.log(params);
  axios
    .get(WEATHER_SERVER, {
      params,
    })
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
