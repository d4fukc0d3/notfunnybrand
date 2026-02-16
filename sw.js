const CACHE_NAME = 'nfb-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/ropa.html',
  '/gorras.html',
  '/stickers.html',
  '/things.html',
  '/cart.html',
  '/change.html',
  '/style/retro90s.css',
  '/script/retro-effects.js',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
