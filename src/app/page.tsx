"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ChevronUp, Menu, X, Search } from "lucide-react";
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

// ── 1. HERO LEAD STORY: DELHI POLLUTION CRISIS (From News Pack 2026-11-10) ──
const HERO_STORY: StoryItem = {
  id: "hero-delhi-pollution",
  category: "पर्यावरण / दिल्ली-एनसीआर",
  headline: "दीवाली के बाद दिल्ली की हवा 'बेहद खराब' श्रेणी में बरकरार; AQI 310 के पार, कई हॉटस्पॉट्स पर 400 के करीब",
  subhead: "राष्ट्रीय राजधानी में स्मॉग की मोटी चादर; दुनिया के 50 सबसे प्रदूषित शहरों में 49 भारत के दर्ज; ग्रैप (GRAP) के कड़े प्रतिबंध जारी, 15 नवंबर तक बारिश की संभावना नहीं।",
  image: "/images/delhi-pollution.jpg",
  author: "पर्यावरण ब्यूरो / CPCB",
  date: "10 Nov 2026",
  paragraphs: [
    "नई दिल्ली — दीवाली के दो दिन बाद भी राष्ट्रीय राजधानी दिल्ली और पूरे एनसीआर क्षेत्र में वायु गुणवत्ता 'बेहद खराब' (Very Poor) श्रेणी में बनी हुई है। केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) के अनुसार राजधानी का औसत वायु गुणवत्ता सूचकांक (AQI) 299 से 311 के बीच दर्ज किया गया, जबकि चांदनी चौक, जहांगीरपुरी और पूसा जैसे संवेदनशील हॉटस्पॉट्स पर यह 395 के खतरनाक स्तर तक पहुंच गया।",
    "वैश्विक वायु गुणवत्ता निगरानी रिपोर्ट के चौंकाने वाले आंकड़ों के अनुसार दुनिया के 50 सबसे प्रदूषित शहरों में से 49 भारत के दर्ज किए गए हैं। वायु गुणवत्ता प्रबंधन आयोग (CAQM) ने ग्रैप (GRAP) के द्वितीय व तृतीय चरण के प्रतिबंधों को पूरी सख्ती से लागू रखने के निर्देश दिए हैं, जिनमें निर्माण गतिविधियों पर निगरानी और धूल नियंत्रण के विशेष उपाय शामिल हैं।",
    "मौसम वैज्ञानिकों का अनुमान है कि शांत हवाओं और तापमान में गिरावट के कारण प्रदूषक कण जमीन की सतह के पास ही जमे रहेंगे। 15 नवंबर तक उत्तर भारत में किसी बड़े पश्चिमी विक्षोभ या वर्षा की संभावना नहीं है, जिससे सांस के मरीजों और बुजुर्गों के लिए स्वास्थ्य संबंधी चुनौतियां बढ़ सकती हैं।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 2026-11-10) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-modi-zelenskyy",
    category: "विदेश नीति / कूटनीति",
    headline: "प्रधानमंत्री मोदी और यूक्रेन के राष्ट्रपति ज़ेलेंस्की के बीच वार्ता; युद्ध समाप्ति व शांति प्रयासों में भारत से मांगा सहयोग",
    subhead: "टेलीफोन पर उच्चस्तरीय संवाद; ज़ेलेंस्की ने खाद्यान्न निर्यात और शांति वार्ता में मध्यस्थता का किया आह्वान; विदेश मंत्री जयशंकर ने भी रूसी समकक्ष से की चर्चा।",
    image: "/images/modi-zelenskyy.jpg",
    author: "राजनयिक ब्यूरो",
    date: "10 Nov 2026",
    paragraphs: [
      "नई दिल्ली — प्रधानमंत्री श्री नरेन्द्र मोदी ने यूक्रेन के राष्ट्रपति वोलोदिमिर ज़ेलेंस्की के साथ टेलीफोन पर व्यापक द्विपक्षीय बातचीत की। बातचीत के दौरान राष्ट्रपति ज़ेलेंस्की ने रूस-यूक्रेन संघर्ष को समाप्त करने और काला सागर के रास्ते खाद्यान्न निर्यात के सुरक्षित गलियारों को बहाल करने में भारत के वैश्विक प्रभाव और कूटनीतिक मध्यस्थता की मांग की।",
      "प्रधानमंत्री मोदी ने दोहराया कि भारत बातचीत और कूटनीति के जरिए शांतिपूर्ण समाधान का पक्षधर रहा है और किसी भी स्थायी शांति पहल में रचनात्मक योगदान देने के लिए तैयार है। साथ ही, विदेश मंत्री एस. जयशंकर ने भी अपने रूसी समकक्ष के साथ संपर्क साधकर क्षेत्रीय सुरक्षा परिदृश्य पर चर्चा की।"
    ]
  },
  {
    id: "top-turkey-explosion",
    category: "अंतर्राष्ट्रीय / हादसा",
    headline: "तुर्की के इस्पात संयंत्र में भीषण विस्फोट; क्रेन से पिघली धातु गिरने से 17 श्रमिकों की दर्दनाक मौत",
    subhead: "पश्चिमी तुर्की के इजमिर औद्योगिक क्षेत्र में बड़ा हादसा; दर्जनों घायल; राष्ट्रपति एर्दोगन ने कारखाने के सुरक्षा मानकों की उच्चस्तरीय जांच के दिए आदेश।",
    image: "/images/turkey-explosion.jpg",
    author: "यूरोन्यूज़ / अंतरराष्ट्रीय डेस्क",
    date: "10 Nov 2026",
    paragraphs: [
      "अंकारा — पश्चिमी तुर्की के इजमिर प्रांत में स्थित एक बड़े इस्पात निर्माण संयंत्र में क्रेन का तार टूटने से पिघली हुई धातु फर्श पर काम कर रहे कामगारों पर गिर गई, जिसके बाद हुए भयानक विस्फोट में कम से कम 17 श्रमिकों की मौके पर ही मौत हो गई और कई अन्य गंभीर रूप से झुलस गए।",
      "तुर्की के राष्ट्रपति रेसेप तैयप एर्दोगन ने हादसे पर गहरा शोक व्यक्त करते हुए आपातकालीन जांच दल गठित करने और औद्योगिक सुरक्षा नियमों की विफलता के लिए जिम्मेदार अधिकारियों के खिलाफ सख्त कानूनी कार्रवाई के निर्देश दिए हैं।"
    ]
  },
  {
    id: "top-nvidia-investigation",
    category: "तकनीक / वैश्विक व्यापार",
    headline: "एनवीडिया सीईओ जेनसन हुआंग चीनी महिला व्यवसायी से कथित संबंधों को लेकर अमेरिकी जांच के घेरे में",
    subhead: "राष्ट्रपति ट्रंप ने कहा- एफबीआई जासूसी के आरोपों की कर रही जांच; एक ही दिन में एनवीडिया शेयरधारकों को अरबों डॉलर का नुकसान, वॉल स्ट्रीट में हड़कंप।",
    image: "/images/tech-lead.jpg",
    author: "रॉयटर्स / तकनीक डेस्क",
    date: "10 Nov 2026",
    paragraphs: [
      "सैन फ्रांसिस्को — विश्व की सबसे मूल्यवान सेमीकंडक्टर और एआई चिप निर्माता कंपनी एनवीडिया (Nvidia) के मुख्य कार्यकारी अधिकारी (CEO) जेनसन हुआंग पर एक कथित चीनी जासूस व्यवसायी एलिस हुआंग के साथ संबंधों को लेकर अमेरिकी खुफिया एजेंसी एफबीआई ने जांच शुरू कर दी है।",
      "अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप ने मीडिया को बताया कि जांच एजेंसियां सुरक्षा संवेदनशीलताओं की पड़ताल कर रही हैं। इस खबर के बाद एनवीडिया के शेयरों में भारी गिरावट आई और शेयरधारकों ने कंपनी बोर्ड के खिलाफ कानूनी मुकदमे दायर किए हैं।"
    ]
  },
  {
    id: "top-cricket-india-nz",
    category: "खेल / क्रिकेट",
    headline: "बारिश के कारण तीसरा वनडे मुकाबला रद्द, भारतीय टीम ने 2-0 से जीती एकदिवसीय श्रृंखला",
    subhead: "हैमिल्टन में लगातार बारिश से मैच बेनतीजा घोषित; टेस्ट श्रृंखला की तैयारी के लिए गिल और राहुल रवाना; श्रेयस अय्यर संभालेंगे कमान।",
    image: "/images/sports-lead.jpg",
    author: "स्पोर्ट्स डेस्क",
    date: "10 Nov 2026",
    paragraphs: [
      "हैमिल्टन — भारत और न्यूजीलैंड के बीच तीन मैचों की एकदिवसीय श्रृंखला का अंतिम मुकाबला भारी बारिश के कारण एक भी गेंद फेंके बिना रद्द करना पड़ा। इसके साथ ही भारतीय टीम ने शुरुआती दोनों मुकाबले जीतकर श्रृंखला 2-0 से अपने नाम कर ली।",
      "नियमित कप्तान शुभमन गिल और केएल राहुल आगामी टेस्ट श्रृंखला की तैयारियों के लिए पहले ही रवाना हो चुके हैं, जिसके बाद शेष सफेद गेंद मैचों के लिए श्रेयस अय्यर को कप्तानी की जिम्मेदारी सौंपी गई है।"
    ]
  },
  {
    id: "top-cricket-abhishek-sharma",
    category: "खेल / टी20",
    headline: "अभिषेक शर्मा के तूफानी अर्धशतक (82 रन, 32 गेंद) से भारत ने अफगानिस्तान को 7 विकेट से रौंदा",
    subhead: "156 रन का लक्ष्य भारत ने सिर्फ 13.4 ओवर में हासिल किया; बुमराह की घातक गेंदबाजी; तीन मैचों की टी20 श्रृंखला में भारत 1-0 से आगे।",
    image: "/images/vaichariki-mbappe.jpg",
    author: "क्रिकेट ब्यूरो",
    date: "10 Nov 2026",
    paragraphs: [
      "मोहाली — भारतीय सलामी बल्लेबाज अभिषेक शर्मा ने विस्फोटक बल्लेबाजी का शानदार मुजाहिरा करते हुए मात्र 32 गेंदों पर 82 रनों की आतिशी पारी खेली, जिसकी बदौलत भारत ने अफगानिस्तान को पहले टी20 मैच में 7 विकेट से करारी शिकस्त दी।",
      "जसप्रीत बुमराह ने चोट के बाद शानदार वापसी करते हुए किफायती गेंदबाजी की और 3 महत्वपूर्ण विकेट झटके। अभिषेक शर्मा को उनकी मैच-विजेता पारी के लिए 'प्लेयर ऑफ द मैच' चुना गया।"
    ]
  },
  {
    id: "top-abu-dhabi-talks",
    category: "अंतर्राष्ट्रीय / कूटनीति",
    headline: "अबू धाबी में अमेरिका की मध्यस्थता में रूस-यूक्रेन शांति वार्ता शुरू; ट्रंप ने समग्र समझौते की जताई उम्मीद",
    subhead: "त्रिपक्षीय कूटनीतिक संवाद में युद्ध विराम की शर्तों पर चर्चा; खाड़ी देशों ने युद्ध समाप्ति के प्रयासों का स्वागत किया; जी7 का सहयोग जारी।",
    image: "/images/world-lead.jpg",
    author: "वैश्विक कूटनीति ब्यूरो",
    date: "10 Nov 2026",
    paragraphs: [
      "अबू धाबी — संयुक्त अरब अमीरात की राजधानी में रूस, यूक्रेन और संयुक्त राज्य अमेरिका के प्रतिनिधियों के बीच त्रिपक्षीय गोपनीय शांति वार्ता का पहला दौर शुरू हो गया है।",
      "अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप ने कहा कि युद्ध को रोकने के लिए एक व्यापक समझौते की संभावना प्रबल है। यूरोपीय संघ और जी7 देशों ने इस बातचीत पर नजर बनाए रखी है।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-sonia-gandhi",
      category: "देश / राजनीति",
      headline: "सोनिया गांधी का नया संस्मरण: पीएम मोदी, 2004 में पद छोड़ने और वैश्विक नेताओं से जुड़े प्रसंगों पर बेबाक खुलासे",
      subhead: "कांग्रेस की पूर्व अध्यक्ष के नए संस्मरण ने राजनीतिक गलियारों में छेड़ी नई बहस; पीएम मोदी से संवाद और विदेशी नेताओं के अनुभवों का विवरण।",
      image: "/images/politics-lead.jpg",
      author: "राजनीतिक संपादक",
      date: "10 Nov 2026",
      paragraphs: [
        "नई दिल्ली — कांग्रेस संसदीय दल की अध्यक्ष सोनिया गांधी के हाल ही में प्रकाशित संस्मरण ने देश के राजनीतिक परिदृश्य में नई चर्चा छेड़ दी है। पुस्तक में उन्होंने प्रधानमंत्री नरेंद्र मोदी के साथ अपने सीमित संवाद, 2004 में प्रधानमंत्री पद अस्वीकार करने के पीछे के भावनात्मक कारणों और बिल क्लिंटन व प्रिंसेस डायना जैसे वैश्विक नेताओं से जुड़ी स्मृतियों को साझा किया है।",
        "सोनिया गांधी ने लिखा कि सार्वजनिक जीवन में वैचारिक मतभेदों के बावजूद लोकतांत्रिक संस्थाओं की गरिमा और संवैधानिक मर्यादाओं को बनाए रखना राष्ट्रहित में सर्वोपरि है।"
      ]
    },
    subStories: [
      {
        id: "desh-yamuna-cruise",
        category: "देश / पर्यटन",
        headline: "दिल्ली में पहली यमुना रिवर क्रूज 'नमो रिवर सफारी' का शुभारंभ; सोनिया विहार से शुरू हुई सेवा",
        subhead: "केंद्रीय मंत्री सर्बानंद सोनोवाल ने दिखाई हरी झंडी; ₹500 के टिकट में राजधानी में रिवर टूरिज्म को मिलेगा बड़ा बढ़ावा।",
        image: "/images/trending-lead.jpg",
        author: "सिटी डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "नई दिल्ली — दिल्लीवासियों को रिवर फ्रंट पर्यटन का नया अनुभव देने के लिए यमुना नदी में पहली बार नियमित क्रूज सेवा शुरू की गई है।"
        ]
      },
      {
        id: "desh-amit-shah-drugs",
        category: "देश / आंतरिक सुरक्षा",
        headline: "अमित शाह का संकल्प: 2028 तक गुजरात को नशा-मुक्त बनाएंगे; 3 घंटे में त्वरित कार्रवाई की नई हेल्पलाइन शुरू",
        subhead: "केंद्रीय गृह मंत्री ने गांधीनगर में नशीले पदार्थों के खिलाफ राष्ट्रीय अभियान की समीक्षा की; सख्त कानूनी कार्रवाई के निर्देश।",
        image: "/images/pib-mining-conference.jpg",
        author: "सुरक्षा ब्यूरो",
        date: "10 Nov 2026",
        paragraphs: [
          "गांधीनगर — गृह मंत्री ने तटीय सुरक्षा और नारकोटिक्स नेटवर्क को पूरी तरह ध्वस्त करने के लिए सभी सुरक्षा एजेंसियों को समन्वित अभियान चलाने का निर्देश दिया।"
        ]
      },
      {
        id: "desh-chhath-firecrackers",
        category: "देश / बिहार",
        headline: "बिहार सरकार का बड़ा फैसला: छठ पूजा के दौरान गंगा घाटों पर आतिशबाजी और निजी नावों पर पूर्ण प्रतिबंध",
        subhead: "श्रद्धालुओं की सुरक्षा और नदी स्वच्छता को ध्यान में रखते हुए आपदा प्रबंधन विभाग ने जारी की सख्त गाइडलाइंस।",
        image: "/images/desh-drought.jpg",
        author: "पटना ब्यूरो",
        date: "10 Nov 2026",
        paragraphs: [
          "पटना — लोक आस्था के महापर्व छठ पर श्रद्धालुओं की भारी भीड़ को देखते हुए घाटों पर विशेष पुलिस बल और गोताखोर तैनात किए गए हैं।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-trump-iran",
      category: "विदेश / मध्य पूर्व",
      headline: "डोनाल्ड ट्रंप का बड़ा बयान: 'ईरान युद्ध प्रभावी रूप से समाप्त'; कतर वार्ता के बाद नए सैन्य हमलों पर लगाई रोक",
      subhead: "कतर के प्रधानमंत्री से मुलाकात के बाद अमेरिकी रुख में बदलाव; खाड़ी देशों ने नौसैनिक निगरानी जारी रखने पर दिया जोर।",
      image: "/images/us-midterms.jpg",
      author: "वॉशिंगटन ब्यूरो",
      date: "10 Nov 2026",
      paragraphs: [
        "वॉशिंगटन — अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप ने कतर के प्रधानमंत्री के साथ उच्चस्तरीय बैठक के बाद कहा कि ईरान के साथ सैन्य तनाव अब लगभग समाप्त हो चुका है और अमेरिका फिलहाल किसी नए हवाई हमले की योजना नहीं बना रहा है।",
        "हालांकि, खाड़ी देशों के रक्षा अधिकारियों ने होर्मुज जलडमरूमध्य में वाणिज्यिक जहाजों की सुरक्षा के लिए नौसैनिक गश्त जारी रखने की आवश्यकता जताई है।"
      ]
    },
    subStories: [
      {
        id: "videsh-china-trade",
        category: "विदेश / अर्थव्यवस्था",
        headline: "चीन का व्यापार अधिशेष लगातार दूसरे वर्ष 1 ट्रिलियन डॉलर के पार; अक्टूबर में निर्यात में 35% का उछाल",
        subhead: "वैश्विक टैरिफ धमकियों के बावजूद चीनी विनिर्माण व इलेक्ट्रिक वाहनों की अंतरराष्ट्रीय मांग में रिकॉर्ड मजबूती।",
        image: "/images/jinping-plan.jpg",
        author: "बीजिंग डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "बीजिंग — पश्चिमी देशों के व्यापार प्रतिबंधों के बावजूद चीनी कारखानों ने विकासशील देशों के बाजारों में अपनी हिस्सेदारी तेजी से बढ़ाई है।"
        ]
      },
      {
        id: "videsh-hungary-orban",
        category: "विदेश / यूरोप",
        headline: "हंगरी में प्रधानमंत्री विक्टर ओर्बन के भाई मानव तस्करी से जुड़ी जांच के सिलसिले में हिरासत में लिए गए",
        subhead: "यूरोपीय सीमा पार प्रवासन जांच एजेंसियों ने बुडापेस्ट में की छापेमारी; राजनीतिक हलकों में सनसनी।",
        image: "/images/desh-police.jpg",
        author: "यूरोप ब्यूरो",
        date: "10 Nov 2026",
        paragraphs: [
          "बुडापेस्ट — हंगरी पुलिस और यूरोपीय न्यायिक एजेंसियों ने मानव तस्करी के एक अंतरराष्ट्रीय नेटवर्क की जांच के दौरान यह कार्रवाई की है।"
        ]
      },
      {
        id: "videsh-us-un-rights",
        category: "विदेश / संयुक्त राष्ट्र",
        headline: "संयुक्त राष्ट्र मानवाधिकार परिषद की नियमित समीक्षा में शामिल नहीं होगा अमेरिका; इतिहास का पहला बहिष्कार",
        subhead: "अमेरिकी प्रशासन ने संस्था पर पक्षपात का आरोप लगाते हुए आधिकारिक सत्र से पूरी तरह दूरी बनाने की घोषणा की।",
        image: "/images/highcourt-fatwa.jpg",
        author: "जिनेवा डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "जिनेवा — मानवाधिकार संगठनों ने अमेरिका के इस फैसले पर चिंता जताते हुए इसे अंतरराष्ट्रीय जवाबदेही के लिए झटका करार दिया है।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-jemimah-return",
      category: "खेल / महिला क्रिकेट",
      headline: "जेमिमा रोड्रिग्स की भारतीय महिला क्रिकेट टीम में जोरदार वापसी; दक्षिण अफ्रीका दौरे के लिए राष्ट्रीय दल घोषित",
      subhead: "चोट से उबरने के बाद जेमिमा को मिली टीम में जगह; स्मृति मंधाना करेंगी कप्तानी; हरमनप्रीत कौर तीनों प्रारूपों में शामिल।",
      image: "/images/pib-asian-para-games.jpg",
      author: "महिला क्रिकेट ब्यूरो",
      date: "10 Nov 2026",
      paragraphs: [
        "मुंबई — भारतीय क्रिकेट कंट्रोल बोर्ड (BCCI) की महिला चयन समिति ने दक्षिण अफ्रीका के खिलाफ आगामी बहुप्रारूपीय श्रृंखला के लिए राष्ट्रीय टीम की घोषणा कर दी है। युवा स्टार बल्लेबाज जेमिमा रोड्रिग्स पूरी फिटनेस हासिल करने के बाद वनडे और टी20 दोनों दस्तों में वापस लौट आई हैं।",
        "स्मृति मंधाना के नेतृत्व में यह दौरा आगामी आईसीसी महिला विश्व कप की तैयारियों के लिहाज से बेहद महत्वपूर्ण माना जा रहा है।"
      ]
    },
    subStories: [
      {
        id: "khel-ind-nz-odi",
        category: "खेल",
        headline: "हैमिल्टन में बारिश की मार, भारत ने 2-0 से जीती एकदिवसीय श्रृंखला; श्रेयस अय्यर अगले कप्तान",
        subhead: "गिल और राहुल के टेस्ट कैंप में जुड़ने के बाद वनडे टीम का नेतृत्व करेंगे अय्यर।",
        image: "/images/sports-lead.jpg",
        author: "क्रिकेट डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "हैमिल्टन — भारतीय टीम ने अपने शानदार गेंदबाजी और मध्यक्रम के प्रदर्शन के दम पर श्रृंखला में अजेय बढ़त हासिल की थी।"
        ]
      },
      {
        id: "khel-abhishek-sharma-t20",
        category: "खेल",
        headline: "अभिषेक शर्मा का 32 गेंदों पर 82 रन का तूफान; भारत ने अफगानिस्तान को 7 विकेट से रौंदा",
        subhead: "मोहाली में भारतीय बल्लेबाजों का आतिशी प्रदर्शन, 13.4 ओवर में ही हासिल किया 156 रन का लक्ष्य।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "स्पोर्ट्स रिपोर्टर",
        date: "10 Nov 2026",
        paragraphs: [
          "मोहाली — अभिषेक शर्मा की आक्रामक पारी ने टी20 विश्व कप के लिए उनकी दावेदारी को और मजबूत कर दिया है।"
        ]
      },
      {
        id: "khel-nba-nfl",
        category: "खेल",
        headline: "अमेरिकी खेलों में रोमांच: बफ़ेलो बिल्स की जीत, डलास मेवरिक्स ने दर्ज की शानदार सफलता",
        subhead: "कूपर फ्लैग और काइरी इरविंग की जोड़ी ने 78 अंक बटोरकर बास्केटबॉल कोर्ट पर मचाया तहलका।",
        image: "/images/mogging-lifestyle.jpg",
        author: "ग्लोबल स्पोर्ट्स डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "डलास — एनबीए के रोमांचक मुकाबले में मेवरिक्स ने अंतिम सेकंडों में बढ़त बनाकर मुकाबला जीत लिया।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-steel-surge",
      category: "व्यापार / अर्थव्यवस्था",
      headline: "सात महीनों में भारत के फिनिश्ड स्टील की खपत 100 एमटी के करीब पहुंची, औद्योगिक मांग में अभूतपूर्व उछाल",
      subhead: "इस्‍पात मंत्रालय के आंकड़ों के अनुसार बुनियादी ढांचा परियोजनाओं और वाहन उद्योग की मांग के दम पर घरेलू उत्पादन में ऐतिहासिक वृद्धि।",
      image: "/images/pib-steel-industry.jpg",
      author: "इस्‍पात मंत्रालय / PIB",
      date: "10 Nov 2026",
      paragraphs: [
        "नई दिल्ली — भारत में फिनिश्ड स्टील की खपत चालू वित्त वर्ष के शुरुआती सात महीनों में 100 मीट्रिक टन (MT) के आंकड़े को छूने के करीब पहुंच गई है। बुनियादी ढांचा परियोजनाओं और वाहन उद्योग की बढ़ती मांग ने इस्पात क्षेत्र को जबरदस्त गति दी है।",
        "उद्योग विशेषज्ञों का मानना है कि रेलवे विस्तार और शहरी निर्माण कार्यों में घरेलू स्टील की बढ़ती खपत से भारत दुनिया का सबसे तेजी से बढ़ता इस्पात बाजार बना हुआ है।"
      ]
    },
    subStories: [
      {
        id: "vyapar-sensex-records",
        category: "व्यापार",
        headline: "सेंसेक्स और निफ्टी नए सर्वकालिक शिखर पर बंद; विदेशी संस्थागत निवेशकों की भारी लिवाली",
        subhead: "बैंकिंग, ऑटोमोबाइल और आईटी शेयरों में तेजी से दलाल स्ट्रीट में निवेशकों का भरोसा बढ़ा।",
        image: "/images/ipo-fraud.jpg",
        author: "मार्केट डेस्क",
        date: "10 Nov 2026",
        paragraphs: [
          "मुंबई — मजबूत घरेलू आर्थिक आंकड़ों के दम पर भारतीय शेयर बाजारों ने नए रिकॉर्ड स्तर स्थापित किए हैं।"
        ]
      },
      {
        id: "vyapar-upi-milestone",
        category: "व्यापार",
        headline: "UPI का नया विश्व कीर्तिमान: एक महीने में 16 अरब से अधिक सफल डिजिटल लेन-देन संपन्न",
        subhead: "एनपीसीआई की रिपोर्ट के अनुसार खुदरा किराना से लेकर ऑनलाइन ई-कॉमर्स तक डिजिटल भुगतान बना भारत की रीढ़।",
        image: "/images/desh-coins.jpg",
        author: "फिनटेक ब्यूरो",
        date: "10 Nov 2026",
        paragraphs: [
          "नई दिल्ली — भारत का यूनिफाइड पेमेंट्स इंटरफेस (UPI) दुनिया के सबसे बड़े खुदरा डिजिटल भुगतान नेटवर्क के रूप में स्थापित हो चुका है।"
        ]
      },
      {
        id: "vyapar-green-hydrogen",
        category: "व्यापार",
        headline: "ग्रीन हाइड्रोजन परियोजनाओं के लिए भारत को मिले ₹65,000 करोड़ के नए वैश्विक निवेश प्रस्ताव",
        subhead: "ऊर्जा सुरक्षा और नेट-जीरो उत्सर्जन लक्ष्यों की ओर बढ़ते भारत के स्वच्छ ईंधन क्षेत्र को मिली नई गति।",
        image: "/images/business-lead.jpg",
        author: "ऊर्जा ब्यूरो",
        date: "10 Nov 2026",
        paragraphs: [
          "नई दिल्ली — राष्ट्रीय ग्रीन हाइड्रोजन मिशन के तहत घरेलू उत्पादन और निर्यात के लिए बड़े अंतरराष्ट्रीय करार किए गए हैं।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-poverty-jobs",
      category: "वैचारिकी / संपादकीय",
      headline: "अत्यधिक ग़रीबी घटकर 2.6%, पर खेती से बाहर गुणवत्तापूर्ण नौकरियों की गति तेज करना अनिवार्य",
      subhead: "नीति आयोग और अर्थशास्त्रियों का विश्लेषण: प्रत्यक्ष लाभ अंतरण ने भुखमरी मिटाई, अब विनिर्माण में रोजगार सृजन सर्वोच्च प्राथमिकता।",
      image: "/images/vaichariki-lead.jpg",
      author: "संपादकीय / नीति ब्यूरो",
      date: "10 Nov 2026",
      paragraphs: [
        "भारत में अत्यधिक गरीबी रेखा से नीचे जीवनयापन करने वाली आबादी का अनुपात ऐतिहासिक रूप से घटकर 2.6% के स्तर पर आ गया है। प्रत्यक्ष लाभ अंतरण (DBT), मुफ्त खाद्यान्न और ग्रामीण आवास जैसी योजनाओं ने निर्धनता उन्मूलन में निर्णायक भूमिका निभाई है।",
        "हालांकि, अर्थशास्त्रियों का कहना है कि दीर्घकालिक आर्थिक समृद्धि के लिए कृषि क्षेत्र से निकलने वाले कार्यबल को उच्च उत्पादकता वाले विनिर्माण और संगठित सेवा क्षेत्रों में समाहित करना सबसे बड़ी चुनौती बनी हुई है।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-pawan-kalyan",
        category: "वैचारिकी",
        headline: "पवन कल्याण और अन्ना लेझनेवा के 13 वर्ष बाद अलग होने पर सार्वजनिक व सांस्कृतिक विमर्श",
        subhead: "आंध्र प्रदेश के डिप्टी सीएम व अभिनेता के निजी जीवन और सार्वजनिक नेतृत्व के संतुलन पर परिचर्चा।",
        image: "/images/entertainment-lead.jpg",
        author: "सांस्कृतिक संपादक",
        date: "10 Nov 2026",
        paragraphs: [
          "हैदराबाद — सार्वजनिक जीवन में रहने वाले नेताओं के व्यक्तिगत निर्णयों और उनके प्रशंसकों के बीच परस्पर संवाद का विश्लेषण।"
        ]
      },
      {
        id: "vaichariki-nvidia-geopolitics",
        category: "वैचारिकी",
        headline: "एनवीडिया सीईओ प्रकरण: वैश्विक टेक कंपनियों और भू-राजनीतिक खुफिया एजेंसियों के बीच बढ़ता तनाव",
        subhead: "कृत्रिम बुद्धिमत्ता और अत्याधुनिक चिप्स के नियंत्रण को लेकर महाशक्तियों के बीच अघोषित तकनीकी शीतयुद्ध।",
        image: "/images/tech-lead.jpg",
        author: "तकनीक विश्लेषक",
        date: "10 Nov 2026",
        paragraphs: [
          "सैन फ्रांसिस्को — चिप निर्माण के क्षेत्र में वैश्विक प्रभुत्व स्थापित करने के लिए पश्चिमी और एशियाई शक्तियों के बीच खींचतान तेज हो गई है।"
        ]
      },
      {
        id: "vaichariki-sonia-memoir-analysis",
        category: "वैचारिकी",
        headline: "सोनिया गांधी के संस्मरण से भारतीय संसदीय राजनीति और सत्ता संतुलन के नए दृष्टिकोण",
        subhead: "गठबंधन सरकारों का दौर, नेतृत्व की चुनौतियां और दो दशकों के राजनीतिक निर्णयों का निष्पक्ष मूल्यांकन।",
        image: "/images/politics-lead.jpg",
        author: "वरिष्ठ राजनीतिक विश्लेषक",
        date: "10 Nov 2026",
        paragraphs: [
          "नई दिल्ली — 2004 के राजनीतिक घटनाक्रम और भारतीय लोकतंत्र में सत्ता के विकेंद्रीकरण के ऐतिहासिक संदर्भ।"
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
  const [selectedArticle, setSelectedArticle] = useState<ArticleModalData | null>(null);

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

          {/* Desktop Center: Categories in Modern Hindi Font (Noto Sans Devanagari / Mukta) */}
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
                placeholder="ताज़ा ख़बरें खोजें (जैसे: प्रदूषण, ज़ेलेंस्की, क्रिकेट, सोनिया गांधी)..."
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

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7">

        {/* ══════════════════════════════════════════════════════════════
            1. HERO SECTION: LARGE 21:9 / 16:9 BANNER WITH FROSTED CARD
            (Delhi Pollution Crisis - 10 Nov 2026)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div
            onClick={() => openArticle(HERO_STORY)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer transition-all duration-300"
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
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES
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
              className="group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[440px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer mb-8 transition-all duration-300"
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
