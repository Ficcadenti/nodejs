const EventEmitter = require("events");

console.log(EventEmitter);

const evt = new EventEmitter();

evt.on("onData", (data) => {
  console.log("sempre", data);
});

evt.once("onData", (data) => {
  console.log("only one", data);
});

function evento2(data) {
  console.log("evento2", data);
}
evt.addListener("onData", evento2);

evt.emit("onData", [1, 2, 3, 4, 5]);
evt.emit("onData", [1, 2, 3, 4, 5]);
evt.emit("onData", [1, 2, 3, 4, 5]);
evt.emit("onData", [1, 2, 3, 4, 5]);
evt.emit("onData", [1, 2, 3, 4, 5]);
