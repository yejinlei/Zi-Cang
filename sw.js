const CACHE = 'zicang-v28';
// 预缓存列表：仅含首屏核心 shell；超大索引文件（几 MB）不预缓存，运行时按需缓存
// addAll 是原子操作，任一文件 404/超限会导致整个 install 失败，所以只列确定存在且体积小的文件
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
  './data/ontobuild_summary.js',
  './data/anchors_precise.js',
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
// 超大索引文件：不在 install 时预缓存，首次用到再缓存
const LAZY_CACHE = [
  './data/chapters_full.js',
  './data/sentence_index.js',
  './data/concept_full.js',
  './data/mention_full.js'
];

self.addEventListener('install', e => {
  // 逐个缓存 + 容错：单个文件失败不阻塞整体 install
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.all(APP_SHELL.map(url => {
        return cache.add(url).catch(err => {
          // 静默跳过失败项（可能是 404 或配额不足），不阻断 SW 激活
          console.warn('[SW] skip cache:', url, err && err.message);
        });
      }));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  // 强制删除所有旧版本缓存，让用户立刻拿到新版本
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== CACHE ? caches.delete(k) : null)
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname;

  // 文本文件：network-first，避免缓存旧版本文本
  if (path.startsWith('/texts/') || path.endsWith('.txt')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // 超大索引文件：cache-first（首次 network 拉取并缓存，后续走缓存）
  const isLazy = LAZY_CACHE.some(p => path.endsWith(p.replace('./','/'))) || LAZY_CACHE.some(p => path.endsWith(p.replace('./','/Zi-Cang/')));
  if (isLazy) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
          }
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // 带版本号的资源（?v=xx）：network-first，新版本立即生效
  if (url.search.includes('v=')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // 其他静态资源：stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
