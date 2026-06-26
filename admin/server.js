const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ---------------------------------------------------------------------------
// Data helpers – read / write JSON files in ./data
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(__dirname, 'data');

// Auto-create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('📁 Created data directory:', DATA_DIR);
}

function readJSON(file) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJSON(file, data) {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Generic CRUD factory
// ---------------------------------------------------------------------------
function createCRUDRoutes(router, resourceName, dataFile) {
  // GET all
  router.get(`/${resourceName}`, (_req, res) => {
    try {
      const items = readJSON(dataFile);
      res.json(items);
    } catch (err) {
      console.error(`❌ GET /${resourceName} error:`, err.message);
      res.status(500).json({ error: 'Không thể đọc dữ liệu' });
    }
  });

  // GET by id
  router.get(`/${resourceName}/:id`, (req, res) => {
    try {
      const items = readJSON(dataFile);
      const item = items.find((i) => i.id === req.params.id);
      if (!item) return res.status(404).json({ error: 'Không tìm thấy' });
      res.json(item);
    } catch (err) {
      console.error(`❌ GET /${resourceName}/:id error:`, err.message);
      res.status(500).json({ error: 'Không thể đọc dữ liệu' });
    }
  });

  // POST create
  router.post(`/${resourceName}`, (req, res) => {
    try {
      const items = readJSON(dataFile);
      const newItem = req.body;
      if (!newItem.id) {
        newItem.id = `${resourceName.slice(0, -1)}-${Date.now()}`;
      }
      items.push(newItem);
      writeJSON(dataFile, items);
      res.status(201).json(newItem);
    } catch (err) {
      console.error(`❌ POST /${resourceName} error:`, err.message);
      res.status(500).json({ error: 'Không thể tạo dữ liệu' });
    }
  });

  // PUT update
  router.put(`/${resourceName}/:id`, (req, res) => {
    try {
      const items = readJSON(dataFile);
      const idx = items.findIndex((i) => i.id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy' });
      items[idx] = { ...items[idx], ...req.body, id: req.params.id };
      writeJSON(dataFile, items);
      res.json(items[idx]);
    } catch (err) {
      console.error(`❌ PUT /${resourceName}/:id error:`, err.message);
      res.status(500).json({ error: 'Không thể cập nhật dữ liệu' });
    }
  });

  // DELETE
  router.delete(`/${resourceName}/:id`, (req, res) => {
    try {
      let items = readJSON(dataFile);
      const idx = items.findIndex((i) => i.id === req.params.id);
      if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy' });
      const deleted = items.splice(idx, 1)[0];
      writeJSON(dataFile, items);
      res.json({ message: 'Đã xóa thành công', item: deleted });
    } catch (err) {
      console.error(`❌ DELETE /${resourceName}/:id error:`, err.message);
      res.status(500).json({ error: 'Không thể xóa dữ liệu' });
    }
  });
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------
const apiRouter = express.Router();

createCRUDRoutes(apiRouter, 'campaigns', 'campaigns.json');
createCRUDRoutes(apiRouter, 'leads', 'leads.json');
createCRUDRoutes(apiRouter, 'affiliates', 'affiliates.json');
createCRUDRoutes(apiRouter, 'contents', 'contents.json');
createCRUDRoutes(apiRouter, 'admins', 'admins.json');

// Special: PATCH /api/leads/:id/status  — update lead status
apiRouter.patch('/leads/:id/status', (req, res) => {
  try {
    const { status, reject_reason } = req.body;
    const validStatuses = ['new', 'valid', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Trạng thái không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(', ')}`,
      });
    }

    const leads = readJSON('leads.json');
    const idx = leads.findIndex((l) => l.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy lead' });

    leads[idx].status = status;
    if (status === 'rejected') {
      leads[idx].reject_reason = reject_reason || null;
    } else {
      leads[idx].reject_reason = null;
    }

    writeJSON('leads.json', leads);
    res.json(leads[idx]);
  } catch (err) {
    console.error('❌ PATCH /leads/:id/status error:', err.message);
    res.status(500).json({ error: 'Không thể cập nhật trạng thái' });
  }
});

app.use('/api', apiRouter);

// ---------------------------------------------------------------------------
// Static files
// ---------------------------------------------------------------------------

// Admin CMS — served at /admin
app.use('/admin', express.static(path.join(__dirname, 'public')));

// Fallback for admin SPA routes (e.g. /admin/campaigns, /admin/leads)
app.get('/admin/*', (_req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Admin page not found');
  }
});

// Main AMS Affiliate site — served at root /
const MAIN_SITE_DIR = path.resolve(__dirname, '..');
app.use(express.static(MAIN_SITE_DIR, { index: 'index.html' }));

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║       AMS Affiliate Management System           ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  🌐 Main site:  http://localhost:${PORT}/          ║`);
  console.log(`║  🔧 Admin CMS:  http://localhost:${PORT}/admin     ║`);
  console.log(`║  📡 API:        http://localhost:${PORT}/api       ║`);
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('📂 Data directory:', DATA_DIR);
  console.log('📂 Admin public: ', path.join(__dirname, 'public'));
  console.log('📂 Main site:    ', MAIN_SITE_DIR);
  console.log('');
});
