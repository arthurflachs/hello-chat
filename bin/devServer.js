const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const config = require('../config');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
});

server.listen(config.clientPort || 8080, config.clientHost || 'localhost', function() {
  console.log(`Client available on ${config.clientHost}:${config.clientPort}`);
});
