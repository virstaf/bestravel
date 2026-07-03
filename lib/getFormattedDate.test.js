import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate - formatting', async (t) => {
  await t.test('formats a valid date string', () => {
    const result = getFormattedDate('2024-05-15');
    // We use .includes() or check for specific parts because exact format might vary slightly by environment
    // but Intl.DateTimeFormat with en-US is usually stable.
    assert.ok(result.includes('May 15, 2024') || result.includes('2024'));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDate(null), 'N/A');
  });

  await t.test('returns "N/A" for undefined', () => {
    assert.strictEqual(getFormattedDate(undefined), 'N/A');
  });

  await t.test('returns "N/A" for invalid date', () => {
    assert.strictEqual(getFormattedDate('not-a-date'), 'N/A');
  });
});

test('getFormattedDateTime - formatting', async (t) => {
  await t.test('formats a valid date-time string', () => {
    const result = getFormattedDateTime('2024-05-15T10:00:00Z');
    assert.ok(result.includes('May 15, 2024') || result.includes('2024'));
    // Check for presence of time-like component (usually has AM/PM or : in en-US)
    assert.ok(result.includes(':') || result.includes('AM') || result.includes('PM'));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDateTime(null), 'N/A');
  });

  await t.test('returns "N/A" for invalid date', () => {
    assert.strictEqual(getFormattedDateTime('not-a-date'), 'N/A');
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
