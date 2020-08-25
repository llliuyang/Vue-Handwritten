const base = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },
  plugins: [
    new VueSSRClientPlugin()
    // new HtmlWebpackPlugin({
    //   template: resolve('../public/index.html')
    // })
  ]
})
