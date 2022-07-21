const f = require("./funzioni.js");
const config = require("./config");
const fs = require("fs");
const api = require("./api.json");
const _ = require("lodash");

console.log(f);
console.log(f.calcCircArea(2));
console.log(config);
console.log(api);

_.each([1, 2], (ele) => console.log(ele * 2));

[1, 2].forEach((ele) => console.log(ele * 3));

console.log(config);

fs.writeFile(
  "test.json",
  JSON.stringify(config),
  { encoding: "utf8" },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File creato !!!!");
    }
  }
);
console.log("Dopo file creato !!!!");

fs.writeFileSync("test2.json", JSON.stringify(config));
console.log("Dopo file creato 2!!!!");
