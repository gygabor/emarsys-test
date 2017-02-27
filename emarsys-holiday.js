'use strict';

var holiday = (function () {
  function route(destination) {
    console.log(destination.dest);
    let route = [];
    if (destination.dest === destination.rule) {
      route.push(destination.dest);
    }
    return route;
  }

  return {
    route: route,
  }
})();

module.exports = holiday;
