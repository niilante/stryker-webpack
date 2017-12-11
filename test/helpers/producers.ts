import {FileKind, TextFile} from "stryker-api/core";

export function createTextFile(name: string): TextFile {
    return {
        name: name,
        content: 'c = a^2 + b^2',
        mutated: true,
        included: true,
        transpiled: true,
        kind: FileKind.Text
    };
}