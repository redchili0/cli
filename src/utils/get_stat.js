import fs from 'fs';

export default function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(new Error('Directory does not exist.'));
      } else {
        resolve(stats);
      }
    });
  });
}
