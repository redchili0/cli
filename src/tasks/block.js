const path = require('path');
const ora = require('ora');
const fse = require('fs-extra');
const wait = require('../utils/wait');

async function create(name, spath, tpath) {

  // eslint-disable-next-line no-undef
  const targetPath = path.join(process.cwd(), tpath);

  const spinner = ora(`Download ${name}`);
  spinner.start();
  // STEP:check cache exist
  // const isExists = await context.pathExists(cachePath);
  // if (!isExists) {
  //   // STEP:download block
  //   try {
  //     await downloadGit(url, cachePath);
  //   } catch (error) {
  //     spinner.error('Download failed, please check network!');
  //   }
  // }
  // STEP:copy block
  spinner.color = 'magenta';
  spinner.text = `Copy file to ${tpath}/${name}`;
  const now = Date.now();
  try {
    await fse.copy(`${spath}/src`, `${targetPath}/${name}`);
  } catch (error) {
    spinner.error(error);
  }
  const duration = Date.now() - now;
  if (duration < 1500) {
    await wait(1500 - duration);
  }
  // STEP:download denpendcies
  // spinner.color = 'green';
  // spinner.text = 'Download dependencies';
  // const pkg = require(`${cachePath}/package.json`);

  // await downloadDeps(pkg);

  spinner.succeed(`The block ${name} was successfully created!`);
}

module.exports = create;
