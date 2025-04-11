const common = require('./webpack.config');

module.exports = {
  ...common,
  devtool: 'eval-source-map',
  mode: 'production'
};

