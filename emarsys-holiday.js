'use strict';

var holiday = (function () {
  function route(destination) {
    let route = [];
    destination.forEach( function (d) {
      if (d.dest === d.rule) {
        route.push(d.dest);
      }

    })
    return route;
  }

  return {
    route: route,
  }
})();

module.exports = holiday;
