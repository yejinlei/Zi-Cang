/**
 * 六藏互通 · 跨藏思想互见索引
 * 佛藏 / 儒藏 / 易藏 / 诗藏 / 子藏 / 史藏 —— 概念、人物、典籍、藏本身的跨藏关系
 * 关系类型：same-root(同根同源) / inherit(思想继承) / comment(注疏传承) / fuse(三教合流) / parallel(并置对举) / influence(源流影响) / oppose(分途对峙) / bridge(人物桥梁)
 */
window.CROSS_CANG = {
  cangs: [
    {id:'zi',     name:'子藏',   short:'子', color:'#8B4513', url:'https://yejinlei.github.io/Zi-Cang/',                desc:'先秦至清诸子百家 · 1157部 · 约2亿字',         scale:'1157部典籍 / 36核心人物 / 83术语'},
    {id:'ru',     name:'儒藏',   short:'儒', color:'#B22222', url:'https://yejinlei.github.io/Confucian-Canon/',       desc:'十三经与四书五经 · 儒家经学传统',             scale:'57核心概念 / 经学注疏体系'},
    {id:'yi',     name:'易藏',   short:'易', color:'#4A4A2A', url:'https://yejinlei.github.io/The-Book-of-Changes/',   desc:'《周易》经传与易学传承 · 阴阳八卦太极',        scale:'18部核心易典 / 象数义理'},
    {id:'fo',     name:'佛藏',   short:'佛', color:'#B8860B', url:'https://yejinlei.github.io/Buddhist/',              desc:'大正藏经律论 · 汉传佛教义理体系',             scale:'93概念 / 134人物 / 9宗派 / 多译本'},
    {id:'shi',    name:'诗藏',   short:'诗', color:'#2E8B57', url:'https://yejinlei.github.io/ShiCang/',               desc:'诗词曲楚辞 · 诗人游历与意象体系',             scale:'109位诗人 / 词牌韵书'},
    {id:'shi2',   name:'史藏',   short:'史', color:'#4B0082', url:'https://yejinlei.github.io/history/',               desc:'二十四史与通鉴 · 编年与纪传传统',             scale:'史记 / 资治通鉴 / 史家谱系'},
  ],

  // 跨藏核心概念节点 —— 出现在两个及以上藏的"枢纽义理"
  concepts: [
    {id:'c-dao',    name:'道',     cangs:['zi','ru','yi','fo'],   group:'终极范畴', desc:'先秦诸子共用的最高范畴。子藏老子"道可道非常道"为本体；儒家之道偏伦理（"朝闻道夕死可矣"）；易以"一阴一阳之谓道"贯三才；禅宗"平常心是道"融道入佛。', weight:30},
    {id:'c-yinyang',name:'阴阳',   cangs:['yi','zi','fo','ru'],   group:'宇宙论',   desc:'《易》之本根（两仪）；邹衍阴阳家入子藏；中医阴阳平衡；理学以阴阳理气；佛教天台宗"性具善恶"亦含阴阳对法。', weight:25},
    {id:'c-wuxing', name:'五行',   cangs:['yi','zi','ru'],        group:'宇宙论',   desc:'金木水火土五德循环；《尚书·洪范》开其源；邹衍五德终始入子；董仲舒天人感应纳入儒；医家藏象五行贯通子藏医家类。', weight:20},
    {id:'c-qi',     name:'气',     cangs:['zi','ru','yi','fo'],   group:'本体论',   desc:'孟子"吾善养吾浩然之气"；庄子"通天下一气耳"；张载"太虚即气"；中医精气学说；禅宗"一气不来"喻性命。', weight:22},
    {id:'c-ren',    name:'仁',     cangs:['ru','zi'],             group:'伦理',     desc:'儒之核心；孔子"仁者爱人"、孟子"仁政"；子藏《论语》《孟子》已收录；韩非子批评"儒以文乱法"，构成仁法对峙。', weight:24},
    {id:'c-yi2',    name:'义',     cangs:['ru','zi','fo'],        group:'伦理',     desc:'儒五常之义；墨子"义者利也"与儒合中见异；《管子》有"礼义廉耻"四维；佛教"义学"指义理之学，字义相通而内涵有别。', weight:16},
    {id:'c-li',     name:'礼',     cangs:['ru','zi','shi'],       group:'制度/美学',desc:'周公制礼作乐；荀子"隆礼重法"；子藏收录《礼记》；诗藏"兴观群怨"以礼乐为诗教背景。', weight:18},
    {id:'c-wuwei',  name:'无为',   cangs:['zi','fo','ru'],        group:'工夫论',   desc:'老子"无为而无不为"；庄子"无为名尸"；黄老之学治术；禅宗"无念为宗"借无为言佛性；理学"静处涵养"近之。', weight:20},
    {id:'c-kong',   name:'空性/空',cangs:['fo','zi','ru'],        group:'本体论',   desc:'佛教核心（śūnyatā），《心经》"色即是空"；子藏《肇论》以"不真空论"融般若与玄学；理学"空"与"理"对峙，斥佛为虚。', weight:22},
    {id:'c-yuanqi', name:'缘起',   cangs:['fo','zi','yi'],        group:'因果论',   desc:'佛教"此有故彼有"；易学"感应"与缘起结构相似；子藏名家"相待"概念可互参。', weight:16},
    {id:'c-yinguo', name:'因果',   cangs:['fo','ru','shi'],       group:'因果论',   desc:'佛教因果业报；儒家"积善之家必有余庆"（《易传》）；诗藏"诗史"观念以因果论世变。', weight:14},
    {id:'c-niepan', name:'涅槃',   cangs:['fo','zi'],             group:'境界论',   desc:'佛教终极解脱；庄子"逍遥"与涅槃境界有结构相似（郭象注曾以"自得"融通）。', weight:12},
    {id:'c-foxing', name:'佛性',   cangs:['fo','ru','zi'],        group:'心性论',   desc:'佛教"一切众生皆有佛性"（《涅槃经》）；孟子"性善"、荀子"性恶"为子藏人性论双轴；理学"天命之性"化佛性为天理。', weight:18},
    {id:'c-zhongyong',name:'中庸', cangs:['ru','zi','yi'],        group:'方法论',   desc:'儒家中庸之道；《中庸》为四书之一；子思"致中和"；易"中正"爻位思想通之；医家"平衡"亦近。', weight:15},
    {id:'c-xingshan',name:'性善',  cangs:['ru','zi'],             group:'心性论',   desc:'孟子主性善，荀子在子藏中批之；扬雄性善恶混、韩愈性三品接续；理学"天命之性本善"承孟子。', weight:14},
    {id:'c-taiji',  name:'太极',   cangs:['yi','ru','zi','dao'],  group:'宇宙论',   desc:'《易传》"易有太极，是生两仪"；周敦颐《太极图说》融道入儒开理学；子藏道家"无极"与太极互训。', weight:22},
    {id:'c-tianming',name:'天命',  cangs:['ru','zi','shi'],       group:'天命观',   desc:'《尚书》"天命靡常"；孔子"五十而知天命"；孟子"莫之为而为者天也"；子藏墨子"非命"与儒对峙；诗藏"诗可以怨"含对天命的追问。', weight:16},
    {id:'c-tianli', name:'天理',   cangs:['ru','fo','yi'],        group:'本体论',   desc:'二程"天理二字却是自家体贴出来"；朱熹"性即理"；佛教"理"为"理佛性"；易"穷理尽性以至于命"为其源头。', weight:18},
    {id:'c-liangzhi',name:'良知',  cangs:['ru','fo','zi'],        group:'心性论',   desc:'王阳明"致良知"集心学大成；孟子"良知良能"为先声；禅宗"本心""本性"与良知结构同构；庄子"真知"近之。', weight:17},
    {id:'c-yijing', name:'意境/境界',cangs:['shi','fo','zi'],     group:'美学',     desc:'诗学核心范畴（王昌龄"三境说"）；佛教"境界"原指心识所现；庄子"逍遥""无何有之乡"为境界说先声。', weight:16},
    {id:'c-yanzhi', name:'言志',   cangs:['shi','ru'],            group:'诗教',     desc:'《尚书·尧典》"诗言志"为诗学总纲；孔子"诗可以兴观群怨"；儒家诗教观贯穿诗藏。', weight:10},
    {id:'c-bixing', name:'比兴',   cangs:['shi','ru','yi'],       group:'诗学/象思',desc:'《诗经》六义之比兴；易"立象以尽意"为比兴思维之原型；儒家"诗教"重比兴寄托。', weight:12},
    {id:'c-shijian',name:'史鉴',   cangs:['shi2','ru','zi'],      group:'历史观',   desc:'"以史为鉴"出自《尚书》"殷鉴不远"；孔子作《春秋》；司马迁"通古今之变"；资治通鉴专取"鉴"义；子藏法家"观往者得失之变"重史。', weight:14},
    {id:'c-xinzhai',name:'心斋坐忘',cangs:['zi','fo','ru'],       group:'工夫论',   desc:'庄子心斋坐忘；禅宗坐禅观心；理学静坐工夫（程朱）与阳明"致良知"均受其影响。', weight:12},
    {id:'c-tongbian',name:'通变',  cangs:['yi','shi','zi'],       group:'历史观',   desc:'《易传》"穷则变，变则通，通则久"；刘勰《文心雕龙·通变》论文；子藏法家"变法"主张本于通变观。', weight:11},
  ],

  // 跨藏关键人物节点 —— 在两个及以上藏产生枢纽作用的思想者
  people: [
    {id:'p-kongzi',     name:'孔子',        cangs:['ru','yi','zi','shi','shi2'],era:'前551-前479', style:'儒圣',  desc:'儒家创始人，序《易传》、删《诗》《书》、订《礼》《乐》、作《春秋》、修《春秋》；子藏收录《论语》及七十子后学；易藏尊为"十翼"作者；诗藏列为诗教源头；史藏《春秋》为编年之祖。', weight:32},
    {id:'p-laozi',      name:'老子',        cangs:['zi','fo','ru','yi'],        era:'约前6世纪',   style:'道祖',  desc:'《道德经》作者；子藏道家祖；道教尊为太上老君；王弼注老会通易老；禅宗以"无为"融道；理学以道为虚而立"理"。', weight:30},
    {id:'p-zhuangzi',   name:'庄子',        cangs:['zi','fo','shi','yi'],       era:'约前369-前286',style:'道学真人',desc:'《庄子》作者；子藏要典；其"逍遥""齐物"与禅宗境界相通；郭象注庄融儒道；诗藏李白、苏轼慕其风；易学"得意忘言"出《庄子》。', weight:26},
    {id:'p-mengzi',     name:'孟子',        cangs:['ru','zi'],                   era:'前372-前289', style:'亚圣',  desc:'子思门人；主性善、仁政；子藏与荀子对立；宋儒尊为亚圣，《孟子》入四书。', weight:22},
    {id:'p-xunzi',      name:'荀子',        cangs:['zi','ru'],                   era:'约前313-前238',style:'儒宗',  desc:'主性恶、隆礼重法；韩非、李斯出其门；子藏重要人物；唐以前儒门尊荀，后渐为孟子所掩。', weight:18},
    {id:'p-simaqian',   name:'司马迁',      cangs:['shi2','shi','zi'],           era:'前145-前86',  style:'史圣',  desc:'《史记》作者，史藏核心；诗藏收录其《报任安书》；子藏《史记》论诸子要籍为学术史奠基。', weight:22},
    {id:'p-wangbi',     name:'王弼',        cangs:['zi','yi','fo'],              era:'226-249',    style:'玄学',  desc:'注《老子》《周易》，开"正始玄风"；以"无"为本，会通易老；其"得意忘象"深为禅宗与玄学所用；子藏、易藏共尊。', weight:24},
    {id:'p-guoxiang',   name:'郭象',        cangs:['zi','fo'],                   era:'约252-312', style:'玄学',  desc:'注《庄子》（窃向秀注），主"独化""性分"；其"自性"说与佛教"性具"有互释；子藏核心注家。', weight:14},
    {id:'p-sengzhao',   name:'僧肇',        cangs:['fo','zi'],                   era:'384-414',    style:'般若',  desc:'鸠摩罗什弟子，作《肇论》（物不迁、不真空、般若无知、涅槃无名），以玄学术语释般若，为"六家七宗"之批判集大成者；佛道互释枢纽人物。', weight:18},
    {id:'p-huineng',    name:'慧能',        cangs:['fo','zi','ru'],              era:'638-713',    style:'禅宗',  desc:'禅宗六祖，《坛经》作者；主"顿悟""本性是佛""无念为宗"；其"明心见性"与孟子"尽心知性"、庄子"坐忘"在宋明理学中被融摄。', weight:22},
    {id:'p-zongmi',     name:'宗密',        cangs:['fo','ru','zi'],              era:'780-841',    style:'华严/禅',desc:'华严五祖，圭峰禅师；著《原人论》《禅源诸诠集》，明确以儒道释三教判教，主张"三教合一"先声；会通佛儒心性论。', weight:16},
    {id:'p-zhou_dunyi', name:'周敦颐',      cangs:['ru','yi','zi','dao'],        era:'1017-1073', style:'理学开山',desc:'著《太极图说》《通书》，以《周易》太极图说为儒家本体奠基；融道家"无极"与儒家"太极"；朱熹、二程皆出其系统。', weight:22},
    {id:'p-shaoyong',   name:'邵雍',        cangs:['yi','ru','zi'],              era:'1011-1077', style:'象数',  desc:'著《皇极经世》《伊川击壤集》；以先天易学构建象数体系；诗藏收入其诗作；为理学"北宋五子"之一。', weight:16},
    {id:'p-zhangzai',   name:'张载',        cangs:['ru','yi','fo'],              era:'1020-1077', style:'关学',  desc:'"横渠四句"；主"太虚即气"；批判佛教"以山河大地为见病"；《西铭》民胞物与为理学核心。', weight:17},
    {id:'p-cheng_hao',  name:'程颢',        cangs:['ru','fo','zi'],              era:'1032-1085', style:'明道',  desc:'北宋五子之一，大程；主"仁者浑然与物同体"，学风近禅、通庄子；心学源头。', weight:16},
    {id:'p-cheng_yi',   name:'程颐',        cangs:['ru','yi'],                   era:'1033-1107', style:'伊川',  desc:'小程；主"性即理""涵养须用敬，进学在致知"；朱熹直接继承者；严斥佛老。', weight:16},
    {id:'p-zhuxi',      name:'朱熹',        cangs:['ru','yi','fo','zi','shi'],   era:'1130-1200', style:'理学集大成',desc:'集理学大成；《四书章句集注》《周易本义》《诗集传》；融易、儒、子（排佛老而实有取于禅宗"体用"）；诗藏《诗集传》为诗经学里程碑。', weight:28},
    {id:'p-lujiuyuan',  name:'陆九渊',      cangs:['ru','fo','zi'],              era:'1139-1193', style:'心学',  desc:'"心即理"；鹅湖之会与朱熹对峙；其"先立乎其大"近孟子、通禅；阳明心学先声。', weight:16},
    {id:'p-wangyangming',name:'王阳明',     cangs:['ru','fo','zi'],              era:'1472-1529', style:'心学集大成',desc:'"致良知""知行合一""心外无物"；融孟子性善、禅宗明心见性、庄子坐忘为一炉；"四句教"融儒佛道。', weight:24},
    {id:'p-liuxie',     name:'刘勰',        cangs:['shi','fo','ru','zi'],        era:'约465-522', style:'文论',  desc:'《文心雕龙》作者；早年依僧祐，精通佛典；其《原道》《通变》《诸子》融汇儒道佛，论文学本体；诗藏文论祖。', weight:14},
    {id:'p-quyuan',     name:'屈原',        cangs:['shi','ru','shi2'],           era:'前340-前278',style:'楚辞',  desc:'《离骚》《九歌》作者；诗藏楚辞源头；司马迁《史记·屈原列传》；儒藏以"忠君爱国"纳入诗教体系。', weight:20},
    {id:'p-dongzhongshu',name:'董仲舒',     cangs:['ru','zi','yi'],              era:'前179-前104', style:'经学',  desc:'"罢黜百家，独尊儒术"；以阴阳五行入儒，天人感应；《春秋繁露》为子、儒、易三藏汇通点。', weight:18},
  ],

  // 跨藏核心典籍节点
  books: [
    {id:'b-zhouyi',     name:'《周易》',        cangs:['yi','ru','zi'],                    desc:'六经之首；经传一体；易藏核心；儒家列群经之首；子藏收录《周易正义》《伊川易传》《周易本义》等注本；阴阳、太极、八卦之源。', weight:30},
    {id:'b-laozi',      name:'《道德经》',      cangs:['zi','fo','yi'],                    desc:'老子五千言；子藏道家首典；王弼、河上公注本；禅宗、道教、玄学、理学均反复诠释；无为、自然、道之源。', weight:28},
    {id:'b-lunyu',      name:'《论语》',        cangs:['ru','zi'],                         desc:'孔子言行录；四书之一；儒藏核心；子藏收录诸家注（何晏集解、朱熹集注、刘宝楠正义）；仁礼之源。', weight:28},
    {id:'b-mengzi',     name:'《孟子》',        cangs:['ru','zi'],                         desc:'四书之一；性善、仁政；子藏与荀子并列为儒家双璧。', weight:22},
    {id:'b-zhuangzi',   name:'《庄子》',        cangs:['zi','fo','shi'],                   desc:'南华真经；子藏道家要典；郭象注；逍遥、齐物；为禅宗与诗学重要思想源头。', weight:24},
    {id:'b-xinjing',    name:'《心经》',        cangs:['fo','zi'],                         desc:'《般若波罗蜜多心经》；色即是空；佛藏般若核心；子藏文人多有注诵，影响宋明理学工夫论。', weight:18},
    {id:'b-jingangjing',name:'《金刚经》',      cangs:['fo','zi','shi'],                   desc:'《金刚般若波罗蜜经》；慧能闻之悟道；王维、苏轼等诗家深受影响；佛藏核心典籍。', weight:18},
    {id:'b-tanjing',    name:'《坛经》',        cangs:['fo','zi','ru'],                    desc:'慧能说法记录；唯一称"经"的汉地祖师著作；佛藏禅典；顿悟见性深为阳明心学所取。', weight:18},
    {id:'b-shijing',    name:'《诗经》',        cangs:['shi','ru','yi'],                   desc:'诗藏六经之首；孔子"不学诗无以言"；《毛诗正义》《诗集传》；比兴为易象思维诗学化。', weight:24},
    {id:'b-chuci',      name:'《楚辞》',        cangs:['shi','zi'],                        desc:'屈原、宋玉作；诗藏与诗经并为风骚之源；子藏文人精神源头之一。', weight:18},
    {id:'b-shiji',      name:'《史记》',        cangs:['shi2','zi','ru'],                  desc:'史藏核心；司马迁作；纪传体之祖；子藏论六家要旨、孔子世家、老子韩非列传、孟子荀卿列传为学术史枢纽。', weight:26},
    {id:'b-zuozhuan',   name:'《左传》',        cangs:['ru','shi2','zi'],                  desc:'春秋三传之一；史藏编年之祖；子藏法家、纵横家多引其例；儒藏列入十三经。', weight:18},
    {id:'b-sishuzhangju',name:'《四书章句集注》',cangs:['ru','zi','fo'],                   desc:'朱熹集注；《大学》《中庸》《论语》《孟子》；科举定本；融易理、禅意、儒道；宋元以后思想枢纽。', weight:22},
    {id:'b-chuanxilu',  name:'《传习录》',      cangs:['ru','fo','zi'],                    desc:'王阳明语录；心学核心；良知、知行合一；融佛禅与孟子心性学；子藏收录。', weight:18},
    {id:'b-taijitu',    name:'《太极图说》',    cangs:['ru','yi','zi'],                    desc:'周敦颐著；融合易之太极、道之无极；为宋明理学奠基；易藏、儒藏、子藏共同经典。', weight:16},
    {id:'b-zhaolun',    name:'《肇论》',        cangs:['fo','zi'],                         desc:'僧肇著；物不迁、不真空、般若无知、涅槃无名四论；以玄学释般若，佛道互释枢纽文本。', weight:14},
    {id:'b-wenxindiaolong',name:'《文心雕龙》', cangs:['shi','ru','fo','zi'],              desc:'刘勰著；诗藏文论祖；其"原道""宗经""征圣""通变"融汇儒道佛三家。', weight:14},
  ],

  // 关系边（所有节点用 id 引用）—— 共六大类
  // 关系类型: same-root / inherit / comment / fuse / influence / bridge / parallel / source / oppose / absorb
  relations: [
    // ===== 道-易同源 =====
    {from:'c-dao',     to:'c-taiji',  type:'same-root', label:'道即太极 · 易老同源', cangs:['yi','zi','ru'], note:'《易传》"一阴一阳之谓道"、老子"道生一"——周敦颐《太极图说》融无极于太极。'},
    {from:'b-zhouyi',  to:'b-laozi',  type:'same-root', label:'易老同源',             cangs:['yi','zi'],     note:'汉代以易解老、以老解易之风；王弼易学注老开玄学。'},
    {from:'c-yinyang', to:'c-taiji',  type:'source',    label:'太极生两仪',           cangs:['yi'],          note:'《易·系辞上》"易有太极，是生两仪"——阴阳由太极而出。'},
    {from:'c-yinyang', to:'c-wuxing', type:'fuse',      label:'阴阳五行合流',         cangs:['yi','zi','ru'],note:'邹衍阴阳家与《洪范》五行合流，经董仲舒纳入儒家天人体系。'},
    {from:'c-yinyang', to:'c-yuanqi', type:'parallel',  label:'阴阳感应 ↔ 缘起',      cangs:['yi','fo'],     note:'易之感生与佛之缘起俱论事物相待而生，结构同构。'},

    // ===== 儒-道 互摄 =====
    {from:'c-ren',     to:'c-dao',    type:'parallel',  label:'仁道并行',             cangs:['ru','zi'],     note:'儒道互补，孔子问礼于老子为汉以下文化母题。'},
    {from:'c-wuwei',   to:'c-li',     type:'oppose',    label:'无为 vs 隆礼',         cangs:['zi'],          note:'庄子、老子主无为；荀子、管子重礼法。'},
    {from:'c-xingshan',to:'c-foxing', type:'parallel',  label:'性善 ↔ 佛性',          cangs:['ru','fo'],     note:'"一切众生皆有佛性"与孟子性善说结构同构，为理学融佛关键。'},
    {from:'c-xinzhai', to:'c-liangzhi',type:'influence',label:'坐忘 → 致良知',        cangs:['zi','ru','fo'],note:'庄子心斋坐忘经禅宗"明心见性"中转，化出阳明致良知工夫。'},

    // ===== 佛-玄 合流（魏晋南北朝）=====
    {from:'p-wangbi',  to:'b-laozi',  type:'comment',   label:'王弼注老',             cangs:['zi','yi'],     note:'王弼《老子注》为玄学定本，以"无"为本。'},
    {from:'p-wangbi',  to:'b-zhouyi', type:'comment',   label:'王弼注易',             cangs:['yi','zi'],     note:'王弼《周易注》一扫汉儒象数，以义理说易，为玄学易开山。'},
    {from:'p-sengzhao',to:'p-laozi',  type:'absorb',    label:'以玄释佛 · 僧肇融道', cangs:['fo','zi'],     note:'《肇论》"不真空"用老子"无名"、庄子"齐物"说般若空义。'},
    {from:'p-sengzhao',to:'b-zhaolun',type:'source',    label:'肇论 · 佛道互释典据', cangs:['fo','zi'],     note:'佛道互释第一文本。'},
    {from:'p-guoxiang',to:'b-zhuangzi',type:'comment', label:'郭象注庄 · 独化论',   cangs:['zi'],          note:'郭象《庄子注》主"独化于玄冥之境"，将庄子自然说系统化，影响佛教"性具"说。'},

    // ===== 禅-儒 会通 =====
    {from:'p-huineng', to:'b-tanjing',type:'source',    label:'坛经 · 禅宗要典',     cangs:['fo'],          note:'慧能说、法海录，顿悟见性之宗。'},
    {from:'c-kong',    to:'c-wuwei',  type:'fuse',      label:'空 ↔ 无',              cangs:['fo','zi'],     note:'般若"空"与玄学"无"经六家七宗争鸣后合流。'},
    {from:'c-niepan',  to:'c-wuwei',  type:'parallel',  label:'涅槃 ↔ 逍遥',          cangs:['fo','zi'],     note:'支遁《逍遥论》以佛理注庄，"至人逍遥"即涅槃义。'},
    {from:'p-zongmi',  to:'p-zhou_dunyi',type:'influence', label:'宗密判教 → 理学本体论',cangs:['fo','ru'],   note:'宗密《原人论》判"儒道皆权、佛为实"，其"真心"论影响理学心性结构。'},
    {from:'c-foxing',  to:'c-tianli', type:'influence', label:'佛性 → 天理',          cangs:['fo','ru'],     note:'理学以"天理"置换"佛性"，保留心性先验结构而批评其虚。'},
    {from:'c-liangzhi',to:'c-foxing', type:'absorb',    label:'良知 吸收 佛性',       cangs:['ru','fo'],     note:'阳明"良知"即"本心"，即慧能"本性是佛"的儒门转译。'},
    {from:'p-lujiuyuan',to:'p-huineng',type:'influence',label:'心即理 ← 明心见性',   cangs:['ru','fo'],     note:'陆九渊"心即理"、"宇宙便是吾心"，结构同慧能"自心是佛"。'},
    {from:'p-wangyangming',to:'p-huineng',type:'influence',label:'致良知 ← 顿悟见性',cangs:['ru','fo'],     note:'阳明龙场悟道类慧能闻经悟道；四句教与禅宗"三句"同构。'},

    // ===== 理学：三教合流的集大成 =====
    {from:'p-zhou_dunyi',to:'b-taijitu',type:'source',label:'太极图说 · 理学开山',  cangs:['ru','yi','zi'],note:'249字短文，为宋明理学宇宙论奠基。'},
    {from:'p-zhou_dunyi',to:'p-zhuxi',type:'inherit',label:'周敦颐 → 朱熹',         cangs:['ru'],          note:'朱熹为《太极图说》《通书》作解，确立其理学道统地位。'},
    {from:'p-zhangzai',  to:'c-qi',    type:'source', label:'太虚即气',              cangs:['ru','zi','yi'],note:'张载以"气"为本体，批判佛老空无，开出气学一系。'},
    {from:'p-cheng_hao', to:'p-wangyangming',type:'inherit',label:'明道 → 阳明（心学脉）',cangs:['ru','fo'],note:'大程"仁者与物同体"近禅，为陆王心学源头。'},
    {from:'p-cheng_yi',  to:'p-zhuxi', type:'inherit',label:'伊川 → 朱熹（理学脉）',cangs:['ru','yi'],     note:'小程"性即理"为朱熹直接继承，开出程朱理学。'},
    {from:'p-shaoyong',  to:'b-zhouyi',type:'comment',label:'邵雍先天易',           cangs:['yi','ru'],     note:'《皇极经世》以先天象数学统摄历史与宇宙。'},
    {from:'p-zhuxi',     to:'b-sishuzhangju',type:'source',label:'四书章句集注',     cangs:['ru'],          note:'朱熹取《大学》《中庸》《论语》《孟子》作注，后世科举定本。'},
    {from:'p-zhuxi',     to:'b-zhouyi',type:'comment',label:'周易本义',              cangs:['yi','ru'],     note:'朱熹易学重占卜本义，与程伊川易传并称"程朱易"。'},
    {from:'p-wangyangming',to:'b-chuanxilu',type:'source',label:'传习录',            cangs:['ru','fo','zi'],note:'阳明语录，心学核心文献。'},

    // ===== 诗-佛-道 美学融通 =====
    {from:'c-yijing', to:'c-kong',    type:'absorb',    label:'境界 源自 佛境',       cangs:['shi','fo','zi'],note:'"境界"原为佛教术语（viṣaya），经王昌龄《诗格》"三境说"转为诗学核心。'},
    {from:'c-yijing', to:'c-xinzhai', type:'inherit',   label:'意境 上承 逍遥/坐忘', cangs:['shi','zi'],     note:'庄子"无何有之乡""心斋"为意境说之审美先声。'},
    {from:'c-yanzhi', to:'c-li',      type:'source',    label:'言志本于礼',           cangs:['shi','ru'],     note:'《尧典》"诗言志"经孔子"兴观群怨"化为诗教。'},
    {from:'c-bixing', to:'c-taiji',   type:'same-root', label:'比兴 ↔ 易象',          cangs:['shi','yi'],     note:'易"立象以尽意"与诗"比兴"同为中国象思维原型。'},
    {from:'p-quyuan', to:'b-chuci',   type:'source',    label:'屈原作楚辞',           cangs:['shi'],          note:'楚辞为浪漫主义源头。'},
    {from:'p-liuxie', to:'b-wenxindiaolong',type:'source',label:'文心雕龙',          cangs:['shi','fo','ru','zi'],note:'刘勰融儒道佛论文学本体。'},
    {from:'p-liuxie', to:'c-tongbian',type:'source',   label:'通变论文脉',           cangs:['shi','yi','zi'],note:'《通变》篇本于《易传》"穷变通久"，论文学因革。'},

    // ===== 史-儒-子 通鉴 =====
    {from:'c-shijian',to:'p-kongzi',  type:'source',    label:'孔子作春秋',           cangs:['shi2','ru'],   note:'《春秋》为编年史祖，"春秋笔法"开史学褒贬传统。'},
    {from:'p-simaqian',to:'b-shiji', type:'source',    label:'司马迁作史记',         cangs:['shi2','zi','ru'],note:'《史记》为纪传体之祖，论六家要旨、叙孔孟老庄为学术史第一文献。'},
    {from:'b-shiji',  to:'b-lunyu',   type:'influence', label:'史记 · 孔子世家',      cangs:['shi2','ru'],   note:'司马迁为孔子立世家，确立孔子"至圣"地位。'},
    {from:'b-shiji',  to:'p-laozi',   type:'influence', label:'史记 · 老子韩非列传',  cangs:['shi2','zi'],   note:'老子与韩非同传，揭示道法家渊源。'},
    {from:'c-shijian',to:'c-tongbian',type:'same-root', label:'史鉴 ↔ 通变',          cangs:['shi2','yi'],   note:'史学"鉴往知来"与易学"变通"精神一致。'},
    {from:'b-zuozhuan',to:'b-shiji',  type:'influence', label:'左传 → 史记',          cangs:['shi2','ru'],   note:'《左传》叙事传统为《史记》所继承。'},

    // ===== 关键人物桥梁 =====
    {from:'p-kongzi', to:'b-lunyu',   type:'source',   label:'论语记孔子言',         cangs:['ru','zi'],     note:'孔子弟子及再传弟子辑录。'},
    {from:'p-kongzi', to:'b-shijing', type:'edit',     label:'孔子删诗',             cangs:['shi','ru'],    note:'传统说孔子删诗为三百篇，定"思无邪"之旨。'},
    {from:'p-kongzi', to:'b-zhouyi',  type:'comment',  label:'孔子序易传（十翼）',   cangs:['yi','ru'],     note:'《易传》（十翼）传统归于孔子，易学"人文化成"由此开出。'},
    {from:'p-laozi',  to:'b-laozi',   type:'source',   label:'老子作道德经',         cangs:['zi'],          note:'出函谷关为尹喜著五千言。'},
    {from:'p-dongzhongshu',to:'c-yinyang',type:'absorb',label:'董仲舒纳阴阳入儒',    cangs:['ru','zi','yi'],note:'天人三策、春秋繁露以阴阳五行构建天人感应体系。'},
    {from:'p-dongzhongshu',to:'p-kongzi',type:'inherit',label:'独尊儒术 · 尊孔子',   cangs:['ru'],          note:'汉武帝时立五经博士，儒术定于一尊。'},
    {from:'p-mengzi', to:'c-xingshan',type:'source',   label:'孟子主性善',           cangs:['ru','zi'],     note:'《孟子·告子上》"水信无分于东西，无分于上下乎？"'},
    {from:'p-xunzi',  to:'c-ren',     type:'reinterpret',label:'荀子化性起伪',       cangs:['ru','zi'],     note:'荀子认为人性本恶，需以礼义教化。'},

    // ===== 跨藏典籍注疏链 =====
    {from:'b-sishuzhangju',to:'b-lunyu',type:'comment',label:'论语集注',             cangs:['ru'],         note:'《论语》入四书，朱熹集注。'},
    {from:'b-sishuzhangju',to:'b-mengzi',type:'comment',label:'孟子集注',            cangs:['ru'],         note:'《孟子》升格为经。'},
    {from:'b-xinjing',to:'p-sengzhao',type:'comment',  label:'心经注疏流',           cangs:['fo'],         note:'心经为般若心要，注家众多。'},
    {from:'b-jingangjing',to:'p-huineng',type:'influence',label:'慧能闻金刚经悟道', cangs:['fo','zi'],    note:'慧能于客舍闻"应无所住而生其心"一悟而至黄梅。'},

    // ===== 子藏-佛藏-诗藏的人物通感 =====
    {from:'p-zhuangzi',to:'p-quyuan',  type:'parallel', label:'庄屈同风',             cangs:['zi','shi'],   note:'庄之浪漫与屈之浪漫共同塑造中国文人精神。'},
    {from:'p-wangyangming',to:'p-mengzi',type:'inherit',label:'阳明承孟子',         cangs:['ru','zi'],    note:'阳明"良知"直承孟子"良知良能"。'},
    {from:'c-qi',       to:'c-yinyang',type:'fuse',     label:'气分阴阳',             cangs:['yi','zi','ru'],note:'气有阴阳、动静、聚散——贯通医、易、儒、道的底层范畴。'},
    {from:'c-tianming', to:'c-tianli', type:'inherit',  label:'天命 → 天理',          cangs:['ru','zi'],    note:'先秦"天命"经汉儒"天人感应"至宋儒收摄为形上"天理"。'},
    {from:'c-zhongyong',to:'c-kong',   type:'oppose',   label:'中庸 vs 空',           cangs:['ru','fo'],    note:'儒家中庸讲"执两用中"，佛家讲空不落两边——结构相似而宗旨不同。'},
    {from:'b-tanjing',  to:'c-tongbian',type:'parallel',label:'禅悟 vs 易变',        cangs:['fo','yi'],    note:'禅宗"机锋""顿悟"与易"变动不居"在时机意识上相通。'},
    {from:'c-yinguo',   to:'c-shijian',type:'parallel',label:'因果 ↔ 史鉴',         cangs:['fo','shi2'],  note:'佛教"业报"与史家"祸福无门惟人自召"在叙事层面同构。'},
    {from:'c-yi2',      to:'c-kong',   type:'fuse',     label:'义学（佛）↔ 义（儒）',cangs:['fo','ru'],    note:'佛教"义学"指义理之学，字义与儒家"义"同而语境有别，隋唐以后渐融合。'},

    // ===== 跨藏桥梁人物：刘勰/王弼/宗密 =====
    {from:'p-wangbi',   to:'p-sengzhao',type:'influence',label:'王弼玄学 → 僧肇般若',cangs:['fo','zi'],   note:'僧肇《不真空论》用王弼"贵无"、"得意忘象"解般若。'},
    {from:'p-zongmi',   to:'p-liuxie',  type:'parallel', label:'宗密 ↔ 刘勰 · 释门文律',cangs:['fo','shi'],note:'两人皆出家又精于儒典，以佛理统合文统与道统。'},
    {from:'p-liuxie',   to:'b-shijing', type:'source',   label:'文心 · 明诗篇论诗',   cangs:['shi'],        note:'《明诗》篇溯诗之源流。'},
  ],
};
