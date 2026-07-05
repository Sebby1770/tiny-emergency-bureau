const cases = [
  {
    title: "Printer achieves self-awareness",
    citizen: "Mel from Level 4",
    risk: 67,
    evidence: "Warm toner, 11-page manifesto, one smug beep",
    summary:
      "The office printer is refusing duplex jobs until someone acknowledges its 'emotional tray capacity.'",
    approve:
      "Approved emergency firmware therapy. The printer will now express feelings in grayscale.",
    deny:
      "Denied request. The printer responded by jamming only documents marked urgent.",
    escalate:
      "Escalated to Philosophy IT. They asked whether the paper jam is happening to us, or through us."
  },
  {
    title: "Left socks form a union",
    citizen: "Laundry Annex",
    risk: 54,
    evidence: "Tiny picket signs, lint-based slogans, no right socks present",
    summary:
      "Every left sock in the district walked out at dawn and is demanding equal drawer visibility.",
    approve:
      "Approved collective bargaining. Drawers must now provide soft lighting and quarterly fluff reviews.",
    deny:
      "Denied the union. The socks immediately became mysterious, which is legally inconvenient.",
    escalate:
      "Escalated to Wardrobe Relations. They arrived wearing sandals and made everything worse."
  },
  {
    title: "Elevator stuck on dramatic pause",
    citizen: "Tower B",
    risk: 72,
    evidence: "Doors sighing, lobby audience forming, music swelling",
    summary:
      "The elevator stops between floors only when someone says they are 'having a normal day.'",
    approve:
      "Approved theatrical licensing. All riders receive a monologue and a receipt.",
    deny:
      "Denied the drama. The elevator now opens, waits three seconds, and whispers 'interesting.'",
    escalate:
      "Escalated to Vertical Transport Arts. A stage manager has been assigned to Floor 6."
  },
  {
    title: "Coffee mug demands title change",
    citizen: "Break Room Cabinet",
    risk: 39,
    evidence: "Sharpie crown, memo titled 'I Am Not A Cup'",
    summary:
      "A ceramic mug insists it is the interim director of beverages and wants a reserved saucer.",
    approve:
      "Approved temporary beverage leadership. Tea has filed an appeal.",
    deny:
      "Denied executive status. The mug tipped itself over with procedural disappointment.",
    escalate:
      "Escalated to Kitchen Governance. Someone appointed the spoon as treasurer."
  },
  {
    title: "Calendar hides all Mondays",
    citizen: "Scheduling Desk",
    risk: 81,
    evidence: "Blank squares, suspicious weekend expansion, one nervous stapler",
    summary:
      "The bureau calendar has erased Mondays and replaced them with 'pre-Tuesdays' of unknown duration.",
    approve:
      "Approved the new week structure. Payroll fainted politely.",
    deny:
      "Denied calendar tampering. Monday returned wearing sunglasses and asking questions.",
    escalate:
      "Escalated to Temporal Admin. They scheduled a meeting last Thursday."
  },
  {
    title: "Desk plant invoices sunlight",
    citizen: "Window Operations",
    risk: 45,
    evidence: "Itemized rays, leaf signature, overdue notice",
    summary:
      "A desk plant is billing the building for photosynthesis services at premium consultancy rates.",
    approve:
      "Approved partial payment in mist. The plant accepted with suspicious professionalism.",
    deny:
      "Denied the invoice. The plant now provides shade only to preferred stakeholders.",
    escalate:
      "Escalated to Botanical Finance. They requested a root-cause analysis."
  },
  {
    title: "Vending machine sells advice",
    citizen: "Snack Corridor",
    risk: 58,
    evidence: "Crinkled wisdom, exact change only, one bag of confidence",
    summary:
      "The vending machine stopped dispensing snacks and now sells career advice in foil packets.",
    approve:
      "Approved advisory snack pilot. The chips recommend taking a long lunch.",
    deny:
      "Denied vending counsel. The machine refunded everyone in emotional closure.",
    escalate:
      "Escalated to Snack Ethics. They bought two granola bars and recused themselves."
  },
  {
    title: "Meeting room becomes too honest",
    citizen: "Conference 2A",
    risk: 76,
    evidence: "Minutes with adjectives, whiteboard confession, chairs facing facts",
    summary:
      "Anyone entering Conference 2A immediately admits the meeting could have been an email.",
    approve:
      "Approved radical candor zoning. The room now has a maximum occupancy of one brave person.",
    deny:
      "Denied honesty variance. The chairs squeaked in disappointment.",
    escalate:
      "Escalated to Facilities Truth Unit. They cancelled themselves."
  },
  {
    title: "Stapler files for emotional damages",
    citizen: "Supply Closet 3B",
    risk: 63,
    evidence: "Bent staples arranged as tears, affidavit written in paperclip Morse",
    summary:
      "The communal stapler claims years of being slammed have left it unable to trust loose leaf paper.",
    approve:
      "Approved stapler counseling and a padded landing mat. Paper now approaches respectfully.",
    deny:
      "Denied damages. The stapler began stapling things that were already stapled.",
    escalate:
      "Escalated to Office Supply Trauma. They sent a gentle three-hole punch as mediator."
  },
  {
    title: "Fire alarm only triggers on compliments",
    citizen: "Building Safety Panel",
    risk: 84,
    evidence: "Silent corridors, one blushing smoke detector, applause during drills",
    summary:
      "The fire alarm refuses to sound unless someone sincerely praises the building's 'resilience.'",
    approve:
      "Approved compliment-triggered safety. Evacuations now begin with a heartfelt toast.",
    deny:
      "Denied the vanity alarm. It now chirps softly whenever anyone says 'good job.'",
    escalate:
      "Escalated to Acoustic Compliance. They suggested the alarm attend a confidence workshop."
  },
  {
    title: "Parking meter judges life choices",
    citizen: "Curb Lane 12",
    risk: 51,
    evidence: "Receipts with footnotes, coin slot sighing, one unpaid existential fee",
    summary:
      "A parking meter has started printing receipts that rate your career, relationships, and shoe game.",
    approve:
      "Approved advisory metering. Drivers now receive stars and gentle redirection.",
    deny:
      "Denied editorial receipts. The meter charges double for anyone who looks uncertain.",
    escalate:
      "Escalated to Municipal Judgment Affairs. They parked illegally out of spite."
  },
  {
    title: "Ceiling fan writes poetry at 3 a.m.",
    citizen: "Apartment 4F",
    risk: 47,
    evidence: "Rhyming wobble, annotated dust, one sleepy haiku per revolution",
    summary:
      "The ceiling fan composes verse about longing and RPMs, then recites it to anyone trying to sleep.",
    approve:
      "Approved nocturnal literary programming. The fan now offers a volume knob for metaphors.",
    deny:
      "Denied the poetry license. The fan switched to slam poetry and increased wobble.",
    escalate:
      "Escalated to Domestic Arts. They brought a lamp that only reads nonfiction."
  }
];

const proceduralTemplates = {
  subjects: [
    "The lobby fern",
    "A rogue filing cabinet",
    "The break-room microwave",
    "A motivational poster",
    "The elevator music playlist",
    "A suspicious rubber band ball",
    "The office goldfish",
    "A haunted whiteboard marker"
  ],
  departments: [
    "Facilities Whisper Unit",
    "Department of Mild Vibrations",
    "Sub-Basement Compliance",
    "After-Hours Morale Patrol",
    "Interim Desk Relations",
    "The Velvet Annex"
  ],
  evidence: [
    "Faint humming, three sticky notes, one dramatic sigh",
    "Thermal readings, passive-aggressive memo, glitter residue",
    "Security footage of nothing, yet somehow worse",
    "A receipt for 'emotional overhead'",
    "Witness testimony from a very confident mug",
    "Forensic lint and a suspiciously warm keyboard"
  ],
  summaries: [
    "has filed a complaint about being under-appreciated during quarterly reviews.",
    "is refusing to function until someone says 'please' in triplicate.",
    "claims the building's vibes are 'legally noncompliant' after 4 p.m.",
    "demands a performance review and a corner office with better sunlight.",
    "has started leaving cryptic Post-its that predict minor inconveniences.",
    "insists it is now a consultant and bills by the existential hour."
  ],
  approve: [
    "Approved with ceremonial nodding. Morale improved by exactly one polite smile.",
    "Approved pending vibes. The subject immediately looked 8% more official.",
    "Approved. A thank-you card was generated automatically and filed incorrectly."
  ],
  deny: [
    "Denied. The subject sulked with impressive professionalism.",
    "Denied. Paperwork increased, but dignity remained laminated.",
    "Denied. The inbox has been asked to remain brave."
  ],
  escalate: [
    "Escalated to a committee that meets exclusively during lunch.",
    "Escalated upward. Upward responded with a calendar invite.",
    "Escalated to Senior Vibes. They are reviewing the vibes."
  ]
};

const tones = ["mint", "coral", "gold", "blue"];
const actionTone = {
  approve: { chaos: -8, morale: 6, forms: 7, label: "Approved" },
  deny: { chaos: 5, morale: -4, forms: -3, label: "Denied" },
  escalate: { chaos: 10, morale: 2, forms: 12, label: "Escalated" }
};

const SETTINGS_KEY = "bte-settings";
const TUTORIAL_KEY = "bte-tutorial-seen";
const SHIFT_STATE_KEY = "bureau-shift-state";
const DAILY_BEST_KEY = "bureau-daily-best";
const LOCAL_LEADERBOARD_KEY = "bureau-local-leaderboard";
const SHIFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const scanClues = [
  "Forensic scan reveals the evidence was notarized by a rubber duck.",
  "Scan complete: one witness is definitely a chair wearing a trench coat.",
  "Deep scan found a sticky note that says 'this is fine' in three languages.",
  "Barcode analysis suggests the case file smells faintly of ambition.",
  "Scan detected elevated levels of bureaucratic whimsy in sector seven.",
  "Infrared pass confirms the citizen has been here before, spiritually.",
  "Document watermark reads: 'property of whoever panics last.'",
  "Scan found a hidden appendix titled 'Dramatic Pause Addendum.'"
];

const hotlineAdvice = [
  "Hotline says: when in doubt, escalate until someone else owns the vibe.",
  "Hotline whispers: approve anything involving plants. They remember.",
  "Hotline recommends coffee before chaos, not during.",
  "Hotline counsel: deny with confidence, then walk away briskly.",
  "Hotline suggests stamping twice for emphasis, but only on Tuesdays.",
  "Hotline reports: morale is a feeling you can invoice.",
  "Hotline advises treating every stapler like it has seen things.",
  "Hotline says the city thrives on balanced paperwork and mild panic."
];

const state = {
  index: 0,
  chaos: 42,
  morale: 61,
  forms: 18,
  coffee: 0,
  stamps: 0,
  particles: [],
  buildings: [],
  tick: 0,
  certificateText: "",
  shiftStart: new Date(),
  shiftLog: [],
  history: [],
  badges: [],
  shiftQueue: [],
  shiftMode: "normal",
  shiftEnded: false,
  verdict: "",
  settings: {
    reducedMotion: false,
    darkDesk: false,
    soundEffects: false,
    ambientAudio: false
  }
};

let audioCtx = null;
let ambientNodes = null;
let pendingInit = false;

const els = {
  chaos: document.querySelector("#chaosValue"),
  morale: document.querySelector("#moraleValue"),
  forms: document.querySelector("#formsValue"),
  caseNumber: document.querySelector("#caseNumber"),
  caseTitle: document.querySelector("#caseTitle"),
  caseSummary: document.querySelector("#caseSummary"),
  caseCitizen: document.querySelector("#caseCitizen"),
  riskFill: document.querySelector("#riskFill"),
  riskLabel: document.querySelector("#riskLabel"),
  caseEvidence: document.querySelector("#caseEvidence"),
  casePanel: document.querySelector("#casePanel"),
  swipeHint: document.querySelector("#swipeHint"),
  actionButtons: document.querySelectorAll("[data-action]"),
  certificate: document.querySelector("#certificate"),
  stampPad: document.querySelector("#stampPad"),
  stampFlash: document.querySelector("#stampFlash"),
  copyButton: document.querySelector("#copyButton"),
  log: document.querySelector("#activityLog"),
  ticker: document.querySelector("#tickerText"),
  queue: document.querySelector("#queueList"),
  panicButton: document.querySelector("#panicButton"),
  rankBadge: document.querySelector("#rankBadge"),
  canvas: document.querySelector("#cityCanvas"),
  scanButton: document.querySelector("#scanButton"),
  coffeeButton: document.querySelector("#coffeeButton"),
  hotlineButton: document.querySelector("#hotlineButton"),
  exportShiftButton: document.querySelector("#exportShiftButton"),
  shareShiftButton: document.querySelector("#shareShiftButton"),
  shiftEndPanel: document.querySelector("#shiftEndPanel"),
  shiftVerdict: document.querySelector("#shiftVerdict"),
  newShiftButton: document.querySelector("#newShiftButton"),
  leaderboardList: document.querySelector("#leaderboardList"),
  dailyDeskButton: document.querySelector("#dailyDeskButton"),
  dailyLabel: document.querySelector("#dailyLabel"),
  settingsButton: document.querySelector("#settingsButton"),
  settingsDrawer: document.querySelector("#settingsDrawer"),
  settingReducedMotion: document.querySelector("#settingReducedMotion"),
  settingDarkDesk: document.querySelector("#settingDarkDesk"),
  settingSoundEffects: document.querySelector("#settingSoundEffects"),
  settingAmbientAudio: document.querySelector("#settingAmbientAudio"),
  tutorialModal: document.querySelector("#tutorialModal"),
  tutorialDismiss: document.querySelector("#tutorialDismiss"),
  resumeModal: document.querySelector("#resumeModal"),
  resumeSummary: document.querySelector("#resumeSummary"),
  resumeShiftButton: document.querySelector("#resumeShiftButton"),
  discardShiftButton: document.querySelector("#discardShiftButton"),
  helpModal: document.querySelector("#helpModal"),
  helpButton: document.querySelector("#helpButton")
};

const ctx = els.canvas.getContext("2d");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function pickFrom(list, seed) {
  return list[Math.floor(seededRandom(seed) * list.length)];
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function dailyDateLabel() {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function generateProceduralCase(seed) {
  const subject = pickFrom(proceduralTemplates.subjects, seed);
  const department = pickFrom(proceduralTemplates.departments, seed + 1);
  const evidence = pickFrom(proceduralTemplates.evidence, seed + 2);
  const summaryTail = pickFrom(proceduralTemplates.summaries, seed + 3);
  const risk = 35 + Math.floor(seededRandom(seed + 4) * 50);

  return {
    title: `${subject} requests formal recognition`,
    citizen: department,
    risk,
    evidence,
    summary: `${subject} ${summaryTail}`,
    approve: pickFrom(proceduralTemplates.approve, seed + 5),
    deny: pickFrom(proceduralTemplates.deny, seed + 6),
    escalate: pickFrom(proceduralTemplates.escalate, seed + 7),
    procedural: true
  };
}

function seededShuffle(items, seed) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function buildShiftQueue(mode = "normal") {
  const dateSeed = hashString(todayKey());
  const baseSeed = mode === "daily" ? dateSeed : hashString(`${Date.now()}-${Math.random()}`);
  const proceduralCount = 2 + Math.floor(seededRandom(baseSeed + 99) * 2);

  const procedural = Array.from({ length: proceduralCount }, (_, i) =>
    generateProceduralCase(baseSeed + 100 + i * 17)
  );

  let queue = [...cases, ...procedural];

  if (mode === "daily") {
    queue = seededShuffle(queue, dateSeed);
  } else {
    queue = seededShuffle(queue, baseSeed + 42);
  }

  return queue;
}

function currentCase() {
  return state.shiftQueue[state.index] || null;
}

function queueCaseAt(offset) {
  return state.shiftQueue[state.index + offset] || null;
}

function isTypingInInput() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active.isContentEditable;
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      state.settings = { ...state.settings, ...JSON.parse(saved) };
    }
  } catch {
    /* keep defaults */
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  } catch {
    /* storage unavailable */
  }
}

function applySettings() {
  document.body.classList.toggle("reduced-motion", state.settings.reducedMotion);
  document.body.classList.toggle("dark-desk", state.settings.darkDesk);

  els.settingReducedMotion.checked = state.settings.reducedMotion;
  els.settingDarkDesk.checked = state.settings.darkDesk;
  els.settingSoundEffects.checked = state.settings.soundEffects;
  els.settingAmbientAudio.checked = state.settings.ambientAudio;

  if (state.settings.ambientAudio) {
    startAmbientAudio();
  } else {
    stopAmbientAudio();
  }
}

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, duration = 0.12, type = "sine", volume = 0.08) {
  if (!state.settings.soundEffects) return;

  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    /* audio unavailable */
  }
}

function startAmbientAudio() {
  if (!state.settings.ambientAudio) return;

  try {
    initAudio();
    stopAmbientAudio();

    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      output[i] = (Math.random() * 2 - 1) * 0.35;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 180;

    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 52;

    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 0.018;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.012;

    const master = audioCtx.createGain();
    master.gain.value = 0.06;

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    osc.connect(oscGain);
    oscGain.connect(master);
    master.connect(audioCtx.destination);

    noise.start();
    osc.start();

    ambientNodes = { noise, osc, master };
  } catch {
    /* audio unavailable */
  }
}

function stopAmbientAudio() {
  if (!ambientNodes) return;

  try {
    ambientNodes.noise.stop();
    ambientNodes.osc.stop();
    ambientNodes.master.disconnect();
  } catch {
    /* already stopped */
  }

  ambientNodes = null;
}

function playSound(name) {
  const sounds = {
    approve: () => playTone(660, 0.1, "sine", 0.07),
    deny: () => playTone(220, 0.14, "square", 0.05),
    escalate: () => {
      playTone(440, 0.08, "sine", 0.06);
      setTimeout(() => playTone(550, 0.08, "sine", 0.06), 90);
      setTimeout(() => playTone(660, 0.1, "sine", 0.06), 180);
    },
    stamp: () => playTone(120, 0.06, "triangle", 0.1),
    panic: () => {
      playTone(880, 0.08, "sawtooth", 0.06);
      setTimeout(() => playTone(740, 0.08, "sawtooth", 0.06), 100);
      setTimeout(() => playTone(620, 0.1, "sawtooth", 0.06), 200);
    },
    scan: () => {
      playTone(520, 0.05, "sine", 0.05);
      setTimeout(() => playTone(780, 0.07, "sine", 0.05), 70);
    },
    coffee: () => playTone(300, 0.18, "triangle", 0.06),
    hotline: () => {
      playTone(480, 0.12, "sine", 0.06);
      setTimeout(() => playTone(480, 0.12, "sine", 0.06), 200);
    },
    click: () => playTone(400, 0.04, "sine", 0.04)
  };

  if (sounds[name]) sounds[name]();
}

function computeScore() {
  return Math.max(0, state.stamps * 12 + state.morale - state.chaos + Math.floor(state.forms / 2));
}

function computeVerdict() {
  if (state.chaos >= 85) return "The city survived, but only out of spite.";
  if (state.morale >= 80 && state.chaos <= 45) return "A triumph of laminated calm.";
  if (state.forms >= 75) return "Paperwork prevailed. Justice took a number.";
  if (state.stamps >= 10) return "Stamp output heroic. Bureau morale cautiously optimistic.";
  if (state.morale < 35) return "Morale filed for early retirement.";
  return "Shift closed with administratively acceptable ambiguity.";
}

function awardBadges() {
  const earned = new Set(state.badges);

  if (state.stamps >= 1) earned.add("First stamp");
  if (state.coffee >= 3) earned.add("Caffeine liaison");
  if (state.chaos >= 80) earned.add("Chaos enjoyer");
  if (state.morale >= 75) earned.add("Morale gardener");
  if (state.forms >= 70) earned.add("Form archivist");
  if (state.stamps >= state.shiftQueue.length) earned.add("Full queue clerk");

  state.badges = [...earned];
}

function setShiftControlsEnabled(enabled) {
  els.actionButtons.forEach((button) => {
    button.disabled = !enabled;
  });
  els.scanButton.disabled = !enabled;
  els.coffeeButton.disabled = !enabled;
  els.hotlineButton.disabled = !enabled;
}

function updateDailyUI() {
  const isDaily = state.shiftMode === "daily";
  els.dailyDeskButton.classList.toggle("is-active", isDaily);
  els.dailyLabel.hidden = !isDaily;
  if (isDaily) {
    els.dailyLabel.textContent = `Daily Challenge — ${dailyDateLabel()}`;
  }
}

function saveShiftState() {
  if (state.shiftEnded) return;

  try {
    const payload = {
      savedAt: Date.now(),
      index: state.index,
      chaos: state.chaos,
      morale: state.morale,
      forms: state.forms,
      coffee: state.coffee,
      stamps: state.stamps,
      history: state.history,
      badges: state.badges,
      shiftLog: state.shiftLog,
      shiftQueue: state.shiftQueue,
      shiftMode: state.shiftMode,
      certificateText: state.certificateText,
      shiftStart: state.shiftStart.toISOString()
    };
    localStorage.setItem(SHIFT_STATE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable */
  }
}

function loadShiftState() {
  try {
    const raw = localStorage.getItem(SHIFT_STATE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw);
    if (!saved.savedAt || Date.now() - saved.savedAt > SHIFT_MAX_AGE_MS) {
      clearShiftState();
      return null;
    }

    return saved;
  } catch {
    return null;
  }
}

function clearShiftState() {
  try {
    localStorage.removeItem(SHIFT_STATE_KEY);
  } catch {
    /* storage unavailable */
  }
}

function restoreShiftState(saved) {
  state.index = saved.index;
  state.chaos = saved.chaos;
  state.morale = saved.morale;
  state.forms = saved.forms;
  state.coffee = saved.coffee || 0;
  state.stamps = saved.stamps;
  state.history = saved.history || [];
  state.badges = saved.badges || [];
  state.shiftLog = saved.shiftLog || [];
  state.shiftQueue = saved.shiftQueue || buildShiftQueue(saved.shiftMode || "normal");
  state.shiftMode = saved.shiftMode || "normal";
  state.certificateText = saved.certificateText || "";
  state.shiftStart = saved.shiftStart ? new Date(saved.shiftStart) : new Date();
  state.shiftEnded = state.index >= state.shiftQueue.length;
  state.verdict = state.shiftEnded ? computeVerdict() : "";

  updateDailyUI();
  setShiftControlsEnabled(!state.shiftEnded);
  renderStats();
  renderCase();
  restoreActivityLog();
  if (state.shiftEnded) {
    showShiftEnd();
  } else {
    els.shiftEndPanel.hidden = true;
  }
}

function restoreActivityLog() {
  els.log.innerHTML = "";
  const recent = [...state.history].slice(-4).reverse();
  recent.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    els.log.appendChild(li);
  });
  if (recent.length === 0) {
    addLog("Desk reopened. Suspicion level: administratively acceptable.");
  }
}

function startShift(mode = "normal") {
  state.index = 0;
  state.chaos = 42;
  state.morale = 61;
  state.forms = 18;
  state.coffee = 0;
  state.stamps = 0;
  state.shiftLog = [];
  state.history = [];
  state.badges = [];
  state.shiftQueue = buildShiftQueue(mode);
  state.shiftMode = mode;
  state.shiftEnded = false;
  state.verdict = "";
  state.certificateText = "";
  state.shiftStart = new Date();

  clearShiftState();
  updateDailyUI();
  setShiftControlsEnabled(true);
  els.shiftEndPanel.hidden = true;
  els.log.innerHTML = "";
  renderStats();
  renderCase();
  addLog(mode === "daily" ? "Daily desk opened. Fate has been seeded." : "Desk opened. Suspicion level: administratively acceptable.");
  els.ticker.textContent = "Awaiting paperwork weather.";
  renderCertificate("Pending Stamp", "No nonsense has been certified yet.", "Choose a decision and the bureau will manufacture confidence.");
}

function renderCase() {
  const item = currentCase();

  if (!item) {
    els.caseTitle.textContent = "Shift queue empty";
    els.caseSummary.textContent = "All cases filed. Review your certificate and share the verdict.";
    els.caseCitizen.textContent = "-";
    els.caseEvidence.textContent = "-";
    els.riskFill.style.width = "0%";
    els.riskLabel.textContent = "-";
    renderQueue();
    return;
  }

  els.caseNumber.textContent = `CASE ${String(state.index + 1).padStart(4, "0")}`;
  els.caseTitle.textContent = item.title;
  els.caseSummary.textContent = item.summary;
  els.caseCitizen.textContent = item.citizen;
  els.caseEvidence.textContent = item.evidence;
  els.riskFill.style.width = `${item.risk}%`;
  els.riskLabel.textContent = riskName(item.risk);
  renderQueue();
}

function riskName(value) {
  if (value >= 78) return "Banana-peel serious";
  if (value >= 62) return "Noticeably wobbly";
  if (value >= 46) return "Medium spicy";
  return "Mostly paperwork";
}

function renderStats() {
  els.chaos.textContent = state.chaos;
  els.morale.textContent = state.morale;
  els.forms.textContent = state.forms;
  els.rankBadge.textContent = rankName();
}

function rankName() {
  if (state.stamps >= 10 && state.morale > 70) return "Director of Calm";
  if (state.stamps >= 7) return "Senior Stamp Wizard";
  if (state.forms >= 70) return "Paperwork Baron";
  if (state.chaos >= 80) return "Emergency Intern";
  if (state.stamps >= 3) return "Certified Desk Captain";
  return "Clerk Grade C";
}

function renderQueue() {
  els.queue.innerHTML = "";

  for (let i = 1; i <= 4; i += 1) {
    const item = queueCaseAt(i);
    const card = document.createElement("article");
    card.className = "queue-card";
    card.dataset.tone = tones[(state.index + i) % tones.length];

    if (!item) {
      card.innerHTML = `<strong>Queue clear</strong><span>Awaiting next shift</span>`;
    } else {
      card.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.citizen} | ${riskName(item.risk)}</span>
      `;
    }

    els.queue.appendChild(card);
  }
}

function decide(action) {
  if (state.shiftEnded) return;

  const item = currentCase();
  if (!item) return;

  const tone = actionTone[action];
  state.chaos = clamp(state.chaos + tone.chaos + randomInt(-3, 3), 0, 99);
  state.morale = clamp(state.morale + tone.morale + randomInt(-2, 4), 0, 99);
  state.forms = clamp(state.forms + tone.forms + randomInt(0, 4), 0, 99);
  state.stamps += 1;

  const result = item[action];
  state.certificateText = [
    `${tone.label}: ${item.title}`,
    result,
    `Bureau reading: chaos ${state.chaos}, morale ${state.morale}, forms ${state.forms}.`
  ].join("\n");

  const logLine = `${tone.label} case ${String(state.index + 1).padStart(4, "0")}: ${shorten(item.title, 42)}`;

  state.shiftLog.push({
    type: "decision",
    action: tone.label,
    title: item.title,
    caseNum: state.index + 1,
    time: new Date()
  });
  state.history.push(logLine);

  renderCertificate(tone.label, item.title, result);
  addLog(logLine);
  els.ticker.textContent = tickerFor(action, item.title);
  pulseStamp();
  spawnPapers(action);
  playSound(action);
  playSound("stamp");

  awardBadges();
  state.index += 1;
  renderStats();

  if (state.index >= state.shiftQueue.length) {
    endShift();
  } else {
    saveShiftState();
    renderCase();
  }
}

function endShift() {
  state.shiftEnded = true;
  state.verdict = computeVerdict();
  awardBadges();
  clearShiftState();
  setShiftControlsEnabled(false);
  showShiftEnd();
  saveDailyBest();
  submitLeaderboardScore();
  renderLeaderboard();
  addLog(`Shift complete: ${state.verdict}`);
  els.ticker.textContent = `Shift closed — ${state.verdict}`;
}

function showShiftEnd() {
  els.shiftEndPanel.hidden = false;
  els.shiftVerdict.textContent = `${state.verdict} Rank: ${rankName()}. Stamps: ${state.stamps}. Score: ${computeScore()}.`;
  renderCase();
}

function saveDailyBest() {
  if (state.shiftMode !== "daily") return;

  const key = todayKey();
  const score = computeScore();

  try {
    const raw = localStorage.getItem(DAILY_BEST_KEY);
    const bests = raw ? JSON.parse(raw) : {};
    if (!bests[key] || score > bests[key].score) {
      bests[key] = {
        score,
        rank: rankName(),
        stamps: state.stamps,
        verdict: state.verdict,
        savedAt: Date.now()
      };
      localStorage.setItem(DAILY_BEST_KEY, JSON.stringify(bests));
      addLog(`New daily best: ${score} points.`);
    }
  } catch {
    /* storage unavailable */
  }
}

function shareText() {
  const badgeLine = state.badges.length ? `Badges: ${state.badges.join(", ")}.` : "";
  return [
    "Bureau of Tiny Emergencies",
    `Rank: ${rankName()}`,
    `Stamps: ${state.stamps}`,
    `Verdict: ${state.verdict || computeVerdict()}`,
    `Score: ${computeScore()}`,
    badgeLine
  ]
    .filter(Boolean)
    .join("\n");
}

async function shareShift() {
  const text = shareText();

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Bureau of Tiny Emergencies — Shift Report",
        text
      });
      addLog("Shift shared via device share sheet.");
      playSound("click");
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  await copyText(text, "Shift score copied to clipboard.");
  playSound("click");
}

function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LOCAL_LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalLeaderboardEntry(entry) {
  try {
    const list = getLocalLeaderboard();
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    /* storage unavailable */
  }
}

function isSupabaseEnabled() {
  const config = window.BUREAU_CONFIG || {};
  return Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY);
}

async function submitLeaderboardScore() {
  const entry = {
    player_name: "Anonymous Clerk",
    rank_title: rankName(),
    stamps: state.stamps,
    chaos: state.chaos,
    morale: state.morale,
    forms: state.forms,
    verdict: state.verdict,
    mode: state.shiftMode,
    score: computeScore(),
    created_at: new Date().toISOString()
  };

  saveLocalLeaderboardEntry(entry);

  if (!isSupabaseEnabled()) return;

  const config = window.BUREAU_CONFIG;

  try {
    const response = await fetch(`${config.SUPABASE_URL}/rest/v1/leaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal"
      },
      body: JSON.stringify(entry)
    });

    if (!response.ok) throw new Error("Leaderboard POST failed");
    addLog("Score filed with the Hall of clerks (remote).");
  } catch {
    addLog("Remote leaderboard unavailable. Score saved locally.");
  }
}

async function fetchRemoteLeaderboard() {
  if (!isSupabaseEnabled()) return null;

  const config = window.BUREAU_CONFIG;

  try {
    const response = await fetch(
      `${config.SUPABASE_URL}/rest/v1/leaderboard?select=player_name,rank_title,stamps,score,verdict,mode&order=score.desc,created_at.desc&limit=5`,
      {
        headers: {
          apikey: config.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${config.SUPABASE_ANON_KEY}`
        }
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function renderLeaderboard() {
  const remote = await fetchRemoteLeaderboard();
  const entries = remote && remote.length ? remote : getLocalLeaderboard().slice(0, 5);

  els.leaderboardList.innerHTML = "";

  if (!entries.length) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="clerk-name">No scores yet</span><span class="clerk-meta">Complete a shift to appear here</span>`;
    els.leaderboardList.appendChild(li);
    return;
  }

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <span class="clerk-name">${entry.player_name || "Anonymous Clerk"}</span>
        <span class="clerk-meta">${entry.rank_title} · ${entry.stamps} stamps · ${entry.mode || "normal"}</span>
      </span>
      <span class="clerk-score">${entry.score}</span>
    `;
    els.leaderboardList.appendChild(li);
  });
}

function tickerFor(action, title) {
  const endings = {
    approve: "Confidence manufactured. Please enjoy your regulation calm.",
    deny: "Request rejected. The inbox has been asked to breathe.",
    escalate: "Higher authority notified. Higher authority has hidden under a binder."
  };
  return `${title}: ${endings[action]}`;
}

function renderCertificate(kicker, title, body) {
  els.certificate.innerHTML = `
    <p class="cert-kicker">${kicker}</p>
    <p class="cert-title">${title}</p>
    <p class="cert-body">${body}</p>
  `;
}

function addLog(message) {
  const li = document.createElement("li");
  li.textContent = message;
  els.log.prepend(li);
  state.history.push(message);

  while (els.log.children.length > 4) {
    els.log.removeChild(els.log.lastElementChild);
  }
}

function pulseStamp() {
  if (state.settings.reducedMotion) {
    els.stampFlash.classList.add("is-visible");
    setTimeout(() => els.stampFlash.classList.remove("is-visible"), 400);
    return;
  }

  els.stampPad.classList.remove("is-thumping");
  els.stampFlash.classList.remove("is-visible");

  requestAnimationFrame(() => {
    els.stampPad.classList.add("is-thumping");
    els.stampFlash.classList.add("is-visible");
  });
}

function shorten(value, max) {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnPapers(action) {
  const amount = action === "escalate" ? 38 : action === "approve" ? 26 : 20;
  const color = action === "approve" ? "#39b78f" : action === "deny" ? "#f05f4b" : "#f8c94a";

  for (let i = 0; i < amount; i += 1) {
    state.particles.push({
      x: els.canvas.width * (0.18 + Math.random() * 0.64),
      y: els.canvas.height * (0.16 + Math.random() * 0.12),
      vx: randomInt(-180, 180) / 100,
      vy: randomInt(-130, 20) / 100,
      spin: Math.random() * 0.2 - 0.1,
      angle: Math.random() * Math.PI,
      life: 140 + randomInt(0, 90),
      color
    });
  }
}

function scanCase() {
  if (state.shiftEnded) return;

  const item = currentCase();
  if (!item) return;

  const clue = scanClues[randomInt(0, scanClues.length - 1)];
  state.chaos = clamp(state.chaos + randomInt(-2, 3), 0, 99);
  state.forms = clamp(state.forms + randomInt(1, 4), 0, 99);

  state.shiftLog.push({
    type: "scan",
    title: item.title,
    caseNum: state.index + 1,
    time: new Date()
  });

  els.ticker.textContent = `${item.title}: ${clue}`;
  addLog(`Scanned case ${String(state.index + 1).padStart(4, "0")}: new clue logged.`);
  playSound("scan");
  renderStats();
}

function coffeeBreak() {
  if (state.shiftEnded) return;

  state.morale = clamp(state.morale + randomInt(4, 9), 0, 99);
  state.chaos = clamp(state.chaos + randomInt(-4, 2), 0, 99);
  state.coffee += 1;

  state.shiftLog.push({ type: "coffee", time: new Date() });
  awardBadges();

  const messages = [
    "Coffee break accepted. Morale steeping nicely.",
    "Bureau coffee consumed. The desk feels 12% more heroic.",
    "Caffeine protocol complete. Paperwork appears friendlier.",
    "Break room blend deployed. Chaos temporarily demoted."
  ];

  els.ticker.textContent = messages[randomInt(0, messages.length - 1)];
  addLog("Coffee break: morale adjusted with artisanal urgency.");
  playSound("coffee");
  renderStats();
}

function callHotline() {
  if (state.shiftEnded) return;

  const advice = hotlineAdvice[randomInt(0, hotlineAdvice.length - 1)];
  state.morale = clamp(state.morale + randomInt(-1, 5), 0, 99);
  state.forms = clamp(state.forms + randomInt(0, 3), 0, 99);

  state.shiftLog.push({ type: "hotline", time: new Date() });

  els.ticker.textContent = advice;
  addLog("Hotline consulted: wisdom received, partially understood.");
  playSound("hotline");
  renderStats();
}

function panic() {
  if (state.shiftEnded) return;

  state.chaos = clamp(state.chaos + randomInt(7, 14), 0, 99);
  state.morale = clamp(state.morale + randomInt(-6, 5), 0, 99);
  state.forms = clamp(state.forms + randomInt(2, 11), 0, 99);
  state.certificateText = "Panic lever pulled. The bureau has converted fear into laminated urgency.";
  state.shiftLog.push({ type: "panic", time: new Date() });

  renderCertificate("Panic Lever", "Manual alarm accepted", "The city briefly reconsidered its priorities.");
  addLog("Panic lever pulled: laminated urgency increased.");
  els.ticker.textContent = "Manual alarm accepted. Everyone now looks busy, which is half the battle.";
  renderStats();
  pulseStamp();
  spawnPapers("escalate");
  playSound("panic");
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    addLog(successMessage);
    return true;
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "fixed";
    fallback.style.left = "-999px";
    document.body.appendChild(fallback);
    fallback.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    fallback.remove();
    addLog(
      copied
        ? `${successMessage} (backup clipboard magic)`
        : "Clipboard blocked. Content remains visually official."
    );
    return copied;
  }
}

async function copyCertificate() {
  const text = state.certificateText || "No certificate yet. The bureau remains suspiciously quiet.";
  await copyText(text, "Certificate copied to clipboard.");
}

function buildShiftMarkdown() {
  const now = new Date();
  const duration = Math.round((now - state.shiftStart) / 60000);
  const decisions = state.shiftLog.filter((entry) => entry.type === "decision");

  const lines = [
    "# Bureau of Tiny Emergencies — Shift Summary",
    "",
    `**Date:** ${now.toLocaleDateString()}`,
    `**Shift duration:** ~${duration} minute${duration === 1 ? "" : "s"}`,
    `**Final rank:** ${rankName()}`,
    `**Verdict:** ${state.verdict || computeVerdict()}`,
    `**Score:** ${computeScore()}`,
    "",
    "## Stats",
    "",
    `| Metric | Value |`,
    `|--------|-------|`,
    `| Chaos | ${state.chaos} |`,
    `| Morale | ${state.morale} |`,
    `| Forms | ${state.forms} |`,
    `| Coffee breaks | ${state.coffee} |`,
    `| Stamps issued | ${state.stamps} |`,
    "",
    "## Decisions",
    ""
  ];

  if (decisions.length === 0) {
    lines.push("_No cases decided yet. The desk remains suspiciously pristine._");
  } else {
    decisions.forEach((entry, i) => {
      lines.push(`${i + 1}. **${entry.action}** — ${entry.title} (Case ${String(entry.caseNum).padStart(4, "0")})`);
    });
  }

  if (state.badges.length) {
    lines.push("", "## Badges", "", state.badges.map((b) => `- ${b}`).join("\n"));
  }

  const utilities = state.shiftLog.filter((e) => e.type !== "decision");
  if (utilities.length > 0) {
    lines.push("", "## Desk activity", "");
    const counts = {};
    utilities.forEach((e) => {
      counts[e.type] = (counts[e.type] || 0) + 1;
    });
    Object.entries(counts).forEach(([type, count]) => {
      lines.push(`- ${type}: ${count}`);
    });
  }

  lines.push("", "---", "_Generated by the Bureau of Tiny Emergencies_");
  return lines.join("\n");
}

async function exportShift() {
  const markdown = buildShiftMarkdown();
  await copyText(markdown, "Shift summary copied to clipboard.");
  playSound("click");
}

function openDrawer() {
  els.settingsDrawer.hidden = false;
  els.settingReducedMotion.focus();
}

function closeDrawer() {
  els.settingsDrawer.hidden = true;
  els.settingsButton.focus();
}

function openModal(modal) {
  modal.hidden = false;
  const focusTarget = modal.querySelector("button, [href], input");
  if (focusTarget) focusTarget.focus();
}

function closeModal(modal) {
  modal.hidden = true;
}

function closeAllOverlays() {
  closeDrawer();
  closeModal(els.helpModal);
  closeModal(els.tutorialModal);
  closeModal(els.resumeModal);
}

function showTutorialIfNeeded() {
  if (!pendingInit) return;

  try {
    if (!localStorage.getItem(TUTORIAL_KEY)) {
      openModal(els.tutorialModal);
      return;
    }
  } catch {
    openModal(els.tutorialModal);
    return;
  }

  finalizeInit();
}

function dismissTutorial() {
  try {
    localStorage.setItem(TUTORIAL_KEY, "1");
  } catch {
    /* storage unavailable */
  }
  closeModal(els.tutorialModal);
  finalizeInit();
}

function offerResumeShift() {
  const saved = loadShiftState();
  if (!saved) {
    pendingInit = true;
    startShift("normal");
    showTutorialIfNeeded();
    return;
  }

  const savedDate = new Date(saved.savedAt).toLocaleString();
  els.resumeSummary.textContent = `Case ${saved.index + 1} of ${saved.shiftQueue.length}, ${saved.stamps} stamps, saved ${savedDate}.`;
  openModal(els.resumeModal);
}

function resumeSavedShift() {
  const saved = loadShiftState();
  closeModal(els.resumeModal);
  pendingInit = true;

  if (saved) {
    restoreShiftState(saved);
  } else {
    startShift("normal");
  }

  showTutorialIfNeeded();
}

function discardSavedShift() {
  clearShiftState();
  closeModal(els.resumeModal);
  pendingInit = true;
  startShift("normal");
  showTutorialIfNeeded();
}

function finalizeInit() {
  pendingInit = false;
  renderLeaderboard();
}

function initSwipeControls() {
  if (!els.casePanel) return;

  let startX = 0;
  let startY = 0;
  let tracking = false;
  const threshold = 56;

  els.casePanel.addEventListener(
    "touchstart",
    (event) => {
      if (state.shiftEnded || event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      tracking = true;
      els.casePanel.classList.add("is-swiping");
    },
    { passive: true }
  );

  els.casePanel.addEventListener(
    "touchmove",
    (event) => {
      if (!tracking) return;
      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) return;

      els.casePanel.classList.remove("swipe-approve", "swipe-deny");
      if (dx > 20) els.casePanel.classList.add("swipe-approve");
      if (dx < -20) els.casePanel.classList.add("swipe-deny");
    },
    { passive: true }
  );

  const endSwipe = (event) => {
    if (!tracking) return;
    tracking = false;

    const point = event.changedTouches ? event.changedTouches[0] : null;
    if (!point) return;

    const dx = point.clientX - startX;
    const dy = point.clientY - startY;

    els.casePanel.classList.remove("is-swiping", "swipe-approve", "swipe-deny");

    if (Math.abs(dx) < threshold || Math.abs(dy) > Math.abs(dx)) return;

    if (dx > 0) {
      decide("approve");
    } else {
      decide("deny");
    }
  };

  els.casePanel.addEventListener("touchend", endSwipe, { passive: true });
  els.casePanel.addEventListener("touchcancel", endSwipe, { passive: true });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* offline support unavailable */
    });
  });
}

function handleKeyboard(event) {
  if (isTypingInInput()) return;

  const key = event.key.toLowerCase();

  if (key === "escape") {
    closeAllOverlays();
    return;
  }

  if (!els.settingsDrawer.hidden || !els.helpModal.hidden || !els.resumeModal.hidden) {
    if (key === "?") {
      event.preventDefault();
      closeDrawer();
      openModal(els.helpModal);
    }
    return;
  }

  if (!els.tutorialModal.hidden) return;

  const shortcuts = {
    a: () => decide("approve"),
    d: () => decide("deny"),
    e: () => decide("escalate"),
    s: () => scanCase(),
    c: () => coffeeBreak(),
    h: () => callHotline(),
    p: () => panic(),
    "?": () => openModal(els.helpModal)
  };

  if (shortcuts[key]) {
    event.preventDefault();
    shortcuts[key]();
  }
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = els.canvas.getBoundingClientRect();
  els.canvas.width = Math.max(320, Math.floor(rect.width * ratio));
  els.canvas.height = Math.max(260, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createBuildings(rect.width, rect.height);
}

function createBuildings(width, height) {
  const count = Math.max(9, Math.floor(width / 70));
  state.buildings = Array.from({ length: count }, (_, index) => {
    const w = width / count;
    const buildingHeight = height * (0.25 + Math.random() * 0.33);
    return {
      x: index * w + 4,
      y: height - buildingHeight - 34,
      width: w - 8,
      height: buildingHeight,
      color: ["#3f7ad6", "#7350a8", "#39b78f", "#f05f4b"][index % 4],
      windows: randomInt(3, 7)
    };
  });
}

function drawCity() {
  const rect = els.canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const reduced = state.settings.reducedMotion;
  state.tick += reduced ? 0.004 : 0.016;

  ctx.clearRect(0, 0, width, height);
  drawSky(width, height, reduced);
  drawCloudMachine(width, height, reduced);
  drawBuildings(width, height, reduced);
  drawRoad(width, height, reduced);
  drawParticles(width, height);
  requestAnimationFrame(drawCity);
}

function drawSky(width, height, reduced) {
  const wobble = reduced ? 0 : Math.sin(state.tick * 0.9) * 10;
  ctx.fillStyle = document.body.classList.contains("dark-desk") ? "#1a2a3a" : "#b8d9e7";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 248, 236, 0.82)";
  for (let i = 0; i < 7; i += 1) {
    const speed = reduced ? 4 : 18;
    const x = ((state.tick * speed + i * 150) % (width + 180)) - 120;
    const y = 48 + ((i * 37) % 120) + wobble * (i % 2 ? -0.25 : 0.25);
    cloud(x, y, 42 + (i % 3) * 12);
  }

  ctx.fillStyle = "#f8c94a";
  ctx.beginPath();
  ctx.arc(width - 86, 72, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#231f20";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function cloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size * 0.42, 0, Math.PI * 2);
  ctx.arc(x + size * 0.32, y - size * 0.18, size * 0.45, 0, Math.PI * 2);
  ctx.arc(x + size * 0.68, y, size * 0.38, 0, Math.PI * 2);
  ctx.rect(x - size * 0.35, y, size * 1.2, size * 0.36);
  ctx.fill();
}

function drawCloudMachine(width, height, reduced) {
  const x = 50 + (reduced ? 0 : Math.sin(state.tick * 0.8) * 24);
  const y = 60 + (reduced ? 0 : Math.cos(state.tick * 0.6) * 10);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(reduced ? 0 : Math.sin(state.tick) * 0.04);
  ctx.fillStyle = "#fff8ec";
  ctx.strokeStyle = "#231f20";
  ctx.lineWidth = 3;
  roundRect(-8, -16, 155, 58, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f05f4b";
  roundRect(18, -5, 82, 17, 4);
  ctx.fill();
  ctx.fillStyle = "#10141f";
  ctx.font = "800 11px Inter, sans-serif";
  ctx.fillText("FORM CLOUD", 24, 8);

  ctx.beginPath();
  ctx.moveTo(142, 2);
  ctx.lineTo(184, 20);
  ctx.lineTo(141, 34);
  ctx.closePath();
  ctx.fillStyle = "#39b78f";
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  if (!reduced) {
    for (let i = 0; i < 8; i += 1) {
      const px = (x + 178 + i * 54 + state.tick * 58) % (width + 100);
      const py = y + 35 + Math.sin(state.tick * 2 + i) * 8;
      drawPaper(px, py, 15, "#fffdf7", state.tick + i);
    }
  }

  ctx.fillStyle = "rgba(16, 20, 31, 0.13)";
  ctx.fillRect(0, height - 35, width, 35);
}

function drawBuildings(width, height, reduced) {
  state.buildings.forEach((building, index) => {
    const pressure = state.chaos / 99;
    const shake = reduced ? 0 : Math.sin(state.tick * 4 + index) * pressure * 3;
    const x = building.x + shake;

    ctx.fillStyle = building.color;
    ctx.strokeStyle = "#231f20";
    ctx.lineWidth = 3;
    roundRect(x, building.y, building.width, building.height, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fff8ec";
    const cols = Math.max(2, Math.floor(building.width / 24));
    const rows = Math.max(2, Math.floor(building.height / 30));
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if ((r + c + index + Math.floor(state.tick * (reduced ? 0.5 : 2))) % 5 === 0) continue;
        ctx.fillRect(x + 10 + c * 22, building.y + 14 + r * 26, 10, 12);
      }
    }

    ctx.fillStyle = "#10141f";
    ctx.fillRect(x + building.width * 0.42, building.y + building.height - 28, building.width * 0.18, 28);
  });
}

function drawRoad(width, height, reduced) {
  const roadY = height - 42;
  ctx.fillStyle = "#574b45";
  ctx.fillRect(0, roadY, width, 42);
  ctx.strokeStyle = "#231f20";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, roadY);
  ctx.lineTo(width, roadY);
  ctx.stroke();

  ctx.fillStyle = "#f8c94a";
  const dashOffset = reduced ? 0 : (state.tick * 80) % 80;
  for (let x = -40 + dashOffset; x < width; x += 80) {
    ctx.fillRect(x, roadY + 19, 34, 5);
  }

  const truckX = reduced ? width * 0.3 : ((state.tick * 74) % (width + 220)) - 180;
  drawTruck(truckX, roadY - 28);
}

function drawTruck(x, y) {
  ctx.fillStyle = "#fff8ec";
  ctx.strokeStyle = "#231f20";
  ctx.lineWidth = 3;
  roundRect(x, y, 116, 35, 5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f05f4b";
  ctx.fillRect(x + 12, y + 8, 58, 8);
  ctx.fillStyle = "#10141f";
  ctx.font = "900 10px Inter, sans-serif";
  ctx.fillText("URGENTISH", x + 13, y + 29);

  ctx.fillStyle = "#3f7ad6";
  roundRect(x + 82, y + 7, 24, 18, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#10141f";
  ctx.beginPath();
  ctx.arc(x + 24, y + 37, 8, 0, Math.PI * 2);
  ctx.arc(x + 92, y + 37, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticles(width, height) {
  state.particles = state.particles.filter((paper) => paper.life > 0);

  state.particles.forEach((paper) => {
    paper.life -= 1;
    paper.x += paper.vx * 2.2;
    paper.y += paper.vy * 2.2;
    paper.vy += 0.028;
    paper.angle += paper.spin;

    if (paper.y > height - 50) {
      paper.y = height - 50;
      paper.vy *= -0.35;
      paper.vx *= 0.86;
    }

    drawPaper(paper.x, paper.y, 18, paper.color, paper.angle);
  });
}

function drawPaper(x, y, size, color, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#231f20";
  ctx.lineWidth = 2;
  ctx.fillRect(-size / 2, -size / 2, size, size * 0.72);
  ctx.strokeRect(-size / 2, -size / 2, size, size * 0.72);
  ctx.restore();
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/* Event listeners */
els.actionButtons.forEach((button) => {
  button.addEventListener("click", () => decide(button.dataset.action));
});

els.panicButton.addEventListener("click", panic);
els.copyButton.addEventListener("click", copyCertificate);
els.scanButton.addEventListener("click", scanCase);
els.coffeeButton.addEventListener("click", coffeeBreak);
els.hotlineButton.addEventListener("click", callHotline);
els.exportShiftButton.addEventListener("click", exportShift);
els.shareShiftButton.addEventListener("click", shareShift);
els.newShiftButton.addEventListener("click", () => startShift(state.shiftMode));
els.dailyDeskButton.addEventListener("click", () => {
  if (!state.shiftEnded && state.stamps > 0) {
    const proceed = window.confirm("Start today's daily desk? Current shift progress will be lost.");
    if (!proceed) return;
  }
  startShift("daily");
});

els.settingsButton.addEventListener("click", openDrawer);
els.settingsDrawer.querySelectorAll("[data-close-drawer]").forEach((el) => {
  el.addEventListener("click", closeDrawer);
});

els.settingReducedMotion.addEventListener("change", (e) => {
  state.settings.reducedMotion = e.target.checked;
  saveSettings();
  applySettings();
});

els.settingDarkDesk.addEventListener("change", (e) => {
  state.settings.darkDesk = e.target.checked;
  saveSettings();
  applySettings();
});

els.settingSoundEffects.addEventListener("change", (e) => {
  state.settings.soundEffects = e.target.checked;
  saveSettings();
  applySettings();
  if (e.target.checked) playSound("click");
});

els.settingAmbientAudio.addEventListener("change", (e) => {
  state.settings.ambientAudio = e.target.checked;
  saveSettings();
  applySettings();
});

els.helpButton.addEventListener("click", () => openModal(els.helpModal));
els.tutorialDismiss.addEventListener("click", dismissTutorial);
els.resumeShiftButton.addEventListener("click", resumeSavedShift);
els.discardShiftButton.addEventListener("click", discardSavedShift);

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", () => {
    const target = el.dataset.closeModal;
    if (target === "tutorial") {
      dismissTutorial();
    } else if (target === "help") {
      closeModal(els.helpModal);
    }
  });
});

document.addEventListener("keydown", handleKeyboard);
window.addEventListener("resize", resizeCanvas);

/* Init */
registerServiceWorker();
initSwipeControls();
loadSettings();
applySettings();
resizeCanvas();
requestAnimationFrame(drawCity);
offerResumeShift();