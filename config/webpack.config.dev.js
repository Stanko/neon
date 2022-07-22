const config = require('./webpack.config');

module.exports = {
  ...config,
  mode: 'development',
  devServer: {
    // disables the Hot Module Replacement feature because probably not ideal
    // in the context of generative art
    // https://webpack.js.org/concepts/hot-module-replacement/
    allowedHosts: 'all',
    hot: false,
    port: 8080,
    open: false,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
