const fs = require('fs');

const files = ['funix-detail.html', 'topuni-detail.html', 'easyspeak-detail.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the entire "Lưu ý quan trọng" block
  const marker = '<div style="font-size:12px; margin-bottom:4px; font-weight:600; color:#3b82f6;"><i class="fas fa-info-circle"></i> Lưu ý quan trọng</div>';
  
  if (content.includes(marker)) {
    // Find the parent track-detail div
    const idx = content.indexOf(marker);
    const parentStart = content.lastIndexOf('<div class="track-detail"', idx);
    // Find the closing </div> of this track-detail + its parent track-section
    const parentEnd = content.indexOf('</div>\n      </div>', parentStart);
    
    if (parentStart !== -1 && parentEnd !== -1) {
      const before = content.substring(0, parentStart);
      const after = content.substring(parentEnd + '</div>\n      </div>'.length);
      content = before + after;
      fs.writeFileSync(file, content);
      console.log(`Removed from ${file}`);
    } else {
      console.log(`Could not find bounds in ${file}`);
    }
  } else {
    console.log(`Not found in ${file}`);
  }
}
