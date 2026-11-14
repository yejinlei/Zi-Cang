// 列子（列御寇）深度标引数据 v22 —— 简体文本匹配
(function(){
const fs = (typeof require !== 'undefined') ? require('fs') : null;
const bookId = 'liezi';
const bookPath = '诸子/列子.txt';

// 读文本切章（node 端验证用）
let text = '';
if (fs) text = fs.readFileSync('texts/'+bookPath, 'utf-8');

// 章节按简体文本切分
const titles = ['天瑞第一','黄帝第二','周穆王第三','仲尼第四','汤问第五','力命第六','杨朱第七','说符第八'];
const chapters = [];
for (let i = 0; i < titles.length; i++) {
  const pos = text.indexOf(titles[i]);
  let bodyStart = pos + titles[i].length;
  while (bodyStart < text.length && (text[bodyStart]==='\n'||text[bodyStart]==='\r')) bodyStart++;
  const nextTitle = titles[i+1];
  const nextPos = nextTitle ? text.indexOf(nextTitle) : text.length;
  const body = text.slice(bodyStart, nextPos).trim();
  chapters.push({ch:i+1, title:titles[i], start:bodyStart, length:body.length, summary:''});
}
chapters[0].summary='天道生化；万物自化；生死自然；虚静无为。含「杞人忧天」「荣启期三乐」「林类论生死」「国氏为盗」等寓言。';
chapters[1].summary='黄帝梦游华胥；列姑射神人；列子学射；伯昏无人临渊；杨朱见老子。论至人无己、神凝形释。';
chapters[2].summary='化人神游；周穆王西游见西王母。论觉与梦、形与神。';
chapters[3].summary='孔子与颜回论「乐天知命」之忧，辨析无乐无知为真乐真知。';
chapters[4].summary='殷汤夏革问答无极无尽；愚公移山；伯牙鼓琴知音。';
chapters[5].summary='力与命的对辩：人力有限，命运自尔。';
chapters[6].summary='杨朱论名实；百年人生之乐；且趣当生，奚遑死后。';
chapters[7].summary='持后持身；慎言慎行；歧路亡羊；鲍氏之子论类无贵贱；子列子辞粟。';

// ====== 核心命题（简体）======
const propositions = [
  {id:'p_busheng', ch:1, type:'正论', anchor:'有生不生，有化不化。不生者能生生，不化者能化化', text:'不生不化者能生生化化',
    meaning:'能生化万物者，自身不被生化；它是万物的本原（道），自生自化、自形自色、自智自力。',
    keywords:['道','自生自化','生生']},
  {id:'p_taiyi', ch:1, type:'正论', anchor:'有太易，有太初，有太始，有太素', text:'宇宙生成四阶段：太易→太初→太始→太素',
    meaning:'太易未见气、太初气之始、太始形之始、太素质之始；气形质具而未离谓之浑沦，易变而为一，清轻者上为天、浊重者下为地。',
    keywords:['太易','浑沦','宇宙生成']},
  {id:'p_tianxia', ch:1, type:'正论', anchor:'天地无全功，圣人无全能，万物无全用', text:'天地圣人万物皆有所偏',
    meaning:'天职生覆、地职形载、圣职教化、物职所宜；皆随所宜而不能出所位。万物齐职，无独尊者。',
    keywords:['无为','分职','各得其宜']},
  {id:'p_zhongyouji', ch:1, type:'正论', anchor:'种有几', text:'万物皆出于机皆入于机',
    meaning:'物种变化无穷，从微至著、从生物到人，皆自机出、复入于机——列子生物演化观。',
    keywords:['机','物种变化','化生']},
  {id:'p_gui', ch:1, type:'正论', anchor:'精神者，天之分；骨骸者，地之分', text:'鬼者归也，归其真宅',
    meaning:'精神属天清散，骨骸属地浊聚；精神离形各归其真，便是「鬼」——归也。',
    keywords:['鬼','精神','归真']},
  {id:'p_xu', ch:1, type:'对话问答', anchor:'非其名也，莫如静，莫如虚。静也虚也，得其居矣', text:'虚者无贵，贵在静虚自得',
    meaning:'贵虚不是标榜「虚」之名，而是心守静虚、不为外扰，方能得其安居。',
    keywords:['虚','静','无为']},
  {id:'p_miyi', ch:1, type:'正论', anchor:'凡一气不顿进，一形不顿亏', text:'天地密移，损益潜移',
    meaning:'天地运转无息，气不顿进、形不顿亏，人自幼至老貌色智态日异而不觉；渐变非骤变。',
    keywords:['密移','渐变','潜移']},
  {id:'p_huaixu', ch:1, type:'对话问答', anchor:'坏与不坏，吾所不能知也', text:'坏与不坏吾何容心',
    meaning:'天地是否会坏是不可知之事；生不知死、死不知生，不必以未知之忧劳心。——杞人忧天的解答。',
    keywords:['不可知','容心','无忧']},
  {id:'p_daode', ch:1, type:'譬喻', anchor:'国氏之盗，公道也，故亡殃；若之盗，私心也，故得罪', text:'盗天公道，盗人私心',
    meaning:'国氏盗天地之时利（耕作渔猎）是公道，无殃；向氏盗人之金玉财货是私心，获罪。公私之分即是天地之德。',
    keywords:['公道','私心','盗亦有道']},
  {id:'p_huaxu', ch:2, type:'寓言', anchor:'其国无师长，自然而已。其民无嗜欲，自然而已', text:'华胥氏之国：自然无为之治',
    meaning:'华胥国入水不溺、入火不热、乘空如履实，是至德之世的理想；黄帝悟至道，天下大治几若华胥。',
    keywords:['华胥国','自然无为','至治']},
  {id:'p_shenren', ch:2, type:'正论', anchor:'列姑射山在海河洲中，山上有神人焉，吸风饮露，不食五谷', text:'姑射神人：不偎不爱、阴阳常调',
    meaning:'神人无为而万物自足；不施不惠而物自足、不聚不敛而己无愆，是神凝之至。',
    keywords:['神人','无为','姑射']},
  {id:'p_xuefeng', ch:2, type:'对话问答', anchor:'九年之后，横心之所念，横口之所言，亦不知我之是非利害欤', text:'学道九阶：心凝形释、骨肉都融',
    meaning:'三年不敢念是非言利害→五年更念更言→七年从心念无是非→九年内外两忘→不觉形之所倚足之所履，竟不知风乘我还是我乘风。',
    keywords:['心凝形释','学道阶段','乘风']},
  {id:'p_chunqi', ch:2, type:'譬喻', anchor:'壹其性，养其气，含其德，以通乎物之所造', text:'纯气之守：醉者坠车而神全',
    meaning:'至人潜行不窒蹈火不热，靠的是纯气之守而非智巧果敢；醉者坠车虽疾不死，因神全惊惧不入胸。',
    keywords:['纯气','神全','守气']},
  {id:'p_bohun', ch:2, type:'寓言', anchor:'夫至人者，上窥青天，下潜黄泉，挥斥八极，神气不变', text:'伯昏无人临渊射：至人神气不变',
    meaning:'列御寇平地能射，临百仞渊则伏地汗流，因为心中有矜；至人上窥下潜挥斥八极而神气不变。',
    keywords:['至人','神气不变','射之射']},
  {id:'p_dabai', ch:2, type:'对话问答', anchor:'大白若辱，盛德若不足', text:'大白若辱，盛德若不足（老子告杨朱）',
    meaning:'杨朱初见老子时骄矜自满，被老子以"大白若辱盛德若不足"教诲，归来改容，遂与舍者争席。',
    keywords:['大白若辱','谦德','杨朱']},
  {id:'p_shenyou', ch:3, type:'寓言', anchor:'吾与王神游也，形奚动哉', text:'化人神游：觉梦无异',
    meaning:'周穆王与化人神游，寤后方知形未动；化人点化"所居奚异王之宫"，王大悦，不恤国事肆意远游。',
    keywords:['神游','梦觉','化人']},
  {id:'p_wule', ch:4, type:'对话问答', anchor:'无乐无知，是真乐真知；故无所不乐，无所不知', text:'无乐无知是真乐真知',
    meaning:'孔子纠正颜回：徒知乐天知命无忧是浅境；无乐无知方为真乐真知，即无所不乐无所不忧——既不弃诗书礼乐，也不必革之。',
    keywords:['真乐真知','乐天知命','颜回']},
  {id:'p_wuji', ch:5, type:'对话问答', anchor:'无极之外复无无极，无尽之中复无无尽', text:'无极无尽：上下八方无极尽',
    meaning:'殷汤问夏革上下八方是否有极尽；答曰无则无极、有则有尽，无极之外复无极，无尽之中复无尽——故不知其有极有尽。',
    keywords:['无极','无尽','时空无限']},
  {id:'p_yugong', ch:5, type:'寓言', anchor:'子子孙孙，无穷匮也；而山不加增，何苦而不平', text:'愚公移山：诚能动天',
    meaning:'愚公年且九十率子孙叩石垦壤，智叟笑之；愚公以子孙无穷山不加增驳之。帝感其诚，命夸蛾氏二子负二山。寓意：至诚感神、有志竟成。',
    keywords:['愚公移山','诚','坚持']},
  {id:'p_zhiyin', ch:5, type:'寓言', anchor:'伯牙所念，钟子期必得之', text:'伯牙鼓琴知音：高山流水',
    meaning:'伯牙鼓琴志在高山则钟子期曰峨峨泰山，志在流水则洋洋江河；曲每奏钟子期辄穷其趣。子期死伯牙终身不复鼓琴。',
    keywords:['知音','高山流水','伯牙子期']},
  {id:'p_liming', ch:6, type:'两难', anchor:'彭祖之智不出尧舜之上，而寿八百；颜渊之才不出众人之下，而寿四八', text:'力命之辩：寿夭穷达非力所能',
    meaning:'力自谓能寿夭穷达；命反诘：彭祖寿、颜渊夭、孔子困、纣居位、夷齐饿、季氏富，若非力之所及，即是自寿自夭、自穷自达，命无制之者。',
    keywords:['力命','寿夭','自然']},
  {id:'p_mingshi', ch:7, type:'对话问答', anchor:'实无名，名无实。名者，伪而已矣', text:'名实之辨：实名贫，伪名富',
    meaning:'杨朱论名实为伪：尧舜伪让天下不失国祚，伯夷叔齐实让孤竹饿于首阳。实伪之辩若此之省。',
    keywords:['名实','伪','杨朱']},
  {id:'p_bainian', ch:7, type:'正论', anchor:'百年，寿之大齐。得百年者千无一焉', text:'百年人生：且趣当生，奚遑死后',
    meaning:'百年中孩抱昏老夜眠昼觉痛疾哀苦居其大半，畅然自得者无多时。古人知生暂来死暂往，从心而动不违自然，当身之娱非所去，死后之名非所取。',
    keywords:['且趣当生','为我','享乐']},
  {id:'p_qisi', ch:7, type:'正论', anchor:'万物齐生齐死，齐贤齐愚，齐贵齐贱', text:'齐生齐死，腐骨一矣',
    meaning:'万物生异死同：生有贤愚贵贱，死皆臭腐消灭。十年亦死百年亦死，仁圣凶愚死皆腐骨——且趣当生，遑论死后。',
    keywords:['齐生死','腐骨一','为我']},
  {id:'p_chihou', ch:8, type:'譬喻', anchor:'形枉则影曲，形直则影正', text:'持后处先：如影随形',
    meaning:'列子学持后于壶丘子林：顾影则知，枉直随形不在影，屈申任物不在我；持后而处先。',
    keywords:['持后','形影','处先']},
  {id:'p_shenyan', ch:8, type:'譬喻', anchor:'言美则响美，言恶则响恶；身长则影长，身短则影短', text:'慎尔言将有和之，慎尔行将有随之',
    meaning:'名如响、身如影，言行是响影之原；圣人见出知入、观往来。汤武爱天下故王，桀纣恶天下故亡——度在身而稽在人。',
    keywords:['言行','慎','应验']},
  {id:'p_qiluyang', ch:8, type:'寓言', anchor:'歧路之中又有歧焉，吾不知所之，所以反也', text:'歧路亡羊：大道以多歧亡羊，学者以多方丧生',
    meaning:'杨子邻人亡羊因多歧路而不获；杨子戚然变容——大道本同末异，唯归同反一为亡得丧，否则多方丧生。',
    keywords:['歧路亡羊','反一','为学']},
  {id:'p_leiwuguijian', ch:8, type:'反驳', anchor:'天地万物与我并生，类也。类无贵贱，徒以小大智力而相制', text:'类无贵贱，非相为而生（鲍氏之子）',
    meaning:'齐田氏叹"天之于民厚矣，殖五谷生鱼鸟以为之用"，鲍氏之子十二岁反驳：万物与我并生类也，类无贵贱，非天本为人生之——蚊蚋肤虎狼食肉，岂天本为蚊蚋生人虎狼生肉者？',
    keywords:['类无贵贱','天非为人','齐物']}
];

// ====== 寓言 ======
const fables = [
  {id:'f_qiren', ch:1, title:'杞人忧天', type:'寓言',
    anchor:'杞国有人忧天地崩坠，身亡所寄，废寝食者',
    moral:'忧天地崩坠是过虑；言坏与不坏皆未是。坏与不坏吾所不能知，吾何容心哉。',
    chars:['杞人','晓之者','长庐子','子列子']},
  {id:'f_rongqiqi', ch:1, title:'荣启期三乐', type:'寓言',
    anchor:'孔子游于太山，见荣启期行乎郕之野，鹿裘带索，鼓琴而歌',
    moral:'天生万物唯人为贵（一乐）、男尊女卑吾得为男（二乐）、吾行年九十（三乐）。处常得终，当何忧哉？能自宽者也。',
    chars:['孔子','荣启期']},
  {id:'f_linlei', ch:1, title:'林类论生死', type:'寓言',
    anchor:'林类年且百岁，底春被裘，拾遗穗于故畦，并歌并进',
    moral:'死之与生一往一反，死于是安知不生于彼？营营求生非惑乎？彼得之而不尽。',
    chars:['子贡','林类','孔子']},
  {id:'f_zigongxi', ch:1, title:'子贡愿息', type:'对话问答',
    anchor:'子贡倦于学，告仲尼曰："愿有所息。"',
    moral:'生无所息；望圹则知所息——死为大归，古者谓死人为归人，生人为行人。',
    chars:['子贡','孔子','晏子']},
  {id:'f_guoshi', ch:1, title:'国氏为盗', type:'寓言',
    anchor:'齐之国氏大富，宋之向氏大贫；自宋之齐，请其术',
    moral:'国氏盗天地之时利是公道无殃；向氏盗人金玉是私心获罪。公公私私天地之德。',
    chars:['国氏','向氏','东郭先生']},
  {id:'f_huaxu', ch:2, title:'黄帝梦游华胥', type:'寓言',
    anchor:'昼寝而梦，游于华胥氏之国',
    moral:'华胥国无师长、无嗜欲、自然而已；入水不溺入火不热、乘空如履实。至道不可以情求。',
    chars:['黄帝','天老','力牧','太山稽']},
  {id:'f_liezi_xuefeng', ch:2, title:'列子学射乘风', type:'寓言',
    anchor:'列子师老商氏，友伯高子，进二子之道，乘风而归',
    moral:'学道九年后内外两忘、心凝形释、骨肉都融，不知风乘我还是我乘风。尹生求术亟去，故不得。',
    chars:['列子','老商氏','伯高子','尹生（章戴）']},
  {id:'f_zuizhe', ch:2, title:'醉者坠车神全', type:'譬喻',
    anchor:'夫醉者之坠于车也，虽疾不死',
    moral:'醉者神全死生惊惧不入胸，故遌物而不慴；彼得全于酒犹如此，况得全于天乎？',
    chars:['关尹']},
  {id:'f_bohun_she', ch:2, title:'伯昏无人临渊射', type:'寓言',
    anchor:'列御寇为伯昏无人射，引之盈贯，措杯水其肘上',
    moral:'是射之射非不射之射；至人上窥青天下潜黄泉，挥斥八极神气不变。',
    chars:['列御寇','伯昏无人']},
  {id:'f_yangzhu', ch:2, title:'杨朱见老子', type:'寓言',
    anchor:'杨朱南之沛，老聃西游于秦，邀于郊',
    moral:'大白若辱，盛德若不足。杨朱敬闻命改容，归来舍者与之争席。',
    chars:['杨朱','老子']},
  {id:'f_huaren', ch:3, title:'化人神游', type:'寓言',
    anchor:'周穆王时，西极之国有化人来，入水火，贯金石',
    moral:'神游形不动；觉梦之辨。王大悦，不恤国事，肆意远游，宾西王母于瑶池。',
    chars:['周穆王','化人','西王母','造父']},
  {id:'f_yanhui', ch:4, title:'颜回论乐天知命', type:'对话问答',
    anchor:'仲尼闲居，子贡入侍，而有忧色',
    moral:'无乐无知是真乐真知，故无所不乐无所不知无所不忧无所不为；诗书礼乐不必弃、不必革。',
    chars:['孔子','颜回','子贡']},
  {id:'f_yugong', ch:5, title:'愚公移山', type:'寓言',
    anchor:'太行、王屋二山，方七百里，高万仞',
    moral:'子子孙孙无穷匮而山不加增，何苦而不平？帝感其诚，命夸蛾氏负山。至诚感天。',
    chars:['愚公','智叟','遗男','操蛇之神','夸蛾氏']},
  {id:'f_boya', ch:5, title:'伯牙鼓琴遇知音', type:'寓言',
    anchor:'伯牙善鼓琴，钟子期善听',
    moral:'伯牙所念钟子期必得之；高山流水之志。子期死伯牙终身不复鼓琴。',
    chars:['伯牙','钟子期']},
  {id:'f_li_vs_ming', ch:6, title:'力命对辩', type:'对话问答',
    anchor:'力谓命曰："若之功奚若我哉？"',
    moral:'自寿自夭自穷自达，命非有制之者；自然而已，朕岂能识之哉？',
    chars:['力','命','彭祖','颜渊','孔子','纣','季札','田恒','伯夷','叔齐','季氏']},
  {id:'f_yangzhu_ming', ch:7, title:'杨朱论名实', type:'对话问答',
    anchor:'杨朱游于鲁，舍于孟氏。孟氏问曰："人而已矣，奚以名为？"',
    moral:'实无名、名无实，名者伪而已。尧舜伪让天下而不失，夷齐实让而饿死；实名贫伪名富。',
    chars:['杨朱','孟氏','管仲','田氏','尧舜','许由','善卷','伯夷','叔齐']},
  {id:'f_chihou', ch:8, title:'持后处先（影喻）', type:'譬喻',
    anchor:'子列子学于壶丘子林。壶丘子林曰："子知持后，则可言持身矣。"',
    moral:'形枉影曲形直影正；枉直随形不在影，屈申任物不在我。持后而处先。',
    chars:['列子','壶丘子林']},
  {id:'f_liezi_ci_su', ch:8, title:'列子辞粟', type:'寓言',
    anchor:'列子穷，容貌有饥色……郑子阳即令官遗之粟',
    moral:'君非自知我，以人之言遗粟；至其罪我也又且以人之言，此吾所以不受也。后民果作难杀子阳。',
    chars:['列子','列子妻','郑子阳','客']},
  {id:'f_qiluyang', ch:8, title:'歧路亡羊', type:'寓言',
    anchor:'杨子之邻人亡羊，既率其党，又请杨子之竖追之',
    moral:'大道以多歧亡羊，学者以多方丧生；学非本不同非本不一而末异若是，唯归同反一为亡得丧。',
    chars:['杨子（杨朱）','邻人','孟孙阳','心都子']},
  {id:'f_bao', ch:8, title:'鲍氏之子论天非为人', type:'反驳',
    anchor:'齐田氏祖于庭，食客千人……鲍氏之子年十二，预于次',
    moral:'天地万物与我并生类也，类无贵贱；非相为而生，非天本为人生之。',
    chars:['田氏','鲍氏之子（十二岁）']}
];

const analogies = [
  {id:'a_ying', ch:8, anchor:'顾若影，则知之', from:'形之枉直', to:'我之屈申'},
  {id:'a_xiang', ch:8, anchor:'名也者，响也；身也者，影也', from:'言/身', to:'名/影'},
  {id:'a_zui', ch:2, anchor:'夫醉者之坠于车也，虽疾不死', from:'醉者神全', to:'圣人藏于天'},
  {id:'a_dao', ch:1, anchor:'吾盗天地之时利，云雨之滂润，山泽之产育', from:'盗天地', to:'公道'},
  {id:'a_shengren', ch:2, anchor:'夫至人者，上窥青天，下潜黄泉，挥斥八极，神气不变', from:'登高山临百仞渊而射', to:'至人无惊'}
];

const dialogues = [
  {id:'d_xu', ch:1, speaker:'或人→子列子', topic:'何谓贵虚', anchor:'或谓子列子曰："子奚贵虚？"', turns:3},
  {id:'d_shun', ch:1, speaker:'舜→烝（丞）', topic:'道可得而有乎', anchor:'舜问乎烝曰："道可得而有乎？"', turns:5},
  {id:'d_guanyin', ch:2, speaker:'列子→关尹', topic:'至人何以潜行不窒蹈火不热', anchor:'列子问关尹曰："至人潜行不窒……"', turns:6},
  {id:'d_tangwen', ch:5, speaker:'殷汤→夏革', topic:'古初有物？上下八方有极尽？', anchor:'殷汤问于夏革曰："古初有物乎？"', turns:7},
  {id:'d_li_ming', ch:6, speaker:'力↔命', topic:'寿夭穷达是力还是命', anchor:'力谓命曰："若之功奚若我哉？"', turns:6}
];

const people = [
  {id:'liezi', name:'列子', alias:['子列子','列御寇','御寇'], role:'核心/作者',
    bio:'战国郑人，道家，师壶丘子林、友伯昏无人、学于老商氏；能乘风而行；主虚静无为、贵虚、持后、力命。《汉书·艺文志》道家《列子》八篇。'},
  {id:'huqiu', name:'壶丘子林', alias:['壶子'], role:'老师'},
  {id:'bohun', name:'伯昏无人', alias:[], role:'师友'},
  {id:'laoshang', name:'老商氏', alias:[], role:'老师'},
  {id:'baigao', name:'伯高子', alias:[], role:'道友'},
  {id:'guanyin', name:'关尹', alias:['关尹喜'], role:'先师/对话者'},
  {id:'yinsheng', name:'尹生', alias:['章戴'], role:'弟子'},
  {id:'huangdi', name:'黄帝', alias:[], role:'主角（第二、三）'},
  {id:'tianlao', name:'天老', alias:[], role:'黄帝臣'},
  {id:'limu', name:'力牧', alias:[], role:'黄帝臣'},
  {id:'taishanji', name:'太山稽', alias:[], role:'黄帝臣'},
  {id:'huaren', name:'化人', alias:[], role:'神人'},
  {id:'mwang', name:'周穆王', alias:[], role:'主角（第三）'},
  {id:'xiwangmu', name:'西王母', alias:[], role:'神人'},
  {id:'zaofu', name:'造父', alias:[], role:'御者'},
  {id:'kongzi', name:'孔子', alias:['仲尼','夫子'], role:'出场/被论'},
  {id:'yanhui', name:'颜回', alias:['回'], role:'弟子'},
  {id:'zigong', name:'子贡', alias:['赐'], role:'弟子'},
  {id:'rongqiqi', name:'荣启期', alias:[], role:'隐士'},
  {id:'linlei', name:'林类', alias:[], role:'隐士'},
  {id:'qiren', name:'杞人', alias:[], role:'寓言主角'},
  {id:'xiaozhe', name:'晓之者', alias:[], role:'晓者'},
  {id:'changluzi', name:'长庐子', alias:[], role:'楚贤者'},
  {id:'guoshi', name:'国氏', alias:[], role:'齐富人'},
  {id:'xiangshi', name:'向氏', alias:[], role:'宋贫人'},
  {id:'dongguo', name:'东郭先生', alias:[], role:'齐贤者'},
  {id:'yugong', name:'愚公', alias:['北山愚公'], role:'寓言主角'},
  {id:'zhisou', name:'智叟', alias:['河曲智叟'], role:'笑者'},
  {id:'kuae', name:'夸蛾氏', alias:[], role:'神'},
  {id:'boya', name:'伯牙', alias:[], role:'音乐家'},
  {id:'zhongziqi', name:'钟子期', alias:[], role:'知音'},
  {id:'yangzhu', name:'杨朱', alias:['杨子'], role:'主角（第七）'},
  {id:'mengshi', name:'孟氏', alias:[], role:'对话者'},
  {id:'zinziyang', name:'郑子阳', alias:[], role:'郑相'},
  {id:'mengsunyang', name:'孟孙阳', alias:[], role:'杨朱弟子'},
  {id:'xinduzi', name:'心都子', alias:[], role:'学者'},
  {id:'baoshi', name:'鲍氏之子', alias:[], role:'少年'},
  {id:'laozi', name:'老子', alias:['老聃'], role:'导师'},
  {id:'yintang', name:'殷汤', alias:['汤'], role:'问者'},
  {id:'xiage', name:'夏革', alias:['夏棘'], role:'答者'}
];

const concepts = [
  {id:'xu', name:'虚', freq:8, anchor:'虚者无贵也', meaning:'列子核心；静虚自得、心不执物。'},
  {id:'ji', name:'机', freq:6, anchor:'万物皆出于机，皆入于机', meaning:'万物化生之机，细微之始。'},
  {id:'hua', name:'化', freq:15, anchor:'不化者能化化', meaning:'生化、变化、自化。'},
  {id:'ming', name:'命', freq:10, anchor:'自寿自夭，自穷自达', meaning:'莫之致而至之自然。'},
  {id:'shenquan', name:'神全', freq:3, anchor:'其神全也', meaning:'纯气之守则神全。'},
  {id:'ziran', name:'自然', freq:9, anchor:'其国无师长，自然而已', meaning:'自生自化，非有主宰。'},
  {id:'weiwo', name:'为我', freq:4, anchor:'且趣当生，奚遑死后', meaning:'杨朱之学：重一己之生。'},
  {id:'chihou', name:'持后', freq:2, anchor:'顾若影，则知之', meaning:'处后不争，如影随形。'},
  {id:'chunyishouqi', name:'纯气之守', freq:2, anchor:'是纯气之守也，非智巧果敢之列'},
  {id:'xinningxingshi', name:'心凝形释', freq:1, anchor:'心凝形释，骨肉都融'}
];

// ====== 锚点验证 ======
if (fs && text) {
  function findAnchor(anchor, chIdx, global){
    if (!anchor) return -1;
    const cleanPunct = /[，。！？、；：「」『』""''\s·……—《》〈〉·,…\.\?（）]/g;
    const clean = anchor.replace(cleanPunct,'');
    const searchText = global ? text : (text.slice(chapters[chIdx-1].start, chapters[chIdx-1].start + chapters[chIdx-1].length + 200));
    const baseOffset = global ? 0 : chapters[chIdx-1].start;
    const searchClean = searchText.replace(cleanPunct,'');
    const key = clean.slice(0, Math.min(clean.length, 6));
    const idx = searchClean.indexOf(key);
    if (idx === -1) {
      const direct = text.indexOf(anchor.slice(0,15));
      return direct >= 0 ? direct : -1;
    }
    let cleanCount = 0, rawStart = -1;
    for (let i = 0; i < searchText.length; i++){
      if (cleanCount === idx) { rawStart = baseOffset + i; break; }
      if (!cleanPunct.test(searchText[i])) cleanCount++;
    }
    return rawStart;
  }
  let miss = 0;
  function check(arr, name, global){
    for (const a of arr){
      if (!a.anchor) continue;
      const pos = findAnchor(a.anchor, a.ch, global);
      if (pos === -1) { console.log('  MISS', name, a.id, a.anchor.slice(0,20)); miss++; }
      else a.charStart = pos;
    }
  }
  check(propositions,'prop');
  check(fables,'fable');
  check(analogies,'analogy');
  check(dialogues,'dialogue');
  check(concepts,'concept', true);
  console.log('《列子》标引：%d命题 / %d寓言 / %d譬喻 / %d对话 / %d概念 / %d人物 | miss:%d',
    propositions.length, fables.length, analogies.length, dialogues.length, concepts.length, people.length, miss);
}

const LIEZI_DATA = {
  bookId, bookPath, title:'列子', subtitle:'冲虚真经',
  author:'列御寇', dynasty:'周（战国郑）',
  intro:'《列子》又名《冲虚真经》，旧题周列御寇撰，晋张湛注，《汉书·艺文志》著录八篇。书以贵虚、持后、力命、自生自化为要，寓言奇诡恣肆，既与《庄子》相表里，又独擅"杞人忧天""愚公移山""歧路亡羊""伯牙知音""华胥之国"等千古名篇。今本或有晋人缀补，然其气骨高妙，终为先秦道家要籍。',
  overview:[
    '《列子》八篇，以"虚"立宗，以"化"为脉，以"命"为归。<b>天瑞</b>言宇宙生成、万物自化；<b>黄帝</b>叙至人神凝、华胥之治；<b>周穆王</b>辨觉梦形神；<b>仲尼</b>借孔颜言真乐真知；<b>汤问</b>论无极无尽、愚公之志；<b>力命</b>辩人力与天命；<b>杨朱</b>陈且趣当生；<b>说符</b>明持后慎言——从宇宙论到人生论、从政治论到名实论，体大思精。',
    '《列子》寓言密度冠诸子：全书仅万余字，而标引得二十则核心寓言、十余组譬喻对话。其中"杞人忧天"明不可知之智，"愚公移山"显至诚能动，"歧路亡羊"戒多方丧生，"伯牙钟期"伤知音难遇，"华胥梦"寄至治之思——皆成为后世文学、哲学、日常成语的源头。'
  ],
  themes:[
    {title:'本体论：不生不化·自生自化', desc:'能生化万物者自身不被生化，万物皆自生自化自形自色，没有外在主宰。'},
    {title:'宇宙论：太易→太初→太始→太素', desc:'四阶段宇宙生成论，气形质具而未离谓之浑沦，清轻者为天浊重者为地。'},
    {title:'境界论：虚静·纯气·心凝形释', desc:'学道九年内外两忘、乘风而归；纯气之守则神全，醉者坠车犹不死。'},
    {title:'命定论：自寿自夭·朕岂能识', desc:'力谓命不能制，命自谓自然而已；非有主宰之天，乃莫之致而至之命。'},
    {title:'人生论：为我·持后·且趣当生', desc:'杨朱篇重一己之生，说符篇倡处后不争；与庄子逍遥一脉，但更重"贵己"。'},
    {title:'政治论：自然无为·类无贵贱', desc:'华胥国无师长自然而治；鲍氏之子斥"天为人"，主万物齐类。'}
  ],
  chapters, propositions, fables, analogies, dialogues, people, concepts,
  stats:{
    chars: text.length||10048,
    nChapters: chapters.length,
    nPropositions: propositions.length,
    nFables: fables.length,
    nAnalogies: analogies.length,
    nDialogues: dialogues.length,
    nPeople: people.length,
    nConcepts: concepts.length
  }
};

if (typeof window !== 'undefined') window.LIEZI_DATA = LIEZI_DATA;
if (typeof module !== 'undefined') module.exports = LIEZI_DATA;
})();
