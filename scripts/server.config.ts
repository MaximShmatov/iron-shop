import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import * as webpackNodeExternals from 'webpack-node-externals';
import {resolve} from 'path';
import {commonConfig} from './common.config';


export function getConfig(mode: string) {
  const isDevMode = (mode === 'development');
  return {
    ...commonConfig,
    mode,
    entry: {
      server: [
        isDevMode && 'webpack/hot/poll?100',
        resolve(isDevMode ? 'scripts/devServer.ts' : 'src/server.ts'),
      ].filter(Boolean),
    },
    output: {
      path: resolve('build'),
      filename: '[name].js',
    },
    target: 'node',
    externalsPresets: {node: true},
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.ts|\.tsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            },
          }]
        },
        {
          test: /\.module\.sass$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportOnlyLocals: true,
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.sass$/,
          exclude: /\.module\.sass$/,
          use: [
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
    externals: [
      webpackNodeExternals(isDevMode ? {allowlist: ['webpack/hot/poll?100']} : {}),
    ],
    plugins: [
      isDevMode && new HotModuleReplacementPlugin(),
    ].filter(Boolean),
  } as Configuration;
}

