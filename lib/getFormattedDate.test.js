import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate', async (t) => {
  await t.test('formats date correctly', () => {
    const date = '2023-10-27';
    // Use a regex or check for specific parts because of potential locale/timezone variations in CI
    const formatted = getFormattedDate(date);
    assert.ok(formatted.includes('2023'));
    assert.ok(formatted.includes('October'));
    assert.ok(formatted.includes('27'));
  });

  await t.test('returns empty string for null/undefined', () => {
    assert.strictEqual(getFormattedDate(null), '');
    assert.strictEqual(getFormattedDate(undefined), '');
  });
});

test('getFormattedDateTime', async (t) => {
  await t.test('formats date and time correctly', () => {
    const date = '2023-10-27T10:30:00Z';
    const formatted = getFormattedDateTime(date);
    assert.ok(formatted.includes('2023'));
    assert.ok(formatted.includes('Oct'));
    assert.ok(formatted.includes('27'));
    // Time check might be tricky due to timezones, but let's check for year/month/day
  });

  await t.test('returns empty string for null/undefined', () => {
    assert.strictEqual(getFormattedDateTime(null), '');
    assert.strictEqual(getFormattedDateTime(undefined), '');
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
