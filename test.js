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

test('route gets "X", "X", "Y" with simple rules"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Y' }]), ['X', 'Y']);
  t.end();
});

test('route gets "X", "X", "X" with simple rules"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'X', rule: 'X' }, { dest: 'X', rule: 'X' }]), ['X']);
  t.end();
});

test('route gets "X", "X", "Y" with "X => Y" rule', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Y' }, { dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'Y' }]), ['Y', 'X']);
  t.end();
});

test('route gets "Y", "X", "Y" with "X => Y" rule', function (t) {
  t.deepEqual(holiday.route([{ dest: 'Y', rule: 'Y' }, { dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'Y' }]), ['Y', 'X']);
  t.end();
});

test('route gets "X", "X", "X"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'X', rule: 'X' }, { dest: 'X', rule: 'X' }]), ['X']);
  t.end();
});

test('route gets "X", "Y", "Z", "U" without rules', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Y' }, { dest: 'Z', rule: 'Z' }, { dest: 'U', rule: 'U' }]), ['X', 'Y', 'Z', 'U']);
  t.end();
});

test('route gets "X", "Y", "Z", "U" with "X => Y" rule', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'Y' }, { dest: 'Z', rule: 'Z' }, { dest: 'U', rule: 'U' }]), ['Y', 'X', 'Z', 'U']);
  t.end();
});

test('route gets "X", "Y", "Z", "U" with "X => Y, Y = U" rules', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'U' }, { dest: 'Z', rule: 'Z' }, { dest: 'U', rule: 'U' }]), ['U', 'Y', 'X', 'Z']);
  t.end();
});

test('route gets "X", "X", "Z", "U" with "X => Z" rule', function (t) {
  t.deepEqual(holiday.route([{ dest: 'X', rule: 'Z' }, { dest: 'X', rule: 'Z' }, { dest: 'Z', rule: 'Z' }, { dest: 'U', rule: 'U' }]), ['Z', 'X', 'U']);
  t.end();
});

test('route gets "U", "V", "W", "X", "Y", "Z" with rules according the specification', function (t) {
  t.deepEqual(holiday.route([{ dest: 'U', rule: 'U' }, { dest: 'V', rule: 'W' }, { dest: 'W', rule: 'Z' }, { dest: 'X', rule: 'U' }, { dest: 'Y', rule: 'V' }, { dest: 'Z', rule: 'Z' }]), ['U', 'Z', 'W', 'V', 'X', 'Y']);
  t.end();
});

test('route gets "U", "V", "W", "X", "Y", "U"', function (t) {
  t.deepEqual(holiday.route([{ dest: 'U', rule: 'U' }, { dest: 'V', rule: 'W' }, { dest: 'W', rule: 'W' }, { dest: 'X', rule: 'U' }, { dest: 'Y', rule: 'V' }, { dest: 'U', rule: 'U' }]), ['U', 'W', 'V', 'X', 'Y']);
  t.end();
});

test('route gets "U", "V", "W", "X", "Y", "Z" resort at the end', function (t) {
  t.deepEqual(holiday.route([{ dest: 'U', rule: 'Z' }, { dest: 'V', rule: 'V' }, { dest: 'W', rule: 'V' }, { dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'V' }, { dest: 'Z', rule: 'X' }]), ['V', 'Y', 'X', 'Z', 'U', 'W']);
  t.end();
});

test('Throw error if the destination is not a string', function (t) {
  t.throws(holiday.route([{ dest: 1, rule: 'Z' }, { dest: 'V', rule: 'V' }], 'Invalid value'));
  t.end();
});
