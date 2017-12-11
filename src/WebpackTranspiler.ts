import { TranspilerOptions, Transpiler, TranspileResult, FileLocation } from 'stryker-api/transpile';
import { File } from 'stryker-api/core';
import PresetLoader from './presetLoader/PresetLoader';
import WebpackCompiler from './compiler/WebpackCompiler';
import WebpackPreset from './presetLoader/WebpackPreset';

class WebpackTranspiler implements Transpiler {
  private project: string;
  private presetLoader: PresetLoader;
  private webpackCompiler: WebpackCompiler;

  public constructor(options: TranspilerOptions) {
    this.project = options.config.project || 'default';
    this.presetLoader = new PresetLoader;
  }

  public transpile(files: Array<File>): Promise<TranspileResult> {
    if (!this.webpackCompiler) {
      this.initialize();
    }

    return Promise.resolve({
      error: null,
      outputFiles: []
    });
  }

  private initialize() {
    const preset: WebpackPreset = this.presetLoader.loadPreset(this.project.toLowerCase());

    // Initialize the webpack compiler with the preset configuration
    this.webpackCompiler = new WebpackCompiler(preset.getWebpackConfig());

    // Push the init files to the file system with the replace function
    this.webpackCompiler.replace(preset.getInitFiles());
  }

  public getMappedLocation(sourceFileLocation: FileLocation): FileLocation {
    // Waiting for a decision on how this is going to be implemented in the future
    // Return a 'Method nog implemented' error for now.
    throw new Error('Method not implemented.');
  }
}

export default WebpackTranspiler;