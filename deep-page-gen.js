// 通用诸子深度页面生成器 v22
// 输入 DATA（如 ZHUANGZI_DATA/LIEZI_DATA），输出完整 HTML
const fs = require('fs');
const path = require('path');

// 页面CSS
const STYLE = `
.depth-hero{background:linear-gradient(135deg,var(--hero-from,#1a2a3f) 0%,var(--hero-mid,#2d4258) 60%,var(--hero-to,#4a6481) 100%);color:#f5efe0;padding:32px 28px;border-radius:10px;margin-bottom:22px;position:relative;overflow:hidden}
.depth-hero::before{content:attr(data-char);position:absolute;right:-20px;top:-40px;font-size:260px;color:rgba(245,239,224,.06);font-family:"KaiTi","STKaiti",serif;font-weight:900;line-height:1}
.depth-hero h1{margin:0 0 8px 0;font-size:32px;letter-spacing:4px;font-family:"KaiTi","STKaiti",serif}
.depth-hero .sub{color:#c9b98f;font-size:15px;margin-bottom:14px;letter-spacing:2px}
.depth-hero .meta-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px}
.depth-hero .chip{background:rgba(245,239,224,.12);border:1px solid rgba(201,185,143,.35);padding:6px 14px;border-radius:20px;font-size:13px;color:#e8dec4}
.depth-hero .chip b{color:#f2d98a;margin-right:4px}
.depth-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:20px 0}
.depth-kpi{background:#faf6ec;border:1px solid #e2d8bc;padding:14px 12px;border-radius:8px;text-align:center}
.depth-kpi .num{font-size:28px;color:var(--accent,#8b3a2f);font-weight:700;font-family:"KaiTi",serif}
.depth-kpi .lbl{color:#6a5a3c;font-size:12px;margin-top:4px;letter-spacing:1px}
.tabs{display:flex;gap:6px;border-bottom:2px solid #c9b98f;margin:20px 0 16px;flex-wrap:wrap}
.tab-btn{padding:10px 18px;background:#faf6ec;border:1px solid #e2d8bc;border-bottom:none;border-radius:8px 8px 0 0;cursor:pointer;font-size:14px;color:#6a5a3c;font-family:"KaiTi",serif;letter-spacing:1px;transition:all .2s}
.tab-btn:hover{background:#f0e8cf}
.tab-btn.active{background:var(--accent,#8b3a2f);color:#f5efe0;border-color:var(--accent,#8b3a2f);transform:translateY(2px)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.pian-card{background:#fff;border:1px solid #e2d8bc;border-radius:10px;padding:18px 22px;margin-bottom:18px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.pian-card h3{margin:0 0 6px 0;font-size:22px;color:#2d4258;font-family:"KaiTi",serif;letter-spacing:3px;border-left:4px solid var(--accent,#8b3a2f);padding-left:12px}
.pian-card .pian-sub{color:#8a7a5c;font-size:13px;margin-bottom:10px}
.pian-card .pian-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.pian-card .pian-stats span{background:#f0e8cf;padding:3px 10px;border-radius:12px;font-size:12px;color:#6a5a3c}
.pian-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-top:10px}
.unit-block{background:#faf6ec;border-radius:8px;padding:12px 14px;border-left:3px solid var(--accent,#8b3a2f);cursor:pointer;transition:all .2s}
.unit-block:hover{background:#f0e8cf;transform:translateX(3px);box-shadow:0 2px 6px rgba(0,0,0,.12)}
.unit-block.fable{border-left-color:#2d7d46}
.unit-block.claim{border-left-color:var(--accent,#8b3a2f)}
.unit-block.dialogue{border-left-color:#4a6481}
.unit-block.metaphor{border-left-color:#b8860b}
.unit-block.argument{border-left-color:#6a3fa0;background:linear-gradient(135deg,#faf6ec,#f5ecf8)}
.unit-block .u-title{font-size:15px;font-weight:600;color:#2d4258;font-family:"KaiTi",serif;margin-bottom:4px}
.unit-block .u-meta{font-size:11px;color:#8a7a5c;margin-bottom:6px;letter-spacing:.5px}
.unit-block .u-desc{font-size:13px;color:#4a4a4a;line-height:1.6}
.unit-block .u-scheme{display:inline-block;background:#efe5cf;color:#6a5a3c;padding:2px 8px;border-radius:10px;font-size:11px;margin:2px 4px 2px 0}
.concept-cloud{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0;justify-content:center}
.concept-cloud .tag{padding:6px 14px;border-radius:20px;background:#faf6ec;border:1px solid #c9b98f;color:var(--accent,#8b3a2f);font-family:"KaiTi",serif;font-size:14px;cursor:pointer;transition:all .2s}
.concept-cloud .tag:hover{background:var(--accent,#8b3a2f);color:#f5efe0;transform:scale(1.08)}
.concept-cloud .tag.core{background:var(--accent,#8b3a2f);color:#f5efe0;font-size:18px;padding:10px 20px}
.read-link{display:inline-block;margin-top:6px;color:#4a6481;font-size:12px;text-decoration:none;border-bottom:1px dotted #4a6481}
.read-link:hover{color:var(--accent,#8b3a2f);border-color:var(--accent,#8b3a2f)}
.intro-paragraph{font-size:14px;line-height:1.9;color:#4a4a4a;margin:14px 0;text-indent:2em}
.section-note{background:#faf6ec;border-left:4px solid #c9b98f;padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;color:#6a5a3c;line-height:1.7;margin:12px 0}
.people-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-top:14px}
.pcard{background:#fff;border:1px solid #e2d8bc;border-radius:8px;padding:10px 12px;border-top:3px solid var(--accent,#8b3a2f)}
.pcard .pname{font-size:16px;font-weight:600;color:#2d4258;font-family:"KaiTi",serif;margin-bottom:2px}
.pcard .prole{font-size:11px;color:#8a7a5c;margin-bottom:6px}
.pcard .pbio{font-size:12px;color:#4a4a4a;line-height:1.6}
.pcard .alias{display:inline-block;background:#e7dcc0;color:var(--accent,#8b3a2f);padding:1px 6px;border-radius:8px;font-size:10px;margin:1px 2px}
#pian-timeline{position:relative;padding:20px 0;margin:20px 0}
#pian-timeline::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:3px;background:linear-gradient(to bottom,var(--accent,#8b3a2f),#c9b98f,#2d7d46);transform:translateX(-50%)}
.pian-node{position:relative;width:46%;padding:14px 18px;background:#fff;border:1px solid #e2d8bc;border-radius:8px;margin:14px 0;box-shadow:0 2px 6px rgba(0,0,0,.05)}
.pian-node:nth-child(odd){margin-right:auto;text-align:right}
.pian-node:nth-child(even){margin-left:auto}
.pian-node::before{content:"";position:absolute;top:20px;width:14px;height:14px;background:var(--accent,#8b3a2f);border:3px solid #f5efe0;border-radius:50%}
.pian-node:nth-child(odd)::before{right:-31px}
.pian-node:nth-child(even)::before{left:-31px}
.pian-node h4{margin:0 0 4px 0;font-size:18px;color:#2d4258;font-family:"KaiTi",serif}
.pian-node .psub{font-size:12px;color:#8a7a5c;margin-bottom:6px}
.pian-node .psummary{font-size:13px;color:#4a4a4a;line-height:1.6;text-align:left}
@media(max-width:768px){
  #pian-timeline::before{left:20px}
  .pian-node{width:calc(100% - 44px);margin-left:44px !important;text-align:left !important}
  .pian-node::before{left:-27px !important;right:auto !important}
  .pian-grid{grid-template-columns:1fr}
  .depth-hero h1{font-size:24px}
  .people-grid{grid-template-columns:1fr}
}
`;

function makeJump(bookPath, chIdx, charStart, text){
  return `<a class="read-link" href="reader.html?b=${encodeURIComponent(bookPath)}&ch=${chIdx}&s=${charStart}" target="_blank">${text} →</a>`;
}

function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function buildHTML(book){
  const D = book;
  const heroChar = D.title.slice(-1); // 取最后一字做背景
  const totalAnchors = (D.propositions?.length||0)+(D.fables?.length||0)+(D.analogies?.length||0)+(D.dialogues?.length||0);
  const kpis = [
    {num: D.chapters?.length||0, lbl:'篇/章'},
    {num: D.propositions?.length||0, lbl:'命题'},
    {num: (D.fables?.filter(f=>f.type==='寓言').length)||0, lbl:'寓言'},
    {num: D.dialogues?.length||0, lbl:'对话'},
    {num: D.analogies?.length||0, lbl:'譬喻'},
    {num: (D.fables?.filter(f=>f.type==='譬喻'||f.type==='对话问答'||f.type==='反驳'||f.type==='两难').length)||0, lbl:'论证'},
    {num: D.concepts?.length||0, lbl:'概念'},
    {num: D.people?.length||0, lbl:'人物'},
    {num: totalAnchors, lbl:'句级锚点'}
  ];

  // tabs: 根据有无内容动态显示
  const tabs = [];
  const panels = [];
  tabs.push({id:'overview', name:'◇ 义理总览'});
  tabs.push({id:'map', name:'❖ 篇章地图'});
  if (D.propositions?.length) tabs.push({id:'claims', name:'✦ 命题疏解'});
  if (D.fables?.some(f=>f.type&&f.type!=='寓言')) tabs.push({id:'arguments', name:'⚖ 论证结构'});
  if (D.fables?.length) tabs.push({id:'fables', name:'☯ 寓言解读'});
  if (D.dialogues?.length) tabs.push({id:'dialogues', name:'⌸ 对话问答'});
  if (D.analogies?.length) tabs.push({id:'metaphors', name:'✧ 譬喻举隅'});
  if (D.people?.length) tabs.push({id:'people', name:'☺ 出场人物'});
  tabs.push({id:'text', name:'☰ 原文阅读'});

  // OVERVIEW
  let overviewHtml = `
    <h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px;margin-top:4px">《${esc(D.title)}》义理系统</h2>
    <p class="intro-paragraph">${esc(D.intro||(D.subtitle+'，'+(D.author||'')+'撰，为'+D.title+'学派核心典籍。'))}</p>`;
  if (D.overview) overviewHtml += D.overview.map(p=>`<p class="intro-paragraph">${p}</p>`).join('');
  overviewHtml += `
    <div class="section-note">
      <b>本体建模说明</b>：本页标引依子藏 v2.2 本体——文献结构对应 zbib（zbib:Work/Chapter/Sentence），
      义理单元对应 zcon（zcon:Claim/Argument/Dialogue/Fable/Metaphor/ArgumentScheme），
      人物对应 zc:Person，可与《庄子》《列子》等子藏深度页进行义理互见。
    </div>`;
  if (D.concepts?.length){
    overviewHtml += `<h3 style="font-family:KaiTi,serif;color:var(--accent,#8b3a2f);margin-top:20px;letter-spacing:2px">核心概念云</h3><div class="concept-cloud">`;
    D.concepts.forEach((c,i)=>{
      overviewHtml += `<span class="tag ${i<3?'core':''}" title="${esc(c.meaning||'')}">${esc(c.name)}</span>`;
    });
    overviewHtml += `</div>`;
  }
  if (D.themes?.length){
    overviewHtml += `<h3 style="font-family:KaiTi,serif;color:var(--accent,#8b3a2f);margin-top:24px;letter-spacing:2px">义理线索</h3><div class="pian-grid">`;
    D.themes.forEach(t=>{
      overviewHtml += `<div class="unit-block argument"><div class="u-title">${esc(t.title)}</div><div class="u-desc">${esc(t.desc)}</div></div>`;
    });
    overviewHtml += `</div>`;
  }
  panels.push({id:'overview', html:overviewHtml});

  // MAP
  let mapHtml = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${esc(D.title)}篇章思想地图</h2>
    <div class="section-note">点击篇章卡片可跳转至原文。</div><div id="pianTimeline">`;
  D.chapters.forEach((ch,i)=>{
    mapHtml += `<div class="pian-node"><h4>${esc(ch.title)}</h4>
      <div class="psub">第${ch.ch}篇 · ${ch.length}字</div>
      <div class="psummary">${esc(ch.summary||'')} ${makeJump(D.bookPath, ch.ch, ch.start, '读原文')}</div></div>`;
  });
  mapHtml += `</div>`;
  panels.push({id:'map', html:mapHtml});

  // CLAIMS
  if (D.propositions?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${D.propositions.length}核心命题</h2>
      <div class="section-note">命题即 zcon:Claim——可以判断义理立场的最小判断单元；点击可跳至原文对应句段。</div>`;
    const byCh = {};
    D.propositions.forEach(p=>{byCh[p.ch]=byCh[p.ch]||[];byCh[p.ch].push(p);});
    D.chapters.forEach(ch=>{
      const arr = byCh[ch.ch]||[];
      if (!arr.length) return;
      h += `<div class="pian-card"><h3>${esc(ch.title)}</h3>
        <div class="pian-sub">${esc(ch.summary||'')} · 本章 ${arr.length} 命题</div><div class="pian-grid">`;
      arr.forEach(p=>{
        h += `<div class="unit-block claim" onclick="jumpTo('${D.bookPath}',${ch.ch},${p.charStart||0})">
          <div class="u-title">${esc(p.text)}</div>
          <div class="u-meta"><span class="u-scheme">${esc(p.type||'正论')}</span>${p.keywords?.map(k=>`<span class="u-scheme">${esc(k)}</span>`).join('')||''}</div>
          <div class="u-desc">${esc(p.meaning||'')}</div>
          <div style="font-size:12px;color:#8a7a5c;margin-top:6px;font-family:KaiTi,serif">「${esc((p.anchor||'').slice(0,28))}…」</div>
        </div>`;
      });
      h += `</div></div>`;
    });
    panels.push({id:'claims', html:h});
  }

  // ARGUMENTS (非寓言的 fables 条目)
  const argList = D.fables?.filter(f=>f.type&&f.type!=='寓言');
  if (argList?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${argList.length}核心论证/问难</h2>
      <div class="section-note">含譬喻、对话问答、两难、反驳等论证图式。</div><div class="pian-grid">`;
    argList.forEach(a=>{
      h += `<div class="unit-block argument" onclick="jumpTo('${D.bookPath}',${a.ch},${a.charStart||0})">
        <div class="u-title">${esc(a.title||a.anchor.slice(0,14))}</div>
        <div class="u-meta"><span class="u-scheme">${esc(a.type)}</span>${a.chars?.map(c=>`<span class="u-scheme">${esc(c)}</span>`).join('')||''}</div>
        <div class="u-desc">${esc(a.moral||a.meaning||'')}</div>
      </div>`;
    });
    h += `</div>`;
    panels.push({id:'arguments', html:h});
  }

  // FABLES
  const fabList = D.fables?.filter(f=>f.type==='寓言');
  if (fabList?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${fabList.length}寓言</h2>
      <div class="section-note">寓言即 zcon:Fable——"寓言十九，藉外论之"，以虚构故事寄寓哲学义理。</div><div class="pian-grid">`;
    fabList.forEach(f=>{
      h += `<div class="unit-block fable" onclick="jumpTo('${D.bookPath}',${f.ch},${f.charStart||0})">
        <div class="u-title">${esc(f.title)}</div>
        <div class="u-meta">${f.chars?.map(c=>`<span class="u-scheme">${esc(c)}</span>`).join('')||''}</div>
        <div class="u-desc">${esc(f.moral||f.meaning||'')}</div>
      </div>`;
    });
    h += `</div>`;
    panels.push({id:'fables', html:h});
  }

  // DIALOGUES
  if (D.dialogues?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${D.dialogues.length}对话单元</h2>
      <div class="section-note">对话即 zcon:Dialogue，按"曰/问/对曰"切分，记录问答轮次与主题。</div><div class="pian-grid">`;
    D.dialogues.forEach(d=>{
      h += `<div class="unit-block dialogue" onclick="jumpTo('${D.bookPath}',${d.ch},${d.charStart||0})">
        <div class="u-title">${esc(d.topic||d.anchor.slice(0,14))}</div>
        <div class="u-meta"><span class="u-scheme">${esc(d.speaker)}</span><span class="u-scheme">${d.turns} 轮</span></div>
        <div class="u-desc">${esc(d.summary||'')}</div>
      </div>`;
    });
    h += `</div>`;
    panels.push({id:'dialogues', html:h});
  }

  // METAPHORS
  if (D.analogies?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${D.analogies.length}譬喻</h2>
      <div class="section-note">譬喻即 zcon:Metaphor，以近喻远、以具象喻抽象。</div><div class="pian-grid">`;
    D.analogies.forEach(a=>{
      h += `<div class="unit-block metaphor" onclick="jumpTo('${D.bookPath}',${a.ch},${a.charStart||0})">
        <div class="u-title">${esc(a.from)} <span style="color:#b8860b">→</span> ${esc(a.to)}</div>
        <div class="u-desc">${esc(a.meaning||'')}</div>
      </div>`;
    });
    h += `</div>`;
    panels.push({id:'metaphors', html:h});
  }

  // PEOPLE
  if (D.people?.length){
    let h = `<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">${D.people.length}出场人物</h2><div class="people-grid">`;
    D.people.forEach(p=>{
      h += `<div class="pcard">
        <div class="pname">${esc(p.name)}</div>
        <div class="prole">${esc(p.role||'')}</div>
        ${p.alias?.length?`<div>${p.alias.map(a=>`<span class="alias">${esc(a)}</span>`).join('')}</div>`:''}
        <div class="pbio">${esc(p.bio||'')}</div>
      </div>`;
    });
    h += `</div>`;
    panels.push({id:'people', html:h});
  }

  // TEXT
  panels.push({id:'text', html:`<h2 style="font-family:KaiTi,serif;color:#2d4258;letter-spacing:3px">原文阅读</h2>
    <div class="section-note">点击下方章节进入 reader 逐句阅读。</div>
    <div class="pian-grid">${D.chapters.map(ch=>`
      <div class="unit-block" onclick="jumpTo('${D.bookPath}',${ch.ch},${ch.start})">
        <div class="u-title">${esc(ch.title)}</div>
        <div class="u-meta">${ch.length}字</div>
        <div class="u-desc">${esc(ch.summary||'')}</div>
      </div>`).join('')}
    </div>`});

  // 组装
  const tabsHtml = tabs.map((t,i)=>`<button class="tab-btn ${i===0?'active':''}" data-tab="${t.id}">${t.name}</button>`).join('');
  const panelsHtml = panels.map((p,i)=>`<div class="tab-panel ${i===0?'active':''}" id="tab-${p.id}">${p.html}</div>`).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>《${esc(D.title)}》深度研究 · 子藏本体论</title>
<link rel="stylesheet" href="css/common.css?v=22">
<style>${STYLE}</style>
${D.themeCss||''}
</head>
<body class="ink-theme">
<header class="topbar">
  <div class="bar-inner">
    <a class="brand" href="index.html"><span class="brand-zi">子</span><span class="brand-cang">藏</span><span class="brand-sub">Zi-Cang Ontology</span></a>
    <nav class="mainnav" id="mainnav"></nav>
    <button class="theme-toggle" id="themeToggle" title="切换主题">🎨</button>
  </div>
</header>
<main class="container" style="max-width:1200px">

<div class="depth-hero" data-char="${heroChar}">
  <h1>《${esc(D.title)}》 · 深度标引</h1>
  <div class="sub">${esc(D.subtitle||'')}</div>
  <p style="margin:8px 0 0 0;font-size:13.5px;color:#d9cda8;line-height:1.7;max-width:820px">
    ${esc(D.heroText||('本页依 zcon（概念论证本体）做五级语义单元标引：<b>命题 / 论证 / 对话 / 寓言 / 譬喻</b>，全部锚点定位到句级字符偏移，可直接跳转原文阅读。'))}
  </p>
  <div class="meta-row">
    <span class="chip"><b>作者</b>${esc(D.author||'')}（${esc(D.dynasty||'')}）</span>
    <span class="chip"><b>文本长度</b>${(D.stats?.chars||0).toLocaleString()} 字</span>
    <span class="chip"><b>标引单元</b>${totalAnchors} 个句级锚点</span>
    <span class="chip"><b>标引版本</b>zicang-v22</span>
  </div>
</div>

<div class="depth-kpis">${kpis.map(k=>`<div class="depth-kpi"><div class="num">${k.num}</div><div class="lbl">${k.lbl}</div></div>`).join('')}</div>

<div class="tabs" id="tabs">${tabsHtml}</div>
${panelsHtml}

</main>
<footer class="site-footer">
  <p>子藏 Zi-Cang Ontology · 诸子百家深度研究 · CC BY-SA 4.0</p>
</footer>
<script src="js/common.js?v=22"></script>
<script src="data/${D.bookId}-data.js?v=22"></script>
<script>
function jumpTo(b,ch,s){window.open('reader.html?b='+encodeURIComponent(b)+'&ch='+ch+'&s='+s,'_blank');}
const tabBtns=document.querySelectorAll('.tab-btn');
const tabPans=document.querySelectorAll('.tab-panel');
tabBtns.forEach(b=>b.addEventListener('click',()=>{
  tabBtns.forEach(x=>x.classList.remove('active'));
  tabPans.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById('tab-'+b.dataset.tab).classList.add('active');
  window.scrollTo({top:b.offsetTop-80,behavior:'smooth'});
}));
</script>
</body>
</html>`;
}

module.exports = { buildHTML };

// CLI：node deep-page-gen.js <datafile> <outfile>
if (require.main === module){
  const dataFile = process.argv[2];
  const outFile = process.argv[3];
  const key = process.argv[4];
  global.window = {};
  require(path.resolve(dataFile));
  const DATA = global.window[key] || Object.values(global.window).find(v=>v && v.bookId);
  if (!DATA) { console.error('DATA not found, keys:', Object.keys(global.window).filter(k=>k.endsWith('_DATA'))); process.exit(1); }
  const html = buildHTML(DATA);
  fs.writeFileSync(outFile, html, 'utf-8');
  console.log('Wrote', outFile, html.length, 'bytes');
}
