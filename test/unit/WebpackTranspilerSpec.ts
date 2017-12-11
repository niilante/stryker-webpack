import WebpackTranspiler from '../../src/WebpackTranspiler';
import PresetLoader, * as presetLoader from '../../src/presetLoader/PresetLoader';
import WebpackCompiler, * as webpackCompiler from '../../src/compiler/WebpackCompiler';
import { createTextFile } from '../helpers/producers';
import * as sinon from 'sinon';
import { Config } from 'stryker-api/config';
import { Position, TextFile } from 'stryker-api/core';
import { expect, assert } from 'chai';

describe('WebpackTranspiler', () => {
  let webpackTranspiler: WebpackTranspiler;
  let sandbox: sinon.SinonSandbox;

  // Stubs
  let presetLoaderStub: { loadPreset: sinon.SinonStub }
  let webpackCompilerStub: WebpackCompilerStub;

  // Example files
  let exampleInitFile: TextFile = createTextFile('exampleInitFile');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    webpackCompilerStub = sinon.createStubInstance(WebpackCompiler);
    presetLoaderStub = sinon.createStubInstance(PresetLoader);
    presetLoaderStub.loadPreset.returns({
      getWebpackConfig: () => {},
      getInitFiles: () => [exampleInitFile]
    });

    sandbox.stub(presetLoader, 'default').returns(presetLoaderStub);
    sandbox.stub(webpackCompiler, 'default').returns(webpackCompilerStub);

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

  it('should call the webpackCompiler.replace method with the output of the webpackPreset.getFiles method', async () => {
    await webpackTranspiler.transpile([]);

    assert(webpackCompilerStub.replace.calledWith([exampleInitFile]), 'Not alled with exampleInitFile');
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

interface WebpackCompilerStub {
  replace: sinon.SinonStub;
  emit(): sinon.SinonStub;
}