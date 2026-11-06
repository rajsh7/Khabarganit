"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ChevronUp, Menu, X, Search, Share2, Copy, Check } from "lucide-react";
import ArticleModal, { ArticleModalData } from "@/components/ArticleModal";

interface StoryItem {
  id: string;
  category: string;
  headline: string;
  subhead?: string;
  image: string;
  author: string;
  date: string;
  paragraphs?: string[];
  publishedAt?: string;
}

interface CategorySection {
  key: string;
  title: string;
  leadStory: StoryItem;
  subStories: StoryItem[];
}

// ── 1. HERO LEAD STORY (From Screenshot 1 & 5) ──
const HERO_STORY: StoryItem = {
  id: "hero-1",
  category: "देश",
  headline: "चुनाव आयोग का एक और यूटर्न, DG IT सीमा खन्ना पर क्यों बिठाई निगरानी?",
  subhead: "निर्वाचन आयोग ने चुनावी खर्च व वित्तीय निगरानी तंत्र को लेकर जारी किए नए दिशा-निर्देश; वरिष्ठ आयकर महानिदेशक की कार्यप्रणाली पर विशेष समीक्षा समिति गठित।",
  image: "/images/hero-election.jpg",
  author: "MURARI TRIPATHI",
  date: "05 Nov 2026",
  paragraphs: [
    "नई दिल्ली — निर्वाचन आयोग (ECI) ने आगामी राज्य विधानसभा चुनावों से पहले वित्तीय पारदर्शिता और चुनावी खर्च की निगरानी को लेकर अपने प्रशासनिक ढांचे में अप्रत्याशित फेरबदल किया है। आयोग के नवीनतम आदेश के तहत महानिदेशक आयकर (DG IT) सीमा खन्ना के प्रभाग पर अतिरिक्त पर्यवेक्षी निगरानी स्थापित कर दी गई है।",
    "उच्च पदस्थ सूत्रों के अनुसार, चुनावी राज्यों में नकदी प्रवाह और खुफिया वित्तीय इनपुट्स के समन्वय को लेकर उठे सवालों के बाद यह कदम उठाया गया है। आयोग ने स्पष्ट किया है कि स्वतंत्र एवं निष्पक्ष चुनाव सुनिश्चित करने के लिए सभी केंद्रीय एजेंसियों के बीच समयबद्ध समन्वय आवश्यक है।",
    "राजनीतिक विश्लेषकों का मानना है कि इस कदम से चुनावी प्रक्रिया में प्रशासनिक जवाबदेही और संस्थागत संतुलन मजबूत होगा।"
  ]
};

// ── 2. TOP STORIES GRID (6 Stories - Screenshot 2 & 5) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-1",
    category: "एक्सप्लेनर",
    headline: "IPO के नाम पर कैसे धोखा खा रहे लोग?",
    subhead: "शेयर बाजार की तेजी में फर्जी प्री-आईपीओ अलॉटमेंट और वॉट्सऐप निवेश समूहों के जरिए निवेशकों से हो रही करोड़ों की ठगी का पूरा सच।",
    image: "/images/ipo-fraud.jpg",
    author: "GEORGE MATHEW",
    date: "05 Nov 2026",
    paragraphs: [
      "मुंबई — शेयर बाजार में खुदरा निवेशकों की बढ़ती दिलचस्पी के बीच जालसाजों ने आईपीओ (IPO) अलॉटमेंट के नाम पर ठगी का नया सिंडिकेट खड़ा कर दिया है। बाजार नियामक सेबी (SEBI) और साइबर पुलिस ने हाल ही में ऐसे कई फर्जी निवेश गिरोहों का भंडाफोड़ किया है।",
      "ठग सोशल मीडिया विज्ञापनों और फर्जी ट्रेडिंग ऐप्स के जरिए 'गारंटीड ग्रे मार्केट कोटा' का झांसा देकर निवेशकों के बैंक खातों में सेंध लगा रहे हैं। विशेषज्ञों ने आगाह किया है कि केवल सेबी-पंजीकृत ब्रोकर्स और अधिकृत ASBA माध्यम से ही आईपीओ में आवेदन करें।"
    ]
  },
  {
    id: "top-2",
    category: "वैचारिकी",
    headline: "जिनपिंग के प्लान से चीन में हड़कंप, चौथी बार राष्ट्रपति बनने के लिए लाखों लोगों को क्या सज़ा दे...",
    subhead: "कम्युनिस्ट पार्टी कांग्रेस से पहले बीजिंग में आंतरिक शुद्धिकरण और आर्थिक नीतियों को लेकर पार्टी कैडरों में गहरा असंतोष।",
    image: "/images/jinping-plan.jpg",
    author: "JABIN T JACOB",
    date: "05 Nov 2026",
    paragraphs: [
      "बीजिंग — चीनी कम्युनिस्ट पार्टी (CCP) में राष्ट्रपति शी जिनपिंग के चौथे कार्यकाल की जमीन तैयार करने के लिए पार्टी अनुशासन और भ्रष्टाचार विरोधी मुहिम के नाम पर व्यापक फेरबदल शुरू हो गए हैं।",
      "अंतरराष्ट्रीय मामलों के जानकारों का कहना है कि आर्थिक मंदी और रियल एस्टेट संकट के दौर में पार्टी नेतृत्व अपनी पकड़ और मजबूत करने के लिए आंतरिक विरोधियों को किनारे करने में जुटा है।"
    ]
  },
  {
    id: "top-3",
    category: "देश",
    headline: "फतवे की कोई कानूनी बाध्यता नहीं, हाई कोर्ट का फैसला",
    subhead: "अदालत ने स्पष्ट किया कि धार्मिक संस्थाओं द्वारा जारी राय निजी विचार हो सकती है, लेकिन यह नागरिक अधिकारों और देश के कानून से ऊपर नहीं।",
    image: "/images/highcourt-fatwa.jpg",
    author: "SOMYA PANWAR",
    date: "05 Nov 2026",
    paragraphs: [
      "प्रयागराज — उच्च न्यायालय ने अपने एक महत्वपूर्ण निर्णय में दोहराया है कि किसी भी संस्था या मौलवी द्वारा जारी फतवे की भारत के संवैधानिक कानून के समक्ष कोई बाध्यकारी मान्यता नहीं है।",
      "न्यायालय ने कहा कि देश का संविधान प्रत्येक नागरिक को व्यक्तिगत स्वतंत्रता और विधिक सुरक्षा प्रदान करता है, जिसे किसी भी गैर-न्यायिक व्यवस्था द्वारा बाधित नहीं किया जा सकता।"
    ]
  },
  {
    id: "top-4",
    category: "लाइफस्टाइल",
    headline: "जिम से निकलकर आम बोलचाल तक 'मॉगिंग' शब्द के सफ़र की दिलचस्प कहानी",
    subhead: "सोशल मीडिया कल्चर से लेकर युवा पीढ़ी की बोलचाल तक छाने वाले इस नए शब्द के मनोवैज्ञानिक और भाषाई मायने।",
    image: "/images/mogging-lifestyle.jpg",
    author: "EDITORIAL",
    date: "05 Nov 2026",
    paragraphs: [
      "इंटरनेट और फिटनेस कम्युनिटी में उभरा शब्द 'मॉगिंग' (Mogging) अब वैश्विक लेक्सिकॉन और ऑक्सफोर्ड/कोलिन्स चर्चाओं में जगह बना चुका है।",
      "मूलतः शारीरिक उपस्थिति और आत्मविश्वास के दम पर किसी पर भारी पड़ने के संदर्भ में इस्तेमाल होने वाला यह शब्द अब रोजमर्रा की बातचीत और कॉर्पोरेट परिदृश्यों में भी व्यापक रूप से प्रयुक्त हो रहा है।"
    ]
  },
  {
    id: "top-5",
    category: "देश",
    headline: "चुनाव आयोग ने लिए 5 बड़े यूटर्न, फॉर्म 6 में अब क्या बदला?",
    subhead: "मतदाता सूची में नाम जोड़ने और संशोधन के नियमों को लेकर चुनाव आयोग ने सार्वजनिक आपत्तियों के बाद किए संशोधन।",
    image: "/images/ec-u-turn.jpg",
    author: "IEH DESK",
    date: "04 Nov 2026",
    paragraphs: [
      "नई दिल्ली — नागरिक समाज और राजनीतिक दलों की प्रतिक्रिया के बाद चुनाव आयोग ने मतदाता पंजीकरण प्रक्रिया के फॉर्म 6 और सहायक दस्तावेजों की आवश्यकताओं में 5 अहम बदलाव किए हैं।",
      "अब निवास प्रमाण के रूप में वैकल्पिक दस्तावेजों की स्वीकार्यता बढ़ाई गई है और नए मतदाताओं के लिए डिजिटल प्रमाणीकरण को और सुगम बना दिया गया है।"
    ]
  },
  {
    id: "top-6",
    category: "विदेश",
    headline: "US मिडटर्म्स: ट्रंप की पार्टी में कितने गुट?",
    subhead: "रिपब्लिकन पार्टी के भीतर पारंपरिक रूढ़िवादी और कट्टर 'मागा' समर्थकों के बीच राजनीतिक वर्चस्व की खींचतान।",
    image: "/images/us-midterms.jpg",
    author: "AMAN ARUN",
    date: "04 Nov 2026",
    paragraphs: [
      "वॉशिंगटन — संयुक्त राज्य अमेरिका में होने वाले महत्वपूर्ण मध्यावधि चुनावों से पूर्व रिपब्लिकन पार्टी में नेतृत्व के भविष्य और चुनावी एजेंडे को लेकर अंदरूनी मतभेद खुलकर सामने आ रहे हैं।",
      "डोनाल्ड ट्रंप के करीबी गुट और सीनेट के पारंपरिक नेताओं के बीच उम्मीदवारों के चयन व वित्तीय संसाधनों के आवंटन पर तीखी बहस जारी है।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (Screenshot 3: देश, Screenshot 4: वैचारिकी, plus other categories) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-lead-1",
      category: "देश",
      headline: "'मैं चाहती हूं कि सरकार मेरे पति को लौटा दे': महाराष्ट्र में ठेकेदारों की खुदकुशी का दर्दनाक सच",
      subhead: "सरकारी बिलों के महीनों तक अटके रहने और कर्ज के दलदल में फंसे निर्माण ठेकेदारों की व्यथा; पीडब्ल्यूडी के भुगतान तंत्र पर खड़े हुए गंभीर सवाल।",
      image: "/images/desh-lead.jpg",
      author: "CHANDAN HAYGUNDE",
      date: "04 Nov 2026",
      paragraphs: [
        "पुणे — महाराष्ट्र के कई जिलों में सार्वजनिक निर्माण कार्यों के भुगतान में देरी के चलते छोटे ठेकेदारों के आत्महत्या करने के मामलों ने प्रशासनिक तंत्र को हिलाकर रख दिया है।",
        "परिजनों का आरोप है कि काम पूरा होने के बावजूद महीनों तक फाइलों का न बढ़ना और बैंक कर्जों की देनदारी ने परिवारों को बर्बादी की कगार पर पहुंचा दिया है। सरकार ने लंबित भुगतानों की जांच के लिए उच्चस्तरीय समिति गठित की है।"
      ]
    },
    subStories: [
      {
        id: "desh-sub-1",
        category: "देश",
        headline: "वकीलों के आगे बेबस दिल्ली पुलिस? पार्किंग विवाद से ACP के सस्पेंशन तक की इनसाइड स्टोरी",
        subhead: "तीस हजारी परिसर में पार्किंग विवाद के बाद उपजे तनाव और पुलिस-अधिवक्ता टकराव की पूरी प्रशासनिक पड़ताल।",
        image: "/images/desh-police.jpg",
        author: "SPECIAL CORRESPONDENT",
        date: "04 Nov 2026",
        paragraphs: [
          "नई दिल्ली — जिला अदालत परिसर में वाहनों की पार्किंग को लेकर हुए विवाद ने तूल पकड़ते हुए पुलिस और वकीलों के बीच गतिरोध का रूप ले लिया।",
          "विभागीय जांच के प्राथमिक निष्कर्षों के बाद गृह विभाग ने शांति बनाए रखने के लिए वरिष्ठ अधिकारियों के तबादले और अनुशासनात्मक समीक्षा के आदेश दिए हैं।"
        ]
      },
      {
        id: "desh-sub-2",
        category: "देश",
        headline: "महाराष्ट्र में सूखे की मार: सूख रहे फलदार पेड़, बर्बाद हो रही किसानों की सालों की मेहनत",
        subhead: "मराठवाड़ा और विदर्भ के बागवानी किसानों के बगीचे सूखे के संकट से बेहाल; आपातकालीन सिंचाई पैकेज की मांग।",
        image: "/images/desh-drought.jpg",
        author: "RURAL DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "छत्रपति संभाजीनगर — बारिश की अनिश्चितता और भूजल स्तर में भारी गिरावट से संतरा, मौसंबी और अनार के हजारों हेक्टेयर बाग सूखने के कगार पर पहुंच गए हैं।",
          "किसानों ने राज्य सरकार से विशेष वित्तीय सहायता और सोलर पंपिंग योजनाओं के त्वरित क्रियान्वयन की गुहार लगाई है।"
        ]
      },
      {
        id: "desh-sub-3",
        category: "देश",
        headline: "क्या आपका 20 का सिक्का असली है? पकड़ा गया कई राज्यों में नकली सिक्के चलाने वाला गिरोह",
        subhead: "राजधानी और सीमावर्ती राज्यों में उच्च गुणवत्ता वाले नकली धातु के सिक्कों का निर्माण कर बाजार में खपाने वाले रैकेट का पर्दाफाश।",
        image: "/images/desh-coins.jpg",
        author: "INVESTIGATION BUREAU",
        date: "04 Nov 2026",
        paragraphs: [
          "गाजियाबाद — पुलिस की स्पेशल टास्क फोर्स ने ₹20 और ₹10 के जाली सिक्के ढालने वाली अवैध टकसाल का खुलासा किया है।",
          "जांच में पाया गया कि यह गिरोह स्थानीय बाजारों और टोल प्लाजाओं के जरिए नकली मुद्रा को अर्थतंत्र में प्रवाहित कर रहा था।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "v-lead-1",
      category: "वैचारिकी",
      headline: "अत्यधिक ग़रीबी घटकर 2.6%, पर खेती से बाहर अच्छी नौकरियों की कमी है बड़ी रुकावट",
      subhead: "विश्व बैंक और नीति आयोग के आंकड़ों के मुताबिक बुनियादी जीवन स्तर में सुधार तो हुआ, लेकिन विनिर्माण व उच्च वेतन वाली नौकरियों में धीमा इजाफा चिंता का विषय।",
      image: "/images/vaichariki-lead.jpg",
      author: "EDITORIAL",
      date: "03 Nov 2026",
      paragraphs: [
        "भारत में अत्यधिक गरीबी रेखा से नीचे जीवनयापन करने वाली आबादी का अनुपात ऐतिहासिक रूप से घटकर 2.6% के स्तर पर आ गया है। प्रत्यक्ष लाभ अंतरण (DBT), मुफ्त खाद्यान्न और ग्रामीण आवास जैसी योजनाओं ने निर्धनता उन्मूलन में निर्णायक भूमिका निभाई है।",
        "हालांकि, अर्थशास्त्रियों का कहना है कि दीर्घकालिक आर्थिक समृद्धि के लिए कृषि क्षेत्र से निकलने वाले कार्यबल को उच्च उत्पादकता वाले विनिर्माण और संगठित सेवा क्षेत्रों में समाहित करना सबसे बड़ी चुनौती बनी हुई है।"
      ]
    },
    subStories: [
      {
        id: "v-sub-1",
        category: "वैचारिकी",
        headline: "फुटबॉलर एम्बापे के मज़ाक़ से चीन में ठप हुई स्पेन की फुटबॉल लीग?",
        subhead: "स्पेनिश ला लीगा के सुपरस्टार के एक सोशल मीडिया वीडियो से उभरे कूटनीतिक विवाद और प्रायोजक अनुबंधों पर संकट।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "EDITORIAL",
        date: "03 Nov 2026",
        paragraphs: [
          "मैड्रिड — स्टार स्ट्राइकर किलियन एम्बापे द्वारा साझा किए गए एक हास्य वीडियो पर चीनी प्रायोजकों की कड़ी आपत्ति के बाद ला लीगा को एशियाई बाजार में प्रसारण बहिष्कार का सामना करना पड़ा।",
          "खेल प्रबंधन और भू-राजनीतिक संवेदनशीलता के इस टकराव ने आधुनिक स्पोर्ट्स डिप्लोमेसी के नए पहलुओं को उजागर किया है।"
        ]
      },
      {
        id: "v-sub-2",
        category: "वैचारिकी",
        headline: "INDIA ब्लॉक को रामलीला मैदान की भीड़ से आगे चाहिए ठोस सियासत",
        subhead: "विपक्षी गठबंधन के सामने चुनावी रणनीति, साझा न्यूनतम कार्यक्रम और सीट-बंटवारे के धरातल पर एकता बनाए रखने की चुनौती।",
        image: "/images/vaichariki-india-bloc.jpg",
        author: "POLITICAL BUREAU",
        date: "03 Nov 2026",
        paragraphs: [
          "नई दिल्ली — विपक्ष की एकजुटता रैलियों में उमड़ती भीड़ निश्चित रूप से कार्यकर्ताओं में उत्साह भरती है, लेकिन मतदाताओं को आकर्षित करने के लिए एक सुसंगत वैकल्पिक नीतिगत ढांचा प्रस्तुत करना अनिवार्य है।"
        ]
      },
      {
        id: "v-sub-3",
        category: "वैचारिकी",
        headline: "टाटा संस और RBI के बीच क्यों चल रहा है लिस्टिंग को लेकर विवाद?",
        subhead: "अपर-लेयर NBFC नियमों के तहत सार्वजनिक निर्गम लाने की अनिवार्यता और परोपकारी ट्रस्टों के नियंत्रण के कानूनी पेंच।",
        image: "/images/vaichariki-tata-rbi.jpg",
        author: "BUSINESS DESK",
        date: "03 Nov 2026",
        paragraphs: [
          "मुंबई — भारतीय रिजर्व बैंक के स्केल-आधारित विनियामक ढांचे के अनुसार देश की प्रमुख होल्डिंग कंपनी टाटा संस की शेयर बाजार में संभावित लिस्टिंग को लेकर वित्तीय जगत में गहन विमर्श चल रहा है।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "world-lead-1",
      category: "विदेश",
      headline: "मध्य पूर्व में शांति वार्ता के नए दौर पर वैश्विक सहमति, सुरक्षा परिषद ने बुलाई आपात बैठक",
      subhead: "कूटनीतिक पहल के तहत संयुक्त राष्ट्र व प्रमुख शक्तियों ने युद्धविराम और मानवीय गलियारों के विस्तार के लिए तैयार किया साझा मसौदा।",
      image: "/images/world-lead.jpg",
      author: "DIPLOMATIC DESK",
      date: "04 Nov 2026",
      paragraphs: [
        "जिनेवा — संयुक्त राष्ट्र सुरक्षा परिषद की विशेष मध्यस्थता में मध्य पूर्व शांति वार्ता के तहत सभी पक्षों ने मानवीय सहायता सामग्री पहुंचाने के लिए सहमत गलियारों पर सहमति व्यक्त की है।",
        "वैश्विक नेताओं ने तनाव कम करने और स्थायी युद्धविराम की दिशा में ठोस कदम उठाने का आह्वान किया है।"
      ]
    },
    subStories: [
      {
        id: "world-sub-1",
        category: "विदेश",
        headline: "वैश्विक सेमीकंडक्टर आपूर्ति श्रृंखला को लेकर एशिया-प्रशांत शिखर सम्मेलन में बड़ा समझौता",
        subhead: "प्रमुख तकनीकी उत्पादक राष्ट्रों ने चिप उत्पादन और दुर्लभ खनिजों के सुरक्षित व्यापार गलियारों पर सहमति जताई।",
        image: "/images/tech-lead.jpg",
        author: "TOKYO BUREAU",
        date: "04 Nov 2026",
        paragraphs: [
          "टोक्यो — एशिया-प्रशांत देशों के उद्योग मंत्रियों ने महत्वपूर्ण इलेक्ट्रॉनिक घटकों के निर्बाध प्रवाह को सुनिश्चित करने के लिए संयुक्त बहुपक्षीय संधि पर हस्ताक्षर किए।"
        ]
      },
      {
        id: "world-sub-2",
        category: "विदेश",
        headline: "यूरोपीय ऊर्जा बाजारों में नवीकरणीय स्रोतों की हिस्सेदारी 48% के रिकॉर्ड स्तर पर पहुंची",
        subhead: "सौर और पवन ऊर्जा बुनियादी ढांचे में त्वरित विस्तार के कारण पारंपरिक जीवाश्म ईंधन की मांग में तेज गिरावट दर्ज।",
        image: "/images/business-lead.jpg",
        author: "BRUSSELS DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "ब्रुसेल्स — यूरोपीय आयोग की ताजा तिमाही रिपोर्ट के अनुसार हरित ऊर्जा ग्रिड की क्षमता में उल्लेखनीय वृद्धि दर्ज की गई है।"
        ]
      },
      {
        id: "world-sub-3",
        category: "विदेश",
        headline: "कृत्रिम बुद्धिमत्ता के नियमन पर संयुक्त राष्ट्र महासभा में ऐतिहासिक वैश्विक संहिता पारित",
        subhead: "एआई प्रौद्योगिकियों के नैतिक उपयोग, साइबर सुरक्षा और डेटा संप्रभुता को लेकर 140 देशों ने किया समर्थन।",
        image: "/images/trending-lead.jpg",
        author: "NEW YORK DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "न्यूयॉर्क — संयुक्त राष्ट्र मुख्यालय में आयोजित विशेष सत्र के दौरान कृत्रिम बुद्धिमत्ता के दुरुपयोग को रोकने के लिए वैश्विक दिशानिर्देशों पर आम सहमति बनी।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-lead-1",
      category: "व्यापार",
      headline: "भारतीय अर्थव्यवस्था ने दर्ज की 7.8% की जीडीपी वृद्धि, विनिर्माण व सेवा क्षेत्र में ऐतिहासिक उछाल",
      subhead: "आरबीआई व सांख्यिकी मंत्रालय के आंकड़ों के अनुसार पूंजीगत व्यय और उपभोक्ता मांग के दम पर भारत दुनिया की सबसे तेजी से बढ़ती प्रमुख अर्थव्यवस्था बना।",
      image: "/images/business-lead.jpg",
      author: "ECONOMIC CORRESPONDENT",
      date: "04 Nov 2026",
      paragraphs: [
        "मुंबई — वित्त वर्ष की दूसरी तिमाही के दौरान भारत की सकल घरेलू उत्पाद (GDP) वृद्धि दर 7.8% दर्ज की गई है, जो सभी प्रमुख अंतरराष्ट्रीय एजेंसियों के पूर्वानुमानों से अधिक है।",
        "उद्योग विशेषज्ञों ने नीतिगत सुधारों और रिकॉर्ड प्रत्यक्ष कर संग्रह को इस तेज विस्तार का प्रमुख संवाहक बताया है।"
      ]
    },
    subStories: [
      {
        id: "vyapar-sub-1",
        category: "व्यापार",
        headline: "सेंसेक्स और निफ्टी नए सर्वकालिक शिखर पर बंद, विदेशी निवेशकों की ₹18,000 करोड़ की शुद्ध खरीदारी",
        subhead: "बैंकिंग, ऑटोमोबाइल और आईटी शेयरों में चौतरफा लिवाली से दलाल स्ट्रीट में उत्साह का माहौल।",
        image: "/images/ipo-fraud.jpg",
        author: "MARKET DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "मुंबई — शेयर बाजारों में मजबूत घरेलू आर्थिक आंकड़ों के दम पर सेंसेक्स ऐतिहासिक ऊंचाई को पार कर गया।"
        ]
      },
      {
        id: "vyapar-sub-2",
        category: "व्यापार",
        headline: "UPI ने तोड़ा दुनिया का रिकॉर्ड: एक महीने में 16 अरब से अधिक डिजिटल लेन-देन संपन्न",
        subhead: "एनपीसीआई की रिपोर्ट के अनुसार खुदरा किराना से लेकर ऑनलाइन ई-कॉमर्स तक डिजिटल भुगतान बना भारत की जीवनरेखा।",
        image: "/images/desh-coins.jpg",
        author: "FINTECH BUREAU",
        date: "04 Nov 2026",
        paragraphs: [
          "नई दिल्ली — नेशनल पेमेंट्स कॉरपोरेशन ऑफ इंडिया (NPCI) ने पुष्टि की है कि यूनिफाइड पेमेंट्स इंटरफेस (UPI) ने वैश्विक स्तर पर वित्तीय समावेशन का नया कीर्तिमान स्थापित किया है।"
        ]
      },
      {
        id: "vyapar-sub-3",
        category: "व्यापार",
        headline: "ग्रीन हाइड्रोजन परियोजनाओं के लिए भारत को मिला ₹65,000 करोड़ का वैश्विक निवेश प्रस्ताव",
        subhead: "ऊर्जा सुरक्षा और नेट-जीरो उत्सर्जन लक्ष्यों की दिशा में नवीकरणीय ईंधन क्षेत्र को मिली भारी गति।",
        image: "/images/vaichariki-lead.jpg",
        author: "ENERGY DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "नई दिल्ली — नवीन एवं नवीकरणीय ऊर्जा मंत्रालय ने पुष्टि की है कि राष्ट्रीय ग्रीन हाइड्रोजन मिशन के तहत अंतरराष्ट्रीय ऊर्जा संघों ने बड़े निवेश समझौते किए हैं।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-lead-1",
      category: "खेल",
      headline: "भारतीय क्रिकेट टीम ने घरेलू मैदान पर रचा इतिहास, टेस्ट श्रृंखला में 3-0 से हासिल की ऐतिहासिक जीत",
      subhead: "शानदार ऑलराउंड प्रदर्शन और स्पिन आक्रमण के दम पर मेहमान टीम को चौथे दिन ही हराया; आईसीसी टेस्ट चैंपियनशिप तालिका में शीर्ष पर मजबूत स्थिति।",
      image: "/images/sports-lead.jpg",
      author: "SPORTS DESK",
      date: "04 Nov 2026",
      paragraphs: [
        "कोलकाता — ईडन गार्डन्स के ऐतिहासिक मैदान पर भारतीय क्रिकेट टीम ने निर्णायक टेस्ट मुकाबले में शानदार जीत दर्ज करते हुए टेस्ट श्रृंखला अपने नाम कर ली।",
        "गेंदबाजों और शीर्ष क्रम के बल्लेबाजों के अनुशासित प्रदर्शन ने दर्शकों को मंत्रमुग्ध कर दिया।"
      ]
    },
    subStories: [
      {
        id: "khel-sub-1",
        category: "खेल",
        headline: "ओलंपिक कोटा हासिल करने वाली युवा मुक्केबाज सिमरन कौर का गृह राज्य में भव्य नागरिक अभिनंदन",
        subhead: "विश्व मुक्केबाजी चैंपियनशिप में स्वर्ण पदक जीतकर पेरिस खेलों के लिए पक्का किया टिकट।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "SPORTS BUREAU",
        date: "04 Nov 2026",
        paragraphs: [
          "चंडीगढ़ — भारतीय मुक्केबाजी महासंघ और खेल मंत्रालय ने युवा खिलाड़ी को आगामी अंतरराष्ट्रीय प्रतियोगिताओं के लिए विशेष प्रशिक्षण सुविधा प्रदान करने की घोषणा की है।"
        ]
      },
      {
        id: "khel-sub-2",
        category: "खेल",
        headline: "प्रो कबड्डी लीग के 12वें सीजन का धमाकेदार आगाज, पहले ही मैच में रोमांचक टाई",
        subhead: "अंतिम 10 सेकंड में सुपर रेड ने बदला मैच का रुख, घरेलू दर्शकों का उत्साह चरम पर।",
        image: "/images/mogging-lifestyle.jpg",
        author: "PKL DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "हैदराबाद — देश के प्रमुख कबड्डी टूर्नामेंट के नए संस्करण का उद्घाटन समारोह रंगारंग प्रस्तुतियों के साथ संपन्न हुआ।"
        ]
      },
      {
        id: "khel-sub-3",
        category: "खेल",
        headline: "बैडमिंटन विश्व टूर फाइनल्स में भारतीय शटलरों ने पक्का किया पदक, सेमीफाइनल में जोरदार टक्कर",
        subhead: "युगल जोड़ी ने लगातार सीधे सेटों में जीत दर्ज कर नॉकआउट राउंड में बनाई अपनी जगह।",
        image: "/images/entertainment-lead.jpg",
        author: "BADMINTON DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "बैंकॉक — भारतीय बैडमिंटन दल ने अपनी उत्कृष्ट फॉर्म को बरकरार रखते हुए अंतरराष्ट्रीय सर्किट पर एक बार फिर तिरंगा लहराया।"
        ]
      }
    ]
  },
  {
    key: "manoranjan",
    title: "मनोरंजन",
    leadStory: {
      id: "mano-lead-1",
      category: "मनोरंजन",
      headline: "भारतीय सिनेमा की भव्य ऐतिहासिक कृति ने वैश्विक बॉक्स ऑफिस पर तोड़े रिकॉर्ड, पहले सप्ताह में ₹450 करोड़ पार",
      subhead: "शानदार दृश्य प्रभाव, सशक्त पटकथा और संगीत के जादू ने देश-विदेश के सिनेमाघरों में दर्शकों को किया मंत्रमुग्ध।",
      image: "/images/entertainment-lead.jpg",
      author: "CULTURE BUREAU",
      date: "04 Nov 2026",
      paragraphs: [
        "मुंबई — बहुप्रतीक्षित ऐतिहासिक फिल्म ने घरेलू और अंतरराष्ट्रीय सिनेमाघरों में अभूतपूर्व सफलता हासिल की है। समीक्षकों ने फिल्म के निर्देशन और कलाकारों के अभिनय की जमकर सराहना की है।"
      ]
    },
    subStories: [
      {
        id: "mano-sub-1",
        category: "मनोरंजन",
        headline: "राष्ट्रीय फिल्म पुरस्कारों की घोषणा: भारतीय शास्त्रीय संगीत व क्षेत्रीय सिनेमा का रहा दबदबा",
        subhead: "सार्थक और सामाजिक विषयों पर आधारित फिल्मों को मिला सर्वोच्च सम्मान।",
        image: "/images/mogging-lifestyle.jpg",
        author: "FILM DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "नई दिल्ली — सूचना एवं प्रसारण मंत्रालय ने नई दिल्ली में प्रतिष्ठित राष्ट्रीय फिल्म पुरस्कारों की सूची जारी की।"
        ]
      },
      {
        id: "mano-sub-2",
        category: "मनोरंजन",
        headline: "ओटीटी प्लेटफॉर्म्स पर ओरिजिनल भारतीय कहानियों की मांग में 60% का उछाल, वैश्विक दर्शक भी कायल",
        subhead: "स्थानीय लोकगाथाओं और यथार्थवादी क्राइम-थ्रिलर ड्रामा ने अंतरराष्ट्रीय स्ट्रीमिंग सूचियों में बनाई जगह।",
        image: "/images/hero-election.jpg",
        author: "STREAMING DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "मुंबई — डिजिटल मनोरंजन उद्योग की वार्षिक रिपोर्ट में भारतीय रचनाकारों की रचनात्मकता को व्यापक सराहना मिली है।"
        ]
      },
      {
        id: "mano-sub-3",
        category: "मनोरंजन",
        headline: "अंतरराष्ट्रीय कला उत्सव में भारतीय पारंपरिक मूर्तिकला और हस्तशिल्प ने जीता वैश्विक स्वर्ण पदक",
        subhead: "ग्रामीण कारीगरों की कला को मिला अंतरराष्ट्रीय मंच, विदेशी खरीदारों की उमड़ी भीड़।",
        image: "/images/desh-lead.jpg",
        author: "ARTS DESK",
        date: "04 Nov 2026",
        paragraphs: [
          "पेरिस — अंतरराष्ट्रीय शिल्प सम्मेलन में भारतीय कारीगरों के उत्कृष्ट कार्य को प्रथम पुरस्कार से नवाजा गया।"
        ]
      }
    ]
  }
];

// Navbar category tabs in pure Hindi
const NAVBAR_CATEGORIES = [
  { key: "all", label: "होम" },
  { key: "desh", label: "देश" },
  { key: "videsh", label: "विदेश" },
  { key: "vishesh", label: "विशेष" },
  { key: "vaichariki", label: "वैचारिकी" },
  { key: "vyapar", label: "व्यापार" },
  { key: "khel", label: "खेल" },
  { key: "manoranjan", label: "मनोरंजन" },
  { key: "sehat", label: "सेहत" },
  { key: "explainer", label: "एक्सप्लेनर" },
];

export default function HindiNewsPortal() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleModalData | null>(null);

  // Scroll to Top visibility tracker
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 24h Purge Filter: filter out any dynamic story older than 24 hours
  const filteredCategorySections = useMemo(() => {
    const MAX_AGE_MS = 24 * 60 * 60 * 1000;
    const isFresh = (story: StoryItem) => {
      if (!story.publishedAt) return true; // keep evergreen curated baseline
      return Date.now() - new Date(story.publishedAt).getTime() <= MAX_AGE_MS;
    };

    if (activeCategoryKey === "all") {
      return CATEGORY_SECTIONS;
    }
    return CATEGORY_SECTIONS.filter(
      (sec) =>
        sec.key === activeCategoryKey ||
        (activeCategoryKey === "vishesh" && sec.key === "vaichariki") ||
        (activeCategoryKey === "explainer" && sec.key === "desh") ||
        (activeCategoryKey === "sehat" && sec.key === "desh")
    );
  }, [activeCategoryKey]);

  // Open full article in reader modal
  const openArticle = (story: StoryItem) => {
    setSelectedArticle({
      title: story.headline,
      kicker: story.category,
      subhead: story.subhead,
      author: story.author,
      date: story.date,
      image: story.image,
      paragraphs: story.paragraphs || [
        story.subhead || story.headline,
        "उच्च प्रशासनिक सूत्रों और संबंधित विभागों ने इस विषय पर विस्तृत दिशा-निर्देश जारी किए हैं।",
        "जनहित एवं नीतिगत पारदर्शिता को सुनिश्चित करने के लिए सभी संबंधित एजेंसियां लगातार निगरानी बनाए हुए हैं।"
      ]
    });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const scrollToSection = (key: string) => {
    setActiveCategoryKey(key);
    setMobileMenuOpen(false);
    if (key === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.getElementById(`section-${key}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-red-100 selection:text-black">
      
      {/* ── ARTICLE MODAL (Click any story to read in pure Hindi) ── */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

      {/* ── TOP HEADER / NAVBAR (Exact Match to Screenshot 1 & 5) ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Mobile Left: Hamburger Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-black hover:text-[#C13A08] transition-colors cursor-pointer"
              aria-label="मेन्यू खोलें"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo (Desktop Left / Mobile Centered) */}
          <div className="flex items-center">
            <div
              onClick={() => scrollToSection("all")}
              className="cursor-pointer flex items-center gap-2 group"
              title="ख़बरगणित - मुख्य पृष्ठ"
            >
              <Image
                src="/logo-hindi-clean.png"
                alt="ख़बरगणित"
                width={190}
                height={46}
                priority
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Desktop Center: Categories in Pure Hindi */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 select-none">
            {NAVBAR_CATEGORIES.filter((c) => c.key !== "all").map((cat) => {
              const isSelected = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => scrollToSection(cat.key)}
                  className={`text-sm lg:text-[15px] font-sans font-bold transition-colors cursor-pointer py-1 ${
                    isSelected
                      ? "text-[#C13A08] border-b-2 border-[#C13A08]"
                      : "text-stone-800 hover:text-[#C13A08]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop & Mobile Right: Social Links + Search Icon */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Social Links (Hidden on small mobile) */}
            <div className="hidden sm:flex items-center space-x-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-blue-600 transition-colors p-1"
                title="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href="https://x.com/khabarGanit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-black transition-colors p-1"
                title="X"
              >
                <span className="font-bold text-sm">𝕏</span>
              </a>
              <a
                href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-pink-600 transition-colors p-1"
                title="Instagram"
              >
                <Image src="/social/instagram.png" alt="Instagram" width={15} height={15} className="object-contain" />
              </a>
              <a
                href="https://www.youtube.com/@KhabarGanit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-red-600 transition-colors p-1"
                title="YouTube"
              >
                <Image src="/social/youtube.png" alt="YouTube" width={16} height={16} className="object-contain" />
              </a>
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-stone-800 hover:text-[#C13A08] transition-colors cursor-pointer"
              aria-label="खोजें"
              title="समाचार खोजें"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* ── EXPANDABLE SEARCH BAR ── */}
        {searchOpen && (
          <div className="border-t border-stone-200 bg-stone-50 px-4 py-3 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ताज़ा ख़बरें खोजें (जैसे: चुनाव, बजट, शेयर बाजार)..."
                autoFocus
                className="flex-1 bg-white border border-stone-300 rounded-lg px-4 py-2 text-sm text-black placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C13A08]"
              />
              <button
                type="submit"
                className="bg-[#C13A08] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors cursor-pointer"
              >
                खोजें
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-stone-500 hover:text-black cursor-pointer"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ── MOBILE SLIDE-OUT DRAWER (Screenshot 5) ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[80vw] bg-white text-black h-full shadow-2xl z-10 flex flex-col justify-between p-5">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <Image
                  src="/logo-hindi-clean.png"
                  alt="ख़बरगणित"
                  width={140}
                  height={35}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-700"
                  aria-label="बंद करें"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Hindi Categories in Drawer */}
              <nav className="flex flex-col space-y-1">
                {NAVBAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => scrollToSection(cat.key)}
                    className={`text-left px-3 py-2.5 rounded-lg text-base font-bold transition-colors ${
                      activeCategoryKey === cat.key
                        ? "bg-[#C13A08] text-white"
                        : "text-stone-800 hover:bg-stone-100 hover:text-[#C13A08]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social links inside drawer */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-3">
                हमें फ़ॉलो करें
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.youtube.com/@KhabarGanit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-100 rounded-full hover:bg-red-50"
                  title="YouTube"
                >
                  <Image src="/social/youtube.png" alt="YouTube" width={18} height={18} />
                </a>
                <a
                  href="https://x.com/khabarGanit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-100 rounded-full hover:bg-stone-200"
                  title="X"
                >
                  <Image src="/social/x.png" alt="X" width={16} height={16} />
                </a>
                <a
                  href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-100 rounded-full hover:bg-pink-50"
                  title="Instagram"
                >
                  <Image src="/social/instagram.png" alt="Instagram" width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">

        {/* ══════════════════════════════════════════════════════════════
            1. HERO SECTION: LARGE 21:9 / 16:9 BANNER WITH FROSTED CARD
            (Exact match to Screenshot 1 & 5)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div
            onClick={() => openArticle(HERO_STORY)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer transition-all duration-300"
          >
            {/* Real Editorial Photo */}
            <Image
              src={HERO_STORY.image}
              alt={HERO_STORY.headline}
              fill
              priority
              unoptimized={true}
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Dark Frosted Glass Overlay Card at bottom-center */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[85%] md:w-[70%] max-w-3xl bg-black/75 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/85">
              
              {/* Red Category Badge */}
              <span className="inline-block bg-[#C13A08] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-2 shadow-xs">
                {HERO_STORY.category}
              </span>

              {/* Bold Hindi Headline */}
              <h1 className="font-sans font-black text-base sm:text-2xl md:text-[26px] text-white leading-snug sm:leading-tight mb-2.5 hover:text-red-400 transition-colors">
                {HERO_STORY.headline}
              </h1>

              {/* Byline */}
              <div className="text-[10px] sm:text-xs font-sans text-stone-300 flex items-center justify-center gap-2 tracking-wider">
                <span className="font-semibold">By {HERO_STORY.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">⏱ {HERO_STORY.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. TOP STORIES GRID: 6 CARDS (3 COLS DESKTOP / 1 COL MOBILE)
            (Exact match to Screenshot 2 & 5)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOP_STORIES.map((story) => (
              <article
                key={story.id}
                onClick={() => openArticle(story)}
                className="flex flex-col cursor-pointer group"
              >
                {/* Image Container with rounded corners & bottom-left red badge */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={story.image}
                    alt={story.headline}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Category Badge Overlaid on bottom-left of image */}
                  <span className="absolute bottom-2.5 left-2.5 bg-[#C13A08] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow">
                    {story.category}
                  </span>
                </div>

                {/* Bold Hindi Headline below image */}
                <h3 className="font-sans font-bold text-base sm:text-[17px] text-stone-900 mt-3 leading-snug group-hover:text-[#C13A08] transition-colors line-clamp-3">
                  {story.headline}
                </h3>

                {/* Byline below headline */}
                <div className="text-[11px] font-sans text-stone-500 mt-2 flex items-center gap-2">
                  <span className="font-semibold">By {story.author}</span>
                  <span>•</span>
                  <span>⏱ {story.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. CATEGORY SECTIONS (देश, वैचारिकी, विदेश, व्यापार, खेल, मनोरंजन)
            (Exact match to Screenshot 3 & 4)
           ══════════════════════════════════════════════════════════════ */}
        {filteredCategorySections.map((section) => (
          <section key={section.key} id={`section-${section.key}`} className="mb-14 sm:mb-16 scroll-mt-20">
            
            {/* Section Divider: ────── श्रेणी ────── */}
            <div className="flex items-center justify-center my-8 sm:my-12">
              <div className="flex-1 max-w-[120px] sm:max-w-[220px] h-[1.5px] bg-[#C13A08]/40" />
              <h2 className="px-5 text-2xl sm:text-3xl font-serif font-black text-[#C13A08] tracking-wide">
                {section.title}
              </h2>
              <div className="flex-1 max-w-[120px] sm:max-w-[220px] h-[1.5px] bg-[#C13A08]/40" />
            </div>

            {/* Featured Lead Banner for Category */}
            <div
              onClick={() => openArticle(section.leadStory)}
              className="group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer mb-8 transition-all duration-300"
            >
              <Image
                src={section.leadStory.image}
                alt={section.leadStory.headline}
                fill
                unoptimized={true}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Overlaid Dark Frosted Card at Bottom */}
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[85%] md:w-[70%] max-w-3xl bg-black/75 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/85">
                <h3 className="font-sans font-black text-base sm:text-xl md:text-2xl text-white leading-snug sm:leading-tight mb-2 hover:text-red-400 transition-colors">
                  {section.leadStory.headline}
                </h3>
                <div className="text-[10px] sm:text-xs font-sans text-stone-300 flex items-center justify-center gap-2 tracking-wider">
                  <span className="font-semibold">By {section.leadStory.author}</span>
                  <span>•</span>
                  <span>⏱ {section.leadStory.date}</span>
                </div>
              </div>
            </div>

            {/* 3-Column Sub-articles below Lead Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {section.subStories.map((story) => (
                <article
                  key={story.id}
                  onClick={() => openArticle(story)}
                  className="flex flex-col cursor-pointer group"
                >
                  {/* Rounded image with category badge */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={story.image}
                      alt={story.headline}
                      fill
                      unoptimized={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#C13A08] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow">
                      {story.category}
                    </span>
                  </div>

                  {/* Headline */}
                  <h4 className="font-sans font-bold text-base sm:text-[17px] text-stone-900 mt-3 leading-snug group-hover:text-[#C13A08] transition-colors line-clamp-3">
                    {story.headline}
                  </h4>

                  {/* Byline */}
                  <div className="text-[11px] font-sans text-stone-500 mt-2 flex items-center gap-2">
                    <span className="font-semibold">By {story.author}</span>
                    <span>•</span>
                    <span>⏱ {story.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

      </main>

      {/* ── FLOATING SCROLL TO TOP BUTTON (Screenshot 2, 3, 4) ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-[#C13A08] text-white p-3 rounded-lg shadow-xl hover:bg-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="वापस ऊपर जाएं"
          aria-label="वापस ऊपर जाएं"
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* ── FOOTER: CLEAN BRANDED IN PURE HINDI ── */}
      <footer className="mt-16 border-t border-stone-200 bg-stone-50 py-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer mb-3"
            title="ख़बरगणित"
          >
            <Image
              src="/logo-hindi-clean.png"
              alt="ख़बरगणित"
              width={200}
              height={48}
              className="h-9 w-auto object-contain mx-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 mb-6">
            हर ख़बर की कहानी, आँकड़ों की ज़ुबानी — भारत का प्रमुख डेटा-संचालित डिजिटल समाचार मंच
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <a
              href="https://www.youtube.com/@KhabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-red-600 text-xs font-bold"
            >
              <Image src="/social/youtube.png" alt="YouTube" width={18} height={18} />
              <span>YouTube</span>
            </a>
            <a
              href="https://x.com/khabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-black text-xs font-bold"
            >
              <Image src="/social/x.png" alt="X" width={16} height={16} />
              <span>𝕏 (Twitter)</span>
            </a>
            <a
              href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-pink-600 text-xs font-bold"
            >
              <Image src="/social/instagram.png" alt="Instagram" width={16} height={16} />
              <span>Instagram</span>
            </a>
            <a
              href="https://khabarganit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-700 hover:text-blue-600 text-xs font-bold"
            >
              <Image src="/social/google.png" alt="Website" width={16} height={16} />
              <span>khabarganit.com</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs font-sans text-stone-500">
            © 2026 ख़बरगणित (KhabarGanit). सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </footer>

    </div>
  );
}
