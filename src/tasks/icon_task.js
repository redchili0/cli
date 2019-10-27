const Listr = require('listr');
const path = require('path');
const fs = require('fs');
const getStat = require('../utils/get_stat');
const readDir = require('../utils/read_dir');
// import readablizeBytes = require( '../utils/readablize_bytes';
const { wxappIconTmpl } = require('../template/icon');

// eslint-disable-next-line no-unused-vars
async function filterImg(dirPath) {
  let isExists = '';

  try {
    isExists = await getStat(dirPath);
  } catch (e) {
    throw new Error(e.toString());
  }
  // NOTE: 读取 icon 图片，生成映射 map 文件
  if (isExists && isExists.isDirectory()) {
    const files = await readDir(dirPath); // FIXME: 这个函数有问题，会导致翻页
    // const files = ['x.jpg'];
    // NOTE: 过滤掉非图片文件
    const result = files.filter((file) => /\.(jpg|png|jpeg)/.test(file));

    return result;
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
      task: () => wait(1000),
    },
    {
      title: 'Create type and style files',
      // eslint-disable-next-line no-async-promise-executor
      task: () => new Promise(async (resolve) => {
        // TODO: 转换文件名称(中文转拼音，_ 转camel-case)
        const resObj = {};

        let bgTmpl = '.icon--box {background-size: contain;background-repeat: no-repeat;}';

        let typeTmpl = 'enum Icons {';
        // const files = [];
        const files = await filterImg(dirPath);
        files.forEach((filename) => {
          const fullname = path.join(dirPath, filename);
          // const { size } = fs.statSync(fullname);
          // const sizeUnit = readablizeBytes(size);
          // console.log(sizeUnit);
          resObj[filename] = fullname;
          // TODO: 超过 10 k 的图片显示提示
          // NOTE: 拼接 index.css 内容
          bgTmpl = `${bgTmpl} icon_${filename}: {background-image: url("${fullname}")}`;
          typeTmpl = `${typeTmpl} ${filename} = "icon_${filename}"`;
        });
        // NOTE: 生成 index.css 文件，type.ts 文件
        fs.writeFileSync(
          path.join(path.resolve(dirPath, '..'), 'index.css'),
          bgTmpl,
        );

        typeTmpl = `${typeTmpl} }export default Icons;`;

        fs.writeFileSync(
          path.join(path.resolve(dirPath, '..'), 'type.ts'),
          typeTmpl,
        );

        fs.writeFileSync(
          path.join(path.resolve(dirPath, '..'), 'index.tsx'),
          wxappIconTmpl,
        );
        setTimeout(resolve, 200);
      }),
    },
  ]);

  tasks
    .run()
    .then(() => {
      process.exit(1);
    })
    .catch(() => {
      process.exit(1);
    });
}


module.exports = iconTask;
