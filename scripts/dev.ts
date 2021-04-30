import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as webpackNodeExternals from 'webpack-node-externals';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as cluster from 'cluster';
import * as fs from 'fs';
import {fs as memFS} from 'memfs';
import {resolve} from 'path';
import {
  webpack,
  Stats,
  Configuration,
  // @ts-ignore
  OutputFileSystem,
  HotModuleReplacementPlugin
} from 'webpack';
import {NestApplication} from '@nestjs/core';

const isDevelopment = true;

const confCommon: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  context: resolve('src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    enforceExtension: false,
  },
};

function getServerConfig({path, name}: {path: string, name: string}) {
  return {
    ...confCommon,
    entry: {
      [name]: ['webpack/hot/poll?100', path],
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
      rules: [{
        test: /\.ts|\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {transpileOnly: true},
        }]
      }, {
        test: /\.module\.sass$/,
        use: [
          // MiniCssExtractPlugin.loader,
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
      },],
    },
    externals: [webpackNodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    })],
    plugins: [new HotModuleReplacementPlugin()],
  };
}

function getClientConfig(page: string) {
  const lib = isDevelopment ? 'development' : 'production.min'
  return {
    ...confCommon,
    entry: {
      index: {
        import: isDevelopment
          ? ['webpack-hot-middleware/client', './client/indexClient.tsx']
          : './client/indexClient.tsx',
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
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                target: 'ES5',
                react: 'react-jsxdev',
                module: 'ESNext',
              },
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
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
          {
            from: resolve(`node_modules/react/umd/react.${lib}.js`),
            to: 'js/react.js',
          },
          {
            from: resolve(`node_modules/react-dom/umd/react-dom.${lib}.js`),
            to: 'js/react-dom.js',
          },
        ]
      }),
      new HTMLWebpackPlugin({
        templateContent: page,
        filename: 'index.html',
        chunks: ['index'],
        inject: 'body',
      }),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new MiniCssExtractPlugin({filename: 'css/[name].css'}),
    ],
  };
}

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

let server: NestApplication;

function start(pages: string) {
  const compilerServer = webpack(getServerConfig({path: './server.ts', name: 'server'}));
  const compilerClient = webpack(getClientConfig(pages));
  const webpackDevMiddleware = isDevelopment && require('webpack-dev-middleware')(compilerClient, {writeToDisk: true});
  const webpackHotMiddleware = isDevelopment && require('webpack-hot-middleware')(compilerClient);

  compilerServer.hooks.beforeCompile.tap('SERVER', () => {
    if (!!server) server.close();
  });

  compilerServer.hooks.done.tap('SERVER', (stats: Stats) => {
    const hasError = stats?.hasErrors();
    if (isDevelopment && !hasError) {
      eval(memFS.readFileSync('build/server.js', 'utf-8') as string).default
        .then((app: NestApplication) => {
          app.use(webpackDevMiddleware);
          app.use(webpackHotMiddleware);
          app.getHttpServer().keepAliveTimeout = 1;
          app.listen(3000, () => {
            console.log('Server listen port: 3000');
          });
          server = app;
        });
    } else {
      cluster.setupMaster({exec: 'build/server.js'});
      cluster.fork();
    }
  });

  // compilerClient.hooks.done.tap('PAGES', () => {
  //   console.log('asdsadasdasd')
  // });

  if (isDevelopment) {
    compilerServer.outputFileSystem = memFS as OutputFileSystem;

    // module.require = new Proxy(module.require, {
    //   apply(target, thisArg, argumentsList) {
    //     if (argumentsList[0] === 'fs') {
    //       return memFS;
    //     }
    //     return Reflect.apply(target, thisArg, argumentsList);
    //   }
    // });
  }

  compilerServer.watch({poll: 1000}, printStats);
}

const compilerPages = webpack(getServerConfig({path: './client/indexServer.tsx', name: 'pages'}));
compilerPages.outputFileSystem = memFS as OutputFileSystem;
compilerPages.run(printStats);
compilerPages.hooks.done.tap('PAGES', () => {
  const pages = eval(memFS.readFileSync('build/pages.js', 'utf-8') as string).default;
  start(pages);
});


