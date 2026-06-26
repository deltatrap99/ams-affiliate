const fs = require('fs');

// ========== 1. Update index.html ==========
let index = fs.readFileSync('index.html', 'utf8');

// Rename campaign
index = index.replace(
  '<div class="db-camp-name">Hội thảo FUNiX – AI Cơ bản</div>',
  '<a href="funix-detail.html" class="db-camp-name" style="text-decoration:none;">[FUNiX] Workshop Ứng dụng AI nâng cao hiệu suất công việc</a>'
);

// Add onclick to Xem brief button for Camp 3
const camp3Parts = index.split('<!-- Camp 3 -->');
if (camp3Parts.length > 1) {
  let camp3Block = camp3Parts[1].split('</div>\r\n  </div>')[0];
  camp3Block = camp3Block.replace(
    '<button class="btn-f dark">Xem brief</button>',
    '<button class="btn-f dark" onclick="window.location.href=\'funix-detail.html\'">Xem brief</button>'
  );
  index = camp3Parts[0] + '<!-- Camp 3 -->' + camp3Block + '</div>\r\n  </div>' + camp3Parts[1].split('</div>\r\n  </div>').slice(1).join('</div>\r\n  </div>');
}

// Update the todo list item
index = index.replace('FUNiX', '[FUNiX] Workshop AI');

fs.writeFileSync('index.html', index);
console.log('Updated index.html');

// ========== 2. Create funix-detail.html ==========
let detail = fs.readFileSync('topuni-detail.html', 'utf8');

// Title
detail = detail.replace(
  '<title>AMS — [HOCMAI] Lộ trình TopUni S-VACT</title>',
  '<title>AMS — [FUNiX] Workshop Ứng dụng AI nâng cao hiệu suất công việc</title>'
);

// Hero Logo
detail = detail.replace(
  'https://hocmai.vn/assets/front/images/logo.png',
  'https://funix.edu.vn/wp-content/uploads/2021/10/logo-funix.png'
);
detail = detail.replace(
  'alt="HOCMAI" style="width:70%; margin-bottom:4px;">',
  'alt="FUNiX" style="width:80%; margin-bottom:4px;">'
);
detail = detail.replace(
  '<div style="color: #0b3992; font-weight: 900; font-size: 24px; letter-spacing: -0.5px; line-height: 1.2;">S-VACT</div>',
  '<div style="color: #0b3992; font-weight: 900; font-size: 16px; letter-spacing: -0.5px; line-height: 1.2;">Workshop</div>'
);

// Hero Title & Desc
detail = detail.replace(
  '[HOCMAI] S-VACT – Luyện thi đánh giá năng lực',
  '[FUNiX] Workshop Ứng dụng AI nâng cao hiệu suất công việc'
);
detail = detail.replace(
  'Chương trình luyện thi S-VACT dành cho học sinh 12 (2K9) – hệ thống hóa kiến thức, luyện đề theo giai đoạn, tối ưu điểm số xét tuyển đại học.',
  'Chuỗi workshop thực chiến giúp người đi làm ứng dụng AI để tối ưu công việc, tăng năng suất và bứt phá hiệu quả cá nhân.'
);

// Hero Stats
detail = detail.replace(
  '<div style="font-weight: 600;">HOCMAI S-VACT</div>',
  '<div style="font-weight: 600;">FUNiX – Workshop</div>'
);
detail = detail.replace(
  '<div style="font-weight: 600;">Học sinh lớp 12 (2K9)</div>',
  '<div style="font-weight: 600;">Người đi làm, sinh viên, người quan tâm AI</div>'
);

// KPIs
detail = detail.replace('>52 <', '>36 <');
detail = detail.replace('↑ 12 <', '↑ 12 <'); // keep same
detail = detail.replace('>12 <span', '>9 <span');
detail = detail.replace('CR 17.6%', 'CR 25%');
detail = detail.replace('↑ 3 đơn', '↑ 3 đơn');
detail = detail.replace('84.200.000đ', '28.080.000đ');
detail = detail.replace('↑ 24.1tr', '↑ 8.4tr');
detail = detail.replace('8.420.000đ', '2.808.000đ');
detail = detail.replace('5.620.000đ', '1.320.000đ');

// Link Tracking
detail = detail.replace(
  'https://topuni.hocmai.vn/vact',
  'https://topuni.hocmai.vn/funix-ai-workshop'
);

// Tab resources header
detail = detail.replace(
  '[HOCMAI] TopUni S-VACT – Luyện thi cấp tốc',
  '[FUNiX] Workshop Ứng dụng AI'
);

// Rank
detail = detail.replace('#5 <', '#7 <');
detail = detail.replace('12 đơn → 4,860,000đ', '9 đơn → 1,980,000đ');

fs.writeFileSync('funix-detail.html', detail);
console.log('Created funix-detail.html');

// ========== 3. Update funix-detail.html Description ==========
detail = fs.readFileSync('funix-detail.html', 'utf8');

const startMarker = '    <!-- Description -->';
const endMarker = '    <!-- Tracking -->';
const idxStart = detail.indexOf(startMarker);
const idxEnd = detail.indexOf(endMarker);

if (idxStart !== -1 && idxEnd !== -1) {
  const before = detail.substring(0, idxStart);
  const after = detail.substring(idxEnd);

  const newDesc = `    <!-- Description -->
    <div class="detail-box" style="grid-row: span 2;">
      <div class="detail-box-title" style="margin-bottom:16px;">Mô tả chiến dịch</div>
      
      <p class="desc-text" style="font-weight:700; color:var(--navy); margin-bottom:8px;">[FUNiX] Workshop Ứng dụng AI nâng cao hiệu suất công việc</p>
      
      <p class="desc-text" style="margin-bottom:20px;">Chuỗi workshop thực chiến dành cho người đi làm và sinh viên, giúp nắm bắt xu hướng AI và ứng dụng vào công việc để tiết kiệm thời gian, nâng cao hiệu suất và tạo ra lợi thế cạnh tranh.</p>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Nội dung nổi bật:</div>
      
      <ul style="margin:0 0 24px 0; padding-left:20px; font-size:13px; color:var(--txt2); line-height:1.8;">
        <li><i class="fas fa-check" style="color:#10b981; margin-right:6px;"></i> Cập nhật xu hướng & công cụ AI mới nhất</li>
        <li><i class="fas fa-check" style="color:#10b981; margin-right:6px;"></i> Ứng dụng AI trong nhiều lĩnh vực công việc thực tế</li>
        <li><i class="fas fa-check" style="color:#10b981; margin-right:6px;"></i> Hướng dẫn chi tiết bằng case study & demo</li>
        <li><i class="fas fa-check" style="color:#10b981; margin-right:6px;"></i> Giao lưu Q&A cùng mentor FUNiX</li>
        <li><i class="fas fa-check" style="color:#10b981; margin-right:6px;"></i> Tài liệu & ưu đãi đặc biệt cho người tham dự</li>
      </ul>
      
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-laptop" style="margin-top:2px;"></i><div><strong>Hình thức:</strong> Online qua Zoom</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-users" style="margin-top:2px;"></i><div><strong>Đối tượng:</strong> Người đi làm, sinh viên, người quan tâm AI</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-tag" style="margin-top:2px;"></i><div><strong>Giá:</strong> Miễn phí tham dự</div></div>
    </div>
`;
  detail = before + newDesc + after;
  fs.writeFileSync('funix-detail.html', detail);
  console.log('Updated funix-detail.html description');
}
