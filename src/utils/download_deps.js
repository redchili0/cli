// const fs = require('fs');
const execa = require('execa');

async function downloadDeps(pkg) {
  const deps = Object.keys(pkg.dependencies).map(
    (key) => `${key}@${pkg.dependencies[key]}`
  );

  // NOTE: check local deps if this have higher ?

  if (deps.length > 0) {
    await execa('yarn', ['add', ...deps]);
  }
}

module.exports = downloadDeps;
