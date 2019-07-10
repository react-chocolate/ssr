const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../src/'), // just for entries
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'], // server and browser handle the "same" files 
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new LoadablePlugin(), // should this run in both, server and browser? the loadable file would be public...
  ],
  stats: {
    colors: true,
    reasons: true,
    chunks: false, // am I using chunks?
  },
};
