'use strict';

const holiday = (function () {
  function route(destination) {
    const trip = [];
    destination.forEach(function (d) {
      if (typeof d.dest !== 'string' || typeof d.rule !== 'string') {
        throw new Error('Invalid value');
      }
      if (trip.indexOf(d.dest) === -1) {
        if (d.dest === d.rule) {
          trip.push(d.dest);
        } else if (d.dest !== d.rule && trip.indexOf(d.rule) === -1) {
          trip.push(d.rule);
          trip.push(d.dest);
        } else if (d.dest !== d.rule && trip.indexOf(d.rule) !== -1) {
          trip.push(d.dest);
        }
      } else if (d.dest !== d.rule) {
        if (trip.indexOf(d.rule) !== -1) {
          trip.splice(trip.indexOf(d.rule), 1);
        }
        trip.splice(trip.indexOf(d.dest), 0, d.rule);
      }
    });
    destination.forEach(function (d) {
      if (trip.indexOf(d.dest) < trip.indexOf(d.rule)) {
        trip.splice(trip.indexOf(d.rule), 1);
        trip.splice(trip.indexOf(d.dest), 0, d.rule);
      }
    });
    return trip;
  }
  return {
    route: route,
  };
})();

module.exports = holiday;
