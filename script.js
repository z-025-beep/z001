const stages = [
  {
    title: "第一站 · 泸溪县概览",
    infoTitle: "第一站",
    infoText: "泸溪县拥有厚重的历史底蕴与丰富的乡土文化资源，是湘西地区重要的红色与文化承载地。这里既有山川地貌与民居风貌，也有鲜明的革命记忆与地方传统文化，体现了“山地、河流、民俗、红色”相互交织的地域特征。",
    progress: 25,
    mapPoints: [],
  },
  {
    title: "第二站 · 第一关 文物之旅",
    infoTitle: "第一关",
    infoText: "文物之旅聚焦泸溪县的历史文化遗存与乡土记忆，带领学习者走进代表性的镇域文化节点，感受家乡的历史脉络与人文底色。",
    progress: 50,
    mapPoints: ["潭溪镇", "武溪镇", "浦市镇·文物"],
  },
  {
    title: "第三站 · 第二关 革命之旅",
    infoTitle: "第二关",
    infoText: "革命之旅将进一步梳理泸溪县在革命时期的历史贡献、红色资源与精神传承，聚焦重要事件、人物与地域记忆。",
    progress: 75,
    mapPoints: ["浦市镇·红色", "洗溪镇", "达岚镇", "白羊溪乡"],
  },
  {
    title: "第四站 · 练一练",
    infoTitle: "练一练",
    infoText: "结合本章知识进行互动练习，巩固对泸溪县地理环境、文化资源与革命记忆的认识，为后续学习打牢基础。",
    progress: 100,
    mapPoints: [],
  },
];

let currentStage = 0;

const topbarStage = document.getElementById("topbarStage");
const routeBadge = document.getElementById("routeBadge");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pauseBtn = document.getElementById("pauseBtn");
const endBtn = document.getElementById("endBtn");

const modal = document.getElementById("detailModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const modalImage = document.getElementById("modalImage");
const imageEmptyText = document.getElementById("imageEmptyText");
const mapPoints = document.querySelectorAll(".map-point");

const quizPanel = document.getElementById("quizPanel");
const quizTypeBadge = document.getElementById("quizTypeBadge");
const quizCounter = document.getElementById("quizCounter");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");
const quizPrev = document.getElementById("quizPrev");
const quizSubmit = document.getElementById("quizSubmit");
const quizNext = document.getElementById("quizNext");

const quizQuestions = [
  {
    type: "single",
    prompt: "1935年11月，率领红五师十三团在浦市与国民党军激战并壮烈牺牲的团长是谁？",
    options: ["贺龙", "刘伯承", "刘汉卿", "萧克"],
    correct: 2,
    explanation: "1935年11月，红五师十三团团长刘汉卿率部进取泸溪浦市镇，在战斗中身负重伤，因流血过多牺牲，年仅25岁。",
  },
  {
    type: "single",
    prompt: "1949年新中国成立前夕，刘伯承、邓小平率第二野战军西进解放大西南，在泸溪县的临时指挥部设在哪座建筑中？",
    options: ["岩门古堡寨", "省心楼", "浦市陆军监狱", "李氏宗祠"],
    correct: 1,
    explanation: "省心楼位于泸溪县武溪镇，1949年刘邓大军西进时因其隐蔽性与设施条件，被选定为临时指挥部。",
  },
  {
    type: "single",
    prompt: "战国柱状甬环钮铜钲于1956年在泸溪县潭溪镇被发现，它在古代的主要用途是什么？",
    options: ["祭祀礼器", "行军乐器", "日常生活酒器", "农耕工具"],
    correct: 1,
    explanation: "铜钲为古代行军乐器，用于军队中发布信号、约束步伐，具有重要的历史文化价值。",
  },
  {
    type: "judge",
    prompt: "泸溪县第一个红色政权——浦市苏维埃政府是在1949年刘邓大军西进时成立的。",
    options: ["正确", "错误"],
    correct: 1,
    explanation: "浦市苏维埃政府于1935年4月14日正式挂牌成立，而非1949年。",
  },
  {
    type: "judge",
    prompt: "踏虎凿花是泸溪县特有的民间手工艺，其最大特点是不需要使用剪刀，只用刻刀在蜡版上凿刻图案。",
    options: ["正确", "错误"],
    correct: 0,
    explanation: "踏虎凿花源于清代乾隆年间，被誉为“不用剪刀的剪纸艺术”，并入选国家级非物质文化遗产。",
  },
  {
    type: "multiple",
    prompt: "以下哪些红色遗址或遗存位于泸溪县浦市镇？（可多选）",
    options: ["贺龙井", "浦市陆军监狱", "省心楼", "将军柳"],
    correct: [0, 1, 3],
    explanation: "贺龙井、将军柳均为贺龙驻防浦市时留下的红色遗存；浦市陆军监狱位于浦市镇吉家头。省心楼位于武溪镇。",
  },
  {
    type: "multiple",
    prompt: "以下哪些文物或古建筑属于泸溪县浦市镇的文化遗产？（可多选）",
    options: ["李家书院", "吉家大院", "战国柱状甬环钮铜钲", "万寿宫"],
    correct: [0, 1, 3],
    explanation: "李家书院、吉家大院、万寿宫均位于浦市镇。战国柱状甬环钮铜钲出土于潭溪镇。",
  },
  {
    type: "multiple",
    prompt: "以下哪些属于泸溪县的国家级非物质文化遗产？（可多选）",
    options: ["辰河高腔", "踏虎凿花", "苗族数纱", "马王溪土陶"],
    correct: [0, 1],
    explanation: "辰河高腔和踏虎凿花均为国家级非物质文化遗产；苗族数纱为省级，马王溪土陶为州级。",
  },
  {
    type: "multiple",
    prompt: "以下泸溪籍英雄人物中，哪些曾参与抗日战争？（可多选）",
    options: ["杨元丞", "符隆前", "李代相", "姚鉴雪"],
    correct: [0, 1, 3],
    explanation: "杨元丞是泸溪籍空军英雄，符隆前参加了常德会战，姚鉴雪在抗战时期从事地下革命工作。李代相为抗美援朝英雄。",
  },
  {
    type: "multiple",
    prompt: "以下关于姚鉴雪烈士的表述，正确的有哪些？（可多选）",
    options: ["她是泸溪县浦市镇人", "她是中国共产党党员", "被捕后她供出了地下党员名单", "她被誉为湘西“秋瑾式”女杰"],
    correct: [0, 1, 3],
    explanation: "姚鉴雪是泸溪县浦市镇人，中国共产党党员。她被捕后始终坚贞不屈，没有泄露任何组织信息，并被誉为湘西“秋瑾式”女杰。",
  },
];

let currentQuizIndex = 0;
let currentQuizSelection = null;
let multipleSelections = [];
let quizSubmitted = false;

const hotspotContent = {
  "潭溪镇": [
    {
      title: "战国柱状甬环钮铜钲",
      image: "潭溪镇-铜钲 (2).jpg",
      text:
        "战国时期青铜乐器。1956年7月，泸溪县潭溪镇大陂流村村民向子好在大吉坳山边水井旁发现，后上交泸溪县文化科保存，1971年调拨入湘西土家族苗族自治州博物馆收藏。\n\n通高42厘米，重4.2千克。钲腔呈圆筒形，腔内有四条音脊，柄如圆柱，有一道凸弦纹，柄端扩大似座，座内有桥形纽。\n\n铜钲为古代行军乐器，用于军队中发布信号、约束步伐，并常用于祭祀与宴乐。该钲为一套九件之一，1990年经中央艺术研究院测音，至今仍可敲击出完整乐曲，现为国家一级文物。",
    },
  ],
  "武溪镇": [
    {
      title: "明梅花犀牛角杯",
      image: "武溪镇-明梅花犀牛角杯 (2).jpg",
      text:
        "明代酒器。1971年从泸溪县武溪镇居委会征集入藏，现藏于湘西土家族苗族自治州博物馆。\n\n通高4.5厘米，重100克。杯呈荷叶形，小椭圆形底，敞口，呈棕红色，光洁莹润。通体雕刻缠枝梅花，工艺精致，细节逼真。\n\n犀牛角材质在古代被认为具有清热、凉血、定惊、解毒等药用价值，故常用于制作酒器。此杯因犀牛角材质珍稀，雕工精细且寓意高洁，具有较高的文物价值。",
    },
  ],
  "浦市镇·文物": [
    {
      title: "李氏宗祠",
      image: "浦市镇-李氏宗祠 (2).jpg",
      text:
        "李氏宗祠是泸溪县浦市镇传统家族文化与宗族记忆的重要载体，体现了当地乡土社会的祠堂礼制、家族组织与民间信仰体系。\n\n祠堂不仅是祭祖场所，也是村落政治、伦理与文化活动的重要中心，对研究当地社会组织及民俗传统具有重要价值。",
    },
    {
      title: "吉家大院",
      image: "浦市镇-吉家大院.jpg",
      text:
        "吉家大院是浦市镇典型的古民居建筑群，集中体现了湘西地区传统民居布局、砖木结构及地方生活文化。\n\n其空间层次清晰、院落工整，反映了当地世家大族在经济、社会与文化方面的影响力，是文物之旅中重要的乡土建筑节点。",
    },
    {
      title: "万寿宫",
      image: "浦市镇-万寿宫.jpg",
      text:
        "万寿宫作为浦市镇的宗教建筑与民俗场所，承载了当地居民的信仰、节庆与乡约传统。\n\n其建筑形式与祭祀活动体现出泸溪地方文化中“民俗—信仰—生活”相互交织的特点，是后续文化学习的重要文物点位。",
    },
  ],
  "浦市镇·红色": [
    {
      title: "红十三团浦市激战",
      image: "浦市镇-红十三团浦市激战.jpg",
      text:
        "1935年11月，贺龙、任弼时、关向应、萧克、王震率领红二、六军团开始长征作战略转移。红五师十三团在团长刘汉卿率领下，于11月27日占领辰溪县城，随后进军泸溪浦市。\n\n红军分别在红土溪和浦市等地与国民党十九师李觉部展开激战。战斗期间，红军打开当地土豪粮仓分给百姓，深得民众支持。刘汉卿团长在战斗中身负重伤，浦溪村贫苦农民宋福林、刘板喜抬着他急走20里送往辰溪县城医治，终因流血过多抢救无效，壮烈牺牲，年仅25岁。\n\n这场激战不仅是泸溪红色革命的重要节点，也体现了红军与人民群众血肉相连的革命精神。",
    },
    {
      title: "贺龙驻防浦市",
      image: "浦市镇-贺龙驻防浦市.jpg",
      text:
        "上世纪二十年代初，贺龙曾多次进驻湘西泸溪县的浦市、白羊溪和小章等地。驻防期间，他创办女校、赈济灾民、开启民智，留下了贺龙井、将军柳等红色遗存。\n\n大革命失败后，当地以女校校长杨逸梅和恋人共产党员向泓毅等一大批底层劳苦大众迅速成长觉醒，积极开展工作，配合回湘西的贺龙与红军行动。泸溪县辰河高腔传习所据此创作了大型辰河高腔现代戏《贺龙井畔朵朵莲》。\n\n这一段历史说明，浦市不仅是战场，也是湘西革命文化的发源地之一。",
    },
    {
      title: "姚鉴雪烈士事迹",
      image: "浦市镇-姚鉴雪烈士事迹.jpg",
      text:
        "抗战时期，泸溪作为后方重镇，大量学校、机关迁入，中共地下党组织蓬勃发展。姚鉴雪冲破旧社会对女性的束缚，投身地下革命工作。\n\n她走上街头向底层民众宣传抗日救国道理，穿梭沅水两岸，在夜色掩护下秘密传递地下党组织情报。国民党当局大肆搜捕共产党人，姚鉴雪不幸被捕。敌人动用酷刑逼迫她供出地下党员名单，威逼利诱，劝其投降。\n\n面对折磨，她始终咬紧牙关，没有泄露任何组织信息，最终英勇就义。她也是泸溪早期革命斗争中极具代表性的女性英烈。",
    },
  ],
  "洗溪镇": [
    {
      title: "符隆前与能滩吊桥",
      image: "洗溪镇-符隆前.jpg",
      text:
        "符隆前，泸溪县洗溪镇峒头寨村人，1923年4月出生。18岁应征入伍，所属部队为国民革命军第73军77师229团炮兵连，担任下士副班长。\n\n他经历了抗日战争中最艰苦的四年，全程参与著名的常德会战。1949年，他守卫能滩吊桥，保障解放军二野刘邓大军顺利过桥入川。能滩吊桥由著名科学家周光召的父亲周凤九先生设计，于1938年建成通车。\n\n符隆前的事迹体现了湘西军民在国土保卫中的责任与奉献，也让洗溪镇成为一段重要的抗战与解放战争记忆地。",
    },
  ],
  "达岚镇": [
    {
      title: "常永禄烈士与岩门古堡寨",
      image: "达岚镇-常永禄烈士与岩门古寨堡.jpg",
      text:
        "常永禄，原松江省依兰县永发区人。1949年底，47军139师416团一部进驻泸溪县达岚镇岩门古堡寨，围剿盘踞在达岚、石榴坪、兴隆场一带的国民党暂编第九师徐汉章匪部。\n\n常永禄是随解放军先头部队来达岚打前站的侦察班长，虽个头仅一米六多，但生得短小精悍、身体结实。他很会做群众工作，一有空闲就帮助附近群众生产劳作、挑水扫地。\n\n1950年夏，在一次清剿残匪的战斗中，常永禄冲锋在前，不幸被流弹击中负伤。因时值盛夏、天气炎热潮湿，加之缺医少药，伤口感染恶化，最终牺牲。当地群众为其擦拭身体、换上新军装，岩门古堡寨成为他的英雄纪念地。",
    },
  ],
  "白羊溪乡": [
    {
      title: "杨元丞空中勇士",
      image: "白羊溪乡-杨元丞空中勇士.jpg",
      text:
        "杨元丞，泸溪县白羊溪乡青年。1937年，他弃教从戎，考入杭州笕桥航校第八期并提前毕业。此后，他屡次驾机迎战日寇，是泸溪县走出的抗日航空英雄。\n\n在民族危亡之际，杨元丞以血肉之躯与勇气护卫祖国领空。白羊溪乡作为他的籍贯地，成为纪念红色与抗日精神的重要文化节点。\n\n他的事迹不仅体现了泸溪人与国共难的爱国情怀，也提醒后人铭记那些在战火中守护祖国天空的青年英烈。",
    },
  ],
};

let activeHotspotName = "";
let activeHotspotIndex = 0;

function renderQuiz() {
  const question = quizQuestions[currentQuizIndex];
  if (!question) return;

  const questionLabel =
    question.type === "single"
      ? "单选题"
      : question.type === "judge"
        ? "判断题"
        : "多选题";

  quizTypeBadge.textContent = questionLabel;
  quizCounter.textContent = `${currentQuizIndex + 1} / ${quizQuestions.length}`;
  quizQuestion.textContent = question.prompt;
  quizResult.textContent = "";
  quizSubmitted = false;

  if (question.type === "multiple") {
    multipleSelections = [];
  } else {
    currentQuizSelection = null;
  }

  quizOptions.innerHTML = "";
  question.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.type = "button";
    optionBtn.className = "quiz-option";
    optionBtn.textContent = option;

    if (question.type === "multiple") {
      optionBtn.addEventListener("click", () => {
        if (!quizSubmitted) {
          const existingIndex = multipleSelections.indexOf(index);
          if (existingIndex >= 0) {
            multipleSelections.splice(existingIndex, 1);
          } else {
            multipleSelections.push(index);
          }
          renderQuizSelectionState();
        }
      });
    } else {
      optionBtn.addEventListener("click", () => {
        if (!quizSubmitted) {
          currentQuizSelection = index;
          renderQuizSelectionState();
        }
      });
    }

    quizOptions.appendChild(optionBtn);
  });

  renderQuizSelectionState();
}

function renderQuizSelectionState() {
  const question = quizQuestions[currentQuizIndex];
  if (!question) return;

  Array.from(quizOptions.children).forEach((button, index) => {
    button.classList.remove("selected", "correct", "wrong");

    if (question.type === "multiple") {
      if (multipleSelections.includes(index)) {
        button.classList.add("selected");
      }
    } else if (currentQuizSelection === index) {
      button.classList.add("selected");
    }

    if (quizSubmitted) {
      const isCorrect =
        question.type === "multiple"
          ? question.correct.includes(index)
          : index === question.correct;
      if (isCorrect) {
        button.classList.add("correct");
      } else if (
        question.type === "multiple"
          ? multipleSelections.includes(index)
          : currentQuizSelection === index
      ) {
        button.classList.add("wrong");
      }
    }
  });
}

function submitCurrentQuizQuestion() {
  const question = quizQuestions[currentQuizIndex];
  if (!question) return;

  if (question.type === "multiple") {
    if (multipleSelections.length === 0) {
      quizResult.textContent = "请至少选择一个选项后再提交。";
      return;
    }
  } else if (currentQuizSelection === null || currentQuizSelection === undefined) {
    quizResult.textContent = "请先选择一个答案再提交。";
    return;
  }

  const isCorrect =
    question.type === "multiple"
      ? JSON.stringify([...multipleSelections].sort()) === JSON.stringify([...question.correct].sort())
      : currentQuizSelection === question.correct;

  quizSubmitted = true;
  renderQuizSelectionState();
  quizResult.textContent = `${isCorrect ? "回答正确。" : "回答错误。"} ${question.explanation}`;
}

function renderStage() {
  const stage = stages[currentStage];
  topbarStage.textContent = "";

  if (currentStage === 1) {
    routeBadge.textContent = "文物之旅";
    routeBadge.classList.remove("hidden");
  } else if (currentStage === 2) {
    routeBadge.textContent = "革命之旅";
    routeBadge.classList.remove("hidden");
  } else {
    routeBadge.textContent = "";
    routeBadge.classList.add("hidden");
  }

  infoTitle.textContent = "";
  infoText.textContent = stage.infoText;
  progressBar.style.width = `${stage.progress}%`;
  progressLabel.textContent = `${currentStage + 1} / ${stages.length}`;

  mapPoints.forEach((point) => {
    const visible = stage.mapPoints.includes(point.dataset.name);
    point.style.display = visible ? "block" : "none";
  });

  const isQuizStage = currentStage === 3;
  quizPanel.classList.toggle("hidden", !isQuizStage);

  if (isQuizStage) {
    currentQuizIndex = 0;
    quizSubmitted = false;
    renderQuiz();
  }
}

prevBtn.addEventListener("click", () => {
  currentStage = Math.max(0, currentStage - 1);
  renderStage();
});

nextBtn.addEventListener("click", () => {
  currentStage = Math.min(stages.length - 1, currentStage + 1);
  renderStage();
});

pauseBtn.addEventListener("click", () => {
  pauseBtn.textContent = pauseBtn.textContent === "暂停" ? "继续" : "暂停";
});

endBtn.addEventListener("click", () => {
  alert("课程结束：后续可接入总结页或返回首页。 ");
});

quizPrev.addEventListener("click", () => {
  if (currentQuizIndex > 0) {
    currentQuizIndex -= 1;
    quizSubmitted = false;
    renderQuiz();
  }
});

quizSubmit.addEventListener("click", () => {
  submitCurrentQuizQuestion();
});

quizNext.addEventListener("click", () => {
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex += 1;
    renderQuiz();
  }
});

function renderHotspotRecord() {
  if (!activeHotspotName) return;

  const records = hotspotContent[activeHotspotName] || [{ title: activeHotspotName, image: "assets/placeholder-hotspot.svg", text: "该地点的介绍内容待补充。" }];
  const record = records[activeHotspotIndex] || records[0];

  modalTitle.textContent = record.title;
  modalText.textContent = record.text || "该地点的介绍内容待补充。";

  if (record.image) {
    modalImage.onload = () => {
      modalImage.style.display = "block";
      modalImage.style.width = "auto";
      modalImage.style.height = "auto";
      modalImage.style.maxWidth = "100%";
      modalImage.style.maxHeight = "320px";
      imageEmptyText.style.display = "none";
    };
    modalImage.src = record.image;
    modalImage.alt = record.title;
    imageEmptyText.style.display = "none";
  } else {
    modalImage.removeAttribute("src");
    modalImage.style.display = "none";
    imageEmptyText.style.display = "flex";
  }
}

document.querySelectorAll(".map-point").forEach((point) => {
  point.addEventListener("click", () => {
    const name = point.dataset.name;
    activeHotspotName = name;
    activeHotspotIndex = 0;
    renderHotspotRecord();
    modal.classList.add("show");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

modalPrev.addEventListener("click", () => {
  if (!activeHotspotName) return;
  const records = hotspotContent[activeHotspotName] || [{ title: activeHotspotName, image: "assets/placeholder-hotspot.svg", text: "该地点的介绍内容待补充。" }];
  activeHotspotIndex = (activeHotspotIndex - 1 + records.length) % records.length;
  renderHotspotRecord();
});

modalNext.addEventListener("click", () => {
  if (!activeHotspotName) return;
  const records = hotspotContent[activeHotspotName] || [{ title: activeHotspotName, image: "assets/placeholder-hotspot.svg", text: "该地点的介绍内容待补充。" }];
  activeHotspotIndex = (activeHotspotIndex + 1) % records.length;
  renderHotspotRecord();
});

renderStage();
