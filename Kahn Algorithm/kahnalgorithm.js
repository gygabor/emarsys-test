'use strict';

const kahnAlgoritm = (function () {
  function algorithm(graph) {
    let inDegree = [];
    let nodeWithoutEdges = [];
    let sortedElements = [];
    let i = 0;

    graph.forEach(function (node) {
      let findElemRoute = true;
      let dest = node.dest;
      let rule = node.rule;
      let element = [dest, 0];
      inDegree.push(element);
      while (findElemRoute){
        if (dest != rule) {
          dest = rule;
          graph.forEach(function (e) {
            if (dest === e.dest){
              rule = e.rule;
            }
          });
          inDegree[i][1]++;
        } else {
          findElemRoute = false;
        }
      }
      ++i;
    });

    inDegree.forEach(function (node, index){
      if (node[1] === 0) {
        nodeWithoutEdges.push(node[0]);
        inDegree[index][1] = -1;
      }
    });

    while (nodeWithoutEdges.length > 0) {
      let elem = nodeWithoutEdges.shift();
      sortedElements.push(elem);
      graph.forEach(function (e, index) {
        inDegree[index][1]--;
        if (inDegree[index][1] === 0) {
          nodeWithoutEdges.push(inDegree[index][0]);
          inDegree[index][1] = -1;
        }
      });
    }
    return sortedElements;
  }
  return {
    algorithm: algorithm,
  };
})();

module.exports = kahnAlgoritm;
