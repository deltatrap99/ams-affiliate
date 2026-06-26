const CACHE_NAME = 'ams-affiliate-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/campaigns.html',
  '/leads.html',
  '/commission.html',
  '/leaderboard.html',
  '/resources.html',
  '/login.html',
  '/style.css',
  '/detail.css',
  '/mobile.css',
  '/icon.svg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't fail if some assets are missing
      return Promise.all(
        ASSETS_TO_CACHE.map(url => {
          return cache.add(url).catch(err => console.warn('SW failed to cache:', url));
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Network first for API requests
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Cache first for static assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchRes) => {
        // Cache new static assets
        if (fetchRes.status === 200) {
          const resClone = fetchRes.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return fetchRes;
      }).catch(() => {
        // Fallback for failed network requests (e.g. offline page)
        // If it's a page request, return index.html
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
