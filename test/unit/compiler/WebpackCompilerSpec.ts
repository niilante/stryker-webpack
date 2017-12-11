import WebpackCompiler from '../../../src/compiler/WebpackCompiler';
import { expect } from 'chai';

describe('WebpackCompiler', () => {
  let webpackCompiler: WebpackCompiler;
  
  beforeEach(() => {
    const webpackConfiguration: any = {};

    webpackCompiler = new WebpackCompiler(webpackConfiguration);
  });

  it('should throw a not implemented error when calling the replace funtion', () => {
    expect(() => webpackCompiler.replace([])).to.throw(Error, 'Method not implemented');
  });

  it('should throw a not implemented error when calling the emit funtion', () => {
    expect(() => webpackCompiler.emit()).to.throw(Error, 'Method not implemented');
  });
});