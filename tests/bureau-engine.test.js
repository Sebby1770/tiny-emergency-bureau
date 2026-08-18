const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../bureau-engine.js");

test("challenge codes round-trip score and mode", () => {
  const code = engine.generateChallengeCode(128, "daily", "2026-08-19");
  assert.equal(code.length, 6);
  const decoded = engine.decodeChallengeCode(code);
  assert.equal(decoded.score, 128);
  assert.equal(decoded.mode, "daily");
});

test("invalid challenge codes are rejected", () => {
  assert.equal(engine.decodeChallengeCode("nope"), null);
  assert.equal(engine.decodeChallengeCode(""), null);
});

test("score formula matches the desk math", () => {
  assert.equal(engine.computeScore({ stamps: 4, morale: 60, chaos: 40, forms: 10 }), 4 * 12 + 60 - 40 + 5);
});

test("performance review issues A for a calm high-score shift", () => {
  const review = engine.performanceReview({
    stamps: 16,
    morale: 80,
    chaos: 30,
    forms: 20,
    queueLength: 16,
    fastDecisions: 3
  });
  assert.equal(review.grade, "A");
  assert.match(review.headline, /commendation/i);
  assert.ok(review.notes.length >= 1);
});

test("performance review issues F for a collapsed desk", () => {
  const review = engine.performanceReview({
    stamps: 0,
    morale: 10,
    chaos: 90,
    forms: 2
  });
  assert.equal(review.grade, "F");
});

test("night shift stacks risk on top of audit week", () => {
  assert.equal(engine.effectiveRisk(40, { auditWeek: true, nightShift: true }), 65);
  assert.equal(engine.effectiveRisk(95, { nightShift: true }), 99);
});
