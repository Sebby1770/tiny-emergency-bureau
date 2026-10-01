const test = require("node:test");
const assert = require("node:assert/strict");
const { shortcutAction } = require("../bureau-engine.js");

const DESK = { typing: false, overlayOpen: false, tutorialOpen: false };

test("each desk shortcut maps to its action", () => {
  const expected = {
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
  for (const [key, action] of Object.entries(expected)) {
    assert.equal(shortcutAction({ key }, DESK), action, `key ${key}`);
  }
});

test("shortcuts are case-insensitive", () => {
  assert.equal(shortcutAction({ key: "A" }, DESK), "approve");
  assert.equal(shortcutAction({ key: "P" }, DESK), "panic");
});

test("browser and OS chords never reach the desk", () => {
  // Regression: Cmd+A approved the current case, Cmd+C took a coffee break and
  // Ctrl+P pulled the panic lever, and each swallowed the browser shortcut too.
  for (const key of ["a", "c", "d", "p", "s", "u", "e", "h"]) {
    for (const modifier of ["metaKey", "ctrlKey", "altKey"]) {
      assert.equal(
        shortcutAction({ key, [modifier]: true }, DESK),
        null,
        `${modifier}+${key} reached the desk`
      );
    }
  }
});

test("Shift is not treated as a chord, because ? needs it", () => {
  assert.equal(shortcutAction({ key: "?", shiftKey: true }, DESK), "help");
});

test("nothing fires while typing, not even Escape", () => {
  const typing = { ...DESK, typing: true };
  for (const key of ["a", "d", "?", "Escape"]) {
    assert.equal(shortcutAction({ key }, typing), null, `key ${key}`);
  }
});

test("an open overlay blocks every desk action except help", () => {
  const overlay = { ...DESK, overlayOpen: true };
  for (const key of ["a", "d", "e", "s", "c", "h", "p", "u"]) {
    assert.equal(shortcutAction({ key }, overlay), null, `key ${key} acted behind an overlay`);
  }
  assert.equal(shortcutAction({ key: "?" }, overlay), "help");
});

test("Escape closes overlays from anywhere outside a text field", () => {
  assert.equal(shortcutAction({ key: "Escape" }, DESK), "close");
  assert.equal(shortcutAction({ key: "Escape" }, { ...DESK, overlayOpen: true }), "close");
  assert.equal(shortcutAction({ key: "Escape" }, { ...DESK, tutorialOpen: true }), "close");
});

test("the tutorial blocks every shortcut, help included", () => {
  const tutorial = { ...DESK, tutorialOpen: true };
  for (const key of ["a", "?", "p"]) {
    assert.equal(shortcutAction({ key }, tutorial), null, `key ${key}`);
  }
});

test("unmapped keys and malformed events are ignored", () => {
  assert.equal(shortcutAction({ key: "z" }, DESK), null);
  assert.equal(shortcutAction({ key: "Enter" }, DESK), null);
  assert.equal(shortcutAction({}, DESK), null);
  assert.equal(shortcutAction(null, null), null);
});
