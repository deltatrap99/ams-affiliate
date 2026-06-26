/* ============================================
   AMS Admin — Shared JavaScript Utilities
   Toast, Modal, Confirm, Formatters, Sidebar
   ============================================ */

// === Toast Container ===
(function initToastContainer() {
  if (!document.getElementById('toast-container')) {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
})();

/**
 * Hiển thị toast notification
 * @param {string} message - Nội dung thông báo
 * @param {'success'|'error'|'info'|'warning'} type - Loại thông báo
 * @param {number} duration - Thời gian hiển thị (ms), mặc định 3500
 */
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  const icons = {
    success: 'fa-check',
    error: 'fa-xmark',
    info: 'fa-info',
    warning: 'fa-exclamation'
  };
  const titles = {
    success: 'Thành công',
    error: 'Lỗi',
    info: 'Thông báo',
    warning: 'Cảnh báo'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${icons[type] || icons.info}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${titles[type] || titles.info}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()"><i class="fas fa-xmark"></i></button>
  `;

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Hiển thị modal overlay
 * @param {string} title - Tiêu đề modal
 * @param {string} bodyHTML - Nội dung HTML bên trong modal body
 * @param {object} options - Tùy chọn: { footerHTML, maxWidth, onClose }
 */
function showModal(title, bodyHTML, options = {}) {
  // Remove existing modal
  hideModal();

  const overlay = document.createElement('div');
  overlay.id = 'admin-modal-overlay';
  overlay.className = 'modal-overlay';

  const maxWidth = options.maxWidth || '600px';
  const footerHTML = options.footerHTML || '';

  overlay.innerHTML = `
    <div class="modal" style="max-width:${maxWidth}">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close" onclick="hideModal()"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideModal();
  });

  // Escape to close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      hideModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Trigger animation
  requestAnimationFrame(() => overlay.classList.add('open'));
}

/**
 * Ẩn modal overlay
 */
function hideModal() {
  const overlay = document.getElementById('admin-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 200);
  }
}

/**
 * Hiển thị confirm dialog
 * @param {string} message - Nội dung xác nhận
 * @param {object} options - { title, confirmText, cancelText, type }
 * @returns {Promise<boolean>}
 */
function confirmAction(message, options = {}) {
  return new Promise((resolve) => {
    const existing = document.getElementById('confirm-overlay');
    if (existing) existing.remove();

    const title = options.title || 'Xác nhận';
    const confirmText = options.confirmText || 'Xác nhận';
    const cancelText = options.cancelText || 'Hủy bỏ';
    const type = options.type || 'danger';

    const overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.className = 'confirm-overlay open';

    const iconMap = {
      danger: '<i class="fas fa-trash-can"></i>',
      warning: '<i class="fas fa-exclamation-triangle"></i>',
      info: '<i class="fas fa-question-circle"></i>'
    };

    overlay.innerHTML = `
      <div class="confirm-box">
        <div class="confirm-icon">${iconMap[type] || iconMap.danger}</div>
        <div class="confirm-title">${title}</div>
        <div class="confirm-msg">${message}</div>
        <div class="confirm-btns">
          <button class="btn btn-outline" id="confirm-cancel">${cancelText}</button>
          <button class="btn btn-danger" id="confirm-ok">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = (result) => {
      overlay.remove();
      resolve(result);
    };

    overlay.querySelector('#confirm-ok').addEventListener('click', () => cleanup(true));
    overlay.querySelector('#confirm-cancel').addEventListener('click', () => cleanup(false));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(false);
    });
  });
}

/**
 * Format số tiền sang đơn vị Việt Nam
 * @param {number} amount - Số tiền
 * @returns {string}
 */
function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format ISO date string sang dd/mm/yyyy
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format ngày giờ đầy đủ
 * @param {string} dateStr
 * @returns {string}
 */
function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${min}`;
}

/**
 * Format số gọn (1200000 → 1.2tr)
 * @param {number} num
 * @returns {string}
 */
function formatCompact(num) {
  if (num == null || isNaN(num)) return '0';
  if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' tỷ';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'tr';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

// === Sidebar Active State Management ===
document.addEventListener('DOMContentLoaded', () => {
  highlightSidebar();
});

function highlightSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const items = document.querySelectorAll('.sidebar-item');

  items.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href) {
      const itemPage = href.split('/').pop();
      if (itemPage === currentPage) {
        item.classList.add('active');
      }
    }
  });
}

// === API Helper ===
const API_BASE = '/api';

async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`API GET ${endpoint} failed:`, err);
    throw err;
  }
}

async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`API POST ${endpoint} failed:`, err);
    throw err;
  }
}

async function apiPut(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`API PUT ${endpoint} failed:`, err);
    throw err;
  }
}

async function apiDelete(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`API DELETE ${endpoint} failed:`, err);
    throw err;
  }
}

/**
 * Debounce utility
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
