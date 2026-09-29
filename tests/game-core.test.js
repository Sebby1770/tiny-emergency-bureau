const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../bureau-engine.js");

// ---------------------------------------------------------------------------
// Deterministic randomness
// ---------------------------------------------------------------------------

test("seededRandom is deterministic and stays in [0, 1)", () => {
  for (let seed = 0; seed < 500; seed += 7) {
    const value = engine.seededRandom(seed);
    assert.equal(value, engine.seededRandom(seed), `seed ${seed} was not stable`);
    assert.ok(value >= 0 && value < 1, `seed ${seed} produced ${value}`);
  }
});

test("seededRandom spreads across the unit interval", () => {
  const buckets = new Array(10).fill(0);
  for (let seed = 0; seed < 5000; seed += 1) {
    buckets[Math.floor(engine.seededRandom(seed) * 10)] += 1;
  }
  // A generator that clumped would make daily queues predictable in shape.
  buckets.forEach((count, index) => {
    assert.ok(count > 300, `bucket ${index} only had ${count} of 5000`);
  });
});

test("seededShuffle is a permutation and depends on the seed", () => {
  const source = Array.from({ length: 12 }, (_, i) => i);

  const first = engine.seededShuffle(source, 99);
  assert.deepEqual([...first].sort((a, b) => a - b), source);
  assert.deepEqual(first, engine.seededShuffle(source, 99));
  assert.notDeepEqual(first, engine.seededShuffle(source, 100));

  // The caller's array must not be reordered underneath it.
  assert.deepEqual(source, Array.from({ length: 12 }, (_, i) => i));
});

test("pickFrom is total over empty and non-array input", () => {
  assert.equal(engine.pickFrom([], 1), undefined);
  assert.equal(engine.pickFrom(null, 1), undefined);
  assert.equal(engine.pickFrom(["only"], 12345), "only");
});

test("dayKey pads to a sortable YYYY-MM-DD", () => {
  assert.equal(engine.dayKey(new Date(2026, 0, 5)), "2026-01-05");
  assert.equal(engine.dayKey(new Date(2026, 11, 31)), "2026-12-31");

  // Sortable as plain strings, which the daily-best lookup relies on.
  const keys = [new Date(2026, 8, 9), new Date(2026, 9, 1), new Date(2026, 0, 20)]
    .map((d) => engine.dayKey(d))
    .sort();
  assert.deepEqual(keys, ["2026-01-20", "2026-09-09", "2026-10-01"]);
});

// ---------------------------------------------------------------------------
// Case rules
// ---------------------------------------------------------------------------

test("bestActionForRisk partitions the risk range at its documented edges", () => {
  assert.equal(engine.bestActionForRisk(0), "approve");
  assert.equal(engine.bestActionForRisk(44), "approve");
  assert.equal(engine.bestActionForRisk(45), "deny");
  assert.equal(engine.bestActionForRisk(69), "deny");
  assert.equal(engine.bestActionForRisk(70), "escalate");
  assert.equal(engine.bestActionForRisk(99), "escalate");
  assert.equal(engine.bestActionForRisk(undefined), "approve");
});

test("effectiveRisk stacks modes and clamps to the playable band", () => {
  assert.equal(engine.effectiveRisk(40, {}), 40);
  assert.equal(engine.effectiveRisk(40, { auditWeek: true }), 55);
  assert.equal(engine.effectiveRisk(40, { nightShift: true }), 50);
  assert.equal(engine.effectiveRisk(40, { auditWeek: true, nightShift: true }), 65);
  assert.equal(engine.effectiveRisk(95, { nightShift: true }), 99);
  assert.equal(engine.effectiveRisk(-20, {}), 0);
});

const KEYWORDS = ["pursuant", "hereby", "notwithstanding", "aforesaid"];

test("scoreJournal returns zero for empty reasoning", () => {
  assert.equal(engine.scoreJournal("", "approve", KEYWORDS), 0);
  assert.equal(engine.scoreJournal("   ", "approve", KEYWORDS), 0);
  assert.equal(engine.scoreJournal(null, "approve", KEYWORDS), 0);
});

test("scoreJournal rewards matching the decision taken", () => {
  const text = "The bureau hereby elects to approve this pursuant to standing policy.";
  const matched = engine.scoreJournal(text, "approve", KEYWORDS);
  const mismatched = engine.scoreJournal(text, "escalate", KEYWORDS);
  assert.ok(matched > mismatched, `${matched} should beat ${mismatched}`);
});

test("scoreJournal stays inside 0-100 however florid the prose", () => {
  const florid = `${KEYWORDS.join(" ")} approve grant authorize permit endorse sanction `.repeat(20);
  const score = engine.scoreJournal(florid, "approve", KEYWORDS);
  assert.ok(score >= 0 && score <= 100, `score ${score} left the range`);
});

test("scoreJournal tolerates a missing keyword list", () => {
  const score = engine.scoreJournal("A reasoned paragraph about approving things.", "approve");
  assert.ok(score > 0 && score <= 100);
});

test("computeVerdict prefers the most specific matching outcome", () => {
  assert.match(engine.computeVerdict({ chaos: 90 }), /out of spite/);
  assert.match(engine.computeVerdict({ morale: 85, chaos: 20 }), /laminated calm/);
  assert.match(engine.computeVerdict({ forms: 80, morale: 50 }), /Paperwork prevailed/);
  assert.match(engine.computeVerdict({ stamps: 12, morale: 50 }), /Stamp output heroic/);
  assert.match(engine.computeVerdict({ morale: 20 }), /early retirement/);
  assert.match(engine.computeVerdict({ morale: 50 }), /acceptable ambiguity/);
});

test("computeVerdict survives a state with no counters at all", () => {
  // A blank state reads as morale 0, which is the retirement branch.
  assert.match(engine.computeVerdict({}), /early retirement/);
});

// ---------------------------------------------------------------------------
// Scoring and reviews
// ---------------------------------------------------------------------------

test("computeScore matches the desk math and never goes negative", () => {
  assert.equal(engine.computeScore({ stamps: 4, morale: 60, chaos: 40, forms: 10 }), 73);
  assert.equal(engine.computeScore({ stamps: 0, morale: 0, chaos: 500, forms: 0 }), 0);
  assert.equal(engine.computeScore({}), 0);
});

test("performanceReview grades the whole band", () => {
  // Scores are spelled out because the grade boundaries are the contract:
  // A needs 180+ with chaos under 50, B needs 120+ with chaos under 70, then
  // C at 70+, D at 40+, F below.
  const graded = (parts) => {
    const review = engine.performanceReview(parts);
    return [review.grade, review.score];
  };

  assert.deepEqual(graded({ stamps: 16, morale: 80, chaos: 30, forms: 20 }), ["A", 252]);
  assert.deepEqual(graded({ stamps: 10, morale: 60, chaos: 60, forms: 10 }), ["B", 125]);
  assert.deepEqual(graded({ stamps: 6, morale: 50, chaos: 50, forms: 10 }), ["C", 77]);
  assert.deepEqual(graded({ stamps: 5, morale: 40, chaos: 50, forms: 10 }), ["D", 55]);
  assert.deepEqual(graded({ stamps: 0, morale: 10, chaos: 90, forms: 2 }), ["F", 0]);
});

test("a high score with runaway chaos cannot reach the top grades", () => {
  // Chaos is the gate: the same score grades lower when the city is on fire.
  const calm = engine.performanceReview({ stamps: 16, morale: 80, chaos: 30, forms: 20 });
  const burning = engine.performanceReview({ stamps: 20, morale: 80, chaos: 75, forms: 20 });

  assert.equal(calm.grade, "A");
  assert.ok(burning.score > calm.score, "the burning shift should score higher");
  assert.equal(burning.grade, "C", "yet chaos must hold it out of A and B");
});

test("performanceReview always returns a headline and at least one note", () => {
  for (const parts of [
    { stamps: 16, morale: 80, chaos: 30, forms: 20, queueLength: 16, fastDecisions: 3 },
    { stamps: 0, morale: 0, chaos: 100, forms: 0 },
    {}
  ]) {
    const review = engine.performanceReview(parts);
    assert.ok(review.headline, "missing headline");
    assert.ok(review.notes.length >= 1 && review.notes.length <= 3);
  }
});

// ---------------------------------------------------------------------------
// Challenge codes
// ---------------------------------------------------------------------------

test("challenge codes round-trip score and mode across every mode", () => {
  for (const mode of ["normal", "daily", "campaign", "audit"]) {
    const code = engine.generateChallengeCode(1234, mode, "2026-09-07");
    assert.equal(code.length, engine.CHALLENGE_LENGTH);
    const decoded = engine.decodeChallengeCode(code);
    assert.equal(decoded.score, 1234, `mode ${mode} lost the score`);
    assert.equal(decoded.mode, mode);
  }
});

test("challenge codes only ever use encodable symbols", () => {
  const encodable = engine.CHALLENGE_CHARSET.slice(0, engine.CHALLENGE_BASE);
  for (let score = 0; score < 3000; score += 137) {
    for (const char of engine.generateChallengeCode(score, "daily", "2026-09-07")) {
      assert.ok(encodable.includes(char), `emitted unencodable ${char}`);
    }
  }
});

test("an absurd score caps truthfully instead of wrapping to junk", () => {
  const code = engine.generateChallengeCode(Number.MAX_SAFE_INTEGER, "normal", "2026-09-07");
  const decoded = engine.decodeChallengeCode(code);
  assert.ok(decoded.score > 0, "cap collapsed to zero");
  assert.ok(Number.isSafeInteger(decoded.score));
  // Round-tripping the capped value must be a fixed point.
  const again = engine.decodeChallengeCode(
    engine.generateChallengeCode(decoded.score, "normal", "2026-09-07")
  );
  assert.equal(again.score, decoded.score);
});

test("malformed challenge codes are rejected", () => {
  for (const bad of ["", "nope", "12345", "1234567", null, undefined, "!!!!!!"]) {
    assert.equal(engine.decodeChallengeCode(bad), null, `accepted ${bad}`);
  }
});

test("challenge codes reject the two symbols encoding can never produce", () => {
  // The charset carries 34 symbols but codes are packed base-32, so the last
  // two must not decode as though they were valid digits.
  const unencodable = engine.CHALLENGE_CHARSET.slice(engine.CHALLENGE_BASE);
  assert.equal(unencodable.length, 2);
  for (const char of unencodable) {
    assert.equal(engine.decodeChallengeCode(char.repeat(6)), null);
  }
});

// ---------------------------------------------------------------------------
// Honours
// ---------------------------------------------------------------------------

test("evaluateBadges awards nothing for an untouched desk", () => {
  assert.deepEqual(engine.evaluateBadges({}), []);
});

test("evaluateBadges awards each shift honour at its threshold", () => {
  const cases = [
    [{ stamps: 1 }, "First stamp"],
    [{ coffee: 3 }, "Caffeine liaison"],
    [{ chaos: 80 }, "Chaos enjoyer"],
    [{ morale: 75 }, "Morale gardener"],
    [{ forms: 70 }, "Form archivist"],
    [{ stamps: 5, queueLength: 5 }, "Full queue clerk"],
    [{ journalScores: [80, 90] }, "Silver Tongue"],
    [{ usedUndo: true }, "Unstamper"],
    [{ fastDecisions: 3 }, "Speed demon"],
    [{ rippleCount: 5 }, "Ripple architect"],
    [{ hotlineCount: 5 }, "Hotline hero"],
    [{ scanCount: 3 }, "Scanner specialist"],
    [{ panicCount: 2 }, "Panic artist"],
    [{ setDailyBest: true }, "Daily champion"]
  ];

  for (const [shift, badge] of cases) {
    assert.ok(engine.evaluateBadges({ shift }).includes(badge), `missing ${badge}`);
  }
});

test("evaluateBadges does not award an honour one step below its threshold", () => {
  assert.ok(!engine.evaluateBadges({ shift: { coffee: 2 } }).includes("Caffeine liaison"));
  assert.ok(!engine.evaluateBadges({ shift: { chaos: 79 } }).includes("Chaos enjoyer"));
  assert.ok(!engine.evaluateBadges({ shift: { fastDecisions: 2 } }).includes("Speed demon"));
  assert.ok(!engine.evaluateBadges({ shift: { journalScores: [79] } }).includes("Silver Tongue"));
});

test("Full queue clerk needs a real queue, not an empty one", () => {
  // stamps >= queueLength is trivially true at zero; awarding it there would
  // hand the honour out before the shift started.
  assert.ok(!engine.evaluateBadges({ shift: { stamps: 0, queueLength: 0 } }).includes("Full queue clerk"));
});

test("mode honours require the shift to have actually ended", () => {
  const running = { redPhoneMode: true, auditWeekMode: true, nightShiftMode: true, chaos: 10 };
  const finished = { ...running, ended: true };

  const mid = engine.evaluateBadges({ shift: running });
  assert.ok(!mid.includes("Crisis coolhead"));
  assert.ok(!mid.includes("Survived Audit Week"));
  assert.ok(!mid.includes("Night owl"));

  const done = engine.evaluateBadges({ shift: finished });
  assert.ok(done.includes("Crisis coolhead"));
  assert.ok(done.includes("Survived Audit Week"));
  assert.ok(done.includes("Night owl"));
});

test("Crisis coolhead is withheld when the desk ended in chaos", () => {
  const shift = { redPhoneMode: true, ended: true, chaos: 70 };
  assert.ok(!engine.evaluateBadges({ shift }).includes("Crisis coolhead"));
});

test("career and campaign honours come from their own records", () => {
  assert.ok(engine.evaluateBadges({ career: { totalShifts: 10 } }).includes("Bureau veteran"));
  assert.ok(engine.evaluateBadges({ career: { totalStamps: 100 } }).includes("Stamp collector"));
  assert.ok(engine.evaluateBadges({ campaign: { completed: true } }).includes("Campaign survivor"));
});

test("evaluateBadges keeps honours already earned and never duplicates them", () => {
  const result = engine.evaluateBadges({
    existing: ["First stamp", "Night owl"],
    shift: { stamps: 1 }
  });
  assert.ok(result.includes("Night owl"), "dropped a previously earned honour");
  assert.equal(result.filter((b) => b === "First stamp").length, 1);
});

test("evaluateBadges is order-independent", () => {
  const shift = { stamps: 3, coffee: 3, chaos: 80 };
  const a = engine.evaluateBadges({ existing: ["Night owl", "First stamp"], shift });
  const b = engine.evaluateBadges({ existing: ["First stamp", "Night owl"], shift });
  assert.deepEqual(a, b);
});

// ---------------------------------------------------------------------------
// Campaign
// ---------------------------------------------------------------------------

test("campaignAct advances every two shifts and stops at three", () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 20].map(engine.campaignAct), [1, 1, 2, 2, 3, 3, 3, 3]);
});

test("decisionRatio normalises to one and names a dominant choice", () => {
  const ratio = engine.decisionRatio({ decisions: { approve: 3, deny: 1, escalate: 0 } });
  assert.equal(ratio.dominant, "approve");
  assert.ok(Math.abs(ratio.approve + ratio.deny + ratio.escalate - 1) < 1e-9);
  assert.ok(Math.abs(ratio.approve - 0.75) < 1e-9);
});

test("decisionRatio does not divide by zero on a fresh campaign", () => {
  const ratio = engine.decisionRatio({ decisions: { approve: 0, deny: 0, escalate: 0 } });
  assert.ok(Number.isFinite(ratio.approve));
  assert.equal(ratio.approve, 0);
  assert.equal(ratio.dominant, "approve");
});

test("decisionRatio survives a missing or malformed campaign record", () => {
  for (const input of [undefined, null, {}, { decisions: null }]) {
    const ratio = engine.decisionRatio(input);
    assert.ok(Number.isFinite(ratio.approve), `broke on ${JSON.stringify(input)}`);
  }
});

test("decisionRatio breaks ties toward approve, then deny", () => {
  assert.equal(engine.decisionRatio({ decisions: { approve: 2, deny: 2, escalate: 2 } }).dominant, "approve");
  assert.equal(engine.decisionRatio({ decisions: { approve: 1, deny: 2, escalate: 2 } }).dominant, "deny");
  assert.equal(engine.decisionRatio({ decisions: { approve: 1, deny: 1, escalate: 2 } }).dominant, "escalate");
});

// ---------------------------------------------------------------------------
// Resumable shift state
// ---------------------------------------------------------------------------

function validSnapshot(overrides = {}) {
  return {
    version: engine.SHIFT_STATE_VERSION,
    savedAt: 1_000_000,
    index: 2,
    chaos: 30,
    morale: 55,
    forms: 40,
    coffee: 1,
    stamps: 2,
    shiftQueue: [{ title: "a" }, { title: "b" }, { title: "c" }],
    shiftMode: "normal",
    ...overrides
  };
}

test("readShiftState accepts a well-formed snapshot", () => {
  const restored = engine.readShiftState(validSnapshot(), { now: 1_000_500 });
  assert.ok(restored);
  assert.equal(restored.index, 2);
  assert.equal(restored.stamps, 2);
});

test("readShiftState parses a JSON string as well as an object", () => {
  const restored = engine.readShiftState(JSON.stringify(validSnapshot()), { now: 1_000_500 });
  assert.ok(restored);
  assert.equal(restored.morale, 55);
});

test("readShiftState rejects a snapshot from a different schema version", () => {
  // The whole point of the version tag: an older payload must be discarded,
  // not restored onto a desk expecting fields it does not carry.
  assert.equal(engine.readShiftState(validSnapshot({ version: 1 }), { now: 1_000_500 }), null);
  assert.equal(engine.readShiftState(validSnapshot({ version: undefined }), { now: 1_000_500 }), null);
});

test("readShiftState rejects a snapshot past its window", () => {
  const day = 24 * 60 * 60 * 1000;
  assert.ok(engine.readShiftState(validSnapshot(), { now: 1_000_000 + day - 1, maxAgeMs: day }));
  assert.equal(engine.readShiftState(validSnapshot(), { now: 1_000_000 + day + 1, maxAgeMs: day }), null);
});

test("readShiftState rejects a snapshot missing any counter", () => {
  // Regression: these six fields were previously assigned with no fallback, so
  // a truncated payload restored a desk whose counters were undefined and
  // whose score then computed as NaN.
  for (const field of ["index", "chaos", "morale", "forms", "coffee", "stamps"]) {
    const broken = validSnapshot();
    delete broken[field];
    assert.equal(engine.readShiftState(broken, { now: 1_000_500 }), null, `accepted missing ${field}`);
  }
});

test("readShiftState rejects non-numeric and negative counters", () => {
  assert.equal(engine.readShiftState(validSnapshot({ chaos: "lots" }), { now: 1_000_500 }), null);
  assert.equal(engine.readShiftState(validSnapshot({ stamps: -1 }), { now: 1_000_500 }), null);
  assert.equal(engine.readShiftState(validSnapshot({ index: NaN }), { now: 1_000_500 }), null);
});

test("readShiftState rejects a missing or empty queue", () => {
  assert.equal(engine.readShiftState(validSnapshot({ shiftQueue: [] }), { now: 1_000_500 }), null);
  assert.equal(engine.readShiftState(validSnapshot({ shiftQueue: undefined }), { now: 1_000_500 }), null);
  assert.equal(engine.readShiftState(validSnapshot({ shiftQueue: "three" }), { now: 1_000_500 }), null);
});

test("readShiftState rejects an index past the end of the queue", () => {
  assert.equal(engine.readShiftState(validSnapshot({ index: 9 }), { now: 1_000_500 }), null);
  // Landing exactly at the end is a finished shift, which is legitimate.
  assert.ok(engine.readShiftState(validSnapshot({ index: 3 }), { now: 1_000_500 }));
});

test("readShiftState rejects junk without throwing", () => {
  for (const junk of ["not json", "", null, undefined, 42, [], "[]"]) {
    assert.equal(engine.readShiftState(junk, { now: 1_000_500 }), null, `accepted ${JSON.stringify(junk)}`);
  }
});

test("readShiftState normalises optional collections to arrays", () => {
  const restored = engine.readShiftState(validSnapshot({ history: "nope", ripples: null }), {
    now: 1_000_500
  });
  assert.deepEqual(restored.history, []);
  assert.deepEqual(restored.ripples, []);
  assert.deepEqual(restored.journalScores, []);
  assert.equal(restored.shiftMode, "normal");
  assert.equal(restored.certificateText, "");
});

// ---------------------------------------------------------------------------
// Escaping
// ---------------------------------------------------------------------------

test("escapeHtml neutralises every character that can break out of markup", () => {
  assert.equal(
    engine.escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
  );
  assert.equal(engine.escapeHtml("Tom & Jerry's"), "Tom &amp; Jerry&#39;s");
});

test("escapeHtml coerces non-string input without throwing", () => {
  assert.equal(engine.escapeHtml(null), "");
  assert.equal(engine.escapeHtml(undefined), "");
  assert.equal(engine.escapeHtml(42), "42");
});
