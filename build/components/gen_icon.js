"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genIcon;

var _listr = _interopRequireDefault(require("listr"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _get_stat = _interopRequireDefault(require("../utils/get_stat"));

var _readablize_bytes = _interopRequireDefault(require("../utils/readablize_bytes"));

var _icon = require("../template/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genIcon(option) {
  // eslint-disable-next-line no-nested-ternary
  const inputPath = Object.keys(option).includes('i') ? option.i : Object.keys(option).includes('input') ? option.input : ''; // NOTE: 检查 入口路径是否存在

  if (_path.default) {
    const tasks = new _listr.default([{
      title: 'Read images',
      task: async () => {
        let isExists = '';

        const dirPath = _path.default.join(process.cwd(), inputPath);

        try {
          isExists = await (0, _get_stat.default)(dirPath);
        } catch (e) {
          throw new Error(e.toString());
        } // NOTE: 读取 icon 图片，生成映射 map 文件


        if (isExists && isExists.isDirectory()) {
          const files = _fs.default.readdirSync(dirPath); // console.log('为什么了', files);
          // NOTE: 过滤掉非图片文件


          const result = files.filter(file => /\.(jpg|png|jpeg)/.test(file)); // TODO: 转换文件名称(中文转拼音，_ 转camel-case)

          const resObj = {};
          let bgTmpl = '.icon--box {background-size: contain;background-repeat: no-repeat;}';
          let typeTmpl = 'enum Icons {';
          result.forEach(filename => {
            const fullname = _path.default.join(dirPath, filename);

            const {
              size
            } = _fs.default.statSync(fullname);

            const sizeUnit = (0, _readablize_bytes.default)(size);
            console.log(sizeUnit);
            resObj[filename] = fullname; // TODO: 超过 10 k 的图片显示提示
            // NOTE: 拼接 index.css 内容

            bgTmpl = `${bgTmpl} icon_${filename}: {background-image: url("${fullname}")}`;
            typeTmpl = `${typeTmpl} ${filename} = "icon_${filename}"`;
          }); // NOTE: 生成 index.css 文件，type.ts 文件

          _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'index.css'), bgTmpl);

          typeTmpl = `${typeTmpl} }export default Icons;`;

          _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'type.ts'), typeTmpl);

          _fs.default.writeFileSync(_path.default.join(_path.default.resolve(dirPath, '..'), 'index.tsx'), _icon.wxappIconTmpl); // fs.readdir(dirPath, (err, files) => {
          //   console.log('如此奇怪吗？', files);
          //   const results = {};
          //   files.forEach((filename) => {
          //     fs.readFile(filename, (data) => {
          //       results[filename] = `./public/images/${filename}`;
          //       console.log(data);
          //     });
          //   });
          // });


          return true;
        }

        throw new Error('input is invalid.');
      }
    }, {
      title: 'Create type and style files',
      task: () => 'files'
    }, {
      title: 'Success',
      task: () => 'success'
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