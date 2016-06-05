require('babel-polyfill');

var fs = require('fs');// node filesystem
var path = require('path'); // from node api
var webpack = require('webpack'); // 用于调用webpack内置的插件
var assetPath = path.resovle(__dirname, '../static/dist');// resolve 相当于cd 打开

var babelrc = fs.readFileSync('../.babelrc'); // 读取babelrc
var babelrcObject = {};

try {
	babelrcObject = JSON.parse(babelrc);
} catch (err) {
	console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});

delete babelLoaderQuery.env;

module.exports = {
	devtool: 'inline-sourece-map',
	entry: './app/index.js',
	output: {
		path: path.join(__dirname,'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				loaders: ['babel','eslint-loader'],
				query: babelLoaderQuery
			},
      		{ test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
		]
	}
}
