const fs = require('fs');

let content = fs.readFileSync('easyspeak-detail.html', 'utf8');

// 1. Remove Hero Gift Box
const giftBoxMarkerStart = '<!-- Gift Box & Image -->';
const giftBoxMarkerEnd = '</div>\n  </div>\n\n  <!-- Detail KPIs -->'; // or something like that.
const startIdx = content.indexOf(giftBoxMarkerStart);
if (startIdx !== -1) {
    // Find the end of the gift box div.
    // The gift box has <div style="z-index: 1; display: flex; align-items: center; gap: 24px;">
    // Let's just find "<!-- Detail KPIs -->" and remove everything from startIdx to there.
    const endIdx = content.indexOf('<!-- Detail KPIs -->');
    if (endIdx !== -1) {
        const beforeStr = content.substring(0, startIdx);
        const afterStr = content.substring(endIdx);
        content = beforeStr + '\n  ' + afterStr;
    }
}

// 2. Replace Tracking Box
const trackStart = '<div class="detail-box-title">Link truyền thông chương trình</div>';
const trackEnd = '<!-- Commission + Rank -->';
const tStartIdx = content.indexOf(trackStart);
const tEndIdx = content.indexOf(trackEnd);

if (tStartIdx !== -1 && tEndIdx !== -1) {
    const detailBoxStart = content.lastIndexOf('<div class="detail-box">', tStartIdx);
    const beforeStr = content.substring(0, detailBoxStart);
    const afterStr = content.substring(tEndIdx);
    
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
           <button class="btn-f" style="font-size:12px; padding:6px 12px; background:var(--blue);" onclick="generateLink()">Tạo link truyền thông</button>
        </div>
        <div class="track-box">
          <span class="track-url" id="generatedLink">Nhấn nút tạo link để lấy link...</span>
          <button class="track-copy" onclick="copyGenLink(this)">Sao chép</button>
        </div>
      </div>

      <script>
      function generateLink() {
         const code = document.getElementById('partnerCode').innerText;
         const link = 'https://easyspeak.ican.vn?utm_campaign=ADC&utm_source=' + code;
         document.getElementById('generatedLink').innerText = link;
         document.getElementById('generatedLink').style.color = 'var(--blue)';
         document.getElementById('generatedLink').style.fontWeight = '600';
      }
      function copyGenLink(btn) {
         const link = document.getElementById('generatedLink').innerText;
         if (link.includes('https')) {
            copyText(link, btn);
         } else {
            alert('Vui lòng tạo link trước khi sao chép!');
         }
      }
      </script>
    </div>

    `;
    
    content = beforeStr + newTrackBox + afterStr;
}

// 3. Replace in Content & Tài nguyên tab
content = content.replace(
  '<div style="color:var(--txt2); margin-bottom:2px;">Mã quà tặng</div>',
  '<div style="color:var(--txt2); margin-bottom:2px;">Mã đối tác</div>'
);
content = content.replaceAll(
  'TUANBO2321',
  '11198'
);

// Also remove the bottom note in the tab about Affiliate Code and TUANBO2321
// The text is: Hãy sử dụng Affiliate Code trên AMS hoặc mã quà tặng <strong>11198</strong> khi chia sẻ...
// We can replace it with: Hãy sử dụng Mã đối tác <strong>11198</strong> khi chia sẻ...
content = content.replace(
  'Hãy sử dụng Affiliate Code trên AMS hoặc mã quà tặng <strong>11198</strong> khi chia sẻ để được ghi nhận hoàn chính xác.',
  'Hãy sử dụng Mã đối tác <strong>11198</strong> thông qua Link Truyền thông của bạn khi chia sẻ để được ghi nhận hoa hồng chính xác.'
);

fs.writeFileSync('easyspeak-detail.html', content);
console.log('Successfully applied patch12.js');
