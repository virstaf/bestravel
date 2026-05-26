import test from 'node:test';
import assert from 'node:assert';
import { currencyGBP, currencyGBPWithDecimals, dateGBShort, dateGBLong } from './formatters.js';

test('currencyGBP formatter', async (t) => {
  await t.test('formats whole numbers without decimals', () => {
    const result = currencyGBP.format(100);
    // Use a regex to handle different space characters (like non-breaking space)
    assert.match(result, /£100/);
  });

  await t.test('rounds decimals', () => {
    const result = currencyGBP.format(100.55);
    assert.match(result, /£101/);
  });
});

test('currencyGBPWithDecimals formatter', async (t) => {
  await t.test('formats numbers with two decimals', () => {
    const result = currencyGBPWithDecimals.format(1234.56);
    assert.match(result, /£1,234\.56/);
  });

  await t.test('adds .00 to whole numbers', () => {
    const result = currencyGBPWithDecimals.format(100);
    assert.match(result, /£100\.00/);
  });
});

test('dateGBShort formatter', async (t) => {
  await t.test('formats date correctly in short GB style', () => {
    const date = new Date('2023-12-25');
    const result = dateGBShort.format(date);
    // Depending on environment, it might be "25 Dec 2023" or similar
    assert.match(result, /25 Dec 2023/);
  });
});

test('dateGBLong formatter', async (t) => {
  await t.test('formats date correctly in long GB style', () => {
    const date = new Date('2023-12-25');
    const result = dateGBLong.format(date);
    assert.match(result, /25 December 2023/);
  });
});
