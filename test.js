'use strict';

const test = require('tape');
const holiday = require('./emarsys-holiday.js');

test('route gets X should return X', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }]), ['X']);
  t.end();
});

test('route gets "X", "Y" should return "XY"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Y' }]), ['X', 'Y']);
  t.end();
});

test('route gets "X", "Y", "Z" with rule "Y => Z"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Z' }, { dest: 'Z', rule: 'Z' }]), ['X', 'Z', 'Y']);
  t.end();
});

test('route gets "X", "Y", "Z" with rule "X => Z"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Z' }, { dest: 'Y', rule: 'Y' }, { dest: 'Z', rule: 'Z' }]), ['Z', 'X', 'Y']);
  t.end();
});

test('route gets "X", "Y", "Z" with rule "X => Z, Z => Y"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Z' }, { dest: 'Y', rule: 'Y' }, { dest: 'Z', rule: 'Y' }]), ['Y', 'Z', 'X']);
  t.end();
});
