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
  // 넓은 배너 + 큰 고유 크기: PC에서도 채팅 폭에 맞춰 크게 보이도록
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 150" width="1820" height="427" font-family="'Nanum Myeongjo','AppleMyungjo','Batang',serif" fill="#111">`
    + `<rect width="640" height="150" rx="10" fill="#faf8f3"/>`
    + `<text x="320" y="80" font-size="60" font-weight="900" text-anchor="middle" letter-spacing="2">THE CATCH</text>`
    + `<path d="M24 98h592M24 103h592" stroke="#111" stroke-width="1.5"/>`
    + `<text y="130" font-size="17" fill="#444"><tspan x="24">${esc(label)}</tspan><tspan x="616" text-anchor="end">인터넷판 · 연예 1면</tspan></text>`
    + `</svg>`;
  send(res, svg);
};
