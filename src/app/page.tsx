"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ChevronUp, Menu, X, Search, Share2, Copy, Check, BookOpen } from "lucide-react";

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

// ── 1. HERO LEAD STORY: INDONESIA VP GIBRAN RESIGNATION (News Pack 12 Nov 2026) ──
const HERO_STORY: StoryItem = {
  id: "hero-gibran-resignation",
  category: "विदेश / अंतर्राष्ट्रीय राजनीति",
  headline: "इंडोनेशिया में बड़ा सियासी उलटफेर: उपराष्ट्रपति जिब्रान राकाबुमिंग राका ने संसद को सौंपा इस्तीफा, राष्ट्रपति प्रबोवो ने किया स्वीकार",
  subhead: "पूर्व राष्ट्रपति जोको विडोडो के बेटे जिब्रान पर हाई स्कूल फर्जी डिग्री विवाद और 100 से अधिक सांसदों द्वारा महाभियोग के दबाव के बाद उठाया कदम; प्रबोवो-जोकोवी गठबंधन में दरार, 2029 तक के लिए नए उपराष्ट्रपति की खोज शुरू।",
  image: "/images/politics-lead.jpg",
  author: "ब्लूमबर्ग / रॉयटर्स / जकार्ता ब्यूरो",
  date: "12 Nov 2026",
  paragraphs: [
    "जकार्ता — इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका ने गुरुवार को देश की सर्वोच्च संसदीय संस्था पीपुल्स कंसल्टेटिव असेंबली (MPR - संसद के उच्च सदन) को औपचारिक रूप से अपना त्यागपत्र सौंप दिया है। पूर्व राष्ट्रपति जोको विडोडो के 37 वर्षीय पुत्र जिब्रान ने बुधवार देर शाम ही राष्ट्रपति प्रबोवो सुबियांतो से मुलाकात कर अपने निर्णय से अवगत करा दिया था, जिसके बाद राष्ट्रपति ने उनका इस्तीफा स्वीकार कर लिया।",
    "यह नाटकीय घटनाक्रम सुप्रीम कोर्ट और संवैधानिक अदालत के हालिया निर्णयों के बाद उपजा है, जिसमें 2024 के आम चुनाव में जिब्रान द्वारा दाखिल की गई हाई स्कूल शिक्षा योग्यताओं और प्रमाणपत्रों की प्रमाणिकता पर गंभीर आपत्तियां दर्ज की गई थीं। इसके तुरंत बाद इंडोनेशियाई संसद के 100 से अधिक सांसदों ने उनके खिलाफ औपचारिक महाभियोग (Impeachment) चलाने के प्रस्ताव पर हस्ताक्षर किए थे।",
    "जिब्रान के इस्तीफे से प्रबोवो सुबियांतो और पूर्व राष्ट्रपति जोकोवी के बीच का राजनीतिक गठबंधन गहरे संकट में आ गया है। इंडोनेशियाई संवैधानिक प्रक्रिया के तहत अब संसद का उच्च सदन वर्ष 2029 तक शेष कार्यकाल पूरा करने के लिए एक नए उपराष्ट्रपति का चुनाव करेगा। इस राजनीतिक संकट से जकार्ता स्टॉक एक्सचेंज और मुद्रा रुपया में भी अस्थिरता देखी गई।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 12 Nov 2026) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-kulgam-attack",
    category: "देश / जम्मू-कश्मीर सुरक्षा",
    headline: "जम्मू-कश्मीर के कुलगाम में सुरक्षाबलों पर आतंकी हमला; मीरबाजार में CRPF चौकी पर गोलीबारी, तीन जवान घायल",
    subhead: "उपराज्यपाल के प्रस्तावित दौरे के समय हुआ हमला; आतंकियों की धरपकड़ के लिए दक्षिण कश्मीर में बड़े पैमाने पर कॉर्डन एंड सर्च ऑपरेशन जारी।",
    image: "/images/desh-police.jpg",
    author: "सुरक्षा ब्यूरो / श्रीनगर",
    date: "12 Nov 2026",
    paragraphs: [
      "श्रीनगर — दक्षिण कश्मीर के कुलगाम जिले के मीरबाजार इलाके में संदिग्ध आतंकवादियों ने सीआरपीएफ (CRPF) के सुरक्षा चेकपॉइंट पर अंधाधुंध गोलीबारी कर दी। इस अप्रत्याशित हमले में केंद्रीय रिजर्व पुलिस बल के तीन जवान घायल हो गए, जिन्हें तुरंत सेना के बेस अस्पताल में स्थानांतरित किया गया।",
      "हमले के तत्काल बाद सेना, जम्मू-कश्मीर पुलिस और अर्धसैनिक बलों ने समूचे मीरबाजार और आसपास के जंगलों की घेराबंदी कर ली है। चूंकि यह घटना उपराज्यपाल के संभावित दौरे के समय घटित हुई, इसलिए राष्ट्रीय राजमार्ग और संवेदनशील प्रतिष्ठानों पर अतिरिक्त नाकाबंदी कर सघन तलाशी अभियान तेज कर दिया गया है।"
    ]
  },
  {
    id: "top-hardik-ipl-trade",
    category: "खेल / आईपीएल २०२७",
    headline: "आईपीएल 2027 का ऐतिहासिक ट्रेड: हार्दिक पंड्या ₹18 करोड़ में पंजाब किंग्स में शामिल, अर्शदीप सिंह मुंबई इंडियंस के खेमे में",
    subhead: "टूर्नामेंट इतिहास का सबसे बड़ा खिलाड़ी विनिमय; पंजाब किंग्स को मिला धाकड़ ऑलराउंडर व संभावित कप्तान; मुंबई ने मजबूत की डेथ ओवर गेंदबाजी।",
    image: "/images/sports-lead.jpg",
    author: "क्रिकेट ब्यूरो / मुंबई",
    date: "12 Nov 2026",
    paragraphs: [
      "मुंबई — इंडियन प्रीमियर लीग (IPL) 2027 की मेगा नीलामी से पहले क्रिकेट जगत में सबसे बड़ा धमाका हुआ है। मुंबई इंडियंस ने अपने स्टार ऑलराउंडर और पूर्व कप्तान हार्दिक पंड्या को ₹18 करोड़ के बड़े सौदे में पंजाब किंग्स को ट्रेड कर दिया है।",
      "इस ऐतिहासिक विनिमय के तहत भारत के अग्रणी बाएं हाथ के तेज गेंदबाज अर्शदीप सिंह अब मुंबई इंडियंस की नीली जर्सी में नजर आएंगे। पंजाब किंग्स के प्रबंधन ने संकेत दिए हैं कि आगामी सत्र में हार्दिक पंड्या टीम की कप्तानी संभालेंगे, जबकि मुंबई इंडियंस जसप्रीत बुमराह और अर्शदीप सिंह की जोड़ी से अपनी गेंदबाजी को अभेद्य बनाने की रणनीति पर काम कर रही है।"
    ]
  },
  {
    id: "top-milk-price-hike",
    category: "व्यापार / उपभोक्ता",
    headline: "अमूल और मदर डेयरी ने दूध के दामों में ₹2 से ₹4 प्रति लीटर का किया इजाफा; आज 12 नवंबर से नई दरें प्रभावी",
    subhead: "पशु आहार, चारा और परिवहन लागत में बढ़ोतरी को बताया कारण; फुल क्रीम, टोंड और गाय के दूध के सभी पैकेट महंगे; घरेलू बजट पर सीधा असर।",
    image: "/images/business-lead.jpg",
    author: "उपभोक्ता डेस्क / नई दिल्ली",
    date: "12 Nov 2026",
    paragraphs: [
      "नई दिल्ली — देश की दो सबसे बड़ी डेयरी कंपनियों अमूल (GCMMF) और मदर डेयरी ने तरल दूध की सभी श्रेणियों के खुदरा दामों में ₹2 से ₹4 प्रति लीटर की तत्काल वृद्धि घोषित की है। नई दरें आज 12 नवंबर 2026 से दिल्ली-एनसीआर, उत्तर प्रदेश, गुजरात और महाराष्ट्र सहित सभी राज्यों में लागू हो गई हैं।",
      "कंपनियों का कहना है कि पिछले छह महीनों में सूखे चारे और पशु आहार की कीमतों में 25% से अधिक की वृद्धि हुई है। दुग्ध उत्पादक पशुपालकों को उचित पारिश्रमिक देने और कोल्ड चेन परिवहन की बढ़ती लागत को संतुलित करने के लिए यह मूल्य संशोधन आवश्यक था।"
    ]
  },
  {
    id: "top-cop31-summit",
    category: "विदेश / जलवायु सम्मेलन",
    headline: "तुर्की के अंताल्या में COP31 विश्व जलवायु शिखर सम्मेलन शुरू; जलवायु वित्त और उत्सर्जन कटौती पर वैश्विक मंथन",
    subhead: "कॉप अध्यक्ष मूरत कुरुम और वार्ता प्रमुख क्रिस बोवेन के नेतृत्व में उच्चस्तरीय बैठक; विकासशील देशों के लिए आपदा राहत फंड पर आम सहमति की कोशिश।",
    image: "/images/modi-zelenskyy.jpg",
    author: "पर्यावरण ब्यूरो / अंताल्या",
    date: "12 Nov 2026",
    paragraphs: [
      "अंताल्या — तुर्की के तटीय शहर अंताल्या में 11 और 12 नवंबर को आयोजित कॉप-31 (COP31) वर्ल्ड लीडर्स क्लाइमेट एक्शन समिट में 190 से अधिक देशों के शीर्ष नेता एकजुट हुए हैं। शिखर सम्मेलन की अध्यक्षता तुर्की के पर्यावरण मंत्री मूरत कुरुम और ऑस्ट्रेलिया के वार्ता प्रमुख क्रिस बोवेन संयुक्त रूप से कर रहे हैं।",
      "सम्मेलन का मुख्य एजेंडा कार्बन उत्सर्जन में 2030 तक 45% की कटौती, नवीकरणीय ऊर्जा क्षमता को तीन गुना करना और विकासशील देशों को स्वच्छ ऊर्जा अपनाने के लिए प्रतिवर्ष $100 अरब से अधिक की रियायती जलवायु निधि उपलब्ध कराना है।"
    ]
  },
  {
    id: "top-nvidia-oust-crisis",
    category: "तकनीक / वैश्विक व्यापार",
    headline: "जासूसी विवाद में घिरे एनवीडिया सीईओ जेनसन हुआंग; अमेरिकी मीडिया का दावा- बोर्ड पद से हटाने की कर रहा तैयारी",
    subhead: "चीनी जासूस महिला से कथित संबंधों के नए आरोपों से वॉल स्ट्रीट में हड़कंप; सेमीकंडक्टर बाजार में भारी उठापटक, निदेशक मंडल की आपात बैठक।",
    image: "/images/tech-lead.jpg",
    author: "वॉल स्ट्रीट ब्यूरो / सैन फ्रांसिस्को",
    date: "12 Nov 2026",
    paragraphs: [
      "सैन फ्रांसिस्को — विश्व की सबसे मूल्यवान आर्टिफिशियल इंटेलिजेंस चिप कंपनी एनवीडिया (Nvidia) के सह-संस्थापक और मुख्य कार्यकारी अधिकारी जेनसन हुआंग पर अमेरिकी खुफिया जांच का शिकंजा कसता जा रहा है। अमेरिकी मीडिया की विशेष रिपोर्टों के अनुसार, कंपनी का स्वतंत्र निदेशक मंडल हुआंग को शीर्ष पद से हटाने की तैयारी कर रहा है।",
      "यह संकट तब गहराया जब जांच एजेंसियों ने हुआंग के चीन की सैन्य खुफिया एजेंसी के लिए काम करने की संदिग्ध एक चीनी महिला व्यवसायी के साथ व्यक्तिगत व वित्तीय संबंधों के नए साक्ष्य जुटाए। खबर सार्वजनिक होते ही नैस्डैक पर एनवीडिया के शेयरों में भारी गिरावट आई और वैश्विक टेक उद्योग में खलबली मच गई।"
    ]
  },
  {
    id: "top-visa-simplification",
    category: "देश / नीतिगत सुधार",
    headline: "गृह मंत्रालय ने सुगम बनाया वीजा ढांचा: मुख्य श्रेणियां 13 से घटाकर 9 कीं, आवेदन फॉर्म 70% तक संक्षिप्त",
    subhead: "पर्यटन, व्यापार और उच्च शिक्षा के लिए भारत आना हुआ बेहद आसान; डिजिटलीकरण से मंजूरी की समयसीमा में उल्लेखनीय कमी।",
    image: "/images/pib-cabinet-national.jpg",
    author: "नीति ब्यूरो / नई दिल्ली",
    date: "12 Nov 2026",
    paragraphs: [
      "नई दिल्ली — केंद्रीय गृह मंत्रालय (MHA) ने भारत आने वाले विदेशी नागरिकों, पर्यटकों, शोधकर्ताओं और निवेशकों के लिए देश की वीजा व्यवस्था में व्यापक सरलीकरण लागू किया है। नई अधिसूचना के तहत मुख्य वीजा श्रेणियों को 13 से घटाकर केवल 9 कर दिया गया है।",
      "साथ ही, वीजा आवेदन फॉर्मों में दोहराव वाली प्रविष्टियों को समाप्त कर उन्हें 70 प्रतिशत तक छोटा किया गया है। गृह मंत्रालय के अधिकारियों ने बताया कि इस सिंगल-विंडो डिजिटल पहल से वीजा प्रोसेसिंग का समय 72 घंटे से घटकर मात्र 24 घंटे रह जाएगा, जिससे भारत के अंतरराष्ट्रीय पर्यटन और 'मेक इन इंडिया' निवेश को पंख लगेंगे।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-kulgam-crpf",
      category: "देश / आंतरिक सुरक्षा",
      headline: "जम्मू-कश्मीर के कुलगाम में सुरक्षाबलों पर आतंकी हमला; CRPF चौकी पर अंधाधुंध गोलीबारी, दक्षिण कश्मीर में सघन कॉर्डन ऑपरेशन",
      subhead: "मीरबाजार में सीआरपीएफ चेकपॉइंट को निशाना बनाया गया; तीन जवान घायल; सेना व पुलिस ने पूरे इलाके की नाकाबंदी कर सर्च ऑपरेशन शुरू किया।",
      image: "/images/desh-police.jpg",
      author: "सुरक्षा संवाददाता / श्रीनगर",
      date: "12 Nov 2026",
      paragraphs: [
        "श्रीनगर — दक्षिण कश्मीर के कुलगाम में सुरक्षाबलों पर हुए आतंकी हमले के बाद पूरे घाटी क्षेत्र में सुरक्षा व्यवस्था चाक-चौबंद कर दी गई है। मीरबाजार क्षेत्र में आतंकियों ने घात लगाकर सीआरपीएफ जवानों पर गोलियां चलाईं, जिसमें तीन जवान घायल हुए।",
        "सुरक्षाबलों ने जवाबी कार्रवाई करते हुए हमलावरों को घेरने के लिए ड्रोन कैमरों और खोजी कुत्तों की मदद से जंगलों में तलाशी अभियान छेड़ दिया है।"
      ]
    },
    subStories: [
      {
        id: "desh-visa-reforms",
        category: "देश / नीतिगत सुधार",
        headline: "गृह मंत्रालय ने वीजा श्रेणियों को 13 से घटाकर 9 किया; आवेदन प्रक्रिया 70% तक हुई आसान",
        subhead: "विदेशी पर्यटकों, छात्रों व उद्योगपतियों के लिए डिजिटल सिंगल विंडो व्यवस्था लागू; त्वरित मंजूरी।",
        image: "/images/pib-cabinet-national.jpg",
        author: "गृह मंत्रालय ब्यूरो",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — वीजा नियमों के सरलीकरण से वैश्विक यात्रियों को भारत आने में लगने वाला समय और कागजी कार्रवाई काफी कम हो गई है।"
        ]
      },
      {
        id: "desh-ficci-pollution-cost",
        category: "देश / पर्यावरण",
        headline: "वायु प्रदूषण से भारत को हर साल ₹7.9 लाख करोड़ ($95 अरब) का नुकसान: फिक्की की चेतावनी रिपोर्ट",
        subhead: "श्रमिकों की उत्पादकता में कमी और स्वास्थ्य खर्च में अप्रत्याशित वृद्धि से देश की जीडीपी पर गंभीर असर।",
        image: "/images/delhi-pollution.jpg",
        author: "पर्यावरण एवं आर्थिकी डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — उद्योग मंडल फिक्की (FICCI) ने अपनी ताजा रिपोर्ट में चेतावनी दी है कि गंभीर वायु प्रदूषण भारतीय अर्थव्यवस्था को प्रतिवर्ष 95 अरब डॉलर का नुकसान पहुंचा रहा है।"
        ]
      },
      {
        id: "desh-yamuna-cruise-service",
        category: "देश / पर्यटन",
        headline: "दिल्ली में यमुना रिवर क्रूज 'नमो सफारी' के विस्तार को मंजूरी; पर्यावरण अनुकूल हाइब्रिड नौकाएं शामिल",
        subhead: "सोनिया विहार से वजीराबाद तक नियमित जल पर्यटन; ₹500 के टिकट में आधुनिक सुविधाओं से लैस सफर।",
        image: "/images/trending-lead.jpg",
        author: "सिटी डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — दिल्ली में रिवर टूरिज्म को बढ़ावा देने के लिए यमुना में अत्याधुनिक पर्यावरण अनुकूल नौकाओं का संचालन बढ़ाया गया है।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-gibran-resignation",
      category: "विदेश / अंतर्राष्ट्रीय राजनीति",
      headline: "इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका ने संसद को सौंपा इस्तीफा; फर्जी डिग्री विवाद व महाभियोग के दबाव के बाद फैसला",
      subhead: "पूर्व राष्ट्रपति जोको विडोडो के बेटे जिब्रान का इस्तीफा प्रबोवो ने किया स्वीकार; 2029 तक के लिए नए उपराष्ट्रपति की खोज शुरू।",
      image: "/images/politics-lead.jpg",
      author: "अंतरराष्ट्रीय डेस्क / जकार्ता",
      date: "12 Nov 2026",
      paragraphs: [
        "जकार्ता — इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका के इस्तीफे ने दक्षिण-पूर्व एशिया की राजनीति में भूचाल ला दिया है। संवैधानिक न्यायालय द्वारा उनकी स्कूली शिक्षा प्रमाणपत्रों पर दिए गए फैसलों के बाद विपक्षी दलों और 100 से अधिक सांसदों ने महाभियोग की तैयारी कर ली थी।",
        "राष्ट्रपति प्रबोवो सुबियांतो ने इस्तीफा स्वीकार करते हुए देश में शांति बनाए रखने और संवैधानिक प्रक्रियाओं का सम्मान करने की अपील की है।"
      ]
    },
    subStories: [
      {
        id: "videsh-cop31-climate-antalya",
        category: "विदेश / जलवायु",
        headline: "तुर्की के अंताल्या में COP31 शिखर सम्मेलन: उत्सर्जन कटौती और वित्त पोषण पर 190 देशों का मंथन",
        subhead: "विकासशील देशों को स्वच्छ ऊर्जा अपनाने और आपदा प्रबंधन के लिए वित्तीय पैकेज पर गहन वार्ता।",
        image: "/images/modi-zelenskyy.jpg",
        author: "अंताल्या ब्यूरो",
        date: "12 Nov 2026",
        paragraphs: [
          "अंताल्या — कॉप-31 शिखर सम्मेलन में कार्बन कटौती के लक्ष्यों और विकासशील देशों के लिए आपदा राहत फंड पर ऐतिहासिक सहमति बनाने के प्रयास किए जा रहे हैं।"
        ]
      },
      {
        id: "videsh-nvidia-huang-crisis",
        category: "विदेश / तकनीक",
        headline: "एनवीडिया बोर्ड सीईओ जेनसन हुआंग को पद से हटाने की तैयारी में; कथित जासूसी मामले ने पकड़ा तूल",
        subhead: "अमेरिकी मीडिया रिपोर्ट्स के अनुसार बोर्ड स्वतंत्र जांच समिति की सिफारिशों पर ले सकता है कड़ा फैसला।",
        image: "/images/tech-lead.jpg",
        author: "सैन फ्रांसिस्को ब्यूरो",
        date: "12 Nov 2026",
        paragraphs: [
          "सैन फ्रांसिस्को — एआई चिप निर्माता एनवीडिया के शीर्ष नेतृत्व में बदलाव की खबरों ने वैश्विक वित्तीय और तकनीकी बाजारों में हलचल मचा दी है।"
        ]
      },
      {
        id: "videsh-russia-ukraine-abu-dhabi",
        category: "विदेश / कूटनीति",
        headline: "अबू धाबी में अमेरिका की मध्यस्थता में रूस-यूक्रेन वार्ता जारी; ब्रिटेन में जासूसी के आरोप में वरिष्ठ सैनिक गिरफ्तार",
        subhead: "खाड़ी क्षेत्र में शांति वार्ता के बीच यूरोपीय सुरक्षा एजेंसियों ने संवेदनशील खुफिया लीक की जांच तेज की।",
        image: "/images/world-lead.jpg",
        author: "डिप्लोमैटिक डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "अबू धाबी — संयुक्त अरब अमीरात की मध्यस्थता में रूस और यूक्रेन के प्रतिनिधियों के बीच गोपनीय शांति वार्ता का दौर आगे बढ़ रहा है।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-hardik-arshdeep-trade",
      category: "खेल / क्रिकेट",
      headline: "आईपीएल 2027 का सबसे बड़ा ट्रेड: हार्दिक पंड्या ₹18 करोड़ में पंजाब किंग्स में शामिल, अर्शदीप सिंह मुंबई इंडियंस के खेमे में",
      subhead: "टूर्नामेंट के इतिहास का सबसे सनसनीखेज खिलाड़ी विनिमय; कप्तानी और टीम रणनीति पर विशेषज्ञों में चर्चा।",
      image: "/images/sports-lead.jpg",
      author: "क्रिकेट ब्यूरो / मुंबई",
      date: "12 Nov 2026",
      paragraphs: [
        "मुंबई — आगामी आईपीएल 2027 के लिए मुंबई इंडियंस और पंजाब किंग्स के बीच हुए इस अभूतपूर्व ट्रेड ने क्रिकेट प्रेमियों को चौंका दिया है। हार्दिक पंड्या पंजाब किंग्स में शामिल होकर टीम को नया नेतृत्व देंगे।",
        "वहीं, डेथ ओवरों के माहिर गेंदबाज अर्शदीप सिंह के मुंबई इंडियंस में आने से पांच बार की चैंपियन टीम की तेज गेंदबाजी पंक्ति अत्यधिक मजबूत हो गई है।"
      ]
    },
    subStories: [
      {
        id: "khel-u19-sehwag-asia-cup",
        category: "खेल / अंडर-19",
        headline: "अंडर-19 एशिया कप सेमीफाइनल: आज अफगानिस्तान से भिड़ेगी भारतीय टीम; आर्यावीर सहवाग का शानदार फॉर्म जारी",
        subhead: "वीरेंद्र सहवाग के पुत्र आर्यावीर ने टूर्नामेंट में जड़ा तूफानी शतक, सबसे ज्यादा रन बनाने वाले बल्लेबाज बने।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "स्पोर्ट्स डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "दुबई — एसीसी अंडर-19 एशिया कप के सेमीफाइनल में भारत का सामना अफगानिस्तान से होगा। सलामी बल्लेबाज आर्यावीर सहवाग जबर्दस्त फॉर्म में हैं।"
        ]
      },
      {
        id: "khel-niraj-kumar-olympic-quota",
        category: "खेल / निशानेबाजी",
        headline: "भारतीय निशानेबाज नीरज कुमार ने 50 मीटर राइफल में जीता कांस्य; लॉस एंजिल्स ओलंपिक 2028 का कोटा पक्का",
        subhead: "आईएसएसएफ विश्व चैंपियनशिप में शानदार निशाना; भारत के लिए निशानेबाजी का महत्वपूर्ण ओलंपिक कोटा हासिल।",
        image: "/images/pib-asian-para-games.jpg",
        author: "निशानेबाजी ब्यूरो",
        date: "12 Nov 2026",
        paragraphs: [
          "काहिरा — युवा भारतीय निशानेबाज नीरज कुमार ने विश्व निशानेबाजी चैंपियनशिप में कांस्य पदक जीतकर 2028 लॉस एंजिल्स ओलंपिक का राष्ट्रीय कोटा सुरक्षित कर लिया।"
        ]
      },
      {
        id: "khel-youth-olympics-badminton",
        category: "खेल / बहु-खेल",
        headline: "युवा ओलंपिक में भारतीय मुक्केबाजों का शानदार प्रदर्शन; कुमामोटो मास्टर्स बैडमिंटन में क्वार्टरफाइनल में पहुंचे शटलर",
        subhead: "डकार में भारतीय दल ने जीते पदक; जापान में बैडमिंटन कोर्ट पर भारतीय खिलाड़ियों का जलवा बरकरार।",
        image: "/images/sports-lead.jpg",
        author: "ग्लोबल स्पोर्ट्स डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "डकार — युवा ओलंपिक में भारतीय दल ने मुक्केबाजी और एथलेटिक्स में उल्लेखनीय सफलता हासिल की है।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-milk-amul-motherdairy",
      category: "व्यापार / अर्थव्यवस्था",
      headline: "अमूल और मदर डेयरी ने दूध के दामों में ₹2 से ₹4 प्रति लीटर का किया इजाफा; आज 12 नवंबर से नई दरें प्रभावी",
      subhead: "चारा और परिवहन लागत में वृद्धि के कारण कंपनियों ने उठाया कदम; खुदरा और थोक बाजारों पर सीधा असर।",
      image: "/images/business-lead.jpg",
      author: "उपभोक्ता डेस्क / नई दिल्ली",
      date: "12 Nov 2026",
      paragraphs: [
        "नई दिल्ली — अमूल और मदर डेयरी द्वारा दूध की कीमतों में की गई ₹2 से ₹4 प्रति लीटर की बढ़ोतरी ने आम उपभोक्ताओं के घरेलू बजट पर दबाव बढ़ा दिया है।",
        "कंपनियों ने दलील दी है कि पशुपालकों को दूध का सही मूल्य देने और बढ़ती लॉजिस्टिक्स लागत को पूरा करने के लिए यह मूल्य संशोधन आवश्यक था।"
      ]
    },
    subStories: [
      {
        id: "vyapar-sensex-rally-fii",
        category: "व्यापार / शेयर बाजार",
        headline: "सेंसेक्स और निफ्टी में विदेशी संस्थागत निवेशकों की जोरदार लिवाली से बाजार में शानदार तेजी",
        subhead: "बैंकिंग और ऑटो सेक्टर में भारी खरीदारी; निवेशकों की संपत्ति में ₹3 लाख करोड़ से अधिक का इजाफा।",
        image: "/images/ipo-fraud.jpg",
        author: "मार्केट डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "मुंबई — घरेलू अर्थव्यवस्था की मजबूती और मजबूत तिमाही नतीजों के दम पर शेयर बाजार में रिकॉर्ड खरीदारी देखी गई।"
        ]
      },
      {
        id: "vyapar-steel-consumption-record",
        category: "व्यापार / उद्योग",
        headline: "फिनिश्ड स्टील की घरेलू खपत में रिकॉर्ड उछाल, बुनियादी ढांचा परियोजनाओं से मांग में ऐतिहासिक वृद्धि",
        subhead: "इस्‍पात मंत्रालय के आंकड़ों के अनुसार पिछले सात महीनों में खपत 100 मीट्रिक टन के करीब पहुंची।",
        image: "/images/pib-steel-industry.jpg",
        author: "उद्योग डेस्क",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — बुनियादी ढांचा विस्तार और रेल-सड़क परियोजनाओं की वजह से घरेलू स्टील की खपत तेजी से बढ़ रही है।"
        ]
      },
      {
        id: "vyapar-upi-transactions-milestone",
        category: "व्यापार / डिजिटल बैंकिंग",
        headline: "डिजिटल भुगतान में यूपीआई का नया कीर्तिमान: अक्टूबर महीने में 16 अरब से अधिक सफल लेन-देन संपन्न",
        subhead: "एनपीसीआई की रिपोर्ट के अनुसार छोटे खुदरा व्यापारियों से लेकर ई-कॉमर्स तक यूपीआई भारत की लाइफलाइन।",
        image: "/images/desh-coins.jpg",
        author: "फिनटेक ब्यूरो",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — भारत का यूपीआई नेटवर्क दुनिया में सबसे तेजी से बढ़ता और सबसे बड़ा खुदरा डिजिटल भुगतान मंच बन गया है।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-indonesia-democracy",
      category: "वैचारिकी / संपादकीय",
      headline: "राजनीतिक शुचिता और योग्यता का संकट: इंडोनेशिया में जिब्रान राकाबुमिंग राका के इस्तीफे से वैश्विक लोकतंत्र के लिए सबक",
      subhead: "पारिवारिक विरासत बनाम संवैधानिक मर्यादाएं: शीर्ष पदों पर शैक्षणिक विश्वसनीयता और जनविश्वास का गहराता द्वंद्व।",
      image: "/images/vaichariki-lead.jpg",
      author: "संपादकीय / विदेश नीति विश्लेषक",
      date: "12 Nov 2026",
      paragraphs: [
        "इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका का त्यागपत्र केवल एक व्यक्तिगत राजनीतिक घटना नहीं है, बल्कि यह विकासशील लोकतंत्रों में परिवारवाद और संवैधानिक शुचिता के बीच जारी संघर्ष का जीवंत उदाहरण है।",
        "जब लोकतांत्रिक संस्थाएं और न्यायपालिका राजनीतिक दबावों से मुक्त होकर काम करती हैं, तो वे सत्ता के शीर्ष पदों पर आसीन व्यक्तियों की वैधता की निष्पक्ष जांच करने में सक्षम होती हैं। जिब्रान का प्रकरण यह साबित करता है कि जनता का विश्वास किसी भी राजनीतिक वंशवाद से बड़ा होता है।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-ipl-trades-economy",
        category: "वैचारिकी / खेल विमर्श",
        headline: "आईपीएल में प्री-नीलामी ट्रेड का नया दौर: खिलाड़ियों की स्वायत्तता और फ्रेंचाइजी रणनीतियों का आर्थिक विश्लेषण",
        subhead: "क्या खिलाड़ी विनिमय से फ्रेंचाइजी क्रिकेट अधिक प्रतिस्पर्धी हो रहा है? टीम संतुलन पर विशेषज्ञों की राय।",
        image: "/images/sports-lead.jpg",
        author: "वरिष्ठ खेल विश्लेषक",
        date: "12 Nov 2026",
        paragraphs: [
          "मुंबई — आधुनिक क्रिकेट में खिलाड़ी सौदों की संरचना वैश्विक पेशेवर लीगों जैसे एनबीए और यूरोपीय फुटबॉल के स्तर पर पहुंच रही है।"
        ]
      },
      {
        id: "vaichariki-antalya-cop31-climate-justice",
        category: "वैचारिकी / पर्यावरण",
        headline: "अंताल्या COP31 सम्मेलन: क्या अमीर देश जलवायु न्याय के लिए वित्तीय दायित्व निभाने को तैयार होंगे?",
        subhead: "ग्लोबल साउथ के देशों की मांग: खोखले वादों के स्थान पर ठोस जलवायु वित्त पोषण और प्रौद्योगिकी हस्तांतरण।",
        image: "/images/modi-zelenskyy.jpg",
        author: "जलवायु नीति विशेषज्ञ",
        date: "12 Nov 2026",
        paragraphs: [
          "अंताल्या — जलवायु संकट की सबसे ज्यादा मार झेलने वाले विकासशील देशों को रियायती दरों पर हरित वित्त उपलब्ध कराना आवश्यक है।"
        ]
      },
      {
        id: "vaichariki-pollution-economic-cost",
        category: "वैचारिकी / नीति विश्लेषण",
        headline: "वायु प्रदूषण की ₹7.9 लाख करोड़ की सालाना कीमत: सार्वजनिक स्वास्थ्य को राष्ट्रीय सुरक्षा की तरह लेने का समय",
        subhead: "फिक्की के आंकड़ों से स्पष्ट है कि स्वच्छ हवा केवल पर्यावरण का मुद्दा नहीं, बल्कि देश की आर्थिक जीवन रेखा है।",
        image: "/images/delhi-pollution.jpg",
        author: "आर्थिक विश्लेषक",
        date: "12 Nov 2026",
        paragraphs: [
          "नई दिल्ली — वायु प्रदूषण के कारण काम के घंटों में होने वाला नुकसान और अस्पतालों पर बढ़ता वित्तीय बोझ आर्थिक प्रगति को धीमा कर रहा है।"
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
  { key: "khel", label: "खेल" },
  { key: "vyapar", label: "व्यापार" },
  { key: "vaichariki", label: "वैचारिकी" },
  { key: "sehat", label: "सेहत" },
  { key: "explainer", label: "एक्सप्लेनर" },
];

export default function HindiNewsPortal() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // In-Page Article Reader state (NO popup modal! Displays inline on the same page)
  const [activeArticle, setActiveArticle] = useState<StoryItem | null>(null);
  const [readingMode, setReadingMode] = useState<"full" | "summary">("full");
  const [linkCopied, setLinkCopied] = useState(false);

  // Scroll to Top visibility tracker
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter category sections according to active tab
  const filteredCategorySections = useMemo(() => {
    if (activeCategoryKey === "all") {
      return CATEGORY_SECTIONS;
    }
    return CATEGORY_SECTIONS.filter(
      (sec) =>
        sec.key === activeCategoryKey ||
        (activeCategoryKey === "explainer" && sec.key === "desh") ||
        (activeCategoryKey === "sehat" && sec.key === "desh")
    );
  }, [activeCategoryKey]);

  // Open article directly on the SAME PAGE (no popup modal)
  const openArticle = (story: StoryItem) => {
    setActiveArticle(story);
    setReadingMode("full");
    setLinkCopied(false);
    setTimeout(() => {
      const readerElem = document.getElementById("in-page-article-reader");
      if (readerElem) {
        readerElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 40);
  };

  const closeReader = () => {
    setActiveArticle(null);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined" && activeArticle) {
      const text = encodeURIComponent(`${activeArticle.headline} - ख़बरगणित: `);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  const handleShareX = () => {
    if (typeof window !== "undefined" && activeArticle) {
      const text = encodeURIComponent(`${activeArticle.headline} | ख़बरगणित`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
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
      
      {/* ── TOP HEADER / NAVBAR: PROMINENT VISIBLE LOGO & CLEAN HINDI TYPOGRAPHY ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-22 md:h-24 flex items-center justify-between">
          
          {/* Mobile Left: Hamburger Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-black hover:text-[#C13A08] transition-colors cursor-pointer rounded-lg hover:bg-stone-100"
              aria-label="मेन्यू खोलें"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Logo (Desktop Left / Mobile Centered) - PROMINENT, CRISP & FULLY VISIBLE */}
          <div className="flex items-center">
            <div
              onClick={() => scrollToSection("all")}
              className="cursor-pointer flex items-center py-1 group"
              title="ख़बरगणित - मुख्य पृष्ठ"
            >
              <Image
                src="/logo-hindi-clean.png"
                alt="ख़बरगणित"
                width={380}
                height={125}
                priority
                className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02] drop-shadow-xs"
              />
            </div>
          </div>

          {/* Desktop Center: Categories in Modern Hindi Font (Noto Sans Devanagari) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 select-none">
            {NAVBAR_CATEGORIES.filter((c) => c.key !== "all").map((cat) => {
              const isSelected = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => scrollToSection(cat.key)}
                  className={`text-[16px] lg:text-[17px] font-sans font-bold transition-all cursor-pointer py-1.5 ${
                    isSelected
                      ? "text-[#C13A08] border-b-3 border-[#C13A08]"
                      : "text-stone-800 hover:text-[#C13A08]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop & Mobile Right: Social Links + Search Icon */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {/* Social Links (Hidden on small mobile) */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-blue-600 transition-colors p-1 font-bold text-sm"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://x.com/khabarGanit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-black transition-colors p-1 font-bold text-sm"
                title="X"
              >
                𝕏
              </a>
              <a
                href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-pink-600 transition-colors p-1"
                title="Instagram"
              >
                <Image src="/social/instagram.png" alt="Instagram" width={16} height={16} className="object-contain" />
              </a>
              <a
                href="https://www.youtube.com/@KhabarGanit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-red-600 transition-colors p-1"
                title="YouTube"
              >
                <Image src="/social/youtube.png" alt="YouTube" width={17} height={17} className="object-contain" />
              </a>
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-800 hover:text-[#C13A08] transition-colors cursor-pointer rounded-lg hover:bg-stone-100"
              aria-label="खोजें"
              title="समाचार खोजें"
            >
              <Search size={20} />
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
                placeholder="ताज़ा ख़बरें खोजें (जैसे: इंडोनेशिया, कुलगाम, हार्दिक पंड्या, अमूल दूध, कॉप31)..."
                autoFocus
                className="flex-1 bg-white border border-stone-300 rounded-lg px-4 py-2.5 text-sm font-sans text-black placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C13A08]"
              />
              <button
                type="submit"
                className="bg-[#C13A08] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors cursor-pointer font-sans"
              >
                खोजें
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-stone-500 hover:text-black cursor-pointer"
              >
                <X size={20} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ── MOBILE SLIDE-OUT DRAWER ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-white text-black h-full shadow-2xl z-10 flex flex-col justify-between p-6">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
                <Image
                  src="/logo-hindi-clean.png"
                  alt="ख़बरगणित"
                  width={200}
                  height={66}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700"
                  aria-label="बंद करें"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Hindi Categories in Drawer */}
              <nav className="flex flex-col space-y-1.5">
                {NAVBAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => scrollToSection(cat.key)}
                    className={`text-left px-3.5 py-3 rounded-lg text-[17px] font-sans font-bold transition-colors ${
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
            <div className="pt-5 border-t border-stone-200">
              <span className="text-xs font-bold font-sans text-stone-500 uppercase tracking-wider block mb-3">
                हमें फ़ॉलो करें
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.youtube.com/@KhabarGanit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-stone-100 rounded-full hover:bg-red-50"
                  title="YouTube"
                >
                  <Image src="/social/youtube.png" alt="YouTube" width={20} height={20} />
                </a>
                <a
                  href="https://x.com/khabarGanit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-stone-100 rounded-full hover:bg-stone-200"
                  title="X"
                >
                  <Image src="/social/x.png" alt="X" width={18} height={18} />
                </a>
                <a
                  href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-stone-100 rounded-full hover:bg-pink-50"
                  title="Instagram"
                >
                  <Image src="/social/instagram.png" alt="Instagram" width={18} height={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BREAKING NEWS TICKER (Pure Hindi - 12 Nov 2026) ── */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 sm:py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A08] text-white px-2.5 py-0.5 rounded-sm font-bold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ब्रेकिंग न्यूज़
          </span>
          <div className="truncate text-stone-800 font-semibold">
            इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका ने सौंपा इस्तीफा • कुलगाम में सुरक्षाबलों पर आतंकी हमला • हार्दिक पंड्या ₹18 करोड़ में पंजाब किंग्स में शामिल • अमूल व मदर डेयरी ने दूध के दामों में ₹2-4 प्रति लीटर की बढ़ोतरी की
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7">

        {/* ══════════════════════════════════════════════════════════════
            ✦ IN-PAGE ARTICLE READER (NO POPUP MODAL OVERLAY)
            Opens directly within the page flow when any story is clicked!
            Includes Full vs Brief toggle ("the full not the full").
           ══════════════════════════════════════════════════════════════ */}
        {activeArticle && (
          <section
            id="in-page-article-reader"
            className="mb-10 sm:mb-14 scroll-mt-28 bg-white border-2 border-[#C13A08]/40 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden animate-fadeIn select-text"
          >
            {/* Top Reader Action Bar */}
            <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C13A08] animate-pulse shrink-0" />
                <span className="bg-[#C13A08] text-white text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
                  {activeArticle.category}
                </span>
                <span className="text-xs sm:text-sm font-sans font-semibold text-stone-600 hidden sm:inline">
                  ✦ विस्तृत समाचार वाचन (ऑन-पेज)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Full vs Brief Toggle: Directly addresses "the full not the full" */}
                <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-white text-xs font-sans font-semibold shadow-2xs">
                  <button
                    onClick={() => setReadingMode("full")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      readingMode === "full"
                        ? "bg-[#C13A08] text-white"
                        : "text-stone-700 hover:text-black"
                    }`}
                  >
                    विस्तृत (Full)
                  </button>
                  <button
                    onClick={() => setReadingMode("summary")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      readingMode === "summary"
                        ? "bg-[#C13A08] text-white"
                        : "text-stone-700 hover:text-black"
                    }`}
                  >
                    संक्षिप्त (Brief)
                  </button>
                </div>

                {/* Close Reader Button */}
                <button
                  onClick={closeReader}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-200 hover:bg-stone-900 hover:text-white rounded-lg text-xs font-sans font-bold text-stone-800 transition-colors cursor-pointer"
                  title="वाचन समाप्त करें (मुख्य सूची पर लौटें)"
                >
                  <X size={15} />
                  <span>बंद करें</span>
                </button>
              </div>
            </div>

            {/* Reader Content Body */}
            <div className="p-5 sm:p-8 md:p-11 max-w-4xl mx-auto">
              
              {/* Category & Status */}
              <div className="flex items-center gap-2 mb-2 select-none">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#C13A08]">
                  {activeArticle.category}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-xs font-sans text-stone-500 font-medium">ख़बरगणित विशेष रिपोर्ट</span>
              </div>

              {/* Bold Hindi Headline */}
              <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-black leading-snug tracking-tight mb-4">
                {activeArticle.headline}
              </h1>

              {/* Subhead / Lead */}
              {activeArticle.subhead && (
                <p className="font-sans font-medium text-base sm:text-lg text-stone-700 leading-relaxed mb-6 border-l-4 border-[#C13A08] pl-4 py-1 bg-stone-50/70 rounded-r">
                  {activeArticle.subhead}
                </p>
              )}

              {/* Byline and Published Date */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-sans text-stone-500 pb-5 mb-6 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C13A08] text-white flex items-center justify-center font-bold text-xs">
                    {activeArticle.author[0]}
                  </span>
                  <span className="font-bold text-stone-900">By {activeArticle.author}</span>
                </div>
                <span>•</span>
                <span>⏱ {activeArticle.date}</span>
                <span>•</span>
                <span className="text-stone-600 font-medium">3 मिनट का वाचन</span>
              </div>

              {/* Real Editorial Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-8 bg-stone-100 shadow-sm border border-stone-200">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.headline}
                  fill
                  unoptimized={true}
                  priority
                  className="object-cover"
                />
              </div>

              {/* Article Paragraphs in Modern Hindi Typography */}
              <div className="text-stone-900 font-sans space-y-5 text-base sm:text-[19px] leading-relaxed">
                {readingMode === "full" ? (
                  (activeArticle.paragraphs && activeArticle.paragraphs.length > 0
                    ? activeArticle.paragraphs
                    : [
                        activeArticle.subhead || activeArticle.headline,
                        "उच्च प्रशासनिक सूत्रों और संबंधित विभागों ने इस विषय पर विस्तृत दिशा-निर्देश जारी किए हैं।",
                        "जनहित एवं नीतिगत पारदर्शिता को सुनिश्चित करने के लिए सभी संबंधित एजेंसियां लगातार निगरानी बनाए हुए हैं।"
                      ]
                  ).map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "font-semibold text-stone-950 text-lg sm:text-xl leading-relaxed"
                          : "text-stone-800 leading-relaxed"
                      }
                    >
                      {para}
                    </p>
                  ))
                ) : (
                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-[#C13A08] uppercase tracking-wider block mb-2">
                      मुख्य अंश (Summary)
                    </span>
                    <p className="font-semibold text-stone-950 text-lg leading-relaxed">
                      {activeArticle.subhead || activeArticle.paragraphs?.[0] || activeArticle.headline}
                    </p>
                    {activeArticle.paragraphs?.[1] && (
                      <p className="mt-3 text-stone-700 text-base leading-relaxed">
                        {activeArticle.paragraphs[1]}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Share Bar & Bottom Close Action */}
              <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans font-bold text-stone-600 uppercase tracking-wide mr-1">
                    शेयर करें:
                  </span>
                  
                  {/* WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
                  >
                    <Share2 size={13} /> WhatsApp
                  </button>

                  {/* 𝕏 / Twitter */}
                  <button
                    onClick={handleShareX}
                    className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
                  >
                    𝕏 पोस्ट
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-stone-300"
                  >
                    {linkCopied ? (
                      <>
                        <Check size={13} className="text-green-600" /> कॉपी हो गया!
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> लिंक कॉपी करें
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Close Button */}
                <button
                  onClick={closeReader}
                  className="px-5 py-2.5 bg-[#C13A08] hover:bg-black text-white text-xs sm:text-sm font-sans font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  ✕ वाचन समाप्त करें / मुख्य सूची पर जाएं
                </button>
              </div>

            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════
            1. HERO SECTION: LARGE 21:9 / 16:9 BANNER WITH FROSTED CARD
            (Indonesia VP Gibran Resignation - News Pack 12 Nov 2026)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div
            onClick={() => openArticle(HERO_STORY)}
            className={`group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer transition-all duration-300 ${
              activeArticle?.id === HERO_STORY.id ? "ring-3 ring-[#C13A08]" : ""
            }`}
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
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[85%] md:w-[72%] max-w-3xl bg-black/75 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/85">
              
              {/* Red Category Badge */}
              <span className="inline-block bg-[#C13A08] text-white text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wide px-3 py-1 rounded-sm mb-2.5 shadow-xs">
                {HERO_STORY.category}
              </span>

              {/* Bold Hindi Headline in Modern Typography */}
              <h1 className="font-sans font-black text-lg sm:text-2xl md:text-[28px] text-white leading-snug sm:leading-tight mb-2.5 hover:text-red-400 transition-colors">
                {HERO_STORY.headline}
              </h1>

              {/* Byline */}
              <div className="text-[11px] sm:text-xs font-sans text-stone-300 flex items-center justify-center gap-2 tracking-wide">
                <span className="font-semibold">By {HERO_STORY.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">⏱ {HERO_STORY.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (12 Nov 2026)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOP_STORIES.map((story) => (
              <article
                key={story.id}
                onClick={() => openArticle(story)}
                className={`flex flex-col cursor-pointer group transition-all duration-300 ${
                  activeArticle?.id === story.id
                    ? "ring-2 ring-[#C13A08] p-2 rounded-2xl bg-red-50/20"
                    : ""
                }`}
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
                  <span className="absolute bottom-2.5 left-2.5 bg-[#C13A08] text-white text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wide shadow">
                    {story.category}
                  </span>
                </div>

                {/* Bold Hindi Headline in Crisp Font */}
                <h3 className="font-sans font-bold text-[17px] sm:text-[18px] text-stone-900 mt-3.5 leading-snug group-hover:text-[#C13A08] transition-colors line-clamp-3">
                  {story.headline}
                </h3>

                {/* Byline */}
                <div className="text-[12px] font-sans text-stone-500 mt-2 flex items-center gap-2">
                  <span className="font-semibold">By {story.author}</span>
                  <span>•</span>
                  <span>⏱ {story.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी)
           ══════════════════════════════════════════════════════════════ */}
        {filteredCategorySections.map((section) => (
          <section key={section.key} id={`section-${section.key}`} className="mb-14 sm:mb-16 scroll-mt-24">
            
            {/* Section Divider: ────── श्रेणी ────── */}
            <div className="flex items-center justify-center my-8 sm:my-12">
              <div className="flex-1 max-w-[120px] sm:max-w-[220px] h-[1.5px] bg-[#C13A08]/40" />
              <h2 className="px-6 text-2xl sm:text-3xl font-sans font-black text-[#C13A08] tracking-normal">
                {section.title}
              </h2>
              <div className="flex-1 max-w-[120px] sm:max-w-[220px] h-[1.5px] bg-[#C13A08]/40" />
            </div>

            {/* Featured Lead Banner for Category */}
            <div
              onClick={() => openArticle(section.leadStory)}
              className={`group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[440px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer mb-8 transition-all duration-300 ${
                activeArticle?.id === section.leadStory.id ? "ring-3 ring-[#C13A08]" : ""
              }`}
            >
              <Image
                src={section.leadStory.image}
                alt={section.leadStory.headline}
                fill
                unoptimized={true}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Overlaid Dark Frosted Card at Bottom */}
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[85%] md:w-[72%] max-w-3xl bg-black/75 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/85">
                <h3 className="font-sans font-black text-lg sm:text-2xl md:text-[24px] text-white leading-snug sm:leading-tight mb-2 hover:text-red-400 transition-colors">
                  {section.leadStory.headline}
                </h3>
                <div className="text-[11px] sm:text-xs font-sans text-stone-300 flex items-center justify-center gap-2 tracking-wide">
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
                  className={`flex flex-col cursor-pointer group transition-all duration-300 ${
                    activeArticle?.id === story.id
                      ? "ring-2 ring-[#C13A08] p-2 rounded-2xl bg-red-50/20"
                      : ""
                  }`}
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
                    <span className="absolute bottom-2.5 left-2.5 bg-[#C13A08] text-white text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wide shadow">
                      {story.category}
                    </span>
                  </div>

                  {/* Headline */}
                  <h4 className="font-sans font-bold text-[17px] sm:text-[18px] text-stone-900 mt-3.5 leading-snug group-hover:text-[#C13A08] transition-colors line-clamp-3">
                    {story.headline}
                  </h4>

                  {/* Byline */}
                  <div className="text-[12px] font-sans text-stone-500 mt-2 flex items-center gap-2">
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

      {/* ── FLOATING SCROLL TO TOP BUTTON ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-[#C13A08] text-white p-3.5 rounded-lg shadow-xl hover:bg-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="वापस ऊपर जाएं"
          aria-label="वापस ऊपर जाएं"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* ── FOOTER: CLEAN BRANDED WITH PROMINENT LOGO & CRISP TYPOGRAPHY ── */}
      <footer className="mt-16 border-t border-stone-200 bg-stone-50 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Prominent Footer Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer mb-4"
            title="ख़बरगणित"
          >
            <Image
              src="/logo-hindi-clean.png"
              alt="ख़बरगणित"
              width={340}
              height={112}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain mx-auto"
            />
          </div>

          {/* Tagline in Clean Font */}
          <p className="text-sm sm:text-base font-sans text-stone-600 mb-6 font-medium">
            हर ख़बर की कहानी, आँकड़ों की ज़ुबानी — भारत का प्रमुख डेटा-संचालित डिजिटल समाचार मंच
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-7 mb-7">
            <a
              href="https://www.youtube.com/@KhabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-700 hover:text-red-600 text-sm font-sans font-bold"
            >
              <Image src="/social/youtube.png" alt="YouTube" width={20} height={20} />
              <span>YouTube</span>
            </a>
            <a
              href="https://x.com/khabarGanit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-700 hover:text-black text-sm font-sans font-bold"
            >
              <Image src="/social/x.png" alt="X" width={18} height={18} />
              <span>𝕏 (Twitter)</span>
            </a>
            <a
              href="https://www.instagram.com/khabarganit?exln=MXhjMW04dWV5OG0zcg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-700 hover:text-pink-600 text-sm font-sans font-bold"
            >
              <Image src="/social/instagram.png" alt="Instagram" width={18} height={18} />
              <span>Instagram</span>
            </a>
            <a
              href="https://khabarganit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-700 hover:text-blue-600 text-sm font-sans font-bold"
            >
              <Image src="/social/google.png" alt="Website" width={18} height={18} />
              <span>khabarganit.com</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm font-sans text-stone-500">
            © 2026 ख़बरगणित (KhabarGanit). सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </footer>

    </div>
  );
}
