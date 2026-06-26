const fs = require('fs');

let content = fs.readFileSync('funix-detail.html', 'utf8');

// 1. Remove Hero Gift Box (same structure as before)
const giftStart = '<!-- Gift Box & Image -->';
const kpiStart = '<!-- Detail KPIs -->';
const giftIdx = content.indexOf(giftStart);
const kpiIdx = content.indexOf(kpiStart);

if (giftIdx !== -1 && kpiIdx !== -1) {
    const before = content.substring(0, giftIdx);
    const after = content.substring(kpiIdx);
    // Need to close the hero div properly
    content = before + '\n  </div>\n\n  ' + after;
    console.log('Removed Gift Box from hero');
}

// 2. Replace the entire Tracking section
const trackStart = content.indexOf('<div class="detail-box-title">Link truyền thông chương trình</div>');
if (trackStart !== -1) {
    const detailBoxStart = content.lastIndexOf('<div class="detail-box">', trackStart);
    const commissionMarker = '<!-- Commission + Rank -->';
    const commissionIdx = content.indexOf(commissionMarker);
    
    if (detailBoxStart !== -1 && commissionIdx !== -1) {
        const before = content.substring(0, detailBoxStart);
        const after = content.substring(commissionIdx);
        
        const newTrackBox = `<div class="detail-box">
      <div class="detail-box-title">Link truyền thông chương trình</div>
      
      <div class="track-section">
        <div class="track-label">Mã đối tác</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
          <span class="track-code" id="partnerCode">11198</span>
          <button class="track-copy" onclick="copyText('11198', this)">Sao chép</button>
        </div>
      </div>

      <div class="track-section">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:8px;">
           <div class="track-label" style="margin-bottom:0;">Link truyền thông</div>
           <button class="btn-f" style="font-size:12px; padding:6px 12px; background:var(--blue);" onclick="generateFunixLink()">Tạo link truyền thông</button>
        </div>
        <div class="track-box">
          <span class="track-url" id="generatedFunixLink">Nhấn nút tạo link để lấy link...</span>
          <button class="track-copy" onclick="copyFunixLink(this)">Sao chép</button>
        </div>
      </div>

      <div class="track-section" style="margin-top:12px;">
        <div class="track-detail" style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px;">
          <div style="font-size:12px; margin-bottom:4px; font-weight:600; color:#3b82f6;"><i class="fas fa-info-circle"></i> Lưu ý quan trọng</div>
          <span style="color:#1e3a8a;">Bạn KHÔNG cần sử dụng link tracking riêng.<br>Tất cả kết quả sẽ được ghi nhận thông qua mã đối tác<br>trong suốt thời gian chiến dịch.</span>
        </div>
      </div>

      <script>
      function generateFunixLink() {
         const code = document.getElementById('partnerCode').innerText;
         const link = 'https://daisugiaoduc.vn/workshopai?utm_campaign=ADC&utm_source=' + code;
         document.getElementById('generatedFunixLink').innerText = link;
         document.getElementById('generatedFunixLink').style.color = 'var(--blue)';
         document.getElementById('generatedFunixLink').style.fontWeight = '600';
      }
      function copyFunixLink(btn) {
         const link = document.getElementById('generatedFunixLink').innerText;
         if (link.includes('https')) {
            copyText(link, btn);
         } else {
            alert('Vui lòng tạo link trước khi sao chép!');
         }
      }
      </script>
    </div>

    `;
        content = before + newTrackBox + after;
        console.log('Replaced Tracking section');
    }
}

// 3. Update tab-resources header to remove gift code references
content = content.replaceAll('TUANBO2321', '11198');
content = content.replace('Mã quà tặng', 'Mã đối tác');
content = content.replace('mã quà tặng <strong>', 'Mã đối tác <strong>');

fs.writeFileSync('funix-detail.html', content);
console.log('Successfully patched funix-detail.html');
