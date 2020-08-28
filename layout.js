console.log('Loading graph of brew dependencies');
require('./lib/loadGraph.js')(runLayout);

function runLayout(graph) {
  var layout = require('ngraph.offline.layout')(graph, {
    layoutOptions: {
      springLength: 30,
      springCoeff: 0.0008,
      gravity: -1.2,
      dragCoeff: 0.02,
      timeStep : 20,
    },
    iterations: 200
  });

  console.log('Starting layout');
  layout.run();

  var save = require('ngraph.tobinary');
  save(graph, {
    outDir: './data'
  });

  console.log('Done.');
  console.log('Copy `links.bin`, `labels.bin` and positions.bin into vis folder');
}
