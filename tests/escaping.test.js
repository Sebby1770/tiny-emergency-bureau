const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../bureau-engine.js");

// The clerk name is player-typed, persisted to localStorage, and published to
// the shared Supabase leaderboard, so it returns as untrusted input in every
// other player's browser.

test("escapeHtml neutralises every HTML-significant character", () => {
  assert.equal(engine.escapeHtml("&"), "&amp;");
  assert.equal(engine.escapeHtml("<"), "&lt;");
  assert.equal(engine.escapeHtml(">"), "&gt;");
  assert.equal(engine.escapeHtml('"'), "&quot;");
  assert.equal(engine.escapeHtml("'"), "&#39;");
});

test("escapeHtml defuses a script-injection clerk name", () => {
  const payload = '<img src=x onerror="alert(1)">';
  const escaped = engine.escapeHtml(payload);

  assert.ok(!escaped.includes("<"), "no raw angle brackets may survive");
  assert.ok(!escaped.includes(">"), "no raw angle brackets may survive");
  assert.equal(escaped, "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
});

test("escapeHtml defuses attribute-breakout payloads", () => {
  assert.equal(engine.escapeHtml("\" onfocus=alert(1) x=\""), "&quot; onfocus=alert(1) x=&quot;");
  assert.equal(engine.escapeHtml("' onfocus=alert(1) x='"), "&#39; onfocus=alert(1) x=&#39;");
});

test("escapeHtml escapes ampersands first so entities are not double-decoded", () => {
  assert.equal(engine.escapeHtml("&lt;"), "&amp;lt;");
});

test("escapeHtml passes ordinary names through unchanged", () => {
  assert.equal(engine.escapeHtml("Anonymous Clerk"), "Anonymous Clerk");
  assert.equal(engine.escapeHtml("Mel from Level 4"), "Mel from Level 4");
});

test("escapeHtml coerces non-string input safely", () => {
  assert.equal(engine.escapeHtml(null), "");
  assert.equal(engine.escapeHtml(undefined), "");
  assert.equal(engine.escapeHtml(42), "42");
  assert.equal(engine.escapeHtml(0), "0");
  assert.equal(engine.escapeHtml(false), "false");
});
