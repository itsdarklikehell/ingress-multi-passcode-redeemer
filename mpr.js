/**
 * Ingress Multi Passcode Redeemer
 * 
 * Een tool om meerdere Ingress passcodes in één keer in te lijsten op intel.ingress.com.
 * 
 * Gebruik:
 * 1. Ga naar https://intel.ingress.com/ en meld je aan.
 * 2. Open de browser-console (Chrome: F12 → tab Console).
 * 3. Plak de inhoud van mpr.js in de console en druk op Enter.
 * 4. Voeg codes toe met: addCode("JE_CODE_HIER");
 * 5. Start het proces met: startRedeeming();
 * 
 * Stoppen: stopRedeeming()
 */

var codes = [];
var isRunning = false;
var currentIndex = 0;
var delayBetweenCodes = 2000; // 2 seconden tussen codes

function validateCode(code) {
    if (!code || typeof code !== 'string') return false;
    // Alleen a-z, 0-9, hoofdletters worden kleine omgezet
    var cleaned = code.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned.length >= 8;
}

function addCode(code) {
    if (!validateCode(code)) {
        console.warn('Ongeldige code: ' + code);
        return false;
    }
    var cleaned = code.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (codes.indexOf(cleaned) !== -1) {
        console.warn('Code al toegevoegd: ' + cleaned);
        return false;
    }
    codes.push(cleaned);
    console.log('Code toegevoegd: ' + cleaned + ' (totaal: ' + codes.length + ')');
    return true;
}

function sendCode(code) {
    console.log('Versturen code: ' + code);
    var passcodeEl = document.getElementById('passcode');
    var submitEl = document.getElementById('submit');
    if (!passcodeEl || !submitEl) {
        console.error('ERROR: passcode of submit element niet gevonden — pagina niet geladen?');
        return false;
    }
    passcodeEl.value = code;
    submitEl.click();
    return true;
}

function processNext() {
    if (!isRunning) return;
    if (currentIndex >= codes.length) {
        console.log('Alle codes verwerkt! Totaal: ' + codes.length);
        isRunning = false;
        return;
    }
    var code = codes[currentIndex];
    sendCode(code);
    currentIndex++;
    setTimeout(processNext, delayBetweenCodes);
}

function startRedeeming() {
    if (isRunning) {
        console.warn('Proces is al actief');
        return;
    }
    if (codes.length === 0) {
        console.warn('Geen codes toegevoegd. Gebruik addCode("JE_CODE_HIER")');
        return;
    }
    isRunning = true;
    currentIndex = 0;
    console.log('Start met ' + codes.length + ' codes...');
    processNext();
}

function stopRedeeming() {
    isRunning = false;
    console.log('Gestopt op index ' + currentIndex + ' van ' + codes.length);
}

function listCodes() {
    console.log('Huidige codes (' + codes.length + '):');
    codes.forEach(function(code, i) {
        console.log('  ' + (i + 1) + '. ' + code);
    });
}

function clearCodes() {
    codes = [];
    currentIndex = 0;
    isRunning = false;
    console.log('Alle codes gewist');
}

// Auto-start als er codes zijn
if (codes.length > 0) {
    console.log('MPR geladen met ' + codes.length + ' codes. Gebruik startRedeeming() om te starten.');
} else {
    console.log('MPR geladen. Voeg codes toe met addCode("JE_CODE_HIER").');
}
