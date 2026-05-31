import test from 'node:test';
import assert from 'node:assert';
import { getFormattedDate, getFormattedDateTime, getBackLink } from './getFormattedDate.js';

test('getFormattedDate', async (t) => {
  await t.test('formats valid date string', () => {
    const result = getFormattedDate('2023-05-15');
    // Result should be May 15, 2023 because it's en-US long
    assert.strictEqual(result, 'May 15, 2023');
  });

  await t.test('handles null', () => {
    assert.strictEqual(getFormattedDate(null), 'N/A');
  });

  await t.test('handles undefined', () => {
    assert.strictEqual(getFormattedDate(undefined), 'N/A');
  });

  await t.test('handles invalid date', () => {
    assert.strictEqual(getFormattedDate('invalid-date'), 'N/A');
  });
});

test('getFormattedDateTime', async (t) => {
  await t.test('formats valid date string with time', () => {
    const result = getFormattedDateTime('2023-05-15T14:30:00Z');
    // Result depends on local timezone but should contain May 15, 2023
    assert.ok(result.includes('May 15, 2023'));
    // Short month and 2-digit hour/minute
    // Format is "May 15, 2023, 02:30 PM" (or similar depending on locale/tz)
  });

  await t.test('handles null', () => {
    assert.strictEqual(getFormattedDateTime(null), 'N/A');
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
