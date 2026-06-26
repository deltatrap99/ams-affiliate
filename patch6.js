const fs = require('fs');

let content = fs.readFileSync('topuni-detail.html', 'utf8');

const startMarker = '    <!-- Description -->';
const endMarker = '    <!-- Tracking -->';

const idxStart = content.indexOf(startMarker);
const idxEnd = content.indexOf(endMarker);

if (idxStart !== -1 && idxEnd !== -1) {
    const beforeStr = content.substring(0, idxStart);
    const afterStr = content.substring(idxEnd);
    
    const newBlock = `    <!-- Description -->
    <div class="detail-box" style="grid-row: span 2;">
      <div class="detail-box-title" style="margin-bottom:16px;">Mô tả chiến dịch</div>
      
      <p class="desc-text" style="font-weight:700; color:var(--navy); margin-bottom:8px;">[HOCMAI] Lộ trình TopUni S-VACT – Luyện thi cấp tốc kỳ thi V-ACT</p>
      
      <p class="desc-text" style="margin-bottom:8px;">TopUni S-VACT là chương trình luyện thi chuyên sâu được thiết kế dành riêng cho học sinh THPT đang có mục tiêu tham gia kỳ thi V-ACT (Vietnamese Assessment Competency Test) – kỳ thi đánh giá năng lực đang được nhiều trường đại học sử dụng trong xét tuyển đầu vào.</p>
      <p class="desc-text" style="margin-bottom:20px;">Chương trình tập trung giúp học sinh xây dựng năng lực làm bài trong thời gian ngắn, tối ưu điểm số thông qua hệ thống học tập tinh gọn, chiến lược và bám sát cấu trúc đề thi thực tế.</p>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Học viên sẽ nhận được:</div>
      
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:24px;">
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-book-open" style="color:var(--blue); width:20px;"></i> Lộ trình luyện thi cấp tốc toàn diện</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Hệ thống kiến thức trọng tâm bám sát cấu trúc đề V-ACT mới nhất</li>
            <li>Tinh gọn nội dung học theo hướng tối ưu hiệu quả trong thời gian ngắn</li>
            <li>Ôn tập tập trung vào nhóm kiến thức có xác suất xuất hiện cao</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-file-pen" style="color:#f59e0b; width:20px;"></i> Kho đề luyện tập mô phỏng thực chiến</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Bộ đề luyện thi mô phỏng chuẩn cấu trúc kỳ thi thật</li>
            <li>Hệ thống bài tập phân cấp độ từ cơ bản đến nâng cao</li>
            <li>Làm quen áp lực thời gian và chiến thuật phân bổ thời gian làm bài</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-bullseye" style="color:#ef4444; width:20px;"></i> Chiến lược tăng điểm cá nhân hóa</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Hướng dẫn phương pháp làm bài nhanh và tối ưu điểm số</li>
            <li>Phân tích dạng câu hỏi thường gặp và các lỗi học sinh dễ mắc</li>
            <li>Kỹ thuật xử lý câu hỏi vận dụng và tư duy logic</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-chalkboard-user" style="color:#10b981; width:20px;"></i> Đội ngũ giảng viên chuyên môn cao</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Giáo viên có kinh nghiệm luyện thi THPT và các kỳ thi đánh giá năng lực</li>
            <li>Phương pháp giảng dạy tập trung vào hiệu quả đầu ra</li>
            <li>Đồng hành giải đáp xuyên suốt quá trình học</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-laptop" style="color:#8b5cf6; width:20px;"></i> Học tập linh hoạt online</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Học trực tuyến mọi lúc, không giới hạn địa lý</li>
            <li>Xem lại bài giảng trong quá trình học</li>
            <li>Phù hợp học sinh cần tăng tốc trước mùa tuyển sinh đại học</li>
          </ul>
        </div>
      </div>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Phù hợp với đối tượng:</div>
      <ul style="margin:0; padding-left:20px; font-size:13px; color:var(--txt2); line-height:1.6; margin-bottom:24px;">
        <li>Học sinh lớp 11 chuẩn bị sớm cho kỳ thi đánh giá năng lực</li>
        <li>Học sinh lớp 12 đang chuẩn bị xét tuyển đại học năm 2026</li>
        <li>Học sinh có mục tiêu vào các trường đại học xét tuyển bằng V-ACT</li>
        <li>Học sinh cần lộ trình ôn thi cấp tốc trong giai đoạn nước rút</li>
      </ul>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Thông tin chương trình</div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-graduation-cap" style="margin-top:2px;"></i><div><strong>Hình thức học:</strong> Online trực tuyến</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-clock" style="margin-top:2px;"></i><div><strong>Thời lượng:</strong> Theo lộ trình chuyên sâu từng giai đoạn</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-map-marker-alt" style="margin-top:2px;"></i><div><strong>Khu vực tuyển sinh:</strong> Toàn quốc</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-calendar-days" style="margin-top:2px;"></i><div><strong>Thời gian triển khai:</strong> 20/06 – 30/9/2026</div></div>
    </div>
`;
    content = beforeStr + newBlock + afterStr;
    fs.writeFileSync('topuni-detail.html', content);
    console.log('Successfully applied patch6.js using indices');
} else {
    console.log('Could not find start or end markers');
}
