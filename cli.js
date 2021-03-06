#!/usr/bin/env node
const ace = require('@adonisjs/ace');
const fs = require('fs');
const path = require('path');

const commandPath = path.resolve(__dirname, './src/command');
const commands = fs.readdirSync(commandPath);

commands.forEach((c) => {
  ace.addCommand(require(path.join(commandPath, c)));
});

ace.wireUpWithCommander();
ace.invoke();
