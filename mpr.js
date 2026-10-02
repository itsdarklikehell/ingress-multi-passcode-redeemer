var codes = [];
var running = true;
var paused = false;

function sendCode(code) {
    if (!running) return;
    console.log("sending code " + code);
    var passcodeEl = document.getElementById('passcode');
    var submitEl = document.getElementById('submit');
    if ( !passcodeEl || !submitEl ) {
        console.log("ERROR: passcode or submit element not found — page not loaded?");
        return;
    }
    passcodeEl.value = code;
    submitEl.click();
    console.log("var codes = " + JSON.stringify(codes) + ";");

    setTimeout(function () {
        if (!running) return;
        var statusEl = document.getElementById('redeem_reward_status');
        console.log(statusEl ? statusEl.innerText : '(no status element)');
        if ( statusEl && statusEl.innerText.indexOf('too hot') > 0 ) {
            console.log("paused code sending for a while...");
            paused = true;
            setTimeout(function() { paused = false; nextCode(); }, 60*30*1000);
        }
        else {
            setTimeout(nextCode, 10000+(Math.random()*5000));
        }
    }, 15000);
}

function nextCode () {
    if (!running) return;
    if (paused) {
        setTimeout(nextCode, 5000);
        return;
    }
    var code = codes.shift();
    if ( code ) {
        sendCode(code);
    }
    else {
        setTimeout(nextCode, 10000);
    }
}

function addCode (code) {
    code = String(code).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim();
    if ( code && codes.indexOf(code) === -1 ) {
        codes.push(code);
        console.log("Added code: " + code + " (total: " + codes.length + ")");
    }
    else {
        console.log("invalid code or already known");
    }
}

function start() {
    running = true;
    console.log("MPR started. Add codes with addCode('YOUR_CODE')");
    nextCode();
}

function stop() {
    running = false;
    console.log("MPR stopped.");
}

function status() {
    console.log("Status: " + (running ? "running" : "stopped") + ", codes: " + codes.length + ", paused: " + paused);
}

// Auto-start
start();





