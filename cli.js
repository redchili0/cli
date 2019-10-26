#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');
const GenIcon = importJsx('./components/gen_icon.js')

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
		render(React.createElement(GenIcon, cli.flags));
	}
}
