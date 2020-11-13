/**
 * Webpack common configuration.
 * it:
 * - Define the app entry point (./src) -> Where webpack will start compiling/bundling
 * - Define where assets will be served at by our webserver  (static/)
 * - Clean previous build on each build
 * - Generates the index.html file automatically by injecting bundled assets in it (css, js)
 * - Allow to load html files as strings in js code (i.e: import htmlString from './myHtmlFile.html)
 * - Allow to automatically generates the dependencies injection for angularJS components annotated with
 *   `'ngInject';` or `@ngInject` in comments. See https://docs.angularjs.org/guide/di
 */
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: {app: 'main.ts'},
  output: {
    // Path where bundled files will be output
    path: path.resolve(__dirname, 'static'),
    // Path at which output assets will be served
    publicPath: '',
  },
  // Just for build speed improvement
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: true,
    modules: [
      __dirname,
      path.resolve(path.join(__dirname, '..', 'node_modules')),
      path.resolve(
        path.join(
          __dirname,
          '..',
          'node_modules',
          'hslayers-ng',
          'node_modules'
        )
      ),
    ],
  },
  plugins: [
    // Clean before build
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // Path where the file will be generated (appended to output.path)
      filename: 'index.html',
      // index.html template file location
      template: 'src/index.html',
      // We manually inject css and js files in our template
      inject: false,
      // favicon: 'assets/img/favicon.ico'
    }),
  ],
  module: {
    rules: [
      //SCSS files
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: fs.existsSync('./hsl-custom.scss')
                ? `@use "hsl-custom.scss" as *;`
                : '',
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [{loader: 'ts-loader', options: {allowTsInNodeModules: true}}],
        exclude: /node_modules\/(?!(hslayers-ng)\/).*/,
      },
    ],
  },
};
