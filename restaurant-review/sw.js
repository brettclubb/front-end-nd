let staticCache = 'restaurant-reviews-v7';
let urlsToCache = [
  './',
  './css/styles.css',
  './js/main.js',
  './js/restaurant_info.js',
  './index.html',
  './restaurant.html',
  './img/'
];


self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(staticCache)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );    
  });

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCache;
                }).map(function(cacheName){
                    console.log('deleting: ' + cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
  
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request);
        })
    );
});