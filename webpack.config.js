const path = require('path');

module.exports = {
  entry: path.resolve('./src/index.js'),

  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: 'eval-source-map',

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css?modules&localIdentName=[path][name]---[local]', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css', include: /node_modules/ },
    ],
  },

  devServer: {
    proxy: {
      '/socket.io': 'http://localhost:12222',
    },
  },
};
