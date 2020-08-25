const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: resolve('../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', {
          loader: 'css-loader',
          options: {
            esModule: false
          }
        }]
      },
      {
        test: /\.js$/,
        use: {
          options: {
            presets: ['@babel/preset-env']
          },
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}