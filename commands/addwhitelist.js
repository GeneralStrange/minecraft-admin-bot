const util = require("minecraft-server-util");
const config = require("../config.json");

const server = new util.RCON(config.server, {
  port: config.port,
  enableSRV: true,
  timeout: 5000,
  password: config.password,
});

module.exports = {
  name: "addwhitelist",
  description: "Add user to whitelist",
  execute(message, args) {
    server
      .connect()
      .then(() => server.run(`whitelist add ${args}`))
      .then(() => message.reply(`Added ${args} to the whitelist.`))
      .catch((e) => {
        console.error(e);
        message.reply("An error has occurred, please check console logs.");
      });
    server.on("output", (msg) => {
      server.close();
    });
  },
};
