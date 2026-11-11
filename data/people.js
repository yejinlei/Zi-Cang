// 诸子人物传承关系数据
window.PEOPLE_DATA = {
  nodes: [
    // 儒家
    {id:"kongzi", name:"孔子", school:"rujia", era:"-551~-479", role:"儒家始祖", work:"论语", pos:[-380,-120]},
    {id:"zengzi", name:"曾子", school:"rujia", era:"-505~-435", role:"孔子弟子", work:"大学/孝经", pos:[-440,-40]},
    {id:"zisi", name:"子思", school:"rujia", era:"-483~-402", role:"曾子弟子", work:"中庸", pos:[-410,40]},
    {id:"mengzi", name:"孟子", school:"rujia", era:"-372~-289", role:"子思再传", work:"孟子", pos:[-380,120]},
    {id:"xunzi", name:"荀子", school:"rujia", era:"-313~-238", role:"儒家别宗", work:"荀子", pos:[-280,180]},
    {id:"zigong", name:"子贡", school:"rujia", era:"-520~-446", role:"孔门十哲", work:"", pos:[-320,-120]},
    {id:"ziyou", name:"子游", school:"rujia", era:"-506~-443", role:"孔门十哲", work:"", pos:[-440,-120]},
    {id:"zixia", name:"子夏", school:"rujia", era:"-507~-400", role:"孔门十哲", work:"", pos:[-480,-60]},
    
    // 道家
    {id:"laozi", name:"老子", school:"daojia", era:"-571~-471", role:"道家始祖", work:"道德经", pos:[380,-120]},
    {id:"guanzi_yin", name:"关尹", school:"daojia", era:"春秋", role:"老子弟子", work:"关尹子", pos:[440,-40]},
    {id:"liezi", name:"列子", school:"daojia", era:"-450~-375", role:"关尹弟子", work:"列子", pos:[410,40]},
    {id:"zhuangzi", name:"庄子", school:"daojia", era:"-369~-286", role:"道家大宗", work:"庄子", pos:[380,120]},
    {id:"wenzi", name:"文子", school:"daojia", era:"春秋", role:"老子弟子", work:"文子", pos:[460,-120]},
    {id:"heguanzi", name:"鹖冠子", school:"daojia", era:"战国", role:"道家隐者", work:"鹖冠子", pos:[320,180]},
    
    // 法家
    {id:"zichan", name:"子产", school:"fajia", era:"-580~-522", role:"法家先驱", work:"", pos:[-180,-180]},
    {id:"li kui", name:"李悝", school:"fajia", era:"-455~-395", role:"变法先驱", work:"法经", pos:[-200,-100]},
    {id:"wuchi", name:"吴起", school:"fajia", era:"-440~-381", role:"兵家转法家", work:"吴子", pos:[-180,-20]},
    {id:"shangyang", name:"商鞅", school:"fajia", era:"-390~-338", role:"法家变法", work:"商君书", pos:[-200,60]},
    {id:"shenbuhai", name:"申不害", school:"fajia", era:"-385~-337", role:"术治派", work:"申子", pos:[-120,40]},
    {id:"shendao", name:"慎到", school:"fajia", era:"-395~-315", role:"势治派", work:"慎子", pos:[-120,100]},
    {id:"hanfei", name:"韩非", school:"fajia", era:"-280~-233", role:"法家集大成", work:"韩非子", pos:[-220,160]},
    {id:"lisi", name:"李斯", school:"fajia", era:"-284~-208", role:"韩非同学", work:"谏逐客书", pos:[-150,200]},
    
    // 墨家
    {id:"mozi", name:"墨子", school:"mojia", era:"-468~-376", role:"墨家始祖", work:"墨子", pos:[200,-120]},
    {id:"qin huali", name:"禽滑厘", school:"mojia", era:"战国", role:"墨子弟子", work:"", pos:[180,-40]},
    {id:"mengsheng", name:"孟胜", school:"mojia", era:"战国", role:"墨家巨子", work:"", pos:[220,-40]},
    
    // 兵家
    {id:"sunwu", name:"孙武", school:"bingjia", era:"-545~-470", role:"兵圣", work:"孙子兵法", pos:[-40,220]},
    {id:"sunbin", name:"孙膑", school:"bingjia", era:"-380~-320", role:"孙武后人", work:"孙膑兵法", pos:[-120,240]},
    {id:"wuqi_b", name:"吴起", school:"bingjia", era:"-440~-381", role:"兵法家", work:"吴子", pos:[-60,180]},
    
    // 名家
    {id:"dengxi", name:"邓析", school:"mingjia", era:"-545~-501", role:"名家先驱", work:"邓析子", pos:[120,-180]},
    {id:"huishi", name:"惠施", school:"mingjia", era:"-370~-310", role:"合同异派", work:"历物十事", pos:[150,-100]},
    {id:"gongsunlong", name:"公孙龙", school:"mingjia", era:"-320~-250", role:"离坚白派", work:"公孙龙子", pos:[180,60]},
    
    // 其他
    {id:"zouyan", name:"邹衍", school:"yinyangjia", era:"-305~-240", role:"阴阳家集大成", work:"邹子", pos:[0,-220]},
    {id:"xuxing", name:"许行", school:"nongjia", era:"战国", role:"农家代表", work:"神农", pos:[-420,-220]},
    {id:"suqin", name:"苏秦", school:"zonghengjia", era:"-337~-284", role:"合纵家", work:"苏子", pos:[420,-220]},
    {id:"zhangyi", name:"张仪", school:"zonghengjia", era:"-378~-309", role:"连横家", work:"张子", pos:[360,-220]},
    {id:"guiguzi", name:"鬼谷子", school:"zonghengjia", era:"战国", role:"纵横家鼻祖", work:"鬼谷子", pos:[480,-160]},
    {id:"lvbuwei", name:"吕不韦", school:"zajia", era:"-292~-235", role:"杂家代表", work:"吕氏春秋", pos:[0,240]},
  ],
  // 师承/影响关系
  links: [
    // 儒家师承链
    {source:"kongzi",target:"zengzi",rel:"弟子"},
    {source:"kongzi",target:"zigong",rel:"弟子"},
    {source:"kongzi",target:"ziyou",rel:"弟子"},
    {source:"kongzi",target:"zixia",rel:"弟子"},
    {source:"zengzi",target:"zisi",rel:"弟子"},
    {source:"zisi",target:"mengzi",rel:"再传"},
    {source:"kongzi",target:"xunzi",rel:"传承"},
    {source:"xunzi",target:"hanfei",rel:"弟子"},
    {source:"xunzi",target:"lisi",rel:"弟子"},
    // 道家
    {source:"laozi",target:"guanzi_yin",rel:"传经"},
    {source:"laozi",target:"wenzi",rel:"弟子"},
    {source:"guanzi_yin",target:"liezi",rel:"传承"},
    {source:"laozi",target:"zhuangzi",rel:"私淑"},
    {source:"zhuangzi",target:"heguanzi",rel:"影响"},
    // 法家
    {source:"zichan",target:"li kui",rel:"先驱"},
    {source:"li kui",target:"wuchi",rel:"影响"},
    {source:"li kui",target:"shangyang",rel:"传承"},
    {source:"shangyang",target:"hanfei",rel:"集大成"},
    {source:"shenbuhai",target:"hanfei",rel:"集成"},
    {source:"shendao",target:"hanfei",rel:"集成"},
    // 墨家
    {source:"mozi",target:"qin huali",rel:"弟子"},
    {source:"mozi",target:"mengsheng",rel:"巨子"},
    // 兵家
    {source:"sunwu",target:"sunbin",rel:"后人"},
    {source:"wuchi",target:"wuqi_b",rel:"同"},
    // 名家
    {source:"dengxi",target:"huishi",rel:"先驱"},
    {source:"huishi",target:"zhuangzi",rel:"论敌/友"},
    {source:"dengxi",target:"gongsunlong",rel:"先驱"},
    // 纵横家
    {source:"guiguzi",target:"suqin",rel:"弟子"},
    {source:"guiguzi",target:"zhangyi",rel:"弟子"},
    // 跨学派
    {source:"laozi",target:"hanfei",rel:"解老喻老"},
    {source:"zixia",target:"li kui",rel:"弟子(西河学派)"},
    {source:"zixia",target:"wuchi",rel:"弟子"},
    {source:"kongzi",target:"mozi",rel:"反儒"},
  ]
};
