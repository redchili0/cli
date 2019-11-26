const { Command } = require('@adonisjs/ace');
const { readConfig, updateConfig } = require('../utils/config');
class Config extends Command {
  static get signature() {
    return `
        config
        {-v, --view: view configuration file contents}
        `;
  }

  static get description() {
    return 'update config.';
  }

  async handle(args, { view }) {
    if (view) {
      const contents = readConfig();
      this.info(contents);
    } else {
      const configs = {
        blocksRepo: 'blocksRepo'
      };

      // const name = await this.choice(
      //   'Select value to update?',
      //   Object.keys(configs)
      // );
      const name = Object.keys(configs)[0];
      const input = await this.ask(`${name}`);
      await updateConfig(name, input);
      this.success(`${this.icon('success')} config upated`);
    }
    process.exit();
  }
}

module.exports = Config;
