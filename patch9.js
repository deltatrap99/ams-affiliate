const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

// 1. Change the grid columns
content = content.replace(
  '<div class="dkpi-row" style="margin-bottom: 24px; display:grid; grid-template-columns: repeat(5, 1fr); gap:16px;">',
  '<div class="dkpi-row" style="margin-bottom: 24px; display:grid; grid-template-columns: repeat(4, 1fr); gap:16px;">'
);

// 2. Remove the deadline div
const targetDiv = `    <div class="dkpi deadline" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Deadline nộp kết quả <i class="fas fa-circle-info" style="font-size:9px"></i></div>
      <div class="dkpi-val" style="font-size:24px; font-weight:800; margin-top:8px; color:#ef4444;">Còn 4 ngày</div>
      <div class="dkpi-sub" style="margin-top:12px; color:#64748b;">31/10/2026</div>
    </div>`;

if (content.includes(targetDiv)) {
  content = content.replace(targetDiv, '');
  fs.writeFileSync('topuni-detail.html', content);
  console.log('Successfully removed the Deadline section.');
} else {
  console.log('Target deadline div not found! Check formatting.');
}
