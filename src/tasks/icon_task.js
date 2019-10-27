const Listr = require('listr');
const path = require('path');
const fs = require('fs');
const getStat = require('../utils/get_stat');
const readDir = require('../utils/read_dir');
// import readablizeBytes = require( '../utils/readablize_bytes';
const { taroIconTmpl } = require('../template/icon');

async function filterImg(dirPath) {
  let isExists = '';

  try {
    isExists = await getStat(dirPath);
  } catch (e) {
    throw new Error(e.toString());
  }
  // NOTE: 读取 icon 图片，生成映射 map 文件
  if (isExists && isExists.isDirectory()) {
    const files = await readDir(dirPath);
    // NOTE: 过滤掉非图片文件
    const result = files.filter((file) => /\.(jpg|png|jpeg)/.test(file));
    // NOTE: 过滤掉大小超过 10kb 的图片
    const resultNext = result.filter((file) => {
      const fullname = path.join(dirPath, file);
      const { size } = fs.statSync(fullname);
      if (size > 1024 * 10) {
        return false;
      }
      return true;
    });
    return resultNext;
  }
  return new Error('input is invalid.');
}

async function wait(second) {
  return new Promise((resolve) => setTimeout(resolve, second));
}
async function iconTask(input) {
  // NOTE: 检查 入口路径是否存在
  const dirPath = path.join(process.cwd(), input);

  const tasks = new Listr([
    {
      title: 'Read images',
      task: () => wait(Math.random().toFixed(2) * 400 + 500)
    },
    {
      title: 'Create type and style files',
      task: () =>
        new Promise(async (resolve, reject) => {
          // TODO: 转换文件名称(中文转拼音，_ 转camel-case)
          const resObj = {};

          let bgTmpl =
            '.icon--box {background-size: contain;background-repeat: no-repeat;}';

          let typeTmpl = 'enum Icons {';
          // const files = [];
          const files = await filterImg(dirPath);
          if (files.length === 0) {
            reject(new Error('No suitable picture!'));
          }
          files.forEach((filename) => {
            const fullname = path.join(dirPath, filename);

            resObj[filename] = fullname;
            const name = filename.replace(/([@2x, @3x])(.*\/)*([^.]+).*/gi, '$2');
            const relativePath = fullname.replace(
              /.*\/([^\/]+\/[^\/]+)$/,
              '$1'
            );
            // TODO: 超过 10 k 的图片显示提示
            // NOTE: 拼接 index.css 内容
            bgTmpl = `${bgTmpl} .icon_${name} {background-image: url("./${relativePath}")}`;
            typeTmpl = `${typeTmpl} ${name} = "icon_${name}",`;
          });
          // NOTE: 生成 index.css 文件，type.ts 文件
          fs.writeFileSync(
            path.join(path.resolve(dirPath, '..'), 'index.css'),
            bgTmpl
          );

          typeTmpl = `${typeTmpl} }export default Icons;`;

          fs.writeFileSync(
            path.join(path.resolve(dirPath, '..'), 'type.ts'),
            typeTmpl
          );

          fs.writeFileSync(
            path.join(path.resolve(dirPath, '..'), 'index.tsx'),
            taroIconTmpl
          );
          setTimeout(resolve, 200);
        })
    }
  ]);

  tasks
    .run()
    .then(() => {
      process.exit(1);
    })
    .catch((err) => {
      process.exit(1);
    });
}

module.exports = iconTask;
