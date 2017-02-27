'use strict';

var holiday = (function () {
  function route(destination) {
    let trip = [];
    destination.forEach(function (d) {
      if (trip.indexOf(d.dest) === -1) {
        if (d.dest === d.rule) {
          trip.push(d.dest);
        } else {
          trip.push(d.rule);
          trip.push(d.dest);
        }
      }
    });
    return trip;
  }

  return {
    route: route,
  }
})();

module.exports = holiday;
