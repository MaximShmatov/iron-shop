import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as webpackNodeExternals from 'webpack-node-externals';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as cluster from 'cluster';
import {Configuration , webpack} from 'webpack';
// import {fs as memfs} from 'memfs';
import {resolve} from 'path';

const confCommon: Configuration = {
  mode: 'development',
  context: resolve('src'),
}

const confServer: Configuration = {
  ...confCommon,
  entry: './main.ts',
  output: {
    path: resolve('build'),
    filename: 'server.js',
  },
  experiments: {
    outputModule: true,
  },
  target: 'node',
  externals: [
    webpackNodeExternals(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    enforceExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      }
    ],
  },
}

const confClient: Configuration = {
  ...confCommon,
  entry: {
    react: ['react', 'react-dom'],
    index: {
      import: './client/pages/index.tsx',
      dependOn: 'react',
    },
  },
  output: {
    path: resolve('build', 'public'),
    filename: 'js/[name].js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/templates/index.html',
      filename: 'index.html',
      chunks: ['index', 'react'],
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: resolve('static')},
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            target: 'ESNext',
            jsx: 'react',
            module: 'ESNext'
          }
        },
      }
    ],
  },
}

cluster.setupMaster({exec: './build/server.js'});
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
  cluster.disconnect(() => {cluster.fork()});
  console.log(process.env.NODE_ENV)
});
