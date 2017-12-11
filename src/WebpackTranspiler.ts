import { TranspilerOptions, Transpiler, TranspileResult, FileLocation } from 'stryker-api/transpile';
import { File } from 'stryker-api/core';
import PresetLoader from './presetLoader/PresetLoader';
import WebpackCompiler from './compiler/WebpackCompiler';
import WebpackPreset from './presetLoader/WebpackPreset';
import { TextFile } from 'stryker-api/src/core/File';

class WebpackTranspiler implements Transpiler {
  private project: string;
  private presetLoader: PresetLoader;
  private webpackCompiler: WebpackCompiler;

  public constructor(options: TranspilerOptions) {
    this.project = options.config.project || 'default';
    this.presetLoader = new PresetLoader;
  }

  public async transpile(files: Array<File>): Promise<TranspileResult> {
    if (!this.webpackCompiler) {
      this.initializeCompiler();
    }

    try {
      await this.webpackCompiler.replace(files as Array<TextFile>);

      return this.createSuccessResult(await this.webpackCompiler.emit());
    } catch (err) {
      return this.createErrorResult(`${err.name}: ${err.message}`);
    }
  }

  private initializeCompiler() {
    const preset: WebpackPreset = this.presetLoader.loadPreset(this.project.toLowerCase());

    // Initialize the webpack compiler with the preset configuration
    this.webpackCompiler = new WebpackCompiler(preset.getWebpackConfig());

    // Push the init files to the file system with the replace function
    this.webpackCompiler.replace(preset.getInitFiles());
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