import {webpack} from 'webpack';
import {getConfig as getServerConfig} from './server.config';
import {getConfig as getClientConfig} from './client.config';
import {printStats} from './common.config';


process.env.NODE_ENV = 'production';

const serverConfig = getServerConfig(process.env.NODE_ENV);
const clientConfig = getClientConfig(process.env.NODE_ENV);

const compiler = webpack([serverConfig, clientConfig]);

compiler.run(printStats);
