import WebpackPreset from './WebpackPreset';

export default class PresetLoader {
  private loader: NodeRequire;

  constructor(loader?: NodeRequire) {
    // Default to require when none is provided in the constructor, used in test scenarios
    this.loader = loader || /* istanbul ignore next */ require;
  }
  
  public loadPreset(id: string): WebpackPreset {
    const preset = this.requirePreset(id);

    try {
      this.checkInterfaceFunctions(preset);
    } catch (err) {
      throw new Error(err.message.replace('<presetId>', id));
    }

    return preset;
  }

  private requirePreset(id: string): WebpackPreset {
    try {
      return this.loader(`stryker-webpack-${id}-preset`);
    } catch {
      throw new Error(`Cannot find Stryker Webpack preset for '${id}', try to run npm i stryker-webpack-${id}-preset to install it`);
    }
  }

  private checkInterfaceFunctions(preset: WebpackPreset): void {
    if(!preset.getInitFiles) {
      throw new Error(`Cannot find property 'getInitFiles' on 'stryker-webpack-<presetId>-preset'`);
    }

    if(!preset.getWebpackConfig) {
      throw new Error(`Cannot find property 'getWebpackConfig' on 'stryker-webpack-<presetId>-preset'`);
    }
  }
}