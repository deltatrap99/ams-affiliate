const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Add fonts back since git checkout removed them
if (!content.includes('fonts.googleapis.com')) {
    const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
`;
    content = content.replace('</head>', fontLinks + '</head>');
}

// Rename campaign and make it a link
content = content.replace(
    '<div class="db-camp-name">TopUni 2027 — Lộ trình S V-ACT</div>',
    '<a href="campaign-detail.html" class="db-camp-name" style="text-decoration:none;">[HOCMAI] Lộ trình TopUni S-VACT</a>'
);

// Add onclick to button
content = content.replace(
    '<button class="btn-f dark">Xem brief</button>',
    '<button class="btn-f dark" onclick="window.location.href=\'campaign-detail.html\'">Xem brief</button>'
);

// Change the task name
content = content.replace(
    '<div class="db-task-sub">TopUni 2027 đang có bonus đến +30%</div>',
    '<div class="db-task-sub">[HOCMAI] Lộ trình TopUni S-VACT đang có bonus đến +30%</div>'
);

fs.writeFileSync('index.html', content);
console.log('Fixed index.html');
