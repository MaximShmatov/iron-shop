import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {resolve} from 'path';
import {commonConfig} from './common.config';


export function getConfig(mode: string) {
  const isDevMode = (mode === 'development');
  const reactLib = isDevMode ? 'development' : 'production.min';

  return {
    ...commonConfig,
    mode,
    entry: {
      index: [
        isDevMode && 'webpack-hot-middleware/client',
        resolve('src/client/appClient.tsx'),
      ].filter(Boolean),
    },
    output: {
      path: resolve('build', 'public'),
      filename: 'js/[name].js',
      clean: true,
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
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
                before: [
                  isDevMode && ReactRefreshTypeScript()
                ].filter(Boolean),
              }),
              transpileOnly: true,
              compilerOptions: {
                target: 'ES5',
                react: isDevMode ? 'react-jsxdev' : 'react-jsx',
                module: 'ESNext',
              },
            },
          }],
        },
        {
          test: /\.module\.sass$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.sass$/,
          exclude: /\.module\.sass$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                modules: false,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   templateContent: '',
      //   filename: 'index.html',
      //   chunks: ['index'],
      //   inject: 'body',
      // }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve('static')
          },
          {
            from: '**/img/*',
            to: 'img/[name].[ext]'
          },
          {
            from: resolve(`node_modules/react/umd/react.${reactLib}.js`),
            to: 'js/react.js',
          },
          {
            from: resolve(`node_modules/react-dom/umd/react-dom.${reactLib}.js`),
            to: 'js/react-dom.js',
          },
        ]
      }),
      isDevMode && new HotModuleReplacementPlugin(),
      isDevMode && new ReactRefreshWebpackPlugin(),
      !isDevMode && new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    ].filter(Boolean),
  } as Configuration;
}
