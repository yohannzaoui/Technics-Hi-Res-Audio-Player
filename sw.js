const CACHE_NAME = 'technics-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'img/Technics_logo.png',
  'img/favicon_512.png',
  'https://fonts.cdnfonts.com/css/ds-digital'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Stratégie : Network First (on essaie le réseau, sinon le cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
