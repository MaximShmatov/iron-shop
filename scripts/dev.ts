import {Configuration , webpack} from 'webpack';
import {fs as memfs} from 'memfs';
import {resolve} from 'path';
import * as HTMLWebpackPlugin from 'html-webpack-plugin'


const confCommon: Configuration = {
  mode: 'development',
  context: resolve('src'),
}

const confServer = {
  ...confCommon,
  entry: './main.ts',
  output: {
    path: resolve('build'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      }
    ],
  },
}

const confClient = {
  ...confCommon,
  entry: {
    index: {
      import: './client/pages/index.tsx',
    },
  },
  output: {
    path: resolve('build', 'public'),
    filename: '[name].js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            target: 'ES5',
            jsx: 'react',
            module: 'ESNext'
          }
        },
      }
    ],
  },
}

const compiler = webpack([confServer, confClient]);
compiler.watch({aggregateTimeout: 1000}, (err, stats) => {
  if (stats) {
    if (err) {
      console.error(err.stack || err);
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) console.error(info.errors);
    else if (stats.hasWarnings()) console.warn(info.warnings);
    else console.log(stats.toString({colors: true}))
  }
});