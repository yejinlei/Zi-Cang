// 论语深度标引数据 v22（学而/为政/八佾/里仁/述而/颜渊/子路/卫灵公/季氏九篇核心章句）
(function(){
const fs = (typeof require !== 'undefined') ? require('fs') : null;
const bookId = 'lunyu';
const bookPath = '诸子/论语.txt';
let text = '';
if (fs) text = fs.readFileSync('texts/'+bookPath, 'utf-8');

function parseChTitle(s){
  const map={'学而第一':1,'为政第二':2,'八佾第三':3,'里仁第四':4,'述而第七':7,'颜渊第十二':12,'子路第十三':13,'卫灵公第十五':15,'季氏第十六':16};
  return map[s]||0;
}

const chapters = [];
const titles = ['学而第一','为政第二','八佾第三','里仁第四','述而第七','颜渊第十二','子路第十三','卫灵公第十五','季氏第十六'];
const chSummary = {
  '学而第一':'论学、孝弟、仁本、忠信；"学而时习之""吾日三省""和为贵"。',
  '为政第二':'论为政以德；三十而立；温故知新；君子不器；因材施教；民信为本。',
  '八佾第三':'论礼、乐；"是可忍孰不可忍""人而不仁如礼何""尽美尽善"。',
  '里仁第四':'论仁与君子；"朝闻道夕死可矣""君子喻于义""忠恕一贯""见贤思齐"。',
  '述而第七':'孔子自述：述而不作、学而不厌诲人不倦、不愤不启、三人行必有我师。',
  '颜渊第十二':'颜渊问仁（克己复礼）、仲弓问仁（己所不欲勿施于人）、子贡问政（民信）、君君臣臣。',
  '子路第十三':'子路问政、正名论、"欲速则不达""父为子隐""和而不同"。',
  '卫灵公第十五':'在陈绝粮、杀身成仁、恕道（己所不欲勿施于人）、人能弘道、有教无类。',
  '季氏第十六':'季氏伐颛臾；不患寡患不均；三友三乐三戒三畏九思；过庭之训。'
};
for (let i=0;i<titles.length;i++){
  const t = titles[i];
  const pos = text.indexOf(t);
  let bs = pos+t.length; while (bs<text.length && /[\s\n\r]/.test(text[bs])) bs++;
  const next = i+1<titles.length ? text.indexOf(titles[i+1]) : text.length;
  const body = text.slice(bs,next).trim();
  chapters.push({ch:parseChTitle(t), title:t, start:bs, length:body.length, summary:chSummary[t]});
}

// 命题
const propositions = [
  {id:'p_xuexi',ch:1,type:'正论',anchor:'学而时习之，不亦说乎？有朋自远方来，不亦乐乎',text:'学而时习之不亦乐乎',meaning:'学然后时时温习实践是悦；有同道从远方来是乐；人不了解自己也不愠怒才是君子。',keywords:['学','乐','君子']},
  {id:'p_xiaoti',ch:1,type:'正论',anchor:'君子务本，本立而道生。孝弟也者，其为仁之本与',text:'孝弟为仁之本',meaning:'君子致力于根本，本立道自然生；孝父母、敬兄长是"仁"的根本。',keywords:['孝弟','仁本','务本']},
  {id:'p_qiaoyan',ch:1,type:'正论',anchor:'巧言令色，鲜矣仁',text:'巧言令色鲜矣仁',meaning:'花言巧语、伪装和善的人很少有仁德。',keywords:['巧言','仁']},
  {id:'p_sanshen',ch:1,type:'正论',anchor:'吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎',text:'吾日三省吾身',meaning:'每日三次自我反省：为人办事是否尽忠？与朋友交往是否守信？老师所传是否温习？',keywords:['反省','忠','信']},
  {id:'p_jieyong',ch:1,type:'正论',anchor:'道千乘之国，敬事而信，节用而爱人，使民以时',text:'敬事信节用爱人使民以时',meaning:'治理大国：敬慎其事、取信于民、节俭用度、爱护人民、役使百姓不违农时。',keywords:['治国','节用','使民以时']},
  {id:'p_heweigui',ch:1,type:'正论',anchor:'礼之用，和为贵',text:'礼之用和为贵以礼节之',meaning:'礼的作用以和谐为贵，但为和而和、不用礼来节制就行不通；和须以礼为本。',keywords:['礼','和','节制']},
  {id:'p_xinyuyi',ch:1,type:'正论',anchor:'信近于义，言可复也；恭近于礼，远耻辱也',text:'信近于义恭近于礼',meaning:'守信合于义则诺言可兑现；恭敬合于礼则远离耻辱。',keywords:['信','义','礼']},
  {id:'p_haoxue',ch:1,type:'正论',anchor:'君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉，可谓好学也已',text:'君子食无求饱敏事慎言就道',meaning:'君子不追求饱食安居，做事敏捷说话谨慎，亲近有道之人以匡正自己，才算好学。',keywords:['好学','安贫']},
  {id:'p_pinlejiao',ch:1,type:'对话问答',anchor:'未若贫而乐，富而好礼者也',text:'贫而乐富而好礼',meaning:'子贡问"贫而无谄富而无骄"何如？孔子说可，但不如"贫而乐道、富而好礼"——境界更高。如切如磋如琢如磨。',keywords:['乐道','好礼']},
  {id:'p_weizhengyi',ch:2,type:'譬喻',anchor:'为政以德，譬如北辰，居其所而众星共之',text:'为政以德譬如北辰',meaning:'用道德来治理国政，就像北极星安居其位、众星环绕——无为而治。',keywords:['德治','无为','北辰']},
  {id:'p_daode_li',ch:2,type:'正论',anchor:'道之以德，齐之以礼，有耻且格',text:'道德齐礼有耻且格',meaning:'用政令刑罚导民，民免罪却无耻；用道德礼义导民，民有羞耻心且归服。',keywords:['德治','礼治','羞耻']},
  {id:'p_wushi',ch:2,type:'正论',anchor:'吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩',text:'三十而立七十从心',meaning:'孔子自述修学阶段：十五志学、三十立身处世、四十不迷惑、五十知天命、六十听逆耳之言而不逆、七十随心所欲不越规矩。',keywords:['为学次第','而立','不惑','知天命','耳顺','从心所欲']},
  {id:'p_wengu',ch:2,type:'正论',anchor:'温故而知新，可以为师矣',text:'温故知新可以为师',meaning:'温习旧知能悟新知，可以为人师。',keywords:['温故知新']},
  {id:'p_buqi',ch:2,type:'正论',anchor:'君子不器',text:'君子不器',meaning:'君子不应像器皿一样只有单一用途；要成为通才，具备多方面素养。',keywords:['器','通才']},
  {id:'p_zhoubi',ch:2,type:'正论',anchor:'君子周而不比，小人比而不周',text:'君子周而不比',meaning:'君子团结众人而不结党营私；小人结党营私而不能团结。',keywords:['周','比','团结']},
  {id:'p_xuersi',ch:2,type:'正论',anchor:'学而不思则罔，思而不学则殆',text:'学而不思则罔思而不学则殆',meaning:'只学习不思考会迷惘无所得；只思考不学习会危殆不安。学思结合。',keywords:['学思结合']},
  {id:'p_zhizhi',ch:2,type:'正论',anchor:'知之为知之，不知为不知，是知也',text:'知之为知之不知为不知',meaning:'知道就是知道、不知道就是不知道，这才是真正的"知"。',keywords:['诚实','知']},
  {id:'p_juzhi',ch:2,type:'正论',anchor:'举直错诸枉，则民服；举枉错诸直，则民不服',text:'举直错诸枉民服',meaning:'提拔正直之人放在邪曲之人之上，百姓服从；反之不服。',keywords:['举贤','直']},
  {id:'p_wuxin',ch:2,type:'正论',anchor:'人而无信，不知其可也。大车无輗，小车无軏，其何以行之哉',text:'人而无信不知其可',meaning:'人无诚信就像车无辕销无法行走；信是人立身处世的关键。',keywords:['信']},
  {id:'p_buerenli',ch:3,type:'正论',anchor:'人而不仁，如礼何？人而不仁，如乐何',text:'人而不仁如礼何如乐何',meaning:'人若没有仁德，礼与乐对他有什么用？仁是礼之本。',keywords:['仁','礼乐']},
  {id:'p_liben',ch:3,type:'对话问答',anchor:'礼，与其奢也，宁俭；丧，与其易也，宁戚',text:'礼宁俭丧宁戚',meaning:'礼与其奢华宁可俭朴；丧礼与其仪节周到宁可内心哀戚。重本质轻形式。',keywords:['礼本','俭','戚']},
  {id:'p_wusuo',ch:3,type:'正论',anchor:'君子无所争',text:'君子无所争其争也君子',meaning:'君子没有什么可争的；若必争则是射箭比赛，揖让而升、下而饮酒，争也合乎君子风度。',keywords:['不争','射礼']},
  {id:'p_jinmeijinshan',ch:3,type:'正论',anchor:'《韶》，尽美矣，又尽善也；《武》，尽美矣，未尽善也',text:'《韶》尽美尽善《武》未尽善',meaning:'舜乐《韶》美善兼备；武王乐《武》形式美但因武王以征伐取天下，未达于至善。美是艺术、善是道德。',keywords:['美善','韶','武']},
  {id:'p_fugui',ch:4,type:'正论',anchor:'富与贵是人之所欲也，不以其道得之不处也',text:'不以其道得之不处',meaning:'富贵是人人向往，但不以正道得来不接受；君子无终食之间违仁。',keywords:['富贵','仁','道']},
  {id:'p_zhaowen',ch:4,type:'正论',anchor:'朝闻道，夕死可矣',text:'朝闻道夕死可矣',meaning:'早晨听闻真理，当晚死去也无憾——求道的热切。',keywords:['道','闻道']},
  {id:'p_yiyuli',ch:4,type:'正论',anchor:'君子之于天下也，无适也，无莫也，义之与比',text:'君子义之与比',meaning:'君子对天下事没有一定厚薄亲疏，只以"义"为准则。',keywords:['义','权']},
  {id:'p_yiguan',ch:4,type:'对话问答',anchor:'参乎！吾道一以贯之……夫子之道，忠恕而已矣',text:'忠恕一贯',meaning:'孔子对曾子说"吾道一以贯之"；曾子对门人解释为"忠恕"——尽己之谓忠、推己之谓恕。',keywords:['忠恕','一贯']},
  {id:'p_yuyuli',ch:4,type:'正论',anchor:'君子喻于义，小人喻于利',text:'君子喻于义小人喻于利',meaning:'君子懂得并追求义，小人只懂得利；这是君子小人的根本分野。',keywords:['义利之辨']},
  {id:'p_jianxian',ch:4,type:'正论',anchor:'见贤思齐焉，见不贤而内自省也',text:'见贤思齐见不贤自省',meaning:'见贤人想向他看齐，见不贤的人内心反省自己是否有同样缺点。',keywords:['自省','贤']},
  {id:'p_fumu',ch:4,type:'正论',anchor:'父母在不远游，游必有方',text:'父母在不远游',meaning:'父母在世时不出远门；若必须远游也要有确定方向和归期，免父母牵挂。',keywords:['孝','远游']},
  {id:'p_nayuyan',ch:4,type:'正论',anchor:'君子欲讷于言而敏于行',text:'讷于言敏于行',meaning:'君子说话谨慎迟钝，做事勤敏捷厉。',keywords:['言行']},
  {id:'p_bugu',ch:4,type:'正论',anchor:'德不孤，必有邻',text:'德不孤必有邻',meaning:'有德之人不会孤单，必有志同道合者为邻。',keywords:['德','邻']},
  {id:'p_shuer',ch:7,type:'正论',anchor:'述而不作，信而好古',text:'述而不作信而好古',meaning:'传述旧说而不创作新说，信仰并喜爱古代文化——孔子对自己的定位。',keywords:['述','好古']},
  {id:'p_xuebujuan',ch:7,type:'正论',anchor:'默而识之，学而不厌，诲人不倦',text:'学而不厌诲人不倦',meaning:'默记所学、学习永不满足、教导别人永不倦怠。',keywords:['学','教']},
  {id:'p_bufenbuqi',ch:7,type:'正论',anchor:'不愤不启，不悱不发。举一隅不以三隅反，则不复也',text:'不愤不启不悱不发举一反三',meaning:'学生不到苦思不解时不去开导、不到想说却说不出时不去启发；举一个角不能推其他三个角就不再教——启发式教学。',keywords:['启发式教学','举一反三']},
  {id:'p_yongxing',ch:7,type:'对话问答',anchor:'用之则行，舍之则藏，惟我与尔有是夫',text:'用行舍藏',meaning:'孔子对颜渊说：用我就行其道、不用就隐居起来，只有我和你能这样。子路问"统帅三军谁与"，孔子答"暴虎冯河死而无悔者不与，必临事而惧好谋而成"——反对蛮勇。',keywords:['用行舍藏','好谋']},
  {id:'p_fuyun',ch:7,type:'正论',anchor:'饭疏食饮水，曲肱而枕之，乐亦在其中矣。不义而富且贵，于我如浮云',text:'不义富贵如浮云',meaning:'吃粗粮喝清水弯臂为枕乐在其中；不义得来的富贵对我像浮云一样轻。',keywords:['安贫乐道','浮云']},
  {id:'p_fafenwangshi',ch:7,type:'正论',anchor:'发愤忘食，乐以忘忧，不知老之将至',text:'发愤忘食乐以忘忧',meaning:'叶公问子路孔子为人，孔子自述：发愤用功忘了吃饭，快乐得忘了忧愁，连衰老到来都不知道。',keywords:['好学','乐']},
  {id:'p_sanrenxing',ch:7,type:'正论',anchor:'三人行，必有我师焉：择其善者而从之，其不善者而改之',text:'三人行必有我师',meaning:'三人同行必有可师法者：择善而从，不善则改。',keywords:['师','从善']},
  {id:'p_renyuan',ch:7,type:'正论',anchor:'仁远乎哉？我欲仁，斯仁至矣',text:'我欲仁斯仁至矣',meaning:'仁离人远吗？只要我想行仁，仁就来了——仁在己不在人。',keywords:['仁','自觉']},
  {id:'p_kejifuli',ch:12,type:'对话问答',anchor:'克己复礼为仁。一日克己复礼，天下归仁焉……非礼勿视非礼勿听非礼勿言非礼勿动',text:'克己复礼为仁四勿',meaning:'颜渊问仁。孔子答：约束自己使言行合于礼就是仁；一旦做到，天下人都会归向你。四目：非禮勿視、勿聽、勿言、勿動。',keywords:['克己复礼','仁','四勿']},
  {id:'p_jishu',ch:12,type:'对话问答',anchor:'己所不欲，勿施于人。在邦无怨，在家无怨',text:'己所不欲勿施于人（仲弓问仁）',meaning:'仲弓问仁。孔子答：出门如见大宾、使民如承大祭，己所不欲勿施于人，在邦在家都无怨。',keywords:['恕','仁']},
  {id:'p_minxin',ch:12,type:'对话问答',anchor:'自古皆有死，民无信不立',text:'民无信不立',meaning:'子贡问政（足食足兵民信），若必去先去兵再去食；因为自古皆有死，但人民不信任政府国家就立不住。',keywords:['信','政']},
  {id:'p_junjun',ch:12,type:'对话问答',anchor:'君君，臣臣，父父，子子',text:'君君臣臣父父子子',meaning:'齐景公问政。孔子答：君要像君、臣要像臣、父要像父、子要像子——名实相符，各守其分。',keywords:['正名','名分']},
  {id:'p_zhengzhe',ch:12,type:'对话问答',anchor:'政者，正也。子帅以正，孰敢不正',text:'政者正也',meaning:'政就是"正"。你自己率先行正，谁敢不正？',keywords:['正','为政']},
  {id:'p_fengcao',ch:12,type:'譬喻',anchor:'君子之德风，小人之德草。草上之风必偃',text:'君子德风小人德草',meaning:'君子的德像风，小人的德像草；风吹过草必倒伏。领导者率先行善民自随之。',keywords:['德','风化']},
  {id:'p_zhengming',ch:13,type:'对话问答',anchor:'名不正则言不顺，言不顺则事不成……刑罚不中则民无所错手足',text:'正名论',meaning:'子路问为政奚先，孔子说"必也正名乎"：名不正则言不顺、事不成、礼乐不兴、刑罚不中、民无所措手足。子路笑孔子迂，孔子斥其野。',keywords:['正名','名实']},
  {id:'p_shenzheng',ch:13,type:'正论',anchor:'其身正，不令而行；其身不正，虽令不从',text:'身正不令而行',meaning:'领导者自身端正，不用下令事情也行得通；自身不正即使下令也无人听从。',keywords:['正己','表率']},
  {id:'p_shujiao',ch:13,type:'对话问答',anchor:'庶矣哉',text:'庶富教',meaning:'到卫国见人口众多，冉有问既庶矣又何加？曰"富之"；既富矣？曰"教之"——先富后教。',keywords:['庶富教','治国']},
  {id:'p_yusu',ch:13,type:'正论',anchor:'无欲速，无见小利。欲速则不达，见小利则大事不成',text:'欲速则不达',meaning:'不要求快、不要贪小利；求快反而达不到目的，贪小利办不成大事。',keywords:['欲速不达','远图']},
  {id:'p_fuziyin',ch:13,type:'对话问答',anchor:'父为子隐，子为父隐，直在其中矣',text:'父为子隐子为父隐',meaning:'叶公说"其父攘羊而子证之"为直，孔子反对：父为子隐、子为父隐，直就在其中——孝慈大于证父之直。',keywords:['直','亲亲相隐']},
  {id:'p_hebutong',ch:13,type:'正论',anchor:'君子和而不同，小人同而不和',text:'和而不同',meaning:'君子能调和差异但不苟同；小人苟同但不能真正调和。',keywords:['和','同']},
  {id:'p_gupu',ch:15,type:'对话问答',anchor:'君子固穷，小人穷斯滥矣',text:'君子固穷',meaning:'在陈绝粮子路愠问"君子亦有穷乎"，孔子答：君子能安守穷困，小人一穷困就胡作非为。',keywords:['穷','固']},
  {id:'p_yiyiguanzhi',ch:15,type:'对话问答',anchor:'予一以贯之',text:'予一以贯之',meaning:'孔子对子贡说：我不是多学而强记，而是有一个核心贯穿始终。',keywords:['一贯']},
  {id:'p_wuwei',ch:15,type:'正论',anchor:'无为而治者其舜也与？夫何为哉？恭己正南面而已矣',text:'无为而治其舜',meaning:'能无为而治的大概是舜吧？他做了什么？只是庄严端正面南而坐而已——任贤使能，恭己无为。',keywords:['无为而治','舜']},
  {id:'p_shashen',ch:15,type:'正论',anchor:'志士仁人无求生以害仁，有杀身以成仁',text:'杀身成仁',meaning:'有志之士和仁德之人，不会为了求生损害仁道，只会牺牲生命来成就仁。',keywords:['成仁','牺牲']},
  {id:'p_gongyu',ch:15,type:'譬喻',anchor:'工欲善其事必先利其器',text:'工欲善其事必先利其器',meaning:'做工要做好先要有好工具；为仁要先事贤友仁。',keywords:['器','工具']},
  {id:'p_yuanlv',ch:15,type:'正论',anchor:'人无远虑必有近忧',text:'人无远虑必有近忧',meaning:'没有长远考虑就会有眼前忧患。',keywords:['虑','远']},
  {id:'p_shu',ch:15,type:'对话问答',anchor:'其恕乎！己所不欲勿施于人',text:'恕：己所不欲勿施于人',meaning:'子贡问"有一言而可以终身行之者乎"，孔子答"恕"——自己不愿的不要强加于人。',keywords:['恕','终身']},
  {id:'p_xiaoburen',ch:15,type:'正论',anchor:'巧言乱德。小不忍则乱大谋',text:'小不忍则乱大谋',meaning:'花言巧语败坏道德；小事不能忍耐会败坏大计。',keywords:['忍','大谋']},
  {id:'p_hongdao',ch:15,type:'正论',anchor:'人能弘道，非道弘人',text:'人能弘道非道弘人',meaning:'人能够弘扬道，道不能自动弘扬人——道要人去践行光大。',keywords:['弘道','践行']},
  {id:'p_youjiaowulei',ch:15,type:'正论',anchor:'有教无类',text:'有教无类',meaning:'教育不分贵贱贫富类别，人人都可受教育。',keywords:['教育','平等']},
  {id:'p_bujuan',ch:16,type:'正论',anchor:'不患寡而患不均，不患贫而患不安。盖均无贫，和无寡，安无倾',text:'不患寡患不均',meaning:'季氏将伐颛臾，孔子批评：不怕少而怕分配不均，不怕穷而怕不安定。均则无贫、和则无寡、安则不倾。修文德以来远人。',keywords:['均','安','文德']},
  {id:'p_xiaoqiang',ch:16,type:'正论',anchor:'吾恐季孙之忧不在颛臾而在萧墙之内也',text:'祸起萧墙',meaning:'季氏真正的忧患不在颛臾而在自己内部（鲁君与家臣之间）。后作成语"祸起萧墙"。',keywords:['萧墙','内忧']},
  {id:'p_liyuetan',ch:16,type:'正论',anchor:'天下有道则礼乐征伐自天子出；天下无道则礼乐征伐自诸侯出',text:'礼乐征伐自天子出',meaning:'天下有道时制礼作乐出兵征伐决定自天子；无道时出自诸侯、大夫、陪臣。政出多门必不能久。',keywords:['有道无道','政权']}
];

// 对话
const dialogues = [
  {id:'d_qiaoyan',ch:1,speaker:'孔子',topic:'巧言令色鲜矣仁',anchor:'子曰："巧言令色，鲜矣仁！"',turns:1},
  {id:'d_sanshen',ch:1,speaker:'曾子',topic:'三省吾身',anchor:'曾子曰："吾日三省吾身',turns:1},
  {id:'d_pinle',ch:1,speaker:'子贡↔孔子',topic:'贫而乐富而好礼',anchor:'子贡曰："贫而无谄，富而无骄，何如？"',turns:3},
  {id:'d_xiao',ch:2,speaker:'孟懿子/孟武伯/子游/子夏↔孔子',topic:'问孝',anchor:'孟懿子问孝。子曰："无违。"',turns:4},
  {id:'d_xueersi',ch:2,speaker:'孔子',topic:'学思关系',anchor:'学而不思则罔，思而不学则殆',turns:1},
  {id:'d_ganwu',ch:2,speaker:'哀公↔孔子',topic:'使民服',anchor:'哀公问曰："何为则民服？"',turns:2},
  {id:'d_liben',ch:3,speaker:'林放↔孔子',topic:'礼之本',anchor:'林放问礼之本。子曰："大哉问！',turns:2},
  {id:'d_qiaoxiao',ch:3,speaker:'子夏↔孔子',topic:'绘事后素',anchor:'子夏问曰："巧笑倩兮',turns:3},
  {id:'d_shunzhi',ch:3,speaker:'定公↔孔子',topic:'君臣之礼',anchor:'定公问："君使臣，臣事君，如之何？"',turns:2},
  {id:'d_gp',ch:3,speaker:'或人↔孔子',topic:'管仲器小',anchor:'子曰："管仲之器小哉！"',turns:3},
  {id:'d_guoqia',ch:4,speaker:'孔子→曾子',topic:'吾道一以贯之',anchor:'子曰："参乎！吾道一以贯之。"',turns:3},
  {id:'d_yiyuli',ch:4,speaker:'孔子',topic:'义利之辨',anchor:'君子喻于义，小人喻于利',turns:1},
  {id:'d_yongxing',ch:7,speaker:'孔子↔颜渊↔子路',topic:'用行舍藏与暴虎冯河',anchor:'子谓颜渊曰："用之则行，舍之则藏"',turns:3},
  {id:'d_fuyun',ch:7,speaker:'孔子',topic:'不义富贵如浮云',anchor:'饭疏食饮水，曲肱而枕之',turns:1},
  {id:'d_sanrenxing',ch:7,speaker:'孔子',topic:'三人行必有我师',anchor:'三人行，必有我师焉',turns:1},
  {id:'d_kejifuli',ch:12,speaker:'颜渊↔孔子',topic:'克己复礼四勿',anchor:'颜渊问仁。子曰："克己复礼为仁。"',turns:3},
  {id:'d_jishu',ch:12,speaker:'仲弓↔孔子',topic:'己所不欲勿施于人',anchor:'仲弓问仁。子曰："出门如见大宾"',turns:2},
  {id:'d_simaniu',ch:12,speaker:'司马牛↔子夏',topic:'四海之内皆兄弟',anchor:'司马牛忧曰："人皆有兄弟，我独亡。"',turns:2},
  {id:'d_zubing',ch:12,speaker:'子贡↔孔子',topic:'足食足兵民信',anchor:'子贡问政。子曰："足食，足兵，民信之矣。"',turns:4},
  {id:'d_junjun',ch:12,speaker:'齐景公↔孔子',topic:'君君臣臣',anchor:'齐景公问政于孔子。孔子对曰："君君，臣臣，父父，子子。"',turns:2},
  {id:'d_fengcao',ch:12,speaker:'季康子↔孔子',topic:'君子德风',anchor:'季康子问政于孔子曰："如杀无道"',turns:3},
  {id:'d_zhengming',ch:13,speaker:'子路↔孔子',topic:'正名',anchor:'子路曰："卫君待子而为政，子将奚先？"',turns:3},
  {id:'d_shufu',ch:13,speaker:'冉有↔孔子',topic:'庶富教',anchor:'子适卫，冉有仆。子曰："庶矣哉！"',turns:3},
  {id:'d_yusu',ch:13,speaker:'子夏↔孔子',topic:'欲速不达',anchor:'子夏为莒父宰，问政。子曰："无欲速，无见小利。"',turns:2},
  {id:'d_fuyin',ch:13,speaker:'叶公↔孔子',topic:'父子相隐',anchor:'叶公语孔子曰："吾党有直躬者"',turns:2},
  {id:'d_gupin',ch:15,speaker:'子路↔孔子',topic:'君子固穷',anchor:'子路愠见曰："君子亦有穷乎？"',turns:2},
  {id:'d_shu',ch:15,speaker:'子贡↔孔子',topic:'恕终身行',anchor:'子贡问曰："有一言而可以终身行之者乎？"',turns:2},
  {id:'d_zhuanvu',ch:16,speaker:'冉有/子路↔孔子',topic:'季氏将伐颛臾',anchor:'季氏将伐颛臾。冉有、季路见于孔子',turns:4},
  {id:'d_guoting',ch:16,speaker:'陈亢↔伯鱼',topic:'过庭之训（诗礼）',anchor:'陈亢问于伯鱼曰："子亦有异闻乎？"',turns:4}
];

const fables = []; // 论语少寓言
const analogies = [
  {id:'a_beichen',ch:2,anchor:'譬如北辰，居其所而众星共之',from:'北辰安居',to:'为政以德'},
  {id:'a_qicai',ch:2,anchor:'大车无輗，小车无軏',from:'车无辕销',to:'人无信不可行'},
  {id:'a_fengcao',ch:12,anchor:'君子之德风，小人之德草。草上之风必偃',from:'风过草偃',to:'领导者率先正己'},
  {id:'a_gongqi',ch:15,anchor:'工欲善其事必先利其器',from:'工利器',to:'事贤友仁'},
  {id:'a_huxiao',ch:16,anchor:'虎兕出于柙，龟玉毁于椟中，是谁之过与',from:'猛兽出笼玉器毁匣',to:'辅相者失职'}
];

const concepts = [
  {id:'c_ren',name:'仁',freq:109,anchor:'孝弟也者',meaning:'儒家最高德性；爱人、克己复礼、己所不欲勿施于人、杀身成仁。'},
  {id:'c_li',name:'礼',freq:74,anchor:'人而不仁',meaning:'典章制度行为规范；以仁为本、以和为贵、宁俭宁戚。'},
  {id:'c_junzi',name:'君子',freq:107,anchor:'人不知而不愠',meaning:'理想人格；喻于义、周而不比、和而不同、泰而不骄、求诸己。'},
  {id:'c_xiaoren',name:'小人',freq:24,anchor:'小人喻于利',meaning:'与君子对照：喻于利、比而不周、同而不和、骄而不泰、求诸人。'},
  {id:'c_xiao',name:'孝',freq:19,anchor:'入则孝',meaning:'孝父母；生事之以礼、死葬之以礼、色难、父母在不远游。'},
  {id:'c_ti',name:'弟（悌）',freq:10,anchor:'孝弟也者',meaning:'敬兄长；与孝合称"孝弟"为仁之本。'},
  {id:'c_zhong',name:'忠',freq:18,anchor:'为人谋而不忠乎',meaning:'尽心竭力；己欲立而立人；与人忠。'},
  {id:'c_shu',name:'恕',freq:2,anchor:'夫子之道，忠恕',meaning:'推己及人；己所不欲勿施于人——可终身行之。'},
  {id:'c_yi',name:'义',freq:24,anchor:'君子义以为质',meaning:'宜也，正当性；君子义之与比、喻于义、见得思义。'},
  {id:'c_xin',name:'信',freq:38,anchor:'敬事而信',meaning:'诚信；人而无信不知其可、民无信不立、与朋友交言而有信。'},
  {id:'c_xue',name:'学',freq:64,anchor:'学而时习之',meaning:'学习；学思结合、温故知新、学而不厌、不耻下问。'},
  {id:'c_zheng',name:'政',freq:41,anchor:'为政以德',meaning:'正也；为政以德、正己正人、举直错枉、庶富教。'},
  {id:'c_de',name:'德',freq:40,anchor:'德不孤',meaning:'道德；为政以德、德风德草、德不孤。'},
  {id:'c_zhi',name:'知（智）',freq:27,anchor:'知之为知之',meaning:'智与知；知人为智、自知为明、知命知人。'},
  {id:'c_yong',name:'勇',freq:8,anchor:'临事而惧',meaning:'反对暴虎冯河之勇，主张义以为上、临事惧好谋成。'}
];

const people = [
  {id:'kongzi',name:'孔子',alias:['孔丘','仲尼','夫子','子'],role:'核心/作者',
    bio:'名丘字仲尼，春秋鲁人。儒家学派创始人，我国最伟大的思想家教育家。删诗书定礼乐赞周易修春秋，弟子三千贤人七十二。'},
  {id:'yanzihui',name:'颜回',alias:['颜渊','回'],role:'弟子/第一',bio:'孔门德行科第一，最得孔子喜爱，不迁怒不贰过，安贫乐道，不幸早夭。'},
  {id:'zilu',name:'仲由',alias:['子路','季路','由'],role:'弟子',bio:'孔门政事科；性勇直，好勇过我，后仕卫死于孔悝之难。'},
  {id:'zigong',name:'端木赐',alias:['子贡','赐'],role:'弟子',bio:'孔门言语科；善辞令外交，经商致千金，孔子死后独守墓六年。'},
  {id:'zixia',name:'卜商',alias:['子夏','商'],role:'弟子',bio:'孔门文学科；传经之儒，后为魏文侯师。'},
  {id:'zengzi',name:'曾参',alias:['曾子','参'],role:'弟子',bio:'以孝著称，述《大学》《孝经》；日三省吾身。'},
  {id:'youzi',name:'有若',alias:['有子'],role:'弟子',bio:'其言似孔子，提出"孝弟为仁之本""礼之用和为贵"。'},
  {id:'zhonggong',name:'冉雍',alias:['仲弓','雍'],role:'弟子',bio:'孔门德行科；孔子称"雍也可使南面"；问仁章主角。'},
  {id:'ranqiu',name:'冉求',alias:['冉有','求'],role:'弟子',bio:'孔门政事科；为季氏宰；孔子对其为季氏聚敛鸣鼓攻之。'},
  {id:'simaaniu',name:'司马耕',alias:['司马牛'],role:'弟子',bio:'宋人；问仁问君子，子夏答"四海之内皆兄弟"。'},
  {id:'zizhang',name:'颛孙师',alias:['子张'],role:'弟子',bio:'陈人；才高意广，问政问干禄问明问达。'},
  {id:'fantshi',name:'樊须',alias:['樊迟'],role:'弟子',bio:'请学稼圃被斥为小人；问仁（爱人）问知（知人）。'},
  {id:'ziyou',name:'言偃',alias:['子游'],role:'弟子',bio:'孔门文学科；武城宰，以弦歌治。'},
  {id:'aigong',name:'鲁哀公',alias:[],role:'鲁君',bio:'春秋末鲁君；问政于孔子。'},
  {id:'jikangzi',name:'季康子',alias:[],role:'鲁大夫',bio:'鲁国正卿；三问政于孔子。'},
  {id:'qijinggong',name:'齐景公',alias:[],role:'齐君',bio:'春秋齐君；问政孔子，欲以尼溪田封孔子而未果。'},
  {id:'mengyizi',name:'孟懿子',alias:[],role:'鲁大夫',bio:'三家之一；问孝于孔子。'},
  {id:'linfang',name:'林放',alias:[],role:'鲁人',bio:'问礼之本于孔子；孔子称"大哉问"。'},
  {id:'yegong',name:'叶公',alias:['沈诸梁'],role:'楚大夫',bio:'楚叶县尹；问政于孔子，与孔子论直躬。'},
  {id:'boyu',name:'孔鲤',alias:['伯鱼','鲤'],role:'孔子之子',bio:'孔子之子；过庭之训（学诗学礼）主角。'},
  {id:'chenkang',name:'陈亢',alias:['子禽'],role:'弟子',bio:'问伯鱼异闻；知君子远其子。'},
  {id:'gongyechang',name:'公冶长',alias:[],role:'弟子',bio:'孔子女婿；在缧绁之中非其罪。'},
  {id:'boyishuqi',name:'伯夷叔齐',alias:[],role:'古贤',bio:'孤竹君二子；不食周粟饿于首阳；孔子称"求仁得仁"。'}
];

// 锚点验证
if (fs && text) {
  function findAnchor(anchor, chIdx, global){
    if (!anchor) return -1;
    const cleanPunct = /[，。！？、；：「」『』""''（）《》〈〉\s·…—……,…\.\?：「」·]/g;
    const clean = anchor.replace(cleanPunct,'');
    const searchText = global ? text : text.slice(chapters[chIdx-1]?.start||0, (chapters[chIdx-1]?.start||0)+(chapters[chIdx-1]?.length||0)+300);
    const baseOffset = global ? 0 : (chapters[chIdx-1]?.start||0);
    const searchClean = searchText.replace(cleanPunct,'');
    const key = clean.slice(0,Math.min(clean.length,8));
    const idx = searchClean.indexOf(key);
    if (idx===-1) {const d=text.indexOf(anchor.slice(0,15));return d>=0?d:-1;}
    let cc=0,rs=-1;
    for (let i=0;i<searchText.length;i++){if(cc===idx){rs=baseOffset+i;break;}if(!cleanPunct.test(searchText[i]))cc++;}
    return rs;
  }
  function chNum(title){ return parseChTitle(title); }
  let miss=0;
  function check(arr,global){for(const a of arr){if(!a.anchor)continue;const ci=typeof a.ch==='number'?a.ch:chNum(a.chTitle);if(!chapters.find(c=>c.ch===ci)){console.log('CH NOT FOUND',a.id,a.ch);miss++;continue;}const p=findAnchor(a.anchor,ci,global);if(p===-1){console.log('MISS',a.id,a.anchor.slice(0,25));miss++;}else a.charStart=p;}}
  // 修正chIdx映射
  propositions.forEach(p=>{const ch=chapters.find(c=>c.ch===p.ch);if(ch)p._chIdx=chapters.indexOf(ch)+1;});
  dialogues.forEach(p=>{const ch=chapters.find(c=>c.ch===p.ch);if(ch)p._chIdx=chapters.indexOf(ch)+1;});
  analogies.forEach(p=>{const ch=chapters.find(c=>c.ch===p.ch);if(ch)p._chIdx=chapters.indexOf(ch)+1;});
  // 重写查找：用 _chIdx
  function check2(arr,global){for(const a of arr){if(!a.anchor)continue;const ci=a._chIdx;if(!ci){console.log('NOCH',a.id);miss++;continue;}const p=findAnchor(a.anchor,ci,global);if(p===-1){console.log('MISS',a.id,a.anchor.slice(0,25));miss++;}else a.charStart=p;}}
  check2(propositions); check2(dialogues); check2(analogies);
  // concepts 全局查
  function checkC(arr){for(const a of arr){if(!a.anchor)continue;const d=text.indexOf(a.anchor.slice(0,12));if(d===-1){console.log('MISS C',a.id,a.anchor.slice(0,15));miss++;}else a.charStart=d;}}
  checkC(concepts);
  console.log('《论语》标引：%d章/%d命题/%d对话/%d譬喻/%d概念/%d人物 | miss:%d',
    chapters.length,propositions.length,dialogues.length,analogies.length,concepts.length,people.length,miss);
}

const LUNYU_DATA = {
  bookId, bookPath, title:'论语', subtitle:'孔子与弟子语录',
  author:'孔丘弟子辑', dynasty:'周（春秋鲁）',
  heroText:'《论语》是孔子及其弟子的语录汇编，共二十篇，为<b style="color:#f2d98a">儒家"四书"之首</b>。本页收录学而、为政、八佾、里仁、述而、颜渊、子路、卫灵公、季氏<b>九篇核心章句</b>，标引约 70 命题、近 30 对话，集中呈现"仁、礼、君子、学、忠恕、为政"等核心思想。',
  themeCss:':root{--accent:#8b3a2f;--hero-from:#3a1f1a;--hero-mid:#6a3428;--hero-to:#9c5e4b}',
  intro:'《论语》是孔子弟子及再传弟子编纂的语录体著作，成书于战国初年，共二十篇，记录孔子及其弟子言行，涵盖仁、礼、义、孝、忠恕、学、政、君子等思想。汉代列为"七经"之一，南宋朱熹编入《四书》，成为中国古代士人必读经典，影响中国文化两千余年，亦为东亚文化圈共同经典。',
  overview:[
    '《论语》的核心是"<b>仁</b>"——仁是"爱人"、是"克己复礼"、是"己所不欲勿施于人"、是"杀身成仁"。围绕"仁"展开的是<b>礼</b>（制度规范）、<b>义</b>（正当原则）、<b>忠恕</b>（一贯之道）、<b>君子</b>（理想人格）、<b>为政以德</b>（政治理想）、<b>学</b>（修养路径）。',
    '文体上《论语》以对话问答为主，精炼隽永，章与章之间无逻辑必然联系，但整体形成一个圆融的思想世界。孔子罕言性与天道，多就人伦日用指点："夫子之文章可得而闻也，夫子之言性与天道不可得而闻也。"这种"下学而上达"的教学风格，使《论语》成为中国人最亲切的生活经典。',
    '本页收录九篇代表章句：<b>学而</b>开篇三乐、<b>为政</b>三十而立与温故知新、<b>八佾</b>论礼乐、<b>里仁</b>忠恕一贯义利之辨、<b>述而</b>孔子自述学行、<b>颜渊</b>问仁问政（克己复礼、民信、君君臣臣、德风德草）、<b>子路</b>正名论与和而不同、<b>卫灵公</b>杀身成仁恕道与有教无类、<b>季氏</b>不患寡患不均与三友三乐三戒三畏九思。'
  ],
  themes:[
    {title:'仁学：克己复礼·爱人·恕道', desc:'仁为全德之本；孝弟为仁之本；克己复礼为仁；己所不欲勿施于人；杀身成仁。'},
    {title:'礼论：宁俭宁戚·和为贵', desc:'礼与其奢宁俭丧与其易宁戚；礼之用和为贵；人而不仁如礼何。'},
    {title:'君子小人之辨：喻义喻利·和而不同', desc:'君子周而不比、和而不同、泰而不骄、求诸己；小人反是。'},
    {title:'教育：有教无类·因材施教·启发式', desc:'有教无类；不愤不启不悱不发；温故知新；学而不厌诲人不倦；三人行必有我师。'},
    {title:'政治：为政以德·正己正人·庶富教', desc:'为政以德譬如北辰；政者正也；其身正不令而行；先富后教；举直错枉；无为而治（舜）。'},
    {title:'修养：学思结合·内省改过', desc:'学而不思则罔思而不学则殆；吾日三省；见贤思齐；过而不改是谓过；讷言敏行。'},
    {title:'中庸：过犹不及·无可无不可', desc:'允执其中；不得中行而与之必也狂狷；和而不同；义之与比。'}
  ],
  chapters, propositions, fables, analogies, dialogues, people, concepts,
  stats:{chars:text.length||25000, nChapters:chapters.length, nPropositions:propositions.length, nFables:0, nAnalogies:analogies.length, nDialogues:dialogues.length, nPeople:people.length, nConcepts:concepts.length}
};
if (typeof window !== 'undefined') window.LUNYU_DATA = LUNYU_DATA;
if (typeof module !== 'undefined') module.exports = LUNYU_DATA;
})();
