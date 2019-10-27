"use strict";

var _react = _interopRequireDefault(require("react"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ava = _interopRequireDefault(require("ava"));

var _inkTestingLibrary = require("ink-testing-library");

var _ui = _interopRequireDefault(require("./ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('greet unknown user', t => {
  const {
    lastFrame
  } = (0, _inkTestingLibrary.render)(_react.default.createElement(_ui.default, null));
  t.is(lastFrame(), _chalk.default`Hello, {green Stranger}`);
});
(0, _ava.default)('greet user with a name', t => {
  const {
    lastFrame
  } = (0, _inkTestingLibrary.render)(_react.default.createElement(_ui.default, {
    name: "Jane"
  }));
  t.is(lastFrame(), _chalk.default`Hello, {green Jane}`);
});