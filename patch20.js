const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Add mobile.css + viewport
if (!c.includes('mobile.css')) {
  c = c.replace('</head>', '  <link rel="stylesheet" href="mobile.css">\n</head>');
}

// 2. Add hamburger
if (!c.includes('mobile-menu-btn')) {
  c = c.replace('<div class="header-left">', '<div class="header-left">\n    <button class="mobile-menu-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>');
}

// 3. Replace logo
c = c.replace(/<div class="logo-icon">AMS<\/div>\s*\n?\s*<span class="logo-text">[^<]+<\/span>/g,
  '<img src="ge-logo.png" alt="Galaxy Education" style="height:32px;">');

// 4. Add sidebar overlay
if (!c.includes('sidebar-overlay')) {
  c = c.replace('</aside>', '</aside>\n<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>');
}

// 5. Replace static campaign grid with dynamic loader
const campGridStart = '<!-- SECTION: CAMPAIGNS -->';
const campGridEnd = '</div>\r\n  </div>\r\n\r\n  <!-- SECTION: WIDGETS -->';
const campGridEnd2 = '</div>\n  </div>\n\n  <!-- SECTION: WIDGETS -->';

// Find campaign section and replace
const marker = '<!-- SECTION: CAMPAIGNS -->';
const widgetMarker = '<!-- SECTION: WIDGETS -->';
const markerIdx = c.indexOf(marker);
const widgetIdx = c.indexOf(widgetMarker);

if (markerIdx !== -1 && widgetIdx !== -1) {
  c = c.substring(0, markerIdx) + 
`<!-- SECTION: CAMPAIGNS (DYNAMIC) -->
  <div class="db-section-title">Chương trình trọng điểm đang diễn ra <a href="campaigns.html" style="font-size:11.5px;color:#2563eb;font-weight:600;text-decoration:none">Xem tất cả chiến dịch →</a></div>
  <div class="db-camp-grid" id="campaign-grid">
    <div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--txt3);">
      <i class="fas fa-spinner fa-spin" style="font-size:18px; margin-bottom:8px;"></i>
      <div>Đang tải chiến dịch...</div>
    </div>
  </div>

  ` + c.substring(widgetIdx);
}

// 6. Add dynamic campaign loader script + toggleSidebar before </body>
if (!c.includes('loadCampaignsFromAPI')) {
  const script = `
<script>
// === Toggle Sidebar (Mobile) ===
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  var ol = document.getElementById('sidebarOverlay');
  if (ol) ol.classList.toggle('show');
}
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar').classList.remove('open');
    var ol = document.getElementById('sidebarOverlay');
    if (ol) ol.classList.remove('show');
  }
});

// === Load Campaigns from API ===
async function loadCampaignsFromAPI() {
  const grid = document.getElementById('campaign-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/campaigns');
    if (!res.ok) throw new Error('API error');
    const campaigns = await res.json();
    const active = campaigns.filter(c => c.status === 'active');

    if (active.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--txt3);"><i class="fas fa-bullhorn" style="font-size:32px; margin-bottom:12px; opacity:.3;"></i><div>Chưa có chiến dịch nào đang hoạt động.</div></div>';
      return;
    }

    const detailPages = {
      'topuni-svact': 'topuni-detail.html',
      'easyspeak-adults': 'easyspeak-detail.html',
      'funix-workshop': 'funix-detail.html'
    };

    grid.innerHTML = active.map((camp, idx) => {
      const detailPage = detailPages[camp.id] || 'campaign-detail.html?id=' + camp.id;
      const endDate = camp.date_end || camp.end_date;
      const daysLeft = endDate ? Math.max(0, Math.ceil((new Date(endDate) - new Date()) / 86400000)) : '—';
      const comRate = camp.commission_rate || '10';
      const leads = camp.kpis ? camp.kpis.leads : 0;
      const revenue = camp.kpis ? camp.kpis.revenue : 0;
      const revDisplay = revenue >= 1000000 ? (revenue/1000000).toFixed(0) + 'tr' : (revenue >= 1000 ? (revenue/1000).toFixed(0) + 'K' : revenue);

      return '<div class="db-camp-card' + (idx === 0 ? ' gold' : '') + '">' +
        '<div class="db-camp-head">' +
          '<div class="db-camp-num">' + (idx+1) + '</div>' +
          '<a href="' + detailPage + '" class="db-camp-name" style="text-decoration:none;">' + camp.name + '</a>' +
        '</div>' +
        '<div class="db-camp-tags">' +
          (idx === 0 ? '<span class="tag tag-yellow">⭐ Trọng điểm</span>' : '') +
          '<span class="tag tag-blue">COM ' + comRate + '% DS</span>' +
          '<span class="tag tag-green">' + (camp.target_audience || camp.region || 'Toàn quốc') + '</span>' +
        '</div>' +
        '<div class="db-camp-desc">' + (camp.description ? camp.description.replace(/<[^>]+>/g, '').substring(0, 120) : '') + '</div>' +
        '<div class="db-camp-stats">' +
          '<div><div class="db-cs-val"><i class="fas fa-users"></i> ' + leads + '</div><div class="db-cs-lbl">Lead</div></div>' +
          '<div><div class="db-cs-val green rev-only"><i class="fas fa-sack-dollar"></i> ' + revDisplay + '</div><div class="db-cs-lbl rev-only">Doanh thu</div></div>' +
          '<div><div class="db-cs-val orange"><i class="fas fa-clock"></i> ' + daysLeft + ' ngày</div><div class="db-cs-lbl">Deadline còn</div></div>' +
        '</div>' +
        '<div class="db-camp-btns">' +
          '<button class="btn-o" onclick="copyLink(\\'' + camp.id + '\\')"><i class="fas fa-link"></i> Sao chép link</button>' +
          '<button class="btn-f dark" onclick="window.location.href=\\'' + detailPage + '\\'">Xem brief</button>' +
        '</div>' +
      '</div>';
    }).join('');

  } catch(err) {
    console.error('Failed to load campaigns:', err);
    // Fallback — keep the loading message
  }
}

function copyLink(campId) {
  navigator.clipboard.writeText(window.location.origin + '/campaign-detail.html?id=' + campId);
  alert('Đã sao chép link!');
}

document.addEventListener('DOMContentLoaded', loadCampaignsFromAPI);
</script>`;
  c = c.replace('</body>', script + '\n</body>');
}

fs.writeFileSync('index.html', c);
console.log('Done! index.html patched successfully.');
