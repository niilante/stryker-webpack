import WebpackCompiler from '../../../src/compiler/WebpackCompiler';
import { assert, expect } from 'chai';

describe('WebpackCompiler', () => {
  let webpackCompiler: WebpackCompiler;

  beforeEach(() => {
    const webpackConfiguration: any = {};

    webpackCompiler = new WebpackCompiler(webpackConfiguration);
  });

  it('should throw a not implemented error when calling the replace funtion', async () => {
    try {
      await webpackCompiler.replace([]);

      assert(false, 'method should throw an error');
    } catch (err) {
      expect(err.message).to.equal('Method not implemented');
    }
  });

  it('should throw a not implemented error when calling the emit funtion', async () => {
    try {
      await webpackCompiler.emit();

      assert(false, 'method should throw an error');
    } catch (err) {
      expect(err.message).to.equal('Method not implemented');
    }
  });
});