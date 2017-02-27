'use strict';

const test = require('tape');
const holiday = require('./emarsys-holiday.js');

test('route gets X should return X', function (t) {
  t.deepEqual(holiday.route({dest: 'X', rule: 'X'}), ['X']);
  t.end();
});

// test('route gets "X", "Y" should return "XY"', function (t) {
//   t.equal(holiday.route('X', 'Y'), 'XY');
//   t.end();
// });