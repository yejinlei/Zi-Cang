// 子学核心道体概念本体数据（36核心概念）
window.DAOTI_CONCEPTS = [
  // 道本体层
  { id: "dao", name: "道", parent: "", level: 1, school: "道家/儒家/法家", def: "万物之本原，宇宙运行之根本规律。道家以道为无，先天地生；儒家以道为人伦之道；法家以道为君人南面之术。", source: "《老子》第一章：道可道，非常道", children: ["tiandao","rendao"], weight: 100 },
  { id: "tiandao", name: "天道", parent: "dao", level: 2, school: "道家/阴阳家", def: "自然运行的客观规律，无为而无不为。", source: "《老子》第七十七章：天之道，损有余而补不足", children: ["wuwei","ziran"], weight: 90 },
  { id: "rendao", name: "人道", parent: "dao", level: 2, school: "儒家/法家", def: "人伦社会的规范秩序，与天道对应。", source: "《中庸》：诚者天之道也，诚之者人之道也", children: ["ren","yi","li","fa"], weight: 85 },
  { id: "wuwei", name: "无为", parent: "tiandao", level: 3, school: "道家", def: "不妄为，顺物自然，君人南面之术。", source: "《老子》第三十七章：道常无为而无不为", children: [], weight: 80 },
  { id: "ziran", name: "自然", parent: "tiandao", level: 3, school: "道家", def: "自己如此，本来状态，不假人为。", source: "《老子》第二十五章：人法地，地法天，天法道，道法自然", children: [], weight: 78 },
  
  // 德与性
  { id: "de", name: "德", parent: "", level: 1, school: "道家/儒家", def: "道之落实于物者，得于道而成为自身本性。", source: "《老子》第五十一章：道生之，德畜之", children: ["xing"], weight: 88 },
  { id: "xing", name: "性", parent: "de", level: 2, school: "儒家", def: "人天生的本性，孟子主性善，荀子主性恶，告子主性无善恶。", source: "《孟子·告子上》：人性之善也，犹水之就下也", children: ["shan","e"], weight: 85 },
  { id: "xin", name: "心", parent: "", level: 1, school: "儒家/孟子", def: "思维与道德主体，心之官则思，四端之所居。", source: "《孟子·公孙丑上》：恻隐之心，仁之端也", children: ["siduan"], weight: 82 },
  { id: "siduan", name: "四端", parent: "xin", level: 2, school: "儒家", def: "恻隐、羞恶、辞让、是非之心，为仁义礼智之端。", source: "《孟子·公孙丑上》", children: [], weight: 75 },
  
  // 天与命
  { id: "tian", name: "天", parent: "", level: 1, school: "儒家/墨家/阴阳家", def: "最高主宰、自然之天、义理之天，诸子共有之最高概念。", source: "《论语·阳货》：天何言哉？四时行焉，百物生焉", children: ["ming"], weight: 86 },
  { id: "ming", name: "命", parent: "tian", level: 2, school: "儒家/墨家", def: "天命、命运，莫之致而至者。墨家非命，儒家知命。", source: "《论语·尧曰》：不知命，无以为君子也", children: [], weight: 76 },
  
  // 理气
  { id: "li", name: "理", parent: "", level: 1, school: "宋明理学/法家", def: "事物的条理、法则，宋儒以理为形上本体。", source: "《韩非子·解老》：理者，成物之文也", children: [], weight: 78 },
  { id: "qi", name: "气", parent: "", level: 1, school: "道家/儒家/医家", def: "构成万物的基本质料，阴阳二气交感化生万物。", source: "《庄子·知北游》：通天下一气耳", children: ["yinyang"], weight: 80 },
  { id: "yinyang", name: "阴阳", parent: "qi", level: 2, school: "阴阳家/道家/医家", def: "宇宙两种对立互补的基本力量，一阴一阳之谓道。", source: "《易传·系辞上》：一阴一阳之谓道", children: ["wuxing"], weight: 85 },
  { id: "wuxing", name: "五行", parent: "yinyang", level: 3, school: "阴阳家/医家", def: "金木水火土五种元素，相生相克构成万物变化。", source: "《尚书·洪范》：五行：一曰水，二曰火，三曰木，四曰金，五曰土", children: [], weight: 78 },
  
  // 名法
  { id: "ming", name: "名", parent: "", level: 1, school: "名家/儒家/法家", def: "名称、概念、名分，名实相符是正名之要。", source: "《论语·子路》：名不正则言不顺，言不顺则事不成", children: ["mingshi","zhengming"], weight: 82 },
  { id: "mingshi", name: "名实", parent: "ming", level: 2, school: "名家", def: "名称与实际的关系问题，名家核心议题。", source: "《公孙龙子·名实论》", children: [], weight: 75 },
  { id: "zhengming", name: "正名", parent: "ming", level: 2, school: "儒家", def: "纠正名实混乱，使君臣父子各安其位。", source: "《论语·子路》", children: [], weight: 78 },
  { id: "fa", name: "法", parent: "rendao", level: 2, school: "法家", def: "法令、制度、赏罚标准，治国之准绳。", source: "《韩非子·定法》：法者，宪令著于官府", children: ["shu","shi"], weight: 88 },
  { id: "shu", name: "术", parent: "fa", level: 3, school: "法家", def: "君主驾驭臣下的权术、方法，藏于胸中。", source: "《韩非子·难三》：术者，藏之于胸中以偶众端", children: [], weight: 80 },
  { id: "shi", name: "势", parent: "fa", level: 3, school: "法家", def: "君主的权势、地位，胜众之资。", source: "《韩非子·难势》：势者，胜众之资也", children: [], weight: 78 },
  
  // 仁义礼
  { id: "ren", name: "仁", parent: "rendao", level: 2, school: "儒家", def: "孔子最高道德范畴，爱人，克己复礼为仁。", source: "《论语·颜渊》：樊迟问仁，子曰：爱人", children: ["yi","li"], weight: 92 },
  { id: "yi", name: "义", parent: "ren", level: 3, school: "儒家", def: "宜也，行为合乎道义，正当性原则。", source: "《孟子·告子上》：义，人路也", children: [], weight: 85 },
  { id: "li2", name: "礼", parent: "ren", level: 3, school: "儒家", def: "等级制度、行为规范、礼仪典章，定亲疏决嫌疑。", source: "《论语·为政》：道之以德，齐之以礼", children: ["yue"], weight: 88 },
  { id: "yue", name: "乐", parent: "li2", level: 4, school: "儒家", def: "音乐，和同人心，教化之用，与礼相辅。", source: "《礼记·乐记》：乐者为同，礼者为异", children: [], weight: 72 },
  
  // 兵/战
  { id: "bing", name: "兵", parent: "", level: 1, school: "兵家", def: "战争、军事，国之大事，死生之地，存亡之道。", source: "《孙子兵法·始计》：兵者，国之大事", children: ["qizheng"], weight: 75 },
  { id: "qizheng", name: "奇正", parent: "bing", level: 2, school: "兵家", def: "正兵当敌，奇兵取胜，奇正相生变化无穷。", source: "《孙子兵法·兵势》：凡战者，以正合，以奇胜", children: [], weight: 70 },
  
  // 核心对立范畴
  { id: "liyu", name: "义利", parent: "", level: 1, school: "儒家/墨家", def: "道义与利益的关系，儒家重义轻利，墨家义利合一。", source: "《论语·里仁》：君子喻于义，小人喻于利", children: [], weight: 78 },
  { id: "wangba", name: "王霸", parent: "", level: 1, school: "儒家/法家", def: "以德服人为王，以力假人为霸，王霸之辨。", source: "《孟子·公孙丑上》", children: [], weight: 76 },
  { id: "tianren", name: "天人", parent: "", level: 1, school: "儒家/道家", def: "天道与人道的关系，天人合一与天人相分。", source: "董仲舒《天人三策》", children: [], weight: 82 },
  { id: "zhixing", name: "知行", parent: "", level: 1, school: "儒家", def: "知识与实践的关系，知易行难/知行合一。", source: "《尚书·说命》：非知之艰，行之惟艰", children: [], weight: 74 },
  { id: "jianbai", name: "坚白", parent: "", level: 1, school: "名家", def: "公孙龙离坚白论，坚白石三可乎？", source: "《公孙龙子·坚白论》", children: [], weight: 65 },
  { id: "baimafeima", name: "白马非马", parent: "", level: 1, school: "名家", def: "公孙龙经典命题，个别与一般的差异。", source: "《公孙龙子·白马论》", children: [], weight: 68 },
  { id: "jianai", name: "兼爱", parent: "", level: 1, school: "墨家", def: "无差别地爱一切人，墨家核心主张。", source: "《墨子·兼爱》", children: ["feigong"], weight: 78 },
  { id: "feigong", name: "非攻", parent: "jianai", level: 2, school: "墨家", def: "反对侵略战争，墨家核心主张。", source: "《墨子·非攻》", children: [], weight: 75 },
  { id: "shan", name: "善", parent: "xing", level: 3, school: "儒家", def: "人性本善，孟子性善论核心。", source: "《孟子·告子上》", children: [], weight: 70 },
  { id: "e", name: "恶", parent: "xing", level: 3, school: "儒家/荀子", def: "人性本恶，善者伪也，荀子性恶论。", source: "《荀子·性恶》", children: [], weight: 70 },
];
