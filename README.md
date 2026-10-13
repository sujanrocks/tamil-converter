# தமிழ் மாற்றி — Bamini ⇄ Unicode

## முக்கிய எச்சரிக்கை / Accuracy status
- இணையம் இல்லாததால் வெளி மூலத்துடன் ஒப்பிட முடியவில்லை. அட்டவணை நினைவிலிருந்து உள்ளிடப்பட்டது; சோதனை ஜோடிகளும் அதே மூலம். **முழு துல்லியம் என்று கூற முடியாது.**
- Not yet mapped (reported in the app, never guessed): ு/ூ forms for most consonants, ஃ, ஔ/ௌ, ஷ ஸ ஹ க்ஷ ஸ்ரீ, special conjuncts.
- To finish: add entries in `converter.js`, plus verified pairs in `tests.mjs`; run `node tests.mjs`.
- Bamini is Latin-letter text: English words cannot be told apart in Bamini → Unicode direction. `;` = pulli, `,` = இ.

## GitHub Pages — எளிய தமிழ் படிகள்
1. github.com இல் உள்நுழையவும் (இலவசக் கணக்கு).
2. **New repository** → பெயர்: `tamil-converter` → **Public** → **Create**.
3. **uploading an existing file** → இந்த கோப்புறையிலுள்ள எல்லா கோப்புகளையும் இழுத்துப் போடவும் → **Commit changes**.
4. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/(root)** → **Save**.
5. 1–2 நிமிடம் காத்திருக்கவும். முகவரி: `https://உங்கள்பெயர்.github.io/tamil-converter/`
6. GitHub Pages தானாகவே HTTPS தரும்; PWA நிறுவலுக்கும் offline க்கும் HTTPS (அல்லது localhost) அவசியம்.
7. மாற்றம் செய்தால் `service-worker.js` இல் `tc-v1` → `tc-v2` என மாற்றவும்.

## நிறுவுதல்
- **iPhone/iPad:** Safari → Share → **Add to Home Screen**. (180×180 PNG `apple-touch-icon` சேர்த்தால் படம் அழகாகத் தெரியும்.)
- **Windows:** Edge/Chrome → முகவரிப் பட்டியில் **Install** ஐகான்.

## Test checklist (iPhone & Windows)
- [ ] பக்கம் திறக்கிறது; தமிழ் எழுத்துகள் சரியாகத் தெரிகின்றன
- [ ] `jkpo;` → தமிழ்; `tzf;fk;` → வணக்கம்; `nrd;id` → சென்னை; `Ntz;Lk;` → வேண்டும்
- [ ] Unicode → Bamini திசை; Swap; Clear All; Select All
- [ ] Paste / Copy வேலை செய்கின்றன (iPhone இல் Paste அனுமதி கேட்கலாம்)
- [ ] `கூ` போன்ற ஆதரிக்கப்படாத எழுத்து எச்சரிக்கையுடன் மாற்றப்படாமல் உள்ளது
- [ ] எண்கள், வரி முறிவுகள் அப்படியே உள்ளன
- [ ] Add to Home Screen / Install; விமானப் பயன்முறையில் offline திறக்கிறது
- [ ] Dark mode சரியாக உள்ளது
