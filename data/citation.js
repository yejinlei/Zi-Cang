// 子藏 · 典籍引文關聯數據（CITATION_DATA）
// 關係類型：
//   quote      — 直接引用原文、引為立論根據
//   criticize  — 指名或明確批評
//   comment    — 為之注釋、章句、集解、義疏
//   inherit    — 思想承繼、發揮、發展
//   parallel   — 並稱對舉、互見、對讀
//
// 每條證據給出原文或學界定論，不憑空編造。

(function(){
  window.CITATION_DATA = {
    books: [
      // 儒家
      { id:'lunyu',    name:'論語',     school:'rujia',    era:'春秋',    weight:90 },
      { id:'mengzi',   name:'孟子',     school:'rujia',    era:'戰國',    weight:80 },
      { id:'xunzi',    name:'荀子',     school:'rujia',    era:'戰國',    weight:80 },
      { id:'daxue',    name:'大學',     school:'rujia',    era:'戰國',    weight:60 },
      { id:'zhongyong',name:'中庸',     school:'rujia',    era:'戰國',    weight:60 },
      { id:'xiaojing', name:'孝經',     school:'rujia',    era:'戰國',    weight:50 },
      { id:'chunqiu',  name:'春秋',     school:'rujia',    era:'春秋',    weight:80 },
      { id:'zuozhuan', name:'左傳',     school:'rujia',    era:'春秋',    weight:70 },
      // 道家
      { id:'daodejing',name:'道德經',   school:'daojia',   era:'春秋',    weight:95 },
      { id:'zhuangzi', name:'莊子',     school:'daojia',   era:'戰國',    weight:90 },
      { id:'liezi',    name:'列子',     school:'daojia',   era:'戰國',    weight:70 },
      { id:'wenzi',    name:'文子',     school:'daojia',   era:'戰國',    weight:60 },
      { id:'guanyinzi',name:'關尹子',   school:'daojia',   era:'戰國',    weight:50 },
      { id:'heguanzi', name:'鶡冠子',   school:'daojia',   era:'戰國',    weight:50 },
      { id:'huainanzi',name:'淮南子',   school:'zajia',    era:'西漢',    weight:75 },
      // 法家
      { id:'hanfeizi', name:'韓非子',   school:'fajia',    era:'戰國',    weight:85 },
      { id:'shangjunshu',name:'商君書', school:'fajia',    era:'戰國',    weight:75 },
      { id:'shenzi_fa',name:'慎子',     school:'fajia',    era:'戰國',    weight:55 },
      { id:'shenbuhaishu',name:'申子',  school:'fajia',    era:'戰國',    weight:50 },
      { id:'guanzi',   name:'管子',     school:'fajia',    era:'戰國',    weight:75 },
      // 墨家
      { id:'mozi',     name:'墨子',     school:'mojia',    era:'戰國',    weight:75 },
      // 名家
      { id:'gongsunlongzi',name:'公孫龍子',school:'mingjia',era:'戰國',  weight:60 },
      // 兵家
      { id:'sunzi',    name:'孫子兵法', school:'binfa',    era:'春秋',    weight:90 },
      { id:'wuzi',     name:'吳子',     school:'binfa',    era:'戰國',    weight:70 },
      { id:'sunbin',   name:'孫臏兵法', school:'binfa',    era:'戰國',    weight:65 },
      { id:'sima_fa',  name:'司馬法',   school:'binfa',    era:'春秋',    weight:60 },
      { id:'liutao',   name:'六韜',     school:'binfa',    era:'戰國',    weight:60 },
      { id:'weiliaoz', name:'尉繚子',   school:'binfa',    era:'戰國',    weight:55 },
      // 陰陽
      { id:'zouyanshu',name:'鄒子',     school:'yinyang',  era:'戰國',    weight:50 },
      // 縱橫
      { id:'guiguzi',  name:'鬼穀子',   school:'zongheng', era:'戰國',    weight:65 },
      { id:'zhanguoce',name:'戰國策',   school:'zongheng', era:'西漢',    weight:70 },
      // 雜家
      { id:'lvshichunqiu',name:'呂氏春秋',school:'zajia', era:'戰國',    weight:75 },
      // 醫
      { id:'huangdineijing',name:'黃帝內經',school:'yijia',era:'戰國',    weight:70 },
      // 漢代
      { id:'chunqiufanlu',name:'春秋繁露',school:'rujia', era:'西漢',    weight:65 },
      { id:'yanielun', name:'鹽鐵論',   school:'rujia',    era:'西漢',    weight:60 },
      { id:'lunheng',  name:'論衡',     school:'zajia',    era:'東漢',    weight:70 },
      { id:'shiji',    name:'史記',     school:'shixue',   era:'西漢',    weight:90 },
      { id:'zhushu',   name:'注疏彙編', school:'qita',     era:'歷代',    weight:0 }
    ],
    relations: [
      // ============== 論語 ==============
      { from:'mengzi', to:'lunyu', type:'inherit', label:'私淑諸人、承傳孔門',
        evidence:'《史記·孟子荀卿列傳》：「孟軻，鄒人也，受業子思之門人。道既通，游事齊宣王。」孟子自稱「乃所願，則學孔子也」（《公孫丑上》），全書數引孔子言行以立論。' },
      { from:'xunzi',  to:'lunyu', type:'inherit', label:'傳經之儒',
        evidence:'《荀子》書中〈宥坐〉〈子道〉〈法行〉等多引孔子語；韓愈謂「荀與孟，擇焉而不精，語焉而不詳」，實為戰國晚期傳經大宗。' },
      { from:'daxue',  to:'lunyu', type:'inherit', label:'曾子一系正心修身',
        evidence:'宋儒朱熹以《大學》為「孔氏之遺書，而初學入德之門」，與《論語》同列四書，義理上承「修己以安百姓」一脈。' },
      { from:'zhongyong',to:'lunyu', type:'inherit', label:'子思傳孔門心法',
        evidence:'《中庸》相傳為子思所作，首章「喜怒哀樂之未發謂之中」即子思述孔子之意，與《論語》「中庸之為德也」相表裏。' },
      { from:'xiaojing',to:'lunyu', type:'inherit', label:'孔子為曾子陳孝道',
        evidence:'《孝經》開篇「仲尼居，曾子侍」，託孔子與曾子問答之體，內容為《論語》「孝弟為仁之本」之展開。' },
      { from:'hanfeizi',to:'lunyu', type:'criticize', label:'儒分為八，取舍相反',
        evidence:'《韓非子·顯學》：「孔、墨之後，儒分為八，墨離為三，取舍相反不同，而皆自謂真孔、墨。」將孔子之後視為不可定真的分裂之儒。' },
      { from:'mozi',   to:'lunyu', type:'criticize', label:'非儒、節葬非樂',
        evidence:'《墨子·非儒》專篇批孔子及孔門禮樂、久喪之說，謂「孔某盛容修飾以蠱世，弦歌鼓舞以聚徒」。' },

      // ============== 孟子 ==============
      { from:'xunzi',  to:'mengzi', type:'criticize', label:'非十二子·性善之爭',
        evidence:'《荀子·非十二子》斥子思、孟軻「略法先王而不知其統，猶然而材劇志大，聞見雜博」；〈性惡〉篇專駁孟子性善說。' },
      { from:'chunqiufanlu',to:'mengzi', type:'comment', label:'天人感應承性善',
        evidence:'董仲舒《春秋繁露》陽尊陰卑、性三品之說，上承孟子「盡心知性知天」一脈，以陰陽災異框架拓展性善論。' },

      // ============== 荀子 ==============
      { from:'hanfeizi',to:'xunzi', type:'inherit', label:'韓非、李斯並出荀門',
        evidence:'《史記·老子韓非列傳》：「韓非者，韓之諸公子也，喜刑名法術之學，而其歸本於黃老。與李斯俱事荀卿。」《韓非子》中〈難三〉等引荀子之論。' },
      { from:'shangjunshu',to:'xunzi', type:'inherit', label:'性惡→耕戰',
        evidence:'學界通說：商鞅耕戰刑法之說，與荀子性惡論同為「化性起偽」「以禮法束人」一路，至韓非匯為法、術、勢。' },
      { from:'hanfeizi',to:'shangjunshu', type:'inherit', label:'集法家「法」派大成',
        evidence:'《韓非子·定法》：「公孫鞅之治秦也，設告相坐而責其實，連什伍而同其罪，賞厚而信，刑重而必。」正面繼承商鞅法治，亦指出其「無術以知奸」之弊。' },
      { from:'hanfeizi',to:'shenbuhaishu', type:'inherit', label:'集法家「術」派',
        evidence:'《韓非子·定法》：「申不害言術……術者，因任而授官，循名而責實，操殺生之柄，課群臣之能者也。」' },
      { from:'hanfeizi',to:'shenzi_fa', type:'inherit', label:'集法家「勢」派',
        evidence:'《韓非子·難勢》專篇援慎到之勢論：「賢智未足以服眾，而勢位足以屈賢者也」，轉而為「抱法處勢則治」。' },
      { from:'hanfeizi',to:'guanzi', type:'quote', label:'多引管仲治齊之術',
        evidence:'《韓非子》〈難三〉〈說林〉多引管仲相齊事跡作為法術治術先例，視《管子》為齊法家重典。' },

      // ============== 道德經 ==============
      { from:'zhuangzi',to:'daodejing', type:'inherit', label:'莊子發揚老子道德',
        evidence:'《莊子·天下》以老子為「古之博大真人」，內篇〈德充符〉〈大宗師〉處處引發老子「無為」「道法自然」之旨。' },
      { from:'liezi',   to:'daodejing', type:'inherit', label:'貴虛承老',
        evidence:'《漢書·藝文志》：「《列子》八篇，名禦寇，先莊子，莊子稱之。」其書多衍老子「虛」「無」之說。' },
      { from:'wenzi',   to:'daodejing', type:'comment', label:'文子為老子弟子（託）',
        evidence:'《文子》書中每章皆託「老子曰」，《漢志》以為「老子弟子，與孔子並時」，實為西漢解《老》之作。' },
      { from:'guanyinzi',to:'daodejing', type:'inherit', label:'關尹喜請老子著書',
        evidence:'《史記》載老子「至關，關令尹喜曰：『子將隱矣，強為我著書。』於是老子乃著書上下篇」，《關尹子》（今本多認為後出）託為尹喜所傳。' },
      { from:'heguanzi',to:'daodejing', type:'inherit', label:'楚人冠鶡、本於黃老',
        evidence:'《鶡冠子》「夜行」「天則」等篇以道家為本，兼采刑名兵法，韓愈謂其「博選」篇「稽其道，黃老也」。' },
      { from:'hanfeizi',to:'daodejing', type:'quote', label:'《解老》《喻老》專篇',
        evidence:'《韓非子》有〈解老〉〈喻老〉兩篇，為現存最早《老子》注解，以「理」「事理」「君道無為」釋老，開道法家合流。' },
      { from:'huainanzi',to:'daodejing', type:'comment', label:'西漢黃老集大成',
        evidence:'《淮南子》高誘序：「其旨近老子，淡泊無為，蹈虛守靜，出入經道。」全書二十餘篇皆以《老子》為宗。' },
      { from:'huangdineijing',to:'daodejing', type:'inherit', label:'醫道同源',
        evidence:'《素問·上古天真論》「恬淡虛無，真氣從之」即道家養生之旨；陰陽五行本體框架與老子「萬物負陰而抱陽」相通。' },
      { from:'zhuangzi',to:'lunyu', type:'criticize', label:'批孔或寓言化孔子',
        evidence:'《莊子》〈盜蹠〉〈漁父〉篇借盜蹠、漁父斥孔子「飾禮樂」「妄作孝弟」；內篇則多借孔子之口說道家義，乃「寓言十九」之法。' },
      { from:'zhuangzi',to:'huinanzi', type:'inherit', label:'淮南多采莊生',
        evidence:'《淮南子》〈原道〉〈俶真〉大段襲用《莊子》逍遙、齊物之語，高誘注亦明引莊語甚多。' },

      // ============== 墨家 & 名家 & 公孫龍 ==============
      { from:'zhuangzi',to:'mozi', type:'parallel', label:'天下篇並列墨翟',
        evidence:'《莊子·天下》評「不侈於後世，不靡於萬物，不暉於數度……墨子真天下之好也」，將墨家列為首要學派。' },
      { from:'hanfeizi',to:'mozi', type:'criticize', label:'儒墨俱為「顯學」而爭',
        evidence:'《韓非子·顯學》：「世之顯學，儒、墨也；儒之所至，孔丘也；墨之所至，墨翟也。」以儒墨同為「無參驗而必之者，愚誣」之學。' },
      { from:'xunzi',   to:'mozi', type:'criticize', label:'非十二子·蔽於用而不知文',
        evidence:'《荀子·解蔽》：「墨子蔽於用而不知文」；〈非十二子〉斥「上功用、大儉約而僈差等」之墨學。' },
      { from:'mengzi',  to:'mozi', type:'criticize', label:'距楊墨、放淫辭',
        evidence:'《孟子·滕文公下》：「楊氏為我，是無君也；墨氏兼愛，是無父也。無父無君，是禽獸也。」為先秦闢墨最烈者。' },
      { from:'xunzi',   to:'gongsunlongzi', type:'criticize', label:'非十二子·名家之蔽',
        evidence:'《荀子·正名》專篇駁「山淵平」「白馬非馬」等辯者之說，謂「惠子蔽於辭而不知實」。' },
      { from:'zhuangzi',to:'gongsunlongzi', type:'parallel', label:'公孫龍問道於魏牟',
        evidence:'《莊子·秋水》載公孫龍問於魏牟，自謂「困百家之知，窮眾口之辯」，及聞莊子之言則「口呿而不合，舌舉而不下」。' },

      // ============== 兵家 ==============
      { from:'sunbin',  to:'sunzi', type:'comment', label:'孫臏為孫武後世，續兵法',
        evidence:'《史記·孫子吳起列傳》：「孫武既死，後百餘歲有孫臏。臏亦孫武之後世子孫也。」銀雀山漢墓同時出土《孫子兵法》與《孫臏兵法》，可證兩書相承。' },
      { from:'wuzi',    to:'sunzi', type:'parallel', label:'孫吳並稱',
        evidence:'《漢書·藝文志》以「孫吳」並稱，《韓非子·五蠹》「藏孫、吳之書者家有之」，後世言兵必宗孫吳。' },
      { from:'weiliaoz',to:'sunzi', type:'inherit', label:'尉繚承孫武形勢',
        evidence:'《尉繚子》「天官」篇即與《孫子·計篇》「道天地將法」相表裏，重人事不重天時，直承孫武思想。' },
      { from:'sima_fa', to:'sunzi', type:'quote', label:'古司馬法與孫子互訓',
        evidence:'《史記·司馬穰苴列傳》：「齊威王使大夫追論古者司馬兵法，而附穰苴於其中，因號曰《司馬穰苴兵法》。」《孫子》多處與其古軍禮互見。' },
      { from:'liutao',  to:'sunzi', type:'inherit', label:'託太公、實兵家彙編',
        evidence:'《六韜》論將、論兵與《孫子·計篇》互為表裏，學者以為戰國晚期兵家彙編、多本孫子。' },
      { from:'hanfeizi',to:'sunzi', type:'quote', label:'論兵時引孫子',
        evidence:'《韓非子·難二》等篇數引孫武「兵者，詭道也」之精神，以證「戰陣之間，不厭詐偽」。' },

      // ============== 鬼穀子 / 縱橫 ==============
      { from:'zhanguoce',to:'guiguzi', type:'inherit', label:'蘇張縱橫出鬼穀',
        evidence:'《史記》載蘇秦、張儀俱事鬼谷先生；《戰國策》所載縱橫游說辭令，即縱橫家之實錄，與《鬼穀子》揣摩、捭闔之術相應。' },
      { from:'hanfeizi',to:'guiguzi', type:'criticize', label:'五蠹斥縱橫',
        evidence:'《韓非子·五蠹》：「言從（縱）者曰『從成必霸』，言橫者曰『橫成必王』……皆非所以持國也。」以縱橫為蠹。' },

      // ============== 陰陽鄒衍 ==============
      { from:'chunqiufanlu',to:'zouyanshu', type:'inherit', label:'董仲舒承鄒衍五德終始',
        evidence:'《漢書·五行志》：「董仲舒治《公羊春秋》，始推陰陽，為儒者宗。」其四時、五行、天人感應之說承鄒衍五德終始而儒學化。' },
      { from:'lvshichunqiu',to:'zouyanshu', type:'quote', label:'十二月紀承陰陽時令',
        evidence:'《呂氏春秋》「十二紀」記時令、五行、王官之政，學界公認為鄒衍陰陽家時令說之系統化。' },
      { from:'huainanzi',to:'zouyanshu', type:'inherit', label:'天文地形承鄒衍大九州',
        evidence:'《淮南子》〈天文〉〈地形〉篇論天地陰陽、四時方位、海外九州，直接繼承鄒衍「大九州」與陰陽五行宇宙圖式。' },

      // ============== 呂氏春秋 / 淮南 / 雜家 ==============
      { from:'lvshichunqiu',to:'daodejing', type:'quote', label:'以道家為本、兼采眾家',
        evidence:'《呂氏春秋·不二》篇總論老聃、孔子、墨翟、關尹、列子、陳駢、陽生、孫臏、王廖、兒良十人，體例為雜家「兼儒墨、合名法」。' },
      { from:'huainanzi',to:'zhuangzi', type:'quote', label:'多引莊文',
        evidence:'《淮南子》〈俶真訓〉襲《莊子·齊物論》、〈人間訓〉用「塞翁失馬」式莊周齊物辯證，文字蹈襲甚多。' },
      { from:'shiji',   to:'lvshichunqiu', type:'quote', label:'史記多采呂覽',
        evidence:'《史記》多處徵引《呂氏春秋》事蹟（如荊軻、呂不韋本傳），為戰國史料之重要來源。' },
      { from:'shiji',   to:'zhanguoce', type:'quote', label:'戰國縱橫家史料所本',
        evidence:'《史記》戰國部分許多策士言辭、縱橫事蹟直錄《戰國策》（劉向後定名），史料同源。' },

      // ============== 論衡（王充） ==============
      { from:'lunheng', to:'hanfeizi', type:'inherit', label:'實證與疾虛妄',
        evidence:'王充《論衡》自謂「疾虛妄」，其驗證知識、反災異、薄葬之論，學者以為上承韓非參驗之說，而下開漢代實證傳統。' },
      { from:'lunheng', to:'daodejing', type:'quote', label:'自然之說承老',
        evidence:'《論衡·自然》：「天道自然，非為人也」，明引道家「自然無為」以斥漢儒天人感應。' },
      { from:'lunheng', to:'chunqiufanlu', type:'criticize', label:'駁天人感應、災異',
        evidence:'《論衡》〈變虛〉〈異虛〉〈譴告〉等篇專駁董仲舒以來陰陽災異之說，謂「人不能以行感天，天亦不隨行而應人」。' },

      // ============== 鹽鐵論 ==============
      { from:'yanielun',to:'xunzi', type:'quote', label:'文學賢良引荀孟',
        evidence:'《鹽鐵論》中賢良文學一方引《論語》《孟子》《荀子》之仁義與輕徭薄賦，對峙桑弘羊法家之鹽鐵官營與耕戰。' },
      { from:'yanielun',to:'hanfeizi', type:'criticize', label:'文學斥商鞅、吳起',
        evidence:'《鹽鐵論·非鞅》：「商鞅以重刑峭法為秦國基，故二世而奪。」文學一方嚴斥商鞅、韓非法術之學。' },

      // ============== 史記 ==============
      { from:'shiji',   to:'lunyu', type:'quote', label:'孔子世家、仲尼弟子列傳',
        evidence:'《史記·孔子世家》以孔子為「世家」，並據《論語》《左傳》成最系統的孔子傳記；仲尼弟子列傳為門人譜系所本。' },
      { from:'shiji',   to:'daodejing', type:'quote', label:'老子韓非合傳',
        evidence:'《史記》以老子、莊子、申不害、韓非同傳，明謂韓非「其歸本於黃老」，為道法合流定調。' },
      { from:'shiji',   to:'sunzi', type:'quote', label:'孫子吳起列傳',
        evidence:'《孫子吳起列傳》完整記孫武吳宮教戰、孫臏馬陵道等事，為後世研究孫子之首要史料。' },

      // ============== 春秋 / 左傳 / 繁露 ==============
      { from:'zuozhuan',to:'chunqiu', type:'comment', label:'春秋三傳之一',
        evidence:'《左傳》相傳左丘明為《春秋》作傳，以史事解經，與《公羊》《穀梁》並列三傳。' },
      { from:'chunqiufanlu',to:'chunqiu', type:'comment', label:'公羊學大師',
        evidence:'《春秋繁露》為董仲舒闡《公羊春秋》之作，其「張三世」「通三統」「天人三策」均本《公羊》。' },

      // ============== 管子 ==============
      { from:'guanzi',  to:'daodejing', type:'inherit', label:'道法轉關',
        evidence:'《管子》〈心術上〉〈內業〉有「虛其欲，神將入舍」之語，與老子「致虛極守靜篤」相通，為道法轉關之作。' },

      // ============== 黃帝內經 ==============
      { from:'huangdineijing',to:'yinyangwuxing', type:'inherit', label:'援陰陽五行入醫',
        evidence:'《素問·陰陽應象大論》以陰陽為「天地之道」、五行配五臟，為陰陽家思想系統性地進入醫學之始。', fromFmt:'toNode' },

      // ============== 託名與偽書 / 平行對讀 ==============
      { from:'xunzi',   to:'mengzi', type:'parallel', label:'孟荀對峙，性善/性惡',
        evidence:'孟主性善、荀主性惡；孟稱先王、荀法後王，為先秦儒家內部最根本的義理分途。' },
      { from:'mengzi',  to:'guanzi', type:'criticize', label:'斥霸術',
        evidence:'《孟子·公孫丑上》：「以力假仁者霸，霸必有大國；以德行仁者王，王不待大」，明斥管仲霸術。' },
      { from:'zhuangzi',to:'huainanzi', type:'parallel', label:'老莊與淮南並稱道家',
        evidence:'後世以「老、莊、淮南」並列為西漢以前道家三大系統文本，《漢志》皆列道家。' },
      { from:'lvshichunqiu',to:'xunzi', type:'quote', label:'多引荀卿',
        evidence:'《呂氏春秋》中〈勸學〉〈尊師〉等篇直接化用《荀子·勸學》文句，為荀學西傳之重要環節。' },

      // ============== 注疏 / 集解 ==============
      { from:'zhushu',  to:'lunyu', type:'comment', label:'何晏《集解》、朱熹《集注》、劉寶楠《正義》',
        evidence:'自魏何晏《論語集解》、梁皇侃《義疏》、宋朱熹《論語集注》、清劉寶楠《論語正義》，為《論語》歷代最重要注本。' },
      { from:'zhushu',  to:'mengzi', type:'comment', label:'趙岐注、朱熹集注、焦循正義',
        evidence:'東漢趙岐《孟子章句》為現存最早注，宋朱熹《孟子集注》列四書，清焦循《孟子正義》集清代樸學之成。' },
      { from:'zhushu',  to:'daodejing', type:'comment', label:'王弼注、河上公注',
        evidence:'魏王弼《老子注》、舊題漢河上公《老子道德經章句》為《老子》兩大傳本系統，唐有成玄英疏，清有王先謙集解。' },
      { from:'zhushu',  to:'zhuangzi', type:'comment', label:'郭象注、成玄英疏',
        evidence:'西晉郭象《莊子注》為現存最早完整注本，唐成玄英《南華真經疏》為道教重玄學派代表作，清王先謙《莊子集解》最通行。' },
      { from:'zhushu',  to:'hanfeizi', type:'comment', label:'王先慎《集解》',
        evidence:'清王先慎《韓非子集解》集顧廣圻、盧文弨、王念孫諸家校注，為近世通行本。' },
      { from:'zhushu',  to:'sunzi', type:'comment', label:'曹操、杜牧等十一家注',
        evidence:'宋《十一家注孫子》輯魏武帝曹操、梁孟氏、唐李筌、杜牧、陳皞、賈林、宋梅堯臣、王皙、何延錫、張預等十一家注，最通行。' },
      { from:'zhushu',  to:'mozi',   type:'comment', label:'孫詒讓《墨子閒詁》',
        evidence:'清孫詒讓《墨子閒詁》（1893）為清代墨學復興的里程碑，畢沅、王念孫、俞樾之說薈萃一編。' },
      { from:'zhushu',  to:'chuci', type:'comment', label:'王逸章句、洪興祖補注',
        evidence:'東漢王逸《楚辭章句》、南宋洪興祖《楚辭補注》為《楚辭》最重要注本系統。', toFmt:'skip' },

      // ============== 醫家與道家 ==============
      { from:'huangdineijing',to:'daodejing', type:'inherit', label:'醫道同根',
        evidence:'《內經》養生論「法於陰陽，和於術數，食飲有節，起居有常」直承老子「人法地、地法天、天法道、道法自然」一脈。' }
    ]
  };

  // 清理：fromFmt/toFmt 控制跳過虛擬節點
  window.CITATION_DATA.relations = window.CITATION_DATA.relations.filter(function(r){
    return !r.fromFmt || r.fromFmt!=='toNode';
  });
  // 去除 toFmt skip 的行（如楚辭未入 books 則去掉）
  var bookIds={};
  window.CITATION_DATA.books.forEach(function(b){bookIds[b.id]=true;});
  window.CITATION_DATA.relations = window.CITATION_DATA.relations.filter(function(r){
    return bookIds[r.from] && bookIds[r.to];
  });
})();
