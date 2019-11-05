const download = require('download-git-repo');

const downloadGit = (url,tpath) => {
  return new Promise((resolve, reject) => {
    download(
      `direct:${url}#master`,
      tpath,
      { clone: true },
      (err) => {
        if (err) {
          reject(err);
        } else {
          // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
          resolve();
        }
      }
    );
  });
};

module.exports = downloadGit;
