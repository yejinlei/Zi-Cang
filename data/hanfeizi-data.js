// 韩非子（孤愤/说难/五蠹核心篇）深度标引数据 v22
(function(){
const bookId = "hanfeizi";
const bookPath = "诸子/韩非子.txt";
const chapters = [{"ch": 1, "title": "孤愤", "start": 17784, "length": 1697, "summary": "法术之士与当途重臣不可两存；智术能法之士与重臣五不胜之势。"}, {"ch": 2, "title": "说难", "start": 19494, "length": 100976, "summary": "凡说之难在知所说之心；龙喉下有逆鳞不可婴；弥子瑕余桃。"}, {"ch": 3, "title": "五蠹", "start": 120484, "length": 4819, "summary": "学者/言谈者/带剑者/患御者/商工之民为五蠹；世异则事异事异则备变；守株待兔。"}];
const propositions = [{"id": "p_wuliangcun", "ch": 1, "type": "正论", "anchor": "智术之士", "text": "智术之士与当途之人不可两存", "meaning": "智术之士远见明察强毅劲直；当途之臣擅事要外内用；两不相容。", "keywords": ["法术之士", "当途"], "charStart": 17780}, {"id": "p_wubusheng", "ch": 1, "type": "正论", "anchor": "以疏远与近爱信争", "text": "法术之士五不胜之势", "meaning": "法术之士以疏远vs近爱信、新旅vs习故、反主意vs同好、轻贱vs贵重、一口vs一国——五不胜。", "keywords": ["五不胜", "孤愤"], "charStart": 18219}, {"id": "p_fabuegui", "ch": 1, "type": "正论", "anchor": "法不阿贵", "text": "法不阿贵绳不挠曲", "meaning": "法不阿贵绳不挠曲；刑过不辟大臣赏善不遗匹夫——法家平等精神。", "keywords": ["法不阿贵", "法治"], "charStart": 7667}, {"id": "p_yifa", "ch": 1, "type": "正论", "anchor": "以法治国", "text": "以法治国举措而已", "meaning": "以法治国则举措而已；绳直枉木斫准夷高科削。", "keywords": ["以法治国", "法术"], "charStart": 7657}, {"id": "p_shuonan", "ch": 2, "type": "正论", "anchor": "凡说之难", "text": "凡说之难在知所说之心", "meaning": "说服之难不在辩才而在洞察人主之心——为名高、为厚利、阴为厚利阳为名高。", "keywords": ["说难", "揣摩"], "charStart": 19490}, {"id": "p_nilin", "ch": 2, "type": "寓言", "anchor": "夫龙之为虫也", "text": "喉下有逆鳞", "meaning": "龙柔顺可骑，但喉下逆鳞径尺触之必杀；人主亦有逆鳞，说者能无婴人主逆鳞则几矣。", "keywords": ["逆龙鳞", "说术"], "charStart": 20890}, {"id": "p_miyang", "ch": 2, "type": "寓言", "anchor": "昔者弥子瑕", "text": "弥子瑕有宠于卫君", "meaning": "爱憎之变：弥子瑕窃驾君车食桃余君前，昔贤孝后罪；爱时智当加亲憎时罪当加疏。", "keywords": ["弥子瑕", "爱憎"], "charStart": 20661}, {"id": "p_bugu", "ch": 3, "type": "正论", "anchor": "圣人不期修古", "text": "圣人不期修古不法常可", "meaning": "时代变了不必法古；论世之事因为之备。", "keywords": ["不法常可", "因时变法"], "charStart": 120697}, {"id": "p_shouzhu", "ch": 3, "type": "寓言", "anchor": "宋人有耕田者", "text": "守株待兔", "meaning": "宋人守株待兔身为宋国笑；以先王之政治当世之民皆守株之类。", "keywords": ["守株待兔", "复古"], "charStart": 120718}, {"id": "p_shiyi", "ch": 3, "type": "正论", "anchor": "世异则事异", "text": "世异则事异事异则备变", "meaning": "文王行仁义王徐偃王行仁义亡——仁义用于古不用于今；当今争于气力。", "keywords": ["世异事异", "变法"], "charStart": 121376}, {"id": "p_wudu", "ch": 3, "type": "正论", "anchor": "此五者", "text": "此五者邦之蠹也", "meaning": "学者（儒）/言谈者（纵横）/带剑者（侠）/患御者（近习）/商工之民五蠹，不除则国破。", "keywords": ["五蠹", "耕战"], "charStart": 111076}, {"id": "p_gengzhan", "ch": 3, "type": "正论", "anchor": "富国以农", "text": "富国以农距敌恃卒", "meaning": "耕战为本：动作者归之于功为勇者尽之于军；儒侠商工游食须抑。", "keywords": ["耕战", "本业"], "charStart": 123125}];
const fables = [{"id": "f_nilin", "ch": 2, "title": "龙有逆鳞", "type": "寓言", "anchor": "夫龙之为虫也", "moral": "说人主不可婴其逆鳞。", "chars": ["龙"], "charStart": 20890}, {"id": "f_miyang", "ch": 2, "title": "弥子瑕余桃", "type": "寓言", "anchor": "昔者弥子瑕", "moral": "爱憎变则罪赏易，进言不可不知人主之心。", "chars": ["弥子瑕", "卫君"], "charStart": 20661}, {"id": "f_shouzhu", "ch": 3, "title": "守株待兔", "type": "寓言", "anchor": "宋人有耕田者", "moral": "因循先王之政犹守株待兔。", "chars": ["宋人"], "charStart": 120718}, {"id": "f_xuyan", "ch": 3, "title": "徐偃王行仁义", "type": "寓言", "anchor": "余偃王处汉东", "moral": "仁义用于古不用于今。", "chars": ["徐偃王"], "charStart": 121294}, {"id": "f_youchao", "ch": 3, "title": "有巢燧人", "type": "寓言", "anchor": "构木为巢以避群害", "moral": "上古圣人因民之利而王；时代变则法变。", "chars": ["有巢氏", "燧人氏"], "charStart": 120510}];
const analogies = [{"id": "a_sinan", "ch": 1, "anchor": "故先王立司南", "from": "司南端朝夕/巧匠规矩/上智法比", "to": "以法治国", "charStart": 7487}, {"id": "a_long", "ch": 2, "anchor": "夫龙之为虫也", "from": "龙之喉下逆鳞", "to": "人主逆鳞不可婴", "charStart": 20890}, {"id": "a_shouzhu", "ch": 3, "anchor": "宋人有耕田者", "from": "守株待兔", "to": "法古之愚", "charStart": 120718}, {"id": "a_xu", "ch": 3, "anchor": "余偃王处汉东", "from": "文王王偃王亡", "to": "世异事异", "charStart": 121294}, {"id": "a_gong", "ch": 3, "anchor": "共工之战", "from": "干戚/铁铦铠甲", "to": "事异备变", "charStart": 121433}];
const dialogues = [{"id": "d_fa", "ch": 1, "speaker": "韩非", "topic": "法术之士与当途重臣", "anchor": "智法之士与当涂之人", "turns": 1, "charStart": 17940}, {"id": "d_shuo", "ch": 2, "speaker": "（说者）→（人主）", "topic": "说难进言术", "anchor": "凡说之务", "turns": 1, "charStart": 20003}];
const concepts = [{"id": "c_fashu", "name": "法术", "anchor": "法术之士", "meaning": "法（成文法）+术（驭臣术）+势（权势）韩非核心体系。", "charStart": 18162}, {"id": "c_fabugui", "name": "法不阿贵", "anchor": "法不阿贵", "meaning": "法面前贵贱平等的法家精神。", "charStart": 7667}, {"id": "c_buxiugu", "name": "不法常可", "anchor": "不期修古", "meaning": "因时变法反对复古。", "charStart": 120699}, {"id": "c_shiyishiyi", "name": "世异事异", "anchor": "世异则事异", "meaning": "历史进化论时代变治道变。", "charStart": 121376}, {"id": "c_wudu", "name": "五蠹", "anchor": "此五者", "meaning": "学者/言谈者/带剑者/患御者/商工五种蛀虫。", "charStart": 111076}, {"id": "c_gengzhan", "name": "耕战", "anchor": "富国以农", "meaning": "重农重战为本抑制末业。", "charStart": 123125}, {"id": "c_nilin", "name": "逆鳞", "anchor": "喉下有逆鳞", "meaning": "人主禁忌底线不可触犯。", "charStart": 20911}, {"id": "c_shuonan", "name": "说难", "anchor": "凡说之难", "meaning": "揣摩人主心理的进言术。", "charStart": 19490}, {"id": "c_gufen", "name": "孤愤", "anchor": "智术之士", "meaning": "法术之士孤立无援的悲愤处境。", "charStart": 17780}, {"id": "c_xingshang", "name": "刑赏", "anchor": "刑过不辟大臣", "meaning": "刑无等级赏不遗匹夫的二柄论。", "charStart": 7694}];
const people = [{"id": "hanfei", "name": "韩非", "alias": ["韩非子"], "role": "核心/作者", "bio": "战国韩公子荀卿弟子；先秦法家集大成主法术势合、性恶、耕战、五蠹；使秦被李斯害死于狱。"}, {"id": "lisi", "name": "李斯", "alias": [], "role": "同门/秦相", "bio": "与韩非同师荀子法家政治家后害韩非。"}, {"id": "xunqing_h", "name": "荀卿", "alias": ["荀子"], "role": "师承", "bio": "韩非之师性恶隆礼重法。"}, {"id": "mixia", "name": "弥子瑕", "alias": [], "role": "寓言人物", "bio": "卫灵公宠臣余桃啖君故事主角。"}, {"id": "songren_h", "name": "守株宋人", "alias": [], "role": "寓言人物", "bio": "守株待兔的宋人。"}, {"id": "xuyanwang", "name": "徐偃王", "alias": [], "role": "反面例证", "bio": "行仁义而亡国的徐君。"}];

const HANFEIZI_DATA = {
  bookId, bookPath, title:"韩非子", subtitle:"韩非·先秦法家集大成·核心三章精标",
  author:"韩非", dynasty:"周（战国韩）",
  heroText:"《韩非子》是<b style=\"color:#f2d98a\">先秦法家集大成之作</b>，集商鞅「法」、申不害「术」、慎到「势」之大成。本页精标<b>孤愤/说难/五蠹</b>三篇——<b>法不阿贵、五蠹耕战、世异则事异、守株待兔、逆鳞之喻、弥子瑕余桃</b>：12命题、5寓言、5譬喻。",
  themeCss:":root{--accent:#5a3520;--hero-from:#1a1008;--hero-mid:#3a2210;--hero-to:#804020}",
  intro:"《韩非子》五十五篇，战国末韩非撰。孤愤论法术之士与当途重臣不可两存；说难论进言揣摩之术、龙有逆鳞；五蠹主历史进化、世异事异、五蠹耕战。",
  overview:[
    "韩非集成法家三派：<b>商鞅之法、申不害之术、慎到之势</b>；主张「法、术、势」三位一体，君主以法为教以吏为师抱法处势用术驭臣。",
    "历史观：<b>不期修古不法常可、世异则事异事异则备变</b>——时代进化，反对以先王之政治当世之民（守株待兔）。",
    "政治主张：<b>法不阿贵、刑过不避大臣赏善不遗匹夫</b>；重<b>耕战</b>，斥<b>五蠹</b>（儒者/纵横家/游侠/近侍/商工）。"
  ],
  themes:[
    {title:"法术势合一：法家思想体系",desc:"法（成文法度）+术（驭臣心术）+势（君主权位）三位一体。"},
    {title:"法不阿贵：法律面前平等",desc:"刑过不辟大臣赏善不遗匹夫，绳不挠曲。"},
    {title:"世异事异：历史进化变法论",desc:"不法常可因世备变，批判复古守旧。"},
    {title:"五蠹：斥儒侠商工游食",desc:"学者/言谈者/带剑者/患御者/商工为邦之蠹，唯耕战为本。"},
    {title:"说难：揣摩人主的进言术",desc:"凡说之难在知所说之心，人主有逆鳞不可婴。"},
    {title:"性恶论：人情趋利避害",desc:"继承荀子性恶，以利害赏罚二柄驭下，反仁义。"},
    {title:"寓言：守株待兔余桃逆鳞",desc:"中国寓言文学重要来源，借事说理犀利峭刻。"}
  ],
  chapters, propositions, fables, analogies, dialogues, people, concepts,
  stats:{chars:132362,nChapters:3,nPropositions:12,nFables:5,nAnalogies:5,nDialogues:2,nPeople:6,nConcepts:10}
};
if(typeof window!=="undefined") window.HANFEIZI_DATA = HANFEIZI_DATA;
if(typeof module!=="undefined") module.exports = HANFEIZI_DATA;
})();
