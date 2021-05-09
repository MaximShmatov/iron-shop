import {webpack} from 'webpack';
import * as cluster from 'cluster';
import {getConfig} from './server.config';
import {printStats} from './common.config';


process.env.NODE_ENV = 'development';

const compiler = webpack(getConfig(process.env.NODE_ENV));

let serverEmitted = false;
compiler.hooks.done.tap('RUN_SERVER', () => {
  if (!serverEmitted) {
    serverEmitted = true;
    cluster.setupMaster({exec: 'build/server.js'});
    cluster.fork();
  }
});

compiler.watch({}, printStats);