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
  }
];

const tones = ["mint", "coral", "gold", "blue"];
const actionTone = {
  approve: { chaos: -8, morale: 6, forms: 7, label: "Approved" },
  deny: { chaos: 5, morale: -4, forms: -3, label: "Denied" },
  escalate: { chaos: 10, morale: 2, forms: 12, label: "Escalated" }
};

const state = {
  index: 0,
  chaos: 42,
  morale: 61,
  forms: 18,
  stamps: 0,
  particles: [],
  buildings: [],
  tick: 0,
  certificateText: ""
};

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
  canvas: document.querySelector("#cityCanvas")
};

const ctx = els.canvas.getContext("2d");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function nextCaseIndex(offset = 0) {
  return (state.index + offset + cases.length) % cases.length;
}

function currentCase() {
  return cases[state.index];
}

function renderCase() {
  const item = currentCase();
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
    const item = cases[nextCaseIndex(i)];
    const card = document.createElement("article");
    card.className = "queue-card";
    card.dataset.tone = tones[(state.index + i) % tones.length];
    card.innerHTML = `
      <strong>${item.title}</strong>
      <span>${item.citizen} | ${riskName(item.risk)}</span>
    `;
    els.queue.appendChild(card);
  }
}

function decide(action) {
  const item = currentCase();
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

  renderCertificate(tone.label, item.title, result);
  addLog(`${tone.label} case ${String(state.index + 1).padStart(4, "0")}: ${shorten(item.title, 42)}`);
  els.ticker.textContent = tickerFor(action, item.title);
  pulseStamp();
  spawnPapers(action);

  state.index = nextCaseIndex(1);
  renderStats();
  renderCase();
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

  while (els.log.children.length > 4) {
    els.log.removeChild(els.log.lastElementChild);
  }
}

function pulseStamp() {
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

function panic() {
  state.chaos = clamp(state.chaos + randomInt(7, 14), 0, 99);
  state.morale = clamp(state.morale + randomInt(-6, 5), 0, 99);
  state.forms = clamp(state.forms + randomInt(2, 11), 0, 99);
  state.certificateText = "Panic lever pulled. The bureau has converted fear into laminated urgency.";
  renderCertificate("Panic Lever", "Manual alarm accepted", "The city briefly reconsidered its priorities.");
  addLog("Panic lever pulled: laminated urgency increased.");
  els.ticker.textContent = "Manual alarm accepted. Everyone now looks busy, which is half the battle.";
  renderStats();
  pulseStamp();
  spawnPapers("escalate");
}

async function copyCertificate() {
  const text = state.certificateText || "No certificate yet. The bureau remains suspiciously quiet.";

  try {
    await navigator.clipboard.writeText(text);
    addLog("Certificate copied to clipboard.");
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
    addLog(copied ? "Certificate copied with backup clipboard magic." : "Clipboard blocked. Certificate remains visually official.");
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
  state.tick += 0.016;

  ctx.clearRect(0, 0, width, height);
  drawSky(width, height);
  drawCloudMachine(width, height);
  drawBuildings(width, height);
  drawRoad(width, height);
  drawParticles(width, height);
  requestAnimationFrame(drawCity);
}

function drawSky(width, height) {
  const wobble = Math.sin(state.tick * 0.9) * 10;
  ctx.fillStyle = "#b8d9e7";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 248, 236, 0.82)";
  for (let i = 0; i < 7; i += 1) {
    const x = ((state.tick * 18 + i * 150) % (width + 180)) - 120;
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

function drawCloudMachine(width, height) {
  const x = 50 + Math.sin(state.tick * 0.8) * 24;
  const y = 60 + Math.cos(state.tick * 0.6) * 10;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(state.tick) * 0.04);
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

  for (let i = 0; i < 8; i += 1) {
    const px = (x + 178 + i * 54 + state.tick * 58) % (width + 100);
    const py = y + 35 + Math.sin(state.tick * 2 + i) * 8;
    drawPaper(px, py, 15, "#fffdf7", state.tick + i);
  }

  ctx.fillStyle = "rgba(16, 20, 31, 0.13)";
  ctx.fillRect(0, height - 35, width, 35);
}

function drawBuildings(width, height) {
  state.buildings.forEach((building, index) => {
    const pressure = state.chaos / 99;
    const shake = Math.sin(state.tick * 4 + index) * pressure * 3;
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
        if ((r + c + index + Math.floor(state.tick * 2)) % 5 === 0) continue;
        ctx.fillRect(x + 10 + c * 22, building.y + 14 + r * 26, 10, 12);
      }
    }

    ctx.fillStyle = "#10141f";
    ctx.fillRect(x + building.width * 0.42, building.y + building.height - 28, building.width * 0.18, 28);
  });
}

function drawRoad(width, height) {
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
  for (let x = -40 + ((state.tick * 80) % 80); x < width; x += 80) {
    ctx.fillRect(x, roadY + 19, 34, 5);
  }

  drawTruck((state.tick * 74) % (width + 220) - 180, roadY - 28);
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

els.actionButtons.forEach((button) => {
  button.addEventListener("click", () => decide(button.dataset.action));
});

els.panicButton.addEventListener("click", panic);
els.copyButton.addEventListener("click", copyCertificate);
window.addEventListener("resize", resizeCanvas);

renderStats();
renderCase();
addLog("Desk opened. Suspicion level: administratively acceptable.");
resizeCanvas();
requestAnimationFrame(drawCity);
