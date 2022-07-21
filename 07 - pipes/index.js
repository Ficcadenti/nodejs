const fs = require("fs");

const read = fs.createReadStream(__dirname + "/data.txt");

const write = fs.createWriteStream(__dirname + "/copy_data.txt");

// read.on("readable", () => {
//   console.log("Stream ready" + read.read());
// });
read.pipe(write);

write.on("error", (data) => {
  console.log(e.toString());
});

read.on("error", (e) => {
  console.log(e.toString());
});
