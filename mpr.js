var codes = [];
var oldCodes = [];

function sendCode(code) {
    console.log("sending code " + code);
    document.getElementById('passcode').value = code;
    document.getElementById('submit').click();
    console.log("var oldCodes = " + JSON.stringify(oldCodes) + ";");
    console.log("var codes = " + JSON.stringify(codes) + ";");

    setTimeout(function () {
        console.log(document.getElementById('redeem_reward_status').innerText);
        if ( document.getElementById('redeem_reward_status') && document.getElementById('redeem_reward_status').innerText.indexOf('too hot') > 0 ) {
            console.log("paused code sending for a while...");
            setTimeout(nextCode, 60*30*1000);
        }
        else {
            setTimeout(nextCode, 10000+(Math.random()*5000));
        }
    }, 15000);
}

function nextCode () {
    code = codes.shift();
    if ( code ) {
        sendCode(code);
    }
    else {
        setTimeout(nextCode, 10000);
    }
}


function addCode (code) {
    code = String(code).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().trim();
    if ( code && codes.indexOf(code) === -1 && oldCodes.indexOf(code) !== -1 ) {
        codes.push(code);
    }
    else {
        console.log("invalid code or already known");
    }
}

nextCode();


addCode("examplecode");


codes = ["SRQ86JAMA572MU", "YBP27JAMA673WW", "PZZ64JAMA626PC", "GOX64JAMA258SD", "ROA67JAMA978QJ", "CPP35JAMA422AA", "TTK22JAMA777FD", "AWZ22JAMA799WN", "UQF26VERITY643NZ", "TJC35SITREP538DR", "JAM24IFS2019568DN", "YPZ36AKTG234HO", "STE35AKTG644WP", "NND46E19632AD", "XVJ26CF1994TO", "NWC45E19938JG", "WJV55YSIX898AD", "BET45AK239WO", "RMB68E19325QS", "DBW6520196450M", "DBW652019645OM", "DBW652019645QM", "EHF962019224NF", "XUN722019252PN", "FAB282019938CZ", "DAT452019533TZ", "S4D6SLAKENR9MM", "OWF662019787UZ", "JJT772019589FB", "TBZ662019942MW", "AYN662019294JB", "GRD892019649MU", "DTB94E19432YE", "WBC47YSIX297HB", "UCC68YSIX279UU", "TYV77YSIX934DV", "WQQ38YSIX592HU", "JPQ87YSIX939FH", "RYJ39YSIX288SE", "MKB69YSIX998KP", "OEV38YSIX837ZE", "EYS33YSIX728XB", "2WSK8SPACEA5R7Z", "ZKM55YSIX876KV", "AQD63YSIX256ZC", "SYB57AIC849PE", "KNS53AIC795VT", "QTJ88CFS5S7FS", "TWP56D1980273UH", "HEG79J651K943FO", "BET45AK239W0", "REX49S5F8T924KD", "EDE59F4SSJ735ZG", "SKK58ATTACK484DP", "PSH79RECURSION544DT", "CNQ85PAST736VC", "AUK77PUZZLE859HF", "UEB28INGRESS583FG", "TKK89QUESTION297OB", "SJT65AIC453DJ", "ORY33CF5729ZQ", "VNO27NBD3J767VV", "HTB76CFS825GP", "OBG59SIGNAL259AO", "NDJ86JOURNEY599BB", "XP5ABADDON5ZR", "QM5SHAPER8HA", "RM3HULONG7FZ", "YK7ADA3KJ", "XW6BRANDT8CQ", "ZG2ENL6TD", "PB6MAKOTO2OQ", "SR8XM5BF", "NR5RES7KZ", "EO3HANK4TK", "XD3SARAH2UY", "ALIGNMENT9NB75YO5", "3UZB3PASTU8W4U", "WKC35CFI993XJ", "RESIST2AR69HR8", "RECURSION8PJ38FQ4", "QQKT8UX5DJ89UDKC", "QNOD8CB2NA74UHOV", "PHILLIPS4TQ82TP9", "PFE76CFI539UH", "MOTR4UV3KU63VAGN", "JFEM4TW4PQ78UXFN", "HUMAN9ON39GP9", "GMCR9UQ6FG92TEKY", "GLYPHS4GT83BM4", "FFVE2CB2NA23YKDQ", "FAYB7XX2GC33REPG", "EVBH2GG8VM76PTTJ", "DEADDROP2EU58QG5", "BRAINWAVE7XX77KF6", "BLETCHLEY6BW79UU3", "EAH68CFS687WW", "JSS33CFS248TX", "UHV88CFS952ZD", "AFQ85AK435JS", "QJV3HOZHOF8D3Y4", "KOW6GAINZ8T2Q5", "VUT4WAVEK2S8A3", "GWO6CONSTRUCTK9N5G8", "EAR5FELICIAA9X5Q2", "OXY4VICTORT2V5V8", "AEP7DRAWA7R8Y5", "YQH5HENRYW8H4K8", "SBM3MOLEQ9M2D4", "DFFYOURG4U9G4", "NPV76AK993SW", "ARTIFACT4TT67XG9", "ALGORITHM9GH35CJ3", "RESPONSE", "ABADDON2YA92OV8", "MXO532018737QY", "QYA83AA723OX", "KK2392018659ME", "FTX462018549FU", "KHX832018774UZ", "NQN332018546FK", "JNU552018776GT", "ZYH27SAVE462OC", "ZWC42F13378BH", "XKRQ7TQ5GY68KKJG", "WYUXFJYG9IMPURE3", "WOLFE7JQ38CJ3", "WOLFE4OC63DD5", "VRZ92I5Y742FE", "VOYNICH8CG82PB6", "VNK692018829TG", "VI9UH67MO6", "VI9RP62EX1", "VI9BB02FK7", "VI2JO15ND0", "VFU38AK358FS", "TYCHO7VU99TA2", "TYCHO9UO99QA2", "TQC94AK659PN", "TKG97RYBAT497CG", "TIMEZERO2QM72UT8", "RNH64AK593VC", "UHR54CFI952PW", "RNH57CFI348DR", "XVJ26CFI994TO", "QVY45AK823HK", "POV98AK835OH", "JZV24CFI268NB", "LVBOYNXAIE", "ANTIMAGNUS9WM29QT5", "JCW34AK264BO", "BSF842018294SG", "2D8ZAXJWL2", "HDBC3RE2DP43QUUM", "VFR87AK482WD", "DMA28AK878YR", "CZJ36AK844BC", "BMS24AK377UE", "QUANTA6EY28AY7", "RDKA8UD6XK86DEMH", "MMJR8EK3AR28EJJY", "RNRA9KV8QT22RHPC", "TWXG6WX8KU75QFBF", "80JDFITMAR", "6VWA9BEDLAMV947Y", "5NOY8NNT5N", "AEGIS9BG38NF5", "3OUV7WU5A4", "2973CARRIE98"];

