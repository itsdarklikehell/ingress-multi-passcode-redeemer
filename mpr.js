// ingress-multi-passcode-redeemer
// Een tool om meerdere Ingress passcodes in één keer in te lijsten op intel.ingress.com

const codes = [];
let paused = false;
let currentTimeout = null;

// Configuratie
const CONFIG = {
  // Tijd tussen codes in milliseconden (min, max)
  delayMin: 10000,
  delayMax: 15000,
  // Tijd om te wachten na "too hot" in milliseconden
  tooHotDelay: 60 * 30 * 1000, // 30 minuten
  // Tijd om te wachten voordat status wordt gecontroleerd
  statusCheckDelay: 15000,
  // Tijd om te wachten wanneer de lijst op is
  emptyListDelay: 10000,
};

function log(message, ...args) {
  console.log(`[MPR] ${message}`, ...args);
}

function sendCode(code) {
  log(`sending code ${code}`);
  const passcodeEl = document.getElementById('passcode');
  const submitEl = document.getElementById('submit');
  if (!passcodeEl || !submitEl) {
    log("ERROR: passcode or submit element not found — page not loaded?");
    return;
  }
  passcodeEl.value = code;
  submitEl.click();
  log(`var codes = ${JSON.stringify(codes)};`);

  setTimeout(() => {
    const statusEl = document.getElementById('redeem_reward_status');
    log(statusEl ? statusEl.innerText : '(no status element)');
    if (statusEl && statusEl.innerText.indexOf('too hot') > 0) {
      log("paused code sending for a while...");
      scheduleNext(CONFIG.tooHotDelay);
    } else {
      scheduleNext(CONFIG.delayMin + Math.random() * (CONFIG.delayMax - CONFIG.delayMin));
    }
  }, CONFIG.statusCheckDelay);
}

function scheduleNext(delay) {
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  currentTimeout = setTimeout(nextCode, delay);
}

function nextCode() {
  if (paused) {
    log("resuming...");
    paused = false;
  }
  const code = codes.shift();
  if (code) {
    sendCode(code);
  } else {
    log("no more codes, waiting...");
    scheduleNext(CONFIG.emptyListDelay);
  }
}

function addCode(code) {
  code = String(code).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim();
  if (code && codes.indexOf(code) === -1) {
    codes.push(code);
    log(`added code: ${code} (total: ${codes.length})`);
  } else {
    log("invalid code or already known");
  }
}

function addCodes(newCodes) {
  if (!Array.isArray(newCodes)) {
    log("ERROR: addCodes expects an array");
    return;
  }
  newCodes.forEach(addCode);
}

function clearCodes() {
  codes.length = 0;
  log("all codes cleared");
}

function showCodes() {
  log(`current codes (${codes.length}):`, codes);
}

function pause() {
  paused = true;
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
  log("paused");
}

function resume() {
  if (paused) {
    log("resuming...");
    paused = false;
    nextCode();
  } else {
    log("not paused");
  }
}

function setConfig(key, value) {
  if (key in CONFIG) {
    CONFIG[key] = value;
    log(`config updated: ${key} = ${value}`);
  } else {
    log(`ERROR: unknown config key: ${key}`);
  }
}

// Start
log("ingress-multi-passcode-redeemer loaded");
log("commands: addCode(code), addCodes([...]), clearCodes(), showCodes(), pause(), resume(), setConfig(key, value)");
nextCode();
