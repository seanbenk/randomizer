const { getRandomElement } = require("./utils");

const names = [];

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("getNewName", () => this.getNewName());
    socket.on("newName", (name) => this.addName(name));
    socket.on("deleteName", (name) => this.deleteName(name));
    socket.on("getNames", () => this.sendNames());
    socket.on("random", () => this.selectRandom());
    socket.on("resetAnimations", () => this.resetAnimations());
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendNames() {
    this.io.emit("names", names);
  }

  getNewName() {
    names.forEach((name) => this.sendName(name));
  }

  addName(name) {
    console.log("new name:", name);

    names.push(name);
    this.sendNames();
  }

  deleteName(name) {
    names.splice(names.indexOf(name), 1);
    this.sendNames();
  }

  selectRandom() {
    const randomName = getRandomElement(names);
    this.io.sockets.emit("lottery", { names, randomName });
  }

  resetAnimations() {
    this.io.sockets.emit("resetAnimations");
  }

  disconnect() {}
}

function NamesConfig(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = NamesConfig;
