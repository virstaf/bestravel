import test from 'node:test';
import assert from 'node:assert';
import { getBackLink, getFormattedDate, getFormattedDateTime } from './getFormattedDate.js';

test('getFormattedDate', () => {
  const date = '2024-05-20T10:00:00Z';
  const formatted = getFormattedDate(date);
  // Using includes to be robust against timezone differences in CI if any,
  // though formatters are set to en-US.
  assert.ok(formatted.includes('May 20, 2024') || formatted.includes('May 19, 2024'));
});

test('getFormattedDateTime', () => {
    const date = '2024-05-20T10:00:00Z';
    const formatted = getFormattedDateTime(date);
    assert.ok(formatted.includes('May 20, 2024') || formatted.includes('May 19, 2024'));
    assert.ok(formatted.includes('10:00') || formatted.includes('11:00') || formatted.includes('06:00') || formatted.includes('03:00'));
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
