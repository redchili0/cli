const { Command } = require('@adonisjs/ace');
const createBlockTask = require('../tasks/block');

const blocks = {
  'search-table': 'https://github.com/xiamu14/pkg-complex-table.git',
  'edit-search-table': 'https://github.com/xiamu14/pkg-complex-table-hook.git'
};

class Block extends Command {
  static get signature() {
    return `
        block
        { path: Path to the target }
        `;
  }

  static get description() {
    return 'create block';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ path }) {
    const name = await this.choice('Select block?', [
      'search-table',
      'edit-search-table'
    ]);
    await createBlockTask(name, blocks[name], path, this);
    process.exit();
  }
}

module.exports = Block;