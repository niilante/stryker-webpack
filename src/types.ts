


export interface Stats {
  isFile: () => boolean;
  isDirectory: () => boolean;
  isBlockDevice: () => boolean;
  isCharacterDevice: () => boolean;
  isSymbolicLink: () => boolean;
  isFIFO: () => boolean;
  isSocket: () => boolean;
}

export interface WebpackFileSystem {
  existsSync(name: string): boolean;

  statSync(name: string): Stats;

  readFileSync(name: string, encoding?: string | object): any;

  readdirSync(name: string): string[];

  mkdirpSync(name: string): void;

  mkdirSync(name: string): void;

  rmdirSync(name: string): void;

  unlinkSync(name: string): void;

  readlinkSync(name: string): void;

  writeFileSync(name: string, content: string | Buffer, optionsOrEncoding?: string|object): void;

  createReadStream(
      name: string, options: {
          start: number;
          end: number;
      }
  ): any;

  createWriteStream(name: string, options: any): any;

  exists(name: string, callback: (isExist: boolean) => any): any;

  writeFile(name: string, content: string | Buffer, callback: (err?: Error) => any): any;

  writeFile(name: string, content: string | Buffer, encoding: string, callback: (err?: Error) => any): any;

  join(name: string, request: string): string;

  pathToArray(name: string): string[];

  normalize(name: string): string;

  stat(name: string, callback: (err?: Error, result?: Stats) => any): void;

  readdir(name: string, callback: (err?: Error, result?: string[]) => any): void;

  mkdirp(name: string, callback: (err?: Error, result?: any) => any): void;

  rmdir(name: string, callback: (err?: Error, result?: any) => any): void;

  unlink(name: string, callback: (err?: Error, result?: any) => any): void;

  readlink(name: string, callback: (err?: Error, result?: any) => any): void;

  mkdir(name: string, optArg: {}, callback: (err?: Error, result?: any) => any): void;

  readFile(name: string, optArg: {}, callback: (err?: Error, result?: any) => any): void;
}
