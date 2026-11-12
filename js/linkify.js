// 子藏 · 互见内链工具
// 将正文中的术语 / 书名 / 学派 / 人物名 / 成语 动态转为跳转链接
// - 不修改原始数据
// - 同一实体只链接首次出现（默认）
// - 避免在已存在的标签中再次链接
(function(){
  if(window.linkify) return;

  // ========= 跳转目标 =========
  const HREF = {
    person:  (id)=>`people.html?id=${encodeURIComponent(id)}`,
    term:    (name)=>`terms.html#${encodeURIComponent(name)}`,
    classic: (name)=>{
      // 浏览器顶层 const 不会挂 window，故同时检查全局与 window
      const ab = (typeof ALL_BOOKS!=='undefined')?ALL_BOOKS:(window.ALL_BOOKS||[]);
      if(ab && ab.length){
        const found = ab.find(b=>b.name===name);
        if(found) return `reader.html?b=${encodeURIComponent(found.path)}`;
      }
      // 通过 CLASSICS_DATA 查找
      if(window.CLASSICS_DATA){
        const c = window.CLASSICS_DATA.find(x=>x.name===name);
        if(c && c.path) return `reader.html?b=${encodeURIComponent(c.path)}`;
      }
      return `classics.html#${encodeURIComponent(name)}`;
    },
    school:  (id)=>`graph.html#school-${encodeURIComponent(id)}`,
    idiom:   (name)=>`idioms.html#${encodeURIComponent(name)}`,
    debate:  (name)=>`panjiao.html`
  };

  // ========= 实体表构造（懒加载）=========
  let _lexicon = null;
  function buildLexicon(){
    if(_lexicon) return _lexicon;
    const lex = [];
    // 人物（来自 people_ext 与 people.js）
    if(window.PEOPLE_DATA && window.PEOPLE_DATA.nodes){
      window.PEOPLE_DATA.nodes.forEach(n=>{
        lex.push({ type:'person', name:n.name, id:n.id, priority:10 });
      });
    }
    if(window.PEOPLE_EXT){
      Object.keys(window.PEOPLE_EXT).forEach(pid=>{
        const p = window.PEOPLE_EXT[pid];
        if(p.name) lex.push({ type:'person', name:p.name, id:pid, priority:12 });
      });
    }
    // 典籍：优先 CLASSICS_DATA 精编（priority 高），然后 ALL_BOOKS 全集
    if(window.CLASSICS_DATA){
      window.CLASSICS_DATA.forEach(c=>{
        if(c.name) lex.push({ type:'classic', name:c.name, priority:6 });
      });
    }
    const AB = (typeof ALL_BOOKS!=='undefined')?ALL_BOOKS:(window.ALL_BOOKS||[]);
    if(AB && AB.length){
      AB.forEach(b=>{
        if(!lex.find(x=>x.type==='classic' && x.name===b.name))
          lex.push({ type:'classic', name:b.name, priority:5 });
      });
    }
    // 术语
    if(window.TERMS_DATA){
      window.TERMS_DATA.forEach(t=>{
        if(t.term) lex.push({ type:'term', name:t.term, priority:9 });
      });
    }
    // 成语
    if(window.IDIOMS_DATA){
      window.IDIOMS_DATA.forEach(i=>{
        if(i.idiom) lex.push({ type:'idiom', name:i.idiom, priority:7 });
      });
    }
    // 学派
    if(window.SCHOOLS_DATA){
      window.SCHOOLS_DATA.forEach(s=>{
        lex.push({ type:'school', name:s.name, id:s.id, priority:8 });
      });
    }
    // 去重：同名实体只保留 priority 最高的
    const map = new Map();
    lex.forEach(e=>{
      const prev = map.get(e.name);
      if(!prev || e.priority > prev.priority) map.set(e.name, e);
    });
    // 按名字长度降序排，优先匹配长词（避免「老子」先于「道德经」）
    const out = Array.from(map.values()).sort((a,b)=>b.name.length - a.name.length);
    _lexicon = out;
    return out;
  }

  // ========= 核心函数 =========
  function makeHref(entry){
    switch(entry.type){
      case 'person':  return HREF.person(entry.id);
      case 'term':    return HREF.term(entry.name);
      case 'classic': return HREF.classic(entry.name);
      case 'school':  return HREF.school(entry.id);
      case 'idiom':   return HREF.idiom(entry.name);
      default: return '#';
    }
  }

  // 将一段纯文本中的实体替换为 <a>
  function linkifyPlain(text, usedSet){
    if(!text) return text;
    const lex = buildLexicon();
    // 分段扫描：保护已被处理的占位符
    const PLACEHOLDER = '\u0001LK\u0002';
    const placeholders = [];
    function pushPlaceholder(html){
      placeholders.push(html);
      return PLACEHOLDER + (placeholders.length-1) + PLACEHOLDER;
    }
    let out = text;
    lex.forEach(entry=>{
      if(entry.name.length < 2) return; // 跳过单字（避免「道」「仁」等单字过度链接）
      if(usedSet && usedSet.has(entry.name)) return;
      const href = makeHref(entry);
      // 安全转义 name 用于正则
      const esc = entry.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const re = new RegExp(esc, 'g');
      let first = true;
      out = out.replace(re, (match)=>{
        if(!first){ return match; } // 只链首次
        first = false;
        if(usedSet) usedSet.add(entry.name);
        const cls = `lk lk-${entry.type}`;
        const html = `<a href="${href}" class="${cls}" data-lk="${entry.type}">${match}</a>`;
        return pushPlaceholder(html);
      });
    });
    // 还原占位符
    out = out.replace(new RegExp(PLACEHOLDER+'(\\d+)'+PLACEHOLDER,'g'),(_,i)=>placeholders[+i]);
    return out;
  }

  // 对一个元素内子节点做链接化：跳过 <a>/<script>/<style>/<code>/<pre>/<h1-6>/button/.no-link
  function linkifyElement(root, opts){
    opts = opts || {};
    if(!root) return;
    const usedSet = opts.allOnce ? new Set() : null;
    const SKIP_TAG = /^(A|SCRIPT|STYLE|CODE|PRE|BUTTON|INPUT|TEXTAREA|SELECT|OPTION|SVG|CANVAS|IMG)$/i;
    function walk(node){
      if(node.nodeType === 3){ // 文本节点
        if(!node.nodeValue || !node.nodeValue.trim()) return;
        // 向上检查是否在禁止链接的祖先里
        let p = node.parentNode;
        let skip = false;
        while(p && p !== root){
          if(SKIP_TAG.test(p.tagName) || (p.classList && p.classList.contains('no-link'))){
            skip = true; break;
          }
          p = p.parentNode;
        }
        if(skip) return;
        const newHtml = linkifyPlain(node.nodeValue, usedSet);
        if(newHtml !== node.nodeValue){
          const span = document.createElement('span');
          span.innerHTML = newHtml;
          node.parentNode.replaceChild(span, node);
        }
      } else if(node.nodeType === 1){
        if(SKIP_TAG.test(node.tagName) || (node.classList && node.classList.contains('no-link'))) return;
        // 不进入已链接的容器子节点里去（防止重复链接）
        if(node.hasAttribute && node.hasAttribute('data-lk-done')) return;
        const children = Array.from(node.childNodes);
        children.forEach(walk);
      }
    }
    walk(root);
    if(root.setAttribute) root.setAttribute('data-lk-done','1');
  }

  // 公共 API
  window.linkify = {
    text: linkifyPlain,
    element: linkifyElement,
    lexicon: buildLexicon,
    findPerson: (name)=>{
      const lex = buildLexicon();
      return lex.find(e=>e.type==='person' && e.name===name);
    },
    findClassic: (name)=>{
      const lex = buildLexicon();
      return lex.find(e=>e.type==='classic' && e.name===name);
    },
    personHref: (id)=>HREF.person(id),
    classicHref: (name)=>HREF.classic(name)
  };
})();
