const CACHE_NAME = 'retro-hub-v1';
const BASE = '/retro-hub-pwa/';

const urlsToCache = [
    BASE,
    BASE + 'css/styles.css',
    BASE + 'js/app.js',
    BASE + 'js/games/snake.js',
    BASE + 'js/games/flappy.js',
    BASE + 'js/games/mario.js',
    BASE + 'js/games/geometry.js',
    BASE + 'manifest.json'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
