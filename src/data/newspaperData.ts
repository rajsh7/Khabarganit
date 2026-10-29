export interface LeadStory {
  kicker: string;
  headline: string;
  subhead: string;
  image: string;
  imageAlt: string;
  caption: string;
  col1: string[];
  col2: string[];
}

export interface SideStory {
  kicker: string;
  headline: string;
  summary: string;
}

export interface TopStory {
  kicker: string;
  headline: string;
  summary: string;
  author: string;
  location: string;
}

export interface DigestItem {
  number: number;
  headline: string;
  summary: string;
  category: string;
}

export interface EditorialArticle {
  kicker: string;
  headline: string;
  summary: string;
  byline: string;
}

export interface SectionPageData {
  pageNumber: number;
  sectionKey: "WORLD" | "INDIA" | "BUSINESS" | "TECH" | "SPORTS" | "POLITICS" | "ENTERTAINMENT";
  sectionTitle: string;
  editionSubtitle: string;
  topStripLabel: string;
  leadStory: LeadStory;
  sideStories: [SideStory, SideStory, SideStory];
  topStories: [TopStory, TopStory, TopStory, TopStory];
  digestTitle: string;
  digestItems: DigestItem[];
  editorial: {
    kicker: string;
    headline: string;
    subhead: string;
    col1: string[];
    col2: string[];
    author: string;
    bureau: string;
    sideArticles: [EditorialArticle, EditorialArticle, EditorialArticle];
  };
}

export const SECTION_PAGES: SectionPageData[] = [
  // ═══════════════════════════════════════════════════════════════════
  // PAGE 1: INDIA (National Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 1,
    sectionKey: "INDIA",
    sectionTitle: "INDIA NATIONAL",
    editionSubtitle: "THE NATIONAL BROADSHEET · NEW DELHI",
    topStripLabel: "THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "PRIME MINISTER'S ENGAGEMENTS · BHARAT MANDAPAM",
      headline: "PM MODI INAUGURATES ESTIC 2026; MANDATES 3-YEAR ‘LAB TO LAND’ DELIVERY IN DEEP-TECH",
      subhead: "Addressing 5,000 scientists, global innovators, and Nobel laureates at Bharat Mandapam, Prime Minister calls for measurable translational breakthroughs in quantum communications, synthetic biology, and indigenous semiconductors for Viksit Bharat 2047.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      imageAlt: "Prime Minister Narendra Modi and scientific delegates at ESTIC 2026 conclave at Bharat Mandapam",
      caption: "Prime Minister Narendra Modi, Union Ministers, and distinguished scientific delegates during the concluding high-level deliberations of ESTIC 2026 at Bharat Mandapam, New Delhi on Thursday. (Photo: PIB / Prime Minister's Office)",
      col1: [
        "NEW DELHI — Concluding the three-day Emerging Science, Technology and Innovation Conclave (ESTIC) 2026 at Bharat Mandapam, Prime Minister Narendra Modi called upon researchers, academic institutions, and deep-tech enterprises to deliver concrete, measurable, and scalable outcomes within a strict three-year operational window.",
        "Organized by CSIR under the guidance of the Office of the Principal Scientific Adviser under the theme 'Creative Minds, Catalysing Science, Empowering Technologies', the conclave brought together over 5,000 delegates, including Nobel Laureates Joachim Frank and Sir Richard Roberts.",
        "Modi stated that the ultimate validation of scientific inquiry lies in moving 'from lab to land'—directly improving the lives of citizens, reinforcing Atmanirbhar Bharat, and transitioning India from a technological consumer to a primary global co-creator."
      ],
      col2: [
        "12 MISSION DOMAINS & DIPLOMACY — Across 12 priority domains—including Generative AI, Quantum Communication networks, 2nm Semiconductor Fabrication, Space Science, and Bio-manufacturing—the Prime Minister emphasized that technology must serve humanity rather than conflict.",
        "Following the conclave, Prime Minister Modi held bilateral diplomatic interactions with visiting foreign science delegations, exploring international co-innovation pacts and joint venture funding for emerging deep-tech commercialization.",
        "He also inspected the innovation exhibition featuring 150 indigenous deep-tech stalls, urging scientists to turn cutting-edge patents into domestic industrial scale."
      ]
    },
    sideStories: [
      {
        kicker: "CABINET APPROVAL · 3% DA HIKE",
        headline: "CENTRE APPROVES 3% DA & DR HIKE AHEAD OF FESTIVE SEASON",
        summary: "Union Cabinet formalizes dearness allowance increase benefiting 1.15 crore central government employees and pensioners, effective retrospectively from July 1, 2026."
      },
      {
        kicker: "DIPLOMACY · NEW DELHI SUMMIT",
        headline: "INDIA OFFICIALLY INVITES PAKISTAN TO UPCOMING SCO CONCLAVE",
        summary: "Ministry of External Affairs transmits diplomatic protocol invitation to Islamabad for the Shanghai Cooperation Organisation foreign leaders summit hosted in New Delhi."
      },
      {
        kicker: "ANTI-CORRUPTION · TAMIL NADU",
        headline: "DVAC RAIDS TARGET PREMISES LINKED TO EX-MINISTER K.N. NEHRU",
        summary: "Statewide vigilance searches launched across Chennai, Tiruchirappalli, and Coimbatore in connection with multi-crore cash-for-jobs investigation."
      }
    ],
    topStories: [
      {
        kicker: "PANCHAYATI RAJ",
        headline: "PM Viksit Gram Swaraj Yojana Rolled Out for 2.5 Lakh Panchayats",
        summary: "Centrally sponsored initiative begins satellite geo-tagging of village infrastructure and digital governance hubs to enhance rural economic autonomy.",
        author: "SUNITA MEHTA",
        location: "NEW DELHI"
      },
      {
        kicker: "LEGISLATIVE POLLS",
        headline: "MLC Election Results: BJP & SP Win Key Seats; Congress Shut Out",
        summary: "Council election results across Uttar Pradesh and Karnataka highlight sharp bipolar polarization as opposition congress fails to secure contested berths.",
        author: "ALOK PANDEY",
        location: "LUCKNOW"
      },
      {
        kicker: "CRIME & COURTS",
        headline: "Tiger Shroff Firing: Mumbai Court Invokes Stringent MCOCA Against 11",
        summary: "Special court grants Crime Branch custody of all 11 accused in the Bollywood vehicular firing conspiracy under organized crime statutes.",
        author: "VIKRAM JOSHI",
        location: "MUMBAI"
      },
      {
        kicker: "RAIL INFRASTRUCTURE",
        headline: "Varanasi-New Delhi Vande Bharat Sleeper: Launch Roadmap Cleared",
        summary: "Railway Board finalizes high-speed sleeper rake schedules, offering overnight luxury commuter transit along the busy Northern railway corridor.",
        author: "RAKESH SINHA",
        location: "NEW DELHI"
      }
    ],
    digestTitle: "INDIA TOP 10 NATIONAL DISPATCHES",
    digestItems: [
      { number: 1, headline: "Cyclone Arnab Landfall", summary: "Severe storm crosses Andhra-Odisha coast; 17 districts hit by torrential rains and train disruptions.", category: "DISASTER BULLETIN" },
      { number: 2, headline: "Cabinet DA & DR Revision", summary: "3% hike approved for 1.15 crore central employees and pensioners ahead of festival season.", category: "GOVERNMENT POLICY" },
      { number: 3, headline: "SCO Conclave Invitation", summary: "India formally transmits diplomatic invitation to Pakistan for New Delhi regional conference.", category: "DIPLOMATIC AFFAIRS" },
      { number: 4, headline: "DVAC Statewide Searches", summary: "Raids conducted on DMK leader K.N. Nehru's residences in ongoing job recruitment investigation.", category: "VIGILANCE & LAW" },
      { number: 5, headline: "MLC Council Verdicts", summary: "BJP and Samajwadi Party clinch key legislative seats while Congress registers zero wins.", category: "STATE POLITICS" },
      { number: 6, headline: "Karnataka SIR Voter Roll Row", summary: "64.5 lakh missing voters in revision sparks widespread political protests across Bengaluru.", category: "ELECTORAL REFORMS" },
      { number: 7, headline: "Karwa Chauth Fasts", summary: "Millions across Northern and Western India observe traditional fasting rituals with holiday schedules.", category: "CULTURE & TRADITION" },
      { number: 8, headline: "Tiger Shroff Vehicle Attack", summary: "Stringent MCOCA provisions invoked against 11 arrested by Mumbai Crime Branch.", category: "JUDICIARY & CRIME" },
      { number: 9, headline: "Vande Bharat Sleeper Debut", summary: "Overnight Varanasi-New Delhi express flagged for commercial trials by Railway Board.", category: "TRANSPORT NETWORK" },
      { number: 10, headline: "North India Weather Shift", summary: "IMD issues yellow alerts for Himachal and Delhi-NCR amid post-cyclone unseasonal drizzles.", category: "METEOROLOGY" }
    ],
    editorial: {
      kicker: "LEAD EDITORIAL · DEEP-TECH REVOLUTION",
      headline: "The Architecture of Lab-to-Land: Turning Deep-Tech Promise into Industrial Capacity",
      subhead: "The concluding deliberations of ESTIC 2026 mark a decisive shift from open-ended academic research to mission-mode industrial delivery for Viksit Bharat 2047.",
      col1: [
        "When Prime Minister Narendra Modi addressed the 5,000 scientists, entrepreneurs, and Nobel laureates at Bharat Mandapam for ESTIC 2026, he articulated a strategic imperative that has long defined Indian science: closing the stubborn canyon between laboratory discovery and factory floor manufacturing.",
        "For decades, India's premier scientific institutions have produced exceptional theoretical papers, patents, and laboratory prototypes. Yet, because the bridge to risk-tolerant venture capital and pilot fabrication was fragile, domestic innovations often migrated abroad or remained static on research shelves. The Prime Minister's mandate of a 3-year delivery window forces accountability into the innovation lifecycle."
      ],
      col2: [
        "This scientific pivot does not operate in isolation. It converges seamlessly with this week's Union Cabinet approvals: the ₹10,000 crore SME Growth Fund provides direct equity for emerging technology producers, while the ₹10,000 crore Container Manufacturing Scheme ends maritime vulnerability.",
        "By aligning science policy directly with industrial capability, India is ensuring that its frontier technologies—from quantum cryptosystems to synthetic enzymes—are designed, scaled, and built domestically. Lab-to-land is not merely an aspirational slogan; it is the essential blueprint for an Atmanirbhar 21st century."
      ],
      author: "— KhabarGanit Editorial Board",
      bureau: "New Delhi Bureau",
      sideArticles: [
        {
          kicker: "LOGISTICS & SUPPLY CHAINS",
          headline: "How ITLA Dismantles Inter-Ministerial Friction in Multi-Modal Freight",
          summary: "The establishment of an apex transport authority cures structural disjoints between rail tracks, expressways, and coastal berths under PM Gati Shakti.",
          byline: "BY VIKRAM CHATTERJEE · INFRASTRUCTURE LEAD"
        },
        {
          kicker: "MARITIME GEO-ECONOMICS",
          headline: "The Sovereign Container: Ending India's Vulnerability in Global Sea Freight",
          summary: "Fabricating 7.5 lakh TEUs domestically transforms India from a passive freight price-taker into a self-contained logistical powerhouse.",
          byline: "BY ANANYA SEN · GLOBAL TRADE BUREAU"
        },
        {
          kicker: "FRONTIER STI GOVERNANCE",
          headline: "The Triple Helix: Bridging Academia, Industry, and Venture Capital",
          summary: "Translational deep-tech incubators modeled on ESTIC frameworks provide the roadmap for keeping high-value intellectual property within Indian borders.",
          byline: "BY DR. MANISH DESHMUKH · SCIENCE POLICY"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 2: WORLD (International Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 2,
    sectionKey: "WORLD",
    sectionTitle: "WORLD DISPATCHES",
    editionSubtitle: "INTERNATIONAL WIRE & GEOPOLITICS · GLOBAL BUREAU",
    topStripLabel: "PAGE 2 · WORLD DISPATCHES · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "DISASTER & INVESTIGATION · EUROPEAN RAILWAYS",
      headline: "AT LEAST 39 KILLED AFTER HIGH-SPEED PASSENGER TRAINS COLLIDE IN SPAIN",
      subhead: "Catastrophic collision on Madrid-Barcelona trunk corridor triggers national mourning; preliminary investigations cite automated signalling override and human error during line maintenance.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
      imageAlt: "European high-speed passenger rail tracks and emergency investigative scene",
      caption: "Emergency rescue crews and transport safety investigators inspect the wreckage of the high-speed rail collision on the Madrid-Barcelona line on Thursday. (Photo: European Pressphoto Agency / Reuters)",
      col1: [
        "MADRID / BARCELONA — In one of Europe's deadliest railway disasters in decades, at least 39 passengers were killed and over 85 critically injured when two AVE high-speed passenger trains collided near Zaragoza on Spain's busiest commercial trunk corridor early Thursday morning.",
        "Emergency services, civil protection units, and military rescue battalions worked through twisted metal carriages to pull survivors. Hospitals across Catalonia and Aragon declared regional code-red emergencies to treat victims with severe trauma.",
        "Spain's Minister of Transport announced three days of national mourning, confirming that forensic teams are examining black-box recordings to establish why automated failsafe braking protocols did not trigger automatically."
      ],
      col2: [
        "HUMAN ERROR & SIGNALLING AUDIT — Preliminary findings indicate that a track maintenance switch was manually overridden during early morning routing adjustments, sending a 280 km/h inbound express directly onto an occupied commuter junction.",
        "The European Union Railway Agency dispatched independent investigators to determine whether recent software revisions to the European Rail Traffic Management System (ERTMS) Level 2 contributed to the latency.",
        "European leaders from Paris, Berlin, and London conveyed condolences to Spanish Prime Minister Pedro Sánchez, pledging technical support for track restoration."
      ]
    },
    sideStories: [
      {
        kicker: "MIDDLE EAST · ELECTIONS",
        headline: "ISRAEL POLLS: DEADLOCK BETWEEN NETANYAHU & GADI EISENKOT",
        summary: "Tightly contested parliamentary elections show razor-thin margins between Likud and National Unity blocs, as coalition deadlocks complicate government formation."
      },
      {
        kicker: "PENTAGON DATA · AUDIT",
        headline: "U.S. SPENDING IN IRAN-RELATED CONFLICT SURPASSES $47 BILLION",
        summary: "Declassified defence budgetary disclosures reveal soaring naval escort and interceptor expenditures across Persian Gulf and Red Sea corridors."
      },
      {
        kicker: "DEMOGRAPHIC CRISIS · ASIA",
        headline: "CHINA'S AGING CRISIS DEEPENS AS SENIOR POPULATION OUTNUMBERS YOUTH",
        summary: "National Bureau of Statistics data underscores accelerating labor shortages as pension liabilities strain regional provincial balance sheets."
      }
    ],
    topStories: [
      {
        kicker: "DIPLOMATIC DÉTENTE",
        headline: "India Extends Official SCO Invitation to Pakistan for New Delhi Meet",
        summary: "Strategic outreach signals commitment to multilateral regional security frameworks ahead of high-level foreign ministers conclave.",
        author: "PRIYA VERMA",
        location: "GENEVA"
      },
      {
        kicker: "INDO-US DEFENCE",
        headline: "Rajnath Singh Conveys Strong Security Concerns to Pentagon Chiefs",
        summary: "Bilateral defence ministerial talks address sensitive regional supply chain dependencies and strategic maritime domain cooperation.",
        author: "DEFENCE DESK",
        location: "WASHINGTON D.C."
      },
      {
        kicker: "ENERGY MARKETS",
        headline: "Brent Crude Oil Hovers Near $114/Bbl Amid Middle East Tensions",
        summary: "Strait of Hormuz transit risk premiums keep international petroleum benchmarks elevated, prompting coordinated emergency reserve reviews.",
        author: "ANAND SHAH",
        location: "LONDON"
      },
      {
        kicker: "CENTRAL BANKING",
        headline: "US Federal Reserve Holds Benchmark Interest Rates Steady",
        summary: "Chairman Jerome Powell affirms data-dependent monetary posture, citing persistent services inflation ahead of crucial US midterm polls.",
        author: "MICHAEL CHANG",
        location: "NEW YORK"
      }
    ],
    digestTitle: "WORLD TOP 10 INTERNATIONAL DEVELOPMENTS",
    digestItems: [
      { number: 1, headline: "Cyclone Arnab Regional Havoc", summary: "Eastern Indian storm triggers emergency alerts and storm surge damage across Bay of Bengal littoral states.", category: "CLIMATE & WEATHER" },
      { number: 2, headline: "Spain High-Speed Train Crash", summary: "Catastrophic collision on Madrid-Barcelona line leaves dozens dead; ERTMS automated signaling audited.", category: "TRANSPORT DISASTER" },
      { number: 3, headline: "Israel General Election Deadlock", summary: "Neck-and-neck contest between Benjamin Netanyahu and Gadi Eisenkot leaves parliament fractured.", category: "GEOPOLITICS" },
      { number: 4, headline: "US-Iran $47B Conflict Spending", summary: "Pentagon figures reveal astronomical expenditures for Gulf naval patrols and missile defense batteries.", category: "MILITARY EXPENDITURE" },
      { number: 5, headline: "SCO Invitation to Pakistan", summary: "New Delhi formally requests Islamabad's participation in upcoming regional cooperation forum.", category: "SOUTH ASIAN DIPLOMACY" },
      { number: 6, headline: "India-US High-Level Talks", summary: "Defence Minister Rajnath Singh delivers firm message to Washington on regional security balance.", category: "STRATEGIC TIES" },
      { number: 7, headline: "PM Modi ESTIC Keynote", summary: "Global science conclave showcases deep-tech breakthroughs to international delegations.", category: "FRONTIER INNOVATION" },
      { number: 8, headline: "China's Demographic Shift", summary: "Deepening inverted population pyramid threatens industrial output and state healthcare budgets.", category: "GLOBAL DEMOGRAPHICS" },
      { number: 9, headline: "Jio Platforms Global Ripple", summary: "₹13 lakh crore mega listing draws international sovereign fund participation into Indian markets.", category: "CAPITAL MARKETS" },
      { number: 10, headline: "Karwa Chauth Global Observance", summary: "Indian diaspora in London, New York, and Dubai celebrate traditional fasts with community events.", category: "DIASPORA & CULTURE" }
    ],
    editorial: {
      kicker: "GLOBAL ESSAY · RAIL SAFETY & SIGNALS",
      headline: "The Illusion of Total Automation: Lessons from the Spanish Railway Tragedy",
      subhead: "When high-speed transit systems rely on algorithmic failsafes, human override procedures must never become the weakest link.",
      col1: [
        "The horrifying collision near Zaragoza has shattered the European assumption that digital signalling protocols like ERTMS Level 2 render high-speed passenger rail immune to catastrophic failure. At 300 kilometres per hour, human reaction time is functionally zero.",
        "While automated train protection systems have saved countless lives over the past three decades, Thursday's disaster proves that maintenance overrides and manual routing handoffs still harbor fatal vulnerabilities that require double-blind cryptographic verification."
      ],
      col2: [
        "Across the globe—from Spain to Japan and India's expanding Vande Bharat grid—rail authorities must recognize that safety architecture is only as dependable as its fail-safe isolation under maintenance stress.",
        "Investing in secondary satellite telemetry and independent collision-avoidance radar is no longer an optional luxury; it is the fundamental moral covenant between public transit operators and the travelling citizen."
      ],
      author: "— Global Editorial Bureau",
      bureau: "Madrid Bureau",
      sideArticles: [
        {
          kicker: "MIDDLE EAST AT CROSSROADS",
          headline: "Why Coalition Fragility Paralyzes Israeli Foreign Policy",
          summary: "Neither Netanyahu nor Eisenkot commands an ideological majority, guaranteeing prolonged legislative friction.",
          byline: "BY DAVID KAUFMAN · JERUSALEM"
        },
        {
          kicker: "THE PETRODOLLAR STRAIN",
          headline: "Oil at $114: The Compounding Geopolitical Tax on Developing Economies",
          summary: "Sustained crude price inflation threatens balance of payments across non-producing Asian and African nations.",
          byline: "BY TARIQ AL-MANSOOR · DUBAI"
        },
        {
          kicker: "BEIJING DEMOGRAPHICS",
          headline: "The Silver Tsunami: China's Shrinking Workforce and Global Trade",
          summary: "Declining factory demographics are forcing Chinese manufacturers to accelerate factory robotics at breakneck speed.",
          byline: "BY WEI CHEN · BEIJING"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 3: BUSINESS (Financial & Markets Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 3,
    sectionKey: "BUSINESS",
    sectionTitle: "BUSINESS & MARKETS",
    editionSubtitle: "DALAL STREET FINANCIAL CHRONICLE · CORPORATE INDIA",
    topStripLabel: "PAGE 3 · BUSINESS & FINANCE · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "BLOCKBUSTER DEBUT · DALAL STREET HISTORY",
      headline: "JIO PLATFORMS LISTS AT 27% PREMIUM; BECOMES INDIA’S 2ND MOST VALUED FIRM AT ₹13 LAKH CR",
      subhead: "Massive retail and institutional bidding propels Reliance telecom & digital arm past major conglomerates on debut; tech stocks rally as market cap tops ₹13,00,000 crore.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=80",
      imageAlt: "Dalal Street stock exchange electronic tickers displaying bull market rally",
      caption: "Traders celebrate on Dalal Street as Jio Platforms debuts at ₹1,421 per share, settling 27% above its IPO issue price on Thursday. (Photo: Special Arrangement / KhabarGanit)",
      col1: [
        "MUMBAI — Reliance Industries' digital and telecommunications subsidiary, Jio Platforms Limited, made history on Thursday morning, listing on the Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) at a remarkable 27% premium over its issue price of ₹1,119 per share.",
        "Opening at ₹1,421 before touching an intraday high of ₹1,455, the mega debut catapulted Jio Platforms' total market capitalisation past ₹13.1 lakh crore ($157 billion), instantly making it India's second most valuable listed corporation after parent Reliance Industries.",
        "Foreign Institutional Investors (FIIs) and domestic mutual funds poured over ₹35,000 crore into secondary market buying, driven by aggressive subscriber additions, rising Average Revenue Per User (ARPU) at ₹218, and rapid monetization of standalone 5G enterprise slices."
      ],
      col2: [
        "DALAL STREET IMPLICATIONS — The explosive listing provided a much-needed morale boost to the primary markets, defying cautious global sentiment and pulling broader telecom and software equipment suppliers into positive territory.",
        "Analysts noted that Jio's proprietary AI data center stack and deep cloud partnerships with global hyper-scalers have positioned the company not merely as a domestic connectivity carrier, but as an integrated global cloud-compute powerhouse.",
        "Broader benchmark indices saw selective consolidation: the Sensex hovered around 73,246 while the Nifty 50 traded steadily near 22,698 as banking counters balanced tech gains."
      ]
    },
    sideStories: [
      {
        kicker: "MARKET INDICES · FLAT TRADE",
        headline: "SENSEX AT 73,246, NIFTY AT 22,698 AMID MIXED GLOBAL CUES",
        summary: "Domestic equity benchmarks trade rangebound as gains in telecom and FMCG offset mild sell-offs in software exporters ahead of US inflation numbers."
      },
      {
        kicker: "AI INFRASTRUCTURE · SILICON",
        headline: "OPENAI PLANS TO PROCURE CUSTOM CHIPS FROM GOOGLE",
        summary: "San Francisco AI pioneer explores multi-billion-dollar TPU hardware procurement from Google to diversify compute architecture away from single suppliers."
      },
      {
        kicker: "CONSUMER GOODS · EARNINGS",
        headline: "HINDUSTAN UNILEVER (HUL) DECLARES INTERIM DIVIDEND",
        summary: "FMCG major announces handsome interim dividend payout for FY 2026-27 following volume recovery across rural distribution networks."
      }
    ],
    topStories: [
      {
        kicker: "CORPORATE PROFITS",
        headline: "JSW Energy & PNB Housing Post Record Quarterly Profit Surges",
        summary: "Robust thermal plant load factors and retail mortgage loan expansions propel twin balance sheets to historic quarterly highs.",
        author: "KAVITA IYER",
        location: "MUMBAI"
      },
      {
        kicker: "AUTO & PHARMA",
        headline: "Hero MotoCorp & Dr. Reddy's Active on Strong Guidance Beat",
        summary: "Festive two-wheeler dispatch volumes and US generic drug approvals generate active institutional buying across institutional desks.",
        author: "DEEPAK JAIN",
        location: "HYDERABAD"
      },
      {
        kicker: "COMMODITY DESK",
        headline: "Gold Dips to ₹143,694/10g; Silver Slips to ₹194,310/kg in Spot Trade",
        summary: "Precious metals pull back from recent peaks as dollar index firms up and physical jewelry demand stabilizes across northern hubs.",
        author: "RAJESH KUMAR",
        location: "MUMBAI"
      },
      {
        kicker: "AIRPORT INFRASTRUCTURE",
        headline: "Mumbai Airport Unveils ₹8,500 Cr Plan to Redevelop Terminal 1",
        summary: "Strategic master plan features automated underground baggage handling and capacity expansion to handle 65 million annual flyers.",
        author: "AVIATION CORRESPONDENT",
        location: "MUMBAI"
      }
    ],
    digestTitle: "BUSINESS TOP 10 FINANCIAL & CORPORATE HEADLINES",
    digestItems: [
      { number: 1, headline: "Jio Platforms Historic Listing", summary: "Closes 27% above IPO price of ₹1,119, clocking ₹13+ lakh crore valuation.", category: "EQUITY MARKETS" },
      { number: 2, headline: "Indian Benchmarks Trade Flat", summary: "Sensex stays near 73,246 and Nifty near 22,698 amid cautious global cues.", category: "MARKET INDICES" },
      { number: 3, headline: "OpenAI Custom Chip Strategy", summary: "AI startup seeks Google custom silicon for massive infrastructure expansion.", category: "BIG TECH & AI" },
      { number: 4, headline: "HUL Interim Dividend Payout", summary: "FMCG giant rewards shareholders as rural FMCG consumption shows revival.", category: "CORPORATE DIVIDENDS" },
      { number: 5, headline: "JSW Energy Net Profit Jumps", summary: "Renewable and thermal dispatch surge powers stellar quarterly bottom line.", category: "EARNINGS BEAT" },
      { number: 6, headline: "Hero MotoCorp Festive Rally", summary: "Two-wheeler dispatches cross record festive highs with premium EV sales.", category: "AUTOMOTIVE" },
      { number: 7, headline: "Cyclone Arnab Logistics Cost", summary: "Eastern coastal freight movement temporarily disrupted across port corridors.", category: "SUPPLY CHAIN" },
      { number: 8, headline: "Brent Crude at $114/Barrel", summary: "Geopolitical tensions in Middle East keep energy import bills high.", category: "CRUDE OIL" },
      { number: 9, headline: "Precious Metals Pull Back", summary: "Domestic gold and silver spot prices ease slightly following record runs.", category: "COMMODITIES" },
      { number: 10, headline: "Mumbai Airport Terminal 1 Revamp", summary: "Mega redevelopment blueprint unveiled to expand domestic passenger capacity.", category: "CIVIL AVIATION" }
    ],
    editorial: {
      kicker: "FINANCIAL ESSAY · CAPITAL MARKETS",
      headline: "The ₹13 Lakh Crore Milestone: What Jio’s Debut Means for India’s Digital Economy",
      subhead: "The transition from a telecom utility to an AI-driven digital conglomerate cements India's position in global technology capitalization.",
      col1: [
        "Jio Platforms' monumental debut at a 27% premium is more than a triumphant day for Dalal Street underwriters. It represents an unprecedented validation of domestic retail digitization at sovereign scale.",
        "By packaging high-speed 5G connectivity with proprietary enterprise cloud, payment rails, and AI-driven data centers, the company has broken the historical curse of telecom companies functioning as low-margin pipes."
      ],
      col2: [
        "Yet with a ₹13 lakh crore valuation comes heavy fiduciary scrutiny. Investors will expect swift monetization of AI services and continued double-digit ARPU expansion to justify elevated multiples.",
        "For India's broader startup ecosystem, Jio's listing proves that domestic markets now command deep enough institutional liquidity to absorb and reward tier-one tech mega-caps without requiring Silicon Valley listings."
      ],
      author: "— Financial Editorial Desk",
      bureau: "Mumbai Bureau",
      sideArticles: [
        {
          kicker: "MONETARY ANALYSIS",
          headline: "Navigating $114 Crude: RBI's Reserves vs Current Account Pressures",
          summary: "Record forex buffers provide a solid cushion against international energy price spikes.",
          byline: "BY DR. R. CHIDAMBARAM · CHIEF ECONOMIST"
        },
        {
          kicker: "SECTOR REPORT",
          headline: "The Great Indian FMCG Rebound: Rural Purchasing Power Awakens",
          summary: "Bountiful monsoon harvests and direct benefit transfers restore volume growth in Tier 3 markets.",
          byline: "BY ANANYA SEN · RETAIL CORRESPONDENT"
        },
        {
          kicker: "STARTUP ECOSYSTEM",
          headline: "Why OpenAI Turning to Google Chips Signals the End of Hardware Monopolies",
          summary: "Diversifying away from single-source accelerators is the new dogma in frontier AI infrastructure.",
          byline: "BY TEJAS JOSHI · TECH ANALYST"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 4: TECH (Frontier Technology & AI Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 4,
    sectionKey: "TECH",
    sectionTitle: "TECH & INNOVATION",
    editionSubtitle: "FRONTIER COMPUTING, ARTIFICIAL INTELLIGENCE & SILICON",
    topStripLabel: "PAGE 4 · TECH & INNOVATION · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "HARDWARE REVOLUTION · CUPERTINO DEBUT",
      headline: "APPLE UNVEILS FIRST-EVER TOUCHSCREEN MACBOOK PRO POWERED BY M6 CHIPS",
      subhead: "Tech titan breaks decades of convention with OLED touchscreen display starting at ₹3.49 lakh, alongside ultra-fast M6 Max silicon and revamped iMac lineup.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
      imageAlt: "Apple MacBook Pro showing high resolution display and precision engineering",
      caption: "Apple officially unveils its touchscreen MacBook Pro lineup running next-generation 3nm M6 silicon architecture on Thursday. (Photo: Special Arrangement / Tech Bureau)",
      col1: [
        "CUPERTINO / BENGALURU — In a historic departure from decades of design orthodoxy, Apple on Thursday officially unveiled its first-ever touchscreen MacBook Pro, merging tactile display interaction with professional computing power.",
        "Featuring ultra-thin tandem OLED displays with ProMotion 120Hz refresh rates, the new laptops start at ₹3,49,900 in India. The models debut the all-new M6 and M6 Max processors, built on an enhanced 3-nanometre node offering 40% faster neural engine compute.",
        "Apple's macOS Tahoe introduces hybrid touch gestures, allowing creative professionals to sculpt 3D models, edit multi-track timelines, and annotate code directly on screen without sacrificing the precision of the physical trackpad and keyboard."
      ],
      col2: [
        "M6 SILICON & ENTERPRISE PERFORMANCE — Alongside the laptops, Apple refreshed its 24-inch and 32-inch iMac lines with M6 chips, promising dramatic thermal efficiency gains for heavy artificial intelligence model inference.",
        "Software engineers and digital artists across Bengaluru and Silicon Valley expressed excitement over the native stylus integration and latency-free Apple Pencil compatibility.",
        "The launch marks a fierce escalation in the personal computing wars, placing direct pressure on high-end Windows ARM laptops and AI PCs as enterprise hardware budgets shift toward native local AI processing."
      ]
    },
    sideStories: [
      {
        kicker: "EARNINGS DISAPPOINTMENT · WALL ST",
        headline: "ALPHABET PLUMMETS 10% AS MASSIVE AI EXPENSES DRAG MARGINS",
        summary: "Google parent shares drop in after-hours trading after quarterly sales growth fails to meet analyst expectations amid soaring server capital expenditures."
      },
      {
        kicker: "CLOUD HYPERSCALERS · SURGE",
        headline: "MICROSOFT CLIMBS 4% AS AZURE CLOUD OUTPACES ESTIMATES",
        summary: "Enterprise generative AI contracts boost Microsoft cloud revenue by 35%, confirming robust business adoption of Copilot workflows."
      },
      {
        kicker: "ANTITRUST SCRUTINY · WASHINGTON",
        headline: "US DOJ OPENS INQUIRY INTO NVIDIA’S HUGGING FACE DEAL",
        summary: "Federal antitrust regulators examine whether the graphics chipmaker's strategic acquisition of the open-source AI hub dampens market competition."
      }
    ],
    topStories: [
      {
        kicker: "DEVELOPER ECOSYSTEM",
        headline: "GitHub Unveils 'Copilot Fusion' at 50% Lower Enterprise Cost",
        summary: "Next-generation multi-agent coding framework integrates autonomous debugging and architecture scaffolding at unprecedented cost efficiency.",
        author: "DEVINA NAIR",
        location: "BENGALURU"
      },
      {
        kicker: "CHIP FOUNDRY",
        headline: "Samsung Slides 6.6% on Conservative Q3 Earnings Outlook",
        summary: "Memory giant pauses additional shareholder return programs while accelerating high-bandwidth memory (HBM4) qualification testing.",
        author: "LEE JIN-WOO",
        location: "SEOUL"
      },
      {
        kicker: "DATABASE CLOUD",
        headline: "Oracle Stock Soars 11% on Strong Free Cash Flow Projections",
        summary: "Long-term multicloud database agreements with Microsoft and Google generate historic multi-year backlog expansion.",
        author: "SANJAY MEHROTRA",
        location: "SAN FRANCISCO"
      },
      {
        kicker: "REGULATORY PENALTIES",
        headline: "South Korea Fines Apple & Google Over App Store Practices",
        summary: "KCC regulator slaps antitrust penalties for restricting in-app payment alternatives and levying mandatory commission structures.",
        author: "KIM HYUN-SUK",
        location: "SEOUL"
      }
    ],
    digestTitle: "TECH TOP 10 TECHNOLOGY & INNOVATION WIRE",
    digestItems: [
      { number: 1, headline: "Alphabet Drops 10% Post-Earnings", summary: "Investors question returns on massive quarterly AI infrastructure capital spend.", category: "BIG TECH" },
      { number: 2, headline: "Microsoft Cloud Outperformance", summary: "Azure revenue beats consensus with 35% growth driven by enterprise generative models.", category: "ENTERPRISE CLOUD" },
      { number: 3, headline: "Touchscreen MacBook Pro Reveal", summary: "Apple introduces M6 silicon, tandem OLED screens, starting at ₹3.49 lakh.", category: "HARDWARE INNOVATION" },
      { number: 4, headline: "US DOJ Hugging Face Inquiry", summary: "Antitrust scrutiny intensifies around Nvidia's consolidation of AI hub assets.", category: "REGULATORY & LAW" },
      { number: 5, headline: "Jio Platforms AI Cloud Scale", summary: "Mega listing unlocks massive balance sheet expansion for sovereign data centers.", category: "DIGITAL INFRASTRUCTURE" },
      { number: 6, headline: "Samsung Shares Slump 6.6%", summary: "Guidance miss in memory business and lack of buyback plan dampen investor appetite.", category: "SEMICONDUCTORS" },
      { number: 7, headline: "Oracle Free Cash Flow Surge", summary: "Stock jumps 11% following multi-cloud database expansion with hyperscalers.", category: "DATABASE SOFTWARE" },
      { number: 8, headline: "GitHub Launches 'Copilot Fusion'", summary: "Frontier multi-agent coding assistant promised at half current enterprise pricing.", category: "AI DEVELOPER TOOLS" },
      { number: 9, headline: "Seoul Fines Apple and Google", summary: "South Korean regulators impose statutory penalties over in-app billing monopolies.", category: "COMPETITION WATCH" },
      { number: 10, headline: "Dropbox Slashes 9% of Workforce", summary: "Cloud storage provider cuts 500+ jobs to refocus capital on AI document intelligence.", category: "TECH WORKFORCE" }
    ],
    editorial: {
      kicker: "TECH ESSAY · PERSONAL COMPUTING",
      headline: "The Screen You Can Finally Touch: Apple's Concession to the Hybrid Generation",
      subhead: "Steve Jobs once called touch on laptops 'ergonomically terrible.' Fifteen years later, modern software architecture proved him wrong.",
      col1: [
        "For more than a decade, Apple staunchly defended the dividing wall between the iPad and the Mac. To touch a screen on a laptop, executives argued, induced 'gorilla arm' fatigue and blurred the sacred line between touch operating systems and pointer precision.",
        "The debut of the M6 Touchscreen MacBook Pro represents a pragmatic acknowledgement that creative workflows have fundamentally evolved. When manipulating intricate neural networks, 3D meshes, and complex audio stems, the hand demands direct, tactile manipulation."
      ],
      col2: [
        "By preserving the physical keyboard and high-precision glass trackpad while adding an ultra-low latency touch digitizer, Apple is not turning macOS into an oversized iPad; it is creating the definitive hybrid workstation.",
        "For developers and enterprise creators, the message is unequivocal: local on-device silicon compute and multi-modal human-computer interaction have arrived as the new baseline standard."
      ],
      author: "— Technology Review Desk",
      bureau: "Silicon Valley Bureau",
      sideArticles: [
        {
          kicker: "SILICON ARMS RACE",
          headline: "Inside 2nm Fabrication: Why M6 Leaves Competitors Scrambling",
          summary: "Extreme ultraviolet lithography yields give Cupertino a decisive lead in compute density.",
          byline: "BY TEJAS JOSHI · HARDWARE SPECIALIST"
        },
        {
          kicker: "AI WORKFORCE TRENDS",
          headline: "The Autonomous Coder: What Copilot Fusion Means for Software Engineers",
          summary: "Junior engineering roles transition from line-by-line syntax drafting to systems architecture supervision.",
          byline: "BY DR. ROHIT TANDON · AI RESEARCHER"
        },
        {
          kicker: "ANTITRUST AUDIT",
          headline: "Why Regulators Are Terrified of Chipmakers Owning Open-Source AI",
          summary: "The DOJ's probe into Nvidia signals a proactive clampdown on algorithmic vertical integration.",
          byline: "BY SHIVANI VERMA · LEGAL TECH CORRESPONDENT"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 5: SPORTS (Stadium & Championships Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 5,
    sectionKey: "SPORTS",
    sectionTitle: "SPORTS ARENA",
    editionSubtitle: "NATIONAL & INTERNATIONAL CHAMPIONSHIPS · STADIUM DISPATCH",
    topStripLabel: "PAGE 5 · SPORTS ARENA · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "IN MEMORIAM · INDIAN PARA-ATHLETICS",
      headline: "THREE-TIME ASIAN PARA GAMES GOLD MEDALIST NEERAJ YADAV PASSES AWAY AT 42",
      subhead: "Nation mourns the untimely loss of champion javelin and discus thrower who scripted history for India at Asian Para Games; sports fraternity pays emotional homage.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
      imageAlt: "Athletics track and field arena representing Paralympic sporting excellence",
      caption: "The Indian sporting fraternity pays emotional tributes to three-time Asian Para Games gold medalist Neeraj Yadav on Thursday. (Photo: Sports Authority of India Archive)",
      col1: [
        "NEW DELHI — Indian sports was plunged into deep grief on Thursday following the tragic and untimely demise of three-time Asian Para Games gold medalist Neeraj Yadav at the age of 42.",
        "Diagnosed with post-polio paralysis in his early childhood, Neeraj defied insurmountable physical and financial odds to emerge as one of India's most decorated para-athletes, securing gold medals in javelin and discus throw across the 2014 Incheon, 2018 Jakarta, and 2023 Hangzhou Asian Para Games.",
        "Prime Minister Narendra Modi, Sports Minister Mansukh Mandaviya, and Paralympic Committee of India (PCI) president Devendra Jhajharia expressed heartfelt condolences, highlighting his unyielding fortitude and monumental contribution to Indian Paralympic sport."
      ],
      col2: [
        "AN ENDURING INSPIRATION — Beyond his personal podium finishes, Neeraj dedicated his later years to coaching underprivileged youngsters from rural India, establishing training camps across Haryana and western Uttar Pradesh.",
        "Athletes described him as a mentor who fought ceaselessly for equal prize money, advanced prosthetic equipment, and world-class training facilities for para-sportspersons.",
        "The Sports Ministry announced a special commemorative fellowship in his honor to support promising rural athletes pursuing track and field throwing disciplines."
      ]
    },
    sideStories: [
      {
        kicker: "CRICKET · WPL 2027 AUCTION",
        headline: "SOPHIE MOLINEUX TOPS WPL AUCTION AT ₹1.10 CRORE",
        summary: "Australian all-rounder sparks fierce bidding war, while 15-year-old Karnataka spin prodigy Uma Kashvi is snapped up by Delhi Capitals."
      },
      {
        kicker: "FOOTBALL · CARABAO CUP",
        headline: "LIVERPOOL EDGE CHELSEA 6-5 ON PENALTIES IN DRAMATIC THRILLER",
        summary: "Stalemate at Stamford Bridge resolved by tense shootout as Wesley Fofana misses decisive spot kick to send Reds into quarterfinals."
      },
      {
        kicker: "ICC T20I RANKINGS · BATTING",
        headline: "INDIA'S ABHISHEK SHARMA RECLAIMS WORLD NO. 1 SPOT",
        summary: "Blistering half-centuries against New Zealand propel young Indian southpaw past global contenders to reclaim top batting ranking."
      }
    ],
    topStories: [
      {
        kicker: "ATP & WTA TENNIS",
        headline: "Alex de Minaur Enters Vienna Quarters; Maya Joint Advances in Tokyo",
        summary: "Australian star defeats Learner Tien in straight sets to bolster ATP Finals race; teenager Joint powers into Tokyo last eight.",
        author: "TENNIS CORRESPONDENT",
        location: "VIENNA"
      },
      {
        kicker: "WORLD WRESTLING",
        headline: "18-Year-Old Kajal Dhochak Clinches Historic Silver in Astana",
        summary: "Indian heavyweight teen puts up gallant 6-8 fight against Ukraine's Anastasiya Alpyeyeva in World Championship final.",
        author: "SANDEEP MALIK",
        location: "ASTANA"
      },
      {
        kicker: "DOMESTIC FIRST-CLASS",
        headline: "Ranji Trophy: Nishant Sindhu Scores Gritty Ton; Musheer Takes 6 Wkts",
        summary: "Haryana star fights back with sublime century, but Mumbai enforces follow-on behind Musheer Khan's devastating spin spell.",
        author: "CRICKET DESK",
        location: "ROHTAK"
      },
      {
        kicker: "CAMPUS SPORTS",
        headline: "Delhi University Sports Cup Inaugurated at Historic Roshanara Club",
        summary: "Union Minister Mandaviya and Delhi L-G Sandhu launch inter-university athletic meet promoting grassroots collegiate competitions.",
        author: "STAFF REPORTER",
        location: "DELHI"
      }
    ],
    digestTitle: "SPORTS TOP 10 NATIONAL & GLOBAL STADIUM HIGHLIGHTS",
    digestItems: [
      { number: 1, headline: "Passing of Neeraj Yadav", summary: "Three-time Asian Para Games gold medalist tragically passes away at 42.", category: "IN MEMORIAM" },
      { number: 2, headline: "WPL 2027 Auction Sparks", summary: "Sophie Molineux commands ₹1.10 Cr; Karnataka teen Uma Kashvi joins Delhi Capitals.", category: "WOMEN'S CRICKET" },
      { number: 3, headline: "Liverpool Beat Chelsea 6-5", summary: "Reds advance to Carabao Cup quarterfinals after dramatic penalty shootout.", category: "ENGLISH FOOTBALL" },
      { number: 4, headline: "De Minaur & Maya Joint Win", summary: "Straight-set victories in Vienna and Tokyo boost rankings for year-end championships.", category: "PRO TENNIS" },
      { number: 5, headline: "Abhishek Sharma ICC No. 1", summary: "Indian left-hander returns to top of global T20I batting rankings.", category: "CRICKET RANKINGS" },
      { number: 6, headline: "Neymar 2-Match Suspension", summary: "Brazilian superstar sanctioned under strict national 'Vinícius Law' anti-abuse rules.", category: "FOOTBALL DISCIPLINE" },
      { number: 7, headline: "Delhi University Cup Launch", summary: "Minister Mandaviya and L-G Sandhu kick off campus sports at Roshanara Club.", category: "GRASSROOTS SPORTS" },
      { number: 8, headline: "Kajal Dhochak Silver Medal", summary: "18-year-old wrestler displays world-class grit in World Championship finals in Astana.", category: "AMATEUR WRESTLING" },
      { number: 9, headline: "Ranji Trophy Centurions", summary: "Nishant Sindhu's hundred battles Musheer Khan's 6-wicket haul in Mumbai-Haryana clash.", category: "DOMESTIC CRICKET" },
      { number: 10, headline: "Kylian Mbappé Online Remarks", summary: "Real Madrid issues formal clarification following interview controversy.", category: "EUROPEAN FOOTBALL" }
    ],
    editorial: {
      kicker: "SPORTS TRIBUTE · PARALYMPIC SPIRIT",
      headline: "The Unyielding Champion: Why Neeraj Yadav’s Legacy Will Outlive the Podium",
      subhead: "Beyond medals and national anthems, Neeraj's life was a testament to the transformative dignity of para-athletics.",
      col1: [
        "In a country where sporting heroes are predominantly celebrated under the blinding lights of cricket stadiums, athletes like Neeraj Yadav build monuments in silence. Stricken with polio as a toddler, his journey was not merely about throwing a javelin or spinning a discus; it was about reclaiming physical sovereignty.",
        "Across Incheon, Jakarta, and Hangzhou, his gold-medal throws were masterclasses in kinetic torque and sheer psychological willpower. Yet, what defined Neeraj most was his refusal to accept the patronizing sympathy often reserved for differently-abled athletes."
      ],
      col2: [
        "He demanded rigor, equal prize purse parity, and structural infrastructure. The modern surge in India's Paralympic medal hauls stands squarely on the shoulders of pioneers like him who carved out the training tracks when none existed.",
        "As the nation bids him farewell, the greatest homage India can offer is ensuring that no young para-athlete in a rural hamlet is denied the equipment, dignity, and coaching that Neeraj fought a lifetime to legitimize."
      ],
      author: "— Sports Editorial Board",
      bureau: "New Delhi Bureau",
      sideArticles: [
        {
          kicker: "CRICKET ANALYSIS",
          headline: "Fearless Strike Rates: How Abhishek Sharma Re-engineered Modern T20 Openers",
          summary: "Uncompromising boundary aggression in the powerplay sets a new tactical benchmark for Team India.",
          byline: "BY HARISH SHARMA · SENIOR CRICKET ANALYST"
        },
        {
          kicker: "WOMEN'S SPORTS SURGE",
          headline: "The ₹1.10 Crore Bidding War: WPL's Financial Maturation in Season 4",
          summary: "Record franchise valuations reflect genuine broadcast ratings and packed stadium turnouts.",
          byline: "BY ANANYA CHOPRA · CRICKET WRITER"
        },
        {
          kicker: "FOOTBALL GOVERNANCE",
          headline: "Enforcing the Vinícius Law: Why Brazil's Anti-Abuse Codes Set a Global Precedent",
          summary: "Holding global superstars accountable reinforces zero-tolerance standards across domestic leagues.",
          byline: "BY CARLOS MENDES · FOOTBALL CORRESPONDENT"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 6: POLITICS (National Political Chronicle & Governance Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 6,
    sectionKey: "POLITICS",
    sectionTitle: "POLITICS & GOVERNANCE",
    editionSubtitle: "NATIONAL POLITICAL CHRONICLE · ELECTIONS, PARLIAMENT & STATE POLITY",
    topStripLabel: "PAGE 6 · POLITICS & GOVERNANCE · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "CONSTITUTIONAL LAW & ELECTORAL INTEGRITY",
      headline: "SUPREME COURT REBUKES ELECTION COMMISSION ON VOTER FORMS; 64.5 LAKH MISSING VOTERS SPARKS POLITICAL STORM",
      subhead: "Apex court firmly observes Election Commission cannot modify statutory registration Forms 6, 7, and 8, as Karnataka electoral roll discrepancies and mass voter deletions trigger nationwide political outcry.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
      imageAlt: "Supreme Court bronze scales of justice representing constitutional integrity",
      caption: "The Supreme Court of India deliberates on electoral roll transparency, statutory registration safeguards, and procedural voter rights on Thursday. (Photo: Legal Correspondent / KhabarGanit)",
      col1: [
        "NEW DELHI — In a profound reaffirmation of constitutional safeguards, the Supreme Court of India on Thursday delivered a sharp observation during hearings on the Special Intensive Revision (SIR) of electoral rolls, asserting that the Election Commission cannot modify statutory voter forms without legislative authority.",
        "A bench headed by senior justices noted that Forms 6, 7, and 8—which govern voter enrollment, deletion objections, and constituency modifications—are statutory instruments framed under the Representation of the People Act, 1950, and cannot be altered through executive guidelines.",
        "The hearing assumed acute political urgency following reports from Karnataka, where data revealed that approximately 64.5 lakh eligible citizens—a majority of them young voters—are potentially missing from the finalized electoral rolls, sparking widespread opposition protests across Bengaluru."
      ],
      col2: [
        "STATUTORY RIGOR VS EXECUTIVE TWEAKS — The court underlined that in a constitutional democracy of 1.4 billion citizens, the fundamental franchise right cannot be subjected to opaque bureaucratic software algorithms or sudden evidentiary hurdles.",
        "The bench directed the Commission to place on record the complete data-verification trail and ensure that no legitimate voter is purged without documented physical verification and reasoned written notice.",
        "Political observers note that the judicial intervention arrives alongside intense political focus on DVAC searches against DMK leadership in Tamil Nadu and high-stakes MLC counting in Maharashtra."
      ]
    },
    sideStories: [
      {
        kicker: "VIGILANCE CRACKDOWN · TAMIL NADU",
        headline: "DVAC RAIDS TARGET PREMISES LINKED TO EX-MINISTER K.N. NEHRU",
        summary: "Statewide vigilance searches launched across Chennai, Tiruchirappalli, and Coimbatore in connection with multi-crore cash-for-jobs recruitment scam investigation."
      },
      {
        kicker: "PARLIAMENT · RAJYA SABHA BYPOLL",
        headline: "HARDEEP SINGH PURI NAMED BJP CANDIDATE FROM MADHYA PRADESH",
        summary: "Union Minister officially nominated for the upcoming Rajya Sabha by-election from Madhya Pradesh; party high command finalizes filing roadmap."
      },
      {
        kicker: "COUNCIL POLLS · MAHARASHTRA",
        headline: "MAHARASHTRA MLC COUNTS: INTENSE RIVALRY IN PUNE & AMRAVATI",
        summary: "Regional political battles peak as ruling coalition and opposition lock horns over legislative council tallies in key agricultural and urban belts."
      }
    ],
    topStories: [
      {
        kicker: "CABINET DECISION",
        headline: "Union Cabinet Clears 3% DA Hike for Central Government Staff",
        summary: "Central government employees and pensioners receive timely financial cushion ahead of Diwali with retrospective July 1 implementation.",
        author: "POLICY BUREAU",
        location: "NEW DELHI"
      },
      {
        kicker: "DIPLOMATIC ENGAGEMENT",
        headline: "India Transmits Diplomatic SCO Invitation to Pakistan for Delhi Conclave",
        summary: "New Delhi formally extends official diplomatic invitation to Islamabad for the upcoming Shanghai Cooperation Organisation regional summit.",
        author: "DIPLOMATIC DESK",
        location: "NEW DELHI"
      },
      {
        kicker: "JUDICIAL HEARINGS",
        headline: "Apex & High Courts Hear Bhojshala & Race Course Mosque Matters",
        summary: "Supreme Court hears Bhojshala namaz petitions while Delhi High Court addresses Race Course mosque matters and reprimands Delhi Police on procedural delays.",
        author: "LEGAL CORRESPONDENT",
        location: "NEW DELHI"
      },
      {
        kicker: "GLOBAL POLITICS",
        headline: "Trump Denies Directing Vance on Iran Peace Talks; Cites Medical Aid",
        summary: "Donald Trump publicly clarifies communications with Gulf intermediaries centered strictly on humanitarian medical supplies for Iran, not peace talks.",
        author: "WASHINGTON BUREAU",
        location: "WASHINGTON D.C."
      }
    ],
    digestTitle: "POLITICS TOP 10 NATIONAL & REGIONAL DEVELOPMENTS",
    digestItems: [
      { number: 1, headline: "TN Vigilance Raids on K.N. Nehru", summary: "DVAC launches statewide searches against former Tamil Nadu minister over cash-for-jobs recruitment scam.", category: "VIGILANCE & GRAFT" },
      { number: 2, headline: "Supreme Court Hearing on Voter Forms", summary: "Apex court rules Election Commission cannot modify statutory registration Forms 6, 7, and 8.", category: "CONSTITUTIONAL LAW" },
      { number: 3, headline: "Karnataka 64.5 Lakh Missing Voters", summary: "Electoral rolls discrepancy triggers major political pushback; majority of missing are young voters.", category: "ELECTORAL ROLLS" },
      { number: 4, headline: "Union Cabinet 3% DA Hike", summary: "Central government approves Dearness Allowance revision for employees and pensioners effective July 1.", category: "CABINET POLICY" },
      { number: 5, headline: "Cyclone Arnab Political Response", summary: "Heavy rains pound eastern coast, prompting massive evacuation drives across 17 Odisha districts.", category: "DISASTER GOVERNANCE" },
      { number: 6, headline: "SCO Invitation to Pakistan", summary: "India formally transmits diplomatic invitation to Pakistan for New Delhi regional conference.", category: "SOUTH ASIAN DIPLOMACY" },
      { number: 7, headline: "Hardeep Puri Rajya Sabha Nomination", summary: "Union Minister named as BJP candidate for Madhya Pradesh upper house by-election.", category: "PARLIAMENTARY AFFAIRS" },
      { number: 8, headline: "Courts on Religious Landmarks", summary: "SC hears Bhojshala petitions; Delhi HC hears Race Course mosque matter and reprimands Delhi Police.", category: "JUDICIAL BENCH" },
      { number: 9, headline: "Maharashtra MLC Election Counts", summary: "Local political focus intensifies around legislative council counts in Pune and Amravati.", category: "STATE POLITY" },
      { number: 10, headline: "Trump Clarifies Iran Diplomacy", summary: "Donald Trump denies directing JD Vance on peace talks, clarifying talks centered on medical aid.", category: "GLOBAL GEOPOLITICS" }
    ],
    editorial: {
      kicker: "CONSTITUTIONAL EDITORIAL · THE BALLOT BOX",
      headline: "The Inviolable Ballot: Why Electoral Roll Accuracy Cannot Be Subcontracted to Software",
      subhead: "The Supreme Court's warning on statutory forms is a necessary constitutional checkpoint in an increasingly algorithm-driven administrative state.",
      col1: [
        "In a constitutional republic, the electoral roll is not merely a bureaucratic census; it is the sacred registry of the sovereign citizens who lend legitimacy to the state. When allegations surface that millions of legitimate voters were purged without verifiable notice, democracy itself is undermined.",
        "The Supreme Court's clear assertion that the Election Commission cannot unilaterally reshape Forms 6, 7, and 8 strikes at the core of administrative accountability. Administrative efficiency cannot come at the expense of statutory disenfranchisement."
      ],
      col2: [
        "In recent years, the rush to automate voter list revisions through algorithmic cross-referencing and database matching has outpaced ground-level verification. When software flags potential duplicates, the burden of proof must not be arbitrarily shifted onto marginalized citizens.",
        "The apex court's insistence on verifiable physical audits and written notifications restores the proper constitutional hierarchy: technology must serve the voter, not police their democratic birthright."
      ],
      author: "— Supreme Court Editorial Desk",
      bureau: "New Delhi Bureau",
      sideArticles: [
        {
          kicker: "VIGILANCE & RECKONING",
          headline: "Cash for Jobs: The High-Stakes DVAC Probe in Tamil Nadu",
          summary: "Statewide raids on political leadership highlight the escalating scrutiny over recruitment integrity.",
          byline: "BY K. SENGUPTA · SOUTHERN BUREAU"
        },
        {
          kicker: "PARLIAMENTARY MATH",
          headline: "Upper House Strategies: Why Madhya Pradesh Was Chosen for Hardeep Puri",
          summary: "BJP balances ministerial tenure requirements with regional caste and coalition considerations.",
          byline: "BY PRADEEP SHARMA · PARLIAMENT CORRESPONDENT"
        },
        {
          kicker: "DIPLOMACY ESSAY",
          headline: "Eurasian Realpolitik: India's Diplomatic Masterclass in SCO Stewardship",
          summary: "Engaging difficult neighbors within multilateral umbrellas showcases New Delhi's growing diplomatic maturity.",
          byline: "BY AMBASSADOR S. K. VERMA · STRATEGIC AFFAIRS"
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 7: ENTERTAINMENT (Cinema & Cultural Arts Edition)
  // ═══════════════════════════════════════════════════════════════════
  {
    pageNumber: 7,
    sectionKey: "ENTERTAINMENT",
    sectionTitle: "ENTERTAINMENT & ARTS",
    editionSubtitle: "CINEMA, CULTURE, BOX OFFICE & CELEBRITY CHRONICLE",
    topStripLabel: "PAGE 7 · ENTERTAINMENT & ARTS · THURSDAY, 29 OCTOBER 2026",
    leadStory: {
      kicker: "DIWALI BLOCKBUSTER TEASER · MARVEL CINEMATIC UNIVERSE",
      headline: "AVENGERS: DOOMSDAY REVEALS SPECIAL DIWALI SURPRISE FOR INDIAN MARVEL FANS",
      subhead: "Robert Downey Jr. and Chris Evans unveil exclusive India-first release window and unseen concept footage, igniting advance celebrations across theatres nationwide.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
      imageAlt: "Cinema auditorium and dramatic theatrical projection lighting for film premiere",
      caption: "Cinemas across India light up as Marvel Studios announces exclusive festive preview schedules and concept footage for 'Avengers: Doomsday' on Thursday. (Photo: Film Archive / KhabarGanit)",
      col1: [
        "MUMBAI / LOS ANGELES — In a sensational festive bonanza that set social media ablaze, Marvel Studios superstars Robert Downey Jr. and Chris Evans on Thursday unveiled a dedicated Diwali video message for Indian audiences, teasing exclusive India-first release arrangements for the highly anticipated blockbuster 'Avengers: Doomsday'.",
        "The special greeting, broadcast across major digital streaming channels, featured never-before-seen conceptual animatics of Doctor Doom confronting Earth's mightiest heroes, accompanied by orchestral themes infused with traditional Indian instrumental flourishes.",
        "The studio confirmed that Indian theatres in Mumbai, Delhi, Bengaluru, Hyderabad, and Chennai will host early preview midnight screenings 48 hours prior to the global theatrical rollout, cementing India as one of Marvel's highest-priority box office territories."
      ],
      col2: [
        "THEATRICAL FEVER & ADVANCE BUZZ — Multiplex operators across the country reported unprecedented traffic spikes on ticketing portals, with trade analysts projecting opening-weekend advance ticket bookings to eclipse all previous foreign film records in the subcontinent.",
        "The announcement sparked widespread celebrations among comic book fan clubs and pop-culture conventions, who hailed the inclusion of localized festival tie-ins as a watershed moment for international film distribution in South Asia.",
        "Industry trade experts predict the superhero epic will anchor a record-breaking holiday box office quarter for Indian exhibition chains."
      ]
    },
    sideStories: [
      {
        kicker: "MYTHOLOGICAL SCALE · FIRST LOOK",
        headline: "RAMAYANA: PART 1 DRAWING 'LORD OF THE RINGS' COMPARISONS",
        summary: "Early visual teasers of Ranbir Kapoor and Yash's mythological magnum opus ignite widespread acclaim for global-standard VFX world-building."
      },
      {
        kicker: "HOLLYWOOD LEGEND · SAG-AFTRA",
        headline: "AL PACINO TO RECEIVE LIFETIME ACHIEVEMENT AWARD IN 2027",
        summary: "Actors union honors the 86-year-old Oscar winner for sixty years of legendary cinematic performances and philanthropic humanitarian work."
      },
      {
        kicker: "TRIBUTE & CONDOLENCES",
        headline: "STATE FUNERAL ANNOUNCED FOR VETERAN ACTOR NANA PATEKAR",
        summary: "Maharashtra leadership and cultural luminaries pay tribute to the legendary actor-philanthropist following his demise, honoring his immense artistic legacy."
      }
    ],
    topStories: [
      {
        kicker: "BOLLYWOOD REUNION",
        headline: "Bhumi Pednekar Reunites with Akshay Kumar in Priyadarshan Film",
        summary: "Celebrated comic ensemble brings together the duo for an upcoming high-octane comedy following extensive script readings.",
        author: "ROHINI GUPTA",
        location: "MUMBAI"
      },
      {
        kicker: "CELEBRITY DISPUTE",
        headline: "Parineeti Chopra Slams Fabricated Feud Rumours on Social Media",
        summary: "Actress publicly dispels media fabrications regarding alleged discord with co-stars, calling for journalistic integrity in entertainment reporting.",
        author: "KAVITA MEHRA",
        location: "MUMBAI"
      },
      {
        kicker: "K-POP CHRONICLE",
        headline: "Ex-BIGBANG Member Seungri Confirms Marriage & Fatherhood",
        summary: "Former musical idol announces personal milestone and upcoming birth of his child years after retreating from active entertainment.",
        author: "SEOUL DESK",
        location: "SEOUL"
      },
      {
        kicker: "BOX OFFICE TRACKER",
        headline: "Jayasurya's 'Titans' Nets ₹2.82 Cr; Sreenath Bhasi's 'Orijinal' Steady",
        summary: "Malayalam cinema continues strong theatrical footprint as regional investigative thrillers register consistent weekday occupancy.",
        author: "ANAND SHANKAR",
        location: "KOCHI"
      }
    ],
    digestTitle: "ENTERTAINMENT TOP 10 CELEBRITY & CINEMA WIRE",
    digestItems: [
      { number: 1, headline: "Avengers: Doomsday Diwali Teaser", summary: "Robert Downey Jr. & Chris Evans reveal exclusive early Indian release schedule.", category: "HOLLYWOOD CINEMA" },
      { number: 2, headline: "Ramayana Part 1 Early Reactions", summary: "Ranbir Kapoor and Yash's epic visuals compared to Lord of the Rings scale.", category: "INDIAN BLOCKBUSTERS" },
      { number: 3, headline: "Al Pacino Lifetime Honor", summary: "SAG-AFTRA announces prestigious career award for legendary actor.", category: "GLOBAL HONORS" },
      { number: 4, headline: "Tribute to Nana Patekar", summary: "Maharashtra government accords full state honors to beloved cultural icon.", category: "MEMORIAM & STATE" },
      { number: 5, headline: "Bhumi & Akshay Reunion", summary: "Priyadarshan directs the celebrated duo in a brand new slapstick comedy.", category: "CASTING REVEALS" },
      { number: 6, headline: "Parineeti Slams Rumours", summary: "Actress firmly dismisses fabricated rift allegations with co-stars.", category: "CELEBRITY STATEMENTS" },
      { number: 7, headline: "Seungri Marriage & Baby News", summary: "Former BIGBANG singer announces marriage and impending birth of first child.", category: "K-POP CELEBRITY" },
      { number: 8, headline: "Janhvi Kapoor on 'Peddi'", summary: "Actress openly reflects on character objectification during Koffee With Karan.", category: "INTERVIEW REVELATIONS" },
      { number: 9, headline: "Regional Box Office Report", summary: "Jayasurya's 'Titans' crosses ₹2.82 crore in Kerala as 'Orijinal' opens firmly.", category: "BOX OFFICE" },
      { number: 10, headline: "Hayden Panettiere Investigation", summary: "Official autopsy report concludes untimely passing was due to accidental causes.", category: "HOLLYWOOD NEWS" }
    ],
    editorial: {
      kicker: "CINEMA ESSAY · POP CULTURE",
      headline: "The Globalization of the Festive Screen: Why Hollywood Celebrates Diwali",
      subhead: "When Robert Downey Jr. and Marvel bow to Indian festival dates, it signals a permanent shift in the world's theatrical gravity.",
      col1: [
        "There was a time when Hollywood releases arrived in Indian theatres months after their Western premieres, often dubbed in perfunctory edits and relegated to second-tier cinema halls. Those days of cultural condescension are decisively over.",
        "Thursday's customized Diwali greeting from Robert Downey Jr. and Chris Evans—complete with India-first midnight screenings for 'Avengers: Doomsday'—demonstrates that South Asia is no longer a peripheral export territory; it is the linchpin of global theatrical viability."
      ],
      col2: [
        "With Indian audiences demonstrating an insatiable appetite for grand visual spectacles—from homegrown epics like 'Ramayana' to international cinematic universes—studios must court Indian moviegoers with respect, cultural resonance, and prioritized exhibition windows.",
        "Cinema remains the ultimate shared communal temple, and as the lights dim this festive season, the celebration is truly global."
      ],
      author: "— Cinema Arts Desk",
      bureau: "Mumbai Bureau",
      sideArticles: [
        {
          kicker: "MYTHOLOGY & CGI",
          headline: "Building Ancient Ayodhya: How VFX Studios Re-imagined the Epic Ramayana",
          summary: "Over 4,000 artists across Mumbai and London combine practical sets with photorealistic rendering.",
          byline: "BY KARAN JOSHI · VFX SUPERVISOR"
        },
        {
          kicker: "THE ACTOR'S CRAFT",
          headline: "Six Decades of Gravity: Why Al Pacino's Intensity Defined Screen Acting",
          summary: "From The Godfather to Scarface and Heat, the Method legend revolutionized dramatic intensity.",
          byline: "BY MEERA MENON · FILM CRITIC"
        },
        {
          kicker: "REGIONAL RENAISSANCE",
          headline: "The Malayalam Thriller Surge: Small Budgets, Massive Storytelling Returns",
          summary: "Content-driven screenplays continue to outshine bloated star-driven vehicles across the box office.",
          byline: "BY ARJUN NAIR · SOUTH CINEMA BUREAU"
        }
      ]
    }
  }
];
