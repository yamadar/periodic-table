import './style.css';

// ── element data ────────────────────────────────────────────────────────
// {n, sym, name, jp, mass, cat, r, c, cfg, disc, by, phase, density?, mp?, bp?, use}
const E = [
{n:1,sym:"H",name:"Hydrogen",jp:"水素",mass:1.008,cat:"nonmetal",r:1,c:1,cfg:"1s¹",disc:1766,by:"H. Cavendish",phase:"gas",mp:-259,bp:-253,use:"燃料・アンモニア合成・宇宙の70%を占める"},
{n:2,sym:"He",name:"Helium",jp:"ヘリウム",mass:4.003,cat:"noble",r:1,c:18,cfg:"1s²",disc:1868,by:"P. Janssen",phase:"gas",mp:-272,bp:-269,use:"気球・MRI冷却・恒星核融合の産物"},
{n:3,sym:"Li",name:"Lithium",jp:"リチウム",mass:6.94,cat:"alkali",r:2,c:1,cfg:"[He]2s¹",disc:1817,by:"J.A. Arfvedson",phase:"solid",mp:181,bp:1342,use:"電池・精神薬・最軽量金属"},
{n:4,sym:"Be",name:"Beryllium",jp:"ベリリウム",mass:9.012,cat:"alkaline",r:2,c:2,cfg:"[He]2s²",disc:1798,by:"L. Vauquelin",phase:"solid",mp:1287,bp:2469,use:"宇宙望遠鏡鏡・X線窓"},
{n:5,sym:"B",name:"Boron",jp:"ホウ素",mass:10.81,cat:"metalloid",r:2,c:13,cfg:"[He]2s²2p¹",disc:1808,by:"H. Davy",phase:"solid",mp:2076,bp:3927,use:"ガラス・洗剤・半導体"},
{n:6,sym:"C",name:"Carbon",jp:"炭素",mass:12.011,cat:"nonmetal",r:2,c:14,cfg:"[He]2s²2p²",disc:-3750,by:"prehistoric",phase:"solid",mp:3550,bp:4027,use:"全有機生命の基盤・ダイヤ・グラフェン"},
{n:7,sym:"N",name:"Nitrogen",jp:"窒素",mass:14.007,cat:"nonmetal",r:2,c:15,cfg:"[He]2s²2p³",disc:1772,by:"D. Rutherford",phase:"gas",mp:-210,bp:-196,use:"大気78%・肥料・冷却"},
{n:8,sym:"O",name:"Oxygen",jp:"酸素",mass:15.999,cat:"nonmetal",r:2,c:16,cfg:"[He]2s²2p⁴",disc:1774,by:"J. Priestley",phase:"gas",mp:-218,bp:-183,use:"呼吸・燃焼・地殻最多元素"},
{n:9,sym:"F",name:"Fluorine",jp:"フッ素",mass:18.998,cat:"halogen",r:2,c:17,cfg:"[He]2s²2p⁵",disc:1886,by:"H. Moissan",phase:"gas",mp:-220,bp:-188,use:"歯磨き粉・テフロン・最強電気陰性度"},
{n:10,sym:"Ne",name:"Neon",jp:"ネオン",mass:20.180,cat:"noble",r:2,c:18,cfg:"[He]2s²2p⁶",disc:1898,by:"W. Ramsay",phase:"gas",mp:-249,bp:-246,use:"ネオン管・赤橙色発光"},
{n:11,sym:"Na",name:"Sodium",jp:"ナトリウム",mass:22.990,cat:"alkali",r:3,c:1,cfg:"[Ne]3s¹",disc:1807,by:"H. Davy",phase:"solid",mp:98,bp:883,use:"食塩・街灯・神経伝達"},
{n:12,sym:"Mg",name:"Magnesium",jp:"マグネシウム",mass:24.305,cat:"alkaline",r:3,c:2,cfg:"[Ne]3s²",disc:1755,by:"J. Black",phase:"solid",mp:650,bp:1090,use:"葉緑素・軽合金・花火"},
{n:13,sym:"Al",name:"Aluminium",jp:"アルミニウム",mass:26.982,cat:"post",r:3,c:13,cfg:"[Ne]3s²3p¹",disc:1825,by:"H.C. Ørsted",phase:"solid",mp:660,bp:2470,use:"航空機・缶・地殻3位"},
{n:14,sym:"Si",name:"Silicon",jp:"ケイ素",mass:28.085,cat:"metalloid",r:3,c:14,cfg:"[Ne]3s²3p²",disc:1824,by:"J. Berzelius",phase:"solid",mp:1414,bp:3265,use:"半導体・ガラス・地殻2位"},
{n:15,sym:"P",name:"Phosphorus",jp:"リン",mass:30.974,cat:"nonmetal",r:3,c:15,cfg:"[Ne]3s²3p³",disc:1669,by:"H. Brand",phase:"solid",mp:44,bp:280,use:"DNA・肥料・マッチ"},
{n:16,sym:"S",name:"Sulfur",jp:"硫黄",mass:32.06,cat:"nonmetal",r:3,c:16,cfg:"[Ne]3s²3p⁴",disc:-2000,by:"prehistoric",phase:"solid",mp:115,bp:445,use:"火薬・ゴム加硫・タンパク質"},
{n:17,sym:"Cl",name:"Chlorine",jp:"塩素",mass:35.45,cat:"halogen",r:3,c:17,cfg:"[Ne]3s²3p⁵",disc:1774,by:"C.W. Scheele",phase:"gas",mp:-102,bp:-34,use:"漂白・消毒・PVC"},
{n:18,sym:"Ar",name:"Argon",jp:"アルゴン",mass:39.948,cat:"noble",r:3,c:18,cfg:"[Ne]3s²3p⁶",disc:1894,by:"L. Rayleigh",phase:"gas",mp:-189,bp:-186,use:"白熱電球・溶接保護"},
{n:19,sym:"K",name:"Potassium",jp:"カリウム",mass:39.098,cat:"alkali",r:4,c:1,cfg:"[Ar]4s¹",disc:1807,by:"H. Davy",phase:"solid",mp:64,bp:759,use:"肥料・神経伝達・ナトリウムポンプ"},
{n:20,sym:"Ca",name:"Calcium",jp:"カルシウム",mass:40.078,cat:"alkaline",r:4,c:2,cfg:"[Ar]4s²",disc:1808,by:"H. Davy",phase:"solid",mp:842,bp:1484,use:"骨・歯・セメント"},
{n:21,sym:"Sc",name:"Scandium",jp:"スカンジウム",mass:44.956,cat:"transition",r:4,c:3,cfg:"[Ar]3d¹4s²",disc:1879,by:"L.F. Nilson",phase:"solid",mp:1541,bp:2836,use:"航空機合金・水銀灯"},
{n:22,sym:"Ti",name:"Titanium",jp:"チタン",mass:47.867,cat:"transition",r:4,c:4,cfg:"[Ar]3d²4s²",disc:1791,by:"W. Gregor",phase:"solid",mp:1668,bp:3287,use:"航空・医療インプラント・白色顔料"},
{n:23,sym:"V",name:"Vanadium",jp:"バナジウム",mass:50.942,cat:"transition",r:4,c:5,cfg:"[Ar]3d³4s²",disc:1801,by:"A.M. del Río",phase:"solid",mp:1910,bp:3407,use:"鋼合金・触媒"},
{n:24,sym:"Cr",name:"Chromium",jp:"クロム",mass:51.996,cat:"transition",r:4,c:6,cfg:"[Ar]3d⁵4s¹",disc:1797,by:"L. Vauquelin",phase:"solid",mp:1907,bp:2671,use:"ステンレス・メッキ・顔料"},
{n:25,sym:"Mn",name:"Manganese",jp:"マンガン",mass:54.938,cat:"transition",r:4,c:7,cfg:"[Ar]3d⁵4s²",disc:1774,by:"J.G. Gahn",phase:"solid",mp:1246,bp:2061,use:"鋼鉄・電池・酸素発生"},
{n:26,sym:"Fe",name:"Iron",jp:"鉄",mass:55.845,cat:"transition",r:4,c:8,cfg:"[Ar]3d⁶4s²",disc:-3500,by:"prehistoric",phase:"solid",mp:1538,bp:2861,use:"鋼鉄・血液ヘモグロビン・地球核"},
{n:27,sym:"Co",name:"Cobalt",jp:"コバルト",mass:58.933,cat:"transition",r:4,c:9,cfg:"[Ar]3d⁷4s²",disc:1735,by:"G. Brandt",phase:"solid",mp:1495,bp:2927,use:"青色顔料・磁石・電池"},
{n:28,sym:"Ni",name:"Nickel",jp:"ニッケル",mass:58.693,cat:"transition",r:4,c:10,cfg:"[Ar]3d⁸4s²",disc:1751,by:"A.F. Cronstedt",phase:"solid",mp:1455,bp:2913,use:"硬貨・ステンレス・電池"},
{n:29,sym:"Cu",name:"Copper",jp:"銅",mass:63.546,cat:"transition",r:4,c:11,cfg:"[Ar]3d¹⁰4s¹",disc:-9000,by:"prehistoric",phase:"solid",mp:1085,bp:2562,use:"電線・配管・青銅"},
{n:30,sym:"Zn",name:"Zinc",jp:"亜鉛",mass:65.38,cat:"transition",r:4,c:12,cfg:"[Ar]3d¹⁰4s²",disc:1746,by:"A.S. Marggraf",phase:"solid",mp:420,bp:907,use:"メッキ・真鍮・必須栄養素"},
{n:31,sym:"Ga",name:"Gallium",jp:"ガリウム",mass:69.723,cat:"post",r:4,c:13,cfg:"[Ar]3d¹⁰4s²4p¹",disc:1875,by:"P. Lecoq",phase:"solid",mp:30,bp:2204,use:"LED・半導体・体温で融解"},
{n:32,sym:"Ge",name:"Germanium",jp:"ゲルマニウム",mass:72.630,cat:"metalloid",r:4,c:14,cfg:"[Ar]3d¹⁰4s²4p²",disc:1886,by:"C.A. Winkler",phase:"solid",mp:938,bp:2833,use:"光ファイバー・赤外光学"},
{n:33,sym:"As",name:"Arsenic",jp:"ヒ素",mass:74.922,cat:"metalloid",r:4,c:15,cfg:"[Ar]3d¹⁰4s²4p³",disc:1250,by:"Albertus Magnus",phase:"solid",mp:817,bp:614,use:"半導体・古典毒・木材保存"},
{n:34,sym:"Se",name:"Selenium",jp:"セレン",mass:78.971,cat:"nonmetal",r:4,c:16,cfg:"[Ar]3d¹⁰4s²4p⁴",disc:1817,by:"J. Berzelius",phase:"solid",mp:221,bp:685,use:"光電池・コピー機・必須微量元素"},
{n:35,sym:"Br",name:"Bromine",jp:"臭素",mass:79.904,cat:"halogen",r:4,c:17,cfg:"[Ar]3d¹⁰4s²4p⁵",disc:1826,by:"A.J. Balard",phase:"liquid",mp:-7,bp:59,use:"難燃剤・水銀以外で唯一の常温液体非金属"},
{n:36,sym:"Kr",name:"Krypton",jp:"クリプトン",mass:83.798,cat:"noble",r:4,c:18,cfg:"[Ar]3d¹⁰4s²4p⁶",disc:1898,by:"W. Ramsay",phase:"gas",mp:-157,bp:-153,use:"高輝度照明・かつて1mの定義"},
{n:37,sym:"Rb",name:"Rubidium",jp:"ルビジウム",mass:85.468,cat:"alkali",r:5,c:1,cfg:"[Kr]5s¹",disc:1861,by:"R. Bunsen",phase:"solid",mp:39,bp:688,use:"原子時計・特殊ガラス"},
{n:38,sym:"Sr",name:"Strontium",jp:"ストロンチウム",mass:87.62,cat:"alkaline",r:5,c:2,cfg:"[Kr]5s²",disc:1790,by:"A. Crawford",phase:"solid",mp:777,bp:1382,use:"花火赤色・ブラウン管"},
{n:39,sym:"Y",name:"Yttrium",jp:"イットリウム",mass:88.906,cat:"transition",r:5,c:3,cfg:"[Kr]4d¹5s²",disc:1794,by:"J. Gadolin",phase:"solid",mp:1526,bp:3336,use:"超伝導体・LEDリン光体"},
{n:40,sym:"Zr",name:"Zirconium",jp:"ジルコニウム",mass:91.224,cat:"transition",r:5,c:4,cfg:"[Kr]4d²5s²",disc:1789,by:"M.H. Klaproth",phase:"solid",mp:1855,bp:4409,use:"原子炉・人工宝石"},
{n:41,sym:"Nb",name:"Niobium",jp:"ニオブ",mass:92.906,cat:"transition",r:5,c:5,cfg:"[Kr]4d⁴5s¹",disc:1801,by:"C. Hatchett",phase:"solid",mp:2477,bp:4744,use:"超伝導磁石・特殊鋼"},
{n:42,sym:"Mo",name:"Molybdenum",jp:"モリブデン",mass:95.95,cat:"transition",r:5,c:6,cfg:"[Kr]4d⁵5s¹",disc:1781,by:"P.J. Hjelm",phase:"solid",mp:2623,bp:4639,use:"高温合金・酵素"},
{n:43,sym:"Tc",name:"Technetium",jp:"テクネチウム",mass:98,cat:"transition",r:5,c:7,cfg:"[Kr]4d⁵5s²",disc:1937,by:"C. Perrier",phase:"solid",mp:2157,bp:4265,use:"医療画像・最初の人工合成元素"},
{n:44,sym:"Ru",name:"Ruthenium",jp:"ルテニウム",mass:101.07,cat:"transition",r:5,c:8,cfg:"[Kr]4d⁷5s¹",disc:1844,by:"K. Klaus",phase:"solid",mp:2334,bp:4150,use:"電子接点・触媒"},
{n:45,sym:"Rh",name:"Rhodium",jp:"ロジウム",mass:102.906,cat:"transition",r:5,c:9,cfg:"[Kr]4d⁸5s¹",disc:1803,by:"W.H. Wollaston",phase:"solid",mp:1964,bp:3695,use:"自動車触媒・最高価金属の一"},
{n:46,sym:"Pd",name:"Palladium",jp:"パラジウム",mass:106.42,cat:"transition",r:5,c:10,cfg:"[Kr]4d¹⁰",disc:1803,by:"W.H. Wollaston",phase:"solid",mp:1555,bp:2963,use:"触媒・電子部品・水素吸蔵"},
{n:47,sym:"Ag",name:"Silver",jp:"銀",mass:107.868,cat:"transition",r:5,c:11,cfg:"[Kr]4d¹⁰5s¹",disc:-3000,by:"prehistoric",phase:"solid",mp:962,bp:2162,use:"宝飾・電気伝導最高・抗菌"},
{n:48,sym:"Cd",name:"Cadmium",jp:"カドミウム",mass:112.414,cat:"transition",r:5,c:12,cfg:"[Kr]4d¹⁰5s²",disc:1817,by:"F. Stromeyer",phase:"solid",mp:321,bp:767,use:"電池・顔料・有毒"},
{n:49,sym:"In",name:"Indium",jp:"インジウム",mass:114.818,cat:"post",r:5,c:13,cfg:"[Kr]4d¹⁰5s²5p¹",disc:1863,by:"F. Reich",phase:"solid",mp:157,bp:2072,use:"液晶ディスプレイITO電極"},
{n:50,sym:"Sn",name:"Tin",jp:"スズ",mass:118.710,cat:"post",r:5,c:14,cfg:"[Kr]4d¹⁰5s²5p²",disc:-3000,by:"prehistoric",phase:"solid",mp:232,bp:2602,use:"はんだ・青銅・缶詰"},
{n:51,sym:"Sb",name:"Antimony",jp:"アンチモン",mass:121.760,cat:"metalloid",r:5,c:15,cfg:"[Kr]4d¹⁰5s²5p³",disc:1540,by:"V. Biringuccio",phase:"solid",mp:631,bp:1587,use:"難燃剤・はんだ"},
{n:52,sym:"Te",name:"Tellurium",jp:"テルル",mass:127.60,cat:"metalloid",r:5,c:16,cfg:"[Kr]4d¹⁰5s²5p⁴",disc:1782,by:"F.-J. Müller",phase:"solid",mp:450,bp:988,use:"太陽電池・合金"},
{n:53,sym:"I",name:"Iodine",jp:"ヨウ素",mass:126.904,cat:"halogen",r:5,c:17,cfg:"[Kr]4d¹⁰5s²5p⁵",disc:1811,by:"B. Courtois",phase:"solid",mp:114,bp:184,use:"消毒・甲状腺ホルモン"},
{n:54,sym:"Xe",name:"Xenon",jp:"キセノン",mass:131.293,cat:"noble",r:5,c:18,cfg:"[Kr]4d¹⁰5s²5p⁶",disc:1898,by:"W. Ramsay",phase:"gas",mp:-112,bp:-108,use:"自動車ヘッドライト・イオンエンジン"},
{n:55,sym:"Cs",name:"Caesium",jp:"セシウム",mass:132.905,cat:"alkali",r:6,c:1,cfg:"[Xe]6s¹",disc:1860,by:"R. Bunsen",phase:"solid",mp:28,bp:671,use:"原子時計の秒の定義"},
{n:56,sym:"Ba",name:"Barium",jp:"バリウム",mass:137.327,cat:"alkaline",r:6,c:2,cfg:"[Xe]6s²",disc:1808,by:"H. Davy",phase:"solid",mp:727,bp:1845,use:"X線造影・花火緑色"},
// La placeholder at (6,3)
{n:57,sym:"La",name:"Lanthanum",jp:"ランタン",mass:138.905,cat:"lanthanide",r:9,c:4,cfg:"[Xe]5d¹6s²",disc:1839,by:"C.G. Mosander",phase:"solid",mp:920,bp:3464,use:"カメラレンズ・水素吸蔵合金"},
{n:58,sym:"Ce",name:"Cerium",jp:"セリウム",mass:140.116,cat:"lanthanide",r:9,c:5,cfg:"[Xe]4f¹5d¹6s²",disc:1803,by:"J. Berzelius",phase:"solid",mp:798,bp:3443,use:"研磨剤・ライター石"},
{n:59,sym:"Pr",name:"Praseodymium",jp:"プラセオジム",mass:140.908,cat:"lanthanide",r:9,c:6,cfg:"[Xe]4f³6s²",disc:1885,by:"C.A. von Welsbach",phase:"solid",mp:931,bp:3520,use:"磁石・着色ガラス"},
{n:60,sym:"Nd",name:"Neodymium",jp:"ネオジム",mass:144.242,cat:"lanthanide",r:9,c:7,cfg:"[Xe]4f⁴6s²",disc:1885,by:"C.A. von Welsbach",phase:"solid",mp:1021,bp:3074,use:"最強永久磁石・レーザー"},
{n:61,sym:"Pm",name:"Promethium",jp:"プロメチウム",mass:145,cat:"lanthanide",r:9,c:8,cfg:"[Xe]4f⁵6s²",disc:1945,by:"J.A. Marinsky",phase:"solid",mp:1042,bp:3000,use:"発光塗料・原子力電池・全同位体放射性"},
{n:62,sym:"Sm",name:"Samarium",jp:"サマリウム",mass:150.36,cat:"lanthanide",r:9,c:9,cfg:"[Xe]4f⁶6s²",disc:1879,by:"P. Lecoq",phase:"solid",mp:1074,bp:1794,use:"高温磁石・原子炉制御棒"},
{n:63,sym:"Eu",name:"Europium",jp:"ユウロピウム",mass:151.964,cat:"lanthanide",r:9,c:10,cfg:"[Xe]4f⁷6s²",disc:1901,by:"E.-A. Demarçay",phase:"solid",mp:822,bp:1529,use:"カラーTV赤色・ユーロ紙幣偽造防止"},
{n:64,sym:"Gd",name:"Gadolinium",jp:"ガドリニウム",mass:157.25,cat:"lanthanide",r:9,c:11,cfg:"[Xe]4f⁷5d¹6s²",disc:1880,by:"J.-C.G. de Marignac",phase:"solid",mp:1313,bp:3273,use:"MRI造影剤・磁気冷凍"},
{n:65,sym:"Tb",name:"Terbium",jp:"テルビウム",mass:158.925,cat:"lanthanide",r:9,c:12,cfg:"[Xe]4f⁹6s²",disc:1843,by:"C.G. Mosander",phase:"solid",mp:1356,bp:3230,use:"蛍光体・固体デバイス"},
{n:66,sym:"Dy",name:"Dysprosium",jp:"ジスプロシウム",mass:162.500,cat:"lanthanide",r:9,c:13,cfg:"[Xe]4f¹⁰6s²",disc:1886,by:"P. Lecoq",phase:"solid",mp:1412,bp:2567,use:"高温磁石・原子炉制御棒"},
{n:67,sym:"Ho",name:"Holmium",jp:"ホルミウム",mass:164.930,cat:"lanthanide",r:9,c:14,cfg:"[Xe]4f¹¹6s²",disc:1878,by:"P.T. Cleve",phase:"solid",mp:1474,bp:2700,use:"最強磁気モーメント・レーザー"},
{n:68,sym:"Er",name:"Erbium",jp:"エルビウム",mass:167.259,cat:"lanthanide",r:9,c:15,cfg:"[Xe]4f¹²6s²",disc:1843,by:"C.G. Mosander",phase:"solid",mp:1529,bp:2868,use:"光ファイバー増幅・ピンク色ガラス"},
{n:69,sym:"Tm",name:"Thulium",jp:"ツリウム",mass:168.934,cat:"lanthanide",r:9,c:16,cfg:"[Xe]4f¹³6s²",disc:1879,by:"P.T. Cleve",phase:"solid",mp:1545,bp:1950,use:"携帯X線装置・最希少安定希土類"},
{n:70,sym:"Yb",name:"Ytterbium",jp:"イッテルビウム",mass:173.045,cat:"lanthanide",r:9,c:17,cfg:"[Xe]4f¹⁴6s²",disc:1878,by:"J.-C.G. de Marignac",phase:"solid",mp:819,bp:1196,use:"光格子時計・ステンレス強化"},
{n:71,sym:"Lu",name:"Lutetium",jp:"ルテチウム",mass:174.967,cat:"lanthanide",r:9,c:18,cfg:"[Xe]4f¹⁴5d¹6s²",disc:1907,by:"G. Urbain",phase:"solid",mp:1663,bp:3402,use:"PETスキャナ・触媒・希土類最高密度"},
{n:72,sym:"Hf",name:"Hafnium",jp:"ハフニウム",mass:178.486,cat:"transition",r:6,c:4,cfg:"[Xe]4f¹⁴5d²6s²",disc:1923,by:"D. Coster",phase:"solid",mp:2233,bp:4603,use:"原子炉制御棒・半導体ゲート"},
{n:73,sym:"Ta",name:"Tantalum",jp:"タンタル",mass:180.948,cat:"transition",r:6,c:5,cfg:"[Xe]4f¹⁴5d³6s²",disc:1802,by:"A.G. Ekeberg",phase:"solid",mp:3017,bp:5458,use:"携帯コンデンサ・医療インプラント"},
{n:74,sym:"W",name:"Tungsten",jp:"タングステン",mass:183.84,cat:"transition",r:6,c:6,cfg:"[Xe]4f¹⁴5d⁴6s²",disc:1783,by:"J.J. & F. Elhuyar",phase:"solid",mp:3422,bp:5555,use:"電球フィラメント・最高融点金属"},
{n:75,sym:"Re",name:"Rhenium",jp:"レニウム",mass:186.207,cat:"transition",r:6,c:7,cfg:"[Xe]4f¹⁴5d⁵6s²",disc:1925,by:"W. Noddack",phase:"solid",mp:3186,bp:5596,use:"ジェットエンジン・地殻最希少元素の一"},
{n:76,sym:"Os",name:"Osmium",jp:"オスミウム",mass:190.23,cat:"transition",r:6,c:8,cfg:"[Xe]4f¹⁴5d⁶6s²",disc:1803,by:"S. Tennant",phase:"solid",mp:3033,bp:5012,use:"万年筆ペン先・最高密度元素"},
{n:77,sym:"Ir",name:"Iridium",jp:"イリジウム",mass:192.217,cat:"transition",r:6,c:9,cfg:"[Xe]4f¹⁴5d⁷6s²",disc:1803,by:"S. Tennant",phase:"solid",mp:2466,bp:4428,use:"耐腐食合金・恐竜絶滅K-Pg層の指標"},
{n:78,sym:"Pt",name:"Platinum",jp:"プラチナ",mass:195.084,cat:"transition",r:6,c:10,cfg:"[Xe]4f¹⁴5d⁹6s¹",disc:1735,by:"A. de Ulloa",phase:"solid",mp:1768,bp:3825,use:"自動車触媒・宝飾・抗がん剤"},
{n:79,sym:"Au",name:"Gold",jp:"金",mass:196.967,cat:"transition",r:6,c:11,cfg:"[Xe]4f¹⁴5d¹⁰6s¹",disc:-6000,by:"prehistoric",phase:"solid",mp:1064,bp:2856,use:"通貨・電子・宝飾・中性子星合体起源"},
{n:80,sym:"Hg",name:"Mercury",jp:"水銀",mass:200.592,cat:"transition",r:6,c:12,cfg:"[Xe]4f¹⁴5d¹⁰6s²",disc:-1500,by:"prehistoric",phase:"liquid",mp:-39,bp:357,use:"温度計・蛍光灯・常温唯一液体金属"},
{n:81,sym:"Tl",name:"Thallium",jp:"タリウム",mass:204.38,cat:"post",r:6,c:13,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p¹",disc:1861,by:"W. Crookes",phase:"solid",mp:304,bp:1473,use:"赤外線検出・極めて毒性高い"},
{n:82,sym:"Pb",name:"Lead",jp:"鉛",mass:207.2,cat:"post",r:6,c:14,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p²",disc:-7000,by:"prehistoric",phase:"solid",mp:327,bp:1749,use:"鉛蓄電池・放射線遮蔽・古代水道管"},
{n:83,sym:"Bi",name:"Bismuth",jp:"ビスマス",mass:208.980,cat:"post",r:6,c:15,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p³",disc:1753,by:"C.F. Geoffroy",phase:"solid",mp:271,bp:1564,use:"胃薬・低融点合金・虹色結晶"},
{n:84,sym:"Po",name:"Polonium",jp:"ポロニウム",mass:209,cat:"post",r:6,c:16,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p⁴",disc:1898,by:"M. & P. Curie",phase:"solid",mp:254,bp:962,use:"宇宙船加熱・元素第二発見者キュリー命名"},
{n:85,sym:"At",name:"Astatine",jp:"アスタチン",mass:210,cat:"halogen",r:6,c:17,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p⁵",disc:1940,by:"D.R. Corson",phase:"solid",mp:302,bp:337,use:"地球上の自然存在量30g以下の最希少元素"},
{n:86,sym:"Rn",name:"Radon",jp:"ラドン",mass:222,cat:"noble",r:6,c:18,cfg:"[Xe]4f¹⁴5d¹⁰6s²6p⁶",disc:1900,by:"F.E. Dorn",phase:"gas",mp:-71,bp:-62,use:"地下水放射性・がん治療"},
{n:87,sym:"Fr",name:"Francium",jp:"フランシウム",mass:223,cat:"alkali",r:7,c:1,cfg:"[Rn]7s¹",disc:1939,by:"M. Perey",phase:"solid",mp:27,bp:677,use:"最も電気陽性・地殻に常時20-30g存在"},
{n:88,sym:"Ra",name:"Radium",jp:"ラジウム",mass:226,cat:"alkaline",r:7,c:2,cfg:"[Rn]7s²",disc:1898,by:"M. & P. Curie",phase:"solid",mp:700,bp:1737,use:"かつて発光時計文字盤・がん治療"},
{n:89,sym:"Ac",name:"Actinium",jp:"アクチニウム",mass:227,cat:"actinide",r:10,c:4,cfg:"[Rn]6d¹7s²",disc:1899,by:"A.-L. Debierne",phase:"solid",mp:1051,bp:3198,use:"中性子源・標的α線がん治療"},
{n:90,sym:"Th",name:"Thorium",jp:"トリウム",mass:232.038,cat:"actinide",r:10,c:5,cfg:"[Rn]6d²7s²",disc:1829,by:"J. Berzelius",phase:"solid",mp:1750,bp:4788,use:"原子炉燃料候補・タングステンより豊富"},
{n:91,sym:"Pa",name:"Protactinium",jp:"プロトアクチニウム",mass:231.036,cat:"actinide",r:10,c:6,cfg:"[Rn]5f²6d¹7s²",disc:1913,by:"K. Fajans",phase:"solid",mp:1568,bp:4027,use:"科学研究のみ・極めて希少"},
{n:92,sym:"U",name:"Uranium",jp:"ウラン",mass:238.029,cat:"actinide",r:10,c:7,cfg:"[Rn]5f³6d¹7s²",disc:1789,by:"M.H. Klaproth",phase:"solid",mp:1135,bp:4131,use:"原子力発電・核兵器・最重自然元素"},
{n:93,sym:"Np",name:"Neptunium",jp:"ネプツニウム",mass:237,cat:"actinide",r:10,c:8,cfg:"[Rn]5f⁴6d¹7s²",disc:1940,by:"E. McMillan",phase:"solid",mp:644,bp:4000,use:"宇宙船電池・最初の超ウラン元素"},
{n:94,sym:"Pu",name:"Plutonium",jp:"プルトニウム",mass:244,cat:"actinide",r:10,c:9,cfg:"[Rn]5f⁶7s²",disc:1940,by:"G.T. Seaborg",phase:"solid",mp:640,bp:3228,use:"核兵器・原子力電池・宇宙探査機"},
{n:95,sym:"Am",name:"Americium",jp:"アメリシウム",mass:243,cat:"actinide",r:10,c:10,cfg:"[Rn]5f⁷7s²",disc:1944,by:"G.T. Seaborg",phase:"solid",mp:1176,bp:2011,use:"煙感知器・中性子源"},
{n:96,sym:"Cm",name:"Curium",jp:"キュリウム",mass:247,cat:"actinide",r:10,c:11,cfg:"[Rn]5f⁷6d¹7s²",disc:1944,by:"G.T. Seaborg",phase:"solid",mp:1345,bp:3110,use:"火星探査機X線分光計・キュリー夫妻命名"},
{n:97,sym:"Bk",name:"Berkelium",jp:"バークリウム",mass:247,cat:"actinide",r:10,c:12,cfg:"[Rn]5f⁹7s²",disc:1949,by:"G.T. Seaborg",phase:"solid",mp:986,bp:2627,use:"超重元素合成標的・カリフォルニア大学命名"},
{n:98,sym:"Cf",name:"Californium",jp:"カリホルニウム",mass:251,cat:"actinide",r:10,c:13,cfg:"[Rn]5f¹⁰7s²",disc:1950,by:"G.T. Seaborg",phase:"solid",mp:900,bp:1470,use:"中性子源・がん治療・地下油田探査"},
{n:99,sym:"Es",name:"Einsteinium",jp:"アインスタイニウム",mass:252,cat:"actinide",r:10,c:14,cfg:"[Rn]5f¹¹7s²",disc:1952,by:"A. Ghiorso",phase:"solid",mp:860,bp:996,use:"水爆実験塵から発見・研究のみ"},
{n:100,sym:"Fm",name:"Fermium",jp:"フェルミウム",mass:257,cat:"actinide",r:10,c:15,cfg:"[Rn]5f¹²7s²",disc:1952,by:"A. Ghiorso",phase:"solid",mp:1527,bp:null,use:"水爆実験塵から発見・フェルミ命名"},
{n:101,sym:"Md",name:"Mendelevium",jp:"メンデレビウム",mass:258,cat:"actinide",r:10,c:16,cfg:"[Rn]5f¹³7s²",disc:1955,by:"A. Ghiorso",phase:"solid",mp:827,bp:null,use:"周期表生みの親メンデレーエフ命名"},
{n:102,sym:"No",name:"Nobelium",jp:"ノーベリウム",mass:259,cat:"actinide",r:10,c:17,cfg:"[Rn]5f¹⁴7s²",disc:1966,by:"JINR",phase:"solid",mp:827,bp:null,use:"ノーベル命名・研究のみ"},
{n:103,sym:"Lr",name:"Lawrencium",jp:"ローレンシウム",mass:266,cat:"actinide",r:10,c:18,cfg:"[Rn]5f¹⁴7s²7p¹",disc:1961,by:"A. Ghiorso",phase:"solid",mp:1627,bp:null,use:"サイクロトロン発明者ローレンス命名"},
{n:104,sym:"Rf",name:"Rutherfordium",jp:"ラザホージウム",mass:267,cat:"transition",r:7,c:4,cfg:"[Rn]5f¹⁴6d²7s²",disc:1964,by:"JINR",phase:"solid",mp:null,bp:null,use:"研究のみ・超重元素・命名論争長期化"},
{n:105,sym:"Db",name:"Dubnium",jp:"ドブニウム",mass:268,cat:"transition",r:7,c:5,cfg:"[Rn]5f¹⁴6d³7s²",disc:1968,by:"JINR",phase:"solid",mp:null,bp:null,use:"研究のみ・ロシア・ドブナ研究所命名"},
{n:106,sym:"Sg",name:"Seaborgium",jp:"シーボーギウム",mass:269,cat:"transition",r:7,c:6,cfg:"[Rn]5f¹⁴6d⁴7s²",disc:1974,by:"LBNL",phase:"solid",mp:null,bp:null,use:"研究のみ・存命中命名は珍しい"},
{n:107,sym:"Bh",name:"Bohrium",jp:"ボーリウム",mass:270,cat:"transition",r:7,c:7,cfg:"[Rn]5f¹⁴6d⁵7s²",disc:1981,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・ボーア命名"},
{n:108,sym:"Hs",name:"Hassium",jp:"ハッシウム",mass:269,cat:"transition",r:7,c:8,cfg:"[Rn]5f¹⁴6d⁶7s²",disc:1984,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・ヘッセン州ラテン名"},
{n:109,sym:"Mt",name:"Meitnerium",jp:"マイトネリウム",mass:278,cat:"transition",r:7,c:9,cfg:"[Rn]5f¹⁴6d⁷7s²",disc:1982,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・核分裂発見者マイトナー命名"},
{n:110,sym:"Ds",name:"Darmstadtium",jp:"ダームスタチウム",mass:281,cat:"transition",r:7,c:10,cfg:"[Rn]5f¹⁴6d⁸7s²",disc:1994,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・発見地ダルムシュタット命名"},
{n:111,sym:"Rg",name:"Roentgenium",jp:"レントゲニウム",mass:282,cat:"transition",r:7,c:11,cfg:"[Rn]5f¹⁴6d⁹7s²",disc:1994,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・X線発見者レントゲン命名"},
{n:112,sym:"Cn",name:"Copernicium",jp:"コペルニシウム",mass:285,cat:"transition",r:7,c:12,cfg:"[Rn]5f¹⁴6d¹⁰7s²",disc:1996,by:"GSI",phase:"solid",mp:null,bp:null,use:"研究のみ・コペルニクス命名"},
{n:113,sym:"Nh",name:"Nihonium",jp:"ニホニウム",mass:286,cat:"post",r:7,c:13,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p¹",disc:2004,by:"理研 RIKEN",phase:"solid",mp:null,bp:null,use:"研究のみ・日本初命名権・森田浩介ら"},
{n:114,sym:"Fl",name:"Flerovium",jp:"フレロビウム",mass:289,cat:"post",r:7,c:14,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p²",disc:1998,by:"JINR",phase:"solid",mp:null,bp:null,use:"研究のみ・フレロフ研究所命名"},
{n:115,sym:"Mc",name:"Moscovium",jp:"モスコビウム",mass:290,cat:"post",r:7,c:15,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p³",disc:2003,by:"JINR",phase:"solid",mp:null,bp:null,use:"研究のみ・モスクワ州命名"},
{n:116,sym:"Lv",name:"Livermorium",jp:"リバモリウム",mass:293,cat:"post",r:7,c:16,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p⁴",disc:2000,by:"JINR/LLNL",phase:"solid",mp:null,bp:null,use:"研究のみ・リバモア研究所命名"},
{n:117,sym:"Ts",name:"Tennessine",jp:"テネシン",mass:294,cat:"halogen",r:7,c:17,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p⁵",disc:2010,by:"JINR/ORNL",phase:"solid",mp:null,bp:null,use:"研究のみ・テネシー州命名"},
{n:118,sym:"Og",name:"Oganesson",jp:"オガネソン",mass:294,cat:"noble",r:7,c:18,cfg:"[Rn]5f¹⁴6d¹⁰7s²7p⁶",disc:2002,by:"JINR/LLNL",phase:"solid",mp:null,bp:null,use:"研究のみ・最重元素・存命人物命名"}
];

const CATS = {
  alkali:     {label:"Alkali Metal",        jp:"アルカリ金属"},
  alkaline:   {label:"Alkaline Earth",       jp:"アルカリ土類金属"},
  transition: {label:"Transition Metal",     jp:"遷移金属"},
  post:       {label:"Post-Transition",      jp:"その他金属"},
  metalloid:  {label:"Metalloid",            jp:"半金属"},
  nonmetal:   {label:"Reactive Nonmetal",    jp:"非金属"},
  halogen:    {label:"Halogen",              jp:"ハロゲン"},
  noble:      {label:"Noble Gas",            jp:"貴ガス"},
  lanthanide: {label:"Lanthanide",           jp:"ランタノイド"},
  actinide:   {label:"Actinide",             jp:"アクチノイド"},
};

const catColor = c => `var(--c-${c})`;

// ── render table ─────────────────────────────────────────────────────────
const tableEl = document.getElementById("table");

// row labels could go here; we just place cells by grid-column/row
E.forEach(el => {
  if (el.r >= 9) return; // skip lanthanides/actinides for main table
  const cell = document.createElement("button");
  cell.className = "cell";
  cell.style.gridColumn = el.c;
  cell.style.gridRow = el.r;
  cell.style.setProperty("--c", catColor(el.cat));
  cell.dataset.cat = el.cat;
  cell.dataset.search = (el.name + " " + el.sym + " " + el.jp + " " + el.n).toLowerCase();
  cell.innerHTML = `
    <div>
      <div class="num">${el.n}</div>
      <div class="sym">${el.sym}</div>
    </div>
    <div class="nm">${el.name}</div>
    <div class="ms">${el.mass}</div>
  `;
  cell.addEventListener("click", () => openPanel(el));
  tableEl.appendChild(cell);
});

// La / Ac placeholders
const laMark = document.createElement("div");
laMark.className = "placeholder";
laMark.style.gridColumn = 3; laMark.style.gridRow = 6;
laMark.innerHTML = "57–71<br>↓";
tableEl.appendChild(laMark);

const acMark = document.createElement("div");
acMark.className = "placeholder";
acMark.style.gridColumn = 3; acMark.style.gridRow = 7;
acMark.innerHTML = "89–103<br>↓";
tableEl.appendChild(acMark);

// f-block rows
const lanWrap = document.getElementById("lan-row");
const actWrap = document.getElementById("act-row");
E.filter(el => el.cat === "lanthanide").forEach(el => {
  const cell = makeCell(el);
  cell.style.gridColumn = el.c;
  lanWrap.appendChild(cell);
});
E.filter(el => el.cat === "actinide").forEach(el => {
  const cell = makeCell(el);
  cell.style.gridColumn = el.c;
  actWrap.appendChild(cell);
});

function makeCell(el) {
  const c = document.createElement("button");
  c.className = "cell";
  c.style.setProperty("--c", catColor(el.cat));
  c.dataset.cat = el.cat;
  c.dataset.search = (el.name + " " + el.sym + " " + el.jp + " " + el.n).toLowerCase();
  c.innerHTML = `
    <div>
      <div class="num">${el.n}</div>
      <div class="sym">${el.sym}</div>
    </div>
    <div class="nm">${el.name}</div>
    <div class="ms">${el.mass}</div>
  `;
  c.addEventListener("click", () => openPanel(el));
  return c;
}

// ── legend chips ─────────────────────────────────────────────────────────
const legendEl = document.getElementById("legend");
let activeCat = null;
Object.entries(CATS).forEach(([key, info]) => {
  const chip = document.createElement("button");
  chip.className = "chip";
  chip.style.setProperty("--c", catColor(key));
  chip.dataset.cat = key;
  chip.textContent = info.label;
  chip.addEventListener("click", () => {
    activeCat = activeCat === key ? null : key;
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === activeCat));
    applyFilter();
  });
  legendEl.appendChild(chip);
});

// ── search ───────────────────────────────────────────────────────────────
const searchEl = document.getElementById("search");
searchEl.addEventListener("input", applyFilter);

function applyFilter() {
  const q = searchEl.value.trim().toLowerCase();
  document.querySelectorAll(".cell").forEach(cell => {
    const matchSearch = !q || cell.dataset.search.includes(q);
    const matchCat = !activeCat || cell.dataset.cat === activeCat;
    cell.classList.toggle("dim", !(matchSearch && matchCat));
  });
}

// ── BOHR DIAGRAM ─────────────────────────────────────────────────────────
const SUPER = {'¹':1,'²':2,'³':3,'⁴':4,'⁵':5,'⁶':6,'⁷':7,'⁸':8,'⁹':9,'⁰':0};
const NOBLE_SHELLS = {
  'He': [2],
  'Ne': [2,8],
  'Ar': [2,8,8],
  'Kr': [2,8,18,8],
  'Xe': [2,8,18,18,8],
  'Rn': [2,8,18,32,18,8]
};
const SHELL_NAMES = ['K','L','M','N','O','P','Q'];

function parseConfig(cfg) {
  const shells = [0,0,0,0,0,0,0];
  let rest = cfg;
  const nobleMatch = rest.match(/^\[(He|Ne|Ar|Kr|Xe|Rn)\]/);
  if (nobleMatch) {
    NOBLE_SHELLS[nobleMatch[1]].forEach((n, i) => shells[i] = n);
    rest = rest.slice(nobleMatch[0].length);
  }
  const regex = /(\d)([spdf])([¹²³⁴⁵⁶⁷⁸⁹⁰]+)/g;
  let m;
  while ((m = regex.exec(rest)) !== null) {
    const n = parseInt(m[1]);
    const count = m[3].split('').reduce((a,c) => a*10 + SUPER[c], 0);
    shells[n-1] += count;
  }
  return shells.slice(0, shells.findLastIndex(s => s > 0) + 1);
}

function bohrSVG(el) {
  const shells = parseConfig(el.cfg);
  const C = 140, NUC = 18, BASE = 32, GAP = 13;
  const color = `var(--c-${el.cat})`;

  let svg = `<svg class="bohr-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">`;

  // shell rings + electrons
  shells.forEach((count, i) => {
    const r = BASE + i * GAP;
    // ring
    svg += `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${color}" stroke-opacity="0.22" stroke-width="0.7" stroke-dasharray="2,3"/>`;
    // electrons group (animated)
    svg += `<g class="bohr-electrons bohr-shell-${i+1}">`;
    for (let e = 0; e < count; e++) {
      const angle = (e / count) * Math.PI * 2 - Math.PI / 2;
      const x = C + Math.cos(angle) * r;
      const y = C + Math.sin(angle) * r;
      const dotR = count > 18 ? 1.8 : (count > 8 ? 2.2 : 2.8);
      svg += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}" stroke="var(--bg-0)" stroke-width="0.5"/>`;
    }
    svg += `</g>`;
  });

  // nucleus
  svg += `<circle cx="${C}" cy="${C}" r="${NUC}" fill="var(--bg-2)" stroke="${color}" stroke-width="1.5"/>`;
  svg += `<text x="${C}" y="${C+1}" text-anchor="middle" dominant-baseline="middle" fill="var(--ink)" font-family="Fraunces, serif" font-size="15" font-weight="500">${el.sym}</text>`;
  svg += `<text x="${C}" y="${C+12}" text-anchor="middle" dominant-baseline="middle" fill="var(--ink-dim)" font-family="JetBrains Mono" font-size="6" letter-spacing="0.1em">${el.n}p ${el.n}n</text>`;

  svg += `</svg>`;

  // shell counts strip
  const counts = shells.map((c, i) =>
    `<span class="bohr-count" style="--c:${color}"><em>${SHELL_NAMES[i]}</em>${c}</span>`
  ).join("");

  return `
    <div class="bohr-wrap">${svg}</div>
    <div class="bohr-counts">${counts}</div>
  `;
}


const panel = document.getElementById("panel");
const panelBody = document.getElementById("panel-body");
document.getElementById("close").addEventListener("click", () => panel.classList.remove("open"));

function openPanel(el) {
  panel.style.setProperty("--c", catColor(el.cat));
  const discYear = el.disc < 0 ? `紀元前 ${Math.abs(el.disc)}` : el.disc;
  const phaseJP = {gas:"気体", liquid:"液体", solid:"固体"}[el.phase] || el.phase;
  panelBody.innerHTML = `
    <div class="p-num">ATOMIC NUMBER · <span>${String(el.n).padStart(3, "0")}</span></div>
    <div class="p-sym">${el.sym}</div>
    <div class="p-name">${el.name}</div>
    <div class="p-jp">${el.jp}</div>
    <span class="p-cat" style="background:${catColor(el.cat)}">${CATS[el.cat].jp}</span>
    <dl style="margin-top:24px">
      <div class="p-row"><dt>原子量</dt><dd>${el.mass}</dd></div>
      <div class="p-row"><dt>電子配置</dt><dd>${el.cfg}</dd></div>
      <div class="p-row"><dt>常温状態</dt><dd>${phaseJP}</dd></div>
      <div class="p-row"><dt>融点 °C</dt><dd>${el.mp ?? "—"}</dd></div>
      <div class="p-row"><dt>沸点 °C</dt><dd>${el.bp ?? "—"}</dd></div>
      <div class="p-row"><dt>発見年</dt><dd>${discYear}</dd></div>
      <div class="p-row"><dt>発見者</dt><dd>${el.by}</dd></div>
      <div class="p-row" style="grid-template-columns:1fr"><dt style="margin-bottom:6px">用途・特徴</dt><dd style="font-family:'Noto Serif JP',serif;font-size:13px;line-height:1.7">${el.use}</dd></div>
    </dl>
    <div class="bohr-section">
      <div class="bohr-title">Bohr Model</div>
      <div class="bohr-title-jp">ボーア模型 — 電子殻配置</div>
      ${bohrSVG(el)}
    </div>
  `;
  panel.classList.add("open");
}

// ── TIMELINE ─────────────────────────────────────────────────────────────
(function buildTimeline() {
  const svg = document.getElementById("tl-svg");
  const tip = document.getElementById("tl-tip");
  const wrap = document.getElementById("tl-wrap");
  const W = 2400, H = 460;
  const AXIS_Y = 260;
  const PAD_L = 40, PAD_R = 40;

  // piecewise year→x mapping (ancient compressed, modern expanded)
  const SEGMENTS = [
    {from: -9000, to: 1500, frac: 0.12, label: "Ancient",        jp: "古代"},
    {from: 1500,  to: 1700, frac: 0.08, label: "Renaissance",    jp: "ルネサンス"},
    {from: 1700,  to: 1800, frac: 0.18, label: "Enlightenment",  jp: "啓蒙時代"},
    {from: 1800,  to: 1900, frac: 0.30, label: "Industrial Age", jp: "産業革命"},
    {from: 1900,  to: 2015, frac: 0.32, label: "Atomic Age",     jp: "原子時代"}
  ];
  const inner = W - PAD_L - PAD_R;
  let acc = 0;
  SEGMENTS.forEach(s => { s.x0 = PAD_L + acc * inner; acc += s.frac; s.x1 = PAD_L + acc * inner; });

  function yearToX(y) {
    for (const s of SEGMENTS) {
      if (y >= s.from && y <= s.to) return s.x0 + ((y - s.from) / (s.to - s.from)) * (s.x1 - s.x0);
    }
    return y < SEGMENTS[0].from ? SEGMENTS[0].x0 : SEGMENTS[SEGMENTS.length-1].x1;
  }

  // era backgrounds
  SEGMENTS.forEach((s, i) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "tl-era-bg");
    rect.setAttribute("x", s.x0);
    rect.setAttribute("y", 30);
    rect.setAttribute("width", s.x1 - s.x0);
    rect.setAttribute("height", H - 60);
    rect.setAttribute("fill", i % 2 ? "var(--gold)" : "var(--ink)");
    svg.appendChild(rect);

    const labelEn = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelEn.setAttribute("class", "tl-era-label");
    labelEn.setAttribute("x", (s.x0 + s.x1) / 2);
    labelEn.setAttribute("y", 50);
    labelEn.setAttribute("text-anchor", "middle");
    labelEn.textContent = s.label;
    svg.appendChild(labelEn);

    const labelJp = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelJp.setAttribute("class", "tl-era-jp");
    labelJp.setAttribute("x", (s.x0 + s.x1) / 2);
    labelJp.setAttribute("y", 66);
    labelJp.setAttribute("text-anchor", "middle");
    labelJp.textContent = s.jp;
    svg.appendChild(labelJp);

    // segment divider
    if (i > 0) {
      const div = document.createElementNS("http://www.w3.org/2000/svg", "line");
      div.setAttribute("x1", s.x0); div.setAttribute("x2", s.x0);
      div.setAttribute("y1", 30); div.setAttribute("y2", H - 30);
      div.setAttribute("stroke", "var(--rule)");
      div.setAttribute("stroke-dasharray", "2,4");
      svg.appendChild(div);
    }
  });

  // axis line
  const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  axis.setAttribute("class", "tl-axis");
  axis.setAttribute("x1", PAD_L); axis.setAttribute("x2", W - PAD_R);
  axis.setAttribute("y1", AXIS_Y); axis.setAttribute("y2", AXIS_Y);
  svg.appendChild(axis);

  // year ticks
  const TICKS = [
    {y: -3000, label: "−3000", major: true},
    {y: -1000, label: "−1000", major: false},
    {y: 1, label: "0", major: true},
    {y: 1500, label: "1500", major: true},
    {y: 1600, label: "1600", major: false},
    {y: 1700, label: "1700", major: true},
    {y: 1750, label: "1750", major: false},
    {y: 1800, label: "1800", major: true},
    {y: 1820, label: "1820", major: false},
    {y: 1840, label: "1840", major: false},
    {y: 1860, label: "1860", major: false},
    {y: 1880, label: "1880", major: false},
    {y: 1900, label: "1900", major: true},
    {y: 1920, label: "1920", major: false},
    {y: 1940, label: "1940", major: false},
    {y: 1960, label: "1960", major: false},
    {y: 1980, label: "1980", major: false},
    {y: 2000, label: "2000", major: true},
    {y: 2010, label: "2010", major: false}
  ];

  TICKS.forEach(t => {
    const x = yearToX(t.y);
    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
    tick.setAttribute("class", t.major ? "tl-tick-major" : "tl-tick");
    tick.setAttribute("x1", x); tick.setAttribute("x2", x);
    tick.setAttribute("y1", AXIS_Y - (t.major ? 8 : 4));
    tick.setAttribute("y2", AXIS_Y + (t.major ? 8 : 4));
    svg.appendChild(tick);

    const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lbl.setAttribute("class", "tl-year" + (t.major ? " tl-year-major" : ""));
    lbl.setAttribute("x", x);
    lbl.setAttribute("y", AXIS_Y + 22);
    lbl.textContent = t.label;
    svg.appendChild(lbl);
  });

  // dedupe element positions: stagger above/below axis when close
  const sorted = [...E].sort((a, b) => a.disc - b.disc);
  const placed = []; // {x, y}
  const MIN_GAP = 24;

  sorted.forEach(el => {
    const x = yearToX(el.disc);
    // alternating slot search
    const slotsAbove = [-30, -60, -90, -120, -150, -180, -210];
    const slotsBelow = [30, 60, 90, 120, 150, 180, 210];
    let pick = null;
    // try alternating, prefer above first then below
    const order = [];
    for (let i = 0; i < 7; i++) { order.push(slotsAbove[i]); order.push(slotsBelow[i]); }
    for (const offset of order) {
      const yCand = AXIS_Y + offset;
      const clash = placed.some(p => Math.abs(p.x - x) < MIN_GAP && Math.abs(p.y - yCand) < 18);
      if (!clash) { pick = yCand; break; }
    }
    if (pick === null) pick = AXIS_Y + (Math.random() > 0.5 ? -30 : 30);
    placed.push({x, y: pick, el});
  });

  // draw
  placed.forEach(p => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "tl-group");
    g.dataset.cat = p.el.cat;
    g.dataset.search = (p.el.name + " " + p.el.sym + " " + p.el.jp + " " + p.el.n).toLowerCase();

    const color = `var(--c-${p.el.cat})`;

    // stem
    const stem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    stem.setAttribute("class", "tl-stem");
    stem.setAttribute("x1", p.x); stem.setAttribute("x2", p.x);
    stem.setAttribute("y1", AXIS_Y); stem.setAttribute("y2", p.y);
    stem.setAttribute("stroke", color);
    g.appendChild(stem);

    // dot
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "tl-dot");
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    dot.setAttribute("r", 4.5);
    dot.setAttribute("fill", color);
    dot.setAttribute("stroke", "var(--bg-0)");
    dot.setAttribute("stroke-width", 1);
    g.appendChild(dot);

    // label
    const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lbl.setAttribute("class", "tl-label");
    lbl.setAttribute("x", p.x);
    lbl.setAttribute("y", p.y + (p.y < AXIS_Y ? -8 : 16));
    lbl.setAttribute("text-anchor", "middle");
    lbl.textContent = p.el.sym;
    g.appendChild(lbl);

    g.addEventListener("mouseenter", e => {
      const discYear = p.el.disc < 0 ? `紀元前 ${Math.abs(p.el.disc)}` : p.el.disc;
      tip.innerHTML = `<b>${p.el.sym}</b> · ${p.el.name}<br><span class="tl-tip-jp">${p.el.jp} · ${discYear} · ${p.el.by}</span>`;
      tip.classList.add("show");
    });
    g.addEventListener("mousemove", e => {
      const r = wrap.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left + wrap.scrollLeft + 12) + "px";
      tip.style.top = (e.clientY - r.top + 12) + "px";
    });
    g.addEventListener("mouseleave", () => tip.classList.remove("show"));
    g.addEventListener("click", () => openPanel(p.el));

    svg.appendChild(g);
  });

  // ── stats ──
  const statsEl = document.getElementById("tl-stats");
  const byEra = SEGMENTS.map(s => ({
    s,
    count: E.filter(el => el.disc >= s.from && el.disc < s.to).length
  }));
  // collapse first two for clean 4-col stats
  const stats = [
    {label: "Ancient · 古代",       count: byEra[0].count + byEra[1].count, range: "−9000 — 1700"},
    {label: "1700s · 一八世紀",       count: byEra[2].count, range: "1700 — 1800"},
    {label: "1800s · 一九世紀",       count: byEra[3].count, range: "1800 — 1900"},
    {label: "Modern · 現代",          count: byEra[4].count, range: "1900 — 2010"}
  ];
  stats.forEach(s => {
    const div = document.createElement("div");
    div.className = "tl-stat";
    div.innerHTML = `
      <div class="tl-stat-num">${s.count}</div>
      <div class="tl-stat-label">${s.range}</div>
      <div class="tl-stat-jp">${s.label}</div>
    `;
    statsEl.appendChild(div);
  });

  // hook timeline into existing filter
  const origApplyFilter = applyFilter;
  window.applyFilter = function() {
    origApplyFilter();
    const q = searchEl.value.trim().toLowerCase();
    document.querySelectorAll(".tl-group").forEach(g => {
      const matchSearch = !q || g.dataset.search.includes(q);
      const matchCat = !activeCat || g.dataset.cat === activeCat;
      g.classList.toggle("dim", !(matchSearch && matchCat));
    });
  };
  searchEl.removeEventListener("input", applyFilter);
  searchEl.addEventListener("input", window.applyFilter);
  document.querySelectorAll(".chip").forEach(c => {
    c.replaceWith(c.cloneNode(true));
  });
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const key = chip.dataset.cat;
      activeCat = activeCat === key ? null : key;
      document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === activeCat));
      window.applyFilter();
    });
  });
})();

// ── DISTRIBUTION MAPS ────────────────────────────────────────────────────
(function buildMaps() {
  const SVG_NS = "http://www.w3.org/2000/svg";

  // tab switching
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      document.getElementById("panel-" + t.dataset.tab).classList.add("active");
    });
  });

  // ── shared temp scale (piecewise: cold compressed, mid expanded) ──
  const TEMP_BREAKS = [
    {from: -300, to: 0,    frac: 0.20},
    {from: 0,    to: 500,  frac: 0.20},
    {from: 500,  to: 1500, frac: 0.25},
    {from: 1500, to: 3500, frac: 0.20},
    {from: 3500, to: 6000, frac: 0.15}
  ];
  function tempToFrac(t) {
    t = Math.max(-300, Math.min(6000, t));
    let acc = 0;
    for (const s of TEMP_BREAKS) {
      if (t <= s.to) return acc + ((t - s.from) / (s.to - s.from)) * s.frac;
      acc += s.frac;
    }
    return 1;
  }

  // ════════════════════════════════════════════════════════════════════
  // A. RANGE BARS
  // ════════════════════════════════════════════════════════════════════
  const VALID = E.filter(el => el.mp != null && el.bp != null);
  let currentSort = "n";

  // axis
  const axisSvg = document.getElementById("bars-axis");
  const AXIS_W = 1000;
  const BAR_PAD_L = 8, BAR_PAD_R = 8;
  const BAR_INNER = AXIS_W - BAR_PAD_L - BAR_PAD_R;

  function xAt(t) { return BAR_PAD_L + tempToFrac(t) * BAR_INNER; }

  const TICKS_A = [-273, -200, -100, 0, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000];
  TICKS_A.forEach(t => {
    const x = xAt(t);
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", x); line.setAttribute("x2", x);
    line.setAttribute("y1", 18); line.setAttribute("y2", 24);
    line.setAttribute("stroke", "var(--ink-dim)");
    axisSvg.appendChild(line);

    const lbl = document.createElementNS(SVG_NS, "text");
    lbl.setAttribute("x", x); lbl.setAttribute("y", 13);
    lbl.setAttribute("text-anchor", "middle");
    lbl.setAttribute("fill", "var(--ink-dim)");
    lbl.setAttribute("font-family", "JetBrains Mono");
    lbl.setAttribute("font-size", "9");
    lbl.textContent = t + "°";
    axisSvg.appendChild(lbl);
  });
  // 20°C line on axis
  const rtX = xAt(20);
  const rtLn = document.createElementNS(SVG_NS, "line");
  rtLn.setAttribute("x1", rtX); rtLn.setAttribute("x2", rtX);
  rtLn.setAttribute("y1", 0); rtLn.setAttribute("y2", 32);
  rtLn.setAttribute("stroke", "var(--gold)");
  rtLn.setAttribute("stroke-width", "1.5");
  axisSvg.appendChild(rtLn);
  const rtLbl = document.createElementNS(SVG_NS, "text");
  rtLbl.setAttribute("x", rtX + 4); rtLbl.setAttribute("y", 28);
  rtLbl.setAttribute("fill", "var(--gold)");
  rtLbl.setAttribute("font-family", "JetBrains Mono");
  rtLbl.setAttribute("font-size", "9");
  rtLbl.setAttribute("font-weight", "600");
  rtLbl.textContent = "20° 常温";
  axisSvg.appendChild(rtLbl);

  function renderBars() {
    const sorters = {
      n: (a, b) => a.n - b.n,
      mp: (a, b) => a.mp - b.mp,
      bp: (a, b) => a.bp - b.bp,
      range: (a, b) => (b.bp - b.mp) - (a.bp - a.mp)
    };
    const list = [...VALID].sort(sorters[currentSort]);
    const container = document.getElementById("bars-list");
    container.innerHTML = "";

    list.forEach(el => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.addEventListener("click", () => openPanel(el));

      const labelDiv = document.createElement("div");
      labelDiv.className = "bar-label";
      labelDiv.innerHTML = `<span class="sym">${el.sym}</span><span class="num">${el.n}</span>`;
      row.appendChild(labelDiv);

      const trackDiv = document.createElement("div");
      trackDiv.className = "bar-track";
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("class", "bars-svg");
      svg.setAttribute("viewBox", `0 0 ${AXIS_W} 18`);
      svg.setAttribute("preserveAspectRatio", "none");

      const color = `var(--c-${el.cat})`;
      const mpX = xAt(el.mp);
      const bpX = xAt(el.bp);

      // solid range (-273 to mp) — dim
      const solid = document.createElementNS(SVG_NS, "rect");
      solid.setAttribute("x", xAt(-273));
      solid.setAttribute("y", 8);
      solid.setAttribute("width", Math.max(0, mpX - xAt(-273)));
      solid.setAttribute("height", 2);
      solid.setAttribute("fill", "var(--ink-dim)");
      solid.setAttribute("opacity", 0.25);
      svg.appendChild(solid);

      // liquid range (mp to bp) — colored
      const liquid = document.createElementNS(SVG_NS, "rect");
      liquid.setAttribute("x", mpX);
      liquid.setAttribute("y", 5);
      liquid.setAttribute("width", Math.max(1.5, bpX - mpX));
      liquid.setAttribute("height", 8);
      liquid.setAttribute("fill", color);
      liquid.setAttribute("opacity", 0.85);
      svg.appendChild(liquid);

      // mp endcap
      const mpCap = document.createElementNS(SVG_NS, "circle");
      mpCap.setAttribute("cx", mpX); mpCap.setAttribute("cy", 9);
      mpCap.setAttribute("r", 2.5);
      mpCap.setAttribute("fill", color);
      svg.appendChild(mpCap);
      // bp endcap
      const bpCap = document.createElementNS(SVG_NS, "circle");
      bpCap.setAttribute("cx", bpX); bpCap.setAttribute("cy", 9);
      bpCap.setAttribute("r", 2.5);
      bpCap.setAttribute("fill", color);
      svg.appendChild(bpCap);

      // 20°C line per row
      const rt = document.createElementNS(SVG_NS, "line");
      rt.setAttribute("x1", rtX); rt.setAttribute("x2", rtX);
      rt.setAttribute("y1", 0); rt.setAttribute("y2", 18);
      rt.setAttribute("stroke", "var(--gold)");
      rt.setAttribute("stroke-width", 1);
      rt.setAttribute("opacity", 0.3);
      svg.appendChild(rt);

      // numeric labels (only show on hover to avoid clutter — built into title)
      svg.setAttribute("title", `${el.name} · mp ${el.mp}°C · bp ${el.bp}°C`);
      // native title for hover
      const titleEl = document.createElementNS(SVG_NS, "title");
      titleEl.textContent = `${el.sym} ${el.name} — mp ${el.mp}°C / bp ${el.bp}°C / 範囲 ${(el.bp - el.mp).toFixed(0)}°C`;
      svg.appendChild(titleEl);

      trackDiv.appendChild(svg);
      row.appendChild(trackDiv);
      container.appendChild(row);
    });
  }
  renderBars();

  document.querySelectorAll(".sort-btn").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      currentSort = b.dataset.sort;
      renderBars();
    });
  });

  // ════════════════════════════════════════════════════════════════════
  // B. SCATTER
  // ════════════════════════════════════════════════════════════════════
  (function scatter() {
    const svg = document.getElementById("scatter");
    const W = 800, H = 720;
    const ML = 70, MR = 40, MT = 40, MB = 70;
    const PW = W - ML - MR, PH = H - MT - MB;

    function sx(t) { return ML + tempToFrac(t) * PW; }
    function sy(t) { return MT + (1 - tempToFrac(t)) * PH; }

    // grid
    const TICKS_B = [-273, 0, 500, 1000, 2000, 3000, 4000, 5000];
    TICKS_B.forEach(t => {
      // vertical
      const vx = sx(t);
      const v = document.createElementNS(SVG_NS, "line");
      v.setAttribute("class", "sc-grid");
      v.setAttribute("x1", vx); v.setAttribute("x2", vx);
      v.setAttribute("y1", MT); v.setAttribute("y2", H - MB);
      svg.appendChild(v);
      const vl = document.createElementNS(SVG_NS, "text");
      vl.setAttribute("class", "sc-axis-label");
      vl.setAttribute("x", vx); vl.setAttribute("y", H - MB + 16);
      vl.setAttribute("text-anchor", "middle");
      vl.textContent = t + "°";
      svg.appendChild(vl);

      // horizontal
      const hy = sy(t);
      const h = document.createElementNS(SVG_NS, "line");
      h.setAttribute("class", "sc-grid");
      h.setAttribute("x1", ML); h.setAttribute("x2", W - MR);
      h.setAttribute("y1", hy); h.setAttribute("y2", hy);
      svg.appendChild(h);
      const hl = document.createElementNS(SVG_NS, "text");
      hl.setAttribute("class", "sc-axis-label");
      hl.setAttribute("x", ML - 8); hl.setAttribute("y", hy + 3);
      hl.setAttribute("text-anchor", "end");
      hl.textContent = t + "°";
      svg.appendChild(hl);
    });

    // axes
    const ax = document.createElementNS(SVG_NS, "line");
    ax.setAttribute("class", "sc-axis");
    ax.setAttribute("x1", ML); ax.setAttribute("x2", W - MR);
    ax.setAttribute("y1", H - MB); ax.setAttribute("y2", H - MB);
    svg.appendChild(ax);
    const ay = document.createElementNS(SVG_NS, "line");
    ay.setAttribute("class", "sc-axis");
    ay.setAttribute("x1", ML); ay.setAttribute("x2", ML);
    ay.setAttribute("y1", MT); ay.setAttribute("y2", H - MB);
    svg.appendChild(ay);

    // axis titles
    const xt = document.createElementNS(SVG_NS, "text");
    xt.setAttribute("class", "sc-axis-title");
    xt.setAttribute("x", ML + PW / 2);
    xt.setAttribute("y", H - 18);
    xt.setAttribute("text-anchor", "middle");
    xt.textContent = "melting point — 融点 (°C)";
    svg.appendChild(xt);

    const yt = document.createElementNS(SVG_NS, "text");
    yt.setAttribute("class", "sc-axis-title");
    yt.setAttribute("x", 0); yt.setAttribute("y", 0);
    yt.setAttribute("text-anchor", "middle");
    yt.setAttribute("transform", `translate(22, ${MT + PH / 2}) rotate(-90)`);
    yt.textContent = "boiling point — 沸点 (°C)";
    svg.appendChild(yt);

    // diagonal mp = bp
    const diag = document.createElementNS(SVG_NS, "line");
    diag.setAttribute("class", "sc-diag");
    diag.setAttribute("x1", sx(-273)); diag.setAttribute("y1", sy(-273));
    diag.setAttribute("x2", sx(5500)); diag.setAttribute("y2", sy(5500));
    svg.appendChild(diag);
    const diagLbl = document.createElementNS(SVG_NS, "text");
    diagLbl.setAttribute("class", "sc-axis-label");
    diagLbl.setAttribute("fill", "var(--gold)");
    diagLbl.setAttribute("x", sx(3800) + 8); diagLbl.setAttribute("y", sy(3800) - 4);
    diagLbl.textContent = "mp = bp";
    svg.appendChild(diagLbl);

    // room-temperature crosshair (20°C)
    const rtCross = document.createElementNS(SVG_NS, "line");
    rtCross.setAttribute("class", "sc-rt");
    rtCross.setAttribute("x1", sx(20)); rtCross.setAttribute("x2", sx(20));
    rtCross.setAttribute("y1", MT); rtCross.setAttribute("y2", H - MB);
    svg.appendChild(rtCross);
    const rtCross2 = document.createElementNS(SVG_NS, "line");
    rtCross2.setAttribute("class", "sc-rt");
    rtCross2.setAttribute("x1", ML); rtCross2.setAttribute("x2", W - MR);
    rtCross2.setAttribute("y1", sy(20)); rtCross2.setAttribute("y2", sy(20));
    svg.appendChild(rtCross2);
    const rtT = document.createElementNS(SVG_NS, "text");
    rtT.setAttribute("class", "sc-rt-label");
    rtT.setAttribute("x", sx(20) + 6); rtT.setAttribute("y", MT + 14);
    rtT.textContent = "20°C 常温";
    svg.appendChild(rtT);

    // quadrant guides — annotations
    const annotate = (x, y, txt) => {
      const t = document.createElementNS(SVG_NS, "text");
      t.setAttribute("class", "sc-axis-label");
      t.setAttribute("fill", "var(--ink-dim)");
      t.setAttribute("font-style", "italic");
      t.setAttribute("x", x); t.setAttribute("y", y);
      t.setAttribute("font-size", "10");
      t.textContent = txt;
      svg.appendChild(t);
    };
    annotate(sx(-200), sy(5000), "↗ 液体範囲広い");
    annotate(sx(3000), sy(3500), "↘ 液体範囲狭い");

    // points
    VALID.forEach(el => {
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "sc-group");
      g.style.setProperty("--c", `var(--c-${el.cat})`);

      const cx = sx(el.mp), cy = sy(el.bp);

      const bg = document.createElementNS(SVG_NS, "circle");
      bg.setAttribute("class", "sc-point-bg");
      bg.setAttribute("cx", cx); bg.setAttribute("cy", cy);
      bg.setAttribute("r", 10);
      g.appendChild(bg);

      const tx = document.createElementNS(SVG_NS, "text");
      tx.setAttribute("class", "sc-point-text");
      tx.setAttribute("x", cx); tx.setAttribute("y", cy);
      tx.textContent = el.sym;
      g.appendChild(tx);

      const ttl = document.createElementNS(SVG_NS, "title");
      ttl.textContent = `${el.name} (${el.jp})\nmp ${el.mp}°C / bp ${el.bp}°C\n常温: ${el.phase}`;
      g.appendChild(ttl);

      g.addEventListener("click", () => openPanel(el));
      svg.appendChild(g);
    });
  })();

  // ════════════════════════════════════════════════════════════════════
  // C. HEATMAP
  // ════════════════════════════════════════════════════════════════════
  (function heatmap() {
    const mainGrid = document.getElementById("heat-grid");
    const lanGrid = document.getElementById("heat-lan");
    const actGrid = document.getElementById("heat-act");
    const scaleEl = document.getElementById("heat-scale");

    let mode = "mp";

    // color scales
    function lerp(a, b, t) { return a + (b - a) * t; }
    function tempColor(t, min, max) {
      if (t == null) return "#2a3340";
      const f = Math.max(0, Math.min(1, (t - min) / (max - min)));
      // cold (dark blue) → mid (gold) → hot (red-orange)
      let r, g, b;
      if (f < 0.5) {
        const k = f / 0.5;
        r = lerp(48, 201, k);
        g = lerp(82, 169, k);
        b = lerp(122, 97, k);
      } else {
        const k = (f - 0.5) / 0.5;
        r = lerp(201, 220, k);
        g = lerp(169, 90, k);
        b = lerp(97, 70, k);
      }
      return `rgb(${r|0}, ${g|0}, ${b|0})`;
    }
    function phaseColor(p) {
      return { gas: "#7aa0c4", liquid: "#c9a961", solid: "#6b8a72" }[p] || "#2a3340";
    }

    function render() {
      mainGrid.innerHTML = ""; lanGrid.innerHTML = ""; actGrid.innerHTML = "";

      let min, max;
      if (mode === "mp") {
        const vals = E.map(e => e.mp).filter(v => v != null);
        min = Math.min(...vals); max = Math.max(...vals);
      } else if (mode === "bp") {
        const vals = E.map(e => e.bp).filter(v => v != null);
        min = Math.min(...vals); max = Math.max(...vals);
      }

      E.forEach(el => {
        const cell = document.createElement("button");
        cell.className = "heat-cell";

        let bg, valText;
        if (mode === "phase") {
          bg = phaseColor(el.phase);
          valText = { gas: "気", liquid: "液", solid: "固" }[el.phase] || "—";
        } else {
          const v = el[mode];
          bg = tempColor(v, min, max);
          valText = v == null ? "—" : v + "°";
          if (v == null) cell.classList.add("null");
        }
        cell.style.background = bg;
        // contrast text color
        cell.style.color = "var(--ink)";

        cell.innerHTML = `
          <div class="h-sym">${el.sym}</div>
          <div class="h-val">${valText}</div>
        `;
        cell.title = `${el.sym} ${el.name} (${el.jp}) — ${valText}`;
        cell.addEventListener("click", () => openPanel(el));

        if (el.cat === "lanthanide") {
          cell.style.gridColumn = el.c;
          lanGrid.appendChild(cell);
        } else if (el.cat === "actinide") {
          cell.style.gridColumn = el.c;
          actGrid.appendChild(cell);
        } else {
          cell.style.gridColumn = el.c;
          cell.style.gridRow = el.r;
          mainGrid.appendChild(cell);
        }
      });

      // scale legend
      if (mode === "phase") {
        scaleEl.innerHTML = `
          <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#6b8a72;display:inline-block"></span>固体 Solid</span>
          <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#c9a961;display:inline-block"></span>液体 Liquid</span>
          <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#7aa0c4;display:inline-block"></span>気体 Gas</span>
        `;
      } else {
        scaleEl.innerHTML = `
          <span>${min}°C</span>
          <span class="heat-gradient" style="background:linear-gradient(to right, rgb(48,82,122), rgb(201,169,97), rgb(220,90,70))"></span>
          <span>${max}°C</span>
        `;
      }
    }
    render();

    document.querySelectorAll(".heat-mode").forEach(b => {
      b.addEventListener("click", () => {
        document.querySelectorAll(".heat-mode").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        mode = b.dataset.mode;
        render();
      });
    });
  })();
})();

// keyboard
document.addEventListener("keydown", e => {
  if (e.key === "Escape") panel.classList.remove("open");
});
