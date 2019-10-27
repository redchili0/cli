#!/usr/bin/env node

import React from 'react';
import meow from 'meow';
import genIcon from './components/gen_icon';

const cli = meow(`
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
    genIcon(cli.flags);
  }
}
