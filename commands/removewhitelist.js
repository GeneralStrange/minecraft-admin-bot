const util = require("minecraft-server-util");
const config = require("../config.json");

const server = new util.RCON(config.server, {
  port: config.port,
  enableSRV: true,
  timeout: 5000,
  password: config.password,
});

module.exports = {
  name: "removewhitelist",
  description: "Remove user from the whitelist",
  execute(message, args) {
    server
      .connect()
      .then(() => server.run(`whitelist remove ${args}`))
      .then(() => message.reply(`Removed ${args} from the whitelist.`))
      .catch((e) => {
        console.error(e);
        message.reply("An error has occurred, please check console logs.");
      });
    server.on("output", (msg) => {
      server.close();
    });
  },
};
