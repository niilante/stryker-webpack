import { WebpackFileSystem, Stats } from '../types';
import * as path from 'path';
import { TextFile, FileKind } from 'stryker-api/core';

/**
 * Represents a write-only file system.
 */
export default class FSBucket implements WebpackFileSystem {
  private _files: TextFile[];

  constructor() {
    this.clear();
  }

  existsSync(name: string): boolean {
    throw new Error('Method not implemented.');
  }
  statSync(name: string): Stats {
    throw new Error('Method not implemented.');
  }
  readFileSync(name: string, encoding?: string | object | undefined) {
    throw new Error('Method not implemented.');
  }
  readdirSync(name: string): string[] {
    throw new Error('Method not implemented.');
  }
  mkdirpSync(name: string): void {
    throw new Error('Method not implemented.');
  }
  mkdirSync(name: string): void {
    throw new Error('Method not implemented.');
  }
  rmdirSync(name: string): void {
    throw new Error('Method not implemented.');
  }
  unlinkSync(name: string): void {
    throw new Error('Method not implemented.');
  }
  readlinkSync(name: string): void {
    throw new Error('Method not implemented.');
  }
  createReadStream(name: string, options: { start: number; end: number; }) {
    throw new Error('Method not implemented.');
  }
  createWriteStream(name: string, options: any) {
    throw new Error('Method not implemented.');
  }
  exists(name: string, callback: (isExist: boolean) => any) {
    throw new Error('Method not implemented.');
  }
  pathToArray(name: string): string[] {
    throw new Error('Method not implemented.');
  }
  normalize(name: string): string {
    throw new Error('Method not implemented.');
  }
  stat(name: string, callback: (err?: Error | undefined, result?: Stats | undefined) => any): void {
    throw new Error('Method not implemented.');
  }
  readdir(name: string, callback: (err?: Error | undefined, result?: string[] | undefined) => any): void {
    throw new Error('Method not implemented.');
  }
  rmdir(name: string, callback: (err?: Error | undefined, result?: any) => any): void {
    throw new Error('Method not implemented.');
  }
  unlink(name: string, callback: (err?: Error | undefined, result?: any) => any): void {
    throw new Error('Method not implemented.');
  }
  readlink(name: string, callback: (err?: Error | undefined, result?: any) => any): void {
    throw new Error('Method not implemented.');
  }
  mkdir(name: string, optArg: {}, callback: (err?: Error | undefined, result?: any) => any): void {
    throw new Error('Method not implemented.');
  }
  readFile(name: string, optArg: {}, callback: (err?: Error | undefined, result?: any) => any): void {
    throw new Error('Method not implemented.');
  }

  writeFile(name: string, content: string, optionsOrEncoding: string | object | { (err?: Error): any }, callback?: (err?: Error) => any) {
    this.writeFileSync(name, content);
    if (callback) {
      callback();
    } else if (typeof optionsOrEncoding === 'function') {
      optionsOrEncoding();
    }
  }

  writeFileSync(name: string, content: string | Buffer, optionsOrEncoding?: string | object | undefined): void {
    this._files.push({
      name,
      content: content.toString(),
      mutated: false,
      kind: FileKind.Text,
      transpiled: true,
      included: true
    });
  }

  mkdirp = (name: string, callback: Function) => callback();

  join(name: string, request: string): string {
    return path.join(name, request);
  }

  get files() {
    return this._files;
  }

  clear() {
    this._files = [];
  }
}

