const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../bureau-engine.js");

const MODES = ["normal", "daily", "campaign", "audit"];

test("every mode round-trips at a range of scores", () => {
  for (const mode of MODES) {
    for (const score of [0, 1, 7, 128, 999, 20000, 207000]) {
      const code = engine.generateChallengeCode(score, mode, "2026-08-26");
      const decoded = engine.decodeChallengeCode(code);

      assert.ok(decoded, `${mode}/${score} produced an undecodable code`);
      assert.equal(decoded.score, score, `${mode}/${score} lost its score`);
      assert.equal(decoded.mode, mode, `${mode}/${score} lost its mode`);
    }
  }
});

test("codes are always six characters from the emitted alphabet", () => {
  const emittable = engine.CHALLENGE_CHARSET.slice(0, engine.CHALLENGE_BASE);

  for (const mode of MODES) {
    const code = engine.generateChallengeCode(4321, mode, "2026-01-01");
    assert.equal(code.length, engine.CHALLENGE_LENGTH);
    for (const char of code) {
      assert.ok(emittable.includes(char), `${code} emitted out-of-alphabet ${char}`);
    }
  }
});

test("symbols the encoder can never emit are rejected, not silently decoded", () => {
  // The alphabet has 34 symbols but packing is base-32, so Y and Z are
  // unreachable by encoding; accepting them would decode typos into real codes.
  assert.equal(engine.CHALLENGE_CHARSET.length, 34);
  assert.equal(engine.CHALLENGE_BASE, 32);
  assert.equal(engine.decodeChallengeCode("ZZZZZZ"), null);
  assert.equal(engine.decodeChallengeCode("YYYYYY"), null);
  assert.equal(engine.decodeChallengeCode("00000Z"), null);
});

test("an absurd score clamps instead of wrapping to a wrong number", () => {
  const code = engine.generateChallengeCode(Number.MAX_SAFE_INTEGER, "audit", "2026-08-26");
  const decoded = engine.decodeChallengeCode(code);

  assert.ok(decoded, "an extreme score must still produce a decodable code");
  assert.equal(decoded.mode, "audit");
  assert.ok(decoded.score > 200000, `expected a clamped-but-large score, got ${decoded.score}`);
  assert.ok(Number.isSafeInteger(decoded.score));
});

test("malformed input is rejected", () => {
  for (const bad of ["", "nope", "ABC", "ABCDEFG", null, undefined, "!!!!!!", "      "]) {
    assert.equal(engine.decodeChallengeCode(bad), null, `${JSON.stringify(bad)} should be rejected`);
  }
});

test("decoding tolerates casing and separator noise", () => {
  const code = engine.generateChallengeCode(512, "campaign", "2026-08-26");
  const noisy = `${code.slice(0, 3)}-${code.slice(3)}`.toLowerCase();

  assert.deepEqual(engine.decodeChallengeCode(noisy), engine.decodeChallengeCode(code));
});

test("different scores produce different codes on the same day", () => {
  const seen = new Set();
  for (let score = 0; score < 64; score += 1) {
    seen.add(engine.generateChallengeCode(score, "daily", "2026-08-26"));
  }
  assert.equal(seen.size, 64, "codes collided across distinct scores");
});
