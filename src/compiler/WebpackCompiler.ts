import { TextFile } from "stryker-api/core";
import FsWrapper from '../helpers/FsWrapper';
import HybridFs from '../helpers/HybridFs';
import { Compiler, Configuration } from "webpack";
import webpack from "./Webpack";
import * as path from "path";
import * as fs from 'fs';
import FSBucket from '../helpers/FSBucket';

const memoryFs = require('memory-fs');

export default class WebpackCompiler {
  private _compiler: Compiler;
  private _inputFs: FsWrapper;

  private _outputFs: FSBucket = new FSBucket();

  public constructor(webpackConfig: Configuration) {
    const filesystem = new HybridFs(fs, new memoryFs);
    this._inputFs = new FsWrapper(filesystem as any);
    this._compiler = this.createCompiler(webpackConfig, filesystem);
  }

  private createCompiler(webpackConfig: Configuration, fileSystem: HybridFs): Compiler {
    // Declare as any here to avoid errors when setting filesystem
    const compiler: any = webpack(webpackConfig);

    // Setting filesystem to provided fs so compilation can be done in memory
    compiler.inputFileSystem = fileSystem;
    compiler.outputFileSystem = this._outputFs;
    compiler.resolvers.normal.fileSystem = fileSystem;
    compiler.resolvers.context.fileSystem = fileSystem;

    return compiler as Compiler;
  }

  public async writeFilesToFs(files: Array<TextFile>): Promise<void> {
    for (let file of files) {
      await this.writeToFs(file);
    }
  }

  private async writeToFs(file: TextFile): Promise<void> {
    // Make sure the file has content, the filesystem does not like empty files
    file.content = file.content || ' ';

    // Create the directory
    await this._inputFs.mkdirp(path.dirname(file.name));

    // Write the file to the filesystem
    await this._inputFs.writeFile(file.name, file.content);
  }

  public async emit(): Promise<Array<TextFile>> {
    await this.compile();

    return await this.getOutputFiles();
  }

  private async getOutputFiles(): Promise<Array<TextFile>> {
    const outFiles = this._outputFs.files;
    this._outputFs.clear();
    
    return outFiles;
  }

  private compile(): Promise<webpack.Stats> {
    return new Promise<webpack.Stats>((resolve, reject) => {
      this._compiler.run((err, stats) => {
        if (err) {
          reject(err);
        } else if (stats.hasErrors()) {
          reject(Error(stats.toString("errors-only")));
        } else {
          resolve(stats);
        }
      });
    });
  }
}