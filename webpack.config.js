module.exports = {
  entry: './src/index.js',

  output: {
    path: './dist',
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
};
