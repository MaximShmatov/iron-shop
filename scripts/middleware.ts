import {HotModuleReplacementPlugin, webpack} from 'webpack';
import {resolve} from 'path';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const compilerClient = webpack({
  mode: 'development',
  context: resolve('src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false,
  },
  entry: {
    index: {
      import: ['webpack-hot-middleware/client', './client/index.tsx']
    },
  },
  output: {
    path: resolve('build', 'public'),
    filename: 'js/[name].js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [ReactRefreshTypeScript()],
            }),
            transpileOnly: true,
            compilerOptions: {
              target: 'ES5',
              react: 'react-jsxdev',
              module: 'ESNext',
            },
          },
        }],
      },
      {
        test: /\.module\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        exclude: /\.module\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: resolve('static')},
        {from: '**/img/*', to: 'img/[name].[ext]'},
        {
          from: resolve(`node_modules/react/umd/react.development.js`),
          to: 'js/react.js',
        },
        {
          from: resolve(`node_modules/react-dom/umd/react-dom.development.js`),
          to: 'js/react-dom.js',
        },
      ]
    }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({forceEnable: true}),
    new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    // new HtmlWebpackPlugin({
    //   template: resolve('src/client/templates/index.html'),
    //   filename: 'index.html',
    //   chunks: ['index'],
    //   inject: 'body',
    // }),
  ],
});

export const webpackDevMiddleware = require('webpack-dev-middleware')(compilerClient); // {writeToDisk: true}
export const webpackHotMiddleware = require('webpack-hot-middleware')(compilerClient);