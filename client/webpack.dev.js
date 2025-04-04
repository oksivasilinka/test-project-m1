const path = require('path');
const common = require('./webpack.common');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    ...common.resolve,
  },
  devServer: {
    port: 3098,
    hot: true,
    open: false,
    historyApiFallback: true
  }
};

