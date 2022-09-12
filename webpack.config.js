const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './build/static')
	},
	performance: {
		hints: false
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	mode: 'production',
	//將loader的設定寫在module的rules屬性中
	module: {
		//rules的值是一個陣列可以存放多個loader物件
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', { runtime: 'automatic' }]
						]
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'media'
				}
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	//增加一個給devserver的設定
	devServer: {
		//指定開啟port為9000
		port: 9000,
		hot: true
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
};
