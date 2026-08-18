(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.BureauEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const CHALLENGE_CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const NIGHT_SHIFT_RISK_BOOST = 10;

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
    let packed = (Math.max(0, Math.floor(Number(score) || 0)) * 4 + modeVal) * 1296 + day;

    let code = "";
    for (let i = 0; i < 6; i += 1) {
      code = CHALLENGE_CHARSET[packed % 32] + code;
      packed = Math.floor(packed / 32);
    }
    return code;
  }

  function decodeChallengeCode(code) {
    const cleaned = String(code || "")
      .trim()
      .toUpperCase()
      .replace(/[^0-9A-Z]/g, "");
    if (cleaned.length !== 6) return null;

    let packed = 0;
    for (let i = 0; i < 6; i += 1) {
      const idx = CHALLENGE_CHARSET.indexOf(cleaned[i]);
      if (idx < 0) return null;
      packed = packed * 32 + idx;
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
    NIGHT_SHIFT_RISK_BOOST,
    clamp,
    hashString,
    computeScore,
    generateChallengeCode,
    decodeChallengeCode,
    performanceReview,
    effectiveRisk
  };
});
