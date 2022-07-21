const fs = require("fs");

const read = fs.createReadStream(__dirname + "/data.txt");

const write = fs.createWriteStream(__dirname + "/copy_data.txt");

// read.on("readable", () => {
//   console.log("Stream ready" + read.read());
// });

read.on("data", (data) => {
  console.log(data.toString());
  write.write(data);
});
