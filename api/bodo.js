// 《당신의 세상에서》 /보도 THE CATCH 1면 머리
// GET /api/bodo?d=YYYYMMDD
const { esc, clean, send } = require('./_util');
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
module.exports = (req, res) => {
  const d = clean((req.query || {}).d).replace(/\D/g, '');
  let label = '';
  if (d.length === 8) {
    const y = +d.slice(0, 4), m = +d.slice(4, 6), dd = +d.slice(6, 8);
    const dt = new Date(Date.UTC(y, m - 1, dd));
    if (!isNaN(dt)) label = `${y}년 ${m}월 ${dd}일 ${DAYS[dt.getUTCDay()]}요일`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" width="360" height="100" font-family="'Nanum Myeongjo','AppleMyungjo','Batang',serif" fill="#111">`
    + `<rect width="360" height="100" fill="#faf8f3"/>`
    + `<text x="180" y="54" font-size="34" font-weight="900" text-anchor="middle">THE CATCH</text>`
    + `<path d="M16 66h328M16 70h328" stroke="#111"/>`
    + `<text y="88" font-size="10" fill="#555"><tspan x="16">${esc(label)}</tspan><tspan x="344" text-anchor="end">인터넷판 · 연예 1면</tspan></text>`
    + `</svg>`;
  send(res, svg);
};
