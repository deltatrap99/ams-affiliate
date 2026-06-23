// ===== AMS Dashboard - Interactive Logic =====

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initTabs();
  initToggles();
  initCountUp();
  initProgressBars();
});

// ===== Scroll-triggered Animations =====
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.kpi-card, .campaign-card, .commission-banner, .alert-banner')
    .forEach(el => observer.observe(el));
}

// ===== Tab Switching =====
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ===== Commission Model Toggle =====
function initToggles() {
  const togLead = document.getElementById('togLead');
  const togRevenue = document.getElementById('togRevenue');
  
  if (!togLead || !togRevenue) return;
  
  togLead.addEventListener('click', () => {
    togLead.classList.add('on');
    togLead.innerHTML = 'Theo lead <i class="fas fa-check" style="font-size:9px"></i>';
    togRevenue.classList.remove('on');
    togRevenue.innerHTML = 'Theo doanh số';
    document.body.classList.add('mode-lead');
  });
  
  togRevenue.addEventListener('click', () => {
    togRevenue.classList.add('on');
    togRevenue.innerHTML = 'Theo doanh số <i class="fas fa-check" style="font-size:9px"></i>';
    togLead.classList.remove('on');
    togLead.innerHTML = 'Theo lead';
    document.body.classList.remove('mode-lead');
  });
}

// ===== KPI Count-up Animation =====
function initCountUp() {
  const kpiValues = document.querySelectorAll('.kpi-value[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const isFloat = target.includes('.');
        const targetNum = parseFloat(target);
        const duration = 1200;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * targetNum;
          el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  kpiValues.forEach(el => observer.observe(el));
}

// ===== Progress Bar Animation =====
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => {
          el.style.width = el.getAttribute('data-width');
        }, 300);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(el => {
    el.style.width = '0%';
    observer.observe(el);
  });
}

document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== Profile Dropdown Toggle =====
function initProfileDropdown() {
  const trigger = document.getElementById('avatarTrigger');
  const dropdown = document.getElementById('profileDropdown');
  const wrapper = trigger ? trigger.closest('.profile-wrapper') : null;

  if (!trigger || !dropdown) return;

  // Stop ALL clicks inside wrapper from reaching document
  if (wrapper) wrapper.addEventListener('click', (e) => e.stopPropagation());

  trigger.addEventListener('click', () => {
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      dropdown.classList.add('open');
    }
  });

  // Close only on menu item / logout click
  dropdown.querySelectorAll('.pd-item, .pd-logout').forEach(item => {
    item.addEventListener('click', () => closeAllDropdowns());
  });
}

// ===== Notification Dropdown =====
function initNotifDropdown() {
  const trigger = document.getElementById('bellTrigger');
  const dropdown = document.getElementById('notifDropdown');
  const wrapper = trigger ? trigger.closest('.notif-wrapper') : null;

  if (!trigger || !dropdown) return;

  // Stop ALL clicks inside wrapper from reaching document
  if (wrapper) wrapper.addEventListener('click', (e) => e.stopPropagation());

  trigger.addEventListener('click', () => {
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      dropdown.classList.add('open');
      showOverlay();
    }
  });

  // Tab filtering
  const tabs = dropdown.querySelectorAll('.nd-tab');
  const items = dropdown.querySelectorAll('.nd-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('on'));
      tab.classList.add('on');

      const filter = tab.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all') {
          item.style.display = '';
        } else if (filter === 'unread') {
          item.style.display = item.classList.contains('unread') ? '' : 'none';
        } else {
          item.style.display = item.getAttribute('data-type') === filter ? '' : 'none';
        }
      });
    });
  });

  // Mark all as read
  const markReadBtn = dropdown.querySelector('.nd-mark-read');
  if (markReadBtn) {
    markReadBtn.addEventListener('click', () => {
      items.forEach(item => item.classList.remove('unread'));
      const countBadge = dropdown.querySelector('.nd-count');
      if (countBadge) countBadge.textContent = '0';
      const dot = document.querySelector('.bell .dot');
      if (dot) dot.style.display = 'none';
      markReadBtn.textContent = '✓ Đã đọc hết';
      markReadBtn.style.color = 'var(--green)';
    });
  }

  // Footer link closes dropdown
  const footerLink = dropdown.querySelector('.nd-footer a');
  if (footerLink) footerLink.addEventListener('click', () => closeAllDropdowns());
}

// ===== Close Logic =====
function closeAllDropdowns() {
  const profileDD = document.getElementById('profileDropdown');
  const notifDD = document.getElementById('notifDropdown');
  if (profileDD) profileDD.classList.remove('open');
  if (notifDD) notifDD.classList.remove('open');
}

function initCloseHandlers() {
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
  // Close on any click outside wrappers
  document.addEventListener('click', () => closeAllDropdowns());
}

// ===== Copy to Clipboard =====
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 1500);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 1500);
  });
}

// Initialize all dropdowns on page load
document.addEventListener('DOMContentLoaded', () => {
  initProfileDropdown();
  initNotifDropdown();
  initCloseHandlers();
});
