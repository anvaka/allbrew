module.exports = loadGraph;

function loadGraph(cb) {
  var exec = require('child_process').exec;
  // We need to have a graph!
  var cmd = 'brew deps --all';
  var graph = require('ngraph.graph')({
    uniqueLinkIds: false
  });

  exec(cmd, processOutput);

  return;

  function processOutput(error, stdout, stderr) {
    if (error) {
      console.log('Could not execute command: ');
      console.log('\t' + cmd);
      console.log('stderr: ' + stderr);
      process.exit(-1);
      return;
    }

    var lines = stdout.split('\n');
    for (var i = 0; i < lines.length; ++i) {
      addPackage(lines[i]);
    }
    console.log('Found ' + graph.getNodesCount() + ' nodes; and ' + graph.getLinksCount() + ' edges;');
    cb(graph);
  }

  function addPackage(rawPkg) {
    if (!rawPkg) return;
    var parts = rawPkg.split(':');
    var name = prestine(parts[0]);
    if (!name) return;
    if (parts.length > 1) {
      graph.addNode(name);
      var deps = getDeps(parts[1]);
      for (var i = 0; i < deps.length; ++i) {
        graph.addLink(name, deps[i]);
      }
    }
  }

  function prestine(x) {
    return x ? x.replace(/ /g, '') : '';
  }

  function getDeps(rawDeps) {
    var depsToProcess = rawDeps.split(' ');
    var deps = [];
    for (var i = 0; i < depsToProcess.length; ++i) {
      var other = prestine(depsToProcess[i]);
      if (other) deps.push(other);
    }

    return deps;
  }
}
