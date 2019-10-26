const React = require("react");
const { Text, Color } = require("ink");

function GenIcon({ i, input }) {

	// NOTE: 检查 入口路径是否存在
	// NOTE: 检查 路径下是否存在 icon 图片
	// NOTE: 读取 icon 图片，生成映射 map 文件
	// NOTE: 生成 index.css 文件，type.ts 文件
	// NOTE: 提示完成

	return (
		<Text>
			input, <Color green>{i || input}</Color>
		</Text>
	);
}

module.exports = GenIcon;
