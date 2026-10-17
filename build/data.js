/* Liftalk — content data. Edit freely; the UI reads only from here. */
window.CATEGORIES = [
  { id: "lift",  name: "Lift Talk",           ja: "リフトで話す", color: "#FF5A00", ink: "light", icon: "c-lift"  },
  { id: "tech",  name: "Technique",           ja: "滑りを教える", color: "#0E0E0E", ink: "light", icon: "c-tech"  },
  { id: "park",  name: "Park & Terrain",      ja: "パーク・地形", color: "#FFD21E", ink: "dark",  icon: "c-park"  },
  { id: "snow",  name: "Snow & Weather",      ja: "雪と天気",     color: "#3B8BD9", ink: "light", icon: "c-snow"  },
  { id: "safe",  name: "Safety & Directions", ja: "安全・方向",   color: "#E01F1F", ink: "light", icon: "c-safe"  },
  { id: "after", name: "After Riding",        ja: "滑った後",     color: "#7A6A56", ink: "light", icon: "c-after" }
];

window.PHRASES = [
  { id:1,  cat:"safe",  level:"Beginner",     en:"Look ahead.",                          ja:"前を見て",                   note:"初心者と滑るとき、一番よく使う一言。視線を先に置かせる。", tags:["前","視線","look","ahead","safety","初心者"] },
  { id:2,  cat:"park",  level:"Beginner",     en:"Keep your board flat.",                ja:"板をフラットにして",         note:"初めてBOXに入る人に。エッジを立てさせないための基本。",     tags:["ボックス","box","フラット","flat","board","パーク","park"] },
  { id:3,  cat:"park",  level:"Beginner",     en:"Don't use your edge.",                 ja:"エッジを立てないで",         note:"BOXやレール上で。短く、強く言い切る。",                     tags:["ボックス","box","エッジ","edge","rail","パーク"] },
  { id:4,  cat:"park",  level:"Beginner",     en:"Ride straight in.",                    ja:"そのまままっすぐ入って",     note:"アプローチの指示。斜めに入らせない。",                       tags:["ボックス","box","まっすぐ","straight","approach","パーク"] },
  { id:5,  cat:"park",  level:"Intermediate", en:"You can hit this wall.",               ja:"この壁で飛べるよ",           note:"hit = 当てる／飛ぶ。ジャンプ台にも使える。",                 tags:["壁","wall","hit","jump","パーク","park"] },
  { id:6,  cat:"snow",  level:"Intermediate", en:"There's some powder in the trees.",    ja:"林の中にまだパウダーがあるよ", note:"trees = 林間。ツリーランの誘い文句。",                     tags:["パウダー","powder","林","trees","雪","snow"] },
  { id:7,  cat:"snow",  level:"Intermediate", en:"Yesterday's snow might be firm now.",  ja:"昨日降った雪が固くなってるかも", note:"firm = 締まった雪。icy より柔らかい表現。",              tags:["雪","snow","固い","firm","powder","パウダー"] },
  { id:8,  cat:"snow",  level:"Beginner",     en:"Watch out — icy patch.",               ja:"気をつけて、アイスバーン",   note:"アイスバーンは和製英語。icy patch が通じる。",               tags:["アイス","icy","雪","snow","危ない","watch"] },
  { id:9,  cat:"snow",  level:"Intermediate", en:"Visibility is bad up top.",            ja:"上は視界が悪いよ",           note:"吹雪・ホワイトアウトのとき。",                               tags:["視界","visibility","吹雪","weather","snow"] },
  { id:10, cat:"safe",  level:"Beginner",     en:"Let's go right from here.",            ja:"ここから右に行こう",         note:"分岐で。left に入れ替えるだけで使える。",                     tags:["右","right","方向","direction","safety"] },
  { id:11, cat:"safe",  level:"Beginner",     en:"Wait for me at the bottom.",           ja:"下で待ってて",               note:"はぐれそうなときの定番。",                                   tags:["待つ","wait","下","bottom","safety"] },
  { id:12, cat:"tech",  level:"Beginner",     en:"Bend your knees more.",                ja:"もっと膝を曲げて",           note:"一番シンプルな技術アドバイス。",                             tags:["膝","knees","technique","曲げる","bend"] },
  { id:13, cat:"tech",  level:"Intermediate", en:"Put your weight on the front foot.",   ja:"前足に体重をかけて",         note:"ターン導入の説明に。",                                       tags:["体重","weight","前足","front","technique"] },
  { id:14, cat:"tech",  level:"Intermediate", en:"Look where you want to go.",           ja:"行きたい方向を見て",         note:"目線でターンが変わることを伝える。",                         tags:["目線","look","technique","方向"] },
  { id:15, cat:"lift",  level:"Beginner",     en:"Is this your first time in Hokkaido?", ja:"北海道は初めて？",           note:"リフトでの最初の一言。",                                     tags:["北海道","hokkaido","初めて","first","lift","リフト"] },
  { id:16, cat:"lift",  level:"Beginner",     en:"Where do you usually ride?",           ja:"どこで滑ってるの？",         note:"ride = 滑る。ski/snowboard どちらでも。",                    tags:["どこ","where","滑る","ride","lift","リフト"] },
  { id:17, cat:"lift",  level:"Beginner",     en:"Let's meet at the gondola.",           ja:"ゴンドラのとこで集合",       note:"集合場所を決めるとき。",                                     tags:["ゴンドラ","gondola","集合","meet","lift"] },
  { id:18, cat:"after", level:"Beginner",     en:"That run was insane.",                 ja:"今のヤバかった",             note:"褒めるときの一言。sick / unreal も同じ。",                   tags:["ヤバい","insane","run","after","最高"] },
  { id:19, cat:"after", level:"Beginner",     en:"Let's take one more run.",             ja:"もう一本行こう",             note:"one more run = もう一本。",                                  tags:["もう一本","run","again","after"] },
  { id:20, cat:"after", level:"Beginner",     en:"My legs are done.",                    ja:"脚がもう限界",               note:"done = 終わってる。休憩の合図に。",                          tags:["脚","legs","疲れた","tired","after"] }
];

window.QUICK_CHIPS = ["前を見て", "powder", "ボックス", "lift", "膝"];
