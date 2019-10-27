
const ace = require('@adonisjs/ace');
const fs = require('fs');
const path = require('path');

const commandPath = path.resolve(__dirname, './command');
const commands = fs.readdirSync(commandPath);

commands.forEach((c) => {
  // eslint-disable-next-line
  ace.addCommand(require(path.join(commandPath, c)));
});

// Boot ace to execute commands
ace.wireUpWithCommander();
ace.invoke();
