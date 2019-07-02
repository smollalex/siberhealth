const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config =  {

  entry: {
    app: `./src/js/app.js`,
  },

  output: {
    path: path.resolve(__dirname, `dist`),
    filename: 'js/index.js'
  },

  module: {
    rules: [

      // JS
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },

      // CSS
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: { 
              url: false
            } 
          }]
        })
      },

      // SCSS
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                url: false
              }
            }
          ]
        })
      },

      // Images
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ],
      },

      // Fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        ],
      },

      // Pug
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: { pretty: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `src/template/index.pug`
    }),
    
    
   
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      {
        from: './src/img',
        to: './img'
      }
    ]),
 
  ]
};


 
module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    
  }

  return config;
};