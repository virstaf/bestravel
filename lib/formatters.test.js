import test from 'node:test';
import assert from 'node:assert';
import {
  formatCurrencyGBP,
  formatDateGBShort,
  formatDateGBLong,
  formatDateUSLong,
  formatDateUSShort,
  formatDateUSShortDateTime
} from './formatters.js';

test('formatCurrencyGBP formats correctly', () => {
  const amount = 1234.56;
  const formatted = formatCurrencyGBP(amount);
  // Match digits and pound sign, ignore varied whitespace/separators
  assert.ok(/£.*1.*234.*56/.test(formatted));

  const wholeAmount = 1000;
  const formattedWhole = formatCurrencyGBP(wholeAmount);
  assert.ok(/£.*1.*000/.test(formattedWhole));
});

test('formatDateGBShort formats correctly', () => {
  const date = '2025-12-25';
  const formatted = formatDateGBShort(date);
  assert.ok(formatted.includes('25'));
  assert.ok(formatted.includes('Dec'));
  assert.ok(formatted.includes('2025'));
});

test('formatDateGBLong formats correctly', () => {
  const date = '2025-12-25';
  const formatted = formatDateGBLong(date);
  assert.ok(formatted.includes('25'));
  assert.ok(formatted.includes('December'));
  assert.ok(formatted.includes('2025'));
});

test('formatDateUSLong formats correctly', () => {
  const date = '2025-12-25';
  const formatted = formatDateUSLong(date);
  assert.ok(formatted.includes('December'));
  assert.ok(formatted.includes('25'));
  assert.ok(formatted.includes('2025'));
});

test('formatDateUSShort formats correctly', () => {
  const date = '2025-12-25';
  const formatted = formatDateUSShort(date);
  assert.ok(formatted.includes('Dec'));
  assert.ok(formatted.includes('25'));
  assert.ok(formatted.includes('2025'));
});

test('formatDateUSShortDateTime formats correctly', () => {
  const date = '2025-12-25T14:30:00';
  const formatted = formatDateUSShortDateTime(date);
  assert.ok(formatted.includes('Dec 25, 2025'));
  // Time part check
  assert.ok(/0?2:30/.test(formatted) || /14:30/.test(formatted));
});

test('Safe formatters handle invalid inputs', () => {
  assert.strictEqual(formatDateGBShort(null), 'N/A');
  assert.strictEqual(formatDateGBShort(undefined), 'N/A');
  assert.strictEqual(formatDateGBShort('invalid-date'), 'N/A');

  // Currency handles null as 0
  const formattedNull = formatCurrencyGBP(null);
  assert.ok(/£.*0/.test(formattedNull));
});
