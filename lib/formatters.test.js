import test from 'node:test';
import assert from 'node:assert';
import { formatCurrencyGBP, formatDateGBLong, formatDateGBShort, formatDateUSLong, formatDateUSShortDateTime } from './formatters.js';

test('formatCurrencyGBP', async (t) => {
  await t.test('formats positive amount', () => {
    assert.strictEqual(formatCurrencyGBP(100), '£100.00');
  });

  await t.test('handles zero', () => {
    assert.strictEqual(formatCurrencyGBP(0), '£0.00');
  });

  await t.test('handles null/undefined', () => {
    assert.strictEqual(formatCurrencyGBP(null), '£0.00');
    assert.strictEqual(formatCurrencyGBP(undefined), '£0.00');
  });
});

test('formatDateGBLong', async (t) => {
  await t.test('formats valid date', () => {
    assert.strictEqual(formatDateGBLong('2023-05-15'), '15 May 2023');
  });

  await t.test('handles null/invalid', () => {
    assert.strictEqual(formatDateGBLong(null), 'N/A');
    assert.strictEqual(formatDateGBLong('invalid'), 'N/A');
  });
});

test('formatDateGBShort', async (t) => {
  await t.test('formats valid date', () => {
    assert.strictEqual(formatDateGBShort('2023-05-15'), '15 May 2023');
  });
});

test('formatDateUSLong', async (t) => {
  await t.test('formats valid date', () => {
    assert.strictEqual(formatDateUSLong('2023-05-15'), 'May 15, 2023');
  });
});

test('formatDateUSShortDateTime', async (t) => {
  await t.test('formats valid date time', () => {
    const result = formatDateUSShortDateTime('2023-05-15T14:30:00Z');
    assert.ok(result.includes('May 15, 2023'));
  });
});
