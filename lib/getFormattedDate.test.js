import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate', async (t) => {
  await t.test('formats a valid date string correctly', () => {
    const result = getFormattedDate('2024-05-16T12:00:00Z');
    // Using includes because exact string might vary by environment/timezone in some Intl configurations
    // But for "en-US" long date it should be fairly stable
    assert.ok(result.includes('May 16, 2024') || result.includes('May 15, 2024'));
  });

  await t.test('returns "N/A" for null, undefined, or empty string', () => {
    assert.strictEqual(getFormattedDate(null), 'N/A');
    assert.strictEqual(getFormattedDate(undefined), 'N/A');
    assert.strictEqual(getFormattedDate(''), 'N/A');
  });

  await t.test('returns "N/A" for invalid date string', () => {
    assert.strictEqual(getFormattedDate('not-a-date'), 'N/A');
  });
});

test('getFormattedDateTime', async (t) => {
  await t.test('formats a valid date time string correctly', () => {
    const result = getFormattedDateTime('2024-05-16T12:00:00Z');
    assert.ok(result.includes('2024'));
    assert.ok(result.includes('May'));
  });

  await t.test('returns "N/A" for null, undefined, or empty string', () => {
    assert.strictEqual(getFormattedDateTime(null), 'N/A');
    assert.strictEqual(getFormattedDateTime(undefined), 'N/A');
    assert.strictEqual(getFormattedDateTime(''), 'N/A');
  });

  await t.test('returns "N/A" for invalid date string', () => {
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
