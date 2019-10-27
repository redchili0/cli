import Listr from 'listr';
import path from 'path';
import fs from 'fs';
import getStat from '../utils/get_stat';
import readablizeBytes from '../utils/readablize_bytes';
import { wxappIconTmpl } from '../template/icon';

export default function genIcon(option) {
  // eslint-disable-next-line no-nested-ternary
  const inputPath = Object.keys(option).includes('i')
    ? option.i
    : Object.keys(option).includes('input')
      ? option.input
      : '';
  // NOTE: 检查 入口路径是否存在
  if (path) {
    const tasks = new Listr([
      {
        title: 'Read images',
        task: async () => {
          let isExists = '';
          const dirPath = path.join(process.cwd(), inputPath);
          try {
            isExists = await getStat(dirPath);
          } catch (e) {
            throw new Error(e.toString());
          }
          // NOTE: 读取 icon 图片，生成映射 map 文件
          if (isExists && isExists.isDirectory()) {
            const files = fs.readdirSync(dirPath);
            // console.log('为什么了', files);
            // NOTE: 过滤掉非图片文件
            const result = files.filter((file) => /\.(jpg|png|jpeg)/.test(file));
            // TODO: 转换文件名称(中文转拼音，_ 转camel-case)
            const resObj = {};

            let bgTmpl = '.icon--box {background-size: contain;background-repeat: no-repeat;}';

            let typeTmpl = 'enum Icons {';

            result.forEach((filename) => {
              const fullname = path.join(dirPath, filename);
              const { size } = fs.statSync(fullname);
              const sizeUnit = readablizeBytes(size);
              console.log(sizeUnit);
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
            // fs.readdir(dirPath, (err, files) => {
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
        },
      },
      {
        title: 'Create type and style files',
        task: () => 'files',
      },
      {
        title: 'Success',
        task: () => 'success',
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
  } else {
    console.log('--input or --i expected a path.');
  }

  // NOTE: 提示完成
}
