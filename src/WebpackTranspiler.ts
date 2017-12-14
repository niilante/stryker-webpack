import { TranspilerOptions, Transpiler, TranspileResult, FileLocation } from 'stryker-api/transpile';
import { Config } from 'stryker-api/config';
import { File } from 'stryker-api/core';
import PresetLoader from './presetLoader/PresetLoader';
import WebpackCompiler from './compiler/WebpackCompiler';
import WebpackPreset from './presetLoader/WebpackPreset';
import { TextFile } from 'stryker-api/src/core/File';

class WebpackTranspiler implements Transpiler {
  private config: Config;
  private presetLoader: PresetLoader;
  private webpackCompiler: WebpackCompiler;

  public constructor(options: TranspilerOptions) {
    this.config = options.config;
    this.presetLoader = new PresetLoader;
  }

  public async transpile(files: Array<File>): Promise<TranspileResult> {
    try {
      if (!this.webpackCompiler) {
        const projectRoot = this.config.projectRoot;

        await this.initialize(projectRoot);
      }

      await this.webpackCompiler.writeFilesToFs(files as Array<TextFile>);

      return this.createSuccessResult(await this.webpackCompiler.emit());
    } catch (err) {
      return this.createErrorResult(`${err.name}: ${err.message}`);
    }
  }

  private async initialize(projectRoot: string): Promise<void> {
    if (projectRoot) {
      await this.initializeCompiler(projectRoot);
    } else {
      throw new Error('No baseDir defined, please define baseDir in your stryker.conf.js');
    }
  }

  private async initializeCompiler(projectRoot: string): Promise<void> {
    let project = this.config.projectPreset || 'default';

    const preset: WebpackPreset = this.presetLoader.loadPreset(project.toLowerCase());

    this.webpackCompiler = new WebpackCompiler(preset.getWebpackConfig(projectRoot));

    // Push the init files to the file system with the replace function
    await this.webpackCompiler.writeFilesToFs(preset.getInitFiles(projectRoot));
  }

  private createErrorResult(error: string): TranspileResult {
    return {
      error,
      outputFiles: []
    };
  }

  private createSuccessResult(outPutFiles: File[]): TranspileResult {
    return {
      error: null,
      outputFiles: outPutFiles
    };
  }

  public getMappedLocation(sourceFileLocation: FileLocation): FileLocation {
    // Waiting for a decision on how this is going to be implemented in the future
    // Return a 'Method nog implemented' error for now.
    throw new Error('Method not implemented.');
  }
}

export default WebpackTranspiler;