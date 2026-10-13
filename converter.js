// converter.js — Bamini ⇄ Unicode Tamil engine. No DOM, no dependencies.
// STATUS: entries were entered from recall of the Bamini keyboard layout; no external source was
// reachable when this was written. Test words in tests.mjs are from the same recall, so they are NOT
// independent proof. Check against an authoritative source before relying on it. Gaps: see PENDING.
export const VOWELS = { m:'அ', M:'ஆ', ',':'இ', '<':'ஈ', c:'உ', C:'ஊ', v:'எ', V:'ஏ', I:'ஐ', x:'ஒ', X:'ஓ' };
export const CONSONANTS = { f:'க', q:'ங', r:'ச', Q:'ஞ', l:'ட', z:'ண', j:'த', e:'ந', g:'ப', k:'ம',
  a:'ய', u:'ர', y:'ல', t:'வ', o:'ழ', s:'ள', w:'ற', d:'ன', '[':'ஜ' };
export const U_FORMS = { F:'கு', R:'சு', L:'டு', J:'து', G:'பு', K:'மு', U:'ரு' }; // letter-specific glyphs
const POST = { h:'ா', p:'ி', P:'ீ', ';':'்' };
const PRE = { n:'ெ', N:'ே', i:'ை' };            // typed BEFORE the consonant in Bamini
export const PENDING = [
  'ு/ூ forms for ங ஞ ண ந ய ல வ ழ ள ற ன ஜ and all ூ forms',
  'ஃ', 'ஔ / ௌ', 'ஷ ஸ ஹ க்ஷ ஸ்ரீ', 'special conjunct glyphs'];
const PASS = /[\s\d.!?:'"()\-\/]/;
const rev = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const R_V = rev(VOWELS), R_C = rev(CONSONANTS), R_U = rev(U_FORMS), R_POST = rev(POST);
const R_PRE = { 'ெ':'n', 'ே':'N', 'ை':'i' }, R_PRE2 = { 'ொ':'n', 'ோ':'N' };

function collector() {
  const m = new Map();
  return { flag(char, why) { const e = m.get(char) || { char, why, count: 0 }; e.count++; m.set(char, e); },
           list: () => [...m.values()] };
}

export function bamToUni(src) {
  const out = [], bad = collector(); let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (PRE[c]) {
      const base = CONSONANTS[src[i + 1]];
      if (base) {
        if ((c === 'n' || c === 'N') && src[i + 2] === 'h') { out.push(base + (c === 'n' ? 'ொ' : 'ோ')); i += 3; }
        else { out.push(base + PRE[c]); i += 2; }
        continue;
      }
      bad.flag(c, 'prefix sign without consonant'); out.push(c); i++; continue;
    }
    const m = VOWELS[c] ?? CONSONANTS[c] ?? U_FORMS[c] ?? POST[c];
    if (m !== undefined) out.push(m);
    else if (c.charCodeAt(0) > 127 || PASS.test(c)) out.push(c);
    else { bad.flag(c, 'no verified mapping'); out.push(c); }
    i++;
  }
  return { text: out.join(''), issues: bad.list() };
}

export function uniToBam(src) {
  const s = src.normalize('NFC'), out = [], bad = collector(); let i = 0;
  while (i < s.length) {
    const c = s[i], sg = s[i + 1], b = R_C[c];
    if (b !== undefined) {
      if (R_POST[sg]) { out.push(b + R_POST[sg]); i += 2; }
      else if (R_PRE[sg]) { out.push(R_PRE[sg] + b); i += 2; }
      else if (R_PRE2[sg]) { out.push(R_PRE2[sg] + b + 'h'); i += 2; }
      else if (sg === 'ு') {
        if (R_U[c + sg]) out.push(R_U[c + sg]); else { bad.flag(c + sg, 'no verified mapping'); out.push(c + sg); }
        i += 2;
      } else if (sg === 'ூ' || sg === 'ௌ') { bad.flag(c + sg, 'no verified mapping'); out.push(c + sg); i += 2; }
      else { out.push(b); i++; }
      continue;
    }
    if (R_V[c] !== undefined) out.push(R_V[c]);
    else if (c >= '\u0B80' && c <= '\u0BFF') { bad.flag(c, 'no verified mapping'); out.push(c); }
    else out.push(c);
    i++;
  }
  return { text: out.join(''), issues: bad.list() };
}
