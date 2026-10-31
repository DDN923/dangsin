const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const clean = s => String(s == null ? '' : s).replace(/\+/g, ' ').trim();
// 글자 폭 추정 (13px 기준): 한글·한자·이모지 13, 나머지 6.5
const textWidth = (s, size = 13) => {
  let w = 0;
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if ((c >= 0xac00 && c <= 0xd7a3) || (c >= 0x3130 && c <= 0x318f) || (c >= 0x4e00 && c <= 0x9fff) || c > 0xffff) w += 13;
    else if (ch === ' ') w += 4;
    else w += 7;
  }
  return w * size / 13;
};
const send = (res, svg) => {
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(svg);
};
module.exports = { esc, clean, textWidth, send };
