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

// ── 1. HERO LEAD STORY: INDIA-NEPAL SUMMIT & AYODHYA-JANAKPUR EXPRESS (News Pack 24 Nov 2026) ──
const HERO_STORY: StoryItem = {
  id: "hero-india-nepal-ayodhya-janakpur-express",
  category: "देश / विदेश नीति एवं संपर्क",
  headline: "भारत-नेपाल संबंधों में नया स्वर्णिम अध्याय: पीएम मोदी और बालेन्द्र शाह ने दिखाई अयोध्या-जनकपुर 'सरयू-कमला एक्सप्रेस' को हरी झंडी; ₹15,000 करोड़ का महा-पैकेज और IIT कैंपस का ऐलान",
  subhead: "बाढ़ प्रभावित नेपाल के पुनर्निर्माण के लिए $1.62 अरब की सहायता; 8 ऐतिहासिक समझौतों पर हस्ताक्षर, सांस्कृतिक और डिजिटल कनेक्टिविटी को नई उड़ान।",
  image: "/images/india_nepal.jpg",
  author: "विशेष राजनयिक ब्यूरो / नई दिल्ली",
  date: "24 Nov 2026",
  paragraphs: [
    "नई दिल्ली — भारत और नेपाल के प्राचीन सांस्कृतिक और जन-जन के संबंधों को नई ऊंचाई देते हुए प्रधानमंत्री नरेंद्र मोदी और नेपाल के प्रधानमंत्री बालेन्द्र शाह ने संयुक्त रूप से अयोध्या से जनकपुर को जोड़ने वाली 'सरयू-कमला एक्सप्रेस' ट्रेन को हरी झंडी दिखाकर रवाना किया। यह ऐतिहासिक रेल सेवा भगवान राम की जन्मस्थली अयोध्या धाम और माता सीता के मायके जनकपुर को सीधी रेल कनेक्टिविटी से जोड़ेगी।",
    "हैदराबाद हाउस में आयोजित शिखर वार्ता के दौरान प्रधानमंत्री मोदी ने हालिया भीषण बाढ़ से प्रभावित नेपाल के पुनर्निर्माण और अधोसंरचना विकास के लिए लगभग ₹15,000 करोड़ ($1.62 अरब) के व्यापक विकास पैकेज की घोषणा की। इसके साथ ही दोनों देशों ने नेपाल में भारत के प्रतिष्ठित भारतीय प्रौद्योगिकी संस्थान (IIT) का पहला विदेशी ऑफशोर कैंपस स्थापित करने सहित 8 महत्वपूर्ण समझौता ज्ञापनों (MoUs) पर हस्ताक्षर किए।",
    "नेपाल के प्रधानमंत्री बालेन्द्र शाह ने भारत सरकार के उदार सहयोग और बंधुत्व की सराहना करते हुए कहा कि यह यात्रा दोनों पड़ोसी देशों के बीच ऊर्जा ग्रिड, रेलवे लाइन, सीमा शुल्क सुगमता और डिजिटल भुगतान को नया आयाम देगी। दोनों नेताओं ने शांति, संप्रभुता और साझा समृद्धि के संकल्प को दोहराया।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 24 Nov 2026) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-thirupparankundram-karthigai-deepam-security",
    category: "देश / कानून एवं व्यवस्था",
    headline: "मदुरै के तिरुप्परनकुंद्रम में अभूतपूर्व सुरक्षा घेरा: 5,600 पुलिसकर्मी तैनात, ड्रोन पर प्रतिबंध; दीपाथून पर दीप प्रज्वलन की सुप्रीम कोर्ट की अनुमति",
    subhead: "विवादित पत्थर के खंभे पर सदियों पुरानी परंपरा के तहत दीप जलाने का आदेश; तमिलनाडु सरकार ने पुनर्विचार याचिका दाखिल की, पहाड़ी छावनी में तब्दील।",
    image: "/images/thirupparankundram.jpg",
    author: "पीटीआई / विशेष संवाददाता / मदुरै",
    date: "24 Nov 2026",
    paragraphs: [
      "मदुरै — तमिलनाडु के मदुरै स्थित ऐतिहासिक तिरुप्परनकुंद्रम पहाड़ी पर कार्तिगई दीपम उत्सव के तहत विवादित 'दीपाथून' पत्थर के खंभे पर दीप प्रज्वलन को लेकर सुरक्षा के कड़े बंदोबस्त किए गए हैं। सुप्रीम कोर्ट द्वारा एकमुश्त दीप प्रज्वलन की अनुमति दिए जाने के बाद समूचे पहाड़ी क्षेत्र को छावनी में तब्दील कर दिया गया है।",
      "कानून-व्यवस्था बनाए रखने के लिए 5,600 से अधिक पुलिसकर्मियों की तैनाती की गई है और ड्रोन उड़ाने पर पूर्ण प्रतिबंध लगाया गया है। इस बीच तमिलनाडु सरकार ने उच्चतम न्यायालय के आदेश के खिलाफ पुनर्विचार याचिका दायर की है।"
    ]
  },
  {
    id: "top-jensen-huang-reinstated-nvidia-ceo",
    category: "अंतर्राष्ट्रीय / वैश्विक तकनीक",
    headline: "एनवीडिया में ऐतिहासिक यू-टर्न: ट्रंप के दखल के बाद जेनसन हुआंग फिर बने सीईओ; बोर्ड ने सर्वसम्मति से किया बहाल, शेयरों में भारी उछाल",
    subhead: "कथित विवाद और इस्तीफे के मात्र दो सप्ताह के भीतर वापसी; अमेरिकी सरकार की रिपोर्ट में राष्ट्रीय सुरक्षा को कोई खतरा न होने की पुष्टि के बाद फैसला।",
    image: "/images/nvidia_huang.jpg",
    author: "द गार्जियन / रॉयटर्स / सिलिकॉन वैली",
    date: "24 Nov 2026",
    paragraphs: [
      "सैन फ्रांसिस्को — वैश्विक सेमीकंडक्टर और एआई चिप दिग्गज एनवीडिया के निदेशक मंडल ने सर्वसम्मति से सह-संस्थापक जेनसन हुआंग को कंपनी के मुख्य कार्यकारी अधिकारी (सीईओ) पद पर बहाल कर दिया है। कथित जासूसी विवाद के बाद उनके इस्तीफे के मात्र 12 दिनों के भीतर यह अप्रत्याशित निर्णय लिया गया है।",
      "अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप द्वारा सार्वजनिक रूप से हुआंग का समर्थन करने और अमेरिकी खुफिया समीक्षा में राष्ट्रीय सुरक्षा को किसी भी खतरे से मुक्त पाए जाने के बाद बोर्ड ने यह कदम उठाया। इस घोषणा के साथ ही वॉल स्ट्रीट पर एनवीडिया के शेयरों में जोरदार तेजी दर्ज की गई।"
    ]
  },
  {
    id: "top-priyansh-arya-181-record-smat",
    category: "खेल / टी20 क्रिकेट रिकॉर्ड",
    headline: "सैयद मुश्ताक अली ट्रॉफी में प्रियांश आर्य का ऐतिहासिक तूफान: 68 गेंदों में ठोके 181 रन; केएल राहुल का ऑल-टाइम भारतीय टी20 रिकॉर्ड ध्वस्त",
    subhead: "दिल्ली के कप्तान ने 19 गगनचुंबी छक्के और 7 चौके जड़कर रचा इतिहास; तमिलनाडु के गेंदबाजों के खिलाफ टी20 इतिहास की सबसे विध्वंसक पारी।",
    image: "/images/priyansh_arya.jpg",
    author: "हिंदुस्तान टाइम्स / खेल ब्यूरो",
    date: "24 Nov 2026",
    paragraphs: [
      "चेन्नई — भारतीय घरेलू क्रिकेट में एक अविश्वसनीय इतिहास रचते हुए दिल्ली के युवा कप्तान प्रियांश आर्य ने सैयद मुश्ताक अली ट्रॉफी में तमिलनाडु के खिलाफ मात्र 68 गेंदों में 181 रनों की आतिशी पारी खेल डाली। इसमें 19 विशाल छक्के और 7 चौके शामिल रहे।",
      "इस असाधारण पारी के साथ प्रियांश ने केएल राहुल के 152* रनों के पिछले रिकॉर्ड को तोड़ते हुए टी20 क्रिकेट इतिहास में किसी भी भारतीय बल्लेबाज द्वारा बनाया गया सर्वोच्च व्यक्तिगत स्कोर अपने नाम कर लिया।"
    ]
  },
  {
    id: "top-west-bengal-renamed-paschim-banga",
    category: "देश / राजनीति एवं राज्य",
    headline: "पश्चिम बंगाल का नाम बदलकर 'पश्चिम बंग' करने के प्रस्ताव को कैबिनेट की मंजूरी; 9 दिसंबर को विधानसभा में आएगा आधिकारिक प्रस्ताव",
    subhead: "राज्य मंत्रिमंडल की बैठक में ऐतिहासिक निर्णय; वर्णानुक्रम में राज्यों की सूची में आगे आने और बंगाली भाषाई पहचान को मजबूती देने की पहल।",
    image: "/images/highcourt-fatwa.jpg",
    author: "कोलकाता ब्यूरो",
    date: "24 Nov 2026",
    paragraphs: [
      "कोलकाता — पश्चिम बंगाल सरकार के मंत्रिमंडल ने राज्य का नाम बदलकर आधिकारिक रूप से 'पश्चिम बंग' करने के प्रस्ताव को औपचारिक स्वीकृति दे दी है। मुख्यमंत्री शुभेंदु अधिकारी के नेतृत्व में 9 दिसंबर को शुरू हो रहे विधानसभा सत्र में इस आशय का संकल्प पेश किया जाएगा।",
      "कैबिनेट के अनुसार नाम परिवर्तन से राष्ट्रीय सम्मेलनों और संसद में राज्य का क्रम अंग्रेजी वर्णमाला के 'W' से घटकर 'P' पर आ जाएगा, जिससे राज्य को अपनी बात रखने के लिए अधिक समय और प्राथमिकता मिल सकेगी।"
    ]
  },
  {
    id: "top-sheikh-hasina-bangladesh-return-plan",
    category: "अंतर्राष्ट्रीय / पड़ोसी राजनीति",
    headline: "शेख हसीना ने किया 16 दिसंबर को बांग्लादेश लौटने का ऐलान; अंतरिम सरकार बोली- केवल प्रत्यर्पण और कानून के दायरे में ही संभव",
    subhead: "विजय दिवस (मुक्ति संग्राम वर्षगांठ) के अवसर पर भारत से स्वदेश वापसी की तैयारी; ढाका में सियासी घमासान और सुरक्षा सतर्कता बढ़ी।",
    image: "/images/world-lead.jpg",
    author: "ढाका / नई दिल्ली ब्यूरो",
    date: "24 Nov 2026",
    paragraphs: [
      "ढाका — बांग्लादेश की अपदस्थ पूर्व प्रधानमंत्री शेख हसीना ने घोषणा की है कि वे 16 दिसंबर को देश के 55वें विजय दिवस के अवसर पर भारत से बांग्लादेश लौटेंगी।",
      "वहीं ढाका की अंतरिम सरकार ने कड़ा रुख अपनाते हुए स्पष्ट किया है कि उनकी वापसी केवल कानूनी प्रत्यर्पण प्रक्रिया के तहत ही संभव हो सकेगी और देश में दाखिल होते ही उन पर कानूनी कार्रवाई की जाएगी।"
    ]
  },
  {
    id: "top-gukesh-world-chess-championship-defence",
    category: "खेल / विश्व शतरंज",
    headline: "जेनेवा में विश्व शतरंज चैंपियनशिप का रोमांचक आगाज: डी गुकेश ने जावोखिर सिंदारोव के खिलाफ शुरू किया अपना ऐतिहासिक खिताब बचाव",
    subhead: "भारतीय ग्रैंडमास्टर की सफेद मोहरों से सोची-समझी शुरुआत; वैश्विक शतरंज जगत की निगाहें 20 वर्षीय मौजूदा विश्व चैंपियन के दांव पर टिकीं।",
    image: "/images/sports-lead.jpg",
    author: "चेस डेस्क / जेनेवा",
    date: "24 Nov 2026",
    paragraphs: [
      "जेनेवा (स्विट्जरलैंड) — भारत के 20 वर्षीय मौजूदा विश्व शतरंज चैंपियन डी गुकेश ने उज्बेकिस्तान के प्रतिभाशाली ग्रैंडमास्टर जावोखिर सिंदारोव के खिलाफ विश्व शतरंज चैंपियनशिप 2026 के खिताब बचाव का अभियान शुरू कर दिया है।",
      "शुरुआती गेम में गुकेश ने नियंत्रित और ठोस खेल दिखाया। 14 क्लासिकल बाजियों की इस महा-प्रतिस्पर्धा पर पूरी दुनिया के शतरंज प्रेमियों की नजरें टिकी हुई हैं।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-thirupparankundram-deepathoon-security",
      category: "देश / कानून एवं व्यवस्था",
      headline: "मदुरै के तिरुप्परनकुंद्रम में अभूतपूर्व सुरक्षा: 5,600 पुलिसकर्मी तैनात; दीपाथून पर दीप प्रज्वलन की सुप्रीम कोर्ट की अनुमति",
      subhead: "विवादित पत्थर के खंभे पर सदियों पुरानी परंपरा के तहत दीप जलाने का आदेश; पहाड़ी क्षेत्र छावनी में बदला।",
      image: "/images/thirupparankundram.jpg",
      author: "पीटीआई / मदुरै",
      date: "24 Nov 2026",
      paragraphs: [
        "मदुरै — तिरुप्परनकुंद्रम पहाड़ी पर कार्तिगई दीपम के अवसर पर सुप्रीम कोर्ट के आदेश के बाद सुरक्षा व्यवस्था कड़ी कर दी गई है।",
        "तमिलनाडु पुलिस ने कानून व्यवस्था बनाए रखने के लिए 5,600 से अधिक पुलिसकर्मियों को तैनात किया है और ड्रोन उड़ाने पर प्रतिबंध लगाया गया है।"
      ]
    },
    subStories: [
      {
        id: "desh-india-nepal-ayodhya-janakpur",
        category: "देश / विदेश नीति",
        headline: "भारत-नेपाल संबंध: पीएम मोदी व बालेन्द्र शाह ने अयोध्या-जनकपुर 'सरयू-कमला एक्सप्रेस' को दिखाई हरी झंडी",
        subhead: "नेपाल के लिए ₹15,000 करोड़ का राहत व विकास पैकेज; IIT ऑफशोर कैंपस और 8 महत्वपूर्ण समझौतों पर सहमति।",
        image: "/images/india_nepal.jpg",
        author: "राजनयिक ब्यूरो",
        date: "24 Nov 2026",
        paragraphs: [
          "नई दिल्ली — अयोध्या और जनकपुर के बीच सीधी ट्रेन सेवा शुरू होने से दोनों देशों के तीर्थयात्रियों को अभूतपूर्व सुविधा मिलेगी।"
        ]
      },
      {
        id: "desh-west-bengal-paschim-banga-cabinet",
        category: "देश / राजनीति",
        headline: "पश्चिम बंगाल का नाम 'पश्चिम बंग' करने के प्रस्ताव को कैबिनेट की हरी झंडी; 9 दिसंबर को विधानसभा में आएगा प्रस्ताव",
        subhead: "अल्फाबेटिकल सूची में प्राथमिकता पाने और भाषाई पहचान को संवारने के लिए मंत्रिमंडल ने लिया फैसला।",
        image: "/images/highcourt-fatwa.jpg",
        author: "कोलकाता ब्यूरो",
        date: "24 Nov 2026",
        paragraphs: [
          "कोलकाता — मुख्यमंत्री शुभेंदु अधिकारी के नेतृत्व में राज्य कैबिनेट ने नाम परिवर्तन के प्रस्ताव को मंजूरी दे दी है।"
        ]
      },
      {
        id: "desh-nepal-quake-north-bengal-sikkim",
        category: "देश / आपदा",
        headline: "नेपाल के कोशी प्रांत में 5.3 तीव्रता का भूकंप; उत्तर बंगाल, सिक्किम और पूर्वोत्तर में महसूस किए गए झटके",
        subhead: "लेलेप के निकट केंद्र; किसी बड़े जान-माल के नुकसान की खबर नहीं, असम में भी हल्का झटका।",
        image: "/images/delhi_aqi.jpg",
        author: "आपदा डेस्क",
        date: "24 Nov 2026",
        paragraphs: [
          "सिलीगुड़ी — भूकंप के झटके महसूस होते ही लोग घरों से बाहर निकल आए। सीमावर्ती इलाकों में प्रशासन सतर्क है।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-jensen-huang-reinstated-nvidia",
      category: "विदेश / वैश्विक तकनीक",
      headline: "एनवीडिया में ऐतिहासिक यू-टर्न: ट्रंप के दखल के बाद जेनसन हुआंग फिर बने सीईओ; बोर्ड ने सर्वसम्मति से किया बहाल",
      subhead: "विवाद और इस्तीफे के मात्र दो सप्ताह के भीतर वापसी; शेयरधारकों में उत्साह, वॉल स्ट्रीट पर टेक शेयरों में उछाल।",
      image: "/images/nvidia_huang.jpg",
      author: "सिलिकॉन वैली डेस्क",
      date: "24 Nov 2026",
      paragraphs: [
        "सैन फ्रांसिस्को — एनवीडिया बोर्ड ने सर्वसम्मति से फैसला लेते हुए जेनसन हुआंग को पुनः मुख्य कार्यकारी अधिकारी नियुक्त कर दिया है।",
        "अमेरिकी सरकार की सुरक्षा समीक्षा में किसी भी प्रतिकूल तथ्य के न मिलने के बाद यह त्वरित निर्णय लिया गया।"
      ]
    },
    subStories: [
      {
        id: "videsh-sheikh-hasina-bangladesh-dec16",
        category: "विदेश / दक्षिण एशिया",
        headline: "शेख हसीना का 16 दिसंबर को बांग्लादेश लौटने का ऐलान; अंतरिम सरकार बोली- केवल प्रत्यर्पण से ही प्रवेश संभव",
        subhead: "विजय दिवस पर स्वदेश वापसी की घोषणा से ढाका में राजनीतिक तापमान चढ़ा; भारत पर टिकीं निगाहें।",
        image: "/images/world-lead.jpg",
        author: "ढाका ब्यूरो",
        date: "24 Nov 2026",
        paragraphs: [
          "ढाका — बांग्लादेश में अपदस्थ प्रधानमंत्री की संभावित वापसी को लेकर सुरक्षा एजेंसियों को अलर्ट पर रखा गया है।"
        ]
      },
      {
        id: "videsh-china-shenzhou-24-pakistan-astronaut",
        category: "विदेश / अंतरिक्ष अन्वेषण",
        headline: "चीन अंतरिक्ष में भेजेगा पहला पाकिस्तानी अंतरिक्ष यात्री: शेनझोउ-24 मिशन की घोषणा, तियांगोंग स्टेशन पर होगा प्रवास",
        subhead: "बीजिंग और इस्लामाबाद के अंतरिक्ष सहयोग में नया मील का पत्थर; संयुक्त वैज्ञानिक प्रयोग होंगे संपन्न।",
        image: "/images/pib-cabinet-national.jpg",
        author: "साइंस डेस्क",
        date: "24 Nov 2026",
        paragraphs: [
          "बीजिंग — चीनी अंतरिक्ष एजेंसी ने शेनझोउ-24 चालक दल में पाकिस्तानी अंतरिक्ष यात्री को शामिल करने की पुष्टि की है।"
        ]
      },
      {
        id: "videsh-ukraine-naval-strikes-cop31-fallout",
        category: "विदेश / वैश्विक रणनीति",
        headline: "यूक्रेन का रूसी नौसैनिक ठिकानों पर नए हमलों का दावा; अंतालिया में COP31 विफलता पर वैश्विक विमर्श जारी",
        subhead: "काले सागर और भूमध्य सागर में रूसी जहाजों को निशाना बनाए जाने की रिपोर्ट; जलवायु कूटनीति में गतिरोध।",
        image: "/images/cop31.jpg",
        author: "वैश्विक डेस्क",
        date: "24 Nov 2026",
        paragraphs: [
          "कीव — यूक्रेन की सेना ने रूसी रसद जहाजों पर सफल हमलों की जानकारी दी है, जबकि अंतरराष्ट्रीय मंचों पर जलवायु वार्ता की विफलता पर मंथन जारी है।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-priyansh-arya-181-record",
      category: "खेल / घरेलू टी20",
      headline: "सैयद मुश्ताक अली ट्रॉफी में प्रियांश आर्य का ऐतिहासिक तूफान: 68 गेंदों में 181 रन, 19 छक्के; केएल राहुल का रिकॉर्ड तोड़ा",
      subhead: "तमिलनाडु के खिलाफ टी20 इतिहास में किसी भारतीय द्वारा बनाया गया सर्वोच्च स्कोर; विस्फोटक बल्लेबाजी का नया मानदंड।",
      image: "/images/priyansh_arya.jpg",
      author: "स्पोर्ट्स डेस्क / चेन्नई",
      date: "24 Nov 2026",
      paragraphs: [
        "चेन्नई — दिल्ली के युवा कप्तान प्रियांश आर्य ने तमिलनाडु के खिलाफ बल्ले से तहलका मचाते हुए मात्र 68 गेंदों में 181 रनों की ऐतिहासिक पारी खेली।",
        "उनकी इस पारी में 19 गगनचुंबी छक्के शामिल थे। इसके साथ ही उन्होंने केएल राहुल के 152* रनों के भारतीय टी20 रिकॉर्ड को पीछे छोड़ दिया।"
      ]
    },
    subStories: [
      {
        id: "khel-gukesh-chess-championship-geneva",
        category: "खेल / शतरंज",
        headline: "विश्व शतरंज चैंपियनशिप: डी गुकेश ने जेनेवा में शुरू किया खिताब बचाव; जावोखिर सिंदारोव से कड़ा मुकाबला",
        subhead: "20 वर्षीय भारतीय विश्व चैंपियन ने पहली बाजी में मजबूत स्थिति बनाई; 14 राउंड की खिताबी जंग।",
        image: "/images/sports-lead.jpg",
        author: "चेस रिपोर्टर",
        date: "24 Nov 2026",
        paragraphs: [
          "जेनेवा — दुनिया के सबसे युवा विश्व चैंपियन डी गुकेश ने उज्बेकिस्तान के सिंदारोव के खिलाफ सफेद मोहरों से सतर्क शुरुआत की।"
        ]
      },
      {
        id: "khel-carlos-alcaraz-atp-finals-turin",
        category: "खेल / टेनिस",
        headline: "कार्लोस अल्कराज ने जीता अपना पहला एटीपी फाइनल्स खिताब: ट्यूरिन में फाइनल में दर्ज की ऐतिहासिक जीत",
        subhead: "स्पेनिश स्टार ने विश्व के शीर्ष खिलाड़ियों को पछाड़ते हुए सत्र के अंतिम खिताब पर कब्जा जमाया।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "टेनिस ब्यूरो",
        date: "24 Nov 2026",
        paragraphs: [
          "ट्यूरिन — कार्लोस अल्कराज ने अपने शानदार खेल का प्रदर्शन करते हुए पहली बार प्रतिष्ठित एटीपी फाइनल्स ट्रॉफी उठाई।"
        ]
      },
      {
        id: "khel-india-nz-wellington-draw-christchurch",
        category: "खेल / टेस्ट क्रिकेट",
        headline: "भारत बनाम न्यूजीलैंड टेस्ट श्रृंखला: वेलिंगटन में ऐतिहासिक ड्रॉ के बाद क्राइस्टचर्च में निर्णायक भिड़ंत",
        subhead: "720/9 के विशाल स्कोर के बाद भारतीय गेंदबाज दूसरे टेस्ट में श्रृंखला जीतने के इरादे से मैदान में उतरेंगे।",
        image: "/images/ind_nz_test.jpg",
        author: "क्रिकेट डेस्क",
        date: "24 Nov 2026",
        paragraphs: [
          "क्राइस्टचर्च — दोनों टीमें दूसरे टेस्ट के लिए क्राइस्टचर्च पहुंच चुकी हैं जहां की तेज पिच पर रोमांचक मुकाबले की उम्मीद है।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-nvidia-shares-soar-huang-return",
      category: "व्यापार / वैश्विक शेयर बाजार",
      headline: "जेनसन हुआंग की सीईओ पद पर बहाली से एनवीडिया के शेयरों में जोरदार उछाल; वॉल स्ट्रीट पर टेक शेयरों में लौटी हरियाली",
      subhead: "बोर्ड के सर्वसम्मत फैसले और अमेरिकी सरकार की मंजूरी के बाद बाजार पूंजीकरण में ₹6 लाख करोड़ की वृद्धि।",
      image: "/images/nvidia_huang.jpg",
      author: "मार्केट डेस्क / न्यूयॉर्क",
      date: "24 Nov 2026",
      paragraphs: [
        "न्यूयॉर्क — जेनसन हुआंग के दोबारा कमान संभालते ही नैस्डैक पर एनवीडिया के शेयरों में 8% से अधिक की तेजी दर्ज की गई।",
        "एआई चिप्स और डेटा सेंटर मांग को लेकर निवेशकों का विश्वास एक बार फिर सुदृढ़ हुआ है, जिससे संपूर्ण सेमीकंडक्टर सेक्टर को मजबूती मिली।"
      ]
    },
    subStories: [
      {
        id: "vyapar-india-nepal-15000-crore-package-energy",
        category: "व्यापार / बुनियादी ढांचा",
        headline: "भारत-नेपाल ₹15,000 करोड़ का आर्थिक पैकेज: सीमा-पार ऊर्जा व्यापार और आधुनिक रेल गलियारे का होगा विस्तार",
        subhead: "अयोध्या-जनकपुर रेल मार्ग और नए आईसीपी से द्विपक्षीय व्यापार में सालाना 30% वृद्धि का अनुमान।",
        image: "/images/india_nepal.jpg",
        author: "व्यापार संवाददाता",
        date: "24 Nov 2026",
        paragraphs: [
          "नई दिल्ली — दोनों देशों के बीच हुए समझौते से नेपाल के जलविद्युत को भारतीय बाजारों तक पहुंचाने में तेजी आएगी।"
        ]
      },
      {
        id: "vyapar-paschim-banga-economic-hub-ports",
        category: "व्यापार / राज्य अर्थव्यवस्था",
        headline: "'पश्चिम बंग' नामकरण के साथ राज्य में निवेश आकर्षित करने की नई नीति; बंदरगाहों और एमएसएमई पर फोकस",
        subhead: "कोलकाता और हल्दिया पोर्ट के आधुनिकीकरण के लिए निजी निवेशकों के साथ बैठकों का दौर शुरू।",
        image: "/images/desh-coins.jpg",
        author: "इकोनॉमिक ब्यूरो",
        date: "24 Nov 2026",
        paragraphs: [
          "कोलकाता — राज्य सरकार औद्योगिक विकास और रोजगार सृजन को बढ़ावा देने के लिए आगामी बजट में विशेष रियायतों की तैयारी कर रही है।"
        ]
      },
      {
        id: "vyapar-global-ai-capex-surge-q4",
        category: "व्यापार / तकनीक निवेश",
        headline: "चौथी तिमाही में वैश्विक टेक कंपनियों का एआई कैपेक्स रिकॉर्ड स्तर पर: भारतीय आईटी कंपनियों के लिए नए अवसर",
        subhead: "क्लाउड इंफ्रास्ट्रक्चर और जेनरेटिव एआई टूल्स के विस्तार से भारतीय सॉफ्टवेयर सेवा निर्यात को मिला बल।",
        image: "/images/ipo-scam.jpg",
        author: "आईटी रिपोर्टर",
        date: "24 Nov 2026",
        paragraphs: [
          "बेंगलुरु — वैश्विक चिप बाजार में स्थिरता लौटने से भारतीय टेक सेवा प्रदाताओं के लिए विदेशी अनुबंधों में तेजी देखी जा रही है।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-ayodhya-janakpur-sacred-diplomacy",
      category: "वैचारिकी / पड़ोस प्रथम नीति",
      headline: "अयोध्या से जनकपुर तक: आस्था, भूगोल और आधुनिक कूटनीति का अभूतपूर्व संगम",
      subhead: "भगवान राम की अयोध्या और माता सीता के जनकपुर को जोड़ती सरयू-कमला एक्सप्रेस केवल एक रेलगाड़ी नहीं, बल्कि दो संप्रभु राष्ट्रों की साझी आत्मा और सांस्कृतिक सेतु की जीवंत अभिव्यक्ति है।",
      image: "/images/india_nepal.jpg",
      author: "संपादकीय / सांस्कृतिक एवं विदेश नीति विश्लेषक",
      date: "24 Nov 2026",
      paragraphs: [
        "इतिहास और भूगोल जब सांस्कृतिक आस्था के धागों में पिरोए जाते हैं, तब कूटनीति औपचारिक संधियों से आगे बढ़कर जन-आस्था का उत्सव बन जाती है। प्रधानमंत्री नरेंद्र मोदी और नेपाल के युवा प्रधानमंत्री बालेन्द्र शाह द्वारा अयोध्या और जनकपुर के बीच सीधी रेल सेवा 'सरयू-कमला एक्सप्रेस' को हरी झंडी दिखाना इसी अमर सत्य का आधुनिक प्रमाण है।",
        "रामायण काल से जुड़े इस पवित्र रिश्ते को आधुनिक युग में ₹15,000 करोड़ के विकास पैकेज, ऑफशोर आईआईटी कैंपस और डिजिटल ट्रांसमिशन ग्रिड से सुदृढ़ करना यह दर्शाता है कि भारत अपने 'नेबरहुड फर्स्ट' विजन को ठोस परिणामों में बदलने के लिए कटिबद्ध है। हिमालय की तलहटी से लेकर गंगा के मैदानों तक यह साझेदारी दक्षिण एशिया में शांति और साझा विकास का दीप प्रज्वलित करती है।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-tech-governance-jensen-huang-trump",
        category: "वैचारिकी / कॉर्पोरेट नेतृत्व",
        headline: "कॉर्पोरेट शक्ति और नेतृत्व का द्वंद्व: एनवीडिया में जेनसन हुआंग की वापसी और आधुनिक टेक इंडस्ट्री का सबक",
        subhead: "क्या व्यक्तिगत करिश्मा और तकनीकी दूरदर्शिता किसी भी संस्थागत नियम से बड़ी हो सकती है? वॉल स्ट्रीट का कड़वा सच।",
        image: "/images/nvidia_huang.jpg",
        author: "वरिष्ठ आर्थिक स्तंभकार",
        date: "24 Nov 2026",
        paragraphs: [
          "जेनसन हुआंग की एनवीडिया में अप्रत्याशित वापसी इस बात का प्रमाण है कि आर्टिफिशियल इंटेलिजेंस के इस दौर में संस्थापक का विजन शेयर बाजार के लिए सबसे अमूल्य संपत्ति है।"
        ]
      },
      {
        id: "vaichariki-thirupparankundram-tradition-law",
        category: "वैचारिकी / न्यायिक विमर्श",
        headline: "संस्कृति, परंपरा और कानून का संतुलन: तिरुप्परनकुंद्रम में सदियों पुराने दीप प्रज्वलन पर विमर्श",
        subhead: "आस्था के अधिकारों की रक्षा और सार्वजनिक शांति के बीच सामंजस्य बिठाने की संवैधानिक जिम्मेदारी।",
        image: "/images/thirupparankundram.jpg",
        author: "विधि एवं समाजशास्त्री",
        date: "24 Nov 2026",
        paragraphs: [
          "सुप्रीम कोर्ट का संतुलित निर्णय यह रेखांकित करता है कि प्राचीन धार्मिक परंपराओं का सम्मान करते हुए सामाजिक सद्भाव को सर्वोच्च प्राथमिकता दी जानी चाहिए।"
        ]
      },
      {
        id: "vaichariki-priyansh-arya-t20-revolution",
        category: "वैचारिकी / खेल संस्कृति",
        headline: "टी-20 क्रिकेट की नई सीमाएं: 68 गेंदों में 181 रन और भारतीय युवा प्रतिभा का निडर दर्शन",
        subhead: "घरेलू क्रिकेट में रिकॉर्डों का टूटना यह साबित करता है कि भारतीय खेल प्रतिभा की गहराई असीमित और अदम्य है।",
        image: "/images/priyansh_arya.jpg",
        author: "वरिष्ठ खेल समीक्षक",
        date: "24 Nov 2026",
        paragraphs: [
          "प्रियांश आर्य की यह विध्वंसक पारी केवल आंकड़ों का खेल नहीं है, बल्कि यह नई पीढ़ी के भारतीय क्रिकेटरों के बेखौफ आत्मविश्वास की गूंज है।"
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

      {/* ── BREAKING NEWS TICKER (Pure Hindi - 24 Nov 2026) ── */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 sm:py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A08] text-white px-2.5 py-0.5 rounded-sm font-bold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ताज़ा अपडेट
          </span>
          <div className="truncate text-stone-800 font-semibold">
            अयोध्या और जनकपुर के बीच 'सरयू-कमला एक्सप्रेस' को पीएम मोदी और बालेन्द्र शाह ने दिखाई हरी झंडी • एनवीडिया बोर्ड ने सर्वसम्मति से जेनसन हुआंग को पुनः बनाया सीईओ • सैयद मुश्ताक अली ट्रॉफी: प्रियांश आर्य ने 68 गेंदों में 181 रन ठोककर तोड़ा टी20 का ऑल-टाइम भारतीय रिकॉर्ड • मदुरै के तिरुप्परनकुंद्रम में कड़े सुरक्षा पहरे में दीप प्रज्वलन • पश्चिम बंगाल का नाम 'पश्चिम बंग' करने के प्रस्ताव को कैबिनेट की मंजूरी • जेनेवा में विश्व शतरंज चैंपियनशिप का आगाज, डी गुकेश का खिताब बचाव शुरू
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
            (India-Nepal Summit & Ayodhya-Janakpur Express - 24 Nov 2026)
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
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (24 Nov 2026)
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
