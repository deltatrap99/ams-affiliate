const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

// The exact block we want to replace
const targetBlock = `<div class="detail-box-title">Link Tracking & Mã Ưu Đãi</div>
      <div class="track-section">
        <div class="track-label">Link tracking của bạn</div>
        <div class="track-box">
          <span class="track-url">https://hmai.link/easyspeak_adults_na123</span>
          <button class="track-copy">Sao chép</button>
        </div>
      </div>
      <div class="track-section">
        <div class="track-label">Mã ưu đãi dành cho người theo dõi</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span class="track-code">EASYNA</span>
          <button class="track-copy">Sao chép</button>
        </div>
        <div class="track-detail">Giảm 10% học phí<br>Hiệu lực: 20/06 – 31/07/2026 &nbsp;|&nbsp; Số lượng: Không giới hạn</div>
      </div>`;

const newBlock = `<div class="detail-box-title">Link truyền thông chương trình</div>
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
        <div class="track-detail">
          <div style="font-size:12px; margin-bottom:4px; font-weight:600; color:#3b82f6;"><i class="fas fa-info-circle"></i> Lưu ý quan trọng</div>
          Bạn KHÔNG cần sử dụng link tracking riêng.<br>Tất cả kết quả sẽ được ghi nhận thông qua mã quà tặng<br>trong suốt thời gian chiến dịch.
        </div>
      </div>`;

// Replace the block
content = content.replace(targetBlock, newBlock);

// Replace the copy icon in the hero to make it work
content = content.replace(
  '<i class="fas fa-copy" style="color: #94a3b8; cursor: pointer;"></i>',
  '<i class="fas fa-copy" style="color: #94a3b8; cursor: pointer;" onclick="copyText(\'TUANBO2321\', this)"></i>'
);

// Oh wait, in the screenshot, the track-label for the first link is "Link sản phẩm (Dùng chung cho tất cả Affiliate)". 
// Let's also make sure to use it. (I already added it to newBlock).

fs.writeFileSync('topuni-detail.html', content);
console.log('Successfully applied patch5.js');
