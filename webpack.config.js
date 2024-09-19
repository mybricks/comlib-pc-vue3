const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: path.resolve(__dirname, "./node_modules/vue-loader"),
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
