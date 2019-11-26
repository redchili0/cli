const path = require('path');
const fs = require('fs');

const configPath = path.join(process.cwd(), 'src/config.json');


// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
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
      console.log(`! ${key} doesn't exit.`);
      process.exit();
    }
  } else {
    console.log('! config.json is empty, please update first.');
    process.exit();
  }
}

module.exports = { readConfig, updateConfig };
