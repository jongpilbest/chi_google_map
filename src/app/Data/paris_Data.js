const PARIS_AREAS = [
  {
    city: "Paris 1er Arrondissement",
    name: "파리 1구",
    description:
      "루브르 박물관과 튈르리 정원이 있는 파리의 중심 지역으로 예술과 역사적 랜드마크가 밀집해 있습니다.",
    tagging: "#Louvre #HistoricCenter",
    place_id: "ChIJPStI0CVu5kcRUBqUaMOCCwU",
    location: { lat: 48.86352752026389, lng: 2.333884049386432 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyUCXsuau7kHVqyXkzSVQPsqMOU_NdPZXbTNofEbU2r472chSbWN9U30YWdd6CbZeoG8IreSzND6T9B6YCszwUnd8VkzkmptBvMoQYMLyCE0HNCokWfGc7TgBeeckAFPIjI1SNA=s1600-w800'
  },
  {
    city: "Paris 2e Arrondissement",
    name: "파리 2구",
    description:
      "쇼핑 아케이드, 부티크, 카페가 모여 있는 활기찬 상업 중심지입니다.",
    tagging: "#ShoppingArcades #Boutiques",
    place_id: "ChIJ_WhMlTxu5kcRYBqUaMOCCwU",
    location: { lat: 48.869491635022484, lng: 2.338979968718544 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxQOsTeGYdsUyPYO8-o-tv3XIh8NAW_wfx--1Flnj283ClRFdf329aYWn3er_54IFAsE0tFb86_H4XcgIFEa8AQ--d_2JD-z4-t7hmTecKSRvCUwUDyL52p-HVh8FLNJxTUn8F7=s1600-w800'
  },  
{
    city: "Paris 3e Arrondissement",
    name: "파리 3구",
    description:
      "르 마레 지구 북쪽으로, 예술 갤러리와 개성 있는 상점이 많은 감각적인 지역입니다.",
    tagging: "#LeMarais #ArtDistrict",
    place_id: "ChIJw0-tXgRu5kcRcBqUaMOCCwU",
    location: { lat: 48.86328665814835, lng: 2.357267549388584 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz8ngQR80khVa4UUiWdDi9WWC7hB8ZOZl-Iwvpv8Re1NEfBgnwarc7GwtaVE28cqOE1U-bFR7D5iyTRqWnVHZio75v85LVr2-2AXENuGEzKA1iUKd2Bh8DlE3Sz3bh8dYAC-zB9=s1600-w800'
  },
  {
    city: "Paris 4e Arrondissement",
    name: "파리 4구",
    description:
      "노트르담 대성당과 시청사가 있는 역사적 중심지로 관광객들이 많이 찾는 곳입니다.",
    tagging: "#NotreDame #HistoricLandmarks",
    place_id: "ChIJo8SoIv1x5kcRgBqUaMOCCwU",
    location: { lat: 48.85577803031334, lng: 2.3555053948760905 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwLjj5KBrBfpmzgyNLqTYMDFAbr7K4iuxk3Mc6NlGUJPqoPWdNpfGnHTV5TBr1NJ2GBI9cyGODUo4Ccg89oQwjoiB_wKE2-vLt7y53O5idxDKRuwRCNkdUPs07sW7C51tht-yMY=s1600-w800',

},
  {
    city: "Paris 5e Arrondissement",
    name: "파리 5구(라탱 지구)",
    description:
      "대학교와 서점이 모여 있는 라탱 지구로 젊고 학구적인 분위기의 지역입니다.",
    tagging: "#LatinQuarter #StudentLife",
    place_id: "ChIJb_T3b-9x5kcRkBqUaMOCCwU",
    location: { lat: 48.84465387575526, lng: 2.3508571017430957 },
   image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwniP09ncNIhFo7wmi1r42tvsTAnlQKRfr4G2O7ECrNgbQLGCXoG24LJDl7f-rnzh2GCys_9yx3B6DY4ix0M-CQ2nNKO5squhq_PtokrIuPa2nM-_2rBFcyhf54b-_OfS1OHPZ9BA=s1600-w800'
  },
  {
    city: "Paris 6e Arrondissement",
    name: "파리 6구",
    description:
      "생제르맹 데 프레를 중심으로 세련된 카페와 예술적 분위기가 공존하는 지역입니다.",
    tagging: "#SaintGermain #ClassicParis",
    place_id: "ChIJGcU48NBx5kcRoBqUaMOCCwU",
    location: { lat: 48.849106004203286, lng: 2.332990514531311 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwEmyfGkHyP_jIOvGxuLOcy3obst4wUSSaA13OChCymQsB0L1n94VMylK82BIK0X_IfpgiDA02PdV3wwzCWuD_kAL1h4rp7E2oE29DHosUiB1pMWkFQEcRHytyhfbYY6JNENfs=s1600-w800'
  },
  {
    city: "Paris 7e Arrondissement",
    name: "파리 7구",
    description:
      "에펠탑이 위치한 고급 주거 지역으로 조용하고 품격 있는 분위기가 특징입니다.",
    tagging: "#EiffelTower #ElegantDistrict",
    place_id: "ChIJWWRTZChw5kcRsBqUaMOCCwU",
    location: { lat: 48.857310803735906, lng: 2.3118253169029725 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwqbNRoGDo1LDgq_RuoBmRlik-l7eQVMyjCWqAv50RgH4wvdcdvn_dzUyg6DR1XqjQ9gJpA53DRjJQaRSJ4QG6rij_PgEeM2lnrP2dT5wsFrVKm4InXf2bk19QXIygOUkJfA6E=s1600-w740'
  },
  {
    city: "Paris 8e Arrondissement",
    name: "파리 8구",
    description:
      "샹젤리제 거리와 개선문이 있는 대표적인 럭셔리 상업 지역입니다.",
    tagging: "#ChampsElysees #Luxury",
    place_id: "ChIJdWkEFsZv5kcRwBqUaMOCCwU",
    location: { lat: 48.87340467488141, lng: 2.313758887384266 },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxKTcBGydlUhZ9OudAz8hqfQc1F1jYPnrEhJihPzKfTA3Hr3hfb52_HslSuQJfomnNK2zsez4HSuil6Srz8TanGYoDNbMq2TB9KQKmVAlF71w4kl3T8a6OwQM5ozya86H7CG3jf=s1600-w800'},
  {
    city: "Paris 9e Arrondissement",
    name: "파리 9구",
    description:
      "오페라 가르니에와 대형 백화점이 있는 문화·엔터테인먼트 중심지입니다.",
    tagging: "#Opera #ShoppingDistrict",
    place_id: "ChIJvdxBeEdu5kcR0BqUaMOCCwU",
    location: { lat: 48.87860546103231, lng: 2.337097509796401 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzmBPFd1TrSrW0Y5LCvetckBBKYz6-WU2wprpXy9kvHZ0Mh0c2Yw6dF9623S4hFL5nIebK_Axy1bPLUYrmDlcVKHHg75D89ZmLO4D2s4ZzAfmvTuyP28dPrXanLN25O9ELT5hk=s1600-w800'
  },
  {
    city: "Paris 10e Arrondissement",
    name: "파리 10구",
    description:
      "생마르탱 운하 주변으로 트렌디한 분위기와 다양한 문화가 공존하는 지역입니다.",
    tagging: "#CanalSaintMartin #Trendy",
    place_id: "ChIJY06eIW5u5kcRnH0unYQCVb8",
    location: { lat: 48.87545141216293, lng: 2.360600241511158 },
image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyxCUKV4gfwoAztkoszCfnYQe5DzYMEPhEUsEHa6WhUTx9tvokUJGJ3q-yBjSohoSTJp4a7f8n1WEy_wkkgINFwohVR0zwzlt0I3XCFwsCoKz5_0IE_xKis_SExJ4Dv3ninkl6e=s1600-w800'
  },
  {
    city: "Paris 11e Arrondissement",
    name: "파리 11구",
    description:
      "파리에서 가장 활기찬 미식·바·나이트라이프 중심지로 유명한 지역입니다.",
    tagging: "#Nightlife #FoodScene",
    place_id: "ChIJxSr71vZt5kcR8BqUaMOCCwU",
    location: { lat: 48.86051750418944, lng: 2.377267209721391 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzmxsbMB3BcMN25GioKKvGFxfDHWUOLB71inyXHjkf9eS_NOUu82DaAo5h3pJLQRN3tmLnMXa6G634WATqdmQFBzyIAc7q_H_jgx_qVZINAHFxrUAxXlbtDDUv2L2MTyB5sD2zRGg=s1600-w800'
  },
  {
    city: "Paris 12e Arrondissement",
    name: "파리 12구",
    description:
      "베르시 빌리지와 보아 드 뱅센 공원이 있는 자연 친화적이고 여유로운 지역입니다.",
    tagging: "#BercyVillage #Nature",
    place_id: "ChIJR9fXt4xy5kcRABuUaMOCCwU",
    location: { lat: 48.84452586709017, lng: 2.3914005265843596 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyMlw7ncD1HB1Gt0jFrI6msJDwbumBVlLQwDWy94_g4VOuBDVOIVuBtMkx4k58LMM7yhBEDhP7YORIQ0OGsqXDf_5gYhfsiigQ_HSLL6d02u_LTXgB6aswSajQd6pS7zkUvkx8=s1600-w800'

  },
  {
    city: "Paris 13e Arrondissement",
    name: "파리 13구",
    description:
      "아시아 거리와 스트리트 아트가 유명한 현대적이고 다문화적인 지역입니다.",
    tagging: "#AsianDistrict #StreetArt",
    place_id: "ChIJgwVOTCdy5kcREBuUaMOCCwU",
    location: { lat: 48.83116167926109, lng: 2.360421352352501 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwR9e2-bGymnhsen8k2GlW1DVNZvS-rsLCwtGzFeKnux_3_ABWephPOTL7M9_EIt28W7ECcbByBY0NC37Eguw_Ci7pOPJA3mFg3nOTS5zcRrHV2WXfpH2-4v4K0ohyossAfaXLv=s1600-w800'
  },
  {
    city: "Paris 14e Arrondissement",
    name: "파리 14구",
    description:
      "몬파르나스 타워와 카타콤브가 위치한 안정된 주거 지역입니다.",
    tagging: "#Montparnasse #LocalLife",
    place_id: "ChIJT0ClqLNx5kcRIBuUaMOCCwU",
    location: { lat: 48.832850789795934, lng: 2.325527514450023 },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwwjd2zXDufFfzhfOQsHgyHnQVM_xT84lxduA-hwFmuGRDlPBsSJBNrCs1O3Cy2EluuO0pGcAzbnGq0yvC7pRx2U7OIEMWP8AQOFFBBZRDkuYhcWZbyavF3CYfAy3zRmxCTdds=s1600-w800',}
,  {
    city: "Paris 15e Arrondissement",
    name: "파리 15구",
    description:
      "파리에서 가장 큰 주거지 중 하나로, 조용하고 가족 친화적인 분위기가 특징입니다.",
    tagging: "#Residential #CalmArea",
    place_id: "ChIJ9WBuGRRw5kcRMBuUaMOCCwU",
    location: { lat: 48.84017823066406, lng: 2.293372471175387 },
   image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw8RZF7dtD1keC4rvJ2ms5USGUZ5jaE9gWiuhwS1ik9XcNsbxpAJvIpkkIdeGbJYAnLtBkDfFmBSHeNKUrCnZAWNHVDgIxoPP5L3-QljUFr77tJ79oDUdFGBtXSAV0XYo_gVZBy=s1600-w800'
  },
  {
    city: "Paris 16e Arrondissement",
    name: "파리 16구",
    description:
      "파리에서 가장 부유한 지역 중 하나로, 고급 주거지와 공원이 조화를 이루고 있습니다.",
    tagging: "#LuxuryLiving #Elegant",
    place_id: "ChIJ6VVDJrN65kcRQBuUaMOCCwU",
    location: { lat: 48.86051411259114, lng: 2.260914748448516 },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxIjVoOiOc8C3RuzSbywuWVtNQzczewZ9Cs4TLj2BcvwUL1SakFGfQnXq8c6c0ln60caOw2H4tlh4ZThnT7tMk83PpqK7lmEpn8pi9X0I5QHZB_DNCnViJuqBPhO4A8SAnKt5-21Q=s1600-w800'
  },
  {
    city: "Paris 17e Arrondissement",
    name: "파리 17구",
    description:
      "거주 구역과 상업 지구가 균형 있게 섞여 있는 모던한 지역입니다.",
    tagging: "#ModernLiving #LocalVibes",
    place_id: "ChIJVRQP1aJv5kcRUBuUaMOCCwU",
    location: { lat: 48.88920702036131, lng: 2.308875295017714 },
   image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzpInTm-PtW4jE8yu1RbFeMkWOKkx-x4qIvAqNdoNLePvVZ_Xfp70Oz05DX1LK2Sty8IITFhf_DXysyhmPyabsysh1MvO3V1D-_79b5RmoE_8wDEQKBCTNMO10Nk0c2Q_5AFa_5-A=s1600-w800'
  },{
    city: "Paris 18e Arrondissement",
    name: "파리 18구(몽마르트르)",
    description:
      "사크레쾨르 대성당과 몽마르트르 언덕이 있는 파리 예술의 상징 지역입니다.",
    tagging: "#Montmartre #ArtisticParis",
    place_id: "ChIJZamWt2Bu5kcRYBuUaMOCCwU",
    location: { lat: 48.8966684830547, lng: 2.3474911650646884 },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxkULy5AoGK0sb89YZEGwCGlUMBQXKzoiP5AvLTMqnWC2OWCHLwUhK1ZaUEicFa7twDvZiEJCu989UZ-gi0PHCVS--ze6q5OSbdDVtRSUS1uI3UMW4qVDijWluBd3hTgDr_By9OQg=s1600-w800',
  },
  {
    city: "Paris 19e Arrondissement",
    name: "파리 19구",
    description:
      "레빌레트 공원과 운하가 매력적인 자연·문화 중심 지역입니다.",
    tagging: "#Parks #CanalLife",
    place_id: "ChIJ59fvwcht5kcRcBuUaMOCCwU",
    location: { lat: 48.88675188649778, lng: 2.3860493808482097 },
   image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzlcztpz9GMD89KpSq_9DeEFs19nVZuz1aREXwD3Mr-ZyOi39nXDZsKTdXd2WSSBS6rNSzdqtSRneHbhuaPpflMQlImiS9u5mEG8vOUusDRsZcfbF339yMB7OWSvl7ymqK2zoYm_w=s1600-w800'
  },
  {
    city: "Paris 20e Arrondissement",
    name: "파리 20구",
    description:
      "벨빌·메니르몽탕 등 예술적이고 다양한 문화가 공존하는 활기찬 지역입니다.",
    tagging: "#Belleville #CreativeDistrict",
    place_id: "ChIJ6_zai45t5kcRgBuUaMOCCwU",
    location: { lat: 48.86534539559569, lng: 2.403664560849509 },
   image:'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyJgaL2KOGdSYkrSEr053FTGcnB71-rotfwtmb2bn2bBZIIcCIVO3TLNz_-AmdfUBevrlGOI0tAXtO7optAno1bE18L7nlIKeb9_t3q5WXeJDUe2DEXKLCrZBrLtfMdq4cTUvsX=s1600-w800'
  }
];


export default PARIS_AREAS;
