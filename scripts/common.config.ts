import {Stats, MultiStats} from 'webpack';
import {resolve} from 'path';

const commonConfig = {
  context: resolve('src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false,
  },
};

function printStats(err?: Error, stats?: Stats | MultiStats) {
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

export {commonConfig, printStats};