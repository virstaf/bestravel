import test from 'node:test';
import assert from 'node:assert';
import { getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate - formatting', async (t) => {
  await t.test('formats a date string correctly in en-US long format', () => {
    const date = '2023-05-15';
    // Using a regex to allow for different spacing or minor variations in implementation
    // But it should contain May, 15, and 2023
    const formatted = getFormattedDate(date);
    assert.match(formatted, /May/);
    assert.match(formatted, /15/);
    assert.match(formatted, /2023/);
  });
});

test('getFormattedDateTime - formatting', async (t) => {
  await t.test('formats a date string correctly in en-US short format with time', () => {
    const date = '2023-05-15T14:30:00Z';
    const formatted = getFormattedDateTime(date);
    assert.match(formatted, /May/);
    assert.match(formatted, /15/);
    assert.match(formatted, /2023/);
    // Depending on timezone of the runner, hours might vary, so just checking it has some time-like part
    assert.match(formatted, /\d{1,2}:\d{2}/);
  });
});
