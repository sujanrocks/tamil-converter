import { bamToUni, uniToBam } from './converter.js';
const $ = (id) => document.getElementById(id);
const LABELS = { b2u: ['பாமினி உரை (Bamini)', 'யூனிகோட் தமிழ் (Unicode)'], u2b: ['யூனிகோட் தமிழ் (Unicode)', 'பாமினி உரை (Bamini)'] };
let mode = 'b2u';
const say = (t) => { $('msg').textContent = t; };

function run() {
  const r = (mode === 'b2u' ? bamToUni : uniToBam)($('src').value);
  $('dst').value = r.text;
  $('cntSrc').textContent = [...$('src').value].length + ' எழுத்துகள் / chars';
  $('cntDst').textContent = [...r.text].length + ' எழுத்துகள் / chars';
  say(r.issues.length
    ? '⚠ சரிபார்க்கப்படாத எழுத்துகள் மாற்றப்படாமல் விடப்பட்டன / Left unconverted (unverified): ' +
      r.issues.map((x) => `${x.char} ×${x.count}`).join('  ')
    : '');
}
function setMode(m) {
  mode = m;
  for (const k of ['b2u', 'u2b']) $(k).setAttribute('aria-selected', String(k === m));
  $('lblSrc').textContent = LABELS[m][0]; $('lblDst').textContent = LABELS[m][1];
  run();
}
$('b2u').onclick = () => setMode('b2u');
$('u2b').onclick = () => setMode('u2b');
$('convert').onclick = run;
$('src').oninput = () => { if ($('auto').checked) run(); else $('cntSrc').textContent = [...$('src').value].length + ' எழுத்துகள் / chars'; };
$('clear').onclick = () => { $('src').value = ''; run(); $('src').focus(); };
$('swap').onclick = () => { $('src').value = $('dst').value; setMode(mode === 'b2u' ? 'u2b' : 'b2u'); };
$('selall').onclick = () => { $('dst').focus(); $('dst').select(); $('dst').setSelectionRange(0, 1e9); };
$('paste').onclick = async () => {
  try { $('src').value = await navigator.clipboard.readText(); run(); }
  catch { say('ஒட்ட முடியவில்லை. பெட்டியில் நீண்ட நேரம் தொட்டு “Paste” செய்யவும் / Paste blocked — paste manually.'); $('src').focus(); }
};
$('copy').onclick = async () => {
  const t = $('dst').value;
  if (!t) return say('நகலெடுக்க உரை இல்லை / Nothing to copy');
  try { await navigator.clipboard.writeText(t); say('நகலெடுக்கப்பட்டது ✓ / Copied'); }
  catch { $('selall').click(); say(document.execCommand('copy') ? 'நகலெடுக்கப்பட்டது ✓' : 'நகலெடுக்க முடியவில்லை; தேர்ந்தெடுத்த உரையை கைமுறையாக நகலெடுக்கவும் / Copy manually'); }
};
setMode('b2u');
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost'))
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
