/* 子藏本体规范总纲 v2.0 · TBox 层（模块化 1+6 本体栈，类/对象属性/数据属性/推理规则/枚举） */
window.ONTOLOGY_SCHEMA = {
 "meta": {
  "name": "子藏本体论 v2.0（模块化正式版）",
  "en": "Zi-Cang Ontology (ZiCang) v2.0 — Modular Ontology for Classical Chinese Thought",
  "version": "2.0",
  "released": "2026-11-14",
  "namespaces": {
   "zc": "https://yejinlei.github.io/Zi-Cang/ontology#",
   "zbib": "https://yejinlei.github.io/Zi-Cang/ontology/bib#",
   "zcon": "https://yejinlei.github.io/Zi-Cang/ontology/con#",
   "zsch": "https://yejinlei.github.io/Zi-Cang/ontology/sch#",
   "zhev": "https://yejinlei.github.io/Zi-Cang/ontology/hev#",
   "zexe": "https://yejinlei.github.io/Zi-Cang/ontology/exe#",
   "owl": "http://www.w3.org/2002/07/owl#",
   "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
   "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
   "xsd": "http://www.w3.org/2001/XMLSchema#",
   "skos": "http://www.w3.org/2004/02/skos/core#",
   "dc": "http://purl.org/dc/terms/",
   "foaf": "http://xmlns.com/foaf/0.1/",
   "crm": "http://www.cidoc-crm.org/cidoc-crm/",
   "bf": "http://id.loc.gov/ontologies/bibframe/",
   "frbr": "http://purl.org/vocab/frbr/core#",
   "prov": "http://www.w3.org/ns/prov#",
   "oa": "http://www.w3.org/ns/oa#"
  },
  "license": "CC BY-SA 4.0",
  "desc": "模块化「1+6」本体栈：zcore 为顶层核心本体，zbib（文献目录）/zcon（概念论证）/zsch（学派师承）/zhev（历史事件）/zexe（注疏训诂）五个领域本体通过 owl:imports 桥接。对齐 CIDOC CRM / BIBFRAME / FRBR / FOAF / SKOS / Dublin Core / PROV-O / Open Annotation / CBDB / Wikidata。",
  "modules": [
   {
    "id": "zcore",
    "cn": "核心顶层",
    "desc": "顶层抽象类与跨模块通用属性，所有其他模块 owl:imports 本模块"
   },
   {
    "id": "zbib",
    "cn": "文献目录",
    "desc": "FRBR WEMI 四层 + 篇章/章句/引文/异文，对齐 BIBFRAME/FRBR/DCMI"
   },
   {
    "id": "zcon",
    "cn": "概念论证",
    "desc": "哲学概念、命题、论证、对话、寓言、譬喻，对齐 AIF/SKOS"
   },
   {
    "id": "zsch",
    "cn": "学派师承",
    "desc": "学派、谱系、思想影响、辩论事件，对齐 PROV-O/FOAF"
   },
   {
    "id": "zhev",
    "cn": "历史事件",
    "desc": "著作、编纂、禁毁、升格、传播、赞助等知识史事件，对齐 CIDOC CRM"
   },
   {
    "id": "zexe",
    "cn": "注疏训诂",
    "desc": "注疏诠释、训诂词条、训释类型，对齐 Open Annotation / OntoLex-Lemon"
   }
  ],
  "alignments": {
   "crm": {
    "zc:Person": "crm:E21_Person",
    "zc:Event": "crm:E5_Event",
    "zc:Place": "crm:E53_Place",
    "zc:Period": "crm:E4_Period",
    "zbib:Work": "crm:E89_Propositional_Object",
    "zbib:Manifestation": "crm:E84_Information_Carrier",
    "zcon:Concept": "crm:E89_Propositional_Object (skos:Concept)"
   },
   "bibframe": {
    "zbib:Work": "bf:Work",
    "zbib:Instance": "bf:Instance",
    "zbib:Item": "bf:Item",
    "zbib:Expression": "bf:Work / bf:Expression",
    "zexe:Annotation": "bf:Annotation"
   },
   "frbr": {
    "zbib:Work": "frbr:Work",
    "zbib:Expression": "frbr:Expression",
    "zbib:Manifestation": "frbr:Manifestation",
    "zbib:Item": "frbr:Item"
   },
   "foaf": {
    "zc:Person": "foaf:Person",
    "zc:Organization": "foaf:Organization"
   },
   "skos": {
    "zcon:Concept": "skos:Concept",
    "zsch:School": "skos:Collection"
   },
   "dcterms": {
    "zbib:Work": "dcterms:BibliographicResource",
    "zc:Person": "dcterms:Agent"
   },
   "prov": {
    "zsch:InfluenceRelation": "prov:Influence",
    "zhev:AuthorshipEvent": "prov:Activity"
   },
   "oa": {
    "zexe:CommentaryNote": "oa:Annotation"
   }
  }
 },
 "classes": [
  {
   "id": "zc:Thing",
   "mod": "zcore",
   "cn": "事物",
   "parent": "",
   "en": "Thing",
   "def": "本体最顶层类，所有类皆为其子类。",
   "align": "owl:Thing"
  },
  {
   "id": "zc:Entity",
   "mod": "zcore",
   "cn": "实体",
   "parent": "zc:Thing",
   "en": "Entity",
   "def": "可被指称、可具标识的独立存在物，含人物、组织、地点、时段等。",
   "align": "crm:E77_Persistent_Item"
  },
  {
   "id": "zc:Person",
   "mod": "zcore",
   "cn": "人物",
   "parent": "zc:Entity",
   "en": "Person",
   "def": "历史上真实存在的诸子人物、注家、学者、帝王、门客等。",
   "align": "foaf:Person / crm:E21_Person / cbdb:Person"
  },
  {
   "id": "zc:Organization",
   "mod": "zcore",
   "cn": "组织",
   "parent": "zc:Entity",
   "en": "Organization",
   "def": "具有共同目标的人群集合，如稷下学宫、兰台、弘文馆、学派之属。",
   "align": "foaf:Organization"
  },
  {
   "id": "zc:Place",
   "mod": "zcore",
   "cn": "地点",
   "parent": "zc:Entity",
   "en": "Place",
   "def": "与人物、事件相关的地理实体，如国别、都邑、山川、书院。",
   "align": "crm:E53_Place"
  },
  {
   "id": "zc:TimeSpan",
   "mod": "zcore",
   "cn": "时段",
   "parent": "zc:Entity",
   "en": "TimeSpan",
   "def": "历史分期、朝代、年号、生卒年等时间区间。",
   "align": "crm:E52_Time-Span / dcterms:PeriodOfTime"
  },
  {
   "id": "zc:AbstractResource",
   "mod": "zcore",
   "cn": "抽象资源",
   "parent": "zc:Thing",
   "en": "AbstractResource",
   "def": "不依赖具体载体而存在的抽象对象，含作品、概念、学派等。",
   "align": "crm:E89_Propositional_Object"
  },
  {
   "id": "zc:Event",
   "mod": "zcore",
   "cn": "事件",
   "parent": "zc:Thing",
   "en": "Event",
   "def": "发生于特定时空的具体事件，含著作、辩论、会盟、游历等。",
   "align": "crm:E5_Event"
  },
  {
   "id": "zc:Relation",
   "mod": "zcore",
   "cn": "关系类型",
   "parent": "zc:Thing",
   "en": "RelationType",
   "def": "实体间链接之抽象类型（元类，用于对关系本身做分类）。"
  },
  {
   "id": "zc:Dataset",
   "mod": "zcore",
   "cn": "数据集",
   "parent": "zc:AbstractResource",
   "en": "Dataset",
   "def": "结构化数据集合，如目录、索引、标注集。",
   "align": "dcat:Dataset"
  },
  {
   "id": "zc:License",
   "mod": "zcore",
   "cn": "授权",
   "parent": "zc:Thing",
   "en": "License",
   "def": "数据与文本的开放授权声明。"
  },
  {
   "id": "zc:Canon",
   "mod": "zcore",
   "cn": "典籍藏",
   "parent": "zc:AbstractResource",
   "en": "Canon",
   "def": "独立的典籍收藏单元，如子藏、儒藏、易藏、佛藏、诗藏、史藏。"
  },
  {
   "id": "zc:CrossCanonConcept",
   "mod": "zcore",
   "cn": "跨藏概念",
   "parent": "",
   "en": "CrossCanonConcept",
   "def": "出现于两个及以上典籍藏、构成跨藏思想枢纽的义理概念。",
   "note": "Bridge node for cross-canon navigation"
  },
  {
   "id": "zc:CrossCanonWork",
   "mod": "zcore",
   "cn": "跨藏典籍",
   "parent": "",
   "en": "CrossCanonWork",
   "def": "在多个典籍藏中被收录或反复诠释的枢纽典籍。"
  },
  {
   "id": "zc:CrossCanonPerson",
   "mod": "zcore",
   "cn": "跨藏人物",
   "parent": "",
   "en": "CrossCanonPerson",
   "def": "思想影响跨越多个典籍藏的关键人物。"
  },
  {
   "id": "zbib:Work",
   "mod": "zbib",
   "cn": "作品",
   "parent": "zc:AbstractResource",
   "en": "Work",
   "def": "抽象之著作实体，不依具体版本而存在，如《庄子》这部书。",
   "align": "frbr:Work / bf:Work / crm:E89"
  },
  {
   "id": "zbib:Expression",
   "mod": "zbib",
   "cn": "文本表达",
   "parent": "zc:AbstractResource",
   "en": "Expression",
   "def": "作品之特定文本形态/版本系统，如「郭象注本《庄子》」「王弼注本《老子》」。",
   "align": "frbr:Expression / bf:Expression"
  },
  {
   "id": "zbib:Manifestation",
   "mod": "zbib",
   "cn": "载体版本",
   "parent": "zc:Entity",
   "en": "Manifestation",
   "def": "具体版刻、抄本、整理本、数字本，承载某一 Expression。",
   "align": "frbr:Manifestation / bf:Instance / crm:E84"
  },
  {
   "id": "zbib:Item",
   "mod": "zbib",
   "cn": "实物藏本",
   "parent": "zc:Entity",
   "en": "Item",
   "def": "单一具体的物理藏本，如某图书馆所藏宋刻本、敦煌某写卷。",
   "align": "frbr:Item / bf:Item"
  },
  {
   "id": "zbib:PartWhole",
   "mod": "zbib",
   "cn": "文献结构单元",
   "parent": "zc:AbstractResource",
   "en": "TextualComponent",
   "def": "文献内部层级结构的顶层抽象类，篇、卷、章、段、句皆为其子类。"
  },
  {
   "id": "zbib:Chapter",
   "mod": "zbib",
   "cn": "篇章",
   "parent": "zbib:PartWhole",
   "en": "Chapter/Pian",
   "def": "作品之下的一级结构单元——篇，如《逍遥游》《齐物论》。",
   "align": "bf:Part"
  },
  {
   "id": "zbib:Juan",
   "mod": "zbib",
   "cn": "卷",
   "parent": "zbib:PartWhole",
   "en": "Juan/Volume",
   "def": "版本学意义上的卷次单位，不同于思想性的篇。"
  },
  {
   "id": "zbib:Section",
   "mod": "zbib",
   "cn": "段落章",
   "parent": "zbib:PartWhole",
   "en": "Section",
   "def": "篇之内的语义/结构段，如「大知闲闲，小知閒閒」一段。"
  },
  {
   "id": "zbib:Paragraph",
   "mod": "zbib",
   "cn": "段落",
   "parent": "zbib:PartWhole",
   "en": "Paragraph",
   "def": "自然段落，通常以换行为界。"
  },
  {
   "id": "zbib:Sentence",
   "mod": "zbib",
   "cn": "句子",
   "parent": "zbib:PartWhole",
   "en": "Sentence",
   "def": "以句号/问号/感叹号为界的最小完整表达单元。"
  },
  {
   "id": "zbib:Passage",
   "mod": "zbib",
   "cn": "文段锚点",
   "parent": "zc:AbstractResource",
   "en": "Passage",
   "def": "文本中一段具有明确起止偏移的片段，作为引文、证据、标引的锚点。",
   "align": "oa:SpecificResource"
  },
  {
   "id": "zbib:Quotation",
   "mod": "zbib",
   "cn": "引文",
   "parent": "zbib:Passage",
   "en": "Quotation",
   "def": "引自他书的文段，须具原典出处。",
   "note": "即「引文锚点」，本体论证据层的核心"
  },
  {
   "id": "zbib:TextualVariant",
   "mod": "zbib",
   "cn": "异文",
   "parent": "zc:AbstractResource",
   "en": "TextualVariant",
   "def": "同一句段在不同版本中的文字差异记录，为校勘学核心对象。"
  },
  {
   "id": "zbib:IdiomAllusion",
   "mod": "zbib",
   "cn": "典故成语",
   "parent": "zc:AbstractResource",
   "en": "Idiom/Allusion",
   "def": "源出诸子典籍的成语典故，含典源、原句、后世用法。"
  },
  {
   "id": "zbib:ParallelPassage",
   "mod": "zbib",
   "cn": "平行文本",
   "parent": "zc:AbstractResource",
   "en": "ParallelPassage",
   "def": "不同典籍中意思相近、可资对勘的文段，如《韩非子·喻老》对应《老子》某句。"
  },
  {
   "id": "zbib:Category",
   "mod": "zbib",
   "cn": "目录类目",
   "parent": "zc:AbstractResource",
   "en": "BibliographicCategory",
   "def": "目录学分类单元，如七略诸子略、四部分类子部。"
  },
  {
   "id": "zbib:CatalogRecord",
   "mod": "zbib",
   "cn": "目录著录",
   "parent": "zc:AbstractResource",
   "en": "CatalogRecord",
   "def": "某书在历代目录中的一条著录（含分类、卷数、存佚、解题）。"
  },
  {
   "id": "zbib:TextualStatus",
   "mod": "zbib",
   "cn": "存佚状态",
   "parent": "zc:Thing",
   "en": "TextualStatus",
   "def": "文献存佚状态枚举：现存/辑佚/亡佚/出土重现。"
  },
  {
   "id": "zcon:Concept",
   "mod": "zcon",
   "cn": "义理概念",
   "parent": "zc:AbstractResource",
   "en": "PhilosophicalConcept",
   "def": "哲学思想范畴与术语，如道、德、仁、义、气、性、心、理。",
   "align": "skos:Concept"
  },
  {
   "id": "zcon:ConceptPhase",
   "mod": "zcon",
   "cn": "概念阶段",
   "parent": "zc:AbstractResource",
   "en": "ConceptPhase",
   "def": "同一概念在特定思想家、特定著作中的阶段性语义——如「老子之道/庄子之道/王弼之道」。"
  },
  {
   "id": "zcon:Doctrine",
   "mod": "zcon",
   "cn": "学说主张",
   "parent": "zcon:Concept",
   "en": "Doctrine",
   "def": "成体系的命题丛，如性善论、兼爱说、白马非马。"
  },
  {
   "id": "zcon:Claim",
   "mod": "zcon",
   "cn": "命题",
   "parent": "zc:AbstractResource",
   "en": "PhilosophicalClaim",
   "def": "可以判定真伪/立场的最小判断单元——如「鯈鱼出游从容，是鱼之乐也」。",
   "align": "aif:Claim / argument:ClaimPosition"
  },
  {
   "id": "zcon:Argument",
   "mod": "zcon",
   "cn": "论证",
   "parent": "zc:AbstractResource",
   "en": "Argument",
   "def": "由前提、方法、结论组成的论证结构，支持或反驳某命题。",
   "align": "aif:Argument"
  },
  {
   "id": "zcon:ArgumentScheme",
   "mod": "zcon",
   "cn": "论证图式",
   "parent": "zc:Thing",
   "en": "ArgumentScheme",
   "def": "论证方法类型：譬喻、寓言、重言、对话问答、两难、归谬、排比、征引、考据、类比、正论、反证。"
  },
  {
   "id": "zcon:Premise",
   "mod": "zcon",
   "cn": "前提",
   "parent": "zcon:Claim",
   "en": "Premise",
   "def": "论证中作为起点的已接受命题。"
  },
  {
   "id": "zcon:Conclusion",
   "mod": "zcon",
   "cn": "结论",
   "parent": "zcon:Claim",
   "en": "Conclusion",
   "def": "论证所抵达的命题。"
  },
  {
   "id": "zcon:Dialogue",
   "mod": "zcon",
   "cn": "问答对话",
   "parent": "zc:AbstractResource",
   "en": "Dialogue",
   "def": "文本中问答往复的对话单元，如《论语》弟子问孔子答、《庄子》寓言对话。"
  },
  {
   "id": "zcon:DialogueTurn",
   "mod": "zcon",
   "cn": "话轮",
   "parent": "zc:AbstractResource",
   "en": "DialogueTurn",
   "def": "对话中的一次发言——问、答、难、应、辩。"
  },
  {
   "id": "zcon:Fable",
   "mod": "zcon",
   "cn": "寓言",
   "parent": "zc:AbstractResource",
   "en": "Fable/Parable",
   "def": "以虚构故事寄寓哲学义理的文段，如庄周梦蝶、庖丁解牛。",
   "note": "庄子「三言」之一：寓言十九，藉外论之"
  },
  {
   "id": "zcon:AncientSayings",
   "mod": "zcon",
   "cn": "重言",
   "parent": "zc:AbstractResource",
   "en": "WeightedSaying",
   "def": "借重先圣、时贤、长老之言以增强可信度的引文。",
   "note": "庄子「三言」之一：重言十七，所以已言也"
  },
  {
   "id": "zcon:FigurativeSpeech",
   "mod": "zcon",
   "cn": "卮言",
   "parent": "zc:AbstractResource",
   "en": "FigurativeSpeech",
   "def": "因物随变、自然流溢的无心之言。",
   "note": "庄子「三言」之一：卮言日出，和以天倪"
  },
  {
   "id": "zcon:Metaphor",
   "mod": "zcon",
   "cn": "譬喻",
   "parent": "zc:AbstractResource",
   "en": "Metaphor/Analogy",
   "def": "以彼物比此物的修辞—论证单元，如以水喻道、以舟喻君。"
  },
  {
   "id": "zcon:Debate",
   "mod": "zcon",
   "cn": "思想辩题",
   "parent": "zc:Event",
   "en": "PhilosophicalDebate",
   "def": "围绕某一哲学议题的多方论争，如义利之辨、天人之辨、坚白之辨、白马之辨、神灭不灭之争。"
  },
  {
   "id": "zcon:DebatePosition",
   "mod": "zcon",
   "cn": "辩方立场",
   "parent": "zcon:Claim",
   "en": "DebatePosition",
   "def": "某一方在辩题下所持的核心命题。"
  },
  {
   "id": "zcon:ConceptPath",
   "mod": "zcon",
   "cn": "概念推演链",
   "parent": "zc:AbstractResource",
   "en": "ConceptPath",
   "def": "由若干概念依逻辑次序构成的义理推演路径。"
  },
  {
   "id": "zcon:SemanticShift",
   "mod": "zcon",
   "cn": "语义转向",
   "parent": "zc:Event",
   "en": "SemanticShiftEvent",
   "def": "某概念在思想史上发生关键语义转变的事件（如「理」从纹理→二程天理）。"
  },
  {
   "id": "zsch:School",
   "mod": "zsch",
   "cn": "学派",
   "parent": "zc:Organization",
   "en": "School/Lineage",
   "def": "具有共同宗师、经典、义理主张的思想流派，如道家、儒家、墨家、法家、名家、阴阳家、稷下学派、玄学、理学、心学。",
   "align": "skos:Collection"
  },
  {
   "id": "zsch:Lineage",
   "mod": "zsch",
   "cn": "师承谱系",
   "parent": "zc:AbstractResource",
   "en": "Lineage",
   "def": "由师徒相承构成的思想传承链条。"
  },
  {
   "id": "zsch:Influence",
   "mod": "zsch",
   "cn": "思想影响",
   "parent": "zc:Relation",
   "en": "InfluenceRelation",
   "def": "A 对 B 思想上的影响关系，分直接/间接、正面/负面。",
   "align": "prov:Influence"
  },
  {
   "id": "zsch:SchoolEvent",
   "mod": "zsch",
   "cn": "学派事件",
   "parent": "zc:Event",
   "en": "SchoolEvent",
   "def": "与学派发展相关的事件。"
  },
  {
   "id": "zsch:SchoolFounding",
   "mod": "zsch",
   "cn": "立宗开派",
   "parent": "zsch:SchoolEvent",
   "en": "SchoolFounding",
   "def": "某一学派正式创立的事件。"
  },
  {
   "id": "zsch:SchoolSplit",
   "mod": "zsch",
   "cn": "学派分化",
   "parent": "zsch:SchoolEvent",
   "en": "SchoolSplit",
   "def": "学派内部分裂，如儒分为八、墨离为三、朱陆异同后分化。"
  },
  {
   "id": "zsch:SchoolMerge",
   "mod": "zsch",
   "cn": "学派合流",
   "parent": "zsch:SchoolEvent",
   "en": "SchoolMerge",
   "def": "不同学派合流，如黄老合流、儒释道三教合流、玄学会通孔老。"
  },
  {
   "id": "zsch:DoctrinalDebate",
   "mod": "zsch",
   "cn": "教义辩难",
   "parent": "zsch:SchoolEvent",
   "en": "DoctrinalDebate",
   "def": "学派间或学派内部的教义辩论事件，如鹅湖之会、盐铁会议、神灭神不灭之争。"
  },
  {
   "id": "zhev:IntellectualEvent",
   "mod": "zhev",
   "cn": "学术史事件",
   "parent": "zc:Event",
   "en": "IntellectualEvent",
   "def": "影响学术思想发展的历史事件抽象父类。"
  },
  {
   "id": "zhev:AuthorshipEvent",
   "mod": "zhev",
   "cn": "著述事件",
   "parent": "zhev:IntellectualEvent",
   "en": "AuthorshipEvent",
   "def": "著书、述、编、辑、注、删定、奏进等著作活动。",
   "align": "prov:Activity"
  },
  {
   "id": "zhev:CompositionContext",
   "mod": "zhev",
   "cn": "著述情境",
   "parent": "zc:Thing",
   "en": "CompositionContext",
   "def": "著作产生的具体语境：囚羑里演易、厄陈蔡作春秋、游说不行退而著书、诏狱狱中著书、侍讲经筵。"
  },
  {
   "id": "zhev:PatronageEvent",
   "mod": "zhev",
   "cn": "赞助事件",
   "parent": "zhev:IntellectualEvent",
   "en": "PatronageEvent",
   "def": "权贵/诸侯/帝王招致门客、资助著述的事件，如吕不韦门客著《吕氏春秋》、刘安《淮南子》、梁孝王菟园。"
  },
  {
   "id": "zhev:BanningEvent",
   "mod": "zhev",
   "cn": "禁毁事件",
   "parent": "zhev:IntellectualEvent",
   "en": "BanningEvent",
   "def": "某书遭禁毁之事件，如秦焚书、历代文字狱牵连之书。"
  },
  {
   "id": "zhev:CanonizationEvent",
   "mod": "zhev",
   "cn": "升格入经",
   "parent": "zhev:IntellectualEvent",
   "en": "CanonizationEvent",
   "def": "某书从子部升格为经、或被纳入官方经典体系，如《孟子》升经、《大学》《中庸》独立入四书。"
  },
  {
   "id": "zhev:TransmissionEvent",
   "mod": "zhev",
   "cn": "传播事件",
   "parent": "zhev:IntellectualEvent",
   "en": "TransmissionEvent",
   "def": "文献的流布、域外传播、出土与整理事件。"
  },
  {
   "id": "zhev:RecensionEvent",
   "mod": "zhev",
   "cn": "编纂校勘",
   "parent": "zhev:IntellectualEvent",
   "en": "RecensionEvent",
   "def": "官方或私人对典籍的大规模编纂、校勘、辑佚事件，如刘向校书、《永乐大典》《四库全书》。"
  },
  {
   "id": "zhev:OfficialPosition",
   "mod": "zhev",
   "cn": "官职",
   "parent": "zc:Thing",
   "en": "OfficialPosition",
   "def": "某官职，可关联任职人物与时间段，对齐 CBDB 官职表。"
  },
  {
   "id": "zhev:Tenure",
   "mod": "zhev",
   "cn": "任职",
   "parent": "zhev:IntellectualEvent",
   "en": "Tenure",
   "def": "某人物担任某官职的具体时间段。"
  },
  {
   "id": "zexe:ExegeticalWork",
   "mod": "zexe",
   "cn": "注疏文献",
   "parent": "zbib:Work",
   "en": "Commentary/Exegesis",
   "def": "对原典进行注释、疏证、集解的著作——传/注/笺/疏/正义/章句/集解/口义/校注/札记/考异之属。"
  },
  {
   "id": "zexe:Annotation",
   "mod": "zexe",
   "cn": "注释单元",
   "parent": "zc:AbstractResource",
   "en": "Annotation",
   "def": "单条注文——对某一段/句经文的具体解释。",
   "align": "oa:Annotation / bf:Annotation"
  },
  {
   "id": "zexe:GlossEntry",
   "mod": "zexe",
   "cn": "训诂词条",
   "parent": "zc:AbstractResource",
   "en": "GlossEntry",
   "def": "对一个字/词的训释条目，含本字、借字、训释文、出处。",
   "align": "ontolex:LexicalEntry"
  },
  {
   "id": "zexe:GlossMethod",
   "mod": "zexe",
   "cn": "训诂方法",
   "parent": "zc:Thing",
   "en": "GlossMethod",
   "def": "声训/形训/义训/通假破读。"
  },
  {
   "id": "zexe:CommentaryType",
   "mod": "zexe",
   "cn": "注疏类型",
   "parent": "zc:Thing",
   "en": "CommentaryType",
   "def": "传/注/笺/疏/章句/集解/口义/义疏/校注/札记/考异/音义。"
  },
  {
   "id": "zexe:ExegeticalPosition",
   "mod": "zexe",
   "cn": "注疏立场",
   "parent": "zc:Thing",
   "en": "ExegeticalPosition",
   "def": "注家在学术谱系上的立场——宗郑/攻郑/宗朱/攻朱/汉学/宋学。"
  },
  {
   "id": "zexe:PhoneticGloss",
   "mod": "zexe",
   "cn": "音训反切",
   "parent": "zexe:GlossEntry",
   "en": "PhoneticGloss",
   "def": "以同音字、近音字、反切注音之训。"
  },
  {
   "id": "zexe:GraphicGloss",
   "mod": "zexe",
   "cn": "字形训",
   "parent": "zexe:GlossEntry",
   "en": "GraphicGloss",
   "def": "据字形说义之训，如「止戈为武」「仁者二人」。"
  },
  {
   "id": "zexe:SemanticGloss",
   "mod": "zexe",
   "cn": "义训",
   "parent": "zexe:GlossEntry",
   "en": "SemanticGloss",
   "def": "直陈词义之训，不依音、形。"
  },
  {
   "id": "zexe:LoanCharacter",
   "mod": "zexe",
   "cn": "通假字",
   "parent": "zc:Thing",
   "en": "LoanCharacter",
   "def": "经文中某字为通假，破读为另一字。"
  },
  {
   "id": "zexe:ParallelEvidence",
   "mod": "zexe",
   "cn": "旁证",
   "parent": "zbib:Passage",
   "en": "ParallelEvidence",
   "def": "注疏中援引他书、他处作为训释之证据的文段。"
  }
 ],
 "objectProps": [
  {
   "id": "zc:label",
   "mod": "zcore",
   "cn": "名谓",
   "dom": "zc:Thing",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zc:altLabel",
   "mod": "zcore",
   "cn": "别名/异名",
   "dom": "zc:Thing",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zc:description",
   "mod": "zcore",
   "cn": "描述",
   "dom": "zc:Thing",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zc:note",
   "mod": "zcore",
   "cn": "备注",
   "dom": "zc:Thing",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zc:sameAs",
   "mod": "zcore",
   "cn": "外部同指",
   "dom": "zc:Thing",
   "ran": "owl:Thing",
   "note": "对齐 Wikidata/CTEXT/CBDB 等外部 URI",
   "inv": "owl:sameAs"
  },
  {
   "id": "zbib:hasPart",
   "mod": "zbib",
   "cn": "包含部分",
   "dom": "zbib:Work",
   "ran": "zbib:PartWhole",
   "inv": "zbib:partOf"
  },
  {
   "id": "zbib:partOf",
   "mod": "zbib",
   "cn": "属于",
   "dom": "zbib:PartWhole",
   "ran": "zbib:Work",
   "inv": "zbib:hasPart"
  },
  {
   "id": "zbib:hasChapter",
   "mod": "zbib",
   "cn": "有篇章",
   "dom": "zbib:Work",
   "ran": "zbib:Chapter",
   "sub": "zbib:hasPart"
  },
  {
   "id": "zbib:hasJuan",
   "mod": "zbib",
   "cn": "有卷",
   "dom": "zbib:Work",
   "ran": "zbib:Juan",
   "sub": "zbib:hasPart"
  },
  {
   "id": "zbib:hasSection",
   "mod": "zbib",
   "cn": "有段落章",
   "dom": "zbib:Chapter",
   "ran": "zbib:Section",
   "sub": "zbib:hasPart"
  },
  {
   "id": "zbib:hasParagraph",
   "mod": "zbib",
   "cn": "有段落",
   "dom": "zbib:Section",
   "ran": "zbib:Paragraph",
   "sub": "zbib:hasPart"
  },
  {
   "id": "zbib:hasSentence",
   "mod": "zbib",
   "cn": "有句子",
   "dom": "zbib:Paragraph",
   "ran": "zbib:Sentence",
   "sub": "zbib:hasPart"
  },
  {
   "id": "zbib:nextChapter",
   "mod": "zbib",
   "cn": "下一篇",
   "dom": "zbib:Chapter",
   "ran": "zbib:Chapter"
  },
  {
   "id": "zbib:prevChapter",
   "mod": "zbib",
   "cn": "上一篇",
   "dom": "zbib:Chapter",
   "ran": "zbib:Chapter"
  },
  {
   "id": "zbib:realizedBy",
   "mod": "zbib",
   "cn": "被表达为",
   "dom": "zbib:Work",
   "ran": "zbib:Expression",
   "inv": "zbib:realizes",
   "note": "FRBR W→E"
  },
  {
   "id": "zbib:embodiedIn",
   "mod": "zbib",
   "cn": "被载于",
   "dom": "zbib:Expression",
   "ran": "zbib:Manifestation",
   "inv": "zbib:embodies",
   "note": "FRBR E→M"
  },
  {
   "id": "zbib:exemplifiedBy",
   "mod": "zbib",
   "cn": "有藏本",
   "dom": "zbib:Manifestation",
   "ran": "zbib:Item",
   "inv": "zbib:exemplifies",
   "note": "FRBR M→I"
  },
  {
   "id": "zbib:isVersionOf",
   "mod": "zbib",
   "cn": "为某书之版本",
   "dom": "zbib:Expression",
   "ran": "zbib:Work"
  },
  {
   "id": "zbib:derivedFrom",
   "mod": "zbib",
   "cn": "衍出于",
   "dom": "zbib:Work",
   "ran": "zbib:Work",
   "note": "注疏本衍自原典"
  },
  {
   "id": "zbib:authoredBy",
   "mod": "zbib",
   "cn": "作者",
   "dom": "zbib:Work",
   "ran": "zc:Person"
  },
  {
   "id": "zbib:compiledBy",
   "mod": "zbib",
   "cn": "编纂者",
   "dom": "zbib:Work",
   "ran": "zc:Person"
  },
  {
   "id": "zbib:annotatedBy",
   "mod": "zbib",
   "cn": "注者",
   "dom": "zexe:ExegeticalWork",
   "ran": "zc:Person"
  },
  {
   "id": "zbib:belongsToCategory",
   "mod": "zbib",
   "cn": "类目归属",
   "dom": "zbib:Work",
   "ran": "zbib:Category"
  },
  {
   "id": "zbib:recordedIn",
   "mod": "zbib",
   "cn": "著录于",
   "dom": "zbib:Work",
   "ran": "zbib:CatalogRecord"
  },
  {
   "id": "zbib:hasStatus",
   "mod": "zbib",
   "cn": "存佚状态",
   "dom": "zbib:Work",
   "ran": "zbib:TextualStatus"
  },
  {
   "id": "zbib:quotes",
   "mod": "zbib",
   "cn": "引用",
   "dom": "zbib:Work",
   "ran": "zbib:Quotation"
  },
  {
   "id": "zbib:quotedFrom",
   "mod": "zbib",
   "cn": "引自",
   "dom": "zbib:Quotation",
   "ran": "zbib:Passage"
  },
  {
   "id": "zbib:quotedIn",
   "mod": "zbib",
   "cn": "见于",
   "dom": "zbib:Passage",
   "ran": "zbib:Work",
   "inv": "zbib:quotes"
  },
  {
   "id": "zbib:anchorsTo",
   "mod": "zbib",
   "cn": "锚定至",
   "dom": "zbib:Quotation",
   "ran": "zbib:Sentence",
   "note": "句级精确定位锚点"
  },
  {
   "id": "zbib:hasVariant",
   "mod": "zbib",
   "cn": "有异文",
   "dom": "zbib:Passage",
   "ran": "zbib:TextualVariant"
  },
  {
   "id": "zbib:hasParallel",
   "mod": "zbib",
   "cn": "有平行文本",
   "dom": "zbib:Passage",
   "ran": "zbib:ParallelPassage"
  },
  {
   "id": "zbib:sourceOfIdiom",
   "mod": "zbib",
   "cn": "为典源",
   "dom": "zbib:Passage",
   "ran": "zbib:IdiomAllusion"
  },
  {
   "id": "zbib:text",
   "mod": "zbib",
   "cn": "原文",
   "dom": "zbib:Passage",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zbib:charStart",
   "mod": "zbib",
   "cn": "起始偏移",
   "dom": "zbib:Passage",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:charEnd",
   "mod": "zbib",
   "cn": "结束偏移",
   "dom": "zbib:Passage",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:charCount",
   "mod": "zbib",
   "cn": "字数",
   "dom": "zbib:Work",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:juanCount",
   "mod": "zbib",
   "cn": "卷数",
   "dom": "zbib:Work",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:pianCount",
   "mod": "zbib",
   "cn": "篇数",
   "dom": "zbib:Work",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:sourcePath",
   "mod": "zbib",
   "cn": "文件路径",
   "dom": "zbib:Work",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zbib:chapterIndex",
   "mod": "zbib",
   "cn": "篇序",
   "dom": "zbib:Chapter",
   "ran": "xsd:integer",
   "type": "data"
  },
  {
   "id": "zbib:title",
   "mod": "zbib",
   "cn": "题名",
   "dom": "zbib:Work",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zbib:era",
   "mod": "zbib",
   "cn": "成书时代",
   "dom": "zbib:Work",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zbib:issued",
   "mod": "zbib",
   "cn": "成书年",
   "dom": "zbib:Work",
   "ran": "xsd:gYear",
   "type": "data"
  },
  {
   "id": "zbib:editionType",
   "mod": "zbib",
   "cn": "版本类型",
   "dom": "zbib:Manifestation",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zbib:patron",
   "mod": "zbib",
   "cn": "刻书者",
   "dom": "zbib:Manifestation",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zcon:broader",
   "mod": "zcon",
   "cn": "上位概念",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept",
   "sub": "skos:broader"
  },
  {
   "id": "zcon:narrower",
   "mod": "zcon",
   "cn": "下位概念",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept",
   "sub": "skos:narrower",
   "inv": "zcon:broader"
  },
  {
   "id": "zcon:related",
   "mod": "zcon",
   "cn": "相关",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept",
   "sub": "skos:related"
  },
  {
   "id": "zcon:contrastsWith",
   "mod": "zcon",
   "cn": "对立于",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:analogousTo",
   "mod": "zcon",
   "cn": "类比于",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:synonymOf",
   "mod": "zcon",
   "cn": "同义",
   "dom": "zcon:Concept",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:hasPhase",
   "mod": "zcon",
   "cn": "有阶段义",
   "dom": "zcon:Concept",
   "ran": "zcon:ConceptPhase"
  },
  {
   "id": "zcon:phaseInWork",
   "mod": "zcon",
   "cn": "阶段出现于",
   "dom": "zcon:ConceptPhase",
   "ran": "zbib:Work"
  },
  {
   "id": "zcon:phaseBy",
   "mod": "zcon",
   "cn": "阶段立义者",
   "dom": "zcon:ConceptPhase",
   "ran": "zc:Person"
  },
  {
   "id": "zcon:undergoesShift",
   "mod": "zcon",
   "cn": "经历语义转向",
   "dom": "zcon:Concept",
   "ran": "zcon:SemanticShift"
  },
  {
   "id": "zcon:asserts",
   "mod": "zcon",
   "cn": "主张",
   "dom": "zc:Person",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:statesClaim",
   "mod": "zcon",
   "cn": "提出命题",
   "dom": "zbib:Passage",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:supports",
   "mod": "zcon",
   "cn": "支持",
   "dom": "zcon:Argument",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:refutes",
   "mod": "zcon",
   "cn": "反驳",
   "dom": "zcon:Argument",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:concedes",
   "mod": "zcon",
   "cn": "让步承认",
   "dom": "zcon:Argument",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:distinguishes",
   "mod": "zcon",
   "cn": "辨析",
   "dom": "zcon:Argument",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:hasPremise",
   "mod": "zcon",
   "cn": "有前提",
   "dom": "zcon:Argument",
   "ran": "zcon:Premise"
  },
  {
   "id": "zcon:hasConclusion",
   "mod": "zcon",
   "cn": "有结论",
   "dom": "zcon:Argument",
   "ran": "zcon:Conclusion"
  },
  {
   "id": "zcon:usesScheme",
   "mod": "zcon",
   "cn": "使用论证法",
   "dom": "zcon:Argument",
   "ran": "zcon:ArgumentScheme"
  },
  {
   "id": "zcon:basedOnPassage",
   "mod": "zcon",
   "cn": "基于文段",
   "dom": "zcon:Argument",
   "ran": "zbib:Passage"
  },
  {
   "id": "zcon:usesMetaphor",
   "mod": "zcon",
   "cn": "用譬喻",
   "dom": "zcon:Argument",
   "ran": "zcon:Metaphor"
  },
  {
   "id": "zcon:usesFable",
   "mod": "zcon",
   "cn": "用寓言",
   "dom": "zcon:Argument",
   "ran": "zcon:Fable"
  },
  {
   "id": "zcon:embodiedInFable",
   "mod": "zcon",
   "cn": "义寄于寓言",
   "dom": "zcon:Claim",
   "ran": "zcon:Fable"
  },
  {
   "id": "zcon:citesWeighted",
   "mod": "zcon",
   "cn": "引重言",
   "dom": "zcon:Argument",
   "ran": "zcon:AncientSayings"
  },
  {
   "id": "zcon:targetIs",
   "mod": "zcon",
   "cn": "譬喻本体",
   "dom": "zcon:Metaphor",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:vehicleIs",
   "mod": "zcon",
   "cn": "譬喻喻体",
   "dom": "zcon:Metaphor",
   "ran": "zc:Thing"
  },
  {
   "id": "zcon:hasTurn",
   "mod": "zcon",
   "cn": "含话轮",
   "dom": "zcon:Dialogue",
   "ran": "zcon:DialogueTurn"
  },
  {
   "id": "zcon:speakerIs",
   "mod": "zcon",
   "cn": "发言者",
   "dom": "zcon:DialogueTurn",
   "ran": "zc:Person"
  },
  {
   "id": "zcon:addresseeIs",
   "mod": "zcon",
   "cn": "听话者",
   "dom": "zcon:DialogueTurn",
   "ran": "zc:Person"
  },
  {
   "id": "zcon:respondsTo",
   "mod": "zcon",
   "cn": "回应",
   "dom": "zcon:DialogueTurn",
   "ran": "zcon:DialogueTurn"
  },
  {
   "id": "zcon:containsDialogue",
   "mod": "zcon",
   "cn": "含对话",
   "dom": "zbib:Chapter",
   "ran": "zcon:Dialogue"
  },
  {
   "id": "zcon:turnText",
   "mod": "zcon",
   "cn": "话轮原文",
   "dom": "zcon:DialogueTurn",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zcon:turnType",
   "mod": "zcon",
   "cn": "话轮类型",
   "dom": "zcon:DialogueTurn",
   "ran": "xsd:string",
   "type": "data",
   "note": "问/答/难/应/辩/叹"
  },
  {
   "id": "zcon:hasPosition",
   "mod": "zcon",
   "cn": "有立场",
   "dom": "zcon:Debate",
   "ran": "zcon:DebatePosition"
  },
  {
   "id": "zcon:heldBy",
   "mod": "zcon",
   "cn": "持论者",
   "dom": "zcon:DebatePosition",
   "ran": "zc:Person"
  },
  {
   "id": "zcon:positionClaim",
   "mod": "zcon",
   "cn": "立场命题",
   "dom": "zcon:DebatePosition",
   "ran": "zcon:Claim"
  },
  {
   "id": "zcon:opposes",
   "mod": "zcon",
   "cn": "反对立场",
   "dom": "zcon:DebatePosition",
   "ran": "zcon:DebatePosition"
  },
  {
   "id": "zcon:pathStep",
   "mod": "zcon",
   "cn": "推演步骤",
   "dom": "zcon:ConceptPath",
   "ran": "zcon:Concept"
  },
  {
   "id": "zcon:pinyin",
   "mod": "zcon",
   "cn": "拼音",
   "dom": "zcon:Concept",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zcon:definition",
   "mod": "zcon",
   "cn": "定义",
   "dom": "zcon:Concept",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zsch:belongsTo",
   "mod": "zsch",
   "cn": "归属学派",
   "dom": "zc:Person",
   "ran": "zsch:School"
  },
  {
   "id": "zsch:founderOf",
   "mod": "zsch",
   "cn": "为开山",
   "dom": "zc:Person",
   "ran": "zsch:School"
  },
  {
   "id": "zsch:hasMember",
   "mod": "zsch",
   "cn": "含成员",
   "dom": "zsch:School",
   "ran": "zc:Person",
   "inv": "zsch:belongsTo"
  },
  {
   "id": "zsch:directDiscipleOf",
   "mod": "zsch",
   "cn": "亲炙于",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "note": "亲传弟子"
  },
  {
   "id": "zsch:spiritualHeirOf",
   "mod": "zsch",
   "cn": "遥承/私淑",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "note": "未亲炙而精神相承，如孟子私淑孔子"
  },
  {
   "id": "zsch:textualHeirOf",
   "mod": "zsch",
   "cn": "文本私淑",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "note": "仅因读其书而受其影响"
  },
  {
   "id": "zsch:criticalSuccessorOf",
   "mod": "zsch",
   "cn": "批判式继承",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "note": "如王夫之于程朱、戴震之于朱熹"
  },
  {
   "id": "zsch:rejectedLineageOf",
   "mod": "zsch",
   "cn": "转出师门",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "note": "如韩非、李斯学于荀卿而归于法家"
  },
  {
   "id": "zsch:influences",
   "mod": "zsch",
   "cn": "影响于",
   "dom": "zc:Person",
   "ran": "zc:Person",
   "inv": "zsch:influencedBy"
  },
  {
   "id": "zsch:influencedBy",
   "mod": "zsch",
   "cn": "受影响于",
   "dom": "zc:Person",
   "ran": "zc:Person"
  },
  {
   "id": "zsch:workInfluencedBy",
   "mod": "zsch",
   "cn": "著作受影响",
   "dom": "zbib:Work",
   "ran": "zbib:Work"
  },
  {
   "id": "zsch:foundedAt",
   "mod": "zsch",
   "cn": "立宗于",
   "dom": "zsch:SchoolFounding",
   "ran": "zc:Place"
  },
  {
   "id": "zsch:splitsInto",
   "mod": "zsch",
   "cn": "分化为",
   "dom": "zsch:School",
   "ran": "zsch:School"
  },
  {
   "id": "zsch:mergesFrom",
   "mod": "zsch",
   "cn": "合流自",
   "dom": "zsch:School",
   "ran": "zsch:School"
  },
  {
   "id": "zsch:debatesWith",
   "mod": "zsch",
   "cn": "辩难于",
   "dom": "zsch:School",
   "ran": "zsch:School"
  },
  {
   "id": "zc:zi",
   "mod": "zcore",
   "cn": "字",
   "dom": "zc:Person",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zc:hao",
   "mod": "zcore",
   "cn": "号",
   "dom": "zc:Person",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zc:dynasty",
   "mod": "zcore",
   "cn": "朝代",
   "dom": "zc:Person",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zc:birthYear",
   "mod": "zcore",
   "cn": "生年",
   "dom": "zc:Person",
   "ran": "xsd:gYear",
   "type": "data"
  },
  {
   "id": "zc:deathYear",
   "mod": "zcore",
   "cn": "卒年",
   "dom": "zc:Person",
   "ran": "xsd:gYear",
   "type": "data"
  },
  {
   "id": "zc:hometown",
   "mod": "zcore",
   "cn": "籍贯",
   "dom": "zc:Person",
   "ran": "xsd:string",
   "type": "data"
  },
  {
   "id": "zhev:participant",
   "mod": "zhev",
   "cn": "参与者",
   "dom": "zc:Event",
   "ran": "zc:Person"
  },
  {
   "id": "zhev:tookPlaceAt",
   "mod": "zhev",
   "cn": "发生地",
   "dom": "zc:Event",
   "ran": "zc:Place"
  },
  {
   "id": "zhev:tookPlaceDuring",
   "mod": "zhev",
   "cn": "发生于时",
   "dom": "zc:Event",
   "ran": "zc:TimeSpan"
  },
  {
   "id": "zhev:producedWork",
   "mod": "zhev",
   "cn": "产出作品",
   "dom": "zhev:AuthorshipEvent",
   "ran": "zbib:Work"
  },
  {
   "id": "zhev:composedInContext",
   "mod": "zhev",
   "cn": "著述情境",
   "dom": "zhev:AuthorshipEvent",
   "ran": "zhev:CompositionContext"
  },
  {
   "id": "zhev:patron",
   "mod": "zhev",
   "cn": "赞助者",
   "dom": "zhev:PatronageEvent",
   "ran": "zc:Person"
  },
  {
   "id": "zhev:bannedWork",
   "mod": "zhev",
   "cn": "所禁之书",
   "dom": "zhev:BanningEvent",
   "ran": "zbib:Work"
  },
  {
   "id": "zhev:canonizedWork",
   "mod": "zhev",
   "cn": "升格之书",
   "dom": "zhev:CanonizationEvent",
   "ran": "zbib:Work"
  },
  {
   "id": "zhev:canonizedInto",
   "mod": "zhev",
   "cn": "入何经典体系",
   "dom": "zhev:CanonizationEvent",
   "ran": "zbib:Category"
  },
  {
   "id": "zhev:transmits",
   "mod": "zhev",
   "cn": "传播之物",
   "dom": "zhev:TransmissionEvent",
   "ran": "zbib:Work"
  },
  {
   "id": "zhev:transmitsTo",
   "mod": "zhev",
   "cn": "传播至",
   "dom": "zhev:TransmissionEvent",
   "ran": "zc:Place"
  },
  {
   "id": "zhev:recensionOf",
   "mod": "zhev",
   "cn": "校理之书",
   "dom": "zhev:RecensionEvent",
   "ran": "zbib:Work"
  },
  {
   "id": "zhev:holdsPosition",
   "mod": "zhev",
   "cn": "任官职",
   "dom": "zc:Person",
   "ran": "zhev:OfficialPosition"
  },
  {
   "id": "zhev:tenureFrom",
   "mod": "zhev",
   "cn": "任职始于",
   "dom": "zhev:Tenure",
   "ran": "xsd:gYear",
   "type": "data"
  },
  {
   "id": "zhev:tenureTo",
   "mod": "zhev",
   "cn": "任职终于",
   "dom": "zhev:Tenure",
   "ran": "xsd:gYear",
   "type": "data"
  },
  {
   "id": "zexe:annotates",
   "mod": "zexe",
   "cn": "注释",
   "dom": "zexe:ExegeticalWork",
   "ran": "zbib:Work"
  },
  {
   "id": "zexe:annotatesPassage",
   "mod": "zexe",
   "cn": "注释文段",
   "dom": "zexe:Annotation",
   "ran": "zbib:Passage"
  },
  {
   "id": "zexe:annotationBody",
   "mod": "zexe",
   "cn": "注文",
   "dom": "zexe:Annotation",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zexe:usesMethod",
   "mod": "zexe",
   "cn": "用训诂法",
   "dom": "zexe:GlossEntry",
   "ran": "zexe:GlossMethod"
  },
  {
   "id": "zexe:glosses",
   "mod": "zexe",
   "cn": "训释字/词",
   "dom": "zexe:GlossEntry",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zexe:glossMeaning",
   "mod": "zexe",
   "cn": "训为",
   "dom": "zexe:GlossEntry",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zexe:glossFrom",
   "mod": "zexe",
   "cn": "训出",
   "dom": "zexe:GlossEntry",
   "ran": "zexe:Annotation"
  },
  {
   "id": "zexe:takesPosition",
   "mod": "zexe",
   "cn": "持立场",
   "dom": "zexe:Annotation",
   "ran": "zexe:ExegeticalPosition"
  },
  {
   "id": "zexe:followsExegesisOf",
   "mod": "zexe",
   "cn": "宗从",
   "dom": "zexe:ExegeticalWork",
   "ran": "zexe:Annotation"
  },
  {
   "id": "zexe:rejectsExegesisOf",
   "mod": "zexe",
   "cn": "驳难",
   "dom": "zexe:ExegeticalWork",
   "ran": "zexe:Annotation"
  },
  {
   "id": "zexe:commentarySubtype",
   "mod": "zexe",
   "cn": "注疏子类",
   "dom": "zexe:ExegeticalWork",
   "ran": "zexe:CommentaryType",
   "type": "data"
  },
  {
   "id": "zexe:citesEvidence",
   "mod": "zexe",
   "cn": "引证",
   "dom": "zexe:Annotation",
   "ran": "zexe:ParallelEvidence"
  },
  {
   "id": "zexe:loanFrom",
   "mod": "zexe",
   "cn": "通假自",
   "dom": "zexe:LoanCharacter",
   "ran": "rdfs:Literal",
   "type": "data"
  },
  {
   "id": "zexe:loanTo",
   "mod": "zexe",
   "cn": "破读为",
   "dom": "zexe:LoanCharacter",
   "ran": "rdfs:Literal",
   "type": "data"
  }
 ],
 "rules": [
  {
   "id": "R1",
   "cn": "师承传递",
   "if": "?a zsch:directDiscipleOf ?b . ?b zsch:directDiscipleOf ?c",
   "then": "?a zsch:textualHeirOf ?c"
  },
  {
   "id": "R2",
   "cn": "同派同师同辈",
   "if": "?a zsch:belongsTo ?s . ?b zsch:belongsTo ?s . ?a zsch:directDiscipleOf ?t . ?b zsch:directDiscipleOf ?t",
   "then": "?a zsch:schoolFellow ?b"
  },
  {
   "id": "R3",
   "cn": "注疏衍出",
   "if": "?c zexe:annotates ?w",
   "then": "?c zbib:derivedFrom ?w"
  },
  {
   "id": "R4",
   "cn": "概念演化链",
   "if": "?c zcon:hasPhase ?p1 . ?c zcon:hasPhase ?p2 . ?p1 zcon:phaseBy ?a . ?p2 zcon:phaseBy ?b . ?a zc:deathYear ?y1 . ?b zc:birthYear ?y2 . ?y1 < ?y2",
   "then": "?p1 zcon:phaseBefore ?p2"
  },
  {
   "id": "R5",
   "cn": "概念对立传递（非）",
   "note": "对立关系对称但不传递",
   "if": "?a zcon:contrastsWith ?b",
   "then": "?b zcon:contrastsWith ?a"
  },
  {
   "id": "R6",
   "cn": "辩论反方",
   "if": "?d zcon:hasPosition ?p1 . ?d zcon:hasPosition ?p2 . ?p1 zcon:opposes ?p2",
   "then": "?p2 zcon:opposes ?p1"
  },
  {
   "id": "R7",
   "cn": "篇章从属",
   "if": "?w zbib:hasChapter ?c",
   "then": "?c zbib:partOf ?w"
  },
  {
   "id": "R8",
   "cn": "引文锚点蕴含提及",
   "if": "?w zbib:quotes ?q . ?q zbib:quotedFrom ?p . ?p zbib:partOf ?w2",
   "then": "?w zsch:workInfluencedBy ?w2"
  },
  {
   "id": "R9",
   "cn": "论证反驳命题互斥",
   "if": "?a zcon:refutes ?c1 . ?b zcon:supports ?c1 . ?a zcon:basedOnPassage ?pa . ?pa zbib:partOf ?wa . ?b zcon:basedOnPassage ?pb . ?pb zbib:partOf ?wb",
   "then": "?wa zsch:workInDebateWith ?wb"
  },
  {
   "id": "R10",
   "cn": "寓言蕴含譬喻",
   "if": "?a zcon:usesFable ?f",
   "then": "?a zcon:usesScheme zc:FableArgument"
  },
  {
   "id": "R11",
   "cn": "FRBR 层级链",
   "if": "?w zbib:realizedBy ?e . ?e zbib:embodiedIn ?m . ?m zbib:exemplifiedBy ?i",
   "then": "?w zbib:hasItem ?i"
  },
  {
   "id": "R12",
   "cn": "作者即著述参与者",
   "if": "?w zbib:authoredBy ?p",
   "then": "?p zhev:participantIn ?authorship . ?authorship zhev:producedWork ?w"
  },
  {
   "id": "R13",
   "cn": "跨藏桥概念传播",
   "if": "?bc zc:appearsInCanon ?c1 . ?bc zc:appearsInCanon ?c2",
   "then": "?c1 zc:sharesConceptWith ?c2"
  },
  {
   "id": "R14",
   "cn": "语义转向触发",
   "if": "?c zcon:hasPhase ?p1 . ?c zcon:hasPhase ?p2 . ?p1 zcon:phaseBefore ?p2",
   "then": "?c zcon:undergoesShift ?shift . ?shift zhev:fromPhase ?p1 . ?shift zhev:toPhase ?p2"
  },
  {
   "id": "R15",
   "cn": "对话话轮归属",
   "if": "?d zcon:hasTurn ?t . ?t zcon:speakerIs ?s",
   "then": "?d zcon:participant ?s"
  },
  {
   "id": "R16",
   "cn": "亲炙弟子即学派成员",
   "if": "?s zsch:founderOf ?sch . ?p zsch:directDiscipleOf ?s",
   "then": "?p zsch:belongsTo ?sch"
  },
  {
   "id": "R17",
   "cn": "学派对立→辩题",
   "if": "?s1 zsch:debatesWith ?s2",
   "then": "?debate a zcon:Debate . ?debate zcon:betweenSchool ?s1 . ?debate zcon:betweenSchool ?s2"
  },
  {
   "id": "R18",
   "cn": "升格入经→类属转移",
   "if": "?ce zhev:canonizedWork ?w . ?ce zhev:canonizedInto ?cat",
   "then": "?w zbib:belongsToCategory ?cat"
  },
  {
   "id": "R19",
   "cn": "平行文本→互见",
   "if": "?p1 zbib:hasParallel ?p2 . ?p1 zbib:partOf ?w1 . ?p2 zbib:partOf ?w2",
   "then": "?w1 zbib:hasParallelWork ?w2"
  },
  {
   "id": "R20",
   "cn": "注疏立场",
   "if": "?ann zexe:followsExegesisOf ?e",
   "then": "?ann zexe:takesPosition zc:ZongXuePosition"
  },
  {
   "id": "R21",
   "cn": "寓言所寄命题",
   "if": "?a zcon:embodiedInFable ?f",
   "then": "?a zcon:basedOnPassage ?f"
  }
 ],
 "argumentSchemes": [
  {
   "id": "zheng",
   "cn": "正面立论",
   "desc": "正面陈述主张并铺陈理据。"
  },
  {
   "id": "pi",
   "cn": "譬喻",
   "desc": "以他物作比以明此理，如「水之积也不厚，则其负大舟也无力」。"
  },
  {
   "id": "yuyan",
   "cn": "寓言",
   "desc": "虚构人物、动物、故事以寄寓义理，「藉外论之」。"
  },
  {
   "id": "zhongyan",
   "cn": "重言",
   "desc": "借重长老、先圣、时贤之言以立信。"
  },
  {
   "id": "zhiyan",
   "cn": "卮言",
   "desc": "因物随变、自然流露的圆融之言。"
  },
  {
   "id": "duihua",
   "cn": "对话问答",
   "desc": "以问答往复推进义理，富于启发性。"
  },
  {
   "id": "liangnan",
   "cn": "两难",
   "desc": "设二难之境使对方进退失据，如《齐物论》「既使我与若辩矣……吾恶能知之？」。"
  },
  {
   "id": "guimiu",
   "cn": "归谬",
   "desc": "由对方前提推出矛盾或荒谬结论。"
  },
  {
   "id": "paiibi",
   "cn": "排比铺陈",
   "desc": "连类并举、排比申说以造势。"
  },
  {
   "id": "zhengyin",
   "cn": "征引",
   "desc": "援引古书、古语、史实为证。"
  },
  {
   "id": "leibi",
   "cn": "类比推理",
   "desc": "由他事之类同理而推此事。"
  },
  {
   "id": "fanzheng",
   "cn": "反证",
   "desc": "假设反面为真，推出矛盾以反证己说。"
  },
  {
   "id": "kaoju",
   "cn": "考据训诂",
   "desc": "以文字、音韵、训诂、版本考证立论。"
  },
  {
   "id": "fanbo",
   "cn": "反驳",
   "desc": "点名驳斥对方论点。"
  }
 ],
 "commentaryTypes": [
  {
   "id": "zhuan",
   "cn": "传",
   "desc": "依经立意、传述大义，如《易大传》《春秋公羊传》。"
  },
  {
   "id": "zhu",
   "cn": "注",
   "desc": "紧贴经文注释字词句，如王弼《老子注》。"
  },
  {
   "id": "jian",
   "cn": "笺",
   "desc": "既注经又申明、补充旧注，如郑玄《毛诗笺》。"
  },
  {
   "id": "shu",
   "cn": "疏/正义",
   "desc": "疏不破注，既解经又疏通注文，如《五经正义》。"
  },
  {
   "id": "zhangju",
   "cn": "章句",
   "desc": "逐章逐句串讲大义，如赵岐《孟子章句》、王逸《楚辞章句》。"
  },
  {
   "id": "jijie",
   "cn": "集解/集释",
   "desc": "汇集众家之长并下己意，如郭庆藩《庄子集释》、朱熹《四书章句集注》。"
  },
  {
   "id": "kouyi",
   "cn": "口义/讲义",
   "desc": "口语讲录之体，如林希逸《庄子口义》。"
  },
  {
   "id": "yishu",
   "cn": "义疏",
   "desc": "佛教、道教讲经之疏体，亦用于儒家。"
  },
  {
   "id": "jiaozhu",
   "cn": "校注",
   "desc": "校勘文字并加注释。"
  },
  {
   "id": "zhaji",
   "cn": "札记/读书笔记",
   "desc": "随笔札记式考辨，如王念孙《读书杂志》。"
  },
  {
   "id": "kaoyi",
   "cn": "考异",
   "desc": "罗列版本异文而考辨之。"
  },
  {
   "id": "yinyi",
   "cn": "音义",
   "desc": "注音兼释义，如陆德明《经典释文》。"
  }
 ],
 "glossMethods": [
  {
   "id": "shengxun",
   "cn": "声训",
   "desc": "以同音字/近音字释义，如「仁者人也」「义者宜也」「政者正也」。"
  },
  {
   "id": "xingxun",
   "cn": "形训",
   "desc": "据字形析义，如「止戈为武」「一贯三为王」。"
  },
  {
   "id": "yixun",
   "cn": "义训",
   "desc": "直陈词义，不依音形。"
  },
  {
   "id": "tongjia",
   "cn": "通假破读",
   "desc": "以本字破借字，如「说」破「悦」、「知」破「智」。"
  }
 ],
 "textualStatuses": [
  {
   "id": "extant",
   "cn": "现存"
  },
  {
   "id": "fragment",
   "cn": "辑佚"
  },
  {
   "id": "lost",
   "cn": "亡佚"
  },
  {
   "id": "recovered",
   "cn": "出土重现"
  }
 ]
};
