import WebpackTranspiler from '../../src/WebpackTranspiler';
import { Config } from 'stryker-api/config';
import { Position } from 'stryker-api/core';
import { expect, assert } from 'chai';

describe('WebpackTranspiler', () => {
  let webpackTranspiler: WebpackTranspiler;
  
  beforeEach(() => {
    webpackTranspiler = new WebpackTranspiler({ config: new Config, keepSourceMaps: false })
  });

  it('should throw a not implemented error when calling the transpile method', async () => {
    try {
      await webpackTranspiler.transpile([]);
      
      assert(false, 'Transpile method should throw an error');
    } catch(err) {
      expect(err.message).to.equal('Method not implemented.');
    }
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