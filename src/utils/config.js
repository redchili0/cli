const path = require('path');
const fs = require('fs');
const readline = require('readline');
const kleur = require('kleur');
const clear = require('./clear');
const configPath = path.join(process.cwd(), 'src/config.json');

async function updateConfig(key, val) {
  const configContent = fs.readFileSync(configPath, 'utf8');

  let params = {};
  if (!configContent) {
    params[key] = val;
  } else {
    params = JSON.parse(configContent);
    params[key] = val;
  }
  fs.writeFileSync(configPath, JSON.stringify(params));
}

function readConfig(key) {
  const configContent = fs.readFileSync(configPath, 'utf8');
  if (configContent) {
    const params = JSON.parse(configContent);
    if (!key) {
      return configContent;
    }
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return params[key];
    } else {
      clear();
      console.log(`${kleur.red('✖ ' + `${key} doesn't exist.`)}`);
      process.exit();
    }
  } else {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(`${kleur.red('✖ config.json is empty, please update first.')}`);
    process.exit();
  }
}

module.exports = { readConfig, updateConfig };
