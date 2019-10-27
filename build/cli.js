#!/usr/bin/env node
"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _gen_icon = _interopRequireDefault(require("./components/gen_icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _meow.default)(`
    Usage
      $ cli

    Command
        icon generater icon component(now only support weapp)

        Options
            --input(alias:i) icon image input file

    Options
        --name  Your name

    Examples
      $ cli --name=Jane
      Hello, Jane
`);

if (cli.input.length > 0) {
  const command = cli.input[0];

  if (command === 'icon') {
    // render(React.createElement(GenIcon, cli.flags));
    // eslint-disable-next-line react/jsx-filename-extension
    (0, _gen_icon.default)(cli.flags);
  }
}