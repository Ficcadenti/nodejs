const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();
const read = fs.createReadStream(__dirname + "/data.txt");
const writeZip = fs.createWriteStream(__dirname + "/copy_data.gz");

read.pipe(gzip).pipe(writeZip);

writeZip.on("error", (data) => {
  console.log(e.toString());
});

read.on("error", (e) => {
  console.log(e.toString());
});
