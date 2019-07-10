const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
  entry:  ['./server/index.js'],
  output:  {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    publicPath: '',
  },
  target: 'node',
  externals: [nodeExternals()],
};

module.exports = merge(baseConfig, config);
