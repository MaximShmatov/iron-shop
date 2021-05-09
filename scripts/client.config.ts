import {Configuration, HotModuleReplacementPlugin, webpack} from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {resolve} from 'path';
import {commonConfig} from './common.config';


export function getConfig(mode: string) {
  const isDevMode = (mode === 'development');
  return {
    ...commonConfig,
    mode,
    entry: {
      index: {
        import: [
          isDevMode && 'webpack-hot-middleware/client',
          resolve('src/client/index.tsx'),
        ].filter(Boolean)
      },
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
          {
            from: resolve('static')
          },
          {
            from: '**/img/*',
            to: 'img/[name].[ext]'},
          {
            from: resolve(isDevMode
              ? 'node_modules/react/umd/react.development.js'
              : 'node_modules/react/umd/react.production.min.js'
            ),
            to: 'js/react.js',
          },
          {
            from: resolve(isDevMode
              ? 'node_modules/react-dom/umd/react-dom.development.js'
              : 'node_modules/react-dom/umd/react-dom.production.min.js'
            ),
            to: 'js/react-dom.js',
          },
        ]
      }),
      isDevMode && new HotModuleReplacementPlugin(),
      isDevMode && new ReactRefreshWebpackPlugin(),
      !isDevMode && new MiniCssExtractPlugin({filename: 'css/[name].css'}),
      // new HtmlWebpackPlugin({
      //   template: resolve('src/client/templates/index.html'),
      //   filename: 'index.html',
      //   chunks: ['index'],
      //   inject: 'body',
      // }),
    ].filter(Boolean),
  } as Configuration;
}
