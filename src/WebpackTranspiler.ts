import { TranspilerOptions, Transpiler, TranspileResult, FileLocation } from 'stryker-api/transpile';
import { File } from 'stryker-api/core';
// import { Config } from 'stryker-api/config';
import PresetLoader from './presetLoader/PresetLoader';
// import WebpackCompiler from './compiler/WebpackCompiler';
// import WebpackPreset from './presetLoader/WebpackPreset';

class WebpackTranspiler implements Transpiler {
  private project: string;
  private presetLoader: PresetLoader;
  private initialized: boolean;
  // private webpackCompiler: WebpackCompiler;

  public constructor(options: TranspilerOptions) {
    this.project = options.config.project || 'default';
    this.presetLoader = new PresetLoader;
    this.initialized = false;
  }

  public transpile(files: Array<File>): Promise<TranspileResult> {
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }

    return Promise.resolve({
      error: null,
      outputFiles: []
    });
  }

  private initialize() {
    this.presetLoader.loadPreset(this.project.toLowerCase());
  }

  public getMappedLocation(sourceFileLocation: FileLocation): FileLocation {
    // Waiting for a decision on how this is going to be implemented in the future
    // Return a 'Method nog implemented' error for now.
    throw new Error('Method not implemented.');
  }
}

export default WebpackTranspiler;