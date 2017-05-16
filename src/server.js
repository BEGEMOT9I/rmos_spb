const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.babel');

new WebpackDevServer(Webpack(config), {
	hot: true,
	inline: true,
	historyApiFallback: true,
}).listen(3000, '0.0.0.0', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:3000/');
	console.log('NODE_ENV=[' + process.env.NODE_ENV + ']');
});
