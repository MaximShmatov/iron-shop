import {webpack} from 'webpack';
import * as cluster from 'cluster';
import {getConfig} from './server.config';
import {printStats} from './common.config';


process.env.NODE_ENV = 'development';

const compiler = webpack(getConfig(process.env.NODE_ENV));

let serverEmitted = false;
cluster.setupMaster({exec: 'build/server.js'});

compiler.hooks.done.tap('RUN_SERVER', () => {
  if (!serverEmitted) {
    serverEmitted = true;
    cluster.fork()
      .on('exit', () => {
        serverEmitted = false;
      });
  }
});

compiler.watch({poll: 1000}, printStats);