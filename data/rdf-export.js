/* 子藏本体 · RDF 全量导出器 (TBox + ABox) v20
 * 输出 Turtle / JSON-LD / N-Triples，支持模块选择与 Blob 下载。
 * 命名空间 zc: <https://yejinlei.github.io/Zi-Cang/ontology#>
 */
(function(){
  const NS = 'https://yejinlei.github.io/Zi-Cang/ontology#';

  // IRI 安全化：保留汉字，其余非安全字符转 _
  function iri(s){
    return String(s).replace(/[^\w\u4e00-\u9fa5%._~-]/g,'_');
  }
  function workIri(path){ return 'zc:work-'+iri(path); }
  function chapIri(path,idx){ return workIri(path)+'-ch'+idx; }
  function personIri(pid){ return 'zc:person-'+pid; }
  function conceptIri(c){ return 'zc:concept-'+iri(c); }
  function schoolIri(s){ return 'zc:school-'+iri(s); }
  function idiomIri(i){ return 'zc:idiom-'+iri(i); }
  function pathIri(i){ return 'zc:path-'+i; }
  function anchorIri(a){ return 'zc:anchor-'+a.type+'-'+a.idx; }

  // Turtle 字面值转义
  function ttlLit(s, lang){
    const safe = String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t');
    if(lang) return '"'+safe+'"@'+lang;
    return '"'+safe+'"';
  }

  // N-Triples 字面值（更严格）
  function ntLit(s){
    const safe = String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t');
    return '"'+safe+'"';
  }
  function fullIri(p){
    // zc:xxx -> 完整IRI
    if(p.startsWith('zc:')) return '<'+NS+p.slice(3)+'>';
    if(p.startsWith('<')) return p;
    // 已知前缀
    const m = p.match(/^([a-z]+):(.+)$/);
    if(m){
      const map = {
        rdf:'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs:'http://www.w3.org/2000/01/rdf-schema#',
        xsd:'http://www.w3.org/2001/XMLSchema#',
        owl:'http://www.w3.org/2002/07/owl#',
        dc:'http://purl.org/dc/elements/1.1/',
        dcterms:'http://purl.org/dc/terms/',
        skos:'http://www.w3.org/2004/02/skos/core#',
        foaf:'http://xmlns.com/foaf/0.1/',
        schema:'http://schema.org/',
        zcore:'https://yejinlei.github.io/Zi-Cang/ontology/core#',
        zbib:'https://yejinlei.github.io/Zi-Cang/ontology/biblio#',
        zcon:'https://yejinlei.github.io/Zi-Cang/ontology/concept#',
        zsch:'https://yejinlei.github.io/Zi-Cang/ontology/school#',
        zhev:'https://yejinlei.github.io/Zi-Cang/ontology/event#',
        zexe:'https://yejinlei.github.io/Zi-Cang/ontology/exegesis#',
        crm:'http://www.cidoc-crm.org/cidoc-crm/',
        bf:'http://id.loc.gov/ontologies/bibframe/',
        frbr:'http://purl.org/vocab/frbr/core#',
        wd:'http://www.wikidata.org/entity/'
      };
      if(map[m[1]]) return '<'+map[m[1]]+m[2]+'>';
    }
    return '<'+NS+p+'>';
  }

  const TTL_PREFIX = `@prefix zc: <${NS}> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix zcore: <https://yejinlei.github.io/Zi-Cang/ontology/core#> .
@prefix zbib: <https://yejinlei.github.io/Zi-Cang/ontology/biblio#> .
@prefix zcon: <https://yejinlei.github.io/Zi-Cang/ontology/concept#> .
@prefix zsch: <https://yejinlei.github.io/Zi-Cang/ontology/school#> .
@prefix zhev: <https://yejinlei.github.io/Zi-Cang/ontology/event#> .
@prefix zexe: <https://yejinlei.github.io/Zi-Cang/ontology/exegesis#> .
@prefix crm: <http://www.cidoc-crm.org/cidoc-crm/> .
@prefix bf: <http://id.loc.gov/ontologies/bibframe/> .
@prefix frbr: <http://purl.org/vocab/frbr/core#> .
@prefix wd: <http://www.wikidata.org/entity/> .

`;

  // ---------- 模块生成器 ----------

  // TBox: 24类/42对象属性/28数据属性 + 本体元信息
  function buildTBoxTurtle(){
    const sch = window.ONTOLOGY_SCHEMA || {};
    let out = '\n# ============================================\n';
    out += '# TBox · 類與屬性定義 (from ontology-schema.js)\n';
    out += '# ============================================\n\n';

    // 本体本身
    out += `zc:zicang-ontology a owl:Ontology ;\n`;
    out += `  rdfs:label ${ttlLit(sch.meta?.name||'子藏本體論','zh')} ;\n`;
    out += `  rdfs:label ${ttlLit(sch.meta?.en||'Zi-Cang Ontology','en')} ;\n`;
    out += `  owl:versionInfo ${ttlLit(sch.meta?.version||'2.0')} ;\n`;
    if(sch.meta?.license) out += `  dc:rights ${ttlLit(sch.meta.license)} ;\n`;
    out += `  dcterms:license <https://creativecommons.org/licenses/by-sa/4.0/> .\n\n`;

    // v20: 6 模块 owl:Ontology 声明 + owl:imports
    out += '# ---- 模組化本體 (owl:Ontology imports) ----\n';
    const MODS = sch.modules || [
      {id:'zcore', name:'核心本體 (ZCore)', en:'ZCore', desc:'頂層類與通用屬性、外部本體對齊'},
      {id:'zbib', name:'文獻目錄本體 (ZBib)', en:'ZBib', desc:'書目著錄、版本目錄、篇章結構，對齊 BIBFRAME/FRBR'},
      {id:'zcon', name:'概念論證本體 (ZCon)', en:'ZCon', desc:'概念譜系、論證結構、命題/寓言/對話/譬喻，對齊 SKOS'},
      {id:'zsch', name:'學派師承本體 (ZSch)', en:'ZSch', desc:'學派流變、師承傳授、人物世系，對齊 CBDB/FOAF'},
      {id:'zhev', name:'歷史事件本體 (ZEv)', en:'ZEv', desc:'會聚辯難、著述年份、遊仕出處，對齊 CIDOC CRM'},
      {id:'zexe', name:'注疏訓詁本體 (ZExe)', en:'ZExe', desc:'注/疏/集解/正義/訓詁/校勘、版本異文、引文溯源'}
    ];
    const MOD_NS = {zcore:'zcore',zbib:'zbib',zcon:'zcon',zsch:'zsch',zhev:'zhev',zexe:'zexe'};
    for(const m of MODS){
      const pfx = MOD_NS[m.id]||'zc';
      out += `${pfx}:${m.id}-ontology a owl:Ontology ;\n`;
      out += `  rdfs:label ${ttlLit(m.name,'zh')} ;\n`;
      if(m.en) out += `  rdfs:label ${ttlLit(m.en,'en')} ;\n`;
      if(m.desc) out += `  rdfs:comment ${ttlLit(m.desc,'zh')} ;\n`;
      out += `  owl:versionInfo ${ttlLit(sch.meta?.version||'2.0')} ;\n`;
      out += `  owl:imports zc:zicang-ontology ;\n`;
      if(m.id==='zbib') out += `  owl:imports <http://id.loc.gov/ontologies/bibframe/> ;\n  owl:imports <http://purl.org/vocab/frbr/core#> ;\n`;
      if(m.id==='zcon') out += `  owl:imports <http://www.w3.org/2004/02/skos/core> ;\n`;
      if(m.id==='zsch') out += `  owl:imports <http://xmlns.com/foaf/0.1/> ;\n`;
      if(m.id==='zhev') out += `  owl:imports <http://www.cidoc-crm.org/cidoc-crm/> ;\n`;
      out += `  dcterms:license <https://creativecommons.org/licenses/by-sa/4.0/> .\n\n`;
    }
    // 外部本体对齐
    out += '# ---- 外部本體對齊 (owl:equivalentClass/Property) ----\n';
    const ALIGN = sch.alignments || [
      {a:'zc:Person', b:'foaf:Person', t:'C'},
      {a:'zc:Person', b:'crm:E21_Person', t:'C'},
      {a:'zc:Work', b:'bf:Work', t:'C'},
      {a:'zc:Work', b:'frbr:Work', t:'C'},
      {a:'zc:Expression', b:'frbr:Expression', t:'C'},
      {a:'zc:Manifestation', b:'bf:Instance', t:'C'},
      {a:'zc:Manifestation', b:'frbr:Manifestation', t:'C'},
      {a:'zc:Concept', b:'skos:Concept', t:'C'},
      {a:'zc:authoredBy', b:'dc:creator', t:'P'},
      {a:'zc:hasTitle', b:'dcterms:title', t:'P'},
      {a:'zc:discussesConcept', b:'skos:isSubjectOf', t:'P'},
      {a:'zc:bornIn', b:'schema:birthPlace', t:'P'}
    ];
    for(const a of ALIGN){
      out += `${a.a} ${a.t==='C'?'owl:equivalentClass':'owl:equivalentProperty'} ${a.b} .\n`;
    }
    out += '\n';

    // 类
    out += '# ---- 類 (Classes) ----\n';
    for(const c of (sch.classes||[])){
      const id = c.id;
      out += `${id} a owl:Class ;\n`;
      out += `  rdfs:label ${ttlLit(c.cn,'zh')} ;\n`;
      if(c.en) out += `  rdfs:label ${ttlLit(c.en,'en')} ;\n`;
      if(c.def) out += `  rdfs:comment ${ttlLit(c.def,'zh')} ;\n`;
      if(c.parent) out += `  rdfs:subClassOf ${c.parent} ;\n`;
      if(c.parents) for(const pa of c.parents){ if(pa!==c.parent) out += `  rdfs:subClassOf ${pa} ;\n`; }
      if(c.align) for(const ext of (Array.isArray(c.align)?c.align:[c.align])) out += `  owl:equivalentClass ${ext} ;\n`;
      if(c.module && MOD_NS[c.module]) out += `  rdfs:isDefinedBy ${MOD_NS[c.module]}:${c.module}-ontology ;\n`;
      out += `  rdfs:isDefinedBy zc:zicang-ontology .\n`;
    }
    // 对象属性
    out += '\n# ---- 對象屬性 (Object Properties) ----\n';
    for(const p of (sch.objectProps||[])){
      out += `${p.id} a owl:ObjectProperty ;\n`;
      out += `  rdfs:label ${ttlLit(p.cn,'zh')} ;\n`;
      if(p.domain) out += `  rdfs:domain ${p.domain} ;\n`;
      if(p.range) out += `  rdfs:range ${p.range} ;\n`;
      if(p.inverseOf) out += `  owl:inverseOf ${p.inverseOf} ;\n`;
      if(p.subPropertyOf) out += `  rdfs:subPropertyOf ${p.subPropertyOf} ;\n`;
      if(p.align) for(const ext of (Array.isArray(p.align)?p.align:[p.align])) out += `  owl:equivalentProperty ${ext} ;\n`;
      out += `  rdfs:isDefinedBy zc:zicang-ontology .\n`;
    }
    // 数据属性
    out += '\n# ---- 數據屬性 (Data Properties) ----\n';
    for(const p of (sch.dataProps||[])){
      out += `${p.id} a owl:DatatypeProperty ;\n`;
      out += `  rdfs:label ${ttlLit(p.cn,'zh')} ;\n`;
      if(p.domain) out += `  rdfs:domain ${p.domain} ;\n`;
      if(p.range) out += `  rdfs:range ${p.range} ;\n`;
      if(p.align) for(const ext of (Array.isArray(p.align)?p.align:[p.align])) out += `  owl:equivalentProperty ${ext} ;\n`;
      out += `  rdfs:isDefinedBy zc:zicang-ontology .\n`;
    }

    // v20: 推理规则（rules）—— owl:propertyChainAxiom + rdfs:subPropertyOf
    out += '\n# ---- 推理規則 (owl:propertyChainAxiom) ----\n';
    const RULES = sch.rules || [];
    for(const r of RULES){
      const rid = 'zc:rule-'+(r.id||iri(r.cn||'rule'));
      out += `${rid} a owl:Rule ; rdfs:label ${ttlLit(r.cn||r.id,'zh')} ;\n`;
      if(r.desc) out += `  rdfs:comment ${ttlLit(r.desc,'zh')} ;\n`;
      if(r.chain && r.chain.length && r.implies){
        const chainStr = r.chain.join(' ');
        out += `  owl:propertyChainAxiom ( ${chainStr} ) ;\n`;
        out += `  rdfs:subPropertyOf ${r.implies} ;\n`;
      }
      out += `  .\n`;
    }
    out += '\n';
    return out;
  }

  // ABox-1: 学派
  function buildSchoolsTurtle(){
    const schs = window.SCHOOLS_DATA || [];
    if(!schs.length) return '';
    let out = '\n# ---- 學派 (zc:School) ----\n';
    for(const s of schs){
      const sid = schoolIri(s.id||s.name);
      out += `${sid} a zc:School ;\n`;
      out += `  rdfs:label ${ttlLit(s.name,'zh')} ;\n`;
      if(s.en) out += `  rdfs:label ${ttlLit(s.en,'en')} ;\n`;
      if(s.desc) out += `  rdfs:comment ${ttlLit(s.desc,'zh')} ;\n`;
      if(s.period) out += `  zc:activePeriod ${ttlLit(s.period,'zh')} ;\n`;
      out += `  .\n`;
    }
    return out;
  }

  // ABox-2: 典籍 + 篇章（全量）
  function buildWorksChaptersTurtle(opts){
    const chapters = window.CHAPTERS_DATA||[];
    const cb = window.CONCEPT_BOOK_DATA||{};
    const allBooks = window.ALL_BOOKS || [];
    const catMap = {};
    for(const b of allBooks) catMap[b.path] = b;
    let out = '\n# ---- 典籍 (zc:Work) 與 篇章 (zc:Chapter) ----\n';
    let bookCount=0, chapCount=0;
    const limit = opts.limitBooks || 0; // 0=全量
    for(const b of chapters){
      if(limit>0 && bookCount>=limit) break;
      if(b.chapters.length===0 && !(opts.includeEmpty)) continue;
      bookCount++;
      const bid = workIri(b.path);
      const meta = catMap[b.path]||{};
      out += `\n# 典籍: ${b.name} (${b.cat})\n`;
      out += `${bid} a zc:Work ;\n`;
      out += `  rdfs:label ${ttlLit(b.name,'zh')} ;\n`;
      out += `  zc:category ${ttlLit(b.cat,'zh')} ;\n`;
      out += `  zc:sourcePath ${ttlLit(b.path)} ;\n`;
      if(meta.parts) out += `  zc:fileParts "${meta.parts}"^^xsd:integer ;\n`;
      out += `  zc:charCount "${b.chars_total||0}"^^xsd:integer ;\n`;
      out += `  zc:chapterCount "${b.chapters.length}"^^xsd:integer ;\n`;
      out += `  zc:partOf ${schoolIri(b.cat)} ;\n`;
      // 作者（若 PEOPLE_EXT 里有作者映射）
      if(opts.includeAuthors){
        const pe = window.PEOPLE_EXT||{};
        for(const [pid,p] of Object.entries(pe)){
          if(p.works && p.works.includes(b.path)){
            out += `  zc:authoredBy ${personIri(pid)} ;\n`;
          }
        }
      }
      out += `  .\n`;
      for(let i=0;i<b.chapters.length;i++){
        const ch = b.chapters[i];
        chapCount++;
        const cid = chapIri(b.path,i);
        out += `${cid} a zc:Chapter ;\n`;
        out += `  rdfs:label ${ttlLit(ch.title,'zh')} ;\n`;
        out += `  zc:charCount "${ch.chars}"^^xsd:integer ;\n`;
        out += `  zc:isChapterOf ${bid} ;\n`;
        out += `  zc:chapterIndex "${ch.idx}"^^xsd:integer .\n`;
      }
      // 概念出现（Top10 高频）
      const cmap = cb[b.path]||{};
      const topC = Object.entries(cmap).sort((x,y)=>y[1]-x[1]).slice(0,opts.topConcepts||10);
      for(const [cn,cv] of topC){
        const cid = conceptIri(cn);
        out += `${bid} zc:mentionsConcept ${cid} ;\n`;
        out += `  zc:conceptFrequency [ zc:concept ${cid} ; zc:count "${cv}"^^xsd:integer ] .\n`;
      }
    }
    // 未切章但在 ALL_BOOKS 里的典籍（精简 Work 实例）
    if(opts.includeUncut){
      const cutPaths = new Set(chapters.map(b=>b.path));
      for(const b of allBooks){
        if(cutPaths.has(b.path)) continue;
        if(limit>0 && bookCount>=limit) break;
        bookCount++;
        const bid = workIri(b.path);
        out += `${bid} a zc:Work ; rdfs:label ${ttlLit(b.name,'zh')} ; zc:category ${ttlLit(b.cat,'zh')} ; zc:sourcePath ${ttlLit(b.path)} ; zc:charCount "${b.chars||0}"^^xsd:integer ; zc:partOf ${schoolIri(b.cat)} .\n`;
      }
    }
    out += `\n# 統計: ${bookCount} 部典籍 / ${chapCount} 篇章\n`;
    return out;
  }

  // ABox-3: 概念
  function buildConceptsTurtle(){
    const tdata = window.TERMS_DATA||[];
    const dd = window.DAOTI_CONCEPTS||[];
    let out = '\n# ---- 概念 (zc:Concept) ----\n';
    const seen = new Set();
    const add = (cn, def, school) => {
      if(seen.has(cn)) return;
      seen.add(cn);
      const cid = conceptIri(cn);
      out += `${cid} a zc:Concept ; rdfs:label ${ttlLit(cn,'zh')} ;\n`;
      if(def) out += `  skos:definition ${ttlLit(def,'zh')} ;\n`;
      if(school) out += `  zc:primarySchool ${schoolIri(school)} ;\n`;
      out += `  skos:inScheme zc:zicang-concepts .\n`;
    };
    out += `zc:zicang-concepts a skos:ConceptScheme ; rdfs:label ${ttlLit('子藏概念体系','zh')} ; dcterms:license <https://creativecommons.org/licenses/by-sa/4.0/> .\n\n`;
    for(const t of tdata){
      if(t.term) add(t.term, t.definition||'', t.school||'');
    }
    for(const d of dd){
      if(d.name) add(d.name, d.desc||'', d.school||'道家');
    }
    return out;
  }

  // ABox-4: 人物（详传+师承）
  function buildPersonsTurtle(){
    const PE = window.PEOPLE_EXT||{};
    let out = '\n# ---- 人物 (zc:Person) ----\n';
    for(const [pid,p] of Object.entries(PE)){
      const prsId = personIri(pid);
      out += `${prsId} a zc:Person, foaf:Person ;\n`;
      out += `  rdfs:label ${ttlLit(p.name,'zh')} ;\n`;
      out += `  foaf:name ${ttlLit(p.name,'zh')} ;\n`;
      if(p.en) out += `  foaf:name ${ttlLit(p.en,'en')} ;\n`;
      if(p.zi) out += `  zc:zi ${ttlLit(p.zi,'zh')} ;\n`;
      if(p.title) out += `  zc:title ${ttlLit(p.title,'zh')} ;\n`;
      if(p.era) out += `  zc:era ${ttlLit(p.era,'zh')} ;\n`;
      if(p.hometown) out += `  zc:hometown ${ttlLit(p.hometown,'zh')} ;\n`;
      if(p.bio) out += `  rdfs:comment ${ttlLit(p.bio,'zh')} ;\n`;
      if(p.school) out += `  zc:memberOf ${schoolIri(p.school)} ;\n`;
      // 师承
      if(p.teachers) for(const t of p.teachers) out += `  zc:studiedUnder ${personIri(t)} ;\n`;
      if(p.disciples) for(const t of p.disciples) out += `  zc:teacherOf ${personIri(t)} ;\n`;
      if(p.influenced_by) for(const t of p.influenced_by) out += `  zc:influencedBy ${personIri(t)} ;\n`;
      // 著作
      if(p.works) for(const w of p.works) out += `  zc:authored ${workIri(w)} ;\n`;
      out += `  .\n`;
    }
    return out;
  }

  // ABox-5: 人物-典籍提及关系（全量）
  function buildMentionsTurtle(){
    const mb = window.MENTION_BOOK_DATA||{};
    let out = '\n# ---- 典籍提及人物 (zc:mentionsPerson) ----\n';
    let edges=0;
    for(const [bp,pids] of Object.entries(mb)){
      const bid = workIri(bp);
      for(const pid of pids){
        out += `${bid} zc:mentionsPerson ${personIri(pid)} .\n`;
        edges++;
      }
    }
    out += `\n# 提及關係: ${edges} 條\n`;
    return out;
  }

  // ABox-6: 典故成语
  function buildIdiomsTurtle(){
    const idata = window.IDIOMS_DATA||[];
    if(!idata.length) return '';
    let out = '\n# ---- 典故成語 (zc:Idiom) ----\n';
    for(let i=0;i<idata.length;i++){
      const it = idata[i];
      const iid = idiomIri(i);
      out += `${iid} a zc:Idiom ; rdfs:label ${ttlLit(it.idiom,'zh')} ;\n`;
      if(it.meaning) out += `  rdfs:comment ${ttlLit(it.meaning,'zh')} ;\n`;
      if(it.source && it.source.book) out += `  zc:sourceOf ${workIri(it.source.book)} ; zc:sourceChapter ${ttlLit(it.source.chapter||'','zh')} ;\n`;
      if(it.school) out += `  zc:category ${ttlLit(it.school,'zh')} ;\n`;
      out += `  .\n`;
    }
    return out;
  }

  // ABox-7: 引文锚点
  function buildAnchorsTurtle(){
    const adata = window.ANCHORS_DATA||[];
    if(!adata.length) return '';
    let out = '\n# ---- 引文錨點 (zc:Quotation) ----\n';
    for(let i=0;i<adata.length;i++){
      const a = adata[i];
      const aid = anchorIri(a);
      out += `${aid} a zc:Quotation ; rdfs:label ${ttlLit(a.source?.phrase||a.term||'引文','zh')} ;\n`;
      if(a.term) out += `  zc:anchorConcept ${conceptIri(a.term)} ;\n`;
      if(a.source && a.source.book) out += `  zc:quotedIn ${workIri(a.source.book)} ; zc:quotedChapter ${ttlLit(a.source.chapter||'','zh')} ;\n`;
      if(a.variant) for(const v of a.variant) out += `  zc:variantReading ${ttlLit(v,'zh')} ;\n`;
      out += `  .\n`;
    }
    return out;
  }

  // ABox-8: 跨藏桥接（基于 CROSS_CANG 实际结构：cangs/concepts/books/relations）
  function buildCrossTurtle(){
    const cd = window.CROSS_CANG||null;
    if(!cd) return '';
    let out = '\n# ---- 跨藏橋接 (Bridge Concepts/Books & Cross-Canon Relations) ----\n';
    // 六藏
    const canonMap = {zi:'子藏',ru:'儒藏',yi:'易藏',fo:'佛藏',shi:'詩藏',shi2:'詩藏',history:'史藏'};
    const canonIds = {zi:'zc:canon-zi',ru:'zc:canon-ru',yi:'zc:canon-yi',fo:'zc:canon-fo',shi:'zc:canon-shi',shi2:'zc:canon-shi',history:'zc:canon-history'};
    const canonHome = {zi:'https://yejinlei.github.io/Zi-Cang/',ru:'https://yejinlei.github.io/Confucian-Canon/',yi:'https://yejinlei.github.io/The-Book-of-Changes/',fo:'https://yejinlei.github.io/Buddhist/',shi:'https://yejinlei.github.io/ShiCang/',shi2:'https://yejinlei.github.io/ShiCang/',history:'https://yejinlei.github.io/history/'};
    out += '# 六大典籍藏\n';
    for(const cg of (cd.cangs||[])){
      out += `${canonIds[cg.id]} a zc:Canon ; rdfs:label ${ttlLit(cg.name,'zh')} ;\n`;
      if(cg.desc) out += `  rdfs:comment ${ttlLit(cg.desc,'zh')} ;\n`;
      if(canonHome[cg.id]) out += `  zc:canonHome <${canonHome[cg.id]}> ;\n`;
      out += `  .\n`;
    }
    out += '\n# 跨藏概念（出现于两藏以上）\n';
    for(const n of (cd.concepts||[])){
      const nid = 'zc:bridge-'+iri(n.id);
      out += `${nid} a zc:BridgeConcept ; rdfs:label ${ttlLit(n.name,'zh')} ;\n`;
      if(n.group) out += `  zc:category ${ttlLit(n.group,'zh')} ;\n`;
      if(n.desc) out += `  rdfs:comment ${ttlLit(n.desc,'zh')} ;\n`;
      if(n.cangs) for(const cc of n.cangs) out += `  zc:appearsInCanon ${canonIds[cc]||('zc:canon-'+cc)} ;\n`;
      out += `  .\n`;
    }
    out += '\n# 跨藏典籍\n';
    for(const n of (cd.books||[])){
      const nid = 'zc:bridge-'+iri(n.id);
      out += `${nid} a zc:BridgeWork ; rdfs:label ${ttlLit(n.name,'zh')} ;\n`;
      if(n.desc) out += `  rdfs:comment ${ttlLit(n.desc,'zh')} ;\n`;
      if(n.cangs) for(const cc of n.cangs) out += `  zc:appearsInCanon ${canonIds[cc]||('zc:canon-'+cc)} ;\n`;
      out += `  .\n`;
    }
    // 关系类型映射
    const relMap = {
      'same-root':'zc:sameRootAs',
      'source':'zc:sourceOf',
      'fuse':'zc:fusesWith',
      'parallel':'zc:parallels',
      'influence':'zc:influences',
      'comment':'zc:commentsOn',
      'synthesize':'zc:synthesizes',
      'critique':'zc:criticizes',
      'bridge':'zc:bridgeConnects',
      'quote':'zc:quotes',
      'inherit':'zc:derivedFrom',
      'merge':'zc:mergesWith',
      'same':'zc:sameAs'
    };
    out += '\n# 跨藏關係邊\n';
    for(const e of (cd.relations||[])){
      const src = 'zc:bridge-'+iri(e.from);
      const tgt = 'zc:bridge-'+iri(e.to);
      const rel = relMap[e.type] || 'zc:bridgeRelates';
      if(e.label) out += `# ${e.label}\n`;
      out += `${src} ${rel} ${tgt} .\n`;
    }
    return out;
  }


  // ABox-9: 《莊子》內七篇深度語義標引 (命題/寓言/譬喻/對話/論證) v20
  function buildZhuangziTurtle(){
    const zd = window.ZHUANGZI_DATA||null;
    if(!zd) return '';
    let out = '\n# ---- 《莊子》內七篇深度語義標引 (zcon:Fable/Argument/Dialogue/Proposition/Analogy) ----\n';
    const workId = workIri('诸子/庄子');
    out += `# 典籍: ${workId}\n\n`;
    function locIri(kind,ch,idx){ return 'zcon:'+kind+'-ch'+ch+'-'+idx; }
    function chIriOf(ch){
      // 计算章节 IRI：与 buildWorksChaptersTurtle 保持一致
      return chapIri('诸子/庄子', ch-1);
    }
    // 命题
    if(zd.propositions && zd.propositions.length){
      out += '# 命題 (Proposition)\n';
      zd.propositions.forEach((p,i)=>{
        const id = locIri('proposition', p.ch, i);
        out += `${id} a zcon:Proposition ; rdfs:label ${ttlLit(p.text||p.summary||('命題'+(i+1)),'zh')} ;\n`;
        if(p.summary && p.summary!==p.text) out += `  rdfs:comment ${ttlLit(p.summary,'zh')} ;\n`;
        out += `  zcon:statedIn ${workId} ;\n  dcterms:isPartOf ${chIriOf(p.ch)} ;\n`;
        if(p.anchor) out += `  zcon:anchorText ${ttlLit(p.anchor,'zh')} ;\n`;
        if(p.concepts) for(const c of p.concepts) out += `  zcon:dealsWithConcept ${conceptIri(c)} ;\n`;
        out += `  .\n`;
      });
    }
    // 寓言
    if(zd.fables && zd.fables.length){
      out += '\n# 寓言 (Fable)\n';
      zd.fables.forEach((f,i)=>{
        const id = locIri('fable', f.ch, i);
        out += `${id} a zcon:Fable ; rdfs:label ${ttlLit(f.name||('寓言'+(i+1)),'zh')} ;\n`;
        if(f.summary) out += `  rdfs:comment ${ttlLit(f.summary,'zh')} ;\n`;
        out += `  zcon:statedIn ${workId} ;\n  dcterms:isPartOf ${chIriOf(f.ch)} ;\n`;
        if(f.anchor) out += `  zcon:anchorText ${ttlLit(f.anchor,'zh')} ;\n`;
        if(f.characters) for(const ch0 of f.characters) out += `  zcon:hasDramatisPersona ${ttlLit(ch0,'zh')} ;\n`;
        if(f.moral) out += `  zcon:illustrates ${ttlLit(f.moral,'zh')} ;\n`;
        if(typeof f.supportsProp==='number' && zd.propositions && zd.propositions[f.supportsProp]){
          out += `  zcon:supportsProposition ${locIri('proposition', zd.propositions[f.supportsProp].ch, f.supportsProp)} ;\n`;
        }
        out += `  .\n`;
      });
    }
    // 譬喻
    if(zd.analogies && zd.analogies.length){
      out += '\n# 譬喻 (Analogy)\n';
      zd.analogies.forEach((a,i)=>{
        const id = locIri('analogy', a.ch, i);
        out += `${id} a zcon:Analogy ; rdfs:label ${ttlLit(a.vehicle||('譬喻'+(i+1)),'zh')} ;\n`;
        if(a.vehicle && a.tenor) out += `  rdfs:comment ${ttlLit('以「'+a.vehicle+'」喻「'+a.tenor+'」','zh')} ;\n`;
        if(a.vehicle) out += `  zcon:sourceDomain ${ttlLit(a.vehicle,'zh')} ;\n`;
        if(a.tenor) out += `  zcon:targetDomain ${ttlLit(a.tenor,'zh')} ;\n`;
        out += `  zcon:statedIn ${workId} ;\n  dcterms:isPartOf ${chIriOf(a.ch)} ;\n`;
        if(a.anchor) out += `  zcon:anchorText ${ttlLit(a.anchor,'zh')} ;\n`;
        out += `  .\n`;
      });
    }
    // 对话
    if(zd.dialogues && zd.dialogues.length){
      out += '\n# 對話 (Dialogue)\n';
      zd.dialogues.forEach((d,i)=>{
        const id = locIri('dialogue', d.ch, i);
        out += `${id} a zcon:Dialogue ; rdfs:label ${ttlLit((d.speakers||[]).join('與')||('對話'+(i+1)),'zh')} ;\n`;
        if(d.topic) out += `  rdfs:comment ${ttlLit(d.topic,'zh')} ;\n`;
        out += `  zcon:statedIn ${workId} ;\n  dcterms:isPartOf ${chIriOf(d.ch)} ;\n`;
        if(d.anchor) out += `  zcon:anchorText ${ttlLit(d.anchor,'zh')} ;\n`;
        if(d.speakers) for(const sp of d.speakers) out += `  zcon:hasInterlocutor ${ttlLit(sp,'zh')} ;\n`;
        out += `  .\n`;
      });
    }
    // 论证
    if(zd.arguments && zd.arguments.length){
      out += '\n# 論證 (Argument)\n';
      zd.arguments.forEach((a,i)=>{
        const id = locIri('argument', a.ch, i);
        out += `${id} a zcon:Argument ; rdfs:label ${ttlLit((a.type||'論證')+'論證','zh')} ;\n`;
        if(a.summary) out += `  rdfs:comment ${ttlLit(a.summary,'zh')} ;\n`;
        if(a.type) out += `  zcon:argumentType ${ttlLit(a.type,'zh')} ;\n`;
        out += `  zcon:statedIn ${workId} ;\n  dcterms:isPartOf ${chIriOf(a.ch)} ;\n`;
        if(a.anchor) out += `  zcon:anchorText ${ttlLit(a.anchor,'zh')} ;\n`;
        if(a.conclusion) out += `  zcon:conclusion ${ttlLit(a.conclusion,'zh')} ;\n`;
        if(typeof a.supportsProp==='number' && zd.propositions && zd.propositions[a.supportsProp]){
          out += `  zcon:supportsProposition ${locIri('proposition', zd.propositions[a.supportsProp].ch, a.supportsProp)} ;\n`;
        }
        out += `  .\n`;
      });
    }
    const nP=(zd.propositions||[]).length, nF=(zd.fables||[]).length, nA=(zd.analogies||[]).length, nD=(zd.dialogues||[]).length, nAr=(zd.arguments||[]).length;
    out += `\n# 統計: ${nP} 命題 / ${nF} 寓言 / ${nA} 譬喻 / ${nD} 對話 / ${nAr} 論證\n`;
    return out;
  }

  // 模块调度
  const MODULES = {
    tbox:{label:'TBox 類與屬性',fn:buildTBoxTurtle},
    schools:{label:'學派 (School)',fn:buildSchoolsTurtle},
    works:{label:'典籍 + 篇章 (Work+Chapter · 全量)',fn:(o)=>buildWorksChaptersTurtle(Object.assign({includeUncut:true,includeAuthors:true,topConcepts:10,limitBooks:0},o))},
    concepts:{label:'概念術語 (Concept · 83+37)',fn:buildConceptsTurtle},
    persons:{label:'人物 (Person · 36位詳傳)',fn:buildPersonsTurtle},
    mentions:{label:'人物提及關係 (mentionsPerson · 全量 6365)',fn:buildMentionsTurtle},
    idioms:{label:'典故成語 (Idiom)',fn:buildIdiomsTurtle},
    anchors:{label:'引文錨點 (Quotation)',fn:buildAnchorsTurtle},
    cross:{label:'跨藏橋接 (六藏互通)',fn:buildCrossTurtle},
    zhuangzi:{label:'《莊子》內七篇深度語義標引 (命題/論證/寓言/譬喻/對話)',fn:buildZhuangziTurtle}
  };

  function buildTurtle(modules, opts){
    opts = opts||{};
    let out = TTL_PREFIX;
    out += `# ============================================\n`;
    out += `# 子藏全文本體化 · RDF 全量導出 (${new Date().toISOString()})\n`;
    out += `# 命名空間: ${NS}\n`;
    out += `# 授權: CC BY-SA 4.0\n`;
    const s = window.ONTOBUILD_SUMMARY||{};
    if(s.booksProcessed){
      out += `# 文本庫: ${s.booksProcessed} 部典籍切章 / ${s.totalChapters} 篇章 / ${s.totalChars?.toLocaleString?.()||s.totalChars} 字\n`;
    }
    out += `# ============================================\n\n`;
    for(const m of modules){
      if(MODULES[m]) out += MODULES[m].fn(opts);
    }
    return out;
  }

  // JSON-LD 生成（基于 Turtle 简化版——直接构造 @graph）
  function buildJSONLD(modules, opts){
    const sch = window.ONTOLOGY_SCHEMA||{};
    const graph = [];
    const add = (n)=>graph.push(n);
    // Ontology
    if(modules.includes('tbox')){
      add({"@id":"zc:zicang-ontology","@type":"owl:Ontology","rdfs:label":[{"@value":sch.meta?.name||"子藏本體論","@language":"zh"},{"@value":sch.meta?.en||"Zi-Cang Ontology","@language":"en"}],"owl:versionInfo":sch.meta?.version||"2.0","dcterms:license":{"@id":"https://creativecommons.org/licenses/by-sa/4.0/"}});
      for(const c of (sch.classes||[])){
        const node = {"@id":c.id,"@type":"owl:Class","rdfs:label":[{"@value":c.cn,"@language":"zh"}]};
        if(c.en) node["rdfs:label"].push({"@value":c.en,"@language":"en"});
        if(c.def) node["rdfs:comment"] = {"@value":c.def,"@language":"zh"};
        if(c.parent) node["rdfs:subClassOf"] = {"@id":c.parent};
        add(node);
      }
      for(const p of (sch.objectProps||[])){
        const node = {"@id":p.id,"@type":"owl:ObjectProperty","rdfs:label":[{"@value":p.cn,"@language":"zh"}]};
        if(p.domain) node["rdfs:domain"] = {"@id":p.domain};
        if(p.range) node["rdfs:range"] = {"@id":p.range};
        add(node);
      }
      for(const p of (sch.dataProps||[])){
        const node = {"@id":p.id,"@type":"owl:DatatypeProperty","rdfs:label":[{"@value":p.cn,"@language":"zh"}]};
        if(p.domain) node["rdfs:domain"] = {"@id":p.domain};
        if(p.range) node["rdfs:range"] = {"@id":p.range};
        add(node);
      }
    }
    // 学派
    if(modules.includes('schools')){
      for(const s of (window.SCHOOLS_DATA||[])){
        const node = {"@id":schoolIri(s.id||s.name),"@type":"zc:School","rdfs:label":[{"@value":s.name,"@language":"zh"}]};
        if(s.en) node["rdfs:label"].push({"@value":s.en,"@language":"en"});
        if(s.desc) node["rdfs:comment"] = {"@value":s.desc,"@language":"zh"};
        add(node);
      }
    }
    // 典籍+篇章
    if(modules.includes('works')){
      const cb = window.CONCEPT_BOOK_DATA||{};
      const allBooks = window.ALL_BOOKS||[];
      const catMap = {}; for(const b of allBooks) catMap[b.path]=b;
      const PE = window.PEOPLE_EXT||{};
      const authorMap = {};
      for(const [pid,p] of Object.entries(PE)){ if(p.works) for(const w of p.works){ (authorMap[w]=authorMap[w]||[]).push(pid); } }
      for(const b of (window.CHAPTERS_DATA||[])){
        if(!b.chapters.length) continue;
        const bid = workIri(b.path);
        const node = {"@id":bid,"@type":"zc:Work","rdfs:label":[{"@value":b.name,"@language":"zh"}],"zc:category":b.cat,"zc:sourcePath":b.path,"zc:charCount":b.chars_total||0,"zc:chapterCount":b.chapters.length,"zc:chapters":[]};
        if(authorMap[b.path]) node["zc:authoredBy"] = authorMap[b.path].map(pid=>({"@id":personIri(pid)}));
        for(let i=0;i<b.chapters.length;i++){
          const ch=b.chapters[i];
          node["zc:chapters"].push({"@id":chapIri(b.path,i),"@type":"zc:Chapter","rdfs:label":[{"@value":ch.title,"@language":"zh"}],"zc:charCount":ch.chars,"zc:chapterIndex":ch.idx,"zc:isChapterOf":{"@id":bid}});
        }
        const cmap=cb[b.path]||{};
        const topC=Object.entries(cmap).sort((x,y)=>y[1]-x[1]).slice(0,10);
        if(topC.length) node["zc:mentionsConcept"] = topC.map(([n,c])=>({"@id":conceptIri(n),"rdfs:label":[{"@value":n,"@language":"zh"}],"zc:count":c}));
        add(node);
      }
      const cutPaths = new Set((window.CHAPTERS_DATA||[]).map(b=>b.path));
      for(const b of allBooks){
        if(cutPaths.has(b.path)) continue;
        add({"@id":workIri(b.path),"@type":"zc:Work","rdfs:label":[{"@value":b.name,"@language":"zh"}],"zc:category":b.cat,"zc:sourcePath":b.path,"zc:charCount":b.chars||0});
      }
    }
    // 概念
    if(modules.includes('concepts')){
      const seen=new Set();
      const addC=(cn,def)=>{
        if(seen.has(cn))return; seen.add(cn);
        const node={"@id":conceptIri(cn),"@type":"zc:Concept","rdfs:label":[{"@value":cn,"@language":"zh"}]};
        if(def) node["skos:definition"]={"@value":def,"@language":"zh"};
        add(node);
      };
      for(const t of (window.TERMS_DATA||[])){ if(t.term) addC(t.term, t.definition||''); }
      for(const d of (window.DAOTI_CONCEPTS||[])){ if(d.name) addC(d.name, d.desc||''); }
    }
    // 人物
    if(modules.includes('persons')){
      for(const [pid,p] of Object.entries(window.PEOPLE_EXT||{})){
        const node = {"@id":personIri(pid),"@type":["zc:Person","foaf:Person"],"rdfs:label":[{"@value":p.name,"@language":"zh"}],"foaf:name":[{"@value":p.name,"@language":"zh"}]};
        if(p.en){ node["rdfs:label"].push({"@value":p.en,"@language":"en"}); node["foaf:name"].push({"@value":p.en,"@language":"en"}); }
        if(p.zi) node["zc:zi"] = p.zi;
        if(p.era) node["zc:era"] = p.era;
        if(p.hometown) node["zc:hometown"] = p.hometown;
        if(p.bio) node["rdfs:comment"] = {"@value":p.bio,"@language":"zh"};
        if(p.school) node["zc:memberOf"] = {"@id":schoolIri(p.school)};
        if(p.teachers) node["zc:studiedUnder"] = p.teachers.map(t=>({"@id":personIri(t)}));
        if(p.disciples) node["zc:teacherOf"] = p.disciples.map(t=>({"@id":personIri(t)}));
        if(p.works) node["zc:authored"] = p.works.map(w=>({"@id":workIri(w)}));
        add(node);
      }
    }
    // 提及
    if(modules.includes('mentions')){
      for(const [bp,pids] of Object.entries(window.MENTION_BOOK_DATA||{})){
        for(const pid of pids){
          add({"@id":workIri(bp),"zc:mentionsPerson":{"@id":personIri(pid)}});
        }
      }
    }
    // 典故
    if(modules.includes('idioms')){
      for(let i=0;i<(window.IDIOMS_DATA||[]).length;i++){
        const it=window.IDIOMS_DATA[i];
        const node={"@id":idiomIri(i),"@type":"zc:Idiom","rdfs:label":[{"@value":it.idiom,"@language":"zh"}]};
        if(it.meaning) node["rdfs:comment"]={"@value":it.meaning,"@language":"zh"};
        if(it.source?.book){ node["zc:sourceOf"]={"@id":workIri(it.source.book)}; node["zc:sourceChapter"]=it.source.chapter||''; }
        add(node);
      }
    }
    // 锚点
    if(modules.includes('anchors')){
      for(let i=0;i<(window.ANCHORS_DATA||[]).length;i++){
        const a=window.ANCHORS_DATA[i];
        const node={"@id":anchorIri(a),"@type":"zc:Quotation","rdfs:label":[{"@value":a.source?.phrase||a.term||'引文',"@language":"zh"}]};
        if(a.term) node["zc:anchorConcept"]={"@id":conceptIri(a.term)};
        if(a.source?.book){ node["zc:quotedIn"]={"@id":workIri(a.source.book)}; node["zc:quotedChapter"]=a.source.chapter||''; }
        add(node);
      }
    }
    // 跨藏
    if(modules.includes('cross')){
      const cd=window.CROSS_CANG||null;
      if(cd){
        const canonIds={zi:'zc:canon-zi',ru:'zc:canon-ru',yi:'zc:canon-yi',fo:'zc:canon-fo',shi:'zc:canon-shi',shi2:'zc:canon-shi',history:'zc:canon-history'};
        for(const cg of (cd.cangs||[])){
          const node={"@id":canonIds[cg.id],"@type":"zc:Canon","rdfs:label":[{"@value":cg.name,"@language":"zh"}]};
          if(cg.desc) node["rdfs:comment"]={"@value":cg.desc,"@language":"zh"};
          add(node);
        }
        for(const n of (cd.concepts||[])){
          const node={"@id":'zc:bridge-'+iri(n.id),"@type":"zc:BridgeConcept","rdfs:label":[{"@value":n.name,"@language":"zh"}]};
          if(n.group) node["zc:category"]=n.group;
          if(n.desc) node["rdfs:comment"]={"@value":n.desc,"@language":"zh"};
          if(n.cangs) node["zc:appearsInCanon"]=n.cangs.map(c=>({"@id":canonIds[c]||'zc:canon-'+c}));
          add(node);
        }
        for(const n of (cd.books||[])){
          const node={"@id":'zc:bridge-'+iri(n.id),"@type":"zc:BridgeWork","rdfs:label":[{"@value":n.name,"@language":"zh"}]};
          if(n.desc) node["rdfs:comment"]={"@value":n.desc,"@language":"zh"};
          if(n.cangs) node["zc:appearsInCanon"]=n.cangs.map(c=>({"@id":canonIds[c]||'zc:canon-'+c}));
          add(node);
        }
      }
    }
    const out = {
      "@context":{
        "zc":NS,"rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","xsd":"http://www.w3.org/2001/XMLSchema#","owl":"http://www.w3.org/2002/07/owl#","dc":"http://purl.org/dc/elements/1.1/","dcterms":"http://purl.org/dc/terms/","skos":"http://www.w3.org/2004/02/skos/core#","foaf":"http://xmlns.com/foaf/0.1/",
        "zcore":"https://yejinlei.github.io/Zi-Cang/ontology/core#","zbib":"https://yejinlei.github.io/Zi-Cang/ontology/biblio#","zcon":"https://yejinlei.github.io/Zi-Cang/ontology/concept#","zsch":"https://yejinlei.github.io/Zi-Cang/ontology/school#","zhev":"https://yejinlei.github.io/Zi-Cang/ontology/event#","zexe":"https://yejinlei.github.io/Zi-Cang/ontology/exegesis#",
        "crm":"http://www.cidoc-crm.org/cidoc-crm/","bf":"http://id.loc.gov/ontologies/bibframe/","frbr":"http://purl.org/vocab/frbr/core#","wd":"http://www.wikidata.org/entity/",
        "label":"rdfs:label","comment":"rdfs:comment"
      },
      "@graph": graph
    };
    return JSON.stringify(out,null,2);
  }

  // N-Triples（把 Turtle 的 prefix 解析为完整 IRI，每行一条三元组）
  function buildNTriples(turtleStr){
    // 简化版：解析前缀声明，再把 turtle 里的 prefixed name 展开成 <full>
    const lines = turtleStr.split('\n');
    const prefixMap = {};
    const out = [];
    // 先收集前缀
    for(const line of lines){
      const m = line.match(/^@prefix\s+([\w-]+):\s*<([^>]+)>\s*\./);
      if(m) prefixMap[m[1]] = m[2];
    }
    function expand(term){
      if(!term) return '';
      term = term.trim();
      if(!term) return '';
      if(term.startsWith('<') && term.endsWith('>')) return term;
      if(term.startsWith('_:')) return term;
      if(term.startsWith('"')) return term;
      const mm = term.match(/^([\w-]+):([^\s;,]+)$/);
      if(mm && prefixMap[mm[1]]) return '<'+prefixMap[mm[1]]+mm[2]+'>';
      return term;
    }
    // 逐行：当前主题 + 谓宾组
    let subject = null;
    for(let line of lines){
      line = line.trim();
      if(!line || line.startsWith('#') || line.startsWith('@prefix') || line.startsWith('@base')) continue;
      // 去除结尾的 . ; ,（但要注意字面值里的点）
      // 简化处理：一行里的分号表示同一主语下的多个谓宾
      // 先找主语
      // 如果行包含空格且第一个空白前不含 < 或 : 前是 prefixed 名（简单），则是新主语开始
      // 这里按"空格前"切第一个 token
      // 处理主谓宾：简化解析——把所有 . 结尾看作三元组结束
      // 由于 Turtle 写得规整，一行通常是 s p o [; .]  或  p o [; .]  （延续主语）
      // 处理续行：以空白开头、或不以 '.' 或 ';' 结尾的复杂行，这里保守处理（我们自己生成的 turtle 行式规整）
      // 去掉末尾的 . 或 ;
      let endDot = false, endSemi = false;
      if(line.endsWith('.')){ endDot = true; line = line.slice(0,-1).trim(); }
      else if(line.endsWith(';')){ endSemi = true; line = line.slice(0,-1).trim(); }

      // 方括号空白节点：zc:conceptFrequency [ zc:concept X ; zc:count N ]
      // 简单处理：遇到 [ ... ] 直接作为一个整体blank node输出为一行NT（不展开为独立bnode，保留写法）
      // 把整行压缩后分析 tokens
      // 找主语：如果行开头是空白，表示续行（但我们已trim，所以用是否含主谓分隔判断）
      // 我们的写法里，每行要么是"subject predicate object(s)"，要么是"  predicate object(s)"（续行）。由于trim，后者变成以predicate开头。
      // 用 heuristic：行中第一个空白之前的 token 如果以 zc:/rdf:/rdfs:/owl:/xsd:/dc:/dcterms:/skos:/foaf: 开头且不是谓词区——其实更简单：检查是否含两个以上非方括号 token，且第一个 token 匹配 iri 前缀
      const tokens = line.split(/\s+/);
      if(tokens.length<2) continue;
      const firstIsIri = /^(zc:|rdf:|rdfs:|owl:|xsd:|dc:|dcterms:|skos:|foaf:|<)/.test(tokens[0]);
      // 但第一token是谓词（延续主语）的情况：我们的 Turtle 中，延续行都有两空格缩进，trim 后第一 token 是谓词
      // 为了区分"主语+谓词"vs"续行谓词"：看第一个 token 是否是已知谓词或 rdf:a(rdf:type)
      const predLike = /^(zc:|rdf:|rdfs:|owl:|dcterms:|skos:|foaf:|dc:)/.test(tokens[0]) && !/^zc:(work|person|concept|school|chapter|bridge|idiom|anchor|canon|path|zicang)/.test(tokens[0]);
      // 但 rdf:type 可以在主语位置（"X a Y" 是主语+谓词+宾，a 是 rdf:type）
      // 更简单：我们的写法里主语永远是 zc:work-xxx / zc:person-xxx / zc:concept-xxx / zc:school-xxx / zc:zicang-ontology 等 zc: 前缀名词，而谓词都是带 cn 语义标签的属性名
      // 用更明确的 heuristic：第一token 匹配 ^zc:(work|person|concept|school|chapter|idiom|anchor|bridge|canon|zicang|path) 则是主语
      const firstIsSubj = /^zc:(work-|person-|concept-|school-|idiom-|anchor-|bridge-|canon-|zicang-|path-)/.test(tokens[0]);
      if(firstIsSubj){
        subject = expand(tokens[0]);
        // 找谓宾：tokens[1..]
        // 特殊情况：tokens[1] === 'a'  → rdf:type
        let i=1;
        while(i<tokens.length){
          let pred;
          if(tokens[i]==='a'){ pred='<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>'; i++; }
          else { pred = expand(tokens[i]); i++; }
          // object：取到下一个 ; 或行尾。但这里我们已按行 trim 处理，一个谓词后可能一个对象（可能是带 @zh 或 ^^xsd:integer 的字面值，或 IRI，或 [ blank ]）
          // 简单：若下一 token 是 " 开头，收集到匹配的 " 之后的 @/^^
          let obj='';
          if(tokens[i] && tokens[i].startsWith('"')){
            // 字面值
            let j=i;
            obj = tokens[j]; j++;
            // 如果前一个token结尾不是"，继续拼接（处理中间有空格的字符串，但我们的生成器没有空格在字面内且无引号嵌套，安全）
            // 处理 @zh / ^^xsd:integer
            while(j<tokens.length && !obj.match(/"(@[a-z]+|\^\^[^\s;,.]+)?$/)){
              obj += ' '+tokens[j]; j++;
            }
            // 展开 ^^xsd 前缀
            obj = obj.replace(/\^\^([\w-]+):([\w-]+)/g, (m,p,l)=>'^^<'+(prefixMap[p]||'')+l+'>');
            i=j;
          } else if(tokens[i] && tokens[i]==='['){
            // 空白节点：读到 ]，整体作为一个bnode（用 _:bnN 简化）
            let j=i+1; let depth=1; let buf='[';
            while(j<tokens.length && depth>0){
              buf+=' '+tokens[j];
              if(tokens[j]==='[') depth++;
              if(tokens[j]===']') depth--;
              j++;
            }
            // 不展开blank内部，直接输出一个带字面的简化NT：不合法但NT需要逐条三元组。保守跳过blank节点内部展开（复杂）
            // 改为：跳过这些blank node行，因为我们在 Turtle/JSON-LD 里已完整提供
            i=j; continue;
          } else {
            obj = expand(tokens[i]); i++;
          }
          if(subject && pred && obj) out.push(subject+' '+pred+' '+obj+' .');
        }
      } else {
        // 续行：谓词开头，使用上一主语
        if(!subject) continue;
        let i=0;
        while(i<tokens.length){
          let pred;
          if(tokens[i]==='a'){ pred='<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>'; i++; }
          else { pred = expand(tokens[i]); i++; }
          let obj='';
          if(tokens[i] && tokens[i].startsWith('"')){
            let j=i; obj=tokens[j]; j++;
            while(j<tokens.length && !obj.match(/"(@[a-z]+|\^\^[^\s;,.]+)?$/)){ obj+=' '+tokens[j]; j++; }
            obj = obj.replace(/\^\^([\w-]+):([\w-]+)/g, (m,p,l)=>'^^<'+(prefixMap[p]||'')+l+'>');
            i=j;
          } else if(tokens[i] && tokens[i]==='['){
            let j=i+1; let depth=1;
            while(j<tokens.length && depth>0){ if(tokens[j]==='[')depth++; if(tokens[j]===']')depth--; j++; }
            i=j; continue;
          } else {
            obj = expand(tokens[i]); i++;
          }
          if(pred && obj) out.push(subject+' '+pred+' '+obj+' .');
        }
      }
    }
    return out.join('\n')+'\n';
  }

  function countStats(turtleStr){
    const lines = turtleStr.split('\n').filter(l=>l.trim()&&!l.startsWith('#')&&!l.startsWith('@prefix'));
    // 粗略：数主谓宾三元组
    let triples = 0;
    for(const l of lines){
      // 每行如果以 '. ' 或 ' .' 结束算一条；带 ; 的续行
      const semis = (l.match(/;/g)||[]).length;
      const dots = (l.match(/\.\s*$/)||[]).length;
      triples += semis + dots;
    }
    return triples;
  }

  window.RDFExport = {
    MODULES,
    buildTurtle,
    buildJSONLD,
    buildNTriples,
    countStats,
    // 便捷下载
    download(filename, content, mime){
      const blob = new Blob([content], {type:mime||'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href=url; a.download=filename;
      document.body.appendChild(a); a.click();
      setTimeout(()=>{document.body.removeChild(a); URL.revokeObjectURL(url);},200);
    }
  };
})();
