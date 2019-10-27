"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStat;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStat(path) {
  return new Promise((resolve, reject) => {
    _fs.default.stat(path, (err, stats) => {
      if (err) {
        reject(new Error('Directory does not exist.'));
      } else {
        resolve(stats);
      }
    });
  });
}