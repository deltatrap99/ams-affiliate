const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

// 1. Update the tab button
content = content.replace(
  '<button class="dtab">Content & tài nguyên</button>',
  '<button class="dtab" data-tab="tab-resources">Content & tài nguyên</button>'
);

// 2. Build the tab content
const cards = [
  { id: '01', tag: 'Học sinh đã thi chia sẻ', icon: 'fa-users', title: 'Hành trình chinh phục 850 điểm V-ACT trong 30 ngày', desc: 'Chia sẻ thật từ học sinh đã tăng 200+ điểm nhờ lộ trình TopUni S-VACT.', format: 'Bài viết', formatIcon: 'fa-pen-nib', color: '#3b82f6', bg: '#eff6ff' },
  { id: '02', tag: 'Học sinh đã thi chia sẻ', icon: 'fa-play', title: 'Bạn nghĩ V-ACT khó? Nghe bạn này chia sẻ!', desc: 'Video ngắn chia sẻ trải nghiệm ôn thi và mẹo làm bài hiệu quả.', format: 'Video ngắn', formatIcon: 'fa-video', color: '#3b82f6', bg: '#eff6ff' },
  { id: '03', tag: 'Thầy cô giáo', icon: 'fa-graduation-cap', title: 'Vì sao học sinh cần chuẩn bị sớm cho kỳ thi V-ACT?', desc: 'Góc nhìn từ giáo viên về tầm quan trọng của việc luyện thi sớm.', format: 'Bài viết', formatIcon: 'fa-pen-nib', color: '#10b981', bg: '#dcfce7' },
  { id: '04', tag: 'Thầy cô giáo', icon: 'fa-play', title: 'Phân tích cấu trúc đề V-ACT và chiến lược ôn tập', desc: 'Thầy cô hướng dẫn cách phân bổ thời gian và trọng tâm ôn luyện.', format: 'Video dài', formatIcon: 'fa-video', color: '#10b981', bg: '#dcfce7' },
  { id: '05', tag: 'Phụ huynh chia sẻ', icon: 'fa-user-friends', title: 'Phụ huynh nói gì sau khi con tham gia TopUni S-VACT?', desc: 'Chia sẻ của phụ huynh về sự tiến bộ và môi trường học tập.', format: 'Bài viết', formatIcon: 'fa-pen-nib', color: '#8b5cf6', bg: '#ede9fe' },
  { id: '06', tag: 'Phụ huynh chia sẻ', icon: 'fa-play', title: 'Đầu tư đúng – Con tự tin hơn với kỳ thi V-ACT', desc: 'Phụ huynh chia sẻ lý do lựa chọn TopUni S-VACT cho con.', format: 'Video ngắn', formatIcon: 'fa-video', color: '#8b5cf6', bg: '#ede9fe' },
  { id: '07', tag: 'Content Social', icon: 'fa-image', title: '5 lý do nên chọn TopUni S-VACT', desc: 'Infographic 5 lý do nổi bật của chương trình.', format: 'Hình ảnh', formatIcon: 'fa-image', color: '#f59e0b', bg: '#fef3c7' },
  { id: '08', tag: 'Content Social', icon: 'fa-quote-left', title: 'Checklist ôn thi V-ACT cho 30 ngày nước rút', desc: 'Checklist ngắn gọn giúp học sinh lên kế hoạch ôn thi hiệu quả.', format: 'Hình ảnh', formatIcon: 'fa-image', color: '#f59e0b', bg: '#fef3c7' },
  { id: '09', tag: 'Content Social', icon: 'fa-play', title: 'Góc study cùng TopUni S-VACT – Mỗi ngày tiến bộ hơn', desc: 'Video motivational ngắn truyền cảm hứng ôn thi.', format: 'Video ngắn', formatIcon: 'fa-video', color: '#f59e0b', bg: '#fef3c7' },
  { id: '10', tag: 'Content Social', icon: 'fa-image', title: 'Bạn đã sẵn sàng chinh phục V-ACT chưa?', desc: 'Ảnh kèm caption kêu gọi hành động đăng ký ngay.', format: 'Hình ảnh', formatIcon: 'fa-image', color: '#f59e0b', bg: '#fef3c7' }
];

let cardsHtml = '';
for (let c of cards) {
  cardsHtml += `
  <div class="res-card" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px; transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)'" onmouseout="this.style.boxShadow='none'">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; gap:8px; align-items:center;">
        <span style="font-size:12px; font-weight:800; color:${c.color};">${c.id}</span>
        <span style="background:${c.bg}; color:${c.color}; padding:4px 10px; border-radius:16px; font-size:10px; font-weight:700;">${c.tag}</span>
      </div>
      <div style="background:${c.bg}; color:${c.color}; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fas ${c.icon}"></i></div>
    </div>
    <div style="font-weight:700; font-size:14px; color:var(--navy); line-height:1.4;">${c.title}</div>
    <p style="font-size:12px; color:var(--txt2); margin:0; line-height:1.5; flex:1;">${c.desc}</p>
    <div style="display:flex; gap:6px; font-size:11px; font-weight:700; color:${c.color}; align-items:center; margin-top:4px;">
      <i class="fas ${c.formatIcon}"></i> ${c.format}
    </div>
    <div style="display:flex; gap:8px; margin-top:12px; border-top:1px solid #f1f5f9; padding-top:12px;">
      <button style="flex:1; background:transparent; border:none; color:var(--blue); font-weight:600; font-size:12px; cursor:pointer;">Xem nội dung</button>
      <button style="flex:1; background:transparent; border:none; color:var(--blue); font-weight:600; font-size:12px; display:flex; gap:4px; justify-content:center; align-items:center; cursor:pointer;" onclick="copyText('Đã sao chép nội dung: ${c.title}', this)"><i class="fas fa-copy"></i> Sao chép</button>
    </div>
  </div>
  `;
}

const tabHtml = `
  <div id="tab-resources" class="tab-content" style="display:none">
    <div class="res-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; margin-top:24px;">
      <div>
        <h2 style="font-size:24px; font-weight:800; margin:0 0 8px 0; color:var(--navy);">Tài nguyên nội dung</h2>
        <p style="margin:0; font-size:14px; color:var(--txt2);">Bộ tài nguyên hỗ trợ giúp bạn truyền thông hiệu quả chương trình <span style="color:var(--blue); font-weight:600;">TopUni S-VACT</span>.</p>
      </div>
      <div style="display:flex; gap:24px; align-items:center; border:1px solid #e2e8f0; padding:16px; border-radius:12px;">
        <div style="display:flex; gap:16px; align-items:center;">
          <div style="background:#e0f2fe; width:48px; height:48px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:24px; color:#0ea5e9;">
            📘
          </div>
          <div>
            <div style="font-weight:700; color:var(--navy); margin-bottom:4px; font-size:14px;">[HOCMAI] TopUni S-VACT – Luyện thi cấp tốc</div>
            <div style="display:flex; gap:12px; font-size:12px; color:var(--txt2); align-items:center;">
              <span style="background:#dcfce7; color:#16a34a; padding:2px 8px; border-radius:4px; font-weight:600; font-size:11px;">Đang diễn ra</span>
              <span><i class="fas fa-calendar-alt"></i> 20/06 – 31/07/2026</span>
              <span><i class="fas fa-globe"></i> Toàn quốc</span>
            </div>
          </div>
        </div>
        <div style="width:1px; height:40px; background:#e2e8f0;"></div>
        <div style="font-size:12px;">
          <div style="color:var(--txt2); margin-bottom:2px;">Link đăng ký chung</div>
          <div style="font-weight:600; color:var(--blue); margin-bottom:8px; display:flex; gap:6px; align-items:center;">
            https://topuni.hocmai.vn/vact <i class="fas fa-copy" style="cursor:pointer;" onclick="copyText('https://topuni.hocmai.vn/vact', this)"></i>
          </div>
          <div style="color:var(--txt2); margin-bottom:2px;">Mã quà tặng</div>
          <div style="font-weight:600; color:var(--blue); display:flex; gap:6px; align-items:center;">
            TUANBO2321 <i class="fas fa-copy" style="cursor:pointer;" onclick="copyText('TUANBO2321', this)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="res-tabs" style="display:flex; gap:24px; border-bottom:1px solid #e2e8f0; margin-bottom:24px; overflow-x:auto;">
      <div style="padding:12px 0; font-weight:700; color:var(--blue); border-bottom:2px solid var(--blue); cursor:pointer;">Tất cả tài nguyên</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Học sinh đã thi chia sẻ</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Thầy cô giáo</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Phụ huynh chia sẻ</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Content Social</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Hình ảnh & Banner</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Video & Reel</div>
      <div style="padding:12px 0; font-weight:600; color:var(--txt2); cursor:pointer;">Tài liệu</div>
    </div>

    <div class="res-filters" style="display:flex; justify-content:space-between; margin-bottom:24px;">
      <div style="display:flex; gap:16px;">
        <div style="position:relative; width:240px;">
          <i class="fas fa-search" style="position:absolute; left:12px; top:11px; color:var(--txt3);"></i>
          <input type="text" placeholder="Tìm kiếm nội dung..." style="width:100%; padding:9px 12px 9px 36px; border:1px solid #e2e8f0; border-radius:8px; outline:none; font-family:inherit; font-size:13px;">
        </div>
        <select style="padding:9px 12px; border:1px solid #e2e8f0; border-radius:8px; outline:none; font-family:inherit; color:var(--txt1); font-size:13px; min-width:140px;">
          <option>Tất cả vai trò</option>
        </select>
        <select style="padding:9px 12px; border:1px solid #e2e8f0; border-radius:8px; outline:none; font-family:inherit; color:var(--txt1); font-size:13px; min-width:140px;">
          <option>Tất cả định dạng</option>
        </select>
        <select style="padding:9px 12px; border:1px solid #e2e8f0; border-radius:8px; outline:none; font-family:inherit; color:var(--txt1); font-size:13px; min-width:140px;">
          <option>Mới nhất</option>
        </select>
      </div>
      <button style="background:transparent; border:1px solid var(--blue); color:var(--blue); padding:9px 16px; border-radius:8px; font-weight:600; display:flex; gap:8px; align-items:center; cursor:pointer; font-size:13px;">
        <i class="fas fa-play-circle"></i> Hướng dẫn sử dụng
      </button>
    </div>

    <div class="res-grid" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; margin-bottom:24px;">
      ${cardsHtml}
    </div>

    <div style="background:#eff6ff; border:1px solid #bfdbfe; color:#1e3a8a; padding:12px 16px; border-radius:8px; font-size:13px; display:flex; gap:8px; align-items:center; margin-bottom:40px;">
      <i class="fas fa-info-circle" style="color:#3b82f6;"></i>
      <span>Hãy sử dụng Affiliate Code trên AMS hoặc mã quà tặng <strong>TUANBO2321</strong> khi chia sẻ để được ghi nhận hoàn chính xác. Mọi nội dung sử dụng cần tuân thủ <a href="#" style="color:#3b82f6; text-decoration:underline;">Chính sách Hợp tác & Quy định thương hiệu GE</a>.</span>
    </div>
  </div>
`;

if (!content.includes('id="tab-resources"')) {
  content = content.replace('</main>', tabHtml + '\n</main>');
  fs.writeFileSync('topuni-detail.html', content);
  console.log('Successfully injected tab-resources into topuni-detail.html');
} else {
  console.log('tab-resources already exists!');
}
