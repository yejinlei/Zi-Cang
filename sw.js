const CACHE = 'zicang-v13';
const APP_SHELL = [
  './',
  './index.html',
  './library.html',
  './reader.html',
  './search.html',
  './ontology.html',
  './classics.html',
  './terms.html',
  './idioms.html',
  './tools.html',
  './spec.html',
  './people.html',
  './panjiao.html',
  './timeline.html',
  './graph.html',
  './citation.html',
  './reasoning.html',
  './statistics.html',
  './full-ontology.html',
  './map.html',
  './data.html',
  './css/common.css',
  './js/common.js',
  './js/linkify.js',
  './js/flexsearch.min.js',
  './data/books.js',
  './data/daoti.js',
  './data/debates.js',
  './data/people.js',
  './data/people_ext.js',
  './data/schools.js',
  './data/classics.js',
  './data/terms.js',
  './data/idioms.js',
  './data/paths.js',
  './data/commentaries.js',
  './data/ontology-schema.js',
  './data/timeline.js',
  './data/panjiao.js',
  './data/citation.js',
  './data/reasoning.js',
  './data/chapters.js',
  './data/concept_book.js',
  './data/mention_book.js',
  './data/anchors.js',
  './data/ontobuild_summary.js',
  './manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname;
  if (path.startsWith('/texts/') || path.startsWith('/Zi-Cang/texts/')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        if (e.request.destination === 'document') return caches.match('./index.html');
      });
    })
  );
});
