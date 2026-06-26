const fs = require('fs');
const path = require('path');

const dir = '.';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('login'));

for (const file of htmlFiles) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // Replace all logo variants with the image logo
  // Pattern 1: <a href="index.html" class="logo"><div class="logo-icon">AMS</div><span class="logo-text">Galaxy Education</span></a>
  // Pattern 2: <a href="index.html" class="logo"><div class="logo-icon">AMS</div><span class="logo-text">Agent Management System</span></a>
  // Pattern 3: <a href="#" class="logo"><div class="logo-icon">AMS</div><span class="logo-text">Galaxy Education</span></a>
  // Pattern 4: index.html has split structure
  
  const logoReplacements = [
    // Standard patterns
    ['<div class="logo-icon">AMS</div><span class="logo-text">Galaxy Education</span>',
     '<img src="ge-logo.png" alt="Galaxy Education" style="height:32px;">'],
    ['<div class="logo-icon">AMS</div><span class="logo-text">Agent Management System</span>',
     '<img src="ge-logo.png" alt="Galaxy Education" style="height:32px;">'],
  ];

  for (const [target, replacement] of logoReplacements) {
    if (content.includes(target)) {
      content = content.replaceAll(target, replacement);
      changed = true;
    }
  }

  // Handle index.html which has the logo split across lines
  if (file === 'index.html') {
    // The index.html logo might be on separate lines
    const indexLogoPattern = `<div class="logo-icon">AMS</div>`;
    if (content.includes(indexLogoPattern)) {
      // Find and replace the whole logo block
      const logoStart = content.indexOf(indexLogoPattern);
      if (logoStart !== -1) {
        // Check for logo-text on next line
        const afterLogo = content.substring(logoStart);
        const logoTextMatch = afterLogo.match(/<div class="logo-icon">AMS<\/div>\s*\n?\s*<span class="logo-text">[^<]+<\/span>/);
        if (logoTextMatch) {
          content = content.replace(logoTextMatch[0], '<img src="ge-logo.png" alt="Galaxy Education" style="height:32px;">');
          changed = true;
        } else {
          // Just replace the icon div alone
          content = content.replace(indexLogoPattern, '<img src="ge-logo.png" alt="Galaxy Education" style="height:32px;">');
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated logo: ' + file);
  } else {
    console.log('No logo change needed: ' + file);
  }
}

console.log('Done!');
