var codes = [];

function sendCode(code) {
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
        var statusEl = document.getElementById('redeem_reward_status');
        console.log(statusEl ? statusEl.innerText : '(no status element)');
        if ( statusEl && statusEl.innerText.indexOf('too hot') > 0 ) {
            console.log("paused code sending for a while...");
            setTimeout(nextCode, 60*30*1000);
        }
        else {
            setTimeout(nextCode, 10000+(Math.random()*5000));
        }
    }, 15000);
}

function nextCode () {
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
    }
    else {
        console.log("invalid code or already known");
    }
}

nextCode();





