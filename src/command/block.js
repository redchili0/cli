const { Command } = require('@adonisjs/ace');
const Ora = require('ora');
const createBlockTask = require('../tasks/block');
const { readBlocks, updateBlocks } = require('../utils/blocks');

class Block extends Command {
  static get signature() {
    return `
        block
        { path?: Path to the target. }
        { -u, --update: Update blocks list. }
        `;
  }

  static get description() {
    return 'create block';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ path }, {update}) {
    if (update) {
      const spinner = Ora('Update block list.');
      spinner.start();
      await updateBlocks();
      spinner.succeed('');
    } else {
      const spinner = Ora('Read block list.');
      spinner.start();
      const blocks = await readBlocks();
      spinner.succeed('');
      const name = await this.choice('Select block?', Object.keys(blocks));
      await createBlockTask(name, blocks[name], path, this);
    }
    process.exit();
  }
}

module.exports = Block;
