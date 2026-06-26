const fs = require('fs');
const path = require('path');

const dir = '.';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('login'));

for (const file of htmlFiles) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // 1. Change name
  if (content.includes('Nguyễn Minh Anh')) {
    content = content.replaceAll('Nguyễn Minh Anh', 'Hoàng Thanh Dung');
    changed = true;
  }

  // 2. Change avatar initials NA → HD
  if (content.includes('>NA<')) {
    content = content.replaceAll('>NA<', '>HD<');
    changed = true;
  }

  // 3. Change affiliate code to partner code
  content = content.replaceAll('Mã: AFF183', 'Mã đối tác: 11198');
  content = content.replaceAll('Mã: AFF123', 'Mã đối tác: 11198');

  // 4. Remove copy buttons block
  const copyBtnsBlock = `          <div class="pd-copy-btns">
            <button class="pd-copy" onclick="copyText('AFF123', this)"><i class="fas fa-copy"></i> Sao chép mã Affiliate</button>
            <button class="pd-copy" onclick="copyText('https://ams.link/AFF123', this)"><i class="fas fa-link"></i> Sao chép link giới thiệu</button>
          </div>`;
  if (content.includes(copyBtnsBlock)) {
    content = content.replace(copyBtnsBlock, '');
    changed = true;
  }

  // Also try \r\n version
  const copyBtnsBlockCRLF = copyBtnsBlock.replaceAll('\n', '\r\n');
  if (content.includes(copyBtnsBlockCRLF)) {
    content = content.replace(copyBtnsBlockCRLF, '');
    changed = true;
  }

  // 5. Make Đăng xuất redirect to login.html
  content = content.replace(
    '<div class="pd-logout"><i class="fas fa-right-from-bracket"></i> Đăng xuất</div>',
    '<div class="pd-logout" onclick="window.location.href=\'login.html\'" style="cursor:pointer"><i class="fas fa-right-from-bracket"></i> Đăng xuất</div>'
  );

  // 6. Make Hồ sơ của tôi open a profile modal
  content = content.replace(
    '<div class="pd-item"><i class="fas fa-user"></i> Hồ sơ của tôi</div>',
    '<div class="pd-item" onclick="openProfileModal()" style="cursor:pointer"><i class="fas fa-user"></i> Hồ sơ của tôi</div>'
  );

  // 7. Add profile modal + script before </body> if not already there
  if (!content.includes('id="profileModal"') && content.includes('</body>')) {
    const profileModal = `
<!-- Profile Modal -->
<div id="profileModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; justify-content:center; align-items:center;">
  <div style="background:#fff; border-radius:16px; padding:32px; width:480px; max-width:90vw; box-shadow:0 20px 60px rgba(0,0,0,0.15); position:relative;">
    <button onclick="closeProfileModal()" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:20px; cursor:pointer; color:#64748b;">&times;</button>
    <h2 style="margin:0 0 24px 0; font-size:20px; font-weight:700; color:#0f172a;">Hồ sơ của tôi</h2>
    
    <!-- Avatar -->
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
      <div style="width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg, #6366f1, #8b5cf6); color:#fff; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700; flex-shrink:0;">HD</div>
      <div>
        <div style="font-weight:700; color:#0f172a; margin-bottom:4px;">Hoàng Thanh Dung</div>
        <div style="font-size:12px; color:#64748b;">Mã đối tác: 11198</div>
        <button onclick="document.getElementById('avatarUpload').click()" style="margin-top:8px; font-size:12px; padding:4px 12px; border:1px solid #e2e8f0; border-radius:6px; background:#fff; cursor:pointer; color:#2563eb; font-weight:600;">
          <i class="fas fa-camera" style="margin-right:4px;"></i> Đổi ảnh đại diện
        </button>
        <input type="file" id="avatarUpload" accept="image/*" style="display:none" onchange="handleAvatarChange(this)">
      </div>
    </div>

    <!-- Form -->
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div>
        <label style="font-size:12px; font-weight:600; color:#475569; display:block; margin-bottom:6px;">Họ và tên</label>
        <input type="text" id="profileName" value="Hoàng Thanh Dung" style="width:100%; padding:10px 14px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; font-family:inherit; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#e2e8f0'">
      </div>
      <div>
        <label style="font-size:12px; font-weight:600; color:#475569; display:block; margin-bottom:6px;">Số điện thoại</label>
        <input type="tel" id="profilePhone" value="0912 345 678" style="width:100%; padding:10px 14px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; font-family:inherit; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#e2e8f0'">
      </div>
      <div>
        <label style="font-size:12px; font-weight:600; color:#475569; display:block; margin-bottom:6px;">Email</label>
        <input type="email" id="profileEmail" value="thanhdung@gmail.com" style="width:100%; padding:10px 14px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; font-family:inherit; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#e2e8f0'">
      </div>
      <div>
        <label style="font-size:12px; font-weight:600; color:#475569; display:block; margin-bottom:6px;">Link Facebook cá nhân</label>
        <input type="url" id="profileFacebook" value="" placeholder="https://facebook.com/username" style="width:100%; padding:10px 14px; border:1px solid #e2e8f0; border-radius:8px; font-size:14px; font-family:inherit; outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='#2563eb'" onblur="this.style.borderColor='#e2e8f0'">
      </div>
    </div>

    <!-- Actions -->
    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
      <button onclick="closeProfileModal()" style="padding:10px 20px; border:1px solid #e2e8f0; border-radius:8px; background:#fff; cursor:pointer; font-weight:600; color:#475569; font-family:inherit;">Hủy</button>
      <button onclick="saveProfile()" style="padding:10px 20px; border:none; border-radius:8px; background:#2563eb; color:#fff; cursor:pointer; font-weight:600; font-family:inherit;">Lưu thay đổi</button>
    </div>
  </div>
</div>

<script>
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.style.display = 'flex';
  // Close dropdown
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.classList.remove('show');
  const overlay = document.getElementById('ddOverlay');
  if (overlay) overlay.classList.remove('show');
}
function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
}
function handleAvatarChange(input) {
  if (input.files && input.files[0]) {
    alert('Ảnh đại diện đã được chọn: ' + input.files[0].name + '. Tính năng upload sẽ được kích hoạt khi kết nối server.');
  }
}
function saveProfile() {
  const name = document.getElementById('profileName').value;
  const phone = document.getElementById('profilePhone').value;
  const email = document.getElementById('profileEmail').value;
  const fb = document.getElementById('profileFacebook').value;
  alert('Đã lưu thông tin!\\nHọ tên: ' + name + '\\nSĐT: ' + phone + '\\nEmail: ' + email + '\\nFacebook: ' + (fb || 'Chưa cập nhật'));
  closeProfileModal();
}
// Close modal on background click
document.getElementById('profileModal').addEventListener('click', function(e) {
  if (e.target === this) closeProfileModal();
});
</script>
`;
    content = content.replace('</body>', profileModal + '\n</body>');
    changed = true;
  }

  if (changed || content !== fs.readFileSync(path.join(dir, file), 'utf8')) {
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated: ' + file);
  }
}

console.log('Done!');
