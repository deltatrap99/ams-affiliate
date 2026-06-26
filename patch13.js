const fs = require('fs');

const files = ['topuni-detail.html', 'easyspeak-detail.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  const startMarker = '<!-- Timeline -->';
  const endMarker = '</div> <!-- end tab-overview -->';
  
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  
  if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    content = before + after;
    fs.writeFileSync(file, content);
    console.log(`Removed timeline from ${file}`);
  } else {
    console.log(`Markers not found in ${file}. start=${startIdx}, end=${endIdx}`);
  }
}
