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

// ── 1. HERO LEAD STORY: NEPAL PM BALENDRA SHAH INDIA VISIT (News Pack 23 Nov 2026) ──
const HERO_STORY: StoryItem = {
  id: "hero-nepal-pm-balendra-shah-india-visit",
  category: "देश / विदेश नीति",
  headline: "नेपाल के प्रधानमंत्री बालेन्द्र शाह की पहली आधिकारिक भारत यात्रा: पीएम मोदी से द्विपक्षीय शिखर वार्ता; ऊर्जा, कनेक्टिविटी और बुनियादी ढांचे पर ऐतिहासिक समझौते",
  subhead: "राष्ट्रपति भवन में भव्य औपचारिक स्वागत; हाइड्रोपावर ट्रांसमिशन, एकीकृत चेकपोस्ट और सीमा संपर्क परियोजनाओं का होगा संयुक्त उद्घाटन।",
  image: "/images/nepal_pm.jpg",
  author: "राजनयिक ब्यूरो / नई दिल्ली",
  date: "23 Nov 2026",
  paragraphs: [
    "नई दिल्ली — नेपाल के प्रधानमंत्री बालेन्द्र शाह अपने पहले आधिकारिक द्विपक्षीय दौरे पर नई दिल्ली पहुंचे हैं। प्रधानमंत्री नरेंद्र मोदी के निमंत्रण पर भारत आए बालेन्द्र शाह का राष्ट्रपति भवन के प्रांगण में औपचारिक और भव्य स्वागत किया गया, जहां उन्हें तीनों सेनाओं द्वारा गार्ड ऑफ ऑनर दिया गया।",
    "हैदराबाद हाउस में दोनों देशों के शीर्ष नेताओं के बीच आयोजित उच्चस्तरीय शिखर वार्ता में ऊर्जा सहयोग, क्रॉस-बॉर्डर रेलवे कनेक्टिविटी, व्यापार सुगमता, रक्षा साझेदारी और भूकंप पश्चात पुनर्निर्माण पर विस्तृत विचार-विमर्श हुआ। दोनों प्रधानमंत्रियों ने साझा हाइड्रोपावर ट्रांसमिशन लाइन और नए इंटीग्रेटेड चेकपोस्ट का संयुक्त रूप से उद्घाटन करने का निर्णय लिया है।",
    "प्रधानमंत्री मोदी ने कहा कि भारत और नेपाल के संबंध अनादि काल से सांस्कृतिक और ऐतिहासिक रूप से जुड़े हुए हैं और भारत नेपाल के समावेशी विकास व समृद्धि के लिए निरंतर प्रतिबद्ध है। वहीं नेपाली प्रधानमंत्री बालेन्द्र शाह ने विश्वास व्यक्त किया कि यह यात्रा दोनों पड़ोसी देशों के आर्थिक और जन-जन के संबंधों को नई ऊंचाई प्रदान करेगी।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 23 Nov 2026) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-cop31-climate-summit-fails",
    category: "अंतर्राष्ट्रीय / पर्यावरण",
    headline: "अंतालिया में संयुक्त राष्ट्र COP31 जलवायु शिखर सम्मेलन बिना किसी समझौते के समाप्त: 2009 के बाद सबसे बड़ी विफलता",
    subhead: "जीवाश्म ईंधन की चरणबद्ध विदाई पर मतभेद के चलते यूरोपीय संघ व अन्य देशों ने अंतिम मसौदा ठुकराया; रिकॉर्ड समय तक चली वार्ता बेनतीजा।",
    image: "/images/cop31.jpg",
    author: "रॉयटर्स / बीबीसी / अंतालिया",
    date: "23 Nov 2026",
    paragraphs: [
      "अंतालिया (तुर्की) — संयुक्त राष्ट्र जलवायु परिवर्तन शिखर सम्मेलन (COP31) बिना किसी साझा समझौते के अचानक समाप्त हो गया है। कोपेनहेगन (2009) के बाद वैश्विक जलवायु कूटनीति के इतिहास में यह अब तक की सबसे बड़ी विफलता मानी जा रही है।",
      "सम्मेलन का अंतिम मसौदा निर्धारित समय से दो दिन अधिक की मैराथन वार्ता के बाद प्रस्तुत किया गया था, परंतु इसमें कोयला, तेल और गैस जैसे जीवाश्म ईंधनों की विदाई (fossil fuel phase-out) का कोई स्पष्ट उल्लेख न होने के कारण यूरोपीय संघ और छोटे द्वीपीय राष्ट्रों के समूह ने इसे सीधे खारिज कर दिया।"
    ]
  },
  {
    id: "top-ind-nz-wellington-test-draw",
    category: "खेल / टेस्ट क्रिकेट",
    headline: "वेलिंगटन टेस्ट में भारत की जीत से चूका न्यूजीलैंड: डेरिल मिचेल और ग्लेन फिलिप्स ने अंतिम दिन मैच कराया ड्रॉ; भारत ने बनाया था 720/9 का रिकॉर्ड स्कोर",
    subhead: "ऋषभ पंत के शानदार शतक और पहली पारी में कीवी धरती पर सबसे बड़े स्कोर के बावजूद बेसिन रिजर्व पर मैच अनिर्णीत; श्रृंखला का दूसरा टेस्ट क्राइस्टचर्च में।",
    image: "/images/ind_nz_test.jpg",
    author: "इंडिया टुडे / एपी / वेलिंगटन",
    date: "23 Nov 2026",
    paragraphs: [
      "वेलिंगटन — भारत और न्यूजीलैंड के बीच बेसिन रिजर्व मैदान पर खेला गया पहला टेस्ट मैच बेहद रोमांचक संघर्ष के बाद ड्रॉ पर समाप्त हुआ। भारतीय टीम ने पहली पारी में 720/9 का विशाल स्कोर घोषित किया था, जो न्यूजीलैंड की धरती पर किसी भी विदेशी टीम का सर्वोच्च टेस्ट स्कोर है।",
      "अंतिम दिन न्यूजीलैंड की टीम पर पारी की हार का खतरा मंडरा रहा था, लेकिन डेरिल मिचेल और ग्लेन फिलिप्स ने धैर्यपूर्ण बल्लेबाजी करते हुए पूरे दिन विकेट बचाए रखा और भारत को जीत दर्ज करने से रोक दिया। भारतीय विकेटकीपर बल्लेबाज ऋषभ पंत को उनकी शतकीय पारी के लिए विशेष सराहना मिली।"
    ]
  },
  {
    id: "top-india-china-arunachal-lac-talks",
    category: "देश / रक्षा एवं सीमा सुरक्षा",
    headline: "अरुणाचल प्रदेश में वास्तविक नियंत्रण रेखा (LAC) पर भारत-चीन कोर कमांडर वार्ता संपन्न: सर्दियों से पूर्व शांति और टकराव टालने पर बनी सहमति",
    subhead: "कड़ाके की ठंड और भारी बर्फबारी से पहले अग्रिम चौकियों पर शांति बनाए रखने और गश्ती व्यवस्था को सुगम बनाने के लिए सैन्य कमांडरों ने बनाई कार्ययोजना।",
    image: "/images/pib-defense-sahyadri.jpg",
    author: "रक्षा संवाददाता / ईटानगर",
    date: "23 Nov 2026",
    paragraphs: [
      "ईटानगर — पूर्वी क्षेत्र में वास्तविक नियंत्रण रेखा (LAC) पर शांति और स्थिरता सुनिश्चित करने के लिए भारत और चीन के सैन्य कमांडरों के बीच दूसरे दौर की उच्चस्तरीय कोर कमांडर वार्ता सफलतापूर्वक संपन्न हुई है।",
      "सैन्य अधिकारियों के अनुसार, यह वार्ता अरुणाचल सीमावर्ती क्षेत्रों में तनाव घटाने और आने वाली सर्दियों के दौरान दोनों सेनाओं के बीच किसी भी प्रकार के गतिरोध या घर्षण को रोकने पर केंद्रित थी। दोनों पक्षों ने विश्वास बहाली उपायों और मौजूदा द्विपक्षीय समझौतों के तहत जमीनी स्तर पर संयम बरतने पर सहमति व्यक्त की।"
    ]
  },
  {
    id: "top-ukraine-drone-strike-russian-warship-benghazi",
    category: "अंतर्राष्ट्रीय / भूमध्य सागर संघर्ष",
    headline: "लीबिया के बेंगाजी बंदरगाह पर बड़ा हमला: संदिग्ध यूक्रेनी समुद्री ड्रोनों ने रूसी युद्धपोत 'मर्करी' को पहुंचाया भारी नुकसान",
    subhead: "रूसी नौसेना के कॉर्वेट में लगी भीषण आग; लीबियाई बंदरगाह अधिकारियों ने नौसैनिक अड्डे पर हुए अप्रत्याशित ड्रोन स्ट्राइक की पुष्टि की।",
    image: "/images/world-lead.jpg",
    author: "वैश्विक सुरक्षा डेस्क / त्रिपोली",
    date: "23 Nov 2026",
    paragraphs: [
      "बेंगाजी (लीबिया) — लीबिया के बेंगाजी नौसैनिक अड्डे पर तैनात रूसी नौसेना के उन्नत कॉर्वेट 'मर्करी' (Merkury) पर समुद्र से संचालित विस्फोटक ड्रोनों (Sea Drones) द्वारा भीषण हमला किया गया है।",
      "लीबियाई अधिकारियों ने पुष्टि की है कि हमले के बाद युद्धपोत में भयंकर आग लग गई और उसे गहरा संरचनात्मक नुकसान पहुंचा है। सुरक्षा विश्लेषकों का मानना है कि यह हमला यूक्रेनी विशेष बलों द्वारा संचालित किया गया, जिसने काले सागर से बाहर निकलकर भूमध्य सागर में रूसी नौसैनिक ठिकानों को पहली बार सीधे निशाने पर लिया है।"
    ]
  },
  {
    id: "top-democrats-us-house-majority-historic",
    category: "अंतर्राष्ट्रीय / अमेरिकी राजनीति",
    headline: "अमेरिकी संसद में डेमोक्रेट्स की ऐतिहासिक जीत: 1992 के बाद पहली बार हाउस ऑफ रिप्रेजेंटेटिव्स में 258 सीटों का भारी बहुमत",
    subhead: "नॉर्थ कैरोलिना में दोबारा मतगणना के बाद डेमोक्रेटिक पार्टी ने हासिल की निर्णायक बढ़त; मध्यावधि चुनावों में राष्ट्रपति की नीतियों को मिला कड़ा जनादेश।",
    image: "/images/trending-lead.jpg",
    author: "वॉशिंगटन ब्यूरो / यूएसए",
    date: "23 Nov 2026",
    paragraphs: [
      "वॉशिंगटन — अमेरिकी कांग्रेस के निचले सदन (हाउस ऑफ रिप्रेजेंटेटिव्स) में डेमोक्रेटिक पार्टी ने ऐतिहासिक जीत दर्ज करते हुए कम से कम 258 सीटों पर विजय प्राप्त कर ली है। यह 1992 के बाद किसी भी पार्टी का सदन में सबसे बड़ा बहुमत है।",
      "नॉर्थ कैरोलिना की विवादित सीटों पर पुनर्गणना पूरी होने के बाद आधिकारिक परिणाम जारी किए गए। सदन में इस भारी बहुमत के बाद अब संसद में विधायी प्रक्रियाओं और सरकारी नीतियों के नियमन में डेमोक्रेट्स का निर्णायक नियंत्रण स्थापित हो गया है।"
    ]
  },
  {
    id: "top-asia-power-index-india-third-spot",
    category: "वैश्विक रैंकिंग / भू-राजनीति",
    headline: "एशिया पावर इंडेक्स 2026: भारत ने दुनिया में बरकरार रखी तीसरी महाशक्ति की स्थिति; चीन के साथ अंतर रिकॉर्ड निचले स्तर पर",
    subhead: "लोवी इंस्टीट्यूट की वार्षिक रिपोर्ट: आर्थिक लचीलेपन, सैन्य आधुनिकीकरण और क्षेत्रीय कूटनीतिक प्रभाव के दम पर भारत ने स्थापित किया मजबूत स्थान।",
    image: "/images/pib-cabinet-national.jpg",
    author: "राजनयिक व आर्थिक विश्लेषक",
    date: "23 Nov 2026",
    paragraphs: [
      "सिडनी — प्रतिष्ठित वैश्विक थिंक टैंक लोवी इंस्टीट्यूट द्वारा जारी 'एशिया पावर इंडेक्स 2026' में भारत ने एशिया-प्रशांत क्षेत्र में संयुक्त राज्य अमेरिका और चीन के बाद अपनी तीसरी सबसे शक्तिशाली राष्ट्र की स्थिति को मजबूती से बरकरार रखा है।",
      "रिपोर्ट में रेखांकित किया गया है कि भारत और चीन के बीच व्यापक राष्ट्रीय शक्ति (सीएनपी) का अंतर अब तक के सबसे निचले स्तर पर आ गया है। भारत के बढ़ते विनिर्माण क्षेत्र, युवा जनसांख्यिकीय लाभ और वैश्विक आपूर्ति श्रृंखला में महत्वपूर्ण भूमिका ने देश की वैश्विक रैंकिंग को नई मजबूती दी है।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-nepal-pm-visit",
      category: "देश / कूटनीति",
      headline: "नेपाल के प्रधानमंत्री बालेन्द्र शाह की पहली आधिकारिक भारत यात्रा: पीएम मोदी से द्विपक्षीय शिखर वार्ता",
      subhead: "ऊर्जा ट्रांसमिशन लाइन, व्यापार सुगमता और बुनियादी ढांचा परियोजनाओं का संयुक्त उद्घाटन; राष्ट्रपति भवन में औपचारिक स्वागत।",
      image: "/images/nepal_pm.jpg",
      author: "राजनयिक ब्यूरो / नई दिल्ली",
      date: "23 Nov 2026",
      paragraphs: [
        "नई दिल्ली — नेपाल के प्रधानमंत्री बालेन्द्र शाह की भारत यात्रा से दोनों देशों के रिश्तों में नए युग की शुरुआत हुई है। दोनों नेताओं ने ऊर्जा, डिजिटल भुगतान और रेल संपर्क के विस्तार पर कई महत्वपूर्ण द्विपक्षीय समझौतों पर हस्ताक्षर किए हैं।",
        "प्रधानमंत्री नरेंद्र मोदी ने कहा कि भारत 'नेबरहुड फर्स्ट' नीति के तहत नेपाल के साथ अपने संबंधों को सर्वोच्च प्राथमिकता देता है।"
      ]
    },
    subStories: [
      {
        id: "desh-india-china-arunachal-lac",
        category: "देश / रक्षा",
        headline: "अरुणाचल में एलएसी पर भारत-चीन कोर कमांडर स्तर की वार्ता संपन्न; सर्दियों में शांति बनाए रखने पर बनी सहमति",
        subhead: "पूर्वी सेक्टर में गश्ती व्यवस्था को सुगम बनाने और अग्रिम चौकियों पर टकराव टालने के लिए दोनों सेनाओं के बीच अहम चर्चा।",
        image: "/images/pib-defense-sahyadri.jpg",
        author: "रक्षा ब्यूरो",
        date: "23 Nov 2026",
        paragraphs: [
          "ईटानगर — भारतीय और चीनी सेनाओं के कोर कमांडरों के बीच अरुणाचल सीमा पर द्विपक्षीय बैठक हुई, जिसमें सर्दियों से पहले शांति बनाए रखने पर सहमति बनी।"
        ]
      },
      {
        id: "desh-amit-shah-vibrant-villages-arunachal",
        category: "देश / सीमा विकास",
        headline: "अमित शाह बोले- जीवंत ग्राम कार्यक्रम से अरुणाचल के 40 सीमावर्ती गांवों में शुरू हुआ 'रिवर्स माइग्रेशन'",
        subhead: "गृह मंत्री ने कहा: पलायन कर चुके ग्रामीण दोबारा अपने पैतृक गांवों में लौट रहे हैं; सीमावर्ती क्षेत्रों का समग्र विकास केंद्र की शीर्ष प्राथमिकता।",
        image: "/images/delhi_aqi.jpg",
        author: "विशेष संवाददाता",
        date: "23 Nov 2026",
        paragraphs: [
          "नई दिल्ली — केंद्रीय गृह मंत्री ने कहा कि वाइब्रेंट विलेज प्रोग्राम (VVP) के तहत सड़क, बिजली और 4जी कनेक्टिविटी पहुंचने से सीमावर्ती गांवों का कायाकल्प हो रहा है।"
        ]
      },
      {
        id: "desh-fssai-bisleri-bromate-prosecution",
        category: "देश / उपभोक्ता सुरक्षा",
        headline: "बोतलबंद पानी के सैंपल में तय सीमा से अधिक ब्रोमेट पाए जाने पर बिस्लेरी पर FSSAI की कार्रवाई; कंपनी ने कहा- उत्पाद पूरी तरह सुरक्षित",
        subhead: "खाद्य सुरक्षा नियामक ने मुकदमा चलाने की दी मंजूरी; कंपनी का दावा- गुणवत्ता और जनस्वास्थ्य मानकों का शत-प्रतिशत पालन।",
        image: "/images/desh-coins.jpg",
        author: "उपभोक्ता डेस्क",
        date: "23 Nov 2026",
        paragraphs: [
          "नई दिल्ली — एफएसएसएआई ने बोतलबंद पेयजल के नमूनों की जांच के बाद नियमों के उल्लंघन पर विधिक कार्रवाई शुरू की है।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-cop31-climate-summit-fails",
      category: "विदेश / पर्यावरण",
      headline: "अंतालिया में संयुक्त राष्ट्र COP31 जलवायु शिखर सम्मेलन बिना किसी समझौते के समाप्त: 2009 के बाद सबसे बड़ी विफलता",
      subhead: "जीवाश्म ईंधन की विदाई पर गतिरोध; यूरोपीय संघ और द्वीपीय देशों ने अंतिम पाठ को खारिज किया।",
      image: "/images/cop31.jpg",
      author: "अंतरराष्ट्रीय डेस्क / अंतालिया",
      date: "23 Nov 2026",
      paragraphs: [
        "अंतालिया — वैश्विक जलवायु वार्ता में ऐतिहासिक गतिरोध उत्पन्न हो गया है। तुर्की के अंतालिया में आयोजित संयुक्त राष्ट्र जलवायु सम्मेलन बिना किसी सहमति के समाप्त हो गया।",
        "पर्यावरण समूहों और विकासशील देशों ने समृद्ध राष्ट्रों पर उत्सर्जन कटौती और जलवायु वित्त पोषण के वादों से पीछे हटने का आरोप लगाया है।"
      ]
    },
    subStories: [
      {
        id: "videsh-ukraine-sea-drone-benghazi-warship",
        category: "विदेश / सैन्य संघर्ष",
        headline: "लीबिया के बेंगाजी बंदरगाह पर बड़ा हमला: संदिग्ध यूक्रेनी ड्रोनों ने रूसी युद्धपोत 'मर्करी' को पहुंचाया भारी नुकसान",
        subhead: "भूमध्य सागर में रूसी नौसेना के कॉर्वेट पर समुद्र से संचालित ड्रोनों द्वारा भीषण प्रहार।",
        image: "/images/world-lead.jpg",
        author: "यूरोप ब्यूरो",
        date: "23 Nov 2026",
        paragraphs: [
          "बेंगाजी — भूमध्य सागर के तट पर स्थित लीबियाई नौसैनिक अड्डे पर हुए इस हमले ने अंतरराष्ट्रीय रक्षा हलकों में सनसनी पैदा कर दी है।"
        ]
      },
      {
        id: "videsh-democrats-us-house-majority-258",
        category: "विदेश / अमेरिकी संसद",
        headline: "अमेरिकी संसद में डेमोक्रेट्स की ऐतिहासिक बढ़त: हाउस में 258 सीटों के साथ 1992 के बाद का सबसे बड़ा बहुमत",
        subhead: "नॉर्थ कैरोलिना में दोबारा मतगणना के बाद सदन में डेमोक्रेटिक पार्टी का दबदबा स्थापित।",
        image: "/images/trending-lead.jpg",
        author: "वॉशिंगटन संवाददाता",
        date: "23 Nov 2026",
        paragraphs: [
          "वॉशिंगटन — अमेरिकी मध्यावधि चुनावों के अंतिम परिणामों से निचले सदन में शक्ति संतुलन डेमोक्रेट्स के पक्ष में झुक गया है।"
        ]
      },
      {
        id: "videsh-israel-netanyahu-eisenkot-coalition-fails",
        category: "विदेश / मध्य पूर्व",
        headline: "इजरायल में नई सरकार के गठन पर गतिरोध बरकरार: नेतन्याहू और आइसेनकोट दलों के बीच गठबंधन वार्ता विफल",
        subhead: "कार्यवाहक प्रधानमंत्री नेतन्याहू और विपक्षी गुट के बीच किसी साझा न्यूनतम कार्यक्रम पर नहीं बन सकी सहमति।",
        image: "/images/highcourt-fatwa.jpg",
        author: "पश्चिम एशिया डेस्क",
        date: "23 Nov 2026",
        paragraphs: [
          "यरूशलम — इजरायल में लंबे समय से चल रही राजनीतिक अनिश्चितता के बीच गठबंधन वार्ताओं के असफल होने से पुनः मध्यावधि चुनावों के आसार हैं।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-ind-nz-wellington-test-draw",
      category: "खेल / टेस्ट क्रिकेट",
      headline: "वेलिंगटन टेस्ट में भारत की जीत से चूका न्यूजीलैंड: डेरिल मिचेल और फिलिप्स ने मैच कराया ड्रॉ; भारत ने बनाया था 720/9 का विशाल स्कोर",
      subhead: "ऋषभ पंत के शानदार शतक और पहली पारी में रिकॉर्ड स्कोर के बावजूद अंतिम दिन मैच अनिर्णीत; दूसरा टेस्ट क्राइस्टचर्च में।",
      image: "/images/ind_nz_test.jpg",
      author: "स्पोर्ट्स डेस्क / वेलिंगटन",
      date: "23 Nov 2026",
      paragraphs: [
        "वेलिंगटन — बेसिन रिजर्व में खेले गए पहले टेस्ट मैच के पांचवें और अंतिम दिन न्यूजीलैंड के बल्लेबाजों ने जुझारूपन का परिचय देते हुए भारतीय गेंदबाजी आक्रमण को रोके रखा।",
        "भारत के 720/9 के विशाल स्कोर के जवाब में न्यूजीलैंड की दूसरी पारी में मिचेल और फिलिप्स ने अटूट साझेदारी कर मुकाबला बराबरी पर समाप्त कराया।"
      ]
    },
    subStories: [
      {
        id: "khel-india-women-hockey-thailand-7-0",
        category: "खेल / महिला हॉकी",
        headline: "महिला एशियाई चैंपियंस ट्रॉफी में भारत का जलवा: थाईलैंड को 7-0 से रौंदकर लगातार तीसरी जीत दर्ज की, तालिका में शीर्ष पर",
        subhead: "स्टार फॉरवर्ड दीपिका ने दागी शानदार हैट्रिक; भारतीय महिला हॉकी टीम पूरे टूर्नामेंट में अब तक अपराजित।",
        image: "/images/pib-asian-para-games.jpg",
        author: "हॉकी संवाददाता",
        date: "23 Nov 2026",
        paragraphs: [
          "रांची — भारतीय महिला हॉकी टीम ने एशियाई चैंपियंस ट्रॉफी में अपना दबदबा कायम रखते हुए थाईलैंड को एकतरफा मुकाबले में 7-0 से पराजित किया।"
        ]
      },
      {
        id: "khel-pakistan-a-beat-india-a-rising-stars",
        category: "खेल / राइजिंग स्टार्स एशिया कप",
        headline: "राइजिंग स्टार्स एशिया कप: पाकिस्तान 'ए' ने भारत 'ए' को 48 रनों से हराया; तिलक वर्मा का जुझारू शतक भी नहीं दिला सका जीत",
        subhead: "पाकिस्तान के 314 रनों के लक्ष्य का पीछा करते हुए भारतीय 'ए' टीम 265 रनों पर सिमटी; तिलक वर्मा ने बनाए 112 रन।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "क्रिकेट डेस्क",
        date: "23 Nov 2026",
        paragraphs: [
          "दोहा — रोमांचक मुकाबले में भारतीय युवा टीम लक्ष्य से 48 रन पीछे रह गई, हालांकि कप्तान तिलक वर्मा की जुझारू पारी ने दर्शकों का दिल जीत लिया।"
        ]
      },
      {
        id: "khel-asia-power-index-sports-ecosystem",
        category: "खेल / खेल नीति",
        headline: "एशिया पावर इंडेक्स 2026 में भारत के खेल बुनियादी ढांचे की सराहना: ओलंपिक 2036 की दावेदारी को मिला बल",
        subhead: "देश में विश्वस्तरीय स्टेडियमों के विकास और राष्ट्रीय खेल प्रतिभा खोज कार्यक्रम से भारत की खेल शक्ति में व्यापक वृद्धि।",
        image: "/images/sports-lead.jpg",
        author: "स्पोर्ट्स रिपोर्टर",
        date: "23 Nov 2026",
        paragraphs: [
          "नई दिल्ली — अंतरराष्ट्रीय रिपोर्ट में भारत के उभरते हुए खेल पारिस्थितिकी तंत्र और युवा एथलीटों के प्रदर्शन को सराहा गया है।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-fssai-packaged-water-bisleri-compliance",
      category: "व्यापार / उपभोक्ता उद्योग",
      headline: "बोतलबंद पानी की गुणवत्ता पर एफएसएसएआई की सख्त कार्रवाई: ब्रोमेट सीमा को लेकर कंपनियों पर निगरानी तेज; बिस्लेरी का स्पष्टीकरण",
      subhead: "खाद्य नियामक द्वारा मुकदमा चलाने की अनुमति के बाद पेय उद्योग में हड़कंप; कंपनियों ने गुणवत्ता प्रमाणन प्रस्तुत किए।",
      image: "/images/desh-coins.jpg",
      author: "मार्केट डेस्क / नई दिल्ली",
      date: "23 Nov 2026",
      paragraphs: [
        "नई दिल्ली — भारतीय खाद्य सुरक्षा और मानक प्राधिकरण (FSSAI) ने पैकेज्ड ड्रिंक वाटर उद्योग में सुरक्षा मानकों के उल्लंघन पर कड़ा रुख अख्तियार किया है।",
        "बिस्लेरी प्रबंधन ने अपने बयान में कहा है कि उनके सभी संयंत्रों में पानी की शुद्धता और खनिज संतुलन के लिए बहु-स्तरीय परीक्षण किए जाते हैं और उत्पाद पूरी तरह मानकों के अनुरूप हैं।"
      ]
    },
    subStories: [
      {
        id: "vyapar-india-nepal-power-trade-infra-deal",
        category: "व्यापार / ऊर्जा एवं बुनियादी ढांचा",
        headline: "भारत-नेपाल बिजली व्यापार और बुनियादी ढांचा समझौते: ₹15,000 करोड़ के द्विपक्षीय ऊर्जा गलियारे का मार्ग प्रशस्त",
        subhead: "नेपाली जलविद्युत के भारतीय ग्रिड में आयात और बिहार-नेपाल सीमा पर क्रॉस-बॉर्डर ट्रांसमिशन को मिली मंजूरी।",
        image: "/images/nepal_pm_visit.jpg",
        author: "एनर्जी ब्यूरो",
        date: "23 Nov 2026",
        paragraphs: [
          "काठमांडू/नई दिल्ली — दोनों देशों के बीच हुए समझौते से दक्षिण एशिया में हरित ऊर्जा के सीमा-पार आदान-प्रदान को बड़ा प्रोत्साहन मिलेगा।"
        ]
      },
      {
        id: "vyapar-cop31-failure-carbon-markets-impact",
        category: "व्यापार / कार्बन बाजार",
        headline: "COP31 जलवायु समझौते की विफलता से वैश्विक कार्बन क्रेडिट बाजार में गिरावट; ग्रीन बॉन्ड यील्ड में उतार-चढ़ाव",
        subhead: "जीवाश्म ईंधन पर आम सहमति न बन पाने से अंतरराष्ट्रीय जलवायु वित्त पोषण और ईएसजी फंड्स में असमंजस।",
        image: "/images/cop31.jpg",
        author: "फाइनेंशियल रिपोर्टर",
        date: "23 Nov 2026",
        paragraphs: [
          "लंदन — अंतालिया शिखर सम्मेलन के बेनतीजा समाप्त होने से कार्बन क्रेडिट ट्रेडिंग और अंतरराष्ट्रीय हरित परियोजनाओं के वित्त पोषण पर अनिश्चितता के बादल छा गए हैं।"
        ]
      },
      {
        id: "vyapar-asia-power-index-india-economic-growth",
        category: "व्यापार / अर्थव्यवस्था",
        headline: "एशिया पावर इंडेक्स 2026: भारत का आर्थिक लचीलापन बना वैश्विक आकर्षण; विनिर्माण और निवेश में चीन से घटा अंतर",
        subhead: "वैश्विक मंदी के दौर में भारतीय अर्थव्यवस्था की मजबूत विकास दर से विदेशी संस्थागत निवेशकों का भरोसा बढ़ा।",
        image: "/images/ipo-scam.jpg",
        author: "आर्थिक विश्लेषक",
        date: "23 Nov 2026",
        paragraphs: [
          "मुंबई — इंडेक्स के आर्थिक स्तंभ में भारत की रेटिंग में सुधार हुआ है, जो देश में जारी पूंजीगत व्यय और नीतिगत स्थिरता का प्रमाण है।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-cop31-failure-climate-justice",
      category: "वैचारिकी / जलवायु नीति",
      headline: "COP31 की ऐतिहासिक विफलता और जलवायु न्याय का सवाल: क्या समृद्ध देश अपनी ऐतिहासिक जवाबदेही से मुंह मोड़ रहे हैं?",
      subhead: "अंतालिया सम्मेलन का बेनतीजा अंत यह साबित करता है कि जब तक विकसित देश विकासशील दुनिया को वित्तीय क्षतिपूर्ति नहीं देंगे, तब तक पर्यावरण रक्षा का संकल्प अधूरा रहेगा।",
      image: "/images/cop31.jpg",
      author: "संपादकीय / पर्यावरण नीति शोधकर्ता",
      date: "23 Nov 2026",
      paragraphs: [
        "तुर्की के अंतालिया में संयुक्त राष्ट्र जलवायु सम्मेलन (COP31) का बिना किसी समझौते के बिखर जाना केवल एक कूटनीतिक असफलता नहीं है, बल्कि यह उस धरती के भविष्य के साथ विश्वासघात है जो अभूतपूर्व गर्मी, चक्रवातों और ग्लेशियरों के पिघलने की विभीषिका झेल रही है। कोपेनहेगन 2009 के बाद यह पहली बार है जब कोई सीओपी बिना किसी संयुक्त घोषणापत्र के समाप्त हुआ।",
        "इस विफलता की जड़ में विकसित और विकासशील राष्ट्रों के बीच की खाई है। ऐतिहासिक रूप से ग्रीनहाउस गैसों के 70% से अधिक उत्सर्जन के लिए जिम्मेदार पश्चिमी देश आज विकासशील देशों पर जीवाश्म ईंधनों की त्वरित विदाई का दबाव बना रहे हैं, लेकिन स्वच्छ ऊर्जा संक्रमण के लिए आवश्यक वित्तीय सहायता और तकनीक हस्तांतरण पर उनके हाथ बंधे हैं। जब तक समानता और साझी परंतु विभेदित जिम्मेदारियों (CBDR) के सिद्धांत को ईमानदारी से लागू नहीं किया जाता, तब तक ऐसे वैश्विक सम्मेलनों से कोई सार्थक राह नहीं निकल सकती।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-india-nepal-bilateral-strategic-depth",
        category: "वैचारिकी / पड़ोस प्रथम नीति",
        headline: "भारत-नेपाल संबंध: बालेन्द्र शाह की यात्रा और हिमालयी क्षेत्र में सांस्कृतिक व रणनीतिक साझेदारी का नया अध्याय",
        subhead: "रोटी-बेटी के सांस्कृतिक रिश्तों से आगे बढ़कर आधुनिक हाइड्रोइलेक्ट्रिक ग्रिड, डिजिटल व्यापार और युवा आकांक्षाओं का समन्वय।",
        image: "/images/nepal_pm.jpg",
        author: "रणनीतिक विश्लेषक",
        date: "23 Nov 2026",
        paragraphs: [
          "काठमांडू के पूर्व मेयर और अब नेपाल के युवा प्रधानमंत्री बालेन्द्र शाह की भारत यात्रा दोनों देशों के द्विपक्षीय संबंधों में व्यावहारिक और परिणामोन्मुखी कूटनीति के एक नए दौर का संकेत है।"
        ]
      },
      {
        id: "vaichariki-vibrant-villages-border-security-migration",
        category: "वैचारिकी / राष्ट्रीय सुरक्षा",
        headline: "अरुणाचल सीमा और जीवंत ग्राम योजना: सीमांत गांवों में रिवर्स माइग्रेशन से कैसे मजबूत हो रही भारत की संप्रभुता",
        subhead: "खाली होते सीमावर्ती गांवों को आबाद करना देश की पहली रक्षा पंक्ति को सशक्त करने का सबसे प्रभावी और टिकाऊ कदम है।",
        image: "/images/pib-defense-sahyadri.jpg",
        author: "सीमा सुरक्षा विशेषज्ञ",
        date: "23 Nov 2026",
        paragraphs: [
          "अरुणाचल प्रदेश के 40 सीमावर्ती गांवों में ग्रामीणों का अपने पैतृक घरों में लौटना दर्शाता है कि यदि बुनियादी सुविधाएं पहुंचे तो देश की सीमाएं अपने नागरिकों के विश्वास से अभेद्य बन जाती हैं।"
        ]
      },
      {
        id: "vaichariki-test-cricket-wellington-thriller-endurance",
        category: "वैचारिकी / खेल संस्कृति",
        headline: "टेस्ट क्रिकेट की अमर खूबसूरती: वेलिंगटन में 720 रनों के पहाड़ के बावजूद अंतिम दिन का सस्पेंस और लाल गेंद की गरिमा",
        subhead: "पांच दिन और 450 ओवरों के महायुद्ध के बाद भी जब परिणाम अनिर्णीत रहता है, तब टेस्ट क्रिकेट का चरित्र और खिलाड़ियों का धैर्य ही खेल का असली विजेता बनता है।",
        image: "/images/ind_nz_test.jpg",
        author: "वरिष्ठ खेल समीक्षक",
        date: "23 Nov 2026",
        paragraphs: [
          "टी-20 के इस तेज रफ्तार युग में वेलिंगटन टेस्ट ने एक बार फिर साबित किया कि पांच दिनों तक अपनी सीमाओं को चुनौती देना ही खेल की सर्वोच्च परीक्षा है। भारत का विशाल स्कोर और न्यूजीलैंड का अंतिम दिन का जुझारूपन टेस्ट क्रिकेट के अनमोल रत्न हैं।"
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
                placeholder="ताज़ा ख़बरें खोजें (जैसे: कुलगाम, धोनी, चक्रवात अकवन, जेनसन हुआंग, सैफ)..."
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

      {/* ── BREAKING NEWS TICKER (Pure Hindi - 23 Nov 2026) ── */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 sm:py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A08] text-white px-2.5 py-0.5 rounded-sm font-bold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ताज़ा अपडेट
          </span>
          <div className="truncate text-stone-800 font-semibold">
            नेपाल के पीएम बालेन्द्र शाह नई दिल्ली पहुंचे, पीएम मोदी से शिखर वार्ता • अंतालिया में COP31 जलवायु शिखर सम्मेलन बिना समझौते के समाप्त • वेलिंगटन टेस्ट: भारत के 720 रनों के बाद न्यूजीलैंड ने पांचवें दिन मैच कराया ड्रॉ • अरुणाचल LAC पर भारत-चीन कोर कमांडर वार्ता संपन्न, सर्दियों से पहले शांति पर सहमति • लीबिया के बेंगाजी बंदरगाह पर ड्रोन हमले में रूसी युद्धपोत क्षतिग्रस्त • महिला एशियाई चैंपियंस ट्रॉफी हॉकी: भारत ने थाईलैंड को 7-0 से रौंदा
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
            (Nepal PM Balendra Shah India Visit - 23 Nov 2026)
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
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (23 Nov 2026)
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
