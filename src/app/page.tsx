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

// ── 1. HERO LEAD STORY: NVIDIA CEO JENSEN HUANG RESIGNS (News Pack 13 Nov 2026) ──
const HERO_STORY: StoryItem = {
  id: "hero-nvidia-huang-resignation",
  category: "तकनीक / वैश्विक व्यापार",
  headline: "एनवीडिया में ऐतिहासिक भूचाल: जासूसी व अफेयर के गंभीर आरोपों के बीच सीईओ जेनसन हुआंग ने दिया तत्काल इस्तीफा",
  subhead: "चीनी खुफिया एजेंट से कथित संबंधों और आंतरिक जांच के बाद सह-संस्थापक ने छोड़े सभी पद; सीएफओ कोलेट क्रेस बनीं अंतरिम सीईओ; नैस्डैक पर टेक शेयरों में भारी गिरावट।",
  image: "/images/nvidia_huang.jpg",
  author: "रॉयटर्स / द वर्ज / सैन फ्रांसिस्को ब्यूरो",
  date: "13 Nov 2026",
  paragraphs: [
    "सैन फ्रांसिस्को — आर्टिफिशियल इंटेलिजेंस (AI) और चिप निर्माण की दुनिया की सबसे मूल्यवान कंपनी एनवीडिया (Nvidia) के सह-संस्थापक जेनसन हुआंग ने मुख्य कार्यकारी अधिकारी (CEO), अध्यक्ष और निदेशक मंडल के सदस्य के पद से तत्काल प्रभाव से इस्तीफा दे दिया है।",
    "यह अप्रत्याशित इस्तीफा उन विस्फोटक खुलासों के बाद आया है, जिनमें हुआंग के कंपनी की एक महिला कार्यकारी और चीन की खुफिया एजेंसी से जुड़ी संदिग्ध महिला के साथ विवाहेतर संबंधों की बात सामने आई थी। स्वतंत्र जांच समिति की अंतरिम रिपोर्ट के बाद बोर्ड के भारी दबाव के चलते हुआंग को पद छोड़ना पड़ा।",
    "कंपनी के निदेशक मंडल ने मौजूदा मुख्य वित्तीय अधिकारी (CFO) कोलेट क्रेस को अंतरिम सीईओ नियुक्त किया है। हुआंग के इस्तीफे की खबर सार्वजनिक होते ही अमेरिकी शेयर बाजार नैस्डैक पर एनवीडिया के शेयरों में 9% से अधिक की भारी गिरावट दर्ज की गई, जिससे वैश्विक सेमीकंडक्टर बाजार में भारी उथल-पुथल मच गई है।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 13 Nov 2026) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-delhi-severe-aqi",
    category: "देश / पर्यावरण संकट",
    headline: "दिल्ली में सांसों पर गंभीर आपातकाल: औसत AQI 488 के खतरनाक स्तर पर पहुंचा; घने जहरीले स्मॉग की चादर में कैद राजधानी",
    subhead: "आईआईटी दिल्ली 488, चांदनी चौक 479 और नॉर्थ कैंपस 478 दर्ज; शून्य के करीब पहुंची दृश्यता; ग्रैप स्टेज-3 के कड़े प्रतिबंध लागू, प्राथमिक स्कूलों पर असर।",
    image: "/images/delhi_aqi.jpg",
    author: "पर्यावरण ब्यूरो / नई दिल्ली",
    date: "13 Nov 2026",
    paragraphs: [
      "नई दिल्ली — राष्ट्रीय राजधानी दिल्ली में शुक्रवार की सुबह वायु गुणवत्ता सूचकांक (AQI) 'गंभीर' (Severe) श्रेणी में प्रवेश कर गया। कई निगरानी केंद्रों पर यह 480 के पार दर्ज किया गया, जिसमें आईआईटी दिल्ली में 488, चांदनी चौक में 479 और दिल्ली विश्वविद्यालय के नॉर्थ कैंपस में 478 का खतरनाक स्तर रिकॉर्ड हुआ।",
      "सर्दियों की शुरुआत और धीमी हवाओं के कारण जहरीले स्मॉग की चादर ने पूरी राजधानी को अपनी चपेट में ले लिया है, जिससे दृश्यता काफी घट गई है। वायु गुणवत्ता प्रबंधन आयोग (CAQM) ने ग्रैप के तीसरे चरण (GRAP-3) की पाबंदियों को सख्ती से लागू करने के निर्देश दिए हैं, जिसके तहत गैर-जरूरी निर्माण कार्यों और पुराने डीजल वाहनों के संचालन पर रोक जारी है।"
    ]
  },
  {
    id: "top-kulgam-search-operations",
    category: "देश / सुरक्षा",
    headline: "कुलगाम आतंकी हमला: घायल जवान की हालत नाजुक; सुरक्षाबलों ने लश्कर कमांडरों के खिलाफ छेड़ा भीषण तलाशी अभियान",
    subhead: "मीरबाजार में सीआरपीएफ चेकपॉइंट पर हमले के बाद ड्रोन और स्निफर डॉग्स से जंगलों की घेराबंदी; स्थानीय लश्कर मॉड्यूल से जुड़े संदिग्धों की तलाश।",
    image: "/images/kulgam_search.jpg",
    author: "सुरक्षा संवाददाता / श्रीनगर",
    date: "13 Nov 2026",
    paragraphs: [
      "श्रीनगर — दक्षिण कश्मीर के कुलगाम जिले में सीआरपीएफ चौकी पर हुए आतंकी हमले के बाद सुरक्षाबलों का वृहद तलाशी अभियान आज दूसरे दिन भी लगातार जारी है। हमले में घायल तीन सीआरपीएफ जवानों में से एक की हालत नाजुक बनी हुई है और वे सैन्य अस्पताल के आईसीयू में भर्ती हैं।",
      "सेना, जम्मू-कश्मीर पुलिस और सीआरपीएफ की संयुक्त टुकड़ियों ने कुलगाम और अनंतनाग के सीमावर्ती जंगलों की त्रिस्तरीय घेराबंदी कर रखी है। खुफिया सूत्रों के अनुसार यह हमला स्थानीय लश्कर कमांडर के इशारे पर किया गया था, जिसके कई संदिग्ध मददगारों को हिरासत में लेकर पूछताछ की जा रही है।"
    ]
  },
  {
    id: "top-gibran-prabowo-resignation",
    category: "विदेश / अंतर्राष्ट्रीय राजनीति",
    headline: "इंडोनेशिया: उपराष्ट्रपति जिब्रान का इस्तीफा राष्ट्रपति प्रबोवो ने भारी मन से किया स्वीकार; 60 दिनों में चुना जाएगा नया उपराष्ट्रपति",
    subhead: "संसद के उच्च सदन (MPR) में औपचारिक प्रक्रिया शुरू; 100 से अधिक सांसदों के महाभियोग प्रस्ताव और डिग्री विवाद के बाद उठा राजनीतिक तूफान।",
    image: "/images/gibran_update.jpg",
    author: "रॉयटर्स / जकार्ता ब्यूरो",
    date: "13 Nov 2026",
    paragraphs: [
      "जकार्ता — इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका द्वारा पद छोड़ने की औपचारिक प्रक्रिया तेजी से आगे बढ़ रही है। राष्ट्रपति प्रबोवो सुबियांतो ने भारी मन से अपने युवा सहयोगी का इस्तीफा स्वीकार कर लिया है और संसद के उच्च सदन को इस संबंध में आधिकारिक संदेश भेज दिया है।",
      "संवैधानिक प्रावधानों के अनुसार अब पीपुल्स कंसल्टेटिव असेंबली (MPR) उपराष्ट्रपति पद की रिक्ति की घोषणा करेगी और राष्ट्रपति द्वारा 60 दिनों के भीतर प्रस्तावित दो उम्मीदवारों में से एक नए उपराष्ट्रपति का चुनाव करेगी। जिब्रान पर चुनावी हलफनामे में फर्जी हाई स्कूल डिग्री देने के आरोपों के बाद महाभियोग का खतरा मंडरा रहा था।"
    ]
  },
  {
    id: "top-dakar-boxing-golds",
    category: "खेल / युवा ओलंपिक",
    headline: "डकार युवा ओलंपिक में भारत का ऐतिहासिक डंका: मुक्केबाज गुंजन और अंबेडकर मीतेई ने जीते दो शानदार स्वर्ण पदक",
    subhead: "महिला 48 किग्रा और पुरुष 50 किग्रा वर्ग में भारतीय मुक्केबाजों ने रचा इतिहास; यूथ ओलंपिक में पहली बार भारत को बॉक्सिंग में मिले दो गोल्ड।",
    image: "/images/pib-asian-para-games.jpg",
    author: "ओलंपिक ब्यूरो / डकार",
    date: "13 Nov 2026",
    paragraphs: [
      "डकार (सेनेगल) — भारत के युवा मुक्केबाजों ने डकार 2026 युवा ओलंपिक खेलों में ऐतिहासिक स्वर्णिम सफलता हासिल की है। महिला 48 किग्रा भार वर्ग में भारत की गुंजन ने शानदार पंचों के दम पर उज्बेकिस्तान की मुक्केबाज को 5-0 से हराकर स्वर्ण पदक अपने नाम किया।",
      "वहीं पुरुषों के 50 किग्रा वर्ग में एल. अंबेडकर मीतेई ने फाइनल मुकाबले में क्यूबा के बॉक्सर को सर्वसम्मत फैसले से पराजित कर भारत की झोली में दूसरा स्वर्ण पदक डाला। युवा ओलंपिक के इतिहास में यह पहला अवसर है जब भारत ने मुक्केबाजी में एक ही दिन दो स्वर्ण पदक जीते हैं।"
    ]
  },
  {
    id: "top-u19-asia-cup-final",
    category: "खेल / अंडर-19 क्रिकेट",
    headline: "अंडर-19 एशिया कप सेमीफाइनल: भारत ने अफगानिस्तान को 8 विकेट से रौंदा; अब खिताबी महामुकाबले में पाकिस्तान से भिड़ंत",
    subhead: "142 रन का लक्ष्य भारत ने सिर्फ 21.2 ओवर में हासिल किया; गेंदबाजों के घातक प्रदर्शन के बाद आर्यावीर सहवाग व बल्लेबाजों ने दिखाया दम।",
    image: "/images/vaichariki-mbappe.jpg",
    author: "क्रिकेट डेस्क / दुबई",
    date: "13 Nov 2026",
    paragraphs: [
      "दुबई — एसीसी पुरुष अंडर-19 एशिया कप के पहले सेमीफाइनल में भारतीय युवा टीम ने अफगानिस्तान को 8 विकेट के बड़े अंतर से करारी शिकस्त देकर शान से फाइनल में प्रवेश कर लिया है।",
      "भारतीय गेंदबाजों ने अफगानिस्तान की पूरी टीम को मात्र 141 रनों पर समेट दिया। इसके जवाब में भारतीय बल्लेबाजों ने आक्रामक रुख अपनाते हुए 21.2 ओवर में ही 2 विकेट खोकर लक्ष्य हासिल कर लिया। अब रविवार को होने वाले खिताबी मुकाबले में भारत का सामना चिर-प्रतिद्वंद्वी पाकिस्तान से होगा।"
    ]
  },
  {
    id: "top-inflation-rbi-limit",
    category: "व्यापार / अर्थव्यवस्था",
    headline: "महंगाई का तगड़ा झटका: खुदरा मुद्रास्फीति बढ़कर 6.09% पर पहुंची, RBI की 6% की ऊपरी सहनशीलता सीमा पार",
    subhead: "सब्जियों, दालों और खाद्य तेलों की आसमान छूती कीमतों से घरेलू बजट बेपटरी; ब्याज दरों में कटौती की संभावनाओं को लगा बड़ा झटका।",
    image: "/images/business-lead.jpg",
    author: "आर्थिक ब्यूरो / नई दिल्ली",
    date: "13 Nov 2026",
    paragraphs: [
      "नई दिल्ली — देश में खुदरा मुद्रास्फीति (CPI Inflation) एक बार फिर भारतीय रिजर्व बैंक (RBI) के निर्धारित 2% से 6% के दायरे को पार कर 6.09% पर पहुंच गई है। सांख्यिकी मंत्रालय द्वारा जारी ताजा आंकड़ों के अनुसार खाद्य महंगाई दर में तेज बढ़ोतरी इस उछाल की मुख्य वजह रही।",
      "प्याज, टमाटर, आलू और खाद्य तेलों की खुदरा कीमतों में 15 से 30 प्रतिशत की तेजी दर्ज की गई है। अर्थशास्त्रियों का मानना है कि मुद्रास्फीति के 6% के पार निकलने के बाद आरबीआई की आगामी मौद्रिक नीति समिति (MPC) की बैठक में रेपो रेट में कटौती की उम्मीदें लगभग खत्म हो गई हैं, जिससे ईएमआई कम होने का इंतजार बढ़ गया है।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-delhi-smog-emergency",
      category: "देश / पर्यावरण संकट",
      headline: "दिल्ली में सांसों पर गंभीर आपातकाल: औसत AQI 488 के पार; घने जहरीले स्मॉग की चादर में कैद हुई राष्ट्रीय राजधानी",
      subhead: "आईआईटी दिल्ली 488, चांदनी चौक 479 दर्ज; विजिबिलिटी शून्य के करीब; ग्रैप स्टेज-3 के तहत निर्माण कार्यों और प्रदूषणकारी वाहनों पर कड़े प्रतिबंध।",
      image: "/images/delhi_aqi.jpg",
      author: "पर्यावरण ब्यूरो / नई दिल्ली",
      date: "13 Nov 2026",
      paragraphs: [
        "नई दिल्ली — राष्ट्रीय राजधानी दिल्ली में शुक्रवार की सुबह प्रदूषण ने इस मौसम के सारे रिकॉर्ड तोड़ दिए। शहर का औसत एक्यूआई 488 के अत्यंत गंभीर स्तर पर पहुंच गया। हवा में सांस लेना दिन भर में 25 से अधिक सिगरेट पीने के बराबर खतरनाक माना जा रहा है।",
        "चिकित्सकों ने बच्चों और बुजुर्गों को घरों के अंदर रहने तथा बाहर निकलते समय एन-95 मास्क का अनिवार्य उपयोग करने की सलाह दी है।"
      ]
    },
    subStories: [
      {
        id: "desh-kulgam-investigation",
        category: "देश / सुरक्षा",
        headline: "कुलगाम आतंकी हमला: सुरक्षाबलों की संयुक्त टुकड़ियों का जंगलों में सघन कॉर्डन अभियान; लश्कर कमांडर की तलाश तेज",
        subhead: "घायल जवान की हालत गंभीर बनी हुई है; घाटी में सभी संवेदनशील चेकपोस्टों पर अतिरिक्त सुरक्षाबल तैनात।",
        image: "/images/kulgam_search.jpg",
        author: "सुरक्षा ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "श्रीनगर — सुरक्षाबलों ने दक्षिण कश्मीर के जंगलों में बड़े पैमाने पर तलाशी अभियान शुरू किया है ताकि हमलावरों को जल्द से जल्द ढेर किया जा सके।"
        ]
      },
      {
        id: "desh-iaf-chargesheet-espionage",
        category: "देश / रक्षा",
        headline: "पाकिस्तानी जासूस को युद्ध योजनाएं साझा करने के आरोप में भारतीय वायुसेना के विंग कमांडर के खिलाफ चार्जशीट दाखिल",
        subhead: "ऑफिशियल सीक्रेट्स एक्ट के तहत मामला दर्ज; संवेदनशील सामरिक जानकारियों के लीक होने की उच्चस्तरीय जांच।",
        image: "/images/pib-defense-sahyadri.jpg",
        author: "रक्षा ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "नई दिल्ली — सुरक्षा एजेंसियों ने वायुसेना के एक सेवारत अधिकारी के खिलाफ पाकिस्तानी खुफिया तंत्र को वर्गीकृत ऑपरेशनल जानकारियां लीक करने के आरोप में औपचारिक आरोप-पत्र अदालत में पेश किया है।"
        ]
      },
      {
        id: "desh-sonam-wangchuk-statement",
        category: "देश / लद्दाख",
        headline: "लद्दाख के पर्यावरण कार्यकर्ता सोनम वांगचुक ने प्रशासनिक पाबंदियों को बताया 'मनमाना और गैरकानूनी'",
        subhead: "कहा- बुनियादी लोकतांत्रिक अधिकारों और आंदोलन को दबाने के लिए अस्पष्ट आदेशों का लिया जा रहा सहारा।",
        image: "/images/trending-lead.jpg",
        author: "लेह ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "लेह — लद्दाख के प्रसिद्ध सामाजिक और पर्यावरण कार्यकर्ता सोनम वांगचुक ने उनके आवागमन पर लगाई गई प्रशासनिक पाबंदियों को कानूनी रूप से अनुचित करार दिया है।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-gibran-replacement-process",
      category: "विदेश / अंतर्राष्ट्रीय राजनीति",
      headline: "इंडोनेशिया में उपराष्ट्रपति जिब्रान के इस्तीफे की संवैधानिक प्रक्रिया शुरू; राष्ट्रपति प्रबोवो ने भारी मन से दी मंजूरी",
      subhead: "संसद के उच्च सदन (MPR) को औपचारिक पत्र सौंपा; 60 दिनों के भीतर संसद नए उपराष्ट्रपति का करेगी निर्वाचन; राजनीतिक हलचल तेज।",
      image: "/images/gibran_update.jpg",
      author: "रॉयटर्स / जकार्ता",
      date: "13 Nov 2026",
      paragraphs: [
        "जकार्ता — इंडोनेशिया के उपराष्ट्रपति जिब्रान राकाबुमिंग राका के इस्तीफे के बाद देश की संवैधानिक व्यवस्था नए उपराष्ट्रपति के चयन में जुट गई है। राष्ट्रपति प्रबोवो ने भारी मन से इस्तीफा स्वीकार करते हुए देश में राजनीतिक स्थिरता बनाए रखने का आह्वान किया है।",
        "संसद की पीपुल्स कंसल्टेटिव असेंबली 60 दिनों की निर्धारित समयसीमा में राष्ट्रपति द्वारा अनुशंसित उम्मीदवारों में से नए उपराष्ट्रपति का चुनाव करेगी।"
      ]
    },
    subStories: [
      {
        id: "videsh-cop31-antalya-clash",
        category: "विदेश / जलवायु",
        headline: "तुर्की में COP31 अंताल्या शिखर सम्मेलन: जलवायु वित्त और उत्सर्जन लक्ष्यों पर विकसित व विकासशील देशों में तीखा टकराव",
        subhead: "विकासशील देशों ने प्रतिवर्ष 100 अरब डॉलर के अनुदान की मांग दोहराई; अमीर देशों ने जताई वित्तीय हिचकिचाहट।",
        image: "/images/cop31_leaders.jpg",
        author: "अंताल्या ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "अंताल्या — कॉप-31 शिखर सम्मेलन के दूसरे दिन अमीर और विकासशील देशों के बीच जलवायु क्षतिपूर्ति कोष को लेकर गंभीर मतभेद उभरकर सामने आए हैं।"
        ]
      },
      {
        id: "videsh-ukraine-peace-talks",
        category: "विदेश / कूटनीति",
        headline: "यूक्रेन शांति वार्ता में यूरोपीय प्रतिनिधियों को किया जाएगा शामिल; पुतिन ने कहा- क्षेत्रीय संप्रभुता पर समझौता नहीं",
        subhead: "ज़ेलेंस्की और अमेरिकी दूत कुशनर की वार्ता; रूस ने विदेशी शांति सैनिकों की तैनाती के प्रस्ताव को किया खारिज।",
        image: "/images/world-lead.jpg",
        author: "यूरोप ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "मास्को / कीव — त्रिपक्षीय शांति वार्ता के नए दौर में यूरोपीय देशों की भागीदारी पर सहमति बन गई है, हालांकि पुतिन ने क्षेत्रीय दावों पर अडिग रुख बनाए रखा है।"
        ]
      },
      {
        id: "videsh-gaza-hospital-airstrike",
        category: "विदेश / मध्य पूर्व",
        headline: "गाजा के नासिर अस्पताल पर इजरायली हवाई हमला; वरिष्ठ सर्जन और बच्चों सहित कम से कम 6 लोगों की मौत",
        subhead: "दक्षिणी गाजा में स्वास्थ्य सेवाओं पर भारी संकट; अंतरराष्ट्रीय मानवाधिकार संगठनों ने जताई गहरी चिंता।",
        image: "/images/highcourt-fatwa.jpg",
        author: "पश्चिम एशिया डेस्क",
        date: "13 Nov 2026",
        paragraphs: [
          "गाजा — दक्षिणी गाजा के नासिर अस्पताल परिसर पर हुए ताजा हवाई हमले में एक प्रसिद्ध सर्जन और मरीजों सहित कई नागरिक हताहत हुए हैं।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-dakar-boxing-history",
      category: "खेल / युवा ओलंपिक",
      headline: "डकार युवा ओलंपिक में भारत का ऐतिहासिक डंका: मुक्केबाज गुंजन और अंबेडकर मीतेई ने जीते दो शानदार स्वर्ण पदक",
      subhead: "महिला 48 किग्रा और पुरुष 50 किग्रा वर्ग में भारतीय मुक्केबाजों ने रचा इतिहास; यूथ ओलंपिक में पहली बार भारत को बॉक्सिंग में मिले दो गोल्ड।",
      image: "/images/pib-asian-para-games.jpg",
      author: "ओलंपिक ब्यूरो / डकार",
      date: "13 Nov 2026",
      paragraphs: [
        "डकार — भारतीय मुक्केबाजों ने सेनेगल में आयोजित युवा ओलंपिक में स्वर्णिम इतिहास रच दिया है। गुंजन और अंबेडकर मीतेई के शानदार खेल ने भारत को वैश्विक बॉक्सिंग पटल पर शीर्ष स्थान दिलाया।",
        "खेल विशेषज्ञों का मानना है कि यह अभूतपूर्व उपलब्धि आगामी 2028 लॉस एंजिल्स ओलंपिक में भारत के मुख्य पदक दावों को जबरदस्त मजबूती प्रदान करेगी।"
      ]
    },
    subStories: [
      {
        id: "khel-ind-nz-4th-odi",
        category: "खेल / क्रिकेट",
        headline: "माउंट माउंगानुई में भारत और न्यूजीलैंड के बीच चौथा वनडे मुकाबला जारी; भारत ने टॉस जीतकर चुनी पहले गेंदबाजी",
        subhead: "श्रेयस अय्यर की कप्तानी में भारतीय टीम श्रृंखला में अजेय बढ़त बनाने के इरादे से मैदान में उतरी।",
        image: "/images/sports-lead.jpg",
        author: "क्रिकेट संवाददाता",
        date: "13 Nov 2026",
        paragraphs: [
          "माउंट माउंगानुई — भारतीय टीम ने चौथे वनडे में पहले गेंदबाजी करने का फैसला किया है और नई गेंद से विपक्षी बल्लेबाजों पर दबाव बनाने में सफलता पाई है।"
        ]
      },
      {
        id: "khel-u19-asia-cup-thrashing",
        category: "खेल / अंडर-19",
        headline: "अंडर-19 एशिया कप: अफगानिस्तान को 8 विकेट से धूल चटाकर फाइनल में पहुंचा भारत; खिताबी जंग में पाकिस्तान से भिड़ंत",
        subhead: "142 रन का लक्ष्य मात्र 21.2 ओवर में पूरा; आर्यावीर सहवाग का शानदार फॉर्म जारी, रविवार को महामुकाबला।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "स्पोर्ट्स डेस्क",
        date: "13 Nov 2026",
        paragraphs: [
          "दुबई — भारतीय युवा टीम ने अफगानिस्तान को एकतरफा मुकाबले में रौंदकर एशिया कप के फाइनल में जगह पक्की कर ली है।"
        ]
      },
      {
        id: "khel-hardik-arshdeep-confirmed",
        category: "खेल / आईपीएल २०२७",
        headline: "हार्दिक पंड्या पंजाब किंग्स और अर्शदीप सिंह मुंबई इंडियंस: आईपीएल 2027 के सबसे बड़े ट्रेड की आधिकारिक पुष्टि",
        subhead: "₹18 करोड़ के कैश व प्लेयर स्वैप के बाद दोनों फ्रेंचाइजी ने जारी किया आधिकारिक बयान।",
        image: "/images/hardik_arshdeep_trade.jpg",
        author: "आईपीएल डेस्क",
        date: "13 Nov 2026",
        paragraphs: [
          "मुंबई — आईपीएल गवर्निंग काउंसिल ने हार्दिक पंड्या और अर्शदीप सिंह के विनिमय को औपचारिक स्वीकृति प्रदान कर दी है।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-cpi-inflation-surge",
      category: "व्यापार / अर्थव्यवस्था",
      headline: "महंगाई की दोहरी मार: खुदरा मुद्रास्फीति बढ़कर 6.09% पर पहुंची, RBI की 6% की सुरक्षित सीमा पार",
      subhead: "सब्जियों और खाद्य तेलों की कीमतों में भारी उछाल से आम जनता की जेब ढीली; आगामी मौद्रिक समीक्षा में ब्याज दर कटौती की उम्मीदें धुंधली।",
      image: "/images/business-lead.jpg",
      author: "आर्थिक ब्यूरो / नई दिल्ली",
      date: "13 Nov 2026",
      paragraphs: [
        "नई दिल्ली — खुदरा महंगाई के 6.09% के स्तर पर पहुंचने से नीति निर्माताओं की चिंताएं बढ़ गई हैं। केंद्रीय बैंक के लिए यह आंकड़े असहज करने वाले हैं क्योंकि खाद्य मुद्रास्फीति दोहरे अंकों की ओर बढ़ रही है।",
        "घरेलू बजट बिगड़ने से आम परिवारों को दैनिक जरूरतों पर खर्च बढ़ाने के लिए विवश होना पड़ रहा है।"
      ]
    },
    subStories: [
      {
        id: "vyapar-nvidia-chip-rout",
        category: "व्यापार / तकनीक बाजार",
        headline: "एनवीडिया में नेतृत्व संकट के बाद वैश्विक चिप शेयरों में भारी बिकवाली; नैस्डैक और एशियाई टेक बाजारों में गिरावट",
        subhead: "जेनसन हुआंग के इस्तीफे के बाद कंपनी के मार्केट कैप में अरबों डॉलर की गिरावट; निवेशकों में घबराहट।",
        image: "/images/nvidia_huang.jpg",
        author: "वॉल स्ट्रीट डेस्क",
        date: "13 Nov 2026",
        paragraphs: [
          "सैन फ्रांसिस्को — चिप निर्माता एनवीडिया के शीर्ष नेतृत्व में बदलाव का असर पूरे एशियाई और यूरोपीय टेक बाजारों पर देखने को मिल रहा है।"
        ]
      },
      {
        id: "vyapar-dairy-price-impact",
        category: "व्यापार / उपभोक्ता",
        headline: "दूध की कीमतों में ₹2-4 की बढ़ोतरी के बाद रोजमर्रा के डेयरी उत्पादों और होटल-कैफे बिलों में इजाफा",
        subhead: "पनीर, मक्खन और मिठाइयों की उत्पादन लागत बढ़ी; हलवाई और रेस्तरां संघ ने दिए मूल्य संशोधन के संकेत।",
        image: "/images/desh-coins.jpg",
        author: "मार्केट रिपोर्टर",
        date: "13 Nov 2026",
        paragraphs: [
          "नई दिल्ली — अमूल और मदर डेयरी द्वारा तरल दूध के दाम बढ़ाए जाने के बाद खुदरा खाद्य व्यवसायों में भी लागत बढ़ने लगी है।"
        ]
      },
      {
        id: "vyapar-stock-market-fii-flows",
        category: "व्यापार / शेयर बाजार",
        headline: "भारतीय शेयर बाजार में उतार-चढ़ाव: विदेशी फंडों की चुनिंदा लिवाली, बैंकिंग शेयरों ने बाजार को संभाला",
        subhead: "सेंसेक्स 84,000 के स्तर पर संघर्षरत; वैश्विक टेक बिकवाली के बीच घरेलू वित्तीय शेयरों ने संभाला मोर्चा।",
        image: "/images/ipo-fraud.jpg",
        author: "दलाल स्ट्रीट ब्यूरो",
        date: "13 Nov 2026",
        paragraphs: [
          "मुंबई — वैश्विक बाजारों में जारी गिरावट के बावजूद घरेलू म्यूचुअल फंडों की लिवाली से भारतीय शेयर बाजार बड़े नुकसान से बच गया।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-nvidia-governance-ethics",
      category: "वैचारिकी / संपादकीय",
      headline: "शीर्ष तकनीकी नेतृत्व, नैतिकता और राष्ट्रीय सुरक्षा: एनवीडिया संकट से सिलिकॉन वैली और वैश्विक उद्योग के लिए चेतावनी",
      subhead: "कृत्रिम बुद्धिमत्ता के दौर में संवेदनशील तकनीकों की सुरक्षा और कॉर्पोरेट गवर्नेंस पर उठते गंभीर सवाल।",
      image: "/images/vaichariki-lead.jpg",
      author: "संपादकीय / तकनीक विश्लेषक",
      date: "13 Nov 2026",
      paragraphs: [
        "एनवीडिया के सह-संस्थापक जेनसन हुआंग का अचानक इस्तीफा केवल एक व्यक्ति का पतन नहीं है, बल्कि यह उन असीमित शक्तियों और जिम्मेदारियों की समीक्षा की मांग करता है जो दुनिया की शीर्ष तकनीकी कंपनियों के पास हैं।",
        "जब कोई कंपनी वैश्विक एआई ढांचे की रीढ़ बन जाती है, तो उसके नेतृत्व की निजी और व्यावसायिक ईमानदारी सीधे अंतरराष्ट्रीय सुरक्षा और भू-राजनीतिक संतुलन से जुड़ जाती है। यह घटनाक्रम सिद्ध करता है कि कोई भी व्यक्ति या प्रौद्योगिकी संस्थान कानूनी और नैतिक जवाबदेही से ऊपर नहीं हो सकता।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-delhi-air-crisis-solutions",
        category: "वैचारिकी / पर्यावरण विमर्श",
        headline: "प्रदूषण का स्थायी समाधान कब? जहरीली हवा और कागजी ग्रैप पाबंदियों के बीच पिसती आम जनता की व्यथा",
        subhead: "हर साल नवंबर में राजधानी गैस चेंबर बनती है, पर अंतर-राज्यीय समन्वय और ठोस नीति का अब भी अभाव।",
        image: "/images/delhi_aqi.jpg",
        author: "वरिष्ठ पर्यावरण विश्लेषक",
        date: "13 Nov 2026",
        paragraphs: [
          "नई दिल्ली — दिल्ली-एनसीआर की जहरीली हवा अब केवल मौसमी समस्या नहीं, बल्कि एक स्थायी स्वास्थ्य और आर्थिक त्रासदी बन चुकी है।"
        ]
      },
      {
        id: "vaichariki-wangchuk-ladakh-autonomy",
        category: "वैचारिकी / संवैधानिक अधिकार",
        headline: "सोनम वांगचुक और लद्दाख का संवैधानिक संघर्ष: स्थानीय स्वायत्तता और पर्यावरण सुरक्षा का सवाल",
        subhead: "छठी अनुसूची की मांग और हिमालयी पारिस्थितिकी तंत्र के संरक्षण के लिए उठती आवाजों की संवैधानिक पड़ताल।",
        image: "/images/trending-lead.jpg",
        author: "नीति एवं समाज विश्लेषक",
        date: "13 Nov 2026",
        paragraphs: [
          "लेह — लद्दाख की नाजुक पारिस्थितिकी और स्थानीय जनभावनाओं को समझे बिना थोपी जाने वाली नीतियां दीर्घकालिक असंतोष को जन्म दे सकती हैं।"
        ]
      },
      {
        id: "vaichariki-antalya-cop31-climate-finance",
        category: "वैचारिकी / वैश्विक मंच",
        headline: "अंताल्या COP31: क्या विकसित देश 1.5 डिग्री सेल्सियस के लक्ष्य को बचाने के लिए वित्तीय प्रतिबद्धता निभाएंगे?",
        subhead: "पर्यावरण संकट की सबसे भारी कीमत चुका रहे ग्लोबल साउथ के देशों के लिए न्यायसंगत वित्तपोषण की दरकार।",
        image: "/images/cop31_leaders.jpg",
        author: "अंतरराष्ट्रीय संबंध विशेषज्ञ",
        date: "13 Nov 2026",
        paragraphs: [
          "अंताल्या — भाषणों और वादों के दौर से आगे निकलकर अमीर देशों को अपनी ऐतिहासिक प्रदूषणकारी भूमिका के लिए भरपाई करनी ही होगी।"
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
                placeholder="ताज़ा ख़बरें खोजें (जैसे: एनवीडिया, प्रदूषण, कुलगाम, युवा ओलंपिक, जिब्रान)..."
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

      {/* ── BREAKING NEWS TICKER (Pure Hindi - 13 Nov 2026) ── */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 sm:py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A08] text-white px-2.5 py-0.5 rounded-sm font-bold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ताज़ा अपडेट
          </span>
          <div className="truncate text-stone-800 font-semibold">
            एनवीडिया सीईओ जेनसन हुआंग का तत्काल इस्तीफा • दिल्ली में AQI 488 के पार, जहरीले स्मॉग की चादर • डकार युवा ओलंपिक में मुक्केबाजी में भारत को 2 गोल्ड • अंडर-19 एशिया कप फाइनल में पहुंचा भारत • खुदरा महंगाई दर बढ़कर 6.09% पर पहुंची
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
                <span className="text-xs font-sans text-stone-500 font-medium">ख़बरगणित विशेष बुलेटिन</span>
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
            (Nvidia CEO Jensen Huang Resignation - News Pack 13 Nov 2026)
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
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (13 Nov 2026)
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
