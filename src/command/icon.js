const { Command } = require('@adonisjs/ace');
const iconTask = require('../tasks/icon_task');

class Icon extends Command {
  static get signature() {
    return `
      icon
      { path: Path to the image resource  }
      `;
      // { -w, --web: Web-based component } //TODO: 支持 react component；选择创建
      // { -t, --taro: Taro-based component }
  }

  static get description() {
    return 'generate and update icon component';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ path }) {
    iconTask(path);
  }
}

module.exports = Icon;
