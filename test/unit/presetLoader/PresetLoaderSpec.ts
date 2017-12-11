import PresetLoader from '../../../src/presetLoader/PresetLoader';
import * as sinon from 'sinon';
import { expect } from 'chai';
import WebpackPreset from '../../../src/presetLoader/WebpackPreset';

describe('PresetLoader', () => {
  let presetLoader: PresetLoader;
  let sandbox: sinon.SinonSandbox;
  let requireStub: sinon.SinonStub;

  let loader: any = {
    require: () => {}
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    requireStub = sandbox.stub(loader, 'require').callsFake(fakeRequire);

    presetLoader = new PresetLoader(loader.require);
  });

  beforeEach(() => sandbox.restore());

  it('should return a WebpackPreset when it exists', () => {
    const webpackPreset: WebpackPreset = presetLoader.loadPreset('angular');

    expect(webpackPreset).to.have.property('getWebpackConfig');
    expect(webpackPreset).to.have.property('getInitFiles');    
  });

  it('should return an error when \'getInitFiles\' is not present on the required module', () => {
    requireStub.returns({ getWebpackConfig: () => {}});

    expect(() => presetLoader.loadPreset('angular')).to.throw(Error, `Cannot find property 'getInitFiles' on 'stryker-webpack-angular-preset'`);
  });

  it('should return an error when \'getWebpackConfig\' is not present on the required module', () => {
    requireStub.returns({ getInitFiles: () => {}});

    expect(() => presetLoader.loadPreset('angular')).to.throw(Error, `Cannot find property 'getWebpackConfig' on 'stryker-webpack-angular-preset'`);
  });

  it('should throw a warning when no preset was found', () => {
    const id = 'invalid';

    expect(() => presetLoader.loadPreset(id)).to.throw(Error, `Cannot find Stryker Webpack preset for '${id}', try to run npm i stryker-webpack-${id}-preset to install it`);
  });
});

function fakeRequire(id: string): any {
  if(id === 'stryker-webpack-invalid-preset') {
    throw new Error(`Cannot find module '${id}'`);
  }

  return {
    getWebpackConfig: () => {},
    getInitFiles: () => {}
  };
}