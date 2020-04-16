// // Webpack uses this to work with directories
// const path = require('path');

// // This is main configuration object.
// // Here you write different options and tell Webpack what to do
// module.exports = {

//   // Path to your entry point. From this file Webpack will begin his work
//   entry: './src/creationView/index.ts',

//   // Path and filename of your result bundle.
//   // Webpack will bundle all JavaScript into this file
//   output: {
//     path: path.resolve(__dirname, 'output'),
//     filename: 'creation.js'
//   },

//   // Default mode for Webpack is production.
//   // Depending on mode Webpack will apply different things
//   // on final bundle. For now we don't need production's JavaScript 
//   // minifying and other thing so let's set mode to development
//   mode: 'development'
// };

var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  // entry: './src/creationView/creation.ts',
  entry: {
        "CreateView": "./src/creationView/creation.ts",
        "responseView": "./src/responseView/response.ts",
        "DetailView": "./src/resultView/result.ts",
    },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        use: [
            {
            loader: 'file-loader',
            options: {
                name:'[name].[ext]'
            }
          }
        ] 
      }

    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
   // output: {
   //          path: path.resolve(__dirname, `../../KasWeb/wwwroot/ActionPackages/${props.packageId}/`),
   //          filename: "[name].[contenthash].js"
   //      },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'output'),
  },
   plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: './',
      },
      {
        from: 'appManifest.json',
        to: './',
      },
      ]),
   ],
   mode: 'development'
  // mode: 'production'//does the minification
};