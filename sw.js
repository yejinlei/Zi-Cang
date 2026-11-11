/* Zi-Cang PWA Service Worker */
const CACHE='zicang-v1';
const APP_SHELL=[
  './','./index.html','./library.html','./search.html','./ontology.html','./map.html','./data.html','./reader.html',
  './css/common.css','./js/common.js','./js/flexsearch.min.js',
  './data/books.json','./data/instances.json',
  './manifest.json'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.origin!==location.origin||e.request.method!=='GET'){return;}
  // 大txt文件走网络优先，失败用缓存
  if(url.pathname.endsWith('.txt')){
    e.respondWith(fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return r;}).catch(()=>caches.match(e.request)));
    return;
  }
  // App Shell走缓存优先
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return res;})));
});
