/* ===================================

	SW cache handle

======================================*/


// sets the cache name
var staticCacheName = 'ep-static-v0.5';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
      './',
      './index.html',
      './components/img/calendar-favicon.png',
      './components/img/calendar.png'
      ]);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

// adds cleanup for old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('ep-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});


self.addEventListener('fetch', function(event) {
  
 // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  // parses the request URL form the cache
  var requestURL = new URL(event.request.url);

  // checks to see if the request URL is the same as the current origin
  if (requestURL.origin === location.origin) {
    //after the first request is true, checks if the user's request URL is the root
    if (requestURL.pathname ==='/') {
      // and if so, responds with the /skeleton URL instead
      // grabs the /skeleton URL straight, from the cache
      event.respondWith(caches.match('/'));
      // no need to go the network as a fallback if this fails, as /skeleton is cached no matter what during the sw install
      return;
    }
  } 

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// skips waiting to update SW
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
