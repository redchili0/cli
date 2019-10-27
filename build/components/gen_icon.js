"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genIcon;

var _listr = _interopRequireDefault(require("listr"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _get_stat = _interopRequireDefault(require("../utils/get_stat"));

var _read_dir = _interopRequireDefault(require("../utils/read_dir"));

var _icon = require("../template/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import readablizeBytes from '../utils/readablize_bytes';
// eslint-disable-next-line no-unused-vars
async function filterImg(dirPath) {
  let isExists = '';

  try {
    isExists = await (0, _get_stat.default)(dirPath);
  } catch (e) {
    throw new Error(e.toString());
  } // NOTE: 读取 icon 图片，生成映射 map 文件


  if (isExists && isExists.isDirectory()) {
    const files = await (0, _read_dir.default)(dirPath); // FIXME: 这个函数有问题，会导致翻页
    // const files = ['x.jpg'];
    // NOTE: 过滤掉非图片文件

    const result = files.filter(file => /\.(jpg|png|jpeg)/.test(file));
    return result;
  }

  return new Error('input is invalid.');
}

async function wait(second) {
  return new Promise(resolve => setTimeout(resolve, second));
}

async function genIcon(option) {
  // eslint-disable-next-line no-nested-ternary
  const inputPath = Object.keys(option).includes('i') ? option.i : Object.keys(option).includes('input') ? option.input : ''; // NOTE: 检查 入口路径是否存在

  if (_path.default) {
    const dirPath = _path.default.join(process.cwd(), inputPath);

    const tasks = new _listr.default([{
      title: 'Read images',
      task: () => wait(1000)
    }, {
      title: 'Create type and style files',
      // eslint-disable-next-line no-async-promise-executor
      task: () => new Promise(async resolve => {
        // TODO: 转换文件名称(中文转拼音，_ 转camel-case)
        const resObj = {};
        let bgTmpl = '.icon--box {background-size: contain;background-repeat: no-repeat;}';
        let typeTmpl = 'enum Icons {'; // const files = [];

        const files = await filterImg(dirPath);
        files.forEach(filename => {
          const fullname = _path.default.join(dirPath, filename); // const { size } = fs.statSync(fullname);
          // const sizeUnit = readablizeBytes(size);
          // console.log(sizeUnit);


          resObj[filename] = fullname; // TODO: 超过 10 k 的图片显示提示
          // NOTE: 拼接 index.css 内容

          bgTmpl = `${bgTmpl} icon_${filename}: {background-image: url("${fullname}")}`;
          typeTmpl = `${typeTmpl} ${filename} = "icon_${filename}"`;
        }); // NOTE: 生成 index.css 文件，type.ts 文件

        _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'index.css'), bgTmpl);

        typeTmpl = `${typeTmpl} }export default Icons;`;

        _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'type.ts'), typeTmpl);

        _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'index.tsx'), _icon.wxappIconTmpl);

        setTimeout(resolve, 200);
      })
    }]);
    tasks.run().then(() => {
      process.exit(1);
    }).catch(() => {
      process.exit(1);
    });
  } else {
    console.log('--input or --i expected a path.');
  } // NOTE: 提示完成

}