/**
 * 人物跨页面反向链接索引（v17）
 * 给每位人物生成 graph/timeline/panjiao/cross/citation/full-ontology/classics/terms 八个入口
 * 各页面通过 URL hash/query 定位到对应人物节点
 */
(function(global) {
  // 所有人物 id 列表（对应 PEOPLE_EXT 的 key）
  const PERSON_IDS = [
    'kongzi','zengzi','zisi','mengzi','xunzi','zigong','zixia',
    'laozi','zhuangzi','liezi','guanzi_yin','wenzi',
    'hanfei','shangyang','shenbuhai','shendao','lisi','wuchi','li_kui',
    'mozi','sunwu','sunbin','huishi','gongsunlong','zouyan','guiguzi','suqin','zhangyi',
    'lvbuwei','xuxing','dengxi','dongzhongshu','liuan','simaqian','wangchong','yanzhitui'
  ];

  // 每位人物在各视图中的定位参数
  // 默认通用生成规则，个别特殊人物覆盖
  const OVERRIDES = {
    // cross.html 聚焦视图下的概念 key（如果该人物与某核心概念强相关）
    focusConcept: {
      kongzi: 'ren', mengzi: 'ren', xunzi: 'qi',
      laozi: 'dao', zhuangzi: 'wuwei',
      hanfei: null, shangyang: null,
      mozi: null, sunwu: null,
      dongzhongshu: 'yinyang', zouyan: 'yinyang',
      wangchong: 'qi', simaqian: null
    },
    // 跨藏对比中该人物关联的概念（点击跳 cross.html?focus=概念）
    crossConcept: {
      kongzi: 'ren', mengzi: 'ren', xunzi: 'qi',
      laozi: 'dao', zhuangzi: 'wuwei',
      hanfei: 'fa', shangyang: 'fa',
      mozi: null, sunwu: null,
      dongzhongshu: 'yinyang', zouyan: 'yinyang',
      wangchong: 'qi'
    }
  };

  // 人物 → 典籍 path 映射（主要著作）
  const PERSON_TO_BOOK = {
    kongzi: '诸/论语', mengzi: '诸/孟子', xunzi: '诸/荀子',
    laozi: '诸/老子', zhuangzi: '诸/庄子', liezi: '诸/列子',
    hanfei: '诸/韩非子', shangyang: '诸/商君书', shenbuhai: '诸/申子',
    shendao: '诸/慎子', wuchi: '兵/吴子', li_kui: null,
    mozi: '诸/墨子', sunwu: '兵/孙子', sunbin: '兵/孙膑兵法',
    huishi: null, gongsunlong: '诸/公孙龙子', zouyan: '诸/邹子',
    guiguzi: '诸/鬼谷子', suqin: null, zhangyi: null,
    lvbuwei: '诸/吕氏春秋', xuxing: null, dengxi: '诸/邓析子',
    dongzhongshu: '诸/春秋繁露', liuan: '诸/淮南子',
    simaqian: '笔记/史记', wangchong: '诸/论衡', yanzhitui: '笔记/颜氏家训',
    zengzi: null, zisi: '诸/子思子', zigong: null, zixia: null,
    guanzi_yin: '诸/关尹子', wenzi: '诸/文子', lisi: null
  };

  // 人物 → 相关术语（主要关联概念）
  const PERSON_TO_TERM = {
    kongzi: '仁', mengzi: '仁政', xunzi: '性恶论',
    laozi: '无为', zhuangzi: '逍遥',
    hanfei: '法术势', shangyang: '耕战', shenbuhai: '术治',
    mozi: '兼爱', sunwu: '诡道',
    dongzhongshu: '天人感应', zouyan: '五德终始',
    wangchong: '元气', simaqian: '通变',
    guiguzi: '捭阖', lvbuwei: '杂家',
    gongsunlong: '白马非马', huishi: '合同异',
    liezi: '贵虚', wenzi: '守静'
  };

  // 人物 → 时间轴过滤 era（时代）
  const PERSON_TO_ERA = {
    kongzi: '春秋', zengzi: '春秋', zixia: '春秋', zigong: '春秋',
    laozi: '春秋', guanzi_yin: '春秋', sunwu: '春秋',
    mengzi: '战国', zhuangzi: '战国', xunzi: '战国', liezi: '战国', wenzi: '战国',
    hanfei: '战国', shangyang: '战国', shenbuhai: '战国', shendao: '战国',
    mozi: '战国', sunbin: '战国', huishi: '战国', gongsunlong: '战国',
    zouyan: '战国', guiguzi: '战国', suqin: '战国', zhangyi: '战国',
    lvbuwei: '战国', xuxing: '战国', dengxi: '战国', wuchi: '战国', li_kui: '战国',
    lisi: '秦汉', dongzhongshu: '秦汉', liuan: '秦汉', simaqian: '秦汉',
    zisi: '战国', wangchong: '秦汉', yanzhitui: '魏晋'
  };

  // 人物 → 评骘文献中是否出现（哪些文献涉及他）
  const PERSON_TO_PANJIAO = {
    kongzi: ['zhuangzi-tianxia','xunzi-feishier','hanfei-xianxue','lun-liujia','hanzhi','wenxin','siku'],
    mengzi: ['xunzi-feishier','hanfei-xianxue','hanzhi','siku'],
    xunzi: ['hanzhi','siku'],
    laozi: ['zhuangzi-tianxia','xunzi-feishier','hanfei-xianxue','lun-liujia','hanzhi','wenxin','siku'],
    zhuangzi: ['xunzi-feishier','hanzhi','wenxin','siku'],
    liezi: ['hanzhi'],
    hanfei: ['hanzhi','siku'],
    shangyang: ['hanfei-xianxue','hanzhi','siku'],
    shenbuhai: ['hanfei-xianxue','hanzhi'],
    mozi: ['zhuangzi-tianxia','xunzi-feishier','hanfei-xianxue','lun-liujia','hanzhi','wenxin','siku'],
    sunwu: ['hanzhi','siku'],
    huishi: ['zhuangzi-tianxia','xunzi-feishier','hanzhi'],
    gongsunlong: ['zhuangzi-tianxia','xunzi-feishier','hanzhi','siku'],
    zouyan: ['zhuangzi-tianxia','hanzhi','siku'],
    guiguzi: ['siku'],
    suqin: ['hanzhi','siku'],
    zhangyi: ['hanzhi','siku'],
    lvbuwei: ['hanzhi','siku'],
    dengxi: ['xunzi-feishier','hanzhi'],
    dongzhongshu: ['hanzhi','siku'],
    liuan: ['hanzhi','siku'],
    simaqian: ['siku'],
    wangchong: ['siku'],
    yanzhitui: ['siku']
  };

  // 生成每个人物的 links
  const PERSON_LINKS = {};
  PERSON_IDS.forEach(pid => {
    const book = PERSON_TO_BOOK[pid];
    const term = PERSON_TO_TERM[pid];
    const era = PERSON_TO_ERA[pid];
    const focus = OVERRIDES.focusConcept[pid];
    const crossC = OVERRIDES.crossConcept[pid];
    const panjiaoList = PERSON_TO_PANJIAO[pid] || [];

    PERSON_LINKS[pid] = {
      graph: `graph.html?hl=${pid}`,         // 谱系图高亮
      timeline: era ? `timeline.html#era-${era}&hl=${pid}` : `timeline.html?hl=${pid}`,
      panjiao: panjiaoList.length ? `panjiao.html#${panjiaoList[0]}&hl=${pid}` : 'panjiao.html',
      cross: focus ? `cross.html?focus=${focus}&hl=${pid}` : `cross.html?hl=${pid}`,
      citation: `citation.html?hl=${pid}`,
      fullOntology: `full-ontology.html?tab=mentions&hl=${pid}`,
      classic: book ? `classics.html?b=${encodeURIComponent(book)}` : null,
      reader: book ? `reader.html?b=${encodeURIComponent(book)}` : null,
      term: term ? `terms.html#${encodeURIComponent(term)}` : null,
      pairs: []  // 稍后由 people-pairs.js 填充
    };
  });

  global.PERSON_LINKS = PERSON_LINKS;
})(typeof window !== 'undefined' ? window : this);
