import { Configuration } from "webpack";
import { File } from 'stryker-api/src/core/File';

export default class WebpackCompiler {
  constructor(webpackConfiguration: Configuration) {

  }

  public async replace(files: Array<File>): Promise<void> {
    throw new Error('Method not implemented');
  }

  public async emit(): Promise<Array<File>> {
    throw new Error('Method not implemented');
  }
}