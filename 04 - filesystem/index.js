const fs = require("fs");

// fs.readdir(".", "utf8", (err, arrFiles) => {
//   if (err) {
//     console.error(err);
//     return;
//   } else {
//     arrFiles.forEach((e) => {
//       if (e == "api.json") {
//         console.log(e);
//         console.log("Leggo il file");
//         fs.readFile(e, (err, data) => {
//           if (err) {
//             console.error(`Errore lettura file ${e}`);
//             return;
//           } else {
//             const config = JSON.parse(data);
//             console.log(config);
//           }
//         });
//       }
//     });
//   }
// });

fs.stat("./api.json", (err, res) => {
  if (err) {
    console.error(err);
    return err;
  } else {
    console.log(res);
  }
});
