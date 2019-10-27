"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readablizeBytes;

function readablizeBytes(bytes) {
  const s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const e = Math.floor(Math.log(bytes) / Math.log(1024)); // eslint-disable-next-line no-restricted-properties

  return `${(bytes / Math.pow(1024, Math.floor(e))).toFixed(2)} ${s[e]}`;
}