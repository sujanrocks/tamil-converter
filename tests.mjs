// Run: node tests.mjs   (pairs below come from recall — replace/extend with pairs from an authoritative source)
import { bamToUni, uniToBam } from './converter.js';
const PAIRS = [
  ['jkpo;','தமிழ்'], ['tzf;fk;','வணக்கம்'], ['ehd;','நான்'], ['ed;wp','நன்றி'], ['fy;tp','கல்வி'],
  ['mk;kh','அம்மா'], [',y;iy','இல்லை'], ['<ok;','ஈழம்'], ['nrd;id','சென்னை'], ['nfh','கொ'], ['Nfh','கோ'],
  ['ghl;L','பாட்டு'], ['Ntz;Lk;','வேண்டும்'], ['tUk;','வரும்'], ['FLk;gk;','குடும்பம்'],
  ['Gj;jfk;','புத்தகம்'], ['Kjy;','முதல்'], ['Rj;jk;','சுத்தம்'], ['Jd;gk;','துன்பம்'],
  ['[dhjpgjp','ஜனாதிபதி'], ['jkpo; 123\nehd;.','தமிழ் 123\nநான்.'],
];
let fail = 0;
const eq = (name, got, want) => { if (got !== want) { fail++; console.log('FAIL', name, JSON.stringify(got), '!=', JSON.stringify(want)); } };
for (const [b, u] of PAIRS) {
  eq('b2u ' + b, bamToUni(b).text, u);
  eq('u2b ' + u, uniToBam(u).text, b);
  eq('roundtrip ' + u, bamToUni(uniToBam(u).text).text, u);
}
eq('mixed u2b', uniToBam('Hello தமிழ் 123\nOK').text, 'Hello jkpo; 123\nOK');
eq('pending ூ reported', uniToBam('கூ').issues.length, 1);
eq('pending ூ not guessed', uniToBam('கூ').text, 'கூ');
eq('unmapped letter reported', bamToUni('b').issues.length, 1);
console.log(fail ? `${fail} FAILED` : `all ${PAIRS.length * 3 + 5} checks passed (recall-based pairs only)`);
process.exit(fail ? 1 : 0);
