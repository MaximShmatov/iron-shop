import {HotModuleReplacementPlugin, Stats, webpack} from 'webpack';
import {resolve} from 'path';
import * as webpackNodeExternals from 'webpack-node-externals';
import * as cluster from 'cluster';


const compilerServer = webpack({
  mode: 'development',
  context: resolve('src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false,
  },
  entry: {
    server: ['webpack/hot/poll?100', './server.ts'],
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
  externals: [webpackNodeExternals({
    allowlist: ['webpack/hot/poll?100'],
  })],
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});

function printStats(err?: Error, stats?: Stats) {
  if (err) {
    console.error(err.stack || err);
    return;
  }
  if (stats?.hasErrors()) {
    console.error(stats.toJson().errors);
    return;
  }
  if (stats?.hasWarnings()) console.warn(stats.toJson().warnings);
  else console.log(stats?.toString({colors: true}));
}

let serverEmitted = false;
compilerServer.hooks.done.tap('RUN_SERVER', () => {
  if (!serverEmitted) {
    serverEmitted = true;
    cluster.setupMaster({exec: 'build/server.js'});
    cluster.fork();
  }
});

compilerServer.watch({poll: 1000}, printStats);