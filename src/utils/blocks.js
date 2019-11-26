const path = require('path');
const util = require('util');
const fs = require('fs');
const fse = require('fs-extra');
const downloadGit = require('./download_git');
const getStat = require('./get_stat');
const { readConfig } = require('./config');
// const blocksRepo = 'https://github.com/redchili0/blocks.git';

const readDir = util.promisify(fs.readdir);

const cachePath = path.join(process.cwd(), `.cache/blocks`);

const templatesPath = path.join(process.cwd(), `.cache/blocks/templates`);

async function readBlocks() {
  let isExists;
  try {
    isExists = await getStat(cachePath);
  } catch (e) {
    throw new Error(e.toString());
  }

  const blocksRepo = readConfig('blocksRepo');

  if (!isExists || !isExists.isDirectory()) {
    await downloadGit(blocksRepo, cachePath);
  }
  const blocks = await genBlocksArr();
  return blocks;
}

async function genBlocksArr() {
  const templates = await readDir(templatesPath);

  const blocks = {};
  templates.map((tmpl) => {
    blocks[tmpl] = `${templatesPath}/${tmpl}`;
  });
  return blocks;
}

async function updateBlocks() {
  const blocksRepo = readConfig('blocksRepo');

  await fse.remove(cachePath);
  await downloadGit(blocksRepo, cachePath);
  const blocks = await genBlocksArr();
  return blocks;
}

module.exports = { readBlocks, updateBlocks };
