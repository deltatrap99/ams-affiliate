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
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
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

// ===== Sidebar Active State =====
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
