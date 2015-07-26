console.log('Loading graph of brew dependencies');
require('./lib/loadGraph.js')(runLayout);

function runLayout(graph) {
  var layout = require('ngraph.offline.layout')(graph);

  console.log('Starting layout');
  layout.run({
    iterations: 125
  });

  var save = require('ngraph.tobinary');
  save(graph, {
    outDir: './data'
  });

  console.log('Done.');
  console.log('Copy `links.bin`, `labels.bin` and positions.bin into vis folder');
}