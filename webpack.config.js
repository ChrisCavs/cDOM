const path = require('path');

module.exports = {
  entry: './source/main.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
}