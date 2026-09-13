# ingress-multi-passcode-redeemer

Een tool om meerdere Ingress passcodes in één keer in te lijsten op [intel.ingress.com](https://intel.ingress.com/).

## Gebruik

1. Ga naar [intel.ingress.com](https://intel.ingress.com/) en meld je aan.
2. Open de browser-console (Chrome: `F12` → tab **Console**).
3. Plak de inhoud van `mpr.js` in de console en druk op Enter.
4. De tool doorloopt de codes automatisch en verstuurt ze een voor een.

> **Opmerking:** deze tool werkt **niet** samen met IITC (Ingress Intel Total Conversion). Schakel IITC uit voor de duur van het proces.

## Codes toevoegen

Voeg tijdens de draai nieuwe codes toe met:

```
addCode("JE_CODE_HIER");
```

`addCode` valideert de code automatisch (alleen a-z, 0-9, hoofdletters worden kleine omgezet) en slaat herhalingen op zodat een code niet twee keer wordt verstukt.

## Hoe het werkt

- Elke code wordt in het `passcode`-veld geplakt en met de `submit`-knop verzonden.
- Na elk versturen wacht de tool even op het resultaat. Staat er `"too hot"` in het `redeem_reward_status`-veld, dan pauzeert de tool 30 minuten; anders wacht hij 10–15 seconden en gaat hij verder.
- Wanneer de lijst op is, blijft de tool in een 10-seconden lus — je kunt hem afsluiten met `Ctrl+C` in de console of de pagina vernieuwen.

## Let op

- Codes zijn eenvoudig tekstvelden — deze tool verstuurt ze letterlijk. Gebruik alleen codes die je zelf hebt ontvangen of die legitiem zijn.
- Je kunt de console sluiten of de pagina vernieuwen om het proces te stoppen; de teller gaat daarna van start bij de eerste code.
