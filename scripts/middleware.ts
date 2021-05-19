import {webpack} from 'webpack';
import {getConfig} from './client.config';

const compiler = webpack(getConfig('development'));

export const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {writeToDisk: true}); // {writeToDisk: true}
export const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);