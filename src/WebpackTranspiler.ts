import {TranspilerOptions, Transpiler, TranspileResult, FileLocation} from 'stryker-api/transpile';
import {File} from 'stryker-api/core';

class WebpackTranspiler implements Transpiler {
    public constructor(options: TranspilerOptions) {

    }

    public async transpile(files: Array<File>): Promise<TranspileResult> {
        throw new Error('Method not implemented.');
    }

    public getMappedLocation(sourceFileLocation: FileLocation): FileLocation {
        // Waiting for a decision on how this is going to be implemented in the future
        // Return a 'Method nog implemented' error for now.
        throw new Error('Method not implemented.');
    }
}

export default WebpackTranspiler;