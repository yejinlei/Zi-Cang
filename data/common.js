// 子藏本体论 - 通用脚本
const NAV_ITEMS = [
  {href:"index.html", label:"首頁"},
  {href:"library.html", label:"📜 全文庫"},
  {href:"ontology.html", label:"⬡ RDF本體"},
  {href:"index.html#schools", label:"九流十家"},
  {href:"index.html#thinkers", label:"諸子人物"},
  {href:"index.html#ontology", label:"本體架構"},
];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderNav();
  renderFooter();
  annotateConcepts();

  // 字号调整
  const fontBtns = document.querySelectorAll('.font-btn');
  if(fontBtns.length) {
    let size = localStorage.getItem('zicang_fontSize') || 18;
    document.documentElement.style.fontSize = size + 'px';
    fontBtns.forEach(btn => {
      btn.onclick = () => {
        if(btn.textContent === 'A+') size = Math.min(22, +size + 1);
        else size = Math.max(14, +size - 1);
        document.documentElement.style.fontSize = size + 'px';
        localStorage.setItem('zicang_fontSize', size);
      };
    });
  }

  // 竖排切换
  const vertBtn = document.getElementById('verticalMode');
  if(vertBtn) {
    if(localStorage.getItem('zicang_vertical') === '1') {
      document.body.classList.add('vertical');
      vertBtn.checked = true;
    }
    vertBtn.onchange = () => {
      document.body.classList.toggle('vertical', vertBtn.checked);
      localStorage.setItem('zicang_vertical', vertBtn.checked ? '1' : '0');
    };
  }
});

function renderNav() {
  const nav = document.querySelector('.top-nav');
  if(!nav) return;
  const current = location.pathname.split('/').pop() || 'index.html';
  const linksHtml = NAV_ITEMS.map(i =>
    `<a href="${i.href}" class="${i.href.startsWith(current) || (current==='' && i.href==='index.html') ? 'active' : ''}">${i.label}</a>`
  ).join('');
  const brand = `<a href="index.html" class="nav-brand"><span class="seal">子</span>子藏本体论</a>`;
  const links = `<nav class="nav-links">${linksHtml}</nav>`;
  // 如果nav为空，填充；否则保留已有自定义内容
  if(nav.children.length === 0) {
    nav.innerHTML = brand + links;
  }
}

function renderFooter() {
  if(document.querySelector('.footer')) return;
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <p>子藏本体论 · Zi-Cang Ontology &nbsp;|&nbsp; 典籍来源：<a href="https://daizhige.org/" target="_blank">殆知阁</a> &nbsp;|&nbsp; 参考架构：<a href="https://yejinlei.github.io/Buddhist" target="_blank">佛学本体论</a> / <a href="https://yejinlei.github.io/Confucian-Canon/" target="_blank">儒藏本体论</a></p>
    <p style="margin-top:4px;">按四轴×七层正交架构组织诸子百家文献 · 1463部典籍 · 约2亿字</p>
  `;
  document.body.appendChild(footer);
}

// 主题系统（子藏主题）
const THEMES = [
  {id:'xuanzhi', name:'宣紙古籍', icon:'卷', desc:'米黄朱红·诸子风',
   vars:{'--bg':'#f5efe0','--paper':'#fbf6e9','--paper2':'#f0e7d3','--ink':'#2b1d0e','--ink2':'#5a4227','--ink3':'#8a6c42','--red':'#b83b2f','--gold':'#d4a853','--jade':'#5d8f6f','--indigo':'#3d4f6f','--border':'#d4c6a8'}},
  {id:'shuimo', name:'水墨山水', icon:'☁', desc:'素白淡墨·写意风',
   vars:{'--bg':'#f8f8f6','--paper':'#ffffff','--paper2':'#f0f0ed','--ink':'#1a1a1a','--ink2':'#444444','--ink3':'#777777','--red':'#c83c3c','--gold':'#b8860b','--jade':'#4a7c59','--indigo':'#4a5f7f','--border':'#e0e0dc'}},
  {id:'zhujian', name:'竹簡漢簡', icon:'⺮', desc:'青竹墨·汉简书风',
   vars:{'--bg':'#2a3328','--paper':'#344032','--paper2':'#3d4b3b','--ink':'#e8e4d6','--ink2':'#c4bfb0','--ink3':'#9a9585','--red':'#d4634a','--gold':'#e2c079','--jade':'#7cb69a','--indigo':'#6a7a9f','--border':'#4a5a47'}},
  {id:'qingtong', name:'青銅吉金', icon:'鼎', desc:'玄黑金·商周铜器',
   vars:{'--bg':'#161310','--paper':'#201c18','--paper2':'#2a2520','--ink':'#e0d8c8','--ink2':'#b8af9f','--ink3':'#8a8272','--red':'#c94c3a','--gold':'#d4af37','--jade':'#6a9b83','--indigo':'#5a6a8f','--border':'#3a342d'}},
  {id:'xingxiang', name:'星象羅盤', icon:'✦', desc:'深空蓝·数术星空',
   vars:{'--bg':'#0f1425','--paper':'#181f36','--paper2':'#212a47','--ink':'#e0e6f5','--ink2':'#b0bad0','--ink3':'#7f8aa8','--red':'#e2705d','--gold':'#f0c86e','--jade':'#75b8a0','--indigo':'#7a8abf','--border':'#2d385c'}},
];

function initTheme() {
  let currentTheme = localStorage.getItem('zicang_theme') || 'xuanzhi';
  function applyTheme(themeId) {
    const theme = THEMES.find(t=>t.id===themeId) || THEMES[0];
    Object.entries(theme.vars).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));
    if(['qingtong','xingxiang','zhujian'].includes(themeId)){
      document.body.style.backgroundImage = 'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 50%),radial-gradient(circle at 80% 80%, rgba(184,59,47,0.06) 0%,transparent 50%)';
    }else{
      document.body.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'%23d4a853\' fill-opacity=\'0.03\' d=\'M0 0h100v100H0z\'/%3E%3C/svg%3E")';
    }
    localStorage.setItem('zicang_theme', themeId);
    currentTheme = themeId;
    renderThemeDropdown();
  }

  // 在导航栏中构建主题按钮（由 renderNav 挂载到 nav）
  const themeBtn = document.createElement('button');
  themeBtn.id = 'themeBtn';
  themeBtn.className = 'theme-nav-btn';
  themeBtn.innerHTML = '<span class="theme-diamond">✦</span><span class="theme-label">主題</span>';

  const themePanel = document.createElement('div');
  themePanel.id = 'themePanel';
  themePanel.className = 'theme-panel';

  // 延迟到 renderNav 之后挂载到导航栏（在 DOMContentLoaded 顺序里 initTheme 在 renderNav 前调用，这里用定时器等 nav 就绪）
  setTimeout(() => {
    const navLinks = document.querySelector('.nav-links');
    if(navLinks) {
      // 构造一个包裹按钮的 li 容器
      const wrap = document.createElement('span');
      wrap.className = 'theme-nav-wrap';
      wrap.style.cssText = 'position:relative;display:inline-flex;align-items:center;';
      wrap.appendChild(themeBtn);
      wrap.appendChild(themePanel);
      navLinks.appendChild(wrap);
    }
    renderThemeDropdown();
  }, 0);

  themeBtn.onclick = e => {
    e.stopPropagation();
    const open = themePanel.classList.toggle('open');
    themeBtn.classList.toggle('active', open);
  };
  document.addEventListener('click', () => {
    themePanel.classList.remove('open');
    themeBtn.classList.remove('active');
  });
  themePanel.addEventListener('click', e => e.stopPropagation());

  function renderThemeDropdown(){
    themePanel.innerHTML = '';
    THEMES.forEach(theme=>{
      const active = theme.id===currentTheme;
      const item = document.createElement('div');
      item.className = 'theme-item' + (active?' active':'');
      item.innerHTML = `
        <span class="theme-swatch" style="background:${theme.vars['--bg']};border-color:${theme.vars['--gold']};color:${theme.vars['--ink']};">${theme.icon}</span>
        <div class="theme-info">
          <div class="theme-name">${theme.name}</div>
          <div class="theme-desc">${theme.desc}</div>
        </div>
        ${active?'<span class="theme-check" style="color:var(--red);">●</span>':''}
      `;
      item.onclick = ()=>applyTheme(theme.id);
      themePanel.appendChild(item);
    });
  }

  applyTheme(currentTheme);
}

// 子学概念词典（核心术语hover释义）
const conceptDict = {
  '道':'先秦诸子最高哲学范畴，万物之本原与规律。道家以道为自然无为的本体，儒家以道为人伦秩序之准则。',
  '德':'道家指得道于己之德性，儒家指仁义礼智等道德品质；《老子》"道生之，德畜之"。',
  '仁':'孔子学说核心，"仁者爱人"，儒家处理人伦关系的根本德目，涵盖忠恕孝悌等。',
  '義':'宜也，行为合于道义正当性，孟子"义，人之正路也"，与仁并称。',
  '禮':'典章制度与行为规范，儒家主张"克己复礼"，维系社会秩序之纲维。',
  '法':'法家核心范畴，指法令制度、刑赏规范，商鞅、韩非主张以法治国、信赏必罚。',
  '術':'法家申不害重"术"，君主驾驭臣下的权术与策略；与法、势并为法家三要。',
  '勢':'法家慎到重"势"，君主的权势与威势，韩非集法、术、势之大成。',
  '無為':'道家核心概念，道法自然、不妄为，"我无为而民自化"，汉初黄老之治以此为纲。',
  '自然':'道家"道法自然"，指万物本然状态，非人力强为，是道的根本属性。',
  '性':'人之本性，孟子主人性善，荀子主人性恶，告子言"性无善无不善"，诸子争鸣核心议题。',
  '心':'思想知觉之主体，孟子以"本心""四端"论心，庄子论心斋坐忘，为心性论源头。',
  '氣':'构成天地万物的基本质料，孟子"养吾浩然之气"，庄子"通天下一气耳"。',
  '天':'先秦诸子多重含义：主宰之天、自然之天、义理之天、命运之天。',
  '命':'天命，天道必然性之赋予于人者，"死生有命，富贵在天"。',
  '名實':'名家核心议题，名（名称概念）与实（事物实质）之关系，公孙龙白马非马、尹文形名之辩。',
  '陰陽':'二元对立范畴，《易》以阴阳解释万物变化，邹衍五德终始、阴阳家以此推演天道人事。',
  '五行':'金木水火土五种元素及其生克关系，用于解释宇宙生成、历史更替、医道命理。',
  '兼愛':'墨子核心主张，"兼相爱，交相利"，无差等之爱，反对儒家差序仁爱。',
  '非攻':'墨子反战主张，反对不义攻伐，主张 defensive war（防御）。',
  '尚賢':'墨子、儒家共通主张，"不党父兄，不偏富贵，不嬖颜色"，唯才是举。',
  '齊物':'庄子核心思想，"天地与我并生，而万物与我为一"，齐同物论、消弭是非差别。',
  '逍遙':'庄子最高人生境界，"乘天地之正，御六气之辩，以游无穷"，无待而逍遥。',
  '化':'变化、化育，庄子观化、观化之论，万物流转不居。',
  '刑名':'法家、名家术语，刑（形）与名实之辨，循名责实，为法家治术核心。',
  '耕戰':'商鞅、法家核心政策，奖励农耕与军功，重农抑商、富国强兵。',
  '王道':'孟子政治理想，以德服人、行仁政，与霸道（以力服人）相对。',
  '霸道':'以力假仁，春秋五霸之治，法家、纵横家尚之，孟子贬之。',
  '中庸':'不偏不倚、无过不及，儒家实践智慧，《中庸》"致中和"。',
  '誠':'真实无妄，《中庸》"诚者天之道"，通贯天人的修养范畴。',
  '格物':'《大学》八条之始，即物穷理，宋明理学家核心工夫。',
  '良知':'孟子"不虑而知者良知也"，王阳明以之为心学本体，"致良知"。',
  '奇正':'兵家核心概念，正兵当敌、奇兵取胜，"凡战者以正合，以奇胜"——《孙子兵法》。',
  '廟算':'《孙子兵法·计篇》"夫未战而庙算胜者，得算多也"，战前战略谋划。',
  '兵勢':'《孙子兵法》有《势篇》，用兵之势，因利制权、激水漂石之势。',
};

function annotateConcepts() {
  const content = document.querySelector('.reader-content');
  if(!content) return;
  let html = content.innerHTML;
  const concepts = Object.keys(conceptDict).sort((a,b)=>b.length-a.length);
  concepts.forEach(c=>{
    const regex = new RegExp(`(?<!<[^>]*)${c}(?![^<]*>)`,'g');
    html = html.replace(regex,`<span class="concept" data-concept="${c}">${c}</span>`);
  });
  content.innerHTML = html;
  content.addEventListener('click', e=>{
    const el = e.target.closest('.concept');
    if(!el){document.querySelectorAll('.concept-popup').forEach(p=>p.remove());return;}
    const w = el.dataset.concept;
    document.querySelectorAll('.concept-popup').forEach(p=>p.remove());
    const popup = document.createElement('div');
    popup.className='concept-popup';
    popup.style.cssText='position:absolute;background:var(--paper);border:1px solid var(--gold);border-radius:8px;padding:12px 16px;box-shadow:var(--shadow-lg);max-width:300px;z-index:100;font-size:0.9rem;line-height:1.6;color:var(--ink);';
    popup.innerHTML=`<div style="color:var(--red);font-weight:600;font-size:1.1rem;margin-bottom:6px;">${w}</div><div>${conceptDict[w]}</div>`;
    const r = el.getBoundingClientRect();
    popup.style.top=(r.bottom+window.scrollY+8)+'px';
    popup.style.left=Math.max(10,r.left+window.scrollX-150+r.width/2)+'px';
    document.body.appendChild(popup);
    setTimeout(()=>{document.addEventListener('click',function cp(ev){if(!popup.contains(ev.target)&&!ev.target.classList.contains('concept')){popup.remove();document.removeEventListener('click',cp);}});},0);
  });
}

function showModal(title, html) {
  const modal = document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:2000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
  modal.innerHTML=`<div style="background:var(--paper);border-radius:16px;padding:24px;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:var(--shadow-lg);border:1px solid var(--border);"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><h3 style="color:var(--red);font-size:1.3rem;margin:0;">${title}</h3><button class="mc" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--ink2);">&times;</button></div><div style="color:var(--ink);line-height:1.8;">${html}</div></div>`;
  document.body.appendChild(modal);
  modal.querySelector('.mc').onclick=()=>modal.remove();
  modal.onclick=e=>e.target===modal&&modal.remove();
}
