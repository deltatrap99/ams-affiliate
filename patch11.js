const fs = require('fs');

let content = fs.readFileSync('easyspeak-detail.html', 'utf8');

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
      
      <p class="desc-text" style="font-weight:700; color:var(--navy); margin-bottom:8px;">[ICANCONNECT] Easy SPEAK for Adults</p>
      
      <p class="desc-text" style="margin-bottom:8px;">Easy SPEAK for Adults là chương trình tiếng Anh giao tiếp dành cho người trưởng thành từ 18 tuổi trở lên, giúp học viên tự tin sử dụng tiếng Anh trong công việc, giao tiếp hàng ngày và môi trường quốc tế.</p>
      <p class="desc-text" style="margin-bottom:20px;">Chương trình tập trung phát triển khả năng phản xạ nghe – nói thực tế thông qua lộ trình học bài bản, dễ ứng dụng và phù hợp với người bận rộn.</p>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Học viên sẽ nhận được:</div>
      
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:24px;">
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-comments" style="color:var(--blue); width:20px;"></i> Nâng cao khả năng giao tiếp thực chiến</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Luyện phản xạ giao tiếp trong các tình huống thực tế hằng ngày</li>
            <li>Tự tin trò chuyện trong môi trường công việc và cuộc sống</li>
            <li>Phát triển phát âm chuẩn và khả năng diễn đạt tự nhiên</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-bullseye" style="color:#ef4444; width:20px;"></i> Lộ trình học cá nhân hóa theo trình độ</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Kiểm tra đầu vào và xây dựng lộ trình phù hợp</li>
            <li>Nội dung học tập trung vào mục tiêu sử dụng thực tế</li>
            <li>Theo dõi tiến độ và cải thiện năng lực theo từng giai đoạn</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-chalkboard-teacher" style="color:#10b981; width:20px;"></i> Thực hành trực tiếp cùng giáo viên chất lượng cao</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Tương tác thường xuyên cùng đội ngũ giáo viên chuyên môn</li>
            <li>Sửa lỗi phát âm, ngữ điệu và cách diễn đạt ngay trong quá trình học</li>
            <li>Tăng khả năng sử dụng tiếng Anh tự nhiên thông qua thực hành liên tục</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-briefcase" style="color:#f59e0b; width:20px;"></i> Ứng dụng tiếng Anh trong công việc và môi trường quốc tế</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Giao tiếp trong họp hành, thuyết trình và trao đổi công việc</li>
            <li>Tăng lợi thế nghề nghiệp và cơ hội phát triển bản thân</li>
            <li>Xây dựng sự tự tin khi làm việc với khách hàng hoặc đối tác quốc tế</li>
          </ul>
        </div>
        
        <div>
          <div style="font-weight:600; color:var(--navy); margin-bottom:6px;"><i class="fas fa-mobile-alt" style="color:#8b5cf6; width:20px;"></i> Học tập linh hoạt, phù hợp người đi làm</div>
          <ul style="margin:0; padding-left:24px; font-size:13px; color:var(--txt2); line-height:1.6;">
            <li>Chủ động thời gian học mọi lúc, mọi nơi</li>
            <li>Hình thức học tối ưu cho lịch trình bận rộn</li>
            <li>Dễ dàng duy trì việc học lâu dài và tạo thói quen sử dụng tiếng Anh mỗi ngày</li>
          </ul>
        </div>
      </div>
      
      <div style="font-weight:700; color:var(--navy); margin-bottom:12px; font-size:14px;">Thông tin chương trình</div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-users" style="margin-top:2px;"></i><div><strong>Đối tượng:</strong> Người trưởng thành 18+</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-graduation-cap" style="margin-top:2px;"></i><div><strong>Hình thức học:</strong> Online Live Class</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-map-marker-alt" style="margin-top:2px;"></i><div><strong>Khu vực áp dụng:</strong> Toàn quốc</div></div>
      <div class="desc-item" style="align-items:flex-start;"><i class="fas fa-calendar-days" style="margin-top:2px;"></i><div><strong>Hiệu lực:</strong> 20/06 – 31/10/2026</div></div>
    </div>
`;
    content = beforeStr + newBlock + afterStr;
    fs.writeFileSync('easyspeak-detail.html', content);
    console.log('Successfully applied patch11.js');
} else {
    console.log('Could not find start or end markers');
}
