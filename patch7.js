const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

const startMarker = '<div class="detail-box-title">Link Tracking & Mã Ưu Đãi</div>';
const endMarker = '<!-- Commission + Rank -->';

const idxStart = content.indexOf(startMarker);
const idxEnd = content.indexOf(endMarker);

if (idxStart !== -1 && idxEnd !== -1) {
    // The previous div started right before the startMarker. We replace the whole tracking section.
    // Let's just find the start of the <div class="detail-box"> for tracking
    const detailBoxStart = content.lastIndexOf('<div class="detail-box">', idxStart);
    
    const beforeStr = content.substring(0, detailBoxStart);
    const afterStr = content.substring(idxEnd);
    
    const newBlock = `<div class="detail-box">
      <div class="detail-box-title">Link truyền thông chương trình</div>
      <div class="track-section">
        <div class="track-label">Link sản phẩm (Dùng chung cho tất cả Affiliate)</div>
        <div class="track-box">
          <span class="track-url">https://topuni.hocmai.vn/vact</span>
          <button class="track-copy" onclick="copyText('https://topuni.hocmai.vn/vact', this)">Sao chép</button>
        </div>
      </div>
      <div class="track-section">
        <div class="track-label">Mã quà tặng</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span class="track-code">TUANBO2321</span>
          <button class="track-copy" onclick="copyText('TUANBO2321', this)">Sao chép</button>
        </div>
        <div class="track-detail" style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px;">
          <div style="font-size:12px; margin-bottom:4px; font-weight:600; color:#3b82f6;"><i class="fas fa-info-circle"></i> Lưu ý quan trọng</div>
          <span style="color:#1e3a8a;">Bạn KHÔNG cần sử dụng link tracking riêng.<br>Tất cả kết quả sẽ được ghi nhận thông qua mã quà tặng<br>trong suốt thời gian chiến dịch.</span>
        </div>
      </div>
    </div>

    `;
    
    content = beforeStr + newBlock + afterStr;
    fs.writeFileSync('topuni-detail.html', content);
    console.log('Successfully applied patch7.js using indices');
} else {
    console.log('Could not find start or end markers for Tracking block');
}

// Fix hero copy icon if not already fixed
if (content.includes('cursor: pointer;"></i>') && !content.includes('copyText(\'TUANBO2321\'')) {
    content = content.replace(
        '<i class="fas fa-copy" style="color: #94a3b8; cursor: pointer;"></i>',
        '<i class="fas fa-copy" style="color: #94a3b8; cursor: pointer;" onclick="copyText(\'TUANBO2321\', this)"></i>'
    );
    fs.writeFileSync('topuni-detail.html', content);
}
