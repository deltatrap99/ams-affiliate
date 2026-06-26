const fs = require('fs');
const path = require('path');

const dir = '.';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('login'));

for (const file of htmlFiles) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // 1. Add mobile.css link if not already present
  if (!content.includes('mobile.css')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="mobile.css">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>');
    changed = true;
  }

  // 2. Add hamburger button in header-left if not present
  if (!content.includes('mobile-menu-btn') && content.includes('header-left')) {
    content = content.replace(
      '<div class="header-left">',
      '<div class="header-left">\n    <button class="mobile-menu-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>'
    );
    changed = true;
  }

  // 3. Add sidebar overlay div after sidebar if not present
  if (!content.includes('sidebar-overlay') && content.includes('</aside>')) {
    content = content.replace(
      '</aside>',
      '</aside>\n<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>'
    );
    changed = true;
  }

  // 4. Add toggleSidebar script before </body> if not present
  if (!content.includes('toggleSidebar') || !content.includes('function toggleSidebar')) {
    const script = `
<script>
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}
// Close sidebar on window resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar').classList.remove('open');
    var overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('show');
  }
});
</script>`;
    if (!content.includes('function toggleSidebar')) {
      content = content.replace('</body>', script + '\n</body>');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated: ' + file);
  }
}

console.log('Done!');
