const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

// 1. Text replacements
content = content.replace(
  '<title>AMS — Easy SPEAK for Adults</title>',
  '<title>AMS — [HOCMAI] Lộ trình TopUni S-VACT</title>'
);
content = content.replace(
  '<p class="desc-text">Easy SPEAK for Adults là chương trình tiếng Anh giao tiếp dành cho người từ 18 tuổi trở lên, đặc biệt phù hợp với người đi làm bận rộn. Chương trình tập trung vào kỹ năng nghe - nói, phản xạ giao tiếp, giao tiếp công sở, thuyết trình, email và các tình huống thực tế trong công việc và cuộc sống.</p>',
  '<p class="desc-text">Lộ trình TopUni S-VACT là chương trình luyện thi dành cho học sinh THPT, đặc biệt phù hợp với các bạn 2K9. Chương trình tập trung vào hệ thống hóa kiến thức, luyện đề theo giai đoạn, và tối ưu điểm số xét tuyển đại học.</p>'
);
content = content.replace(
  '<div class="cd-name">Easy SPEAK for Adults — Tiếng Anh giao tiếp cho người đi làm <span class="cd-status">Đang diễn ra</span></div>',
  '<div class="cd-name">[HOCMAI] Lộ trình TopUni S-VACT — Luyện thi cấp tốc <span class="cd-status">Đang diễn ra</span></div>'
);

// 2. Replace the Hero and KPI section
const startMarker = '  <!-- Campaign Hero -->';
const endMarker = '  <!-- Detail Tabs -->';

const beforeStr = content.substring(0, content.indexOf(startMarker));
const afterStr = content.substring(content.indexOf(endMarker));

const newHeroAndKpi = `
  <!-- Campaign Hero (New Design) -->
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:12px">
    <div class="cd-actions" style="display:flex; gap:8px; margin-left:auto;">
      <button class="btn-o" style="padding:10px 18px; border-color:#e2e8f0; color:#475569; border-radius:8px;"><i class="fas fa-link" style="font-size:11px"></i> Sao chép link sản phẩm</button>
      <button class="btn-f" style="padding:10px 18px; background:var(--blue); border-radius:8px;"><i class="fas fa-upload" style="font-size:11px"></i> Nộp kết quả chiến dịch</button>
    </div>
  </div>

  <div class="cd-hero-new" style="background: linear-gradient(90deg, #09378f 0%, #035cc1 100%); border-radius: 16px; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; margin-bottom: 24px;">
    <div style="display: flex; gap: 24px; align-items: center; z-index: 1;">
      <!-- Logo Box -->
      <div style="background: #fff; width: 120px; height: 120px; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 8px 24px rgba(0,0,0,0.15); flex-shrink: 0;">
         <img src="https://hocmai.vn/assets/front/images/logo.png" alt="HOCMAI" style="width:70%; margin-bottom:4px;">
         <div style="color: #0b3992; font-weight: 900; font-size: 24px; letter-spacing: -0.5px; line-height: 1.2;">S-VACT</div>
      </div>
      
      <!-- Info -->
      <div style="color: #fff; max-width: 600px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <h2 style="font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.01em;">[HOCMAI] S-VACT – Luyện thi đánh giá năng lực</h2>
          <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.4);">Đang diễn ra</span>
        </div>
        <p style="font-size: 13px; opacity: 0.9; margin-bottom: 20px; line-height: 1.5;">Chương trình luyện thi S-VACT dành cho học sinh 12 (2K9) – hệ thống hóa kiến thức, luyện đề theo giai đoạn, tối ưu điểm số xét tuyển đại học.</p>
        
        <div style="display: flex; gap: 32px; font-size: 12px;">
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div style="opacity: 0.6; font-size: 16px;"><i class="fas fa-calendar-alt"></i></div>
            <div><div style="opacity: 0.6; margin-bottom: 2px;">Thời gian chiến dịch</div><div style="font-weight: 600;">20/06 – 31/10/2026</div></div>
          </div>
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div style="opacity: 0.6; font-size: 16px;"><i class="fas fa-box"></i></div>
            <div><div style="opacity: 0.6; margin-bottom: 2px;">Sản phẩm</div><div style="font-weight: 600;">HOCMAI S-VACT</div></div>
          </div>
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div style="opacity: 0.6; font-size: 16px;"><i class="fas fa-users"></i></div>
            <div><div style="opacity: 0.6; margin-bottom: 2px;">Đối tượng</div><div style="font-weight: 600;">Học sinh lớp 12 (2K9)</div></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Gift Box & Image -->
    <div style="z-index: 1; display: flex; align-items: center; gap: 24px;">
      <div style="background: #fff; border-radius: 12px; padding: 20px; width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
        <div style="display: flex; gap: 8px; align-items: center; color: #64748b; font-size: 12px; font-weight: 600; margin-bottom: 8px;">
          <i class="fas fa-gift" style="color: #3b82f6;"></i> Mã Quà tặng của bạn
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; padding: 10px 16px; border-radius: 8px; margin-bottom: 12px;">
          <span style="font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: 0.5px;">TUANBO2321</span>
          <i class="fas fa-copy" style="color: #94a3b8; cursor: pointer;"></i>
        </div>
        <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.4;">Người dùng nhập mã khi đăng ký để nhận ưu đãi giảm học phí.</p>
      </div>
    </div>
  </div>

  <!-- Detail KPIs -->
  <div class="dkpi-row" style="margin-bottom: 24px; display:grid; grid-template-columns: repeat(5, 1fr); gap:16px;">
    <div class="dkpi" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Lead hợp lệ</div>
      <div style="display:flex; align-items:baseline; justify-content:space-between; margin-top:8px;">
        <div class="dkpi-val" style="font-size:24px; font-weight:800;">52 <i class="fas fa-users" style="color:#60a5fa; font-size:14px;"></i></div>
      </div>
      <div class="dkpi-sub" style="margin-top:12px; color:#10b981; font-weight:500;">↑ 12 <span style="color:#64748b;font-weight:400;">so với tháng trước</span></div>
    </div>
    <div class="dkpi" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Đơn hàng / CR</div>
      <div style="display:flex; align-items:baseline; justify-content:space-between; margin-top:8px;">
        <div class="dkpi-val" style="font-size:24px; font-weight:800;">12 <span style="font-size:14px;font-weight:500;color:var(--txt3)">đơn</span></div>
        <div style="font-size:12px; font-weight:600; color:#64748b;">CR 17.6%</div>
      </div>
      <div class="dkpi-sub" style="margin-top:12px; color:#10b981; font-weight:500;">↑ 3 đơn <span style="color:#64748b;font-weight:400;">so với tháng trước</span></div>
    </div>
    <div class="dkpi" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Doanh thu dự kiến <i class="fas fa-circle-info" style="font-size:9px;color:var(--txt3)"></i></div>
      <div class="dkpi-val" style="font-size:24px; font-weight:800; margin-top:8px;">84.200.000đ</div>
      <div class="dkpi-sub" style="margin-top:12px; color:#10b981; font-weight:500;">↑ 24.1tr <span style="color:#64748b;font-weight:400;">so với tháng trước</span></div>
    </div>
    <div class="dkpi" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Hoa hồng dự kiến <i class="fas fa-circle-info" style="font-size:9px;color:var(--txt3)"></i></div>
      <div class="dkpi-val" style="font-size:24px; font-weight:800; margin-top:8px;">8.420.000đ</div>
      <div class="dkpi-sub" style="margin-top:12px;">Đã duyệt: <span style="color:#10b981;font-weight:600;">5.620.000đ</span> <i class="fas fa-check-circle" style="color:#10b981"></i></div>
    </div>
    <div class="dkpi deadline" style="padding:20px 24px;">
      <div class="dkpi-label" style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Deadline nộp kết quả <i class="fas fa-circle-info" style="font-size:9px"></i></div>
      <div class="dkpi-val" style="font-size:24px; font-weight:800; margin-top:8px; color:#ef4444;">Còn 4 ngày</div>
      <div class="dkpi-sub" style="margin-top:12px; color:#64748b;">31/10/2026</div>
    </div>
  </div>
`;

content = beforeStr + newHeroAndKpi + afterStr;

fs.writeFileSync('topuni-detail.html', content);
console.log('Successfully updated topuni-detail.html');
