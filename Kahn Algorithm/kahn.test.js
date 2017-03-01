'use strict';

const test = require('tape');
const kahnAlgoritm = require('../Kahn Algorithm/kahnalgorithm.js');

test('route gets X should return X', function (t) {
  t.deepEqual(kahnAlgoritm.algorithm([{ dest: 'X', rule: 'X' }]), ['X']);
  t.end();
});

test('route gets "X", "Y" should return "XY"', function (t) {
  t.deepEqual(kahnAlgoritm.algorithm([{ dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Y' }]), ['X', 'Y']);
  t.end();
});

test('route gets "X", "Y", "Z" with rule "Y => Z"', function (t) {
  t.deepEqual(kahnAlgoritm.algorithm([{ dest: 'X', rule: 'X' }, { dest: 'Y', rule: 'Z' }, { dest: 'Z', rule: 'Z' }]), ['X', 'Z', 'Y']);
  t.end();
});

test('route gets "U", "V", "W", "X", "Y", "Z" with rules according the specification', function (t) {
  t.deepEqual(kahnAlgoritm.algorithm([{ dest: 'U', rule: 'U' }, { dest: 'V', rule: 'W' }, { dest: 'W', rule: 'Z' }, { dest: 'X', rule: 'U' }, { dest: 'Y', rule: 'V' }, { dest: 'Z', rule: 'Z' }]), ['U', 'Z', 'W', 'X', 'V', 'Y']);
  t.end();
});

test('route gets "U", "V", "W", "X", "Y", "Z" resort at the end', function (t) {
  t.deepEqual(kahnAlgoritm.algorithm([{ dest: 'U', rule: 'Z' }, { dest: 'V', rule: 'V' }, { dest: 'W', rule: 'V' }, { dest: 'X', rule: 'Y' }, { dest: 'Y', rule: 'V' }, { dest: 'Z', rule: 'X' }]), ['V', 'W', 'Y', 'X', 'Z', 'U']);
  t.end();
});
