const fs = require('fs');

let detail = fs.readFileSync('easyspeak-detail.html', 'utf8');

// Title tags
detail = detail.replaceAll(
  '<title>AMS — [HOCMAI] Lộ trình TopUni S-VACT</title>',
  '<title>AMS — [ICANCONNECT] Easy SPEAK for Adults</title>'
);

// Hero Header
detail = detail.replaceAll(
  'alt="HOCMAI" style="width:70%; margin-bottom:4px;">',
  'alt="ICANCONNECT" style="width:100%; border-radius:8px;">'
);
detail = detail.replaceAll(
  'https://hocmai.vn/assets/front/images/logo.png',
  'https://easyspeak.ican.vn/test'
);
detail = detail.replaceAll(
  '<div style="color: #0b3992; font-weight: 900; font-size: 24px; letter-spacing: -0.5px; line-height: 1.2;">S-VACT</div>',
  ''
);

detail = detail.replaceAll(
  '[HOCMAI] S-VACT – Luyện thi đánh giá năng lực',
  '[ICANCONNECT] Easy SPEAK for Adults'
);
detail = detail.replaceAll(
  'Chương trình luyện thi S-VACT dành cho học sinh 12 (2K9) – hệ thống hóa kiến thức, luyện đề theo giai đoạn, tối ưu điểm số xét tuyển đại học.',
  'Chương trình tiếng Anh giao tiếp dành cho người trưởng thành.<br>Giúp bạn nói tiếng Anh tự tin hơn trong công việc và cuộc sống.'
);

// Hero Stats
detail = detail.replaceAll(
  '<div style="font-weight: 600;">HOCMAI S-VACT</div>',
  '<div style="font-weight: 600;">Easy SPEAK for Adults</div>'
);
detail = detail.replaceAll(
  '<div style="font-weight: 600;">Học sinh lớp 12 (2K9)</div>',
  '<div style="font-weight: 600;">Người trưởng thành 18+</div>'
);

// KPIs
detail = detail.replace('52', '46');
detail = detail.replace('12', '18');
detail = detail.replace('CR 17.6%', 'CR 19.6%');
detail = detail.replace('↑ 3 đơn', '↑ 4 đơn');
detail = detail.replaceAll('84.200.000đ', '62.400.000đ'); // Actually 84.200.000đ appears once
detail = detail.replace('↑ 24.1tr', '↑ 18.2tr');
detail = detail.replaceAll('8.420.000đ', '6.240.000đ'); // appears once
detail = detail.replaceAll('5.620.000đ', '3.860.000đ');

// Link Tracking section
detail = detail.replaceAll(
  'https://topuni.hocmai.vn/vact',
  'https://topuni.hocmai.vn/easy-speak'
);

// Description Section
detail = detail.replaceAll(
  '[HOCMAI] Lộ trình TopUni S-VACT – Luyện thi cấp tốc kỳ thi V-ACT',
  '[ICANCONNECT] Easy SPEAK for Adults'
);
detail = detail.replaceAll(
  'TopUni S-VACT là chương trình luyện thi chuyên sâu được thiết kế dành riêng cho học sinh THPT đang có mục tiêu tham gia kỳ thi V-ACT (Vietnamese Assessment Competency Test) – kỳ thi đánh giá năng lực đang được nhiều trường đại học sử dụng trong xét tuyển đầu vào.',
  'Easy SPEAK for Adults là chương trình tiếng Anh giao tiếp dành cho người trưởng thành từ 18 tuổi trở lên, giúp bạn tự tin giao tiếp trong công việc, cuộc sống và môi trường quốc tế.'
);
detail = detail.replaceAll(
  'Chương trình tập trung giúp học sinh xây dựng năng lực làm bài trong thời gian ngắn, tối ưu điểm số thông qua hệ thống học tập tinh gọn, chiến lược và bám sát cấu trúc đề thi thực tế.',
  'Chương trình tập trung vào phản xạ nói, luyện nghe thực tế và ứng dụng ngay vào các tình huống hàng ngày.'
);

// Content Tab Header
detail = detail.replaceAll(
  '[HOCMAI] TopUni S-VACT – Luyện thi cấp tốc',
  '[ICANCONNECT] Easy SPEAK for Adults'
);

fs.writeFileSync('easyspeak-detail.html', detail);

// In index.html
let index = fs.readFileSync('index.html', 'utf8');

index = index.replace(
  '<div class="db-camp-name">Easy SPEAK for Adults</div>',
  '<a href="easyspeak-detail.html" class="db-camp-name" style="text-decoration:none;">[ICANCONNECT] Easy SPEAK for Adults</a>'
);

const parts = index.split('<!-- Camp 3 -->');
if (parts.length > 1) {
    let beforeCamp3 = parts[0];
    const camp2Start = beforeCamp3.lastIndexOf('<!-- Camp 2 -->');
    if (camp2Start !== -1) {
        let camp2Block = beforeCamp3.substring(camp2Start);
        camp2Block = camp2Block.replace(
            '<button class="btn-f dark">Xem brief</button>',
            '<button class="btn-f dark" onclick="window.location.href=\'easyspeak-detail.html\'">Xem brief</button>'
        );
        index = beforeCamp3.substring(0, camp2Start) + camp2Block + '<!-- Camp 3 -->' + parts[1];
    }
}

fs.writeFileSync('index.html', index);

console.log('Successfully patched easyspeak-detail.html and index.html');
