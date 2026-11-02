// 《당신의 세상에서》 /까똑 대화창
// GET /api/kkatok?t=HH:MM&n=저장명&m=J재진 메시지|U은우 메시지|...
//   t: 헤더 시간 / n: 상태창 저장명 / m: 메시지(|로 구분, J=재진, U=은우, 띄어쓰기는 +)
const { esc, clean, textWidth, send } = require('./_util');
const AVATAR = require('./_avatar');
const PINK = '#0284C7';
module.exports = (req, res) => {
  const q = req.query || {};
  const t = clean(q.t).slice(0, 5) || '21:40';
  const n = clean(q.n).slice(0, 14) || '류재진';
  const raw = clean(q.m);
  const msgs = raw.split('|').map(x => x.trim()).filter(Boolean).slice(-10).map(x => {
    const who = x[0] === 'U' || x[0] === 'u' ? 'U' : 'J';
    const text = /^[JjUu]/.test(x) ? x.slice(1).trim() : x;
    return { who, text: text.slice(0, 30) };
  });
  const MAXL = 250;
  let body = '';
  msgs.forEach((m, i) => {
    const y = 548 - 44 * (msgs.length - 1 - i);
    const natural = Math.ceil(textWidth(m.text));
    const L = Math.min(natural, MAXL);
    const fit = ` textLength="${L}" lengthAdjust="${natural > MAXL ? 'spacingAndGlyphs' : 'spacing'}"`;
    const W = L + 22;
    if (m.who === 'J') {
      body += `<g transform="translate(0,${y})"><image href="${AVATAR}" x="16" y="2" width="28" height="28" clip-path="url(#av)" preserveAspectRatio="xMidYMid slice"/><circle cx="30" cy="16" r="13.5" fill="none" stroke="#e5e5e5"/><rect x="52" width="${W}" height="32" rx="12" fill="#f2f2f2"/><text x="63" y="21" fill="#222"${fit}>${esc(m.text)}</text></g>`;
    } else {
      body += `<g transform="translate(348,${y})"><rect x="-${W}" width="${W}" height="32" rx="12" fill="${PINK}"/><text x="-11" y="21" fill="#fff" text-anchor="end"${fit}>${esc(m.text)}</text></g>`;
    }
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640" font-family="'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif" font-size="13">`
    + `<defs><clipPath id="av" clipPathUnits="userSpaceOnUse"><circle cx="30" cy="16" r="14"/></clipPath></defs>`
    + `<rect x="0.5" y="0.5" width="359" height="639" rx="20" fill="#fff" stroke="#e5e5e5"/>`
    + `<text x="24" y="22" font-size="11" font-weight="700" fill="#111">${esc(t)}</text>`
    + `<text x="18" y="56" font-size="15" font-weight="700" fill="#111">‹ ${esc(n)}</text><text x="342" y="56" font-size="11" fill="#aaa" text-anchor="end">까똑</text><path d="M0 72h360" stroke="#eee"/>`
    + body
    + `<rect x="12" y="596" width="292" height="32" rx="16" fill="#f2f2f2"/><text x="28" y="617" fill="#aaa">메시지 입력</text>`
    + `<rect x="312" y="596" width="36" height="32" rx="16" fill="${PINK}"/><g transform="translate(322,604) scale(.667)" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></g>`
    + `</svg>`;
  send(res, svg);
};
