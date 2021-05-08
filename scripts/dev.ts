// import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import ReactRefreshTypeScript from 'react-refresh-typescript';
// import * as HTMLWebpackPlugin from 'html-webpack-plugin';
// import * as webpackNodeExternals from 'webpack-node-externals';
// import * as CopyWebpackPlugin from 'copy-webpack-plugin';
// import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import * as cluster from 'cluster';
// import * as fs from 'fs';
// import {fs as memFS} from 'memfs';
// import {resolve} from 'path';
// import {
//   webpack,
//   Stats,
//   Configuration,
//   // @ts-ignore
//   OutputFileSystem,
//   HotModuleReplacementPlugin
// } from 'webpack';
// import {NestApplication} from '@nestjs/core';
//
// const isDevelopment = true;
//
// const confCommon: Configuration = {
//   mode: isDevelopment ? 'development' : 'production',
//   context: resolve('src'),
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//     enforceExtension: false,
//   },
// };
//
// function getServerConfig({path, name, output}: { path: string, name: string, output: string }) {
//   return {
//     ...confCommon,
//     entry: {
//       [name]: ['webpack/hot/poll?100', path],
//       signin: ['webpack/hot/poll?100', './client/indexServer.tsx'],
//     },
//     output: {
//       path: resolve('build'),
//       filename: output,
//     },
//     target: 'node',
//     externalsPresets: {node: true},
//     experiments: {
//       outputModule: true,
//     },
//     module: {
//       rules: [
//         {
//           test: /\.ts|\.tsx?$/,
//           exclude: /node_modules/,
//           use: [{
//             loader: 'ts-loader',
//             options: {transpileOnly: true},
//           }]
//         },
//         {
//           test: /\.module\.sass$/,
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: {
//                   exportOnlyLocals: true,
//                 },
//               },
//             },
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.sass$/,
//           exclude: /\.module\.sass$/,
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: false,
//               },
//             },
//             'sass-loader',
//           ],
//         },
//       ],
//     },
//     externals: [webpackNodeExternals({
//       allowlist: ['webpack/hot/poll?100'],
//     })],
//     plugins: [new HotModuleReplacementPlugin()],
//   };
// }
//
// function getClientConfig() {
//   const lib = isDevelopment ? 'development' : 'production.min';
//   return {
//     ...confCommon,
//     entry: {
//       index: {
//         import: ['webpack-hot-middleware/client', './client/index.tsx']
//       },
//     },
//     output: {
//       path: resolve('build', 'public'),
//       filename: 'js/[name].js',
//     },
//     externals: {
//       'react': 'React',
//       'react-dom': 'ReactDOM',
//     },
//     module: {
//       rules: [
//         {
//           test: /\.tsx?$/,
//           exclude: /node_modules/,
//           use: [{
//             loader: 'ts-loader',
//             options: {
//               transpileOnly: true,
//               compilerOptions: {
//                 target: 'ES5',
//                 react: 'react-jsxdev',
//                 module: 'ESNext',
//               },
//               getCustomTransformers: () => ({
//                 before: [ReactRefreshTypeScript()],
//               }),
//             },
//           }],
//         },
//         {
//           test: /\.module\.sass$/,
//           use: [
//             MiniCssExtractPlugin.loader,
//             'css-loader',
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.sass$/,
//           exclude: /\.module\.sass$/,
//           use: [
//             MiniCssExtractPlugin.loader,
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: false,
//               },
//             },
//             'sass-loader',
//           ],
//         },
//       ],
//     },
//     plugins: [
//       new CopyWebpackPlugin({
//         patterns: [
//           {from: resolve('static')},
//           {
//             from: resolve(`node_modules/react/umd/react.${lib}.js`),
//             to: 'js/react.js',
//           },
//           {
//             from: resolve(`node_modules/react-dom/umd/react-dom.${lib}.js`),
//             to: 'js/react-dom.js',
//           },
//         ]
//       }),
//       new HotModuleReplacementPlugin(),
//       new ReactRefreshWebpackPlugin(),
//       new MiniCssExtractPlugin({filename: 'css/[name].css'}),
//       // new HTMLWebpackPlugin({
//       //   templateContent: '',
//       //   filename: 'index.html',
//       //   chunks: ['index'],
//       //   inject: 'body',
//       // }),
//     ],
//   };
// }
//
// function printStats(err?: Error, stats?: Stats) {
//   if (err) {
//     console.error(err.stack || err);
//     return;
//   }
//   if (stats?.hasErrors()) {
//     console.error(stats.toJson().errors);
//     return;
//   }
//   if (stats?.hasWarnings()) console.warn(stats.toJson().warnings);
//   else console.log(stats?.toString({colors: true}));
// }
//
// let server: NestApplication;
// const clientConfig = getClientConfig();
// const configPages = getServerConfig({path: './client/indexServer.tsx', name: 'index', output: 'public/[name].html'});
//
//
// function start() {
//   const compilerServer = webpack(getServerConfig({path: './server.ts', name: 'server', output: '[name].js'}));
//   const compilerClient = webpack([configPages, clientConfig]);
//   const webpackDevMiddleware = require('webpack-dev-middleware')(compilerClient, {writeToDisk: true});
//   const webpackHotMiddleware = require('webpack-hot-middleware')(compilerClient);
//
//   compilerClient.compilers[0].hooks.done.tap('PAGES', () => {
//     compilerClient.compilers[0].outputFileSystem.readFile('build/public/index.html', (err, file) => {
//       if (file) {
//         const index = eval(file.toString() as string).index;
//         compilerClient.compilers[0].outputFileSystem.writeFile('build/public/index.html', index, (err) => console.log(err));
//         const profile = eval(file.toString() as string).profile;
//         compilerClient.compilers[0].outputFileSystem.writeFile('build/public/profile.html', profile, (err) => console.log(err));
//         const signin = eval(file.toString() as string).signin;
//         compilerClient.compilers[0].outputFileSystem.writeFile('build/public/signin.html', signin, (err) => console.log(err));
//         console.log(index);
//         console.log(profile);
//         console.log(signin);
//       }
//
//       // console.log(pages);
//       // console.log(file?.toString());
//     })
//
//     console.log('asdsadsadsadasdsad111111111');
//   });
//
//   compilerClient.compilers[1].hooks.done.tap('CLIENT', () => {
//     console.log('asdsadsadsadasdsad222222222');
//   });
//
//   compilerServer.hooks.beforeCompile.tap('SERVER', () => {
//     if (!!server) server.close();
//   });
//
//   compilerServer.hooks.done.tap('SERVER', (stats: Stats) => {
//     const hasError = stats?.hasErrors();
//     if (isDevelopment && !hasError) {
//       eval(memFS.readFileSync('build/server.js', 'utf-8') as string).default
//         .then((app: NestApplication) => {
//           app.use(webpackDevMiddleware);
//           app.use(webpackHotMiddleware);
//           app.getHttpServer().keepAliveTimeout = 1;
//           app.listen(3000, () => {
//             console.log('Server listen port: 3000');
//           });
//           server = app;
//         });
//     } else {
//       cluster.setupMaster({exec: 'build/server.js'});
//       cluster.fork();
//     }
//   });
//
//   // compilerClient.hooks.done.tap('PAGES', () => {
//   //   console.log('asdsadasdasd')
//   // });
//
//   if (isDevelopment) {
//     compilerServer.outputFileSystem = memFS as OutputFileSystem;
//
//     // module.require = new Proxy(module.require, {
//     //   apply(target, thisArg, argumentsList) {
//     //     if (argumentsList[0] === 'fs') {
//     //       return memFS;
//     //     }
//     //     return Reflect.apply(target, thisArg, argumentsList);
//     //   }
//     // });
//   }
//
//   compilerServer.watch({poll: 1000}, printStats);
// }
//
// start();
//
