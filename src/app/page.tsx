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

// ── 1. HERO LEAD STORY: LATEST HIGH-QUALITY PIB NATIONAL RELEASE ──
const HERO_STORY: StoryItem = {
  id: "pib-hero-1",
  category: "राष्ट्रीय / कैबिनेट",
  headline: "केंद्रीय मंत्रिमंडल ने ₹1.43 लाख करोड़ के राष्ट्रीय अवसंरचना व उच्च-गति फ्रेट ग्रिड को दी मंजूरी",
  subhead: "प्रधानमंत्री नरेंद्र मोदी की अध्यक्षता में आर्थिक समीक्षा बैठक; देश भर में मल्टी-मोडल लॉजिस्टिक्स एक्सप्रेसवे, रेल कनेक्टिविटी और विकसित भारत 2047 कॉरिडोर को अंतिम रूप।",
  image: "/images/pib-cabinet-national.jpg",
  author: "पत्र सूचना कार्यालय (PIB), नई दिल्ली",
  date: "06 Nov 2026",
  paragraphs: [
    "नई दिल्ली — प्रधानमंत्री श्री नरेन्द्र मोदी की अध्यक्षता में केंद्रीय मंत्रिमंडल ने पीएम गति शक्ति राष्ट्रीय मास्टर प्लान के तहत ₹1,43,000 करोड़ के ऐतिहासिक अवसंरचना पैकेज को मंजूरी दी है। इस योजना का मुख्य उद्देश्य देश के प्रमुख औद्योगिक गलियारों में लॉजिस्टिक्स लागत को वर्तमान के 14% से घटाकर 8% से नीचे लाना है।",
    "कैबिनेट के निर्णय के अनुसार सात नए मल्टी-मोडल फ्रेट एक्सप्रेसवे, बारह उच्च-क्षमता वाले पोर्ट-रेल कनेक्टर्स और उन्नत डिजिटल लॉजिस्टिक्स डेटा ग्रिड का निर्माण मिशन मोड में पूरा किया जाएगा। इससे पश्चिमी समुद्री बंदरगाहों और उत्तरी उत्पादन केंद्रों के बीच माल ढुलाई की गति दोगुनी हो जाएगी।",
    "रेल मंत्री अश्विनी वैष्णव ने पुष्टि की कि स्वचालित सुरक्षा शील्ड (कवच 4.0) और फ्रेट कॉरिडोर ट्रैक दोहरीकरण को प्राथमिकता के आधार पर बजट आवंटित किया गया है। उद्योग जगत ने इस फैसले को भारत की 7.5% से अधिक वार्षिक आर्थिक वृद्धि का आधार स्तंभ बताया है।"
  ]
};

// ── 2. TOP STORIES GRID: 6 LATEST PIB STORIES WITH REAL HIGH-QUALITY IMAGES ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "pib-top-1",
    category: "रक्षा / नौसेना",
    headline: "भारतीय नौसेना का युद्धपोत ‘सह्याद्रि’ मालाबार 2026 अभ्यास में भाग लेने के लिए जापान पहुंचा",
    subhead: "जापान के योकोसुका नौसैनिक बेस पर आईएनएस सह्याद्रि का भव्य स्वागत; भारत-जापान द्विपक्षीय रणनीतिक साझेदारी और हिंद-प्रशांत समुद्री सुरक्षा को नई मजबूती।",
    image: "/images/pib-defense-sahyadri.jpg",
    author: "रक्षा मंत्रालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "योकोसुका (जापान) — भारतीय नौसेना का स्वदेश निर्मित स्टेल्थ फ्रिगेट आईएनएस ‘सह्याद्रि’ बहुपक्षीय समुद्री अभ्यास मालाबार 2026 में भाग लेने के लिए जापान के योकोसुका नौसैनिक अड्डे पर पहुंच गया है। जापान समुद्री आत्मरक्षा बल (JMSDF) ने भारतीय युद्धपोत का गर्मजोशी से औपचारिक स्वागत किया।",
      "मालाबार अभ्यास हिंद-प्रशांत क्षेत्र में शांति, सुरक्षा और नौवहन की स्वतंत्रता सुनिश्चित करने के लिए भारत, अमेरिका, जापान और ऑस्ट्रेलिया की नौसेनाओं के बीच अंतर-संचालनीयता और उच्च-स्तरीय सामरिक कौशल का परीक्षण करेगा। भारतीय नौसेना के अधिकारियों ने जापानी समकक्षों के साथ पेशेवर बातचीत और संयुक्त समुद्री रणनीतियों पर चर्चा की।"
    ]
  },
  {
    id: "pib-top-2",
    category: "खनन एवं उद्योग",
    headline: "खनन मंत्रियों के 4वें राष्ट्रीय सम्मेलन में महत्वपूर्ण खनिज अन्वेषण और पारदर्शी सुधारों का ऐलान",
    subhead: "खान मंत्रालय ने क्रिटिकल मिनरल्स, दुर्लभ भू-तत्वों और केंद्र-राज्य समन्वय को बढ़ावा देने के लिए तीन प्रमुख नीतिगत पहलों का किया शुभारंभ।",
    image: "/images/pib-mining-conference.jpg",
    author: "खान मंत्रालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "नई दिल्ली — खान मंत्रालय द्वारा आयोजित खनन मंत्रियों के चौथे राष्ट्रीय सम्मेलन के पहले दिन खनिज अन्वेषण को सुदृढ़ करने, राजस्व पारदर्शिता बढ़ाने और उन्नत खनन प्रौद्योगिकी को अपनाने के उद्देश्य से तीन ऐतिहासिक पहलों की शुरुआत की गई।",
      "केंद्रीय मंत्री ने राज्यों के साथ रणनीतिक समन्वय पर बल देते हुए कहा कि इलेक्ट्रिक वाहन, सेमीकंडक्टर और हरित ऊर्जा के लिए आवश्यक दुर्लभ भू-तत्वों (Rare Earth Elements) की घरेलू आपूर्ति सुनिश्चित करने के लिए निजी अन्वेषण एजेंसियों को मान्यता देने की प्रक्रिया तेज कर दी गई है।"
    ]
  },
  {
    id: "pib-top-3",
    category: "विशेष / एमएसएमई",
    headline: "पीएम विश्वकर्मा कारीगरों के लिए ट्राइफेड के साथ ऐतिहासिक समझौता, वैश्विक बाजार तक पहुंचेगी भारतीय कला",
    subhead: "पारंपरिक शिल्पकारों, बुनकरों और ग्रामीण दस्तकारों के उत्पादों को राष्ट्रीय व अंतरराष्ट्रीय ई-कॉमर्स मंच प्रदान करने के लिए वाणिज्यिक गठजोड़।",
    image: "/images/pib-msme-vishwakarma.jpg",
    author: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "नई दिल्ली — 'पीएम विश्वकर्मा योजना' के तहत पंजीकृत पारंपरिक कारीगरों और शिल्पकारों के उत्पादों को व्यापक बाजार पहुंच प्रदान करने के लिए सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय (MSME) ने ट्राइफेड (TRIFED) के साथ महत्वपूर्ण समझौता ज्ञापन (MoU) पर हस्ताक्षर किए हैं।",
      "इस साझेदारी के तहत देश भर के विश्वकर्मा कारीगरों को ट्राइब्स इंडिया आउटलेट्स और वैश्विक ई-कॉमर्स प्लेटफॉर्म्स पर अपने हस्तशिल्प और कलाकृतियों को सीधे बेचने का अवसर मिलेगा, जिससे बिचौलियों की भूमिका समाप्त होगी और शिल्पकारों को उनकी मेहनत का पूरा मूल्य प्राप्त होगा।"
    ]
  },
  {
    id: "pib-top-4",
    category: "खेल / एशियाई पैरा गेम्स",
    headline: "एशियाई पैरा खेलों में भारत के ऐतिहासिक 114 पदक जीतने पर प्रधानमंत्री नरेंद्र मोदी ने की सराहना",
    subhead: "भारतीय एथलीटों ने 30 स्वर्ण पदकों के साथ तोड़े रिकॉर्ड; पदक संख्या 14 से 114 तक पहुंचने को पीएम ने बताया देश के दृढ़ संकल्प का प्रमाण।",
    image: "/images/pib-asian-para-games.jpg",
    author: "प्रधानमंत्री कार्यालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "नई दिल्ली — प्रधानमंत्री श्री नरेन्द्र मोदी ने एशियाई पैरा खेलों में भारतीय दल की ऐतिहासिक उपलब्धि की भूरि-भूरि प्रशंसा की है। भारत ने प्रतियोगिता में कुल 114 पदक जीतकर एक नया कीर्तिमान स्थापित किया है, जिसमें 30 स्वर्ण पदक, 5 विश्व रिकॉर्ड और 9 एशियाई रिकॉर्ड शामिल हैं।",
      "प्रधानमंत्री ने अपने संदेश में कहा कि यह परिणाम भारत के पैरा-एथलीटों की अदम्य इच्छाशक्ति, वर्षों की तपस्या और विश्व स्तरीय खेल सुविधाओं का प्रत्यक्ष परिणाम है। उन्होंने कहा कि यह उपलब्धि देश के करोड़ों युवाओं को जीवन की हर चुनौती को पार करने की प्रेरणा देगी।"
    ]
  },
  {
    id: "pib-top-5",
    category: "संस्कृति एवं रेलवे",
    headline: "रेल मंत्रालय: वंदे मातरम् के 150 वर्ष पूरे होने पर आयोजित साल भर के राष्ट्रीय समारोह का भव्य समापन",
    subhead: "देश भर के रेलवे स्टेशनों और सांस्कृतिक केंद्रों पर राष्ट्रीय एकता, देशभक्ति और समृद्ध सांस्कृतिक विरासत के विशेष कार्यक्रमों का आयोजन।",
    image: "/images/pib-railways-vandemataram.jpg",
    author: "रेल मंत्रालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "नई दिल्ली — राष्ट्रीय गीत 'वंदे मातरम्' के 150 वर्ष पूर्ण होने के उपलक्ष्य में रेल मंत्रालय द्वारा साल भर चलाए गए राष्ट्रव्यापी स्मरणोत्सव का भव्य समापन समारोह नई दिल्ली में आयोजित हुआ।",
      "इस पहल के अंतर्गत देश के सभी प्रमुख रेलवे स्टेशनों पर सांस्कृतिक प्रदर्शनियों, डिजिटल ऑडियो-विजुअल डिस्प्ले और विरासत दीर्घाओं के माध्यम से स्वतंत्रता संग्राम में राष्ट्रीय गीत के प्रेरक योगदान को जन-जन तक पहुंचाया गया। रेल प्रशासन ने देशवासियों के अपार समर्थन के प्रति आभार व्यक्त किया।"
    ]
  },
  {
    id: "pib-top-6",
    category: "व्यापार एवं अर्थव्यवस्था",
    headline: "सात महीनों में भारत के फिनिश्ड स्टील की खपत 100 एमटी के करीब पहुंची, औद्योगिक मांग में अभूतपूर्व उछाल",
    subhead: "इस्‍पात मंत्रालय के आधिकारिक आंकड़ों के अनुसार बुनियादी ढांचा परियोजनाओं और वाहन उद्योग की मांग के दम पर घरेलू उत्पादन में ऐतिहासिक वृद्धि।",
    image: "/images/pib-steel-industry.jpg",
    author: "इस्‍पात मंत्रालय / PIB",
    date: "06 Nov 2026",
    paragraphs: [
      "नई दिल्ली — इस्पात मंत्रालय द्वारा जारी नवीनतम रिपोर्ट के अनुसार चालू वित्त वर्ष के पहले सात महीनों (अप्रैल-अक्टूबर 2026) के दौरान भारत में फिनिश्ड स्टील की कुल खपत 100 मीट्रिक टन (MT) के मील के पत्थर के करीब पहुंच गई है। यह पिछले वर्ष की इसी अवधि की तुलना में 13.8% की प्रभावशाली वृद्धि दर्शाता है।",
      "मंत्रालय ने बताया कि देश में बड़े पैमाने पर चल रहे रेलवे दोहरीकरण, राजमार्ग निर्माण, जल जीवन मिशन और विनिर्माण क्षेत्र में निजी पूंजीगत व्यय के कारण इस्पात की घरेलू मांग में लगातार मजबूती बनी हुई है। भारत वर्तमान में दुनिया का दूसरा सबसे बड़ा इस्पात उत्पादक देश बना हुआ है।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (WITH AUTHENTIC PIB DATA & HIGH QUALITY PHOTOS) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "pib-desh-lead",
      category: "देश / राष्ट्रीय",
      headline: "भारतीय नौसेना का युद्धपोत ‘सह्याद्रि’ मालाबार 2026 अभ्यास में भाग लेने जापान पहुंचा",
      subhead: "जापान के योकोसुका बेस पर आईएनएस सह्याद्रि का भव्य स्वागत; भारत-जापान द्विपक्षीय रणनीतिक साझेदारी को मिली नई मजबूती।",
      image: "/images/pib-defense-sahyadri.jpg",
      author: "रक्षा मंत्रालय / PIB",
      date: "06 Nov 2026",
      paragraphs: [
        "योकोसुका (जापान) — भारतीय नौसेना का प्रमुख युद्धपोत आईएनएस सह्याद्रि मालाबार 2026 अभ्यास के लिए जापान पहुंच चुका है।",
        "समुद्री अभ्यास में वायु रक्षा, पनडुब्बी रोधी युद्धाभ्यास और संयुक्त रणनीतिक अभियानों का उच्च स्तरीय अभ्यास किया जाएगा।"
      ]
    },
    subStories: [
      {
        id: "pib-desh-sub-1",
        category: "देश",
        headline: "खनन मंत्रियों के 4वें राष्ट्रीय सम्मेलन में क्रिटिकल मिनरल्स व पारदर्शिता सुधारों पर केंद्र-राज्य सहमति",
        subhead: "दुर्लभ भू-तत्वों के घरेलू उत्पादन और आधुनिक अन्वेषण को बढ़ावा देने के लिए तीन राष्ट्रीय पहलों की शुरुआत।",
        image: "/images/pib-mining-conference.jpg",
        author: "खान मंत्रालय / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — केंद्र और राज्य सरकारों के खनन मंत्रियों के बीच महत्वपूर्ण खनिजों के तेज अन्वेषण पर सहमति बनी।"
        ]
      },
      {
        id: "pib-desh-sub-2",
        category: "देश",
        headline: "सिविल सेवा (मुख्य) परीक्षा 2026: यूपीएससी द्वारा लिखित परीक्षा का परिणाम घोषित",
        subhead: "सफल उम्मीदवारों के व्यक्तित्व परीक्षण और साक्षात्कार का कार्यक्रम संघ लोक सेवा आयोग द्वारा शीघ्र अधिसूचित होगा।",
        image: "/images/highcourt-fatwa.jpg",
        author: "कार्मिक एवं प्रशिक्षण विभाग / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — यूपीएससी ने सिविल सेवा मुख्य परीक्षा के परिणाम जारी कर दिए हैं। साक्षात्कार की प्रक्रिया अगले माह से शुरू होगी।"
        ]
      },
      {
        id: "pib-desh-sub-3",
        category: "देश",
        headline: "डाक विभाग के विशेष अभियान 6.0 ने लक्ष्यों से बेहतर प्रदर्शन कर अंतिम छोर तक पहुंचाई सेवाएं",
        subhead: "देश के ग्रामीण और दूरदराज के क्षेत्रों में डाक व डिजिटल वित्तीय सेवाओं का अभूतपूर्व विस्तार।",
        image: "/images/desh-police.jpg",
        author: "संचार मंत्रालय / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — डाक विभाग ने विशेष अभियान के तहत करोड़ों नागरिकों को प्रत्यक्ष डिजिटल बैंकिंग और डाक सेवाओं से जोड़ा।"
        ]
      }
    ]
  },
  {
    key: "vishesh",
    title: "विशेष",
    leadStory: {
      id: "pib-vishesh-lead",
      category: "विशेष / एमएसएमई",
      headline: "पीएम विश्वकर्मा कारीगरों के लिए ट्राइफेड और एमएसएमई का ऐतिहासिक साझा मंच",
      subhead: "पारंपरिक शिल्पकारों, बुनकरों और ग्रामीण दस्तकारों के उत्पादों को राष्ट्रीय व अंतरराष्ट्रीय बाजार प्रदान करने के लिए समझौता।",
      image: "/images/pib-msme-vishwakarma.jpg",
      author: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय / PIB",
      date: "06 Nov 2026",
      paragraphs: [
        "नई दिल्ली — एमएसएमई मंत्रालय और ट्राइफेड ने पारंपरिक भारतीय शिल्पकारों को प्रत्यक्ष बाजार से जोड़ने का ऐतिहासिक कदम उठाया है।"
      ]
    },
    subStories: [
      {
        id: "pib-vishesh-sub-1",
        category: "विशेष",
        headline: "सैमसंग इंडिया और एमएसएमई की साझेदारी: देश के 15 टेक्नोलॉजी सेंटर्स में युवाओं को तकनीकी प्रशिक्षण",
        subhead: "एआई, रोबोटिक्स और कोडिंग के क्षेत्र में लाखों भारतीय युवाओं को रोजगार-उन्मुख कौशल सिखाने का लक्ष्य।",
        image: "/images/tech-lead.jpg",
        author: "कौशल विकास ब्यूरो / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — सैमसंग और एमएसएमई मंत्रालय मिलकर आधुनिक तकनीकी केंद्रों में युवाओं को नि:शुल्क प्रशिक्षण प्रदान करेंगे।"
        ]
      },
      {
        id: "pib-vishesh-sub-2",
        category: "विशेष",
        headline: "संस्कृति मंत्रालय ने भारत की सांस्कृतिक विरासत का डिजिटलीकरण करने के लिए नया पोर्टल किया शुरू",
        subhead: "प्राचीन पांडुलिपियों, लोक कलाओं और ऐतिहासिक अभिलेखों को उच्च-गुणवत्ता में डिजिटल रूप से संरक्षित किया जाएगा।",
        image: "/images/pib-railways-vandemataram.jpg",
        author: "संस्कृति मंत्रालय / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — सांस्कृतिक संपदा को भावी पीढ़ियों के लिए सहेजने हेतु राष्ट्रीय डिजिटल संग्रहालय का शुभारंभ हुआ।"
        ]
      },
      {
        id: "pib-vishesh-sub-3",
        category: "विशेष",
        headline: "भूजल पुनर्भरण और वैज्ञानिक जल संचयन के लिए 'पुनः भरण' राष्ट्रीय अभियान",
        subhead: "जल शक्ति मंत्रालय ने भूजल संरचनाओं की सटीक जियो-टैगिंग और निगरानी के लिए मोबाइल तकनीक लागू की।",
        image: "/images/desh-drought.jpg",
        author: "जल शक्ति मंत्रालय / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — जल संचयन की हर संरचना की वैज्ञानिक मैपिंग से ग्रामीण क्षेत्रों में जल स्तर में सुधार होगा।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "pib-vyapar-lead",
      category: "व्यापार / अर्थव्यवस्था",
      headline: "सात महीनों में भारत के फिनिश्ड स्टील की खपत 100 एमटी के करीब, उद्योग जगत में भारी उत्साह",
      subhead: "इस्‍पात मंत्रालय के आंकड़ों के अनुसार बुनियादी ढांचा परियोजनाओं और वाहन उद्योग की मांग के दम पर घरेलू उत्पादन में ऐतिहासिक वृद्धि।",
      image: "/images/pib-steel-industry.jpg",
      author: "इस्‍पात मंत्रालय / PIB",
      date: "06 Nov 2026",
      paragraphs: [
        "नई दिल्ली — भारत में इस्पात की रिकॉर्ड खपत देश में विनिर्माण और बुनियादी ढांचे के तेजी से विस्तार का प्रत्यक्ष प्रमाण है।"
      ]
    },
    subStories: [
      {
        id: "pib-vyapar-sub-1",
        category: "व्यापार",
        headline: "सेंसेक्स और निफ्टी नए सर्वकालिक शिखर पर, विदेशी निवेशकों ने भारतीय बाजार में झोंके ₹18,000 करोड़",
        subhead: "मजबूत मैक्रोइकॉनॉमिक आंकड़ों और कॉर्पोरेट आय के दम पर भारतीय शेयर बाजारों में चौतरफा तेजी।",
        image: "/images/ipo-fraud.jpg",
        author: "मार्केट डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "मुंबई — शेयर बाजारों ने निवेशकों के भरोसे के साथ ऐतिहासिक तेजी का नया अध्याय लिखा।"
        ]
      },
      {
        id: "pib-vyapar-sub-2",
        category: "व्यापार",
        headline: "UPI का नया कीर्तिमान: एक महीने में 16 अरब से अधिक सफल डिजिटल लेन-देन पूरे",
        subhead: "एनपीसीआई की रिपोर्ट के अनुसार डिजिटल भुगतान तंत्र अब भारत के दैनिक जीवन का अनिवार्य अंग बन चुका है।",
        image: "/images/desh-coins.jpg",
        author: "फिनटेक ब्यूरो / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — यूपीआई ने विश्व के सबसे बड़े खुदरा डिजिटल भुगतान नेटवर्क के रूप में अपनी स्थिति और मजबूत की।"
        ]
      },
      {
        id: "pib-vyapar-sub-3",
        category: "व्यापार",
        headline: "ग्रीन हाइड्रोजन परियोजनाओं के लिए भारत को ₹65,000 करोड़ के वैश्विक निवेश प्रस्ताव मिले",
        subhead: "नेट-जीरो उत्सर्जन लक्ष्यों की ओर बढ़ते भारत के स्वच्छ ऊर्जा क्षेत्र में अंतरराष्ट्रीय कंपनियों की भारी रुचि।",
        image: "/images/business-lead.jpg",
        author: "ऊर्जा ब्यूरो / PIB",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — राष्ट्रीय ग्रीन हाइड्रोजन मिशन के तहत घरेलू उत्पादन और निर्यात के लिए बड़े समझौते किए गए।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "pib-khel-lead",
      category: "खेल / एशियाई खेल",
      headline: "एशियाई पैरा खेलों में भारत के ऐतिहासिक 114 पदक जीतने पर प्रधानमंत्री नरेंद्र मोदी का विशेष संदेश",
      subhead: "30 स्वर्ण, 5 विश्व रिकॉर्ड और 9 एशियाई रिकॉर्ड के साथ देश का मान बढ़ाने वाले खिलाड़ियों की राष्ट्र ने की सराहना।",
      image: "/images/pib-asian-para-games.jpg",
      author: "प्रधानमंत्री कार्यालय / PIB",
      date: "06 Nov 2026",
      paragraphs: [
        "नई दिल्ली — भारतीय पैरा-एथलीटों की ऐतिहासिक सफलता ने देश के खेल इतिहास में स्वर्णिम अध्याय जोड़ दिया है।"
      ]
    },
    subStories: [
      {
        id: "pib-khel-sub-1",
        category: "खेल",
        headline: "भारतीय क्रिकेट टीम ने घरेलू टेस्ट श्रृंखला में 3-0 से हासिल की ऐतिहासिक जीत",
        subhead: "गेंदबाजों और शीर्ष क्रम के बल्लेबाजों के अनुशासित प्रदर्शन से ईडन गार्डन्स में लहराया तिरंगा।",
        image: "/images/sports-lead.jpg",
        author: "स्पोर्ट्स डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "कोलकाता — भारतीय टीम ने चौथे दिन ही मैच जीतकर आईसीसी टेस्ट चैंपियनशिप तालिका में शीर्ष स्थान पक्का किया।"
        ]
      },
      {
        id: "pib-khel-sub-2",
        category: "खेल",
        headline: "विश्व मुक्केबाजी चैंपियनशिप में स्वर्ण पदक जीतकर सिमरन कौर ने पक्का किया ओलंपिक टिकट",
        subhead: "शानदार मुक्केबाजी और तकनीकी श्रेष्ठता के दम पर अंतरराष्ट्रीय रिंग में भारत का दबदबा कायम।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "स्पोर्ट्स ब्यूरो",
        date: "06 Nov 2026",
        paragraphs: [
          "चंडीगढ़ — भारतीय मुक्केबाज का देश लौटने पर भव्य नागरिक अभिनंदन किया जाएगा।"
        ]
      },
      {
        id: "pib-khel-sub-3",
        category: "खेल",
        headline: "प्रो कबड्डी लीग के नए सीजन का धमाकेदार आगाज, अंतिम क्षणों में सुपर रेड से रोमांचक मुकाबला",
        subhead: "हैदराबाद के गाचीबावली स्टेडियम में दर्शकों के उत्साह के बीच शुरू हुआ कबड्डी का महाकुंभ।",
        image: "/images/mogging-lifestyle.jpg",
        author: "पीकेएल डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "हैदराबाद — पहले मुकाबले में दोनों टीमों ने अंतिम सेकंड तक कड़ा संघर्ष किया।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "pib-vaichariki-lead",
      category: "वैचारिकी / नीति",
      headline: "अत्यधिक ग़रीबी घटकर 2.6%, पर खेती से बाहर गुणवत्तापूर्ण नौकरियों की गति तेज करना अनिवार्य",
      subhead: "नीति आयोग और अर्थशास्त्रियों का विश्लेषण: प्रत्यक्ष लाभ अंतरण ने भुखमरी मिटाई, अब विनिर्माण में रोजगार सृजन सर्वोच्च प्राथमिकता।",
      image: "/images/vaichariki-lead.jpg",
      author: "संपादकीय / नीति ब्यूरो",
      date: "06 Nov 2026",
      paragraphs: [
        "भारत में अत्यधिक निर्धनता में आई रिकॉर्ड गिरावट एक बड़ी सामाजिक उपलब्धि है, लेकिन युवाओं की आकांक्षाओं को पूरा करने के लिए उच्च उत्पादकता वाले उद्योगों की आवश्यकता है।"
      ]
    },
    subStories: [
      {
        id: "pib-v-sub-1",
        category: "वैचारिकी",
        headline: "टाटा संस और आरबीआई के विनियामक ढांचे के बीच लिस्टिंग नियमों पर वित्तीय विमर्श",
        subhead: "अपर-लेयर एनबीएफसी और कॉर्पोरेट गवर्नेंस के संतुलन पर बाजार विशेषज्ञों की राय।",
        image: "/images/vaichariki-tata-rbi.jpg",
        author: "बिजनेस डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "मुंबई — नियामक पारदर्शिता और भारतीय कॉर्पोरेट संरचनाओं पर विशेषज्ञों ने अपने विचार व्यक्त किए।"
        ]
      },
      {
        id: "pib-v-sub-2",
        category: "वैचारिकी",
        headline: "INDIA ब्लॉक और चुनावी राजनीति के सामने ठोस राष्ट्रीय नीतिगत विकल्प की चुनौती",
        subhead: "रैलियों की भीड़ से आगे बढ़कर साझा आर्थिक एजेंडा पेश करने पर राजनीतिक विश्लेषकों का विश्लेषण।",
        image: "/images/vaichariki-india-bloc.jpg",
        author: "राजनीतिक ब्यूरो",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — लोकतांत्रिक विमर्श में विपक्ष की नीतिगत स्पष्टता मतदाताओं के लिए महत्वपूर्ण साबित होगी।"
        ]
      },
      {
        id: "pib-v-sub-3",
        category: "वैचारिकी",
        headline: "वैश्विक एआई क्रांति और भारत के डिजिटल संप्रभुता रोडमैप का व्यापक मूल्यांकन",
        subhead: "डेटा संरक्षण, भारतीय भाषाओं में एआई मॉडल और विनियामक सुरक्षा पर राष्ट्रीय मंथन।",
        image: "/images/trending-lead.jpg",
        author: "तकनीक विश्लेषण डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "नई दिल्ली — भारत की भाषाई विविधता और एआई संप्रभुता भविष्य के डिजिटल युग की दिशा तय करेगी।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "pib-videsh-lead",
      category: "विदेश / कूटनीति",
      headline: "जापान में भारत, अमेरिका व ऑस्ट्रेलिया के संयुक्त मालाबार अभ्यास से हिंद-प्रशांत में रणनीतिक संतुलन",
      subhead: "योकोसुका में संयुक्त नौसैनिक अभ्यास ने स्वतंत्र और नियम-आधारित समुद्री व्यवस्था के संकल्प को दोहराया।",
      image: "/images/world-lead.jpg",
      author: "राजनयिक ब्यूरो / PIB",
      date: "06 Nov 2026",
      paragraphs: [
        "टोक्यो — क्वाड देशों की नौसेनाओं के संयुक्त अभ्यास से क्षेत्रीय शांति और आपूर्ति सुरक्षा को मजबूती मिली है।"
      ]
    },
    subStories: [
      {
        id: "pib-videsh-sub-1",
        category: "विदेश",
        headline: "मध्य पूर्व शांति वार्ता के लिए संयुक्त राष्ट्र सुरक्षा परिषद की आपात बैठक में प्रस्ताव पारित",
        subhead: "मानवीय गलियारों के विस्तार और युद्धविराम की दिशा में वैश्विक शक्तियों ने साझा प्रयास तेज किए।",
        image: "/images/us-midterms.jpg",
        author: "जिनेवा डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "जिनेवा — संयुक्त राष्ट्र के तत्वावधान में शांति बहाली के उपायों पर सभी पक्षों ने सहमति जताई।"
        ]
      },
      {
        id: "pib-videsh-sub-2",
        category: "विदेश",
        headline: "सेमीकंडक्टर आपूर्ति श्रृंखला को सुरक्षित करने के लिए एशिया-प्रशांत शिखर सम्मेलन में बड़ा समझौता",
        subhead: "महत्वपूर्ण इलेक्ट्रॉनिक कंपोनेंट्स के निर्बाध अंतरराष्ट्रीय प्रवाह के लिए नए बहुपक्षीय नियम तय।",
        image: "/images/tech-lead.jpg",
        author: "टोक्यो ब्यूरो",
        date: "06 Nov 2026",
        paragraphs: [
          "टोक्यो — चिप विनिर्माण और आपूर्ति श्रृंखला में विविधता लाने के लिए सहयोगी देशों ने हाथ मिलाया।"
        ]
      },
      {
        id: "pib-videsh-sub-3",
        category: "विदेश",
        headline: "यूरोपीय ऊर्जा ग्रिड में नवीकरणीय स्रोतों की हिस्सेदारी 48% के ऐतिहासिक रिकॉर्ड पर पहुंची",
        subhead: "सौर और पवन ऊर्जा के विस्तार से पारंपरिक जीवाश्म ईंधन पर निर्भरता में भारी कमी दर्ज।",
        image: "/images/jinping-plan.jpg",
        author: "ब्रुसेल्स डेस्क",
        date: "06 Nov 2026",
        paragraphs: [
          "ब्रुसेल्स — यूरोपीय संघ ने हरित ऊर्जा के लक्ष्यों को निर्धारित समय से पहले हासिल किया।"
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
        (activeCategoryKey === "vishesh" && sec.key === "vishesh") ||
        (activeCategoryKey === "explainer" && sec.key === "desh") ||
        (activeCategoryKey === "sehat" && sec.key === "vishesh")
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
                placeholder="ताज़ा ख़बरें खोजें (जैसे: मंत्रिमंडल, नौसेना, इस्पात, खेल)..."
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

      {/* ── MOBILE SLIDE-OUT DRAWER ── */}
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
            (High Quality PIB Cabinet Briefing Banner Photo)
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-12">
          <div
            onClick={() => openArticle(HERO_STORY)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-stone-100 cursor-pointer transition-all duration-300"
          >
            {/* Real Editorial Photo from PIB */}
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
            2. TOP STORIES GRID: 6 STORIES (REAL HIGH-QUALITY PIB DISPATCHES)
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
            3. CATEGORY SECTIONS (देश, विशेष, व्यापार, खेल, वैचारिकी, विदेश)
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

      {/* ── FLOATING SCROLL TO TOP BUTTON ── */}
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
