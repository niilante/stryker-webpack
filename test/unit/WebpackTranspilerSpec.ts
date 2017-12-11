import WebpackTranspiler from '../../src/WebpackTranspiler';
import PresetLoader, * as presetLoader from '../../src/presetLoader/PresetLoader';
import * as sinon from 'sinon';
import { Config } from 'stryker-api/config';
import { Position } from 'stryker-api/core';
import { expect, assert } from 'chai';

describe('WebpackTranspiler', () => {
  let webpackTranspiler: WebpackTranspiler;
  let sandbox: sinon.SinonSandbox;

  // Stubs
  let presetLoaderStub: { loadPreset: sinon.SinonStub }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    presetLoaderStub = sinon.createStubInstance(PresetLoader);
    sandbox.stub(presetLoader, 'default').returns(presetLoaderStub);

    const config: Config = new Config;
    config.set({ project: 'Angular' });

    webpackTranspiler = new WebpackTranspiler({ config, keepSourceMaps: false });
  });

  afterEach(() => sandbox.restore());

  it('should call the presetloader with the configured project when the transpile method is called initially', async () => {
    await webpackTranspiler.transpile([]);
    await webpackTranspiler.transpile([]);

    assert(presetLoaderStub.loadPreset.called, 'loadPreset not called');
    assert(presetLoaderStub.loadPreset.calledOnce, 'loadPreset called more than once');
    assert(presetLoaderStub.loadPreset.calledWith('angular'), `loadPreset not called with 'angular'`);
  });

  it('should use \'default\' as preset when none is provided', async () => {
    const webpackTranspiler = new WebpackTranspiler({ config: new Config, keepSourceMaps: false });

    await webpackTranspiler.transpile([]);

    assert(presetLoaderStub.loadPreset.calledWith('default'), `loadPreset not called with 'default'`);
  });

  it('should throw a not implemented error when calling the getMappedLocation method', () => {
    const position: Position = {
      line: 0,
      column: 0
    };

    const fileLocation: { fileName: string, start: Position, end: Position } = {
      fileName: "test",
      start: position,
      end: position
    }

    expect(webpackTranspiler.getMappedLocation.bind(this, fileLocation)).to.throw(Error, 'Method not implemented.');
  });
});