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

// ── 1. HERO LEAD STORY: LATEEF BHAT KILLED IN KULGAM (News Pack 18 Nov 2026) ──
const HERO_STORY: StoryItem = {
  id: "hero-lateef-bhat-kulgam",
  category: "देश / जम्मू-कश्मीर सुरक्षा",
  headline: "कुलगाम में सुरक्षाबलों की ऐतिहासिक सफलता: लश्कर कमांडर लतीफ भट मुठभेड़ में ढेर; कश्मीर का 'अंतिम स्थानीय आतंकी' निष्प्रभावी",
  subhead: "11 नवंबर के सीआरपीएफ हमले में था वांछित; ज़ंगलपोरा की मस्जिद में शरण लेने के बाद सुरक्षाबलों ने आंसू गैस से निकाला बाहर; आत्मसमर्पण से इनकार के बाद मारा गया।",
  image: "/images/lateef_bhat_kulgam.jpg",
  author: "सुरक्षा ब्यूरो / श्रीनगर",
  date: "18 Nov 2026",
  paragraphs: [
    "श्रीनगर — जम्मू-कश्मीर में सुरक्षाबलों ने आतंकवाद के खिलाफ निर्णायक सफलता हासिल करते हुए लश्कर-ए-तैयबा के कुख्यात कमांडर मोहम्मद लतीफ भट को कुलगाम के ज़ंगलपोरा में एक भीषण मुठभेड़ में मार गिराया है। पुलिस और सुरक्षा एजेंसियों के अनुसार लतीफ भट कश्मीर घाटी का अंतिम सक्रिय स्थानीय आतंकवादी था।",
    "लतीफ भट हाल ही में 11 नवंबर को कुलगाम के मीरबाजार में सीआरपीएफ चेकपॉइंट पर हुए घातक हमले का मुख्य षड्यंत्रकारी था, जिसमें सुरक्षाबल के जवान घायल हुए थे। मुठभेड़ के दौरान आतंकी ने ज़ंगलपोरा की एक स्थानीय मस्जिद में शरण ले रखी थी। सुरक्षाबलों ने धार्मिक स्थल की पवित्रता को बचाए रखते हुए संयम बरता और उसे आत्मसमर्पण के कई अवसर दिए।",
    "जब उसने गोलीबारी जारी रखी, तब सुरक्षाबलों ने मस्जिद को बिना किसी क्षति के सुरक्षित रखने के लिए आंसू गैस के गोलों का प्रयोग किया और बाहर निकलते ही उसे सटीक मुठभेड़ में ढेर कर दिया। इससे पूर्व उसका एक अन्य सहयोगी भी मारा गया था। इस सफलता के साथ ही घाटी में स्थानीय आतंकवाद की रीढ़ पूरी तरह टूट गई है।"
  ]
};

// ── 2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (News Pack 18 Nov 2026) ──
const TOP_STORIES: StoryItem[] = [
  {
    id: "top-dhoni-retires-ipl",
    category: "खेल / आईपीएल २०२७",
    headline: "एक स्वर्णिम युग का समापन: महेंद्र सिंह धोनी ने आईपीएल के खेल करियर से लिया संन्यास; सीएसके ने मेंटॉर नियुक्त किया",
    subhead: "18 वर्षों के गौरवशाली सफर के बाद 'थाला' ने छोड़ी पीली जर्सी; चेन्नई सुपर किंग्स को 5 बार चैंपियन बनाने वाले दिग्गज की नंबर 7 जर्सी हमेशा के लिए होगी रिटायर।",
    image: "/images/dhoni_retire.jpg",
    author: "स्पोर्ट्सस्टार / खेल ब्यूरो",
    date: "18 Nov 2026",
    paragraphs: [
      "चेन्नई — भारतीय क्रिकेट और आईपीएल के सबसे चहेते खिलाड़ी महेंद्र सिंह धोनी ने इंडियन प्रीमियर लीग 2027 की रिटेंशन समयसीमा के दिन अपने 18 साल लंबे खेल करियर को आधिकारिक रूप से अलविदा कह दिया है।",
      "चेन्नई सुपर किंग्स (CSK) प्रबंधन ने घोषणा की है कि धोनी आगामी सत्र में टीम के मुख्य मेंटॉर के रूप में डगआउट में मार्गदर्शक की भूमिका निभाएंगे। फ्रेंचाइजी ने उनके सम्मान में उनकी प्रतिष्ठित जर्सी नंबर '7' को हमेशा के लिए रिटायर करने का ऐतिहासिक निर्णय लिया है। धोनी ने अपनी कप्तानी में सीएसके को रिकॉर्ड 5 आईपीएल खिताब और 2 चैंपियंस लीग ट्रॉफियां दिलाई हैं।"
    ]
  },
  {
    id: "top-cyclone-akvan-alert",
    category: "मौसम / आपदा चेतावनी",
    headline: "भीषण चक्रवाती तूफान 'अकवन' का खतरा: 20 नवंबर को आंध्र तट से टकराएगा; 145 किमी/घंटा की तूफानी हवाओं का रेड अलर्ट",
    subhead: "बंगाल की खाड़ी में तेजी से गहराया दबाव; नेल्लोर और विशाखापट्टनम के बीच दोपहर में लैंडफॉल की आशंका; आंध्र व दक्षिण ओडिशा में राहत दल तैनात।",
    image: "/images/cyclone_akvan.jpg",
    author: "मौसम ब्यूरो / नई दिल्ली",
    date: "18 Nov 2026",
    paragraphs: [
      "नई दिल्ली — भारत मौसम विज्ञान विभाग (IMD) ने बंगाल की खाड़ी के ऊपर सक्रिय चक्रवाती तूफान 'अकवन' (Cyclone Akvan) को लेकर गंभीर चेतावनी जारी की है। यह तूफान अत्यंत भीषण चक्रवात का रूप धारण कर चुका है और तेजी से उत्तर-पश्चिम दिशा की ओर बढ़ रहा है।",
      "मौसम वैज्ञानिकों के अनुसार चक्रवात अकवन 20 नवंबर की दोपहर नेल्लोर और विशाखापट्टनम के तटीय इलाकों को 120-130 किमी प्रति घंटे की निरंतर रफ्तार और 145 किमी प्रति घंटे के झोंकों के साथ पार करेगा। आंध्र प्रदेश के सभी तटीय जिलों और दक्षिण ओडिशा में ऑरेंज व रेड अलर्ट जारी कर एनडीआरएफ की 30 से अधिक टीमें तैनात कर दी गई हैं।"
    ]
  },
  {
    id: "top-nvidia-huang-return-signal",
    category: "तकनीक / वैश्विक व्यापार",
    headline: "एनवीडिया में अप्रत्याशित मोड़: जेनसन हुआंग ने दिए सीईओ पद पर वापसी के संकेत; डोनाल्ड ट्रंप ने भी किया खुला समर्थन",
    subhead: "कहा- यदि बोर्ड, शेयरधारकों और अमेरिका के हित में होगा तो लौटूंगा; नैस्डैक पर टेक शेयरों में अचानक लौटी भारी हरियाली।",
    image: "/images/nvidia_huang.jpg",
    author: "द हिंदू / रॉयटर्स / सैन फ्रांसिस्को",
    date: "18 Nov 2026",
    paragraphs: [
      "सैन फ्रांसिस्को — कथित जासूसी और निजी विवाद के बाद एनवीडिया के शीर्ष पद से इस्तीफा देने वाले सह-संस्थापक जेनसन हुआंग ने कंपनी में अपनी वापसी को लेकर बड़ा बयान दिया है। सोशल मीडिया पर जारी एक बयान में हुआंग ने कहा कि यदि निदेशक मंडल यह निर्णय लेता है कि उनकी वापसी शेयरधारकों, कर्मचारियों, कंपनी और अमेरिका के हित में है, तो वे यह जिम्मेदारी दोबारा संभालने के लिए तैयार हैं।",
      "अमेरिकी राष्ट्रपति डोनाल्ड ट्रंप ने भी सार्वजनिक रूप से हुआंग का समर्थन करते हुए कहा कि अमेरिकी तकनीकी प्रभुत्व के लिए हुआंग का नेतृत्व आवश्यक है। इस बयान के सामने आते ही वॉल स्ट्रीट पर एनवीडिया के शेयरों में 7% की जोरदार छलांग देखी गई।"
    ]
  },
  {
    id: "top-modi-asean-quad-manila",
    category: "विदेश नीति / कूटनीति",
    headline: "मनीला में आसियान-क्वाड शिखर सम्मेलन: प्रधानमंत्री मोदी ने शांति, स्थिरता और समुद्री सुरक्षा का किया पुरजोर आह्वान",
    subhead: "आसियान पर्यटकों के लिए मुफ्त ई-वीजा की पेशकश; महत्वपूर्ण खनिजों की सुरक्षित आपूर्ति श्रृंखला और नियम-आधारित हिंद-प्रशांत पर दिया जोर।",
    image: "/images/pib-cabinet-national.jpg",
    author: "राजनयिक ब्यूरो / मनीला",
    date: "18 Nov 2026",
    paragraphs: [
      "मनीला (फिलीपींस) — प्रधानमंत्री श्री नरेन्द्र मोदी ने मनीला में आयोजित 23वें आसियान-भारत शिखर सम्मेलन, पूर्वी एशिया शिखर सम्मेलन और क्वाड नेताओं की उच्चस्तरीय बैठक में भाग लिया। सम्मेलन को संबोधित करते हुए प्रधानमंत्री ने हिंद-प्रशांत क्षेत्र में शांति, स्थिरता और अंतरराष्ट्रीय कानूनों की सर्वोच्चता पर बल दिया।",
      "प्रधानमंत्री ने आसियान देशों के नागरिकों के लिए भारत यात्रा को और सुगम बनाने के उद्देश्य से मुफ्त पर्यटक ई-वीजा (Free Tourist e-Visa) योजना की घोषणा की। साथ ही सेमीकंडक्टर और स्वच्छ ऊर्जा के लिए आवश्यक क्रिटिकल मिनरल्स की आपूर्ति को सुरक्षित रखने के लिए बहुपक्षीय साझेदारी का खाका पेश किया।"
    ]
  },
  {
    id: "top-crimean-bridge-strike",
    category: "अंतर्राष्ट्रीय / युद्ध परिदृश्य",
    headline: "शी-पुतिन-ट्रंप की बैठक से ठीक पहले यूक्रेन का भीषण हमला: क्रीमिया को रूस से जोड़ने वाले कर्च ब्रिज को भारी नुकसान",
    subhead: "ड्रोन और मिसाइल स्ट्राइक से पुल का रणनीतिक हिस्सा ध्वस्त; ज़ेलेंस्की ने बताया अभूतपूर्व ऑपरेशन; एशिया में होने वाली त्रिपक्षीय वार्ता से पहले तनाव चरम पर।",
    image: "/images/world-lead.jpg",
    author: "वैश्विक डेस्क / कीव",
    date: "18 Nov 2026",
    paragraphs: [
      "कीव — यूक्रेन की विशेष सेनाओं ने रात के अंधेरे में एक अत्यंत सुनियोजित और बड़े ऑपरेशन में रूस और कब्जे वाले क्रीमिया प्रायद्वीप को जोड़ने वाले रणनीतिक कर्च ब्रिज (Kerch Bridge) पर दर्जनों लंबी दूरी के ड्रोनों और क्रूज मिसाइलों से हमला कर दिया।",
      "यूक्रेनी राष्ट्रपति वोलोदिमिर ज़ेलेंस्की ने इसे ऐतिहासिक ऑपरेशन बताते हुए कहा कि रूसी सैन्य रसद आपूर्ति को पंगु बना दिया गया है। यह बड़ा हमला ठीक उस समय हुआ है जब अमेरिकी राष्ट्रपति ट्रंप मनीला से चीन रवाना हो रहे हैं, जहां राष्ट्रपति शी जिनपिंग और व्लादिमीर पुतिन के साथ उच्चस्तरीय त्रिपक्षीय शांति बैठक प्रस्तावित है।"
    ]
  },
  {
    id: "top-india-pakistan-saff-win",
    category: "खेल / फुटबॉल",
    headline: "सैफ चैंपियनशिप के फाइनल में भारत की शानदार जीत: पाकिस्तान को 2-1 से हराकर 10वीं बार जीता ऐतिहासिक खिताब",
    subhead: "हाफ-टाइम तक 0-1 से पिछड़ने के बाद भारतीय टीम ने की जबर्दस्त वापसी; सुनील छेत्री और युवा फॉरवर्ड ने दागे निर्णायक गोल।",
    image: "/images/vaichariki-mbappe.jpg",
    author: "फुटबॉल ब्यूरो / ढाका",
    date: "18 Nov 2026",
    paragraphs: [
      "ढाका — दक्षिण एशियाई फुटबॉल महासंघ (SAFF) चैंपियनशिप के बेहद रोमांचक और हाई-वोल्टेज फाइनल मुकाबले में भारतीय पुरुष फुटबॉल टीम ने चिर-प्रतिद्वंद्वी पाकिस्तान को 2-1 से पराजित कर 10वीं बार प्रतिष्ठित खिताब अपने नाम कर लिया।",
      "मैच के पहले हाफ में पाकिस्तानी टीम 1-0 से आगे थी, लेकिन दूसरे हाफ में भारतीय खिलाड़ियों ने आक्रामक खेल दिखाते हुए मात्र 12 मिनट के अंतराल में दो शानदार मैदानी गोल दागकर मैच का पासा पलट दिया। इस ऐतिहासिक जीत के साथ ही भारत ने दक्षिण एशियाई फुटबॉल में अपनी बादशाहत कायम रखी।"
    ]
  }
];

// ── 3. CATEGORY SECTIONS (देश, विदेश, खेल, व्यापार, वैचारिकी) ──
const CATEGORY_SECTIONS: CategorySection[] = [
  {
    key: "desh",
    title: "देश",
    leadStory: {
      id: "desh-lateef-bhat-encounter",
      category: "देश / जम्मू-कश्मीर सुरक्षा",
      headline: "कुलगाम में सुरक्षाबलों की बड़ी सफलता: लश्कर कमांडर लतीफ भट मुठभेड़ में ढेर; कश्मीर का 'अंतिम स्थानीय आतंकी' निष्प्रभावी",
      subhead: "11 नवंबर के सीआरपीएफ हमले में था वांछित; ज़ंगलपोरा की मस्जिद में छिपा था; आत्मसमर्पण से इनकार के बाद सुरक्षाबलों ने मार गिराया।",
      image: "/images/lateef_bhat_kulgam.jpg",
      author: "सुरक्षा संवाददाता / श्रीनगर",
      date: "18 Nov 2026",
      paragraphs: [
        "श्रीनगर — दक्षिण कश्मीर के कुलगाम जिले में सुरक्षाबलों के साथ मुठभेड़ में लश्कर-ए-तैयबा का खूंखार कमांडर लतीफ भट मारा गया। अधिकारियों के अनुसार इसके साथ ही कश्मीर में सक्रिय स्थानीय आतंकियों की संख्या अब शून्य हो गई है।",
        "स्थानीय मस्जिद की मर्यादा का पूरा सम्मान करते हुए सुरक्षाबलों ने पहले आंसू गैस का उपयोग कर आतंकी को बाहर निकाला और जवाबी फायरिंग में उसे मार गिराया।"
      ]
    },
    subStories: [
      {
        id: "desh-cyclone-akvan-preparations",
        category: "देश / आपदा प्रबंधन",
        headline: "भीषण चक्रवात 'अकवन' का खतरा: 20 नवंबर को आंध्र तट से टकराएगा; 145 किमी/घंटा की रफ्तार से हवाएं, अलर्ट जारी",
        subhead: "नेल्लोर और विशाखापट्टनम के बीच लैंडफॉल; एनडीआरएफ की टीमें तटीय इलाकों में तैनात, मछुआरों को समुद्र में न जाने की सलाह।",
        image: "/images/cyclone_akvan.jpg",
        author: "मौसम ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "विशाखापट्टनम — चक्रवात अकवन के चलते आंध्र प्रदेश के संवेदनशील तटीय इलाकों से नागरिकों को सुरक्षित शिविरों में पहुंचाने का कार्य शुरू हो गया है।"
        ]
      },
      {
        id: "desh-army-regimental-uniform",
        category: "देश / रक्षा",
        headline: "भारतीय सेना ने वरिष्ठ अधिकारियों के लिए सामान्य वर्दी का नियम वापस लिया; रेजिमेंटल पहचान और बैज बहाल",
        subhead: "ब्रिगेडियर और उससे ऊपर के रैंक के अधिकारियों के लिए पारंपरिक रेजिमेंटल पहचान, बेल्ट और हेडगियर को पुन: मंजूरी।",
        image: "/images/pib-defense-sahyadri.jpg",
        author: "रक्षा ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "नई दिल्ली — भारतीय सेना ने अपने पुराने फैसले की समीक्षा करते हुए वरिष्ठ सैन्य अधिकारियों के लिए विशिष्ट रेजिमेंटल पहचान को दोबारा बहाल कर दिया है।"
        ]
      },
      {
        id: "desh-delhi-aqi-moderate-improvement",
        category: "देश / पर्यावरण",
        headline: "दिल्ली की वायु गुणवत्ता में सुधार, AQI 200 के करीब 'मध्यम' श्रेणी में; ग्रैप-3 हटा, सभी स्कूल फिर से खुले",
        subhead: "तेज उत्तर-पश्चिमी हवाओं ने छांटी स्मॉग की चादर; ग्रैप स्टेज-1 और 2 की सावधानियां जारी, निर्माण कार्यों को मिली सशर्त छूट।",
        image: "/images/delhi_aqi.jpg",
        author: "पर्यावरण डेस्क",
        date: "18 Nov 2026",
        paragraphs: [
          "नई दिल्ली — राष्ट्रीय राजधानी में हवा की गति बढ़ने से प्रदूषण स्तर में उल्लेखनीय सुधार हुआ है, जिसके बाद ग्रैप के तीसरे चरण की कड़ी पाबंदियां हटा ली गई हैं।"
        ]
      }
    ]
  },
  {
    key: "videsh",
    title: "विदेश",
    leadStory: {
      id: "videsh-nvidia-huang-return-prospects",
      category: "विदेश / तकनीक एवं व्यापार",
      headline: "एनवीडिया में नया मोड़: जेनसन हुआंग ने दिए सीईओ पद पर वापसी के संकेत; डोनाल्ड ट्रंप ने भी किया खुला समर्थन",
      subhead: "कहा- यदि बोर्ड, शेयरधारकों और अमेरिका के हित में होगा तो लौटूंगा; नैस्डैक पर टेक शेयरों में अचानक लौटी हरियाली।",
      image: "/images/nvidia_huang.jpg",
      author: "अंतरराष्ट्रीय डेस्क / वॉशिंगटन",
      date: "18 Nov 2026",
      paragraphs: [
        "सैन फ्रांसिस्को — इस्तीफा देने के कुछ ही दिनों बाद एनवीडिया के संस्थापक जेनसन हुआंग ने संकेत दिए हैं कि बोर्ड की सहमति मिलने पर वे पुनः कमान संभाल सकते हैं।",
        "राष्ट्रपति ट्रंप के खुले समर्थन के बाद निवेशकों का भरोसा तेजी से लौटा है और वैश्विक सेमीकंडक्टर बाजार में जोरदार रिकवरी दर्ज की गई है।"
      ]
    },
    subStories: [
      {
        id: "videsh-kerch-bridge-strike",
        category: "विदेश / युद्ध परिदृश्य",
        headline: "शी-पुतिन-ट्रंप की ऐतिहासिक बैठक से पहले यूक्रेन का बड़ा हमला: क्रीमिया के कर्च पुल को भारी नुकसान",
        subhead: "ड्रोन और मिसाइल हमले से पुल का रणनीतिक ढांचा क्षतिग्रस्त; रूस की रसद आपूर्ति लाइनों पर गहरा असर।",
        image: "/images/world-lead.jpg",
        author: "यूरोप ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "कीव — यूक्रेन ने उच्चस्तरीय कूटनीतिक वार्ताओं से ठीक पहले क्रीमिया पुल को निशाना बनाकर अपना कड़ा रणनीतिक संदेश दिया है।"
        ]
      },
      {
        id: "videsh-us-iran-skirmish",
        category: "विदेश / मध्य पूर्व",
        headline: "अमेरिका और ईरान के बीच सैन्य झड़प: बहरीन में अमेरिकी रडार पर हमला, जवाब में अमेरिका ने ईरानी द्वीप को बनाया निशाना",
        subhead: "आईआरजीसी ने शेख ईसा बेस पर ड्रोन हमले की जिम्मेदारी ली; अमेरिका ने होर्मुज जलडमरूमध्य में केशम द्वीप पर दागीं मिसाइलें।",
        image: "/images/highcourt-fatwa.jpg",
        author: "पश्चिम एशिया डेस्क",
        date: "18 Nov 2026",
        paragraphs: [
          "दुबई — फारस की खाड़ी में दोनों देशों के बीच हुए ताजा मिसाइल हमलों के बाद समूचे खाड़ी क्षेत्र में सुरक्षा अलर्ट घोषित कर दिया गया है।"
        ]
      },
      {
        id: "videsh-trump-china-summit-bound",
        category: "विदेश / कूटनीति",
        headline: "मनीला में आसियान-क्वाड शिखर सम्मेलन के बाद चीन रवाना होंगे राष्ट्रपति ट्रंप; यूक्रेन और वैश्विक व्यापार पर महामंथन",
        subhead: "बीजिंग में शी जिनपिंग और व्लादिमीर पुतिन के साथ प्रस्तावित त्रिपक्षीय बैठक पर टिकी दुनिया की निगाहें।",
        image: "/images/trending-lead.jpg",
        author: "डिप्लोमैटिक संवाददाता",
        date: "18 Nov 2026",
        paragraphs: [
          "मनीला — अमेरिकी राष्ट्रपति ट्रंप एशियाई सहयोगियों के साथ महत्वपूर्ण बैठकें पूरी करने के बाद त्रिपक्षीय शिखर वार्ता के लिए चीन रवाना हो रहे हैं।"
        ]
      }
    ]
  },
  {
    key: "khel",
    title: "खेल",
    leadStory: {
      id: "khel-dhoni-ipl-farewell-mentor",
      category: "खेल / क्रिकेट",
      headline: "एक स्वर्णिम युग का समापन: महेंद्र सिंह धोनी ने आईपीएल के खेल करियर से लिया संन्यास; सीएसके ने मेंटॉर नियुक्त किया",
      subhead: "18 साल के शानदार सफर के बाद 'थाला' ने छोड़ी जर्सी; 5 बार चैंपियन बनाने वाले कप्तान की नंबर 7 जर्सी हमेशा के लिए रिटायर होगी।",
      image: "/images/dhoni_retire.jpg",
      author: "स्पोर्ट्स डेस्क / चेन्नई",
      date: "18 Nov 2026",
      paragraphs: [
        "चेन्नई — आईपीएल के सबसे सफल कप्तानों में शुमार एमएस धोनी ने मैदान पर अपनी पारी समाप्त करने का फैसला किया है। अब वे चेन्नई सुपर किंग्स के डगआउट से नए खिलाड़ियों को तराशेंगे।",
        "सीएसके के मुख्य कार्यकारी अधिकारी ने कहा कि जर्सी नंबर 7 हमेशा धोनी की अमिट विरासत का प्रतीक रहेगी और इसे किसी अन्य खिलाड़ी को नहीं सौंपा जाएगा।"
      ]
    },
    subStories: [
      {
        id: "khel-ind-nz-wellington-test",
        category: "खेल / टेस्ट क्रिकेट",
        headline: "वेलिंगटन में भारत-न्यूजीलैंड टेस्ट सीरीज का आगाज: हरी पिच पर जसप्रीत बुमराह की घातक वापसी; WTC फाइनल की जंग",
        subhead: "भारत ने टॉस जीतकर पहले गेंदबाजी चुनी; बेसिन रिजर्व की हवादार परिस्थितियों में तेज गेंदबाजों की अग्निपरीक्षा।",
        image: "/images/sports-lead.jpg",
        author: "क्रिकेट संवाददाता",
        date: "18 Nov 2026",
        paragraphs: [
          "वेलिंगटन — विश्व टेस्ट चैंपियनशिप के फाइनल की दौड़ में बने रहने के लिए भारतीय टीम ने वेलिंगटन टेस्ट में मजबूत शुरुआत की है।"
        ]
      },
      {
        id: "khel-saff-india-champions-pakistan",
        category: "खेल / फुटबॉल",
        headline: "सैफ चैंपियनशिप फाइनल: भारत ने पाकिस्तान को 2-1 से हराकर रचा इतिहास; 10वीं बार जीता खिताब",
        subhead: "पहले हाफ में पिछड़ने के बाद दूसरे हाफ में दागे दो शानदार गोल; ढाका के नेशनल स्टेडियम में तिरंगा लहराया।",
        image: "/images/vaichariki-mbappe.jpg",
        author: "फुटबॉल डेस्क",
        date: "18 Nov 2026",
        paragraphs: [
          "ढाका — भारतीय फुटबॉल टीम ने शानदार खेल भावना और जुझारूपन का प्रदर्शन करते हुए पाकिस्तान को धूल चटाई और 10वां सैफ खिताब जीता।"
        ]
      },
      {
        id: "khel-satwik-chirag-hongkong-thriller",
        category: "खेल / बैडमिंटन",
        headline: "हांगकांग ओपन में सात्विक-चिराग का चमत्कार: 4 मैच प्वाइंट बचाकर रोमांचक मुकाबले में दर्ज की यादगार जीत",
        subhead: "शुरुआती दौर के कड़े मैच में मलेशियाई जोड़ी को हराकर क्वार्टरफाइनल में प्रवेश किया।",
        image: "/images/pib-asian-para-games.jpg",
        author: "बैडमिंटन ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "हांगकांग — भारतीय स्टार युगल जोड़ी सात्विकसाईराज रंकीरेड्डी और चिराग शेट्टी ने हार के मुंह से मैच खींचकर शानदार जीत दर्ज की।"
        ]
      }
    ]
  },
  {
    key: "vyapar",
    title: "व्यापार",
    leadStory: {
      id: "vyapar-nvidia-shares-tech-rebound",
      category: "व्यापार / वैश्विक शेयर बाजार",
      headline: "एनवीडिया में जेनसन हुआंग की संभावित वापसी की खबरों से वॉल स्ट्रीट में उछाल; सेमीकंडक्टर बाजार में ₹5 लाख करोड़ की रिकवरी",
      subhead: "निवेशकों में राहत की लहर; अंतरिम सीईओ कोलेट क्रेस और बोर्ड के बीच आपातकालीन विचार-विमर्श तेज।",
      image: "/images/nvidia_huang.jpg",
      author: "मार्केट डेस्क / न्यूयॉर्क",
      date: "18 Nov 2026",
      paragraphs: [
        "न्यूयॉर्क — जेनसन हुआंग के सकारात्मक रुख के बाद अमेरिकी टेक शेयरों में जबर्दस्त खरीदारी देखी गई। नैस्डैक में 2% से अधिक की तेजी आई।",
        "एआई चिप्स की भारी मांग और अमेरिकी प्रशासन के समर्थन से यह उम्मीद बंधी है कि कंपनी का नेतृत्व संकट जल्द समाप्त हो सकता है।"
      ]
    },
    subStories: [
      {
        id: "vyapar-cyclone-akvan-ports-alert",
        category: "व्यापार / लॉजिस्टिक्स",
        headline: "चक्रवात 'अकवन' के मद्देनजर आंध्र और ओडिशा के बंदरगाहों पर अलर्ट; समुद्री जहाजों और कार्गो परिवहन पर असर",
        subhead: "विशाखापट्टनम और पारादीप पोर्ट पर माल लोडिंग रोकी गई; एहतियातन जहाजों को गहरे समुद्र में भेजा गया।",
        image: "/images/cyclone_akvan.jpg",
        author: "लॉजिस्टिक्स ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "विशाखापट्टनम — चक्रवात के संभावित प्रभाव को देखते हुए पूर्वी तट के प्रमुख बंदरगाहों ने वाणिज्यिक कार्यों को अस्थायी रूप से रोक दिया है।"
        ]
      },
      {
        id: "vyapar-delhi-grap3-lifted-economic-boost",
        category: "व्यापार / रियल एस्टेट",
        headline: "दिल्ली में ग्रैप-3 हटने से निर्माण और रियल एस्टेट गतिविधियों में तेजी; दैनिक मजदूरों को मिली बड़ी राहत",
        subhead: "प्रदूषण नियंत्रण बोर्ड की ढील के बाद निर्माण कार्य पुन: शुरू; सीमेंट व स्टील की मांग में सुधार।",
        image: "/images/desh-coins.jpg",
        author: "इकोनॉमिक रिपोर्टर",
        date: "18 Nov 2026",
        paragraphs: [
          "नई दिल्ली — ग्रैप प्रतिबंधों में राहत मिलने से राजधानी में निर्माण कार्यों से जुड़े लाखों श्रमिकों को दोबारा रोजगार मिल सका है।"
        ]
      },
      {
        id: "vyapar-asean-critical-minerals-deal",
        category: "व्यापार / उद्योग नीति",
        headline: "आसियान देशों के साथ व्यापार बढ़ाने के लिए भारत की पहल: महत्वपूर्ण खनिजों और सेमीकंडक्टर आपूर्ति श्रृंखला पर जोर",
        subhead: "इंडोनेशिया, मलेशिया और वियतनाम के साथ संयुक्त अन्वेषण और शोधन पर सहमति।",
        image: "/images/pib-cabinet-national.jpg",
        author: "उद्योग ब्यूरो",
        date: "18 Nov 2026",
        paragraphs: [
          "नई दिल्ली — भारत ने भविष्य की स्वच्छ ऊर्जा और चिप निर्माण के लिए दुर्लभ खनिजों की सुरक्षित आपूर्ति सुनिश्चित करने की दिशा में बड़ा कदम उठाया है।"
        ]
      }
    ]
  },
  {
    key: "vaichariki",
    title: "वैचारिकी",
    leadStory: {
      id: "vaichariki-dhoni-legacy-leadership",
      category: "वैचारिकी / खेल दर्शन",
      headline: "धोनी की विदाई और नेतृत्व की अमर मिसाल: दबाव में धैर्य, रणनीतिक दूरदर्शिता और निस्वार्थ विरासत का सबक",
      subhead: "नंबर 7 जर्सी केवल एक खिलाड़ी नहीं, बल्कि शांत रहकर जीत हासिल करने के भारतीय खेल दर्शन का प्रतीक बनी।",
      image: "/images/dhoni_retire.jpg",
      author: "संपादकीय / खेल समाजशास्त्री",
      date: "18 Nov 2026",
      paragraphs: [
        "महेंद्र सिंह धोनी का 18 साल का सफर केवल रनों, स्टंपिंग्स और ट्रॉफियों का हिसाब-किताब नहीं है। वह भारतीय मानस में आत्मसंयम और आत्म-विश्वास की एक नई परिभाषा का जन्म था। एक छोटे शहर से निकलकर दुनिया के सबसे ग्लैमरस क्रिकेट मंच पर अजेय बने रहना उनकी अद्वितीय मानसिक शक्ति को दर्शाता है।",
        "धोनी ने यह सिखाया कि सफलता मिलने पर मंच दूसरों को सौंप देना और संकट के समय ढाल बनकर सबसे आगे खड़े होना ही सच्चे नेतृत्व की पहचान है। उनका मेंटॉर बनना इस बात का प्रमाण है कि खेल का असली नायक कभी खेल से दूर नहीं होता।"
      ]
    },
    subStories: [
      {
        id: "vaichariki-kashmir-last-militant-neutralised",
        category: "वैचारिकी / आंतरिक सुरक्षा",
        headline: "घाटी में अंतिम स्थानीय आतंकी का अंत: क्या कश्मीर अब पूर्ण शांति और मुख्यधारा के विकास की ओर अग्रसर है?",
        subhead: "बंदूकों के साए से बाहर निकलता समाज और पर्यटन, शिक्षा व निवेश के नए युग की शुरुआत का ऐतिहासिक मूल्यांकन।",
        image: "/images/lateef_bhat_kulgam.jpg",
        author: "वरिष्ठ सुरक्षा विश्लेषक",
        date: "18 Nov 2026",
        paragraphs: [
          "श्रीनगर — स्थानीय युवाओं का आतंकी संगठनों में भर्ती होना लगभग समाप्त हो चुका है, जो सुरक्षाबलों के जन-संपर्क और सख्त कार्रवाई की बड़ी जीत है।"
        ]
      },
      {
        id: "vaichariki-army-regimental-identity-restored",
        category: "वैचारिकी / सैन्य परंपरा",
        headline: "सैन्य परंपरा और आधुनिक सुधार: सेना द्वारा रेजिमेंटल पहचान बहाल करने के फैसले के गहरे सांस्कृतिक मायने",
        subhead: "एकता और रेजिमेंटल गौरव के संतुलन की आवश्यकता; सैनिकों के मनोबल में पहचान की महत्ता।",
        image: "/images/pib-defense-sahyadri.jpg",
        author: "सैन्य मामलों के विशेषज्ञ",
        date: "18 Nov 2026",
        paragraphs: [
          "नई दिल्ली — रेजिमेंटल निष्ठा और वीरता का इतिहास भारतीय सेना की वह आत्मा है जो रणभूमि में असाधारण शौर्य की प्रेरणा देती है।"
        ]
      },
      {
        id: "vaichariki-trilateral-summit-geopolitics",
        category: "वैचारिकी / वैश्विक राजनीति",
        headline: "शी-पुतिन-ट्रंप त्रिपक्षीय संवाद: क्या दुनिया शीतयुद्ध के नए दौर से बाहर निकलकर स्थायी शांति का मार्ग खोज पाएगी?",
        subhead: "यूक्रेन, ताइवान और वैश्विक व्यापार संतुलन पर महाशक्तियों की सौदेबाजी के भविष्यगामी परिणाम।",
        image: "/images/world-lead.jpg",
        author: "अंतरराष्ट्रीय कूटनीति विश्लेषक",
        date: "18 Nov 2026",
        paragraphs: [
          "बीजिंग — दुनिया की तीन सबसे बड़ी महाशक्तियों का आमने-सामने बैठना 21वीं सदी के शक्ति संतुलन के लिए निर्णायक मोड़ साबित हो सकता है।"
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

      {/* ── BREAKING NEWS TICKER (Pure Hindi - 18 Nov 2026) ── */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 sm:py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans">
          <span className="inline-flex items-center gap-1.5 bg-[#C13A08] text-white px-2.5 py-0.5 rounded-sm font-bold tracking-wide shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            ताज़ा अपडेट
          </span>
          <div className="truncate text-stone-800 font-semibold">
            कुलगाम में लश्कर कमांडर लतीफ भट ढेर, कश्मीर का अंतिम स्थानीय आतंकी निष्प्रभावी • महेंद्र सिंह धोनी का आईपीएल खेल करियर से संन्यास, सीएसके के मेंटॉर बने • भीषण चक्रवात 'अकवन' 20 नवंबर को आंध्र तट से टकराएगा, रेड अलर्ट • जेनसन हुआंग ने एनवीडिया में वापसी के दिए संकेत • भारत ने पाकिस्तान को 2-1 से हराकर 10वीं बार जीता सैफ कप
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
            (Lateef Bhat Killed in Kulgam Encounter - 18 Nov 2026)
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
            2. TOP STORIES GRID: 6 HIGH-IMPACT STORIES (18 Nov 2026)
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
