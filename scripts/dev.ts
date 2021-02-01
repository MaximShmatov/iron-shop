import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as webpackNodeExternals from 'webpack-node-externals';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as webpack from 'webpack';
import * as cluster from 'cluster';
import template from '../src/client/templates/Main';
import {fs as memfs} from 'memfs';
import {resolve} from 'path';

const confCommon: webpack.Configuration = {
  mode: 'development',
  context: resolve('src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    enforceExtension: false,
  },
}

const confServer: webpack.Configuration = {
  ...confCommon,
  entry:  './main.ts',
  output: {
    path: resolve('build'),
    filename: 'server.js',
  },
  target: 'node',
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {transpileOnly: true}
          }
        ]

      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

const confClient: webpack.Configuration = {
  ...confCommon,
  entry: {
    react: ['react', 'react-dom'],
    index: {
      import: './client/templates/MainHydrate.tsx',
      dependOn: 'react',
    },
  },
  output: {
    path: resolve('build', 'public'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // {
          //   loader: resolve('scripts', 'reactRender.tsx'),
          //   options: {
          //     exclude: ['react'],
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                target: 'ESNext',
                jsx: 'react',
                module: 'ESNext',
              }
            },
          }
        ],
      }
    ],
  },
}

if (confCommon.mode === 'development') {
  module.require = new Proxy(module.require, {
    apply(target, thisArg, argumentsList) {
      if (argumentsList[0] === 'fs'){
        return memfs;
      }
      return Reflect.apply(target, thisArg, argumentsList);
    }
  });
}

async function run() {
  const tpl = await template('Index.tsx');
  confServer.externals = (confServer.mode === 'development') ? [] : webpackNodeExternals();
  confClient.plugins = [
    new HTMLWebpackPlugin({
      templateContent: tpl,
      filename: 'index.html',
      chunks: ['react', 'index'],
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: resolve('static')},
      ]
    }),
  ];

  const compiler = webpack.webpack([confServer, confClient]);
  // @ts-ignore
  if (confCommon.mode === 'development') compiler.outputFileSystem = memfs;
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
    process.emit('disconnect');
    if (confCommon.mode === 'development') {
      eval(memfs.readFileSync('build/server.js', 'utf-8') as string);
    } else {
      cluster.setupMaster({exec: 'build/server.js'});
      cluster.fork();
    }
  });
}

run();


