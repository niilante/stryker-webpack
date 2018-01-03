import * as webpack from 'webpack';
import * as _ from 'lodash';
const toposort = require('toposort');

export class BundleSorterPlugin implements webpack.Plugin {

  sortedChunkNames: string[];  
  
  apply(compiler: webpack.Compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const allChunks: any[] = (compilation.getStats() as webpack.Stats).toJson().chunks;
      const sortedChunks = this.sort(allChunks);
      this.sortedChunkNames = _.flatMap(sortedChunks, chunk => chunk.files);
      callback();
    });
  }

  private sort(allChunks: any[]) {
    // We build a map (chunk-id -> chunk) for faster access during graph building.
    const nodeMap: { [chunkId: string]: any } = {};
    allChunks.forEach(function (chunk) {
      nodeMap[chunk.id] = chunk;
    });
    const edges: any[] = [];

    allChunks.forEach(chunk => {
      if (chunk.parents) {
        // Add an edge for each parent (parent -> child)
        chunk.parents.forEach((parentId: any) => {
          // webpack2 chunk.parents are chunks instead of string id(s)
          const parentChunk = typeof parentId === 'string' ? nodeMap[parentId] : parentId;
          // If the parent chunk does not exist (e.g. because of an excluded chunk)
          // we ignore that parent
          if (parentChunk) {
            edges.push([parentChunk, chunk]);
          }
        });
      }
    });

    // We now perform a topological sorting on the input chunks and built edges
    return toposort.array(allChunks, edges);
  }
}