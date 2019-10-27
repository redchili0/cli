"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readDir;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readDir(path) {
  return new Promise((resolve, reject) => {
    _fs.default.readdir(path, (err, files) => {
      if (err) {
        reject(new Error('Directory does not exist.'));
      } else {
        resolve(files);
      }
    });
  });
}