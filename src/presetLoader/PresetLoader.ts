import WebpackPreset from './WebpackPreset';
import DefaultPreset from './DefaultPreset';

export default class PresetLoader {
  private loader: NodeRequire;

  constructor(loader?: NodeRequire) {
    // Default to require when none is provided in the constructor, used in test scenarios
    this.loader = loader || /* istanbul ignore next */ require;
  }

  public loadPreset(id: string): WebpackPreset {
    const preset = (id === 'default') ? new DefaultPreset() : this.requirePreset(`stryker-webpack-${id}-preset`);

    try {
      this.checkInterfaceFunctions(preset);
    } catch (err) {
      throw new Error(err.message.replace('<presetId>', `stryker-webpack-${id}-preset`));
    }

    return preset;
  }

  private requirePreset(id: string): WebpackPreset {
    try {
      const constructor = this.loader(id);

      return new constructor
    } catch {
      throw new Error(`Cannot find Stryker Webpack preset '${id}', try to run npm i ${id} to install it`);
    }
  }

  private checkInterfaceFunctions(preset: WebpackPreset): void {
    if (!preset.getInitFiles) {
      throw new Error(`Cannot find property 'getInitFiles' on '<presetId>'`);
    }

    if (!preset.getWebpackConfig) {
      throw new Error(`Cannot find property 'getWebpackConfig' on '<presetId>'`);
    }
  }
}