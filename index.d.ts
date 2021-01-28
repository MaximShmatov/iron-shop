import {IFs} from 'memfs';

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      FS?: IFs;
    }
  }
}
 export {};