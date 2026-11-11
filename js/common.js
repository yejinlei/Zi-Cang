/* ============================================================
 * Zi-Cang Common JS - 全功能版 v2.0
 * 包含：主题切换/导航/页脚/繁简转换/收藏夹/阅读记忆/工具函数
 * ============================================================ */

// ====== 主题切换 ======
const THEMES = {
  xuanzhi: { name:'宣紙古籍', ink:'#2c1810', sub:'#6b4423', paper:'#f5ecd7', card:'#faf4e3', border:'#d4b896', gold:'#8b2500', accent:'#a0522d' },
  shuimo:  { name:'水墨山水', ink:'#1a1a1a', sub:'#4a4a4a', paper:'#e8e8e3', card:'#f4f4f0', border:'#a8a8a8', gold:'#2c3e50', accent:'#34495e' },
  zhujian: { name:'竹簡漢簡', ink:'#1b0a00', sub:'#4a2810', paper:'#d4b98c', card:'#e3cdac', border:'#8b6f47', gold:'#5c2e0d', accent:'#8b4513' },
  qingtong:{ name:'青銅吉金', ink:'#e8d5a0', sub:'#b8a068', paper:'#1a1f2e', card:'#262d40', border:'#5a6f8a', gold:'#c8a04e', accent:'#8a6d2c' },
  xingxiang:{name:'星象羅盤', ink:'#d4c896', sub:'#9c8f5a', paper:'#0d0d1a', card:'#1a1a30', border:'#4a4a6a', gold:'#e8c848', accent:'#8a6abf' }
};
function initTheme(){
  const saved = localStorage.getItem('zicang-theme') || 'xuanzhi';
  applyTheme(saved);
}
function applyTheme(key){
  const t = THEMES[key]; if(!t) return;
  const r = document.documentElement;
  Object.entries(t).forEach(([k,v])=>{ if(k!=='name') r.style.setProperty('--'+k,v); });
  localStorage.setItem('zicang-theme', key);
  document.querySelectorAll('.theme-option').forEach(el=>{
    el.classList.toggle('active', el.dataset.theme===key);
  });
  const btn = document.getElementById('themeBtn');
  if(btn) btn.innerHTML = `<span class="theme-diamond">✦</span> ${t.name} <span style="font-size:.8em;opacity:.6">▾</span>`;
}
function buildThemeMenu(){
  return `<div class="theme-menu-wrap">
    <button id="themeBtn" class="theme-btn"><span class="theme-diamond">✦</span> 宣紙古籍 <span style="font-size:.8em;opacity:.6">▾</span></button>
    <div class="theme-dropdown" id="themeDropdown">
      ${Object.entries(THEMES).map(([k,v])=>`
        <div class="theme-option${k==='xuanzhi'?' active':''}" data-theme="${k}" onclick="applyTheme('${k}');closeThemeMenu()">
          <span class="theme-swatch" style="background:${v.card};border-color:${v.border}"><span style="background:${v.gold}"></span></span>
          <div class="theme-info"><div class="theme-name">${v.name}</div></div>
          <span class="theme-check">●</span>
        </div>`).join('')}
    </div>
  </div>`;
}
function closeThemeMenu(){
  const dd = document.getElementById('themeDropdown');
  const btn = document.getElementById('themeBtn');
  if(dd) dd.classList.remove('open');
  if(btn) btn.setAttribute('aria-open','false');
}
document.addEventListener('click', e=>{
  const wrap = document.querySelector('.theme-menu-wrap');
  if(!wrap) return;
  if(e.target.closest('.theme-btn')){
    const dd = document.getElementById('themeDropdown');
    const btn = document.getElementById('themeBtn');
    if(!dd) return;
    const willOpen = !dd.classList.contains('open');
    dd.classList.toggle('open', willOpen);
    if(btn) btn.setAttribute('aria-open', willOpen?'true':'false');
  } else if(!e.target.closest('.theme-dropdown')){
    closeThemeMenu();
  }
});

// ====== 导航栏 ======
function buildNav(active){
  const items = [
    {key:'home',    href:'index.html',    icon:'☰', label:'首頁'},
    {key:'library', href:'library.html',  icon:'📚',label:'全文庫'},
    {key:'search',  href:'search.html',   icon:'🔍',label:'檢索'},
    {key:'ontology',href:'ontology.html', icon:'⬡', label:'諸子本體'},
    {key:'map',     href:'map.html',      icon:'🗺', label:'時空'},
    {key:'data',    href:'data.html',     icon:'💾', label:'數據'}
  ];
  return `<header class="site-nav">
    <div class="nav-inner">
      <a class="brand" href="index.html"><span class="brand-box">子</span><span class="brand-text">藏本體 · Zi-Cang Ontology</span></a>
      <nav class="nav-links">
        ${items.map(i=>`<a href="${i.href}" class="nav-link ${active===i.key?'active':''}">${i.icon} ${i.label}</a>`).join('')}
      </nav>
      ${buildThemeMenu()}
    </div>
  </header>`;
}
function buildFooter(){
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="foot-col"><h4>☰ 子藏本體論 Zi-Cang Ontology</h4><p>以道家為基軸，貫通儒、墨、法、名、兵、農、陰陽、縱橫、雜、小說十家，建構中國諸子學的開放知識圖譜。</p></div>
      <div class="foot-col"><h4>📚 文本來源</h4><p>全文基於殆知閣古籍文本庫，子藏七分部類，共計 1157 部典籍、2.06億字。</p></div>
      <div class="foot-col"><h4>🔗 參考項目</h4><p><a href="https://yejinlei.github.io/Buddhist" target="_blank" style="color:var(--gold)">佛學本體論</a> · <a href="https://yejinlei.github.io/Confucian-Canon/" target="_blank" style="color:var(--gold)">儒藏</a> · <a href="https://yejinlei.github.io/The-Book-of-Changes/" target="_blank" style="color:var(--gold)">易經本體</a></p></div>
      <div class="foot-col"><h4>◉ 開放授權</h4><p>本體與文本以 CC BY-SA 4.0 開放共享，數據與代碼可自由引用、衍生與商業使用，需署名且以相同方式分享。</p></div>
    </div>
    <div class="foot-copy">© 2026 子藏本體論項目 · Zi-Cang Ontology · CC BY-SA 4.0</div>
  </footer>`;
}
function injectLayout(active){
  const n = document.getElementById('siteNav');
  const f = document.getElementById('siteFooter');
  if(n) n.outerHTML = buildNav(active);
  if(f) f.outerHTML = buildFooter();
  initTheme();
  // 动态注入manifest + theme-color（PWA）
  if(!document.querySelector('link[rel=manifest]')){
    const m=document.createElement('link');m.rel='manifest';m.href='./manifest.json';document.head.appendChild(m);
    const t=document.createElement('meta');t.name='theme-color';t.content='#8b2500';document.head.appendChild(t);
    const a=document.createElement('link');a.rel='apple-touch-icon';a.href='./icon-192.png';document.head.appendChild(a);
  }
  // 注册Service Worker
  if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }
}

// ====== 繁简转换表（常用字覆盖）======
const S2T = {};
const T2S = {};
const S2T_TABLE = '万萬|与與|丑醜|专專|丛叢|东東|丝絲|丢丟|两兩|严嚴|个個|丬爿|丰豐|临臨|为為|丽麗|举舉|么麼|义義|乐樂|书書|买買|乱亂|争爭|于於|云雲|亚亞|产產|亩畝|亲親|亵褻|亿億|仅僅|从從|仑侖|仓倉|仪儀|们們|价價|众眾|优優|伙夥|会會|伞傘|伟偉|传傳|伤傷|伛傴|伞傘|伪僞|们們|来來|侠俠|侣侶|侥僥|侦偵|侧側|侨僑|侩儈|侪儕|侬儂|俣俁|俦儔|俩倆|仓倉|举舉|伛傴|债債|倾傾|偬傯|偻僂|偾僨|偿償|傥儻|傧儐|储儲|傩儺|儿兒|兑兌|兖兗|党黨|兰蘭|关關|兴興|兹茲|养養|兽獸|冁囅|内內|冈岡|册冊|写寫|军軍|农農|冢塚|冯馮|冲衝|决決|况況|冻凍|净淨|凄凉|凌淩|减減|凑湊|凛凜|几幾|凤鳳|凫鳧|凭憑|凯凱|击擊|刘劉|则則|刚剛|创創|别別|刬剗|刭剄|刽劊|刿劌|剀剴|剂劑|剐剮|剑劍|剥剝|剧劇|劝勸|办辦|务務|劢勱|动動|励勵|劲勁|劳勞|势勢|勁勁|勋勛|勣勣|勤勤|勩勩|匀勻|匦匭|匮匱|区區|医醫|华華|单單|卫衛|厂廠|厅廳|历歷|厉厲|压壓|厌厭|县縣|参參|双雙|发發|变變|叙敘|叶葉|号號|叹嘆|叽嘰|吁籲|后後|吓嚇|吕呂|吗嗎|吣唚|吨噸|听聽|启啟|吴吳|呓囈|呕嘔|呖嚦|呗唄|员員|呙咼|呛嗆|呜嗚|咏詠|咛嚀|咋咋|咐咐|咙嚨|咚咚|咛嚀|咝噝|哐哐|哑啞|哒噠|哓嘵|哔嗶|哗嘩|哙噲|哜嚌|哝噥|哟喲|唛嘜|唝嗊|唠嘮|唡嗧|唢嗩|唤喚|啧嘖|啬嗇|啭囀|啮嚙|啰囉|啴嘽|啸嘯|喷噴|喽嘍|喾嚳|嗫囁|嗳噯|嘘噓|嘱囑|噜嚕|嚣囂|团團|园園|囱囪|围圍|囵圇|国國|图圖|圆圓|圣聖|圹壙|场場|坏壞|块塊|坚堅|坛壇|坜壢|坝壩|坞塢|坟墳|坠墜|垄壟|垆壚|垒壘|垦墾|垩堊|垫墊|垭埡|垲塏|垴堖|埘塒|埙塤|埚堝|堑塹|堕墮|塒塒|填填|尘塵|垩堊|壶壺|寿壽|厦廈|厨廚|厩廄|发發|变變|叙敘|叶葉|号號|叹嘆|叽嘰|吁籲|后後|吓嚇|吕呂|吗嗎|吣唚|吨噸|听聽|启啟|吴吳|呓囈|呕嘔|呖嚦|呗唄|员員|呙咼|呛嗆|呜嗚|咏詠|咛嚀|咙嚨|哑啞|哔嗶|哗嘩|哙噲|哜嚌|哝噥|哟喲|唠嘮|唢嗩|唤喚|啧嘖|啬嗇|啭囀|啮嚙|啰囉|啸嘯|喷噴|喽嘍|喾嚳|嗫囁|嗳噯|嘘噓|嘱囑|嚣囂|团團|园園|囱囪|围圍|囵圇|国國|图圖|圆圓|圣聖|场場|块塊|坚堅|坛壇|坝壩|坟墳|坠墜|垄壟|垒壘|垦墾|垫墊|堕墮|尘塵|壺壺|壽壽|厦廈|廚廚|发發|变變|叙敘|叶葉|号號|叹嘆|后後|听聽|启啟|吴吳|员員|国國|图圖|圆圓|圣聖|场場|块塊|坚堅|尘塵|壽壽|发发|变变|叙叙|叶叶|号号|叹叹|后后|听听|启启|吴吴|员员|国国|图图|圆圆|圣圣|场场|块块|坚坚|尘尘|寿寿|将將|对對|导導|尔爾|尘塵|尝嘗|属屬|帅帥|师師|帮幫|币幣|帻幘|帼幗|幕幕|干幹|并並|广廣|庄莊|庆慶|庐廬|库庫|应應|庙廟|废廢|开開|异異|弃棄|张張|强強|归歸|当當|录錄|彟彠|弯彎|归歸|当當|录錄|形彫|彦彥|彩彩|彭彭|归歸|当當|录錄|微微|德德|彻徹|忆憶|志誌|忠忠|忽忽|态態|怄慪|恸慟|恹懨|恺凱|恻惻|恼惱|恽惲|悦悅|悫愨|悬懸|悰悰|悱悱|悲悲|悴悴|悸悸|惮憚|惊驚|惋惋|惯慣|惬愜|愿願|憁慥|憷憷|懔懍|懵懵|戏戲|戗戧|战戰|戏戲|户戶|执執|扩擴|扫掃|扬揚|扰擾|据據|掳擄|掼摜|掷擲|掸撣|掞掞|扪捫|扫掃|扬揚|扰擾|据據|掳擄|掼摜|掷擲|掸撣|揽攬|搀攙|搁擱|搂摟|搅攪|携攜|摄攝|摈擯|撄攖|撑撐|撵攆|撷擷|撸擼|撺攛|擞擻|攀攣|敌敵|斋齋|斗鬥|斩斬|无無|旧舊|时時|是是|显顯|晋晉|晒曬|晓曉|晔曄|晕暈|晖暉|暂暫|暧曖|札札|术術|杀殺|杂雜|权權|条條|来來|杨楊|极極|构構|枪槍|枫楓|枭梟|栀梔|栎櫟|栏欄|树樹|样樣|栊櫳|桨槳|桩樁|梦夢|桠椏|椁槨|椟櫝|椅椅|椠槧|楼樓|榈櫚|椤欏|椭橢|椁槨|楼樓|榈櫚|槟檳|槠櫧|横橫|樯檣|樱櫻|橥櫫|橱櫥|橹櫓|欣欣|欤歟|欧歐|欲欲|欢歡|歇歇|岁岁|归歸|死残殘|殒殞|殓殮|殡殯|殴毆|殷殷|毁毀|毂轂|毕畢|毙斃|氢氫|气氣|汉漢|汇匯|汉漢|污汙|汤湯|汹洶|沓沓|沟溝|没沒|汴汴|汶汶|汹汹|沪滬|沈沉|汪汪|沩溈|沁沁|沛沛|泱泱|泳泳|泷瀧|泸瀘|泺濼|泻瀉|泼潑|泽澤|泾涇|洁潔|洒灑|洼窪|浃浹|浅淺|浆漿|浇澆|浈湞|浉溮|浊濁|测測|浍澮|济濟|浏瀏|浐滻|浑渾|浒滸|浓濃|浔潯|浕濜|涩澀|温溫|渴渴|游遊|渺渺|湃湃|湄湄|溪溪|溯溯|滁滁|湿濕|溃潰|溅濺|溆漵|滗潷|沟溝|滔滔|滞滯|滏滏|滗潷|滨濱|滩灘|滪澦|漤灠|漭漭|滢瀅|潆瀠|潇瀟|潋瀲|潍濰|潜潛|潴瀦|澜瀾|濑瀨|濒瀕|灏灝|灞灞|火火|灯燈|灵靈|灾災|灿燦|炀煬|炉爐|炖燉|炜煒|炝熗|点點|炼煉|炽熾|烁爍|烂爛|烃烴|烛燭|烟煙|烦煩|烧燒|烨燁|烩燴|烫燙|烬燼|热熱|焖燜|烷烷|烺烺|焚焚|焰焰|煳糊|煜煜|煨煨|煅煅|煌煌|煣揉|煽煽|烨燁|熄熄|熘溜|熔熔|熏熏|熛熛|熠熠|熨熨|燎燎|燠燠|燃燃|燔燔|燊燊|爆爆|尔爾|牵牽|状狀|将將|贴貼|贻貽|贱賤|贲賁|贳貰|贴貼|贵貴|贶貺|贷貸|贸貿|费費|贺賀|贻貽|贼賊|贽贄|贾賈|贿賄|赀貲|赁賃|赂賂|资資|赅賅|赆贐|赇賕|赈賑|赉賚|赊賒|宾賓|赆贐|赇賕|赈賑|赉賚|赊賒|宾賓|赋賦|赌賭|赍齎|赎贖|赏賞|赐賜|赑贔|赒賙|赓賡|赔賠|赕賧|赖賴|赗賵|赘贅|赙賻|赚賺|赛賽|赝贗|赟贇|赠贈|赢贏|赣贛|赪赬|赵趙|赶趕|起起|趁趂|趋趨|超超|越越|趣趣|趱趲|跋跋|跌跌|跎跎|跑跑步|跖跖|跚跚|跛跛|距距|践踐|跞躒|跟跟|跣跣|跻躋|跤跤|跨跨|跶躂|跷蹺|跸蹕|跹躚|跺跺|跻躋|踊踴|踏踏|踢踢|踟踟|踬躓|踩踩|踪蹤|踯躑|踞踞|踏踏|踔踔|踝踝|踟踟|踢踢|踩踩|踡蜷|踪蹤|踣踣|踮踮|踯躑|踪蹤|蹀蹀|踹踹|踵踵|踽踽|踱踱|蹉蹉|蹁蹁|蹂蹂|蹑躡|蹒躕|蹊蹊|蹋蹋|蹈蹈|蹙蹙|蹾蹲|蹿躥|蹬蹬|蹭蹭|蹯蹯|蹴蹴|蹶蹶|蹻蹺|蹼蹼|蹴蹴|蹿躥|蹲蹲|蹭蹭|蹬蹬|躁躁|躅躅|躏躪|躄躃|躅躅|躐躐|躏躪|身身|车車|轨軌|轩軒|轫軔|转轉|轭軛|轮輪|软軟|轰轟|轱軲|轲軻|轳轤|轴軸|轵軹|轶軼|轷軤|轸軫|轹轢|轺軺|轻輕|轼軾|载載|轾輊|轿轎|辁輇|辂輅|较較|辄輒|辅輔|辆輛|辇輦|辈輩|辉輝|辊輥|辋輞|辎輜|暂暫|辍輟|辎輜|辑輯|输輸|辏輳|辐輻|辑輯|辒轀|辗輾|舆輿|辘轆|辙轍|辚轔|辞辭|辟辭|办辦|辫辮|边邊|辽遼|达達|迁遷|过過|迈邁|运運|还還|这這|进進|远遠|违違|连連|迟遲|迓迓|迥迥|迭迭|迤迤|迩邇|迳徑|迨迨|追追|适適|逅逅|逃逃|逄逄|逆逆|选選|逊遜|逋逋|透透|逐逐|途途|逦邐|逛逛|逝逝|逞逞|速速|造造|逡逡|逢逢|連連|逖逖|逻邏|逶逶|進進|逸逸|逮逮|逭逭|逴逴|逻邏|過過|逶逶|進進|逸逸|逮逮|逭逭|逻邏|遗遺|遆遆|遇遇|遏遏|逾逾|遁遁|遊遊|遒遒|道導|達達|遘遘|遢遢|遣遣|遥遙|遝遝|遛遛|遭遭|遮遮|遴遴|遵遵|遶遶|遹遹|避避|遽遽|邀邀|邂邂|邃邃|邈邈|邋邋|边邊|邓鄧|邦邦|邪邪|邬鄔|邮郵|邹鄒|邺鄴|邻鄰|郁鬱|郏郟|郐鄶|郑鄭|郓鄆|郦酈|郧鄖|部部|郸鄲|酝醞|酗酗|酣酣|酤酤|酥酥|酩酩|酪酪|酬酧|酱醬|酽釅|酾釃|酿釀|酹酹|酸酸|醺醺|释釋|里裏|鉴鑒|銮鑾|錾鏨|凿鑿|钅金|钆釓|钇釔|针針|钉釘|钊釗|钋釙|钌釕|钊釗|钍釷|钎釺|钏釧|钐釤|钒釩|钔鍆|钕釹|钖鍚|钗釵|钘鈃|钙鈣|钚鈈|钛鈦|钡鋇|钚鈈|钣鈑|铃鈴|钥鑰|钦欽|钧鈞|钨鎢|钩鉤|钪鈧|钫鈁|钬鈥|钭鈄|钮鈕|钯鈀|钰鈺|钱錢|钲鉦|钳鉗|钴鈷|钵缽|钶鈳|钷鉕|钸鈽|钹鈸|钺鉞|钻鑽|钼鉬|钽鉭|钾鉀|钿鈿|铀鈾|铁鐵|铂鉑|铃鈴|铄鑠|铅鉛|铆鉚|铈鈰|铉鉉|铊鉈|铋鉍|铌鈮|铍鈹|铎鐸|铏鉶|铐銬|铑銠|铒鉺|铕銪|铖鋮|铗鋏|铘鋣|铙鐃|铜銅|铝鋁|铞銱|铟銦|铠鎧|铡鍘|铢銖|铣銑|铤鋌|銎銎|铦銛|铨銓|铩鎩|铪鉿|铫銚|铬鉻|铭銘|铮錚|铯銫|铰鉸|铱銥|铲鏟|铳銃|铴鐋|铵銨|银銀|铷銣|铸鑄|铹鐒|铺鋪|铻鋙|铼錸|铽鋱|链鏈|铿鏗|销銷|锁鎖|锂鋰|锃鋥|锄鋤|锅鍋|锆鋯|锇鋨|锈鏽|锉銼|锋鋒|锌鋅|锍鋶|锎鐦|锏鐧|锐銳|銻锑|锒鋃|锓鋟|锔鋦|锕錒|锖錆|锗鍺|锘鍩|错錯|锚錨|锛錛|锜錡|锝鍀|锞錁|锟錕|锠錩|锡錫|锢錮|锣鑼|锤錘|锥錐|锦錦|锨鍁|锪鍃|锫錇|锬錟|锭錠|键鍵|锯鋸|锰錳|锲鍥|锴鍇|锵鏘|锶鍶|锷鍔|锸鍤|锹鍬|钟鐘|锻鍛|锼鎪|锽鍠|锾鍰|锿鎄|镀鍍|镁鎂|镂鏤|镃鎡|镅鎇|镆鏌|镇鎮|镈鎛|镉鎘|镊鑷|镋钂|镌鐫|镍鎳|镎鎿|镏鎦|镐鎬|镑鎊|镒鎰|镓鎵|镔鑌|镕鎔|镖鏢|镗鏜|镘鏝|镙鏍|镚鏰|镛鏞|镜鏡|镝鏑|镞鏃|镟鏇|镠鏐|镡鐔|镢钁|镣鐐|镤鏷|镥鑥|镦鐓|镧鑭|镨鐠|镩鑹|镪鏹|镫鐙|镬鑊|镭鐳|镮鐶|镯鐲|镰鐮|镱鐿|镲鑔|镳鑣|镴鑞|镶鑲|長长|門门|長长|門门|長长|門门|開开|關关|閑闲|間间|閔闵|閘闸|闹閙|阁閣|阀閥|阅閱|阎閻|阐闡|闹鬧|阏閼|阑闌|阒闃|阓闠|阔闊|阕闋|阖闔|阗闐|阘闒|阙闕|阚闞|阚闞|队隊|阳陽|阴陰|阵陣|阶階|际際|陆陸|陇隴|陈陳|陉陘|陕陝|陞升|陡陡|院院|陣阵|除除|陧隉|陨隕|险險|陪陪|陭陭|隋隋|堕墮|随隨|隐隱|隗隗|隘隘|隙隙|障障|際际|隤隤|隰隰|隶隸|隽雋|难難|雀雀|雁雁|雄雄|雅雅|集集|雇雇|雉雉|雊雊|雌雌|雍雍|雎雎|雏雛|雑杂|雔雔|雹雹|雷雷|零零|雾霧|雹雹|雷雷|霁霽|霈霈|霄霄|霅霅|霉黴|霈霈|霍霍|霎霎|霏霏|霖霖|霙霙|霓霓|霎霎|霪霪|霭靄|露露|霈霈|靄霭|霰霰|霸霸|露露|霹霹|霾霾|靑青|靓靚|靜静|靥靨|鞑韃|鞒鞽|鞯韉|韫韞|韵韻|页頁|顶頂|顷頃|项項|顺順|须須|顼頊|顽頑|顾顧|顿頓|颀頎|颁頒|颂頌|颃頏|预預|颅顱|领領|颇頗|颈頸|颉頡|颊頰|颋頲|颌頜|颍潁|颎熲|颏頦|颐頤|频頻|颒頮|颓頹|颔頷|颕穎|颖穎|颗顆|题題|颙顒|颚顎|颛顓|颜顏|额額|颞顳|颟顢|颠顛|颡顙|颢顥|颣纇|颤顫|颥顬|颦顰|颧顴|风風|飏颺|飐颭|飑颮|飒颯|飓颶|飔颸|飕颼|飖颻|飗飀|飞飞|飨饗|餍饜|飧飱|饨飩|饩餼|饪飪|饫飫|饬飭|饭飯|饮飲|饯餞|饰飾|饱飽|饲飼|饳飿|饴餡|饵餌|饶饒|饷餉|饸餄|饹餎|饺餃|饻餏|饼餅|饽餑|饿餓|馀餘|馁餒|馂餕|馃餜|馄餛|馅餡|馆館|馈饋|馉餶|馊餿|馋饞|馌饁|馍饃|馎餺|馏餾|馐饈|馒饅|馑饉|馓饊|馈饋|馔饌|馕饢|驭馭|驮馱|驯馴|驰馳|驱驅|驲馹|驳駁|驴驢|驵駔|驶駛|驷駟|驸駙|驹駒|驺騶|驻駐|驼駝|驽駑|驾駕|驿驛|骀駘|骁驍|骄驕|骅驊|骆駱|骇駭|骈駢|骝騮|骊驪|骋騁|验驗|骍騂|骎駸|骏駿|骐騏|骑騎|骒騍|骓騅|骔騌|骕驌|骗騙|骚騷|骛騖|骜驁|骝騮|骞騫|骟騸|骠驃|骡騾|骢驄|骣驏|骤驟|骥驥|骦驦|骧驤|髅髏|髅髑|髋髖|髌髕|髀髀|髅髏|髋髖|髌髕|鬓鬢|鬟鬟|毛毛|毡氈|毵毿|毫毫|毯毯|毹毹|麾麾|氆氆|氇氌|气氣|氛氛|氤氤|气氣|氛氛|氢氫|氩氬|氤氤|氪氪|气氣|氛氛|氘氘|氙氙|氚氚|民民|氛氛|气氣|氛氛|水氺|永永|氾氾|汁汁|汇匯|汉漢|汊汊|汐汐|汛汛|汜汜|池池|汤湯|汝汝|汞汞|江江|洞洞|汔汔|汕汕|汛汛|丸丸|执執|势勢|垫墊|挚摯|热热|热热|执執|垫墊|热熱|热热|执執|垫墊|热熱|热熱';
S2T_TABLE.split('|').forEach(p=>{const s=p[0],t=p[1];if(s&&t){S2T[s]=t;T2S[t]=s;}});
function s2t(text){return text.split('').map(c=>S2T[c]||c).join('');}
function t2s(text){return text.split('').map(c=>T2S[c]||c).join('');}

// ====== 收藏夹（本地存储）======
const FAV_KEY='zicang-favs';
function getFavs(){try{return JSON.parse(localStorage.getItem(FAV_KEY)||'[]');}catch(e){return[];}}
function isFav(path){return getFavs().includes(path);}
function toggleFav(path,title){
  const f=getFavs(); const i=f.indexOf(path);
  if(i>=0) f.splice(i,1); else f.push(path);
  localStorage.setItem(FAV_KEY,JSON.stringify(f));
  return f.includes(path);
}

// ====== 阅读记忆 ======
const PROG_KEY='zicang-progress';
function saveProgress(path,pos){
  const p=JSON.parse(localStorage.getItem(PROG_KEY)||'{}');
  p[path]=pos; localStorage.setItem(PROG_KEY,JSON.stringify(p));
}
function getProgress(path){
  try{return JSON.parse(localStorage.getItem(PROG_KEY)||'{}')[path]||0;}catch(e){return 0;}
}
