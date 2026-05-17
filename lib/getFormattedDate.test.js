import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate', async (t) => {
  await t.test('formats date correctly (en-US long)', () => {
    const date = '2023-12-25';
    // Use a regex or check for specific parts because of potential locale/timezone variations in environments
    // But since we specify "en-US", it should be "December 25, 2023"
    const result = getFormattedDate(date);
    assert.match(result, /December 25, 2023/);
  });
});

test('getFormattedDateTime', async (t) => {
  await t.test('formats date time correctly (en-US short with time)', () => {
    const date = '2023-12-25T15:30:00';
    const result = getFormattedDateTime(date);
    // Should contain "Dec 25, 2023" and some time
    assert.match(result, /Dec 25, 2023/);
    assert.match(result, /03:30/); // 15:30 is 3:30 PM
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
