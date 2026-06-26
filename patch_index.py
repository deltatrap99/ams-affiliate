import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace header right part
content = content.replace(
    '<span class="com-label">Cơ chế hoa hồng:</span>\n    <button class="tog">Theo lead</button>\n    <button class="tog on">Theo doanh số</button>',
    '<span class="com-label" style="color:var(--txt3)">Hình thức Affiliate:</span>\n    <button class="tog on" style="display:flex;align-items:center;gap:6px;background:none;border:1px solid #bfdbfe;color:#2563eb;padding:6px 12px;border-radius:var(--r-full)">Theo doanh số <i class="fas fa-chevron-down" style="font-size:10px"></i></button>'
)

# Extract everything before <main class="main"> and after </main>
main_start = content.find('<main class="main">')
main_end = content.find('</main>', main_start) + len('</main>')

pre_main = content[:main_start]
post_main = content[main_end:]

new_main = """<main class="main">
  <!-- SECTION: KPI ROW -->
  <div class="db-section-title">Hiệu suất tổng quan <span><i class="fas fa-sync-alt"></i> Cập nhật hôm nay</span></div>
  <div class="db-kpi-row">
    <div class="db-kpi-card blue">
      <div class="db-kpi-label">Qualified Lead hợp lệ <i class="fas fa-circle-info"></i></div>
      <div class="db-kpi-val">52 <div class="db-kpi-icon"><i class="fas fa-user-check"></i></div></div>
      <div class="db-kpi-sub"><span class="up">↑ 12</span> so với tháng trước</div>
    </div>
    <div class="db-kpi-card green">
      <div class="db-kpi-label">Đơn hàng / CR <i class="fas fa-circle-info"></i></div>
      <div class="db-kpi-val">12 <span>đơn</span> <span class="cr-val">CR 18.4%</span></div>
      <div class="db-kpi-sub"><span class="up">↑ 3 đơn</span> so với tháng trước</div>
      <div class="db-kpi-icon" style="position:absolute; right:20px; top:45px;"><i class="fas fa-shopping-cart"></i></div>
    </div>
    <div class="db-kpi-card orange">
      <div class="db-kpi-label">Doanh thu dự kiến <i class="fas fa-circle-info"></i></div>
      <div class="db-kpi-val">84.2<span>tr</span></div>
      <div class="db-kpi-sub"><span class="up">↑ 24.1tr</span> so với tháng trước</div>
      <div class="db-kpi-icon" style="position:absolute; right:20px; top:45px;"><i class="fas fa-wallet"></i></div>
    </div>
    <div class="db-kpi-card purple">
      <div class="db-kpi-label">Hoa hồng dự kiến <i class="fas fa-circle-info"></i></div>
      <div class="db-kpi-val">8.42<span>tr</span></div>
      <div class="db-kpi-sub">Đã duyệt: <span style="color:var(--green-dk);font-weight:600">5.62tr</span> <i class="fas fa-check-circle" style="color:var(--green-dk)"></i></div>
      <div class="db-kpi-icon" style="position:absolute; right:20px; top:45px;"><i class="fas fa-gift"></i></div>
    </div>
  </div>

  <!-- SECTION: CAMPAIGNS -->
  <div class="db-section-title">Chương trình trọng điểm đang diễn ra <a href="#" style="font-size:11.5px;color:#2563eb;font-weight:600;text-decoration:none">Xem tất cả chiến dịch →</a></div>
  <div class="db-camp-grid">
    <!-- Camp 1 -->
    <div class="db-camp-card gold">
      <div class="db-camp-head">
        <div class="db-camp-num">1</div>
        <div class="db-camp-name">TopUni 2027 — Lộ trình S V-ACT</div>
      </div>
      <div class="db-camp-tags">
        <span class="tag tag-yellow">⭐ Trọng điểm</span>
        <span class="tag tag-blue">COM 10% DS</span>
        <span class="tag tag-green">Bonus đến +30%</span>
        <span class="tag tag-purple">Content kit</span>
      </div>
      <div class="db-camp-desc">Luyện thi V-ACT lộ trình S cho học sinh lớp 12 / 2K9 — hệ thống hóa kiến thức, luyện đề theo giai đoạn, tối ưu điểm số xét tuyển đại học.</div>
      <div class="db-camp-stats">
        <div>
          <div class="db-cs-val"><i class="fas fa-users"></i> 26</div>
          <div class="db-cs-lbl">Lead</div>
        </div>
        <div>
          <div class="db-cs-val green"><i class="fas fa-sack-dollar"></i> 42tr</div>
          <div class="db-cs-lbl">Doanh thu</div>
        </div>
        <div>
          <div class="db-cs-val orange"><i class="fas fa-clock"></i> 5 ngày</div>
          <div class="db-cs-lbl">Deadline còn</div>
        </div>
      </div>
      <div class="db-camp-btns">
        <button class="btn-o"><i class="fas fa-link"></i> Sao chép link</button>
        <button class="btn-f dark">Xem brief</button>
      </div>
    </div>

    <!-- Camp 2 -->
    <div class="db-camp-card">
      <div class="db-camp-head">
        <div class="db-camp-num">2</div>
        <div class="db-camp-name">Easy SPEAK for Adults</div>
      </div>
      <div class="db-camp-tags">
        <span class="tag tag-green">Người đi làm</span>
        <span class="tag tag-blue">COM 10% DS</span>
        <span class="tag tag-orange">Ưu đãi</span>
        <span class="tag tag-purple">Content kit</span>
      </div>
      <div class="db-camp-desc">Tiếng Anh giao tiếp cho người đi làm, phù hợp người từ 18+ muốn cải thiện phản xạ và ứng dụng thực tế.</div>
      <div class="db-camp-stats">
        <div>
          <div class="db-cs-val"><i class="fas fa-users"></i> 18</div>
          <div class="db-cs-lbl">Lead</div>
        </div>
        <div>
          <div class="db-cs-val green"><i class="fas fa-sack-dollar"></i> 18tr</div>
          <div class="db-cs-lbl">Doanh thu</div>
        </div>
        <div>
          <div class="db-cs-val orange"><i class="fas fa-clock"></i> 4 ngày</div>
          <div class="db-cs-lbl">Deadline còn</div>
        </div>
      </div>
      <div class="db-camp-btns">
        <button class="btn-o"><i class="fas fa-link"></i> Sao chép link</button>
        <button class="btn-f dark">Xem brief</button>
      </div>
    </div>

    <!-- Camp 3 -->
    <div class="db-camp-card">
      <div class="db-camp-head">
        <div class="db-camp-num">3</div>
        <div class="db-camp-name">Hội thảo FUNiX – AI Cơ bản</div>
      </div>
      <div class="db-camp-tags">
        <span class="tag tag-teal">Hội thảo online</span>
        <span class="tag tag-blue">COM 13.5% DS</span>
      </div>
      <div class="db-camp-desc">Giới thiệu hội thảo AI miễn phí, mở ra cánh cửa vào thế giới công nghệ.</div>
      <div class="db-camp-stats">
        <div>
          <div class="db-cs-val"><i class="fas fa-users"></i> 8</div>
          <div class="db-cs-lbl">Lead</div>
        </div>
        <div>
          <div class="db-cs-val green"><i class="fas fa-sack-dollar"></i> 15tr</div>
          <div class="db-cs-lbl">Doanh thu</div>
        </div>
        <div>
          <div class="db-cs-val orange"><i class="fas fa-clock"></i> 7 ngày</div>
          <div class="db-cs-lbl">Deadline còn</div>
        </div>
      </div>
      <div class="db-camp-btns">
        <button class="btn-o"><i class="fas fa-link"></i> Sao chép link</button>
        <button class="btn-f dark">Xem brief</button>
      </div>
    </div>
  </div>

  <!-- SECTION: WIDGETS -->
  <div class="db-widget-grid">
    
    <!-- Widget 1: Tier -->
    <div class="db-widget">
      <div class="db-widget-title">⭐ Tiến độ cấp bậc Affiliate <i class="fas fa-chevron-right"></i></div>
      <div class="tier-flow" style="background:none; border:none; padding:0; margin-bottom:16px;">
        <div class="tier-badge">
          <div class="tier-badge-icon bronze" style="width:28px;height:28px;font-size:14px">🥉</div>
          <div class="tier-badge-name" style="font-size:11px">Bronze</div>
        </div>
        <div class="tier-arrow" style="margin:0 10px; font-size:10px">→</div>
        <div class="tier-badge">
          <div class="tier-badge-icon silver" style="width:28px;height:28px;font-size:14px">🥈</div>
          <div class="tier-badge-name" style="font-size:11px">Silver</div>
        </div>
        <div class="tier-progress" style="flex:1;margin-left:12px">
          <div class="tier-prog-info">
            <div class="tier-prog-text" style="font-size:11px; margin-bottom:4px">14 <span>/ 20 Qualified Lead</span></div>
            <div class="tier-pbar" style="height:4px"><div class="tier-pfill" style="width:70%; background:#2563eb"></div></div>
          </div>
          <div class="tier-pct" style="font-size:12px; color:#2563eb">70%</div>
        </div>
      </div>
      <div class="tier-perks-title" style="font-size:11px; margin-bottom:10px; padding-top:16px; border-top:1px dashed var(--border-lt)">Quyền lợi Silver</div>
      <div class="tier-perks" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px">
        <span class="tier-perk" style="font-size:10px; padding:4px"><i class="fas fa-check-square" style="color:#16a34a"></i> COM lên 10%</span>
        <span class="tier-perk" style="font-size:10px; padding:4px"><i class="fas fa-check-square" style="color:#16a34a"></i> Truy cập tài nguyên nâng cao</span>
        <span class="tier-perk" style="font-size:10px; padding:4px"><i class="fas fa-check-square" style="color:#16a34a"></i> Ưu tiên chiến dịch</span>
        <span class="tier-perk" style="font-size:10px; padding:4px"><i class="fas fa-check-square" style="color:#16a34a"></i> Hỗ trợ 1:1 từ AS Team</span>
      </div>
    </div>

    <!-- Widget 2: Lead Status -->
    <div class="db-widget">
      <div class="db-widget-title">📊 Trạng thái lead & đối soát <i class="fas fa-chevron-right"></i></div>
      <div class="db-lead-grid">
        <div class="db-ls new"><div class="db-ls-lbl">Lead mới</div><div class="db-ls-val">52</div></div>
        <div class="db-ls val"><div class="db-ls-lbl">Hợp lệ</div><div class="db-ls-val">38</div></div>
        <div class="db-ls dup"><div class="db-ls-lbl">Trùng</div><div class="db-ls-val">4</div></div>
        <div class="db-ls ver"><div class="db-ls-lbl">Đang xác minh</div><div class="db-ls-val">6</div></div>
        <div class="db-ls rej"><div class="db-ls-lbl">Bị loại</div><div class="db-ls-val">4</div></div>
      </div>
      <div class="lead-note" style="background:none; border:none; padding:0; justify-content:center; margin-top:auto"><i class="fas fa-info-circle"></i> Dữ liệu AMS là cơ sở chốt cuối cùng khi đối soát.</div>
    </div>

    <!-- Widget 3: Product Sales -->
    <div class="db-widget">
      <div class="db-widget-title">🛍 Doanh số theo sản phẩm <i class="fas fa-chevron-right"></i></div>
      <div class="db-prod-list">
        <div class="db-prod-item">
          <div class="db-prod-icon blue"><i class="fas fa-book"></i></div>
          <div class="db-prod-name">HOCMAI S-VACT</div>
          <div class="db-prod-stats"><div class="db-prod-val">4.2tr</div><div class="db-prod-pct">50% tổng doanh số</div></div>
        </div>
        <div class="db-prod-item">
          <div class="db-prod-icon green"><i class="fas fa-comments"></i></div>
          <div class="db-prod-name">Easy SPEAK for Adults</div>
          <div class="db-prod-stats"><div class="db-prod-val">1.8tr</div><div class="db-prod-pct">21% tổng doanh số</div></div>
        </div>
        <div class="db-prod-item">
          <div class="db-prod-icon purple"><i class="fas fa-laptop-code"></i></div>
          <div class="db-prod-name">FUNiX</div>
          <div class="db-prod-stats"><div class="db-prod-val">1.5tr</div><div class="db-prod-pct">18% tổng doanh số</div></div>
        </div>
        <div class="db-prod-item">
          <div class="db-prod-icon orange"><i class="fas fa-microphone"></i></div>
          <div class="db-prod-name">SpeakWell</div>
          <div class="db-prod-stats"><div class="db-prod-val">0.9tr</div><div class="db-prod-pct">11% tổng doanh số</div></div>
        </div>
      </div>
    </div>

    <!-- Widget 4: Tasks -->
    <div class="db-widget">
      <div class="db-widget-title">⭐ Việc cần làm hôm nay <i class="fas fa-chevron-right"></i></div>
      <div class="db-task-list">
        <div class="db-task-item">
          <input type="checkbox">
          <div class="db-task-info">
            <div class="db-task-name">Đăng thêm 1 Story cho V-ACT</div>
            <div class="db-task-sub">Tăng độ phủ và thu hút lead mới</div>
          </div>
          <i class="fas fa-chevron-right" style="font-size:10px; color:var(--txt3); margin-top:6px"></i>
        </div>
        <div class="db-task-item">
          <input type="checkbox">
          <div class="db-task-info">
            <div class="db-task-name">Nộp 2 kết quả còn thiếu</div>
            <div class="db-task-sub">Hoàn tất để được duyệt hoa hồng</div>
          </div>
          <i class="fas fa-chevron-right" style="font-size:10px; color:var(--txt3); margin-top:6px"></i>
        </div>
        <div class="db-task-item">
          <input type="checkbox" checked>
          <div class="db-task-info" style="opacity:0.6">
            <div class="db-task-name" style="text-decoration:line-through">Chia sẻ link chiến dịch mới</div>
            <div class="db-task-sub">TopUni 2027 đang có bonus đến +30%</div>
          </div>
          <i class="fas fa-chevron-right" style="font-size:10px; color:var(--txt3); margin-top:6px; opacity:0.6"></i>
        </div>
      </div>
      <div style="text-align:right; margin-top:auto"><a href="#" style="font-size:10.5px; color:#2563eb; font-weight:600; text-decoration:none">Xem tất cả việc cần làm →</a></div>
    </div>

  </div>

</main>"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(pre_main + new_main + post_main)
