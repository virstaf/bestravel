import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate', async (t) => {
  await t.test('formats a valid date string', () => {
    const date = '2023-10-27';
    // Intl.DateTimeFormat with en-US and long month should be October 27, 2023
    assert.strictEqual(getFormattedDate(date), 'October 27, 2023');
  });

  await t.test('returns "N/A" for null/undefined/empty', () => {
    assert.strictEqual(getFormattedDate(null), 'N/A');
    assert.strictEqual(getFormattedDate(undefined), 'N/A');
    assert.strictEqual(getFormattedDate(''), 'N/A');
  });

  await t.test('returns "N/A" for invalid date', () => {
    assert.strictEqual(getFormattedDate('invalid-date'), 'N/A');
  });
});

test('getFormattedDateTime', async (t) => {
  await t.test('formats a valid date time string', () => {
    const date = '2023-10-27T10:30:00';
    // en-US, short month: Oct 27, 2023, 10:30 AM
    assert.ok(getFormattedDateTime(date).includes('Oct 27, 2023'));
    assert.ok(getFormattedDateTime(date).includes('10:30'));
  });

  await t.test('returns "N/A" for null/undefined/empty', () => {
    assert.strictEqual(getFormattedDateTime(null), 'N/A');
    assert.strictEqual(getFormattedDateTime(undefined), 'N/A');
    assert.strictEqual(getFormattedDateTime(''), 'N/A');
  });
});

test('getBackLink - edge cases', async (t) => {
  await t.test('returns "/" for empty path', () => {
    assert.strictEqual(getBackLink(''), '/');
  });

  await t.test('returns "/" for null path', () => {
    assert.strictEqual(getBackLink(null), '/');
  });

  await t.test('returns "/" for undefined path', () => {
    assert.strictEqual(getBackLink(undefined), '/');
  });

  await t.test('returns "/" for root path', () => {
    assert.strictEqual(getBackLink('/'), '/');
  });
});

test('getBackLink - top-level paths', async (t) => {
  await t.test('returns "/" for top-level path like "/admin"', () => {
    assert.strictEqual(getBackLink('/admin'), '/');
  });

  await t.test('returns "/" for top-level path without leading slash', () => {
    assert.strictEqual(getBackLink('admin'), '/');
  });
});

test('getBackLink - nested paths', async (t) => {
  await t.test('returns parent path for nested paths', () => {
    assert.strictEqual(getBackLink('/admin/settings'), '/admin');
    assert.strictEqual(getBackLink('/blog/posts/1'), '/blog/posts');
  });

  await t.test('handles paths without leading slash', () => {
    assert.strictEqual(getBackLink('admin/settings'), '/admin');
  });
});

test('getBackLink - complex paths', async (t) => {
  await t.test('handles trailing slashes', () => {
    assert.strictEqual(getBackLink('/admin/settings/'), '/admin');
  });

  await t.test('handles multiple consecutive slashes', () => {
    assert.strictEqual(getBackLink('/admin//settings'), '/admin');
    assert.strictEqual(getBackLink('///admin///settings///'), '/admin');
  });
});
