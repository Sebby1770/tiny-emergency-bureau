(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.BureauEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  // Crockford-style alphabet with I and O removed so codes stay readable when
  // typed by hand. Codes are packed base-32, so only the first 32 symbols are
  // ever emitted; CHALLENGE_BASE keeps the decoder from accepting the two
  // trailing symbols that encoding can never produce.
  const CHALLENGE_CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const CHALLENGE_BASE = 32;
  const CHALLENGE_LENGTH = 6;
  const CHALLENGE_MAX_PACKED = CHALLENGE_BASE ** CHALLENGE_LENGTH;
  const NIGHT_SHIFT_RISK_BOOST = 10;

  const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  /**
   * Escape a value for interpolation into an HTML template string.
   *
   * The clerk name is player-typed, is persisted to localStorage, and is
   * published to the shared Supabase leaderboard, so it comes back as
   * untrusted input in every other player's browser.
   */
  function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
  }


  // ---------------------------------------------------------------------
  // Deterministic randomness
  //
  // Daily challenges and campaign shifts have to produce the same queue for
  // every player, so nothing here may reach for Math.random.
  // ---------------------------------------------------------------------

  function seededRandom(seed) {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function pickFrom(list, seed) {
    if (!Array.isArray(list) || list.length === 0) return undefined;
    return list[Math.floor(seededRandom(seed) * list.length)];
  }

  function seededShuffle(items, seed) {
    const list = [...items];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  /** Stable YYYY-MM-DD key for the daily challenge, in the player's own zone. */
  function dayKey(date) {
    const now = date || new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  }

  // ---------------------------------------------------------------------
  // Case rules
  // ---------------------------------------------------------------------

  function bestActionForRisk(risk) {
    const value = Number(risk) || 0;
    if (value >= 70) return "escalate";
    if (value >= 45) return "deny";
    return "approve";
  }

  const ACTION_KEYWORDS = {
    approve: ["approve", "grant", "authorize", "permit", "endorse", "sanction"],
    deny: ["deny", "reject", "refuse", "decline", "prohibit", "invalidate"],
    escalate: ["escalate", "refer", "defer", "committee", "senior", "higher authority"]
  };

  /**
   * Score a clerk's written reasoning out of 100.
   *
   * Rewards a middling length, bureaucratic vocabulary, and language that
   * actually matches the decision taken. `keywords` is injected rather than
   * imported so the word list stays with the game content.
   */
  function scoreJournal(text, action, keywords) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return 0;

    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    let score = 0;
    if (wordCount >= 8 && wordCount <= 60) {
      score += 30;
    } else if (wordCount >= 4) {
      score += Math.min(20, wordCount * 2);
    } else {
      score += wordCount * 3;
    }

    const lower = trimmed.toLowerCase();
    const list = Array.isArray(keywords) ? keywords : [];
    const keywordHits = list.filter((kw) => lower.includes(kw)).length;
    score += Math.min(40, keywordHits * 8);

    const matches = (ACTION_KEYWORDS[action] || []).some((kw) => lower.includes(kw));
    score += matches ? 25 : 10;

    return clamp(Math.round(score), 0, 100);
  }

  function computeVerdict(shift) {
    const chaos = Number(shift.chaos) || 0;
    const morale = Number(shift.morale) || 0;
    const forms = Number(shift.forms) || 0;
    const stamps = Number(shift.stamps) || 0;

    if (chaos >= 85) return "The city survived, but only out of spite.";
    if (morale >= 80 && chaos <= 45) return "A triumph of laminated calm.";
    if (forms >= 75) return "Paperwork prevailed. Justice took a number.";
    if (stamps >= 10) return "Stamp output heroic. Bureau morale cautiously optimistic.";
    if (morale < 35) return "Morale filed for early retirement.";
    return "Shift closed with administratively acceptable ambiguity.";
  }

  // ---------------------------------------------------------------------
  // Keyboard
  // ---------------------------------------------------------------------

  const SHORTCUT_ACTIONS = {
    a: "approve",
    d: "deny",
    e: "escalate",
    s: "scan",
    c: "coffee",
    h: "hotline",
    p: "panic",
    u: "undo",
    "?": "help"
  };

  /**
   * Decide what a keydown should do at the desk, or null to leave it alone.
   *
   * Browser and OS chords always belong to the browser. Without that guard,
   * Cmd+A approved the current case, Cmd+C took a coffee break and Ctrl+P
   * pulled the panic lever — and because each shortcut called
   * preventDefault(), the select-all, copy and print the player actually
   * asked for never happened. Shift is allowed through because "?" needs it.
   */
  function shortcutAction(event, context) {
    const ev = event || {};
    const ctx = context || {};
    const key = String(ev.key || "").toLowerCase();

    if (ctx.typing) return null;
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return null;
    if (key === "escape") return "close";

    // With a dialog or the settings drawer open, only help is reachable; the
    // case behind the overlay must not be stamped blind.
    if (ctx.overlayOpen) return key === "?" ? "help" : null;
    if (ctx.tutorialOpen) return null;

    return SHORTCUT_ACTIONS[key] || null;
  }

  // ---------------------------------------------------------------------
  // Honours
  // ---------------------------------------------------------------------

  /**
   * Decide which honours a context has earned.
   *
   * Takes a plain object rather than reading game state, so every rule can be
   * exercised in isolation. Returns a sorted array so two equal contexts always
   * produce an equal result.
   */
  function evaluateBadges(context) {
    const ctx = context || {};
    const shift = ctx.shift || {};
    const career = ctx.career || {};
    const campaign = ctx.campaign || {};
    const earned = new Set(Array.isArray(ctx.existing) ? ctx.existing : []);

    const num = (value) => Number(value) || 0;

    if (num(shift.stamps) >= 1) earned.add("First stamp");
    if (num(shift.coffee) >= 3) earned.add("Caffeine liaison");
    if (num(shift.chaos) >= 80) earned.add("Chaos enjoyer");
    if (num(shift.morale) >= 75) earned.add("Morale gardener");
    if (num(shift.forms) >= 70) earned.add("Form archivist");

    const queueLength = num(shift.queueLength);
    if (queueLength > 0 && num(shift.stamps) >= queueLength) earned.add("Full queue clerk");

    const scores = Array.isArray(shift.journalScores) ? shift.journalScores : [];
    const avgJournal = scores.length
      ? scores.reduce((a, b) => a + (Number(b) || 0), 0) / scores.length
      : 0;
    if (avgJournal >= 80) earned.add("Silver Tongue");

    if (shift.redPhoneMode && shift.ended && num(shift.chaos) < 70) earned.add("Crisis coolhead");
    if (shift.auditWeekMode && shift.ended) earned.add("Survived Audit Week");
    if (shift.nightShiftMode && shift.ended) earned.add("Night owl");
    if (shift.usedUndo) earned.add("Unstamper");
    if (num(shift.fastDecisions) >= 3) earned.add("Speed demon");
    if (num(shift.rippleCount) >= 5) earned.add("Ripple architect");
    if (num(shift.hotlineCount) >= 5) earned.add("Hotline hero");
    if (num(shift.scanCount) >= 3) earned.add("Scanner specialist");
    if (num(shift.panicCount) >= 2) earned.add("Panic artist");
    if (shift.setDailyBest) earned.add("Daily champion");

    if (num(career.totalShifts) >= 10) earned.add("Bureau veteran");
    if (num(career.totalStamps) >= 100) earned.add("Stamp collector");

    if (campaign.completed) earned.add("Campaign survivor");

    return [...earned].sort();
  }

  // ---------------------------------------------------------------------
  // Campaign
  // ---------------------------------------------------------------------

  function campaignAct(shiftIndex) {
    const index = Number(shiftIndex) || 0;
    if (index < 2) return 1;
    if (index < 4) return 2;
    return 3;
  }

  function decisionRatio(campaign) {
    const decisions = (campaign && campaign.decisions) || {};
    const approve = Number(decisions.approve) || 0;
    const deny = Number(decisions.deny) || 0;
    const escalate = Number(decisions.escalate) || 0;
    const total = approve + deny + escalate || 1;

    let dominant = "escalate";
    if (approve >= deny && approve >= escalate) dominant = "approve";
    else if (deny >= escalate) dominant = "deny";

    return {
      approve: approve / total,
      deny: deny / total,
      escalate: escalate / total,
      dominant
    };
  }

  // ---------------------------------------------------------------------
  // Resumable shift state
  // ---------------------------------------------------------------------

  /**
   * Schema version for a saved mid-shift snapshot.
   *
   * Bump this whenever the payload's shape changes in a way an older reader
   * would misinterpret. `readShiftState` discards anything it does not
   * recognise rather than restoring a desk with missing counters.
   */
  const SHIFT_STATE_VERSION = 2;

  const SHIFT_NUMERIC_FIELDS = ["index", "chaos", "morale", "forms", "coffee", "stamps"];

  /**
   * Validate and normalise a saved snapshot.
   *
   * Returns null for anything unusable: wrong version, expired, malformed, or
   * missing a counter. Previously every field was read straight onto the live
   * state with no version tag and no checks, so a truncated or older payload
   * restored a desk whose counters were `undefined` — which then propagated
   * NaN through the score and left the queue index pointing at nothing.
   */
  function readShiftState(raw, options) {
    const opts = options || {};
    const now = typeof opts.now === "number" ? opts.now : Date.now();
    const maxAgeMs = typeof opts.maxAgeMs === "number" ? opts.maxAgeMs : 24 * 60 * 60 * 1000;

    let saved = raw;
    if (typeof saved === "string") {
      try {
        saved = JSON.parse(saved);
      } catch {
        return null;
      }
    }

    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return null;
    if (saved.version !== SHIFT_STATE_VERSION) return null;

    const savedAt = Number(saved.savedAt);
    if (!Number.isFinite(savedAt) || savedAt <= 0) return null;
    if (now - savedAt > maxAgeMs) return null;

    if (!Array.isArray(saved.shiftQueue) || saved.shiftQueue.length === 0) return null;

    const normalised = { ...saved };
    for (const field of SHIFT_NUMERIC_FIELDS) {
      const value = Number(saved[field]);
      if (!Number.isFinite(value) || value < 0) return null;
      normalised[field] = value;
    }

    if (normalised.index > saved.shiftQueue.length) return null;

    normalised.history = Array.isArray(saved.history) ? saved.history : [];
    normalised.badges = Array.isArray(saved.badges) ? saved.badges : [];
    normalised.shiftLog = Array.isArray(saved.shiftLog) ? saved.shiftLog : [];
    normalised.ripples = Array.isArray(saved.ripples) ? saved.ripples : [];
    normalised.journalScores = Array.isArray(saved.journalScores) ? saved.journalScores : [];
    normalised.shiftMode = typeof saved.shiftMode === "string" ? saved.shiftMode : "normal";
    normalised.certificateText =
      typeof saved.certificateText === "string" ? saved.certificateText : "";

    return normalised;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hashString(value) {
    let hash = 0;
    const text = String(value);
    for (let i = 0; i < text.length; i += 1) {
      hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  function computeScore(parts) {
    const stamps = Number(parts.stamps) || 0;
    const morale = Number(parts.morale) || 0;
    const chaos = Number(parts.chaos) || 0;
    const forms = Number(parts.forms) || 0;
    return Math.max(0, stamps * 12 + morale - chaos + Math.floor(forms / 2));
  }

  function generateChallengeCode(score, mode, dayKey) {
    const modes = { normal: 0, daily: 1, campaign: 2, audit: 3 };
    const modeVal = modes[mode] || 0;
    const day = hashString(dayKey) % 1296;
    const safeScore = Math.max(0, Math.floor(Number(score) || 0));
    // Six base-32 digits hold 2^30 values. Solve the packing for the largest
    // score that still fits alongside this mode and day, and clamp to it, so an
    // absurd score round-trips as a truthful cap instead of wrapping to junk.
    const maxScore = Math.floor(
      ((CHALLENGE_MAX_PACKED - 1 - day) / 1296 - modeVal) / 4
    );
    let packed = (Math.min(safeScore, maxScore) * 4 + modeVal) * 1296 + day;

    let code = "";
    for (let i = 0; i < CHALLENGE_LENGTH; i += 1) {
      code = CHALLENGE_CHARSET[packed % CHALLENGE_BASE] + code;
      packed = Math.floor(packed / CHALLENGE_BASE);
    }
    return code;
  }

  function decodeChallengeCode(code) {
    const cleaned = String(code || "")
      .trim()
      .toUpperCase()
      .replace(/[^0-9A-Z]/g, "");
    if (cleaned.length !== CHALLENGE_LENGTH) return null;

    let packed = 0;
    for (let i = 0; i < CHALLENGE_LENGTH; i += 1) {
      const idx = CHALLENGE_CHARSET.indexOf(cleaned[i]);
      if (idx < 0 || idx >= CHALLENGE_BASE) return null;
      packed = packed * CHALLENGE_BASE + idx;
    }

    const day = packed % 1296;
    const temp = Math.floor(packed / 1296);
    const modeVal = temp % 4;
    const score = Math.floor(temp / 4);
    const modeMap = ["normal", "daily", "campaign", "audit"];
    return { score, mode: modeMap[modeVal] || "normal", day };
  }

  function performanceReview(parts) {
    const score = computeScore(parts);
    const chaos = Number(parts.chaos) || 0;
    const stamps = Number(parts.stamps) || 0;
    const queueLength = Number(parts.queueLength) || 0;
    const fastDecisions = Number(parts.fastDecisions) || 0;

    let grade = "C";
    if (score >= 180 && chaos < 50) grade = "A";
    else if (score >= 120 && chaos < 70) grade = "B";
    else if (score >= 70) grade = "C";
    else if (score >= 40) grade = "D";
    else grade = "F";

    const notes = [];
    if (queueLength > 0 && stamps >= queueLength) {
      notes.push("Cleared the entire inbound stack.");
    }
    if (fastDecisions >= 3) {
      notes.push("Crisis calls were stamped while the red light was still warm.");
    }
    if (chaos >= 80) {
      notes.push("Inspectors noted heroic chaos with limited lamination.");
    } else if (chaos < 40) {
      notes.push("City noise stayed inside acceptable municipal range.");
    }
    if (!notes.length) {
      notes.push("Administratively adequate. Coffee machine remains under review.");
    }

    const headlines = {
      A: "Letter of commendation issued in triplicate.",
      B: "Solid deskwork. The stapler files a friendly report.",
      C: "Shift closed with laminated ambiguity.",
      D: "Supervisor requests a quieter tomorrow.",
      F: "The city survived you. Barely."
    };

    return {
      grade,
      score,
      headline: headlines[grade],
      notes: notes.slice(0, 3)
    };
  }

  function effectiveRisk(baseRisk, options) {
    const auditBoost = options && options.auditWeek ? 15 : 0;
    const nightBoost = options && options.nightShift ? NIGHT_SHIFT_RISK_BOOST : 0;
    return clamp((Number(baseRisk) || 0) + auditBoost + nightBoost, 0, 99);
  }

  return {
    CHALLENGE_CHARSET,
    CHALLENGE_BASE,
    CHALLENGE_LENGTH,
    NIGHT_SHIFT_RISK_BOOST,
    ACTION_KEYWORDS,
    SHIFT_STATE_VERSION,
    escapeHtml,
    clamp,
    hashString,
    seededRandom,
    pickFrom,
    seededShuffle,
    dayKey,
    bestActionForRisk,
    scoreJournal,
    computeVerdict,
    evaluateBadges,
    campaignAct,
    decisionRatio,
    readShiftState,
    shortcutAction,
    computeScore,
    generateChallengeCode,
    decodeChallengeCode,
    performanceReview,
    effectiveRisk
  };
});
