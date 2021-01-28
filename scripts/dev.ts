import {Configuration , webpack} from 'webpack';
import {fs as memfs} from 'memfs';
import {resolve} from 'path';


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
  entry: './client/pages/index.tsx',
  output: {
    path: resolve('build', 'public'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',

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