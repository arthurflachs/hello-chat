module.exports = {
  module: {
    loaders: [
      { test: /\.css/, loader: 'style!css?modules&localIdentName=[path][name]---[local]', exclude: /node_modules/ },
      { test: /\.css/, loader: 'style!css', include: /node_modules/ },
    ],
  },
};
