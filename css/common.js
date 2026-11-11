// ===== 子藏本体论 公共脚本 =====
// 主题、导航、页脚统一逻辑

const THEMES = [
  { id: 'paper', name: '宣紙古籍', color: '#8B2500', bg: '#F5ECD7', desc: '米黃宣紙，古籍墨韻' },
  { id: 'ink',   name: '水墨山水', color: '#1a3a2e', bg: '#e8ece4', desc: '水墨青綠，文人雅意' },
  { id: 'bamboo',name: '竹簡漢簡', color: '#5d2d0c', bg: '#e8dcc8', desc: '竹簡木牘，漢風古意' },
  { id: 'bronze',name: '青銅吉金', color: '#3d5a45', bg: '#d8d3c0', desc: '青銅翠墨，吉金銘文' },
  { id: 'star',  name: '星象羅盤', color: '#4a3c6e', bg: '#e4dfec', desc: '紫炁星盤，數術玄機' }
];

function initTheme() {
  let saved = localStorage.getItem('zicang_theme') || 'paper';
  if (!THEMES.find(t => t.id === saved)) saved = 'paper';
  applyTheme(saved);
}

function applyTheme(id) {
  const t = THEMES.find(x => x.id === id);
  if (!t) return;
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem('zicang_theme', id);
  // 更新导航栏按钮状态
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === id);
  });
  const btn = document.getElementById('themeBtn');
  if (btn) {
    const txt = btn.querySelector('.theme-btn-txt');
    if (txt) txt.textContent = t.name;
  }
}

function buildNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = [
    { h: 'index.html',    t: '☰ 首頁' },
    { h: 'library.html',  t: '📚 全文庫' },
    { h: 'ontology.html', t: '⬡ 諸子本體' }
  ];
  let linkHtml = links.map(l =>
    `<a href="${l.h}" class="nav-link ${here===l.h?'active':''}">${l.t}</a>`
  ).join('');

  const current = THEMES.find(t => t.id === (localStorage.getItem('zicang_theme')||'paper')) || THEMES[0];
  const optsHtml = THEMES.map(t =>
    `<div class="theme-option ${t.id===current.id?'active':''}" data-theme="${t.id}" onclick="applyTheme('${t.id}');closeTheme();">
       <span class="theme-dot" style="background:${t.color}"></span>
       <span class="theme-name">${t.name}</span>
       <span class="theme-desc">${t.desc}</span>
     </div>`
  ).join('');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        <span class="brand-char">子</span>
        <span class="brand-text">藏本體 · Zi-Cang Ontology</span>
      </a>
      <nav class="nav-links">${linkHtml}</nav>
      <div class="theme-switcher" id="themeSwitcher">
        <button class="theme-btn" id="themeBtn" onclick="toggleTheme(event)">
          <span class="theme-ico">✦</span>
          <span class="theme-btn-txt">${current.name}</span>
          <span class="theme-arrow">▾</span>
        </button>
        <div class="theme-panel" id="themePanel" style="display:none;">
          <div class="theme-panel-title">選擇閱讀主題</div>
          ${optsHtml}
        </div>
      </div>
    </div>`;
}

function toggleTheme(e) {
  e.stopPropagation();
  const p = document.getElementById('themePanel');
  if (!p) return;
  p.style.display = p.style.display === 'none' ? 'block' : 'none';
}
function closeTheme() {
  const p = document.getElementById('themePanel');
  if (p) p.style.display = 'none';
}
document.addEventListener('click', () => closeTheme());

function buildFooter() {
  const f = document.getElementById('siteFooter');
  if (!f) return;
  f.innerHTML = `
    <div class="footer-inner">
      <div class="footer-col">
        <div class="footer-title">☰ 子藏本體論 Zi-Cang Ontology</div>
        <p class="footer-desc">以道家為基軸，貫通儒、墨、法、名、兵、農、陰陽、縱橫、雜、小說十家，建構中國諸子學的開放知識圖譜。</p>
      </div>
      <div class="footer-col">
        <div class="footer-title">📚 文本來源</div>
        <p class="footer-desc">全文基於殆知閣古籍文本庫，十部分類，逾一萬六千部典籍。</p>
      </div>
      <div class="footer-col">
        <div class="footer-title">🔗 參考項目</div>
        <p class="footer-desc"><a href="https://yejinlei.github.io/Buddhist" target="_blank">佛學本體論</a> · <a href="https://yejinlei.github.io/Confucian-Canon/" target="_blank">儒藏</a> · <a href="https://yejinlei.github.io/The-Book-of-Changes/" target="_blank">易經本體</a></p>
      </div>
      <div class="footer-col">
        <div class="footer-title">⬡ 開放授權</div>
        <p class="footer-desc">本體與文本以 CC BY-SA 4.0 開放共享，數據與代碼可自由引用、衍生與商業使用，需署名且以相同方式分享。</p>
      </div>
    </div>
    <div class="footer-bottom">© 2026 子藏本體論項目 · Zi-Cang Ontology</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildNav();
  buildFooter();
});
