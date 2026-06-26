const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('fonts.googleapis.com')) {
    content = content.replace('</head>', fontLinks + '</head>');
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
console.log('Done adding fonts.');
