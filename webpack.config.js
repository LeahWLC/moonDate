const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
      }
    ]
  }
};