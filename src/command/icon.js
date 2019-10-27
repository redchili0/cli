const { Command } = require('@adonisjs/ace');
const iconTask = require('../tasks/icon_task');

class Icon extends Command {
  static get signature() {
    return `
      icon
      { path: path to the image resource  }
      { -t, --taro: Taro-based component }
      { -w, --web: Web-based component }
    `;
  }

  static get description() {
    return 'generate image component';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ path }) {
    iconTask(path);
  }
}

module.exports = Icon;
