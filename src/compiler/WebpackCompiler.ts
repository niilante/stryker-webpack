import { Configuration } from "webpack";
import { File } from 'stryker-api/src/core/File';

export default class WebpackCompiler {
  constructor(webpackConfiguration: Configuration) {

  }

  public replace(files: Array<File>): void {
    throw new Error('Method not implemented');
  }

  public emit(): Array<File> {
    throw new Error('Method not implemented');
  }
}