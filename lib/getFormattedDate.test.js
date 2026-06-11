import test from 'node:test';
import assert from 'node:assert';
import {
  getFormattedDate,
  getFormattedDateTime,
  getShortDate,
  getBackLink
} from './getFormattedDate.js';

test('getFormattedDate - formatting', async (t) => {
  await t.test('formats date correctly in en-US', () => {
    const date = '2024-05-20T10:00:00Z';
    assert.strictEqual(getFormattedDate(date), 'May 20, 2024');
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDate(null), 'N/A');
  });

  await t.test('returns "N/A" for undefined', () => {
    assert.strictEqual(getFormattedDate(undefined), 'N/A');
  });

  await t.test('returns "N/A" for invalid date string', () => {
    assert.strictEqual(getFormattedDate('not-a-date'), 'N/A');
  });
});

test('getFormattedDateTime - formatting', async (t) => {
  await t.test('formats date and time correctly in en-US', () => {
    const date = '2024-05-20T10:00:00Z';
    // The exact format might vary slightly by environment (Node version),
    // but typically it's "May 20, 2024, 11:00 AM" or similar depending on TZ.
    // We'll check for key components.
    const formatted = getFormattedDateTime(date);
    assert.ok(formatted.includes('May 20, 2024'));
    assert.ok(formatted.includes('AM') || formatted.includes('PM'));
  });

  await t.test('returns "N/A" for invalid inputs', () => {
    assert.strictEqual(getFormattedDateTime(null), 'N/A');
    assert.strictEqual(getFormattedDateTime(''), 'N/A');
  });
});

test('getShortDate - formatting', async (t) => {
  await t.test('formats date correctly in en-GB (DD MMM YYYY)', () => {
    const date = '2024-05-20T10:00:00Z';
    // en-GB short date: "20 May 2024"
    assert.strictEqual(getShortDate(date), '20 May 2024');
  });

  await t.test('returns "N/A" for invalid inputs', () => {
    assert.strictEqual(getShortDate(null), 'N/A');
    assert.strictEqual(getShortDate('invalid'), 'N/A');
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
