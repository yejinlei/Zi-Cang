const CACHE = 'zicang-v24';
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
  './cross.html',
  './map.html',
  './data.html',
  './zhuangzi.html',
  './laozi.html',
  './liezi.html',
  './lunyu.html',
  './mengzi.html',
  './xunzi.html',
  './hanfeizi.html',
  './mozi.html',
  './css/common.css',
  './js/common.js',
  './js/linkify.js',
  './js/flexsearch.min.js',
  './data/books.js',
  './data/books.json',
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
  './data/cross.js',
  './data/concept-evolve.js',
  './data/concept-pairs.js',
  './data/people-pairs.js',
  './data/people-links.js',
  './data/rdf-export.js',
  './data/chapters_full.js',
  './data/sentence_index.js',
  './data/concept_full.js',
  './data/mention_full.js',
  './data/anchors_precise.js',
  './data/ontobuild_summary.js',
  './data/zhuangzi-data.js',
  './data/laozi-data.js',
  './data/liezi-data.js',
  './data/lunyu-data.js',
  './data/mengzi-data.js',
  './data/xunzi-data.js',
  './data/hanfeizi-data.js',
  './data/mozi-data.js',
  './manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  // 强制删除所有旧版本缓存（v21/v22/v23），让用户立刻拿到新版本
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname;
  // 文本文件：network-first，避免缓存旧版本文本
  if (path.startsWith('/texts/') || path.startsWith('/Zi-Cang/texts/')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // 带版本号的资源（?v=23/24）：stale-while-revalidate，但优先新请求
  if (url.search.includes('v=')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // 其他静态资源：cache-first，但后台更新
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
