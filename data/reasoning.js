// 本体推理规则与查询示例（供 reasoning.html 使用）
// 推理规则：基於 ZCore 本體的屬性閉包
window.REASONING_DATA = {
  // 類層次（子類 -> 父類）
  classHierarchy: [
    ["LegalistText","PhilosophicalText"],
    ["MilitaryText","PhilosophicalText"],
    ["MohistText","PhilosophicalText"],
    ["ConfucianText","PhilosophicalText"],
    ["DaoistText","PhilosophicalText"],
    ["LogicianText","PhilosophicalText"],
    ["YinYangText","PhilosophicalText"],
    ["AgriculturalText","TechnicalText"],
    ["MedicalText","TechnicalText"],
    ["MathematicalText","TechnicalText"],
    ["DivinationText","TechnicalText"],
    ["EclecticText","EncyclopedicText"],
    ["SchoolNote","EncyclopedicText"],
    ["Leishu","EncyclopedicText"],
    ["PhilosophicalText","ZText"],
    ["TechnicalText","ZText"],
    ["EncyclopedicText","ZText"],
    ["NovelText","ZText"]
  ],
  // 屬性傳遞/推理規則
  // 每條：if 三元組匹配模式 => 推出新三元組
  rules: [
    {id:"R1",name:"師承傳遞",desc:"若 A 師從 B，B 師從 C，則 A 為 C 的再傳弟子。",
     pattern:["?a :discipleOf ?b","?b :discipleOf ?c"],
     infer:["?a :grandDiscipleOf ?c"]},
    {id:"R2",name:"創始人即學派成員",desc:"若 P 是學派 S 的 founder，則 P 屬於 S 學派。",
     pattern:["?s :founder ?p"],
     infer:["?p :memberOf ?s"]},
    {id:"R3",name:"作者即文獻創作者",desc:"若典籍 C 的作者是 P，則 P :isAuthorOf C。（逆屬性）",
     pattern:["?c :author ?p"],
     infer:["?p :isAuthorOf ?c"]},
    {id:"R4",name:"學派經典屬於該學派文獻",desc:"若典籍 C 出現在學派 S 的 classics 列表中，則 C :belongsTo S。",
     pattern:["?s :hasClassic ?c"],
     infer:["?c :belongsToSchool ?s"]},
    {id:"R5",name:"類傳遞",desc:"若 A 是 B 的子類，且個體 x 是 A 類，則 x 也是 B 類。",
     pattern:["?a :subClassOf ?b","?x :type ?a"],
     infer:["?x :type ?b"]},
    {id:"R6",name:"概念出現則典籍論述該概念",desc:"若概念 K 是典籍 C 的 coreTerm，則 C :discusses K。",
     pattern:["?c :coreTerm ?k"],
     infer:["?c :discusses ?k"]},
    {id:"R7",name:"批評對立",desc:"若人物 P 批評學派 T，則 P :opposes T（學派立場對立）。",
     pattern:["?p :criticizes ?t"],
     infer:["?p :opposes ?t"]},
    {id:"R8",name:"同門關係",desc:"若 A、B 同為 C 的弟子，則 A、B :classmateOf 彼此。",
     pattern:["?a :discipleOf ?c","?b :discipleOf ?c"],
     infer:["?a :classmateOf ?b"]},
    {id:"R9",name:"時代定位",desc:"若人物 P 生卒年代橫跨時代 E 主要區段，則 P :activeIn E。",
     pattern:["?p :eraSpan ?e"],
     infer:["?p :activeIn ?e"]}
  ],
  // 預定義查詢
  queries:[
    {id:"q1",name:"先秦儒家三代師承鏈",
     desc:"從孔子出發，沿 discipleOf/grandDiscipleOf 推演兩代傳承，找出孔門的再傳弟子。",
     sparql:`SELECT ?disciple ?grand ?book WHERE {
  ?grand :discipleOf ?m .
  ?m :discipleOf :kongzi .
  ?grand :author ?book .
}`,
     logic:"以孔子為起點，先查孔子弟子（:discipleOf :kongzi），再對弟子的弟子應用 R1 師承傳遞規則，得到 :grandDiscipleOf 孔子的再傳弟子（如子思），並聯結其代表著作。",
     answer:[
       {grand:"子思", via:"曾子", book:"《中庸》"},
       {grand:"孟子（子思再傳）", via:"子思門人", book:"《孟子》"},
       {grand:"公孫尼子、樂正克等", via:"曾子門人", book:"（儒家弟子支脈）"}
     ]},
    {id:"q2",name:"法家集大成者韓非的學術源頭",
     desc:"通過師承（荀卿）與學派吸收（法/術/勢三派），查詢韓非的學術淵源。",
     sparql:`SELECT ?source ?kind WHERE {
  :hanfei :discipleOf ?teacher .
  :hanfei :absorbsThought ?source .
}`,
     logic:"韓非 :discipleOf 荀子（R2 荀子屬於儒家，故韓非吸收儒家思想），同時 :absorbsThought 商鞅（法派）、申不害（術派）、慎到（勢派）、老子（道家）。依 R7 韓非 :opposes 儒/墨/縱橫，但吸收其邏輯論辯。",
     answer:[
       {source:"荀子", kind:"師承（儒家禮治→法家治術）"},
       {source:"商鞅", kind:"吸收·法派（成文法）"},
       {source:"申不害", kind:"吸收·術派（君主馭下）"},
       {source:"慎到", kind:"吸收·勢派（威勢）"},
       {source:"老子", kind:"吸收·道家（權術本源）"}
     ]},
    {id:"q3",name:"受老子影響的人物有哪些",
     desc:"列舉所有通過 direct/indirect 師承或思想吸收溯源到老子的人物。",
     sparql:`SELECT ?person ?via WHERE {
  ?person :influencedBy+ :laozi .
}`,
     logic:"依 :influencedBy 屬性傳遞閉包（R1 變體），直接受教為弟子，再傳為影響，思想吸收亦為影響。",
     answer:[
       {person:"關尹", via:"直接弟子"},
       {person:"文子", via:"直接弟子"},
       {person:"列子", via:"關尹弟子（再傳）"},
       {person:"莊子", via:"關尹、列子一系（重要闡發）"},
       {person:"慎到", via:"道家轉法家"},
       {person:"韓非", via:"解老喻老（法家吸收）"},
       {person:"淮南子（劉安門下）", via:"漢代黃老集大成"}
     ]},
    {id:"q4",name:"既批評儒家又批評墨家的學派/人物",
     desc:"找出在學術立場上對儒墨兩家皆持批評態度者。",
     sparql:`SELECT ?p WHERE {
  ?p :opposes :rujia .
  ?p :opposes :mojia .
}`,
     logic:"依 R7，凡 :criticizes 對方學派即可推為 :opposes，查詢交集。",
     answer:[
       {p:"莊子", note:"《齊物論》對儒墨之是非俱遣之"},
       {p:"韓非/商鞅", note:"以法為教，儒墨皆為五蠹/六反之列"},
       {p:"老子（隱含）", note:"「絕聖棄智、絕仁棄義」間接批評儒家仁義"},
       {p:"荀子", note:"非十二子中對子思孟軻與墨翟均有批評，為儒家內部+外部批評"}
     ]},
    {id:"q5",name:"「兼愛」概念出現於哪些典籍",
     desc:"以 :discusses 屬性（R6 反推）查詢所有涉及「兼愛」這一核心概念的文獻。",
     sparql:`SELECT ?book ?stance WHERE {
  ?book :discusses :jianai .
}`,
     logic:"首先《墨子》coreTerm 包含「兼愛」（直接），其次《孟子》批評兼愛（間接 discusses），《莊子·天下》評論墨家兼愛（評述），《荀子·非十二子》批評墨子「僈差等」（批評性論述），《韓非子》以兼愛為害（批評）。",
     answer:[
       {book:"《墨子》", stance:"正面主張（兼愛為十大論題之一）"},
       {book:"《孟子》", stance:"批評「墨氏兼愛，是無父也」"},
       {book:"《莊子·天下》", stance:"評述「墨子氾愛兼利而非鬥」"},
       {book:"《荀子》", stance:"批評其「僈差等」"},
       {book:"《韓非子》", stance:"將兼愛列為亂法之說"}
     ]},
    {id:"q6",name:"成書於戰國後期（-300~-221）的法家經典",
     desc:"依 R5 類繼承，所有 LegalistText 同時也是 PhilosophicalText，且 :writtenDuring 戰國後期。",
     sparql:`SELECT ?b WHERE {
  ?b :type :LegalistText .
  ?b :writtenBetween [-300,-221] .
}`,
     logic:"先依 R5 將 LegalistText 個體全部歸入 PhilosophicalText（保證語義完備），再以 :writtenBetween 時間約束過濾。",
     answer:[
       {b:"《韓非子》", note:"韓非死前成書（-233 前）"},
       {b:"《商君書》", note:"商鞅後學在戰國晚期陸續寫定"},
       {b:"《管子》", note:"部分篇章成於戰國後期齊稷下"},
       {b:"《申子》（佚文）", note:"申不害後學記錄"},
       {b:"《愼子》（輯本）", note:"慎到後學整理"}
     ]},
    {id:"q7",name:"雜家典籍融合了哪些學派思想",
     desc:"查詢 zajiā 文獻的 :synthesizes 屬性，列出其綜合學派清單。",
     sparql:`SELECT ?book ?school WHERE {
  ?book :type :EclecticText .
  ?book :synthesizes ?school .
}`,
     logic:"依 R5，EclecticText 同時是 EncyclopedicText 和 ZText；《呂氏春秋》《淮南子》通過 :synthesizes 屬性連接被融合學派。",
     answer:[
       {book:"《呂氏春秋》", school:"儒、道、墨、法、名、陰陽、兵、農（兼採八家）"},
       {book:"《淮南子》", school:"以道家為主，兼採儒、法、陰陽、方技、神仙家"},
       {book:"《尸子》", school:"雜糅儒、墨、名、法"}
     ]}
  ],
  // 推理演示：從初始三元組，多輪閉包推理
  demoGraph:[
    // 初始三元組 (s, p, o)
    ["kongzi","type","Confucian"],
    ["laozi","type","Daoist"],
    ["zengzi","discipleOf","kongzi"],
    ["zisi","discipleOf","zengzi"],
    ["mengzi","discipleOf","zisi"],
    ["hanfei","discipleOf","xunzi"],
    ["xunzi","type","Confucian"],
    ["shangyang","type","Legalist"],
    ["hanfei","type","Legalist"],
    ["hanfei","absorbsThought","shangyang"],
    ["hanfei","absorbsThought","shenbuhai"],
    ["hanfei","absorbsThought","shendao"],
    ["hanfei","criticizes","rujia"],
    ["hanfei","criticizes","mojia"],
    ["zhuangzi","influencedBy","laozi"],
    ["guanzi_yin","discipleOf","laozi"],
    ["liezi","discipleOf","guanzi_yin"],
    ["zhuangzi","influencedBy","guanzi_yin"],
    ["zhuangzi","influencedBy","liezi"],
    ["lunyu","coreTerm","ren"],
    ["lunyu","author","kongzi"],
    ["mengzi_book","author","mengzi"],
    ["mengzi_book","coreTerm","xing_shan"],
    ["hanfeizi","author","hanfei"],
    ["hanfeizi","type","LegalistText"],
    // 學派 founder
    ["rujia","founder","kongzi"],
    ["daojia","founder","laozi"],
    ["fajia","founder","shangyang"],
    ["mojia","founder","mozi"],
    // 學派 classics
    ["rujia","hasClassic","lunyu"],
    ["rujia","hasClassic","mengzi_book"],
    ["fajia","hasClassic","hanfeizi"]
  ]
};
