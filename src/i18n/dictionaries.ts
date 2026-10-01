import type { Locale } from "./config";

export type Dictionary = {
  brandName: string;
  nav: {
    about: string;
    services: string;
    projects: string;
    clients: string;
    gallery: string;
    news: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    whyTitle: string;
    keyClient: string;
    founded: string;
    clientsTitle: string;
    clientsDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    viewAll: string;
    projectsTitle: string;
    projectsDesc: string;
    moreProjects: string;
    newsTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    contactCta: string;
  };
  aboutPage: {
    title: string;
    mission: string;
    vision: string;
    missionBody: string;
    visionBody: string;
    strengthsTitle: string;
    strengthsDesc: string;
    greetingTitle: string;
    teamTitle: string;
    teamDesc: string;
    profileTitle: string;
    labels: {
      company: string;
      founded: string;
      keyClient: string;
      address: string;
      phone: string;
      email: string;
    };
  };
  servicesPage: {
    title: string;
    description: string;
    coreTitle: string;
    coreDesc: string;
  };
  projectsPage: {
    title: string;
    description: string;
    portfolioTitle: string;
    searchPlaceholder: string;
    emptyLabel: string;
    resultLabel: string;
  };
  galleryPage: {
    title: string;
    description: string;
    gridTitle: string;
    emptyLabel: string;
    cardView: string;
    listView: string;
  };
  clientsPage: {
    title: string;
    description: string;
    eyebrow: string;
    directoryTitle: string;
    directoryDesc: string;
    emptyLabel: string;
    noLogoLabel: string;
  };
  newsPage: {
    title: string;
    updatesTitle: string;
  };
  contactPage: {
    title: string;
    description: string;
    formTitle: string;
    formDesc: string;
    address: string;
    registrationOffice: string;
    apFactoryOffice: string;
    koreaOffice: string;
    phone: string;
    email: string;
    fax: string;
    name: string;
    company: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    required: string;
  };
  footer: {
    blurb: string;
    links: string;
    contact: string;
    familySites: string;
    familySitesPlaceholder: string;
    developedBy: string;
    admin: string;
  };
  company: {
    description: string;
    founded: string;
    address: string;
    apAddress: string;
    koreaAddress: string;
    koreaBizInfo: string;
    phone: string;
    email: string;
    fax: string;
    keyClient: string;
  };
  strengths: { title: string; description: string }[];
  clients: { name: string; note: string }[];
  services: {
    id: string;
    title: string;
    description: string;
    items: string[];
  }[];
  projects: Record<
    string,
    { title: string; client: string; category: string; description: string }
  >;
  news: Record<string, { title: string; summary: string; content: string }>;
};

const ko: Dictionary = {
  brandName: "JW Industrial Tech Services",
  nav: {
    about: "회사소개",
    services: "사업영역",
    projects: "프로젝트",
    clients: "고객사",
    gallery: "갤러리",
    news: "뉴스",
    contact: "문의",
  },
  hero: {
    headline: "모빌리티를 움직이는\n엔지니어링",
    subheadline:
      "기아자동차와 함께 성장한 설계·해석·시험 역량으로, 제조 현장의 문제를 끝까지 풀어냅니다.",
    ctaPrimary: "사업 영역 보기",
    ctaSecondary: "문의하기",
  },
  home: {
    whyTitle: "완성차 기준의 엔지니어링",
    keyClient: "주요 고객",
    founded: "설립",
    clientsTitle: "주요 고객",
    clientsDesc:
      "인도 완성차·부품 파트너와 함께 설계부터 검증까지 실무 과제를 수행합니다.",
    servicesTitle: "사업 영역",
    servicesDesc:
      "산업용 소모품, 기계 엔지니어링, 제작·제조 영역에서 실무형 지원을 제공합니다.",
    viewAll: "전체 보기",
    projectsTitle: "주요 프로젝트",
    projectsDesc: "기아자동차를 중심으로 수행한 최근 프로젝트입니다.",
    moreProjects: "프로젝트 더 보기",
    newsTitle: "최근 소식",
    ctaTitle: "과제를 함께 검토해 드립니다",
    ctaDesc: "설계, 해석, 시험, 공정 — 필요한 범위부터 상담할 수 있습니다.",
    contactCta: "문의하기",
  },
  aboutPage: {
    title: "회사소개",
    mission: "미션",
    vision: "비전",
    missionBody:
      "고객의 제품 경쟁력을 높이는 엔지니어링 파트너로서, 설계 품질과 일정 신뢰를 동시에 지키겠습니다.",
    visionBody:
      "모빌리티 전환 시대에 필요한 차세대 설계·해석·시험 플랫폼을 선도하는 엔지니어링 기업이 됩니다.",
    strengthsTitle: "우리의 강점",
    strengthsDesc: "기아자동차 프로젝트에서 쌓은 실무 기준이 회사의 기본입니다.",
    greetingTitle: "대표 인사말",
    teamTitle: "팀원 소개",
    teamDesc: "JW Industrial Tech Services를 이끄는 사람들입니다.",
    profileTitle: "회사 정보",
    labels: {
      company: "회사명",
      founded: "설립",
      keyClient: "주요 고객",
      address: "주소",
      phone: "전화",
      email: "이메일",
    },
  },
  servicesPage: {
    title: "사업 영역",
    description:
      "산업용 소모품, 기계 엔지니어링, 제작·제조까지 JWITS의 핵심 사업 영역을 소개합니다.",
    coreTitle: "핵심 서비스",
    coreDesc:
      "Project Director JW Lee 지휘 아래 산업용 소모품·기계 엔지니어링·제작 제조 영역을 통합 지원합니다.",
  },
  projectsPage: {
    title: "프로젝트",
    description:
      "기아자동차를 주요 고객으로, 설계·해석·시험·공정 과제를 수행해 왔습니다.",
    portfolioTitle: "프로젝트 포트폴리오",
    searchPlaceholder: "연도, 고객, 프로젝트명 검색",
    emptyLabel: "검색 결과가 없습니다.",
    resultLabel: "{filtered} / {total}건",
  },
  galleryPage: {
    title: "갤러리",
    description: "현장과 프로젝트 활동을 사진으로 소개합니다.",
    gridTitle: "사진 갤러리",
    emptyLabel: "등록된 사진이 없습니다.",
    cardView: "카드로 보기",
    listView: "리스트로 보기",
  },
  clientsPage: {
    title: "고객사",
    description:
      "글로벌 완성차·부품 파트너와 함께 설계부터 검증까지 신뢰할 수 있는 기술력을 쌓아왔습니다.",
    eyebrow: "Directory",
    directoryTitle: "주요 고객사",
    directoryDesc:
      "JW Industrial Tech Services와 함께한 주요 고객사입니다. 로고와 함께 확인하실 수 있습니다.",
    emptyLabel: "등록된 고객사가 없습니다.",
    noLogoLabel: "로고 없음",
  },
  newsPage: {
    title: "뉴스·공지",
    updatesTitle: "최근 업데이트",
  },
  contactPage: {
    title: "문의하기",
    description: "설계, 해석, 시험, 공정 엔지니어링 협업을 환영합니다.",
    formTitle: "프로젝트 문의",
    formDesc: "과제 범위와 일정을 알려주시면 확인 후 회신드립니다.",
    address: "주소",
    registrationOffice: "Registration Office",
    apFactoryOffice: "AP 공장 · 사무실",
    koreaOffice: "한국 지사",
    phone: "전화",
    email: "이메일",
    fax: "팩스",
    name: "이름",
    company: "회사",
    message: "문의 내용",
    submit: "문의 보내기",
    submitting: "전송 중...",
    success: "문의가 접수되었습니다. 감사합니다.",
    required: "*",
  },
  footer: {
    blurb:
      "기아자동차를 주요 고객으로 설계·해석·시험·공정 엔지니어링을 수행합니다.",
    links: "바로가기",
    contact: "연락처",
    familySites: "패밀리 사이트",
    familySitesPlaceholder: "사이트 선택",
    developedBy: "Developed by",
    admin: "관리자",
  },
  company: {
    description:
      "JW Industrial Tech Services는 자동차 및 모빌리티 산업을 위한 엔지니어링 솔루션을 제공합니다.\n기아자동차를 비롯한 글로벌 완성차·부품 파트너와 함께 설계부터 검증까지 신뢰할 수 있는 기술력을 쌓아왔습니다.",
    founded: "2012",
    address:
      "24/1, 1st Floor Makers Hotel Biz 120 Doddanekundi, Marathalli Ferns City Road, Bengaluru, Bangalore KA 560037",
    apAddress:
      "Anantapur Fabrication Plant: Gana Saai Industries Industrial Estate, Pilligundla, Anantapur, Andhra Pradesh 515001, India",
    koreaAddress:
      "18611 경기도 화성시 향남읍 2774번길 61 모아엘가 803동 1004호",
    koreaBizInfo: "사업자등록번호 279-35-01121 (전자세금용: woojinindia@outlook.com)",
    phone: "031-8015-9200",
    email: "lee@jwits.co.kr",
    fax: "031-8015-9201",
    keyClient: "기아자동차",
  },
  strengths: [
    {
      title: "완성차 실무 경험",
      description:
        "기아자동차 프로젝트에서 검증된 프로세스와 품질 기준을 보유하고 있습니다.",
    },
    {
      title: "설계–해석–시험 일관 대응",
      description:
        "단절 없는 엔지니어링 체인으로 개발 리스크를 줄이고 의사결정을 빠르게 합니다.",
    },
    {
      title: "현장 중심 문제 해결",
      description:
        "도면과 해석 결과만이 아니라, 생산·조립·내구 현장의 제약까지 함께 설계합니다.",
    },
  ],
  clients: [
    {
      name: "기아자동차",
      note: "주요 고객 · 설계·해석·시험·공정",
    },
    {
      name: "완성차 협력사",
      note: "부품·모듈 개발 지원",
    },
    {
      name: "부품 협력사",
      note: "구조·NVH·내구 해석",
    },
  ],
  services: [
    {
      id: "consumables",
      title: "Industrial Consumables",
      description:
        "인증 유통·딜러십을 기반으로 시장 조사부터 품질 납품까지 산업용 소모품 사업을 수행합니다.",
      items: [
        "Authorized Distributor Certificate",
        "Dealership Contract",
        "Agency Contract",
        "Market Research",
        "Research & Development",
        "Cost Down Cost Investigation",
        "Quality Delivery",
      ],
    },
    {
      id: "machinery",
      title: "Machinery Engineering",
      description:
        "프로젝트 기획부터 설치·이설·유지보수와 품질 관리·엔지니어 공급까지 기계 엔지니어링을 제공합니다.",
      items: [
        "Project Planning",
        "Machinery Installation",
        "In-land Transportation",
        "Unloading & Unpacking",
        "Installation & Erection",
        "Dismantle",
        "Repairing & Maintenance",
        "Assistant Help, A/S",
        "Parts Trading",
        "Korean Quality Management",
        "Coordinator",
        "Leading & Control",
        "Project Supervision",
        "Mechanical / Electrical Engineer Supply",
        "Press, Assembly, Body Paint Shop Engineering",
        "Mechanical",
        "Electrical",
      ],
    },
    {
      id: "fabrication",
      title: "Machine Fabrication & Manufacturing",
      description:
        "도면 개발부터 랙·알루미늄·철골 제작까지 현장 맞춤 제작·제조를 수행합니다.",
      items: [
        "Research & Development",
        "Drawing & Development",
        "Rack, Step, Pallet",
        "Aluminum Fabrication",
        "H-Beam Flooring",
        "Safety Fence, Door, Jig",
        "Steel Fabrication",
      ],
    },
    {
      id: "site-hse",
      title: "Site Operation & Hse",
      description:
        "일일 작업 계획·현장 지원부터 안전·보건·환경 관리까지 사이트 운영을 지원합니다.",
      items: [
        "Create A Daily Work Plan",
        "Check In And Out",
        "Check Incoming Items",
        "Check Work Flow",
        "Commissioning Response",
        "Production Response",
        "Customer Support",
        "Tool Room Managing",
        "Site Support",
        "People Plan",
        "Hazard Identification",
        "Daily Safety And Health Training",
        "Work Time Planning",
        "Trial Run And Mass Production",
        "Stretching Before & After Work",
        "Conduct Safety Training",
        "Prevention Of Safety Accidents Between Work",
        "Prevention Of Pollution For Work",
        "Prevention Of Work Condition",
        "Prevention Of Covid-19 Infection",
      ],
    },
  ],
  projects: {
    p1: {
      title: "전기차 차체 구조 경량화 설계",
      client: "기아자동차",
      category: "기계 설치",
      description:
        "전기차 차체 주요 멤버의 경량화와 강성 목표를 동시에 만족하는 설계안을 도출했습니다.",
    },
    p2: {
      title: "샤시 부품 내구·피로 해석",
      client: "기아자동차",
      category: "구조·내구 해석",
      description:
        "실차 하중 조건을 반영한 피로 해석으로 취약부를 사전 식별하고 설계 개선을 지원했습니다.",
    },
    p3: {
      title: "의장 모듈 조립성 개선",
      client: "기아자동차",
      category: "공정·설비",
      description:
        "조립 작업성과 치수 안정성을 개선하는 지그 설계 및 공정 검토를 수행했습니다.",
    },
    p4: {
      title: "파워트레인 브라켓 NVH 개선",
      client: "부품 협력사",
      category: "구조·내구 해석",
      description:
        "진동 전달 경로 분석을 통해 브라켓 형상과 체결 조건을 최적화했습니다.",
    },
    p5: {
      title: "시제품 시험 계획 및 고장 분석",
      client: "완성차 협력사",
      category: "시험·검증",
      description:
        "내구 시험 결과 기반 고장 메커니즘을 규명하고 설계 개선 방향을 제시했습니다.",
    },
    p6: {
      title: "양산 전환 공정 레이아웃 검토",
      client: "기아자동차 협력사",
      category: "공정·설비",
      description:
        "라인 작업 동선과 치구 배치를 재구성해 택트타임과 품질 안정성을 개선했습니다.",
    },
  },
  news: {
    n1: {
      title: "기아 전기차 플랫폼 부품 설계 지원 확대",
      summary: "EV 플랫폼 관련 설계·해석 과제를 추가 수주하며 협업 범위를 넓혔습니다.",
      content:
        "JW Industrial Tech Services는 기아자동차 전기차 플랫폼 부품 설계 및 구조 해석 지원 범위를 확대했습니다. 경량화와 내구 성능의 균형을 중심으로 설계 품질을 고도화하고 있습니다.",
    },
    n2: {
      title: "샤시 부품 내구 시험 인프라 보강",
      summary: "시험·검증 역량 강화를 위해 내구 시험 프로세스를 고도화했습니다.",
      content:
        "고객 요구 주기가 짧아짐에 따라 시험 계획 수립과 데이터 분석 프로세스를 표준화하고, 결과 보고 리드타임을 단축했습니다.",
    },
    n3: {
      title: "모빌리티 엔지니어링 파트너십 강화",
      summary: "완성차·부품사 대상 기술 세미나를 통해 협업 네트워크를 확대했습니다.",
      content:
        "설계 자동화와 CAE 기반 의사결정에 대한 기술 세미나를 개최하고, 장기 파트너십 논의를 이어가고 있습니다.",
    },
  },
};

const en: Dictionary = {
  brandName: "JW Industrial Tech Services",
  nav: {
    about: "About",
    services: "Services",
    projects: "Projects",
    clients: "Clients",
    gallery: "Gallery",
    news: "News",
    contact: "Contact",
  },
  hero: {
    headline: "Engineering that\nmoves mobility",
    subheadline:
      "With design, analysis, and testing capabilities developed alongside Kia Motors, we solve problems on the manufacturing floor.",
    ctaPrimary: "View services",
    ctaSecondary: "Contact us",
  },
  home: {
    whyTitle: "Engineering to OEM standards",
    keyClient: "Key client",
    founded: "Founded",
    clientsTitle: "Key clients",
    clientsDesc:
      "We work with OEM and parts partners across India from design through validation.",
    servicesTitle: "Services",
    servicesDesc:
      "Practical support across industrial consumables, machinery engineering, and fabrication.",
    viewAll: "View all",
    projectsTitle: "Featured projects",
    projectsDesc: "Recent work centered on partnerships with Kia Motors.",
    moreProjects: "More projects",
    newsTitle: "Latest news",
    ctaTitle: "Let's review your next challenge",
    ctaDesc: "Design, CAE, testing, and process — start with the scope you need.",
    contactCta: "Contact us",
  },
  aboutPage: {
    title: "About",
    mission: "Mission",
    vision: "Vision",
    missionBody:
      "As an engineering partner that strengthens product competitiveness, we deliver design quality and schedule reliability together.",
    visionBody:
      "We aim to lead next-generation design, analysis, and testing platforms for the mobility transition.",
    strengthsTitle: "Our strengths",
    strengthsDesc:
      "Practical standards built through Kia Motors projects form the foundation of our work.",
    greetingTitle: "Message from the CEO",
    teamTitle: "Our team",
    teamDesc: "The people behind JW Industrial Tech Services.",
    profileTitle: "Company profile",
    labels: {
      company: "Company",
      founded: "Founded",
      keyClient: "Key client",
      address: "Address",
      phone: "Phone",
      email: "Email",
    },
  },
  servicesPage: {
    title: "Services",
    description:
      "Explore JWITS core areas across industrial consumables, machinery engineering, and fabrication.",
    coreTitle: "Core services",
    coreDesc:
      "Under Project Director JW Lee, we deliver consumables, machinery engineering, and fabrication support.",
  },
  projectsPage: {
    title: "Projects",
    description:
      "With Kia Motors as a key client, we have delivered design, analysis, testing, and process projects.",
    portfolioTitle: "Project portfolio",
    searchPlaceholder: "Search year, client, project name",
    emptyLabel: "No matching projects.",
    resultLabel: "{filtered} / {total}",
  },
  galleryPage: {
    title: "Gallery",
    description: "Photos from our field work and project activities.",
    gridTitle: "Photo gallery",
    emptyLabel: "No photos have been published yet.",
    cardView: "Card view",
    listView: "List view",
  },
  clientsPage: {
    title: "Clients",
    description:
      "We have built trusted capabilities from design through validation with global OEM and parts partners.",
    eyebrow: "Directory",
    directoryTitle: "Major clients",
    directoryDesc:
      "Key partners of JW Industrial Tech Services, shown with their logos.",
    emptyLabel: "No clients have been published yet.",
    noLogoLabel: "No logo",
  },
  newsPage: {
    title: "News",
    updatesTitle: "Recent updates",
  },
  contactPage: {
    title: "Contact",
    description: "We welcome collaboration in design, analysis, testing, and process engineering.",
    formTitle: "Project inquiry",
    formDesc: "Share scope and schedule, and we will get back to you.",
    address: "Address",
    registrationOffice: "Registration Office",
    apFactoryOffice: "AP Factory & Office",
    koreaOffice: "Korea Office",
    phone: "Phone",
    email: "Email",
    fax: "Fax",
    name: "Name",
    company: "Company",
    message: "Message",
    submit: "Send inquiry",
    submitting: "Sending...",
    success: "Your inquiry has been received. Thank you.",
    required: "*",
  },
  footer: {
    blurb:
      "We deliver design, analysis, testing, and process engineering with Kia Motors as a key client.",
    links: "Links",
    contact: "Contact",
    familySites: "Family sites",
    familySitesPlaceholder: "Select a site",
    developedBy: "Developed by",
    admin: "Admin",
  },
  company: {
    description:
      "JW Industrial Tech Services provides engineering solutions for the automotive and mobility industries.\nTogether with Kia Motors and global OEM/parts partners, we have built trusted capabilities from design through validation.",
    founded: "2012",
    address:
      "24/1, 1st Floor Makers Hotel Biz 120 Doddanekundi, Marathalli Ferns City Road, Bengaluru, Bangalore KA 560037",
    apAddress:
      "Anantapur Fabrication Plant: Gana Saai Industries Industrial Estate, Pilligundla, Anantapur, Andhra Pradesh 515001, India",
    koreaAddress:
      "803-#1004, Sangsin-Hagil-ro 274-61, Hyangnam-eup, Hwaseong-si, Gyeonggi-do 18611, Korea",
    koreaBizInfo:
      "Korea legal entity (sole proprietorship) · Business Reg. No. 279-35-01121 (e-tax: woojinindia@outlook.com)",
    phone: "031-8015-9200",
    email: "lee@jwits.co.kr",
    fax: "031-8015-9201",
    keyClient: "Kia Motors",
  },
  strengths: [
    {
      title: "OEM project experience",
      description:
        "We apply proven processes and quality standards from Kia Motors projects.",
    },
    {
      title: "Design–CAE–test continuity",
      description:
        "A connected engineering chain reduces development risk and speeds decisions.",
    },
    {
      title: "Shop-floor problem solving",
      description:
        "We design with production, assembly, and durability constraints in mind—not drawings alone.",
    },
  ],
  clients: [
    {
      name: "Kia Motors",
      note: "Key client · Design, CAE, test & process",
    },
    {
      name: "OEM suppliers",
      note: "Component and module development support",
    },
    {
      name: "Parts suppliers",
      note: "Structural, NVH & durability analysis",
    },
  ],
  services: [
    {
      id: "consumables",
      title: "Industrial Consumables",
      description:
        "From authorized distribution and dealerships to market research and quality delivery for industrial consumables.",
      items: [
        "Authorized Distributor Certificate",
        "Dealership Contract",
        "Agency Contract",
        "Market Research",
        "Research & Development",
        "Cost Down Cost Investigation",
        "Quality Delivery",
      ],
    },
    {
      id: "machinery",
      title: "Machinery Engineering",
      description:
        "End-to-end machinery engineering from project planning and installation through maintenance, quality control, and engineer supply.",
      items: [
        "Project Planning",
        "Machinery Installation",
        "In-land Transportation",
        "Unloading & Unpacking",
        "Installation & Erection",
        "Dismantle",
        "Repairing & Maintenance",
        "Assistant Help, A/S",
        "Parts Trading",
        "Korean Quality Management",
        "Coordinator",
        "Leading & Control",
        "Project Supervision",
        "Mechanical / Electrical Engineer Supply",
        "Press, Assembly, Body Paint Shop Engineering",
        "Mechanical",
        "Electrical",
      ],
    },
    {
      id: "fabrication",
      title: "Machine Fabrication & Manufacturing",
      description:
        "Custom fabrication and manufacturing from drawing development to racks, aluminum, and steel structures.",
      items: [
        "Research & Development",
        "Drawing & Development",
        "Rack, Step, Pallet",
        "Aluminum Fabrication",
        "H-Beam Flooring",
        "Safety Fence, Door, Jig",
        "Steel Fabrication",
      ],
    },
    {
      id: "site-hse",
      title: "Site Operation & Hse",
      description:
        "Daily planning and site support through safety, health, and environmental management on site.",
      items: [
        "Create A Daily Work Plan",
        "Check In And Out",
        "Check Incoming Items",
        "Check Work Flow",
        "Commissioning Response",
        "Production Response",
        "Customer Support",
        "Tool Room Managing",
        "Site Support",
        "People Plan",
        "Hazard Identification",
        "Daily Safety And Health Training",
        "Work Time Planning",
        "Trial Run And Mass Production",
        "Stretching Before & After Work",
        "Conduct Safety Training",
        "Prevention Of Safety Accidents Between Work",
        "Prevention Of Pollution For Work",
        "Prevention Of Work Condition",
        "Prevention Of Covid-19 Infection",
      ],
    },
  ],
  projects: {
    p1: {
      title: "EV body structure lightweight design",
      client: "Kia Motors",
      category: "Mechanical installation",
      description:
        "Delivered design options meeting both weight and stiffness targets for key EV body members.",
    },
    p2: {
      title: "Chassis durability & fatigue analysis",
      client: "Kia Motors",
      category: "Structural & durability CAE",
      description:
        "Identified weak points early through fatigue analysis reflecting real vehicle load conditions.",
    },
    p3: {
      title: "Trim module assemblability improvement",
      client: "Kia Motors",
      category: "Process & tooling",
      description:
        "Improved assembly workability and dimensional stability through jig design and process review.",
    },
    p4: {
      title: "Powertrain bracket NVH improvement",
      client: "Parts supplier",
      category: "Structural & durability CAE",
      description:
        "Optimized bracket geometry and fastening conditions via vibration path analysis.",
    },
    p5: {
      title: "Prototype test planning & failure analysis",
      client: "OEM supplier",
      category: "Testing & validation",
      description:
        "Clarified failure mechanisms from durability test results and proposed design improvements.",
    },
    p6: {
      title: "Mass-production process layout review",
      client: "Kia Motors supplier",
      category: "Process & tooling",
      description:
        "Reconfigured line flow and fixture placement to improve takt time and quality stability.",
    },
  },
  news: {
    n1: {
      title: "Expanded EV platform component design support for Kia",
      summary: "Additional design and analysis work broadened our EV platform collaboration.",
      content:
        "JW Industrial Tech Services expanded design and structural analysis support for Kia Motors EV platform components, focusing on the balance of lightweighting and durability.",
    },
    n2: {
      title: "Strengthened chassis durability testing process",
      summary: "We upgraded durability testing workflows to reinforce validation capability.",
      content:
        "As customer timelines shortened, we standardized test planning and data analysis and reduced reporting lead time.",
    },
    n3: {
      title: "Stronger mobility engineering partnerships",
      summary: "Technical seminars with OEMs and suppliers expanded our collaboration network.",
      content:
        "We hosted seminars on design automation and CAE-driven decisions and continue long-term partnership discussions.",
    },
  },
};

const zh: Dictionary = {
  brandName: "JW Industrial Tech Services",
  nav: {
    about: "公司介绍",
    services: "业务领域",
    projects: "项目",
    clients: "客户",
    gallery: "图库",
    news: "新闻",
    contact: "咨询",
  },
  hero: {
    headline: "驱动出行的\n工程实力",
    subheadline:
      "凭借与起亚汽车共同成长的设计、解析与试验能力，我们持续解决制造现场的课题。",
    ctaPrimary: "查看业务",
    ctaSecondary: "联系我们",
  },
  home: {
    whyTitle: "以整车标准开展工程",
    keyClient: "主要客户",
    founded: "成立",
    clientsTitle: "主要客户",
    clientsDesc: "与整车及零部件伙伴合作，从设计到验证持续支持实务课题。",
    servicesTitle: "业务领域",
    servicesDesc: "覆盖工业耗材、机械工程与制作制造的实务支持。",
    viewAll: "查看全部",
    projectsTitle: "主要项目",
    projectsDesc: "以起亚汽车为中心开展的近期项目。",
    moreProjects: "更多项目",
    newsTitle: "最新动态",
    ctaTitle: "一起梳理您的课题",
    ctaDesc: "设计、解析、试验、工艺——可从所需范围开始咨询。",
    contactCta: "联系我们",
  },
  aboutPage: {
    title: "公司介绍",
    mission: "使命",
    vision: "愿景",
    missionBody:
      "作为提升客户产品竞争力的工程伙伴，我们同时坚守设计质量与交付可信度。",
    visionBody: "成为引领出行转型所需的新一代设计、解析与试验平台的工程企业。",
    strengthsTitle: "我们的优势",
    strengthsDesc: "在起亚汽车项目中积累的实务标准，是公司工作的基础。",
    greetingTitle: "代表致辞",
    teamTitle: "团队介绍",
    teamDesc: "推动 JW Industrial Tech Services 的团队成员。",
    profileTitle: "公司信息",
    labels: {
      company: "公司名称",
      founded: "成立",
      keyClient: "主要客户",
      address: "地址",
      phone: "电话",
      email: "邮箱",
    },
  },
  servicesPage: {
    title: "业务领域",
    description: "介绍 JWITS 在工业耗材、机械工程与制作制造方面的核心业务。",
    coreTitle: "核心服务",
    coreDesc:
      "在 Project Director JW Lee 指导下，统筹工业耗材、机械工程与制作制造业务。",
  },
  projectsPage: {
    title: "项目",
    description: "以起亚汽车为主要客户，完成设计、解析、试验与工艺相关项目。",
    portfolioTitle: "项目组合",
    searchPlaceholder: "搜索年份、客户、项目名称",
    emptyLabel: "没有匹配的项目。",
    resultLabel: "{filtered} / {total}",
  },
  galleryPage: {
    title: "图库",
    description: "展示现场与项目活动照片。",
    gridTitle: "照片图库",
    emptyLabel: "暂无已发布照片。",
    cardView: "卡片视图",
    listView: "列表视图",
  },
  clientsPage: {
    title: "客户",
    description: "我们与全球整车及零部件伙伴合作，积累了从设计到验证的可靠技术能力。",
    eyebrow: "Directory",
    directoryTitle: "主要客户",
    directoryDesc: "JW Industrial Tech Services 的主要客户，可查看公司标志。",
    emptyLabel: "暂无已发布客户。",
    noLogoLabel: "暂无标志",
  },
  newsPage: {
    title: "新闻公告",
    updatesTitle: "最近更新",
  },
  contactPage: {
    title: "联系我们",
    description: "欢迎就设计、解析、试验与工艺工程展开合作。",
    formTitle: "项目咨询",
    formDesc: "请告知课题范围与日程，我们将尽快回复。",
    address: "地址",
    registrationOffice: "Registration Office",
    apFactoryOffice: "AP 工厂 · 办公室",
    koreaOffice: "韩国分公司",
    phone: "电话",
    email: "邮箱",
    fax: "传真",
    name: "姓名",
    company: "公司",
    message: "咨询内容",
    submit: "发送咨询",
    submitting: "发送中...",
    success: "咨询已提交，感谢您。",
    required: "*",
  },
  footer: {
    blurb: "以起亚汽车为主要客户，提供设计、解析、试验与工艺工程服务。",
    links: "快捷入口",
    contact: "联系方式",
    familySites: "关联站点",
    familySitesPlaceholder: "选择站点",
    developedBy: "Developed by",
    admin: "管理后台",
  },
  company: {
    description:
      "JW Industrial Tech Services 为汽车及出行产业提供工程解决方案。\n我们与起亚汽车等全球整车及零部件伙伴合作，积累了从设计到验证的可靠技术能力。",
    founded: "2012",
    address:
      "24/1, 1st Floor Makers Hotel Biz 120 Doddanekundi, Marathalli Ferns City Road, Bengaluru, Bangalore KA 560037",
    apAddress:
      "Anantapur Fabrication Plant: Gana Saai Industries Industrial Estate, Pilligundla, Anantapur, Andhra Pradesh 515001, India",
    koreaAddress:
      "803-#1004, Sangsin-Hagil-ro 274-61, Hyangnam-eup, Hwaseong-si, Gyeonggi-do 18611, Korea",
    koreaBizInfo:
      "韩国法人（个人事业者）· 事业者登记号 279-35-01121（电子税务: woojinindia@outlook.com）",
    phone: "031-8015-9200",
    email: "lee@jwits.co.kr",
    fax: "031-8015-9201",
    keyClient: "起亚汽车",
  },
  strengths: [
    {
      title: "整车实务经验",
      description: "具备在起亚汽车项目中验证的流程与质量标准。",
    },
    {
      title: "设计–解析–试验一体应对",
      description: "连贯的工程链条降低开发风险，加快决策。",
    },
    {
      title: "以现场为中心的问题解决",
      description: "不仅关注图纸与解析结果，也同步考虑生产、装配与耐久现场约束。",
    },
  ],
  clients: [
    {
      name: "起亚汽车",
      note: "主要客户 · 设计、解析、试验、工艺",
    },
    {
      name: "整车合作方",
      note: "零部件与模块开发支持",
    },
    {
      name: "零部件合作方",
      note: "结构、NVH与耐久解析",
    },
  ],
  services: [
    {
      id: "consumables",
      title: "Industrial Consumables",
      description: "以授权经销为基础，覆盖市场调研到质量交付的工业耗材业务。",
      items: [
        "Authorized Distributor Certificate",
        "Dealership Contract",
        "Agency Contract",
        "Market Research",
        "Research & Development",
        "Cost Down Cost Investigation",
        "Quality Delivery",
      ],
    },
    {
      id: "machinery",
      title: "Machinery Engineering",
      description: "从项目策划、安装与维护到质量管理与工程师派遣的机械工程服务。",
      items: [
        "Project Planning",
        "Machinery Installation",
        "In-land Transportation",
        "Unloading & Unpacking",
        "Installation & Erection",
        "Dismantle",
        "Repairing & Maintenance",
        "Assistant Help, A/S",
        "Parts Trading",
        "Korean Quality Management",
        "Coordinator",
        "Leading & Control",
        "Project Supervision",
        "Mechanical / Electrical Engineer Supply",
        "Press, Assembly, Body Paint Shop Engineering",
        "Mechanical",
        "Electrical",
      ],
    },
    {
      id: "fabrication",
      title: "Machine Fabrication & Manufacturing",
      description: "从图纸开发到货架、铝材与钢结构的现场定制制作制造。",
      items: [
        "Research & Development",
        "Drawing & Development",
        "Rack, Step, Pallet",
        "Aluminum Fabrication",
        "H-Beam Flooring",
        "Safety Fence, Door, Jig",
        "Steel Fabrication",
      ],
    },
    {
      id: "site-hse",
      title: "Site Operation & Hse",
      description: "从每日作业计划与现场支持到安全、健康与环境管理的现场运营服务。",
      items: [
        "Create A Daily Work Plan",
        "Check In And Out",
        "Check Incoming Items",
        "Check Work Flow",
        "Commissioning Response",
        "Production Response",
        "Customer Support",
        "Tool Room Managing",
        "Site Support",
        "People Plan",
        "Hazard Identification",
        "Daily Safety And Health Training",
        "Work Time Planning",
        "Trial Run And Mass Production",
        "Stretching Before & After Work",
        "Conduct Safety Training",
        "Prevention Of Safety Accidents Between Work",
        "Prevention Of Pollution For Work",
        "Prevention Of Work Condition",
        "Prevention Of Covid-19 Infection",
      ],
    },
  ],
  projects: {
    p1: {
      title: "电动车车身结构轻量化设计",
      client: "起亚汽车",
      category: "机械安装",
      description: "为电动车车身主要构件提出同时满足轻量与刚度目标的设计方案。",
    },
    p2: {
      title: "底盘零件耐久与疲劳解析",
      client: "起亚汽车",
      category: "结构与耐久解析",
      description: "基于实车载荷条件的疲劳解析，提前识别薄弱部位并支持设计改进。",
    },
    p3: {
      title: "内饰模块装配性改善",
      client: "起亚汽车",
      category: "工艺与设备",
      description: "通过夹具设计与工艺审查，改善装配作业性与尺寸稳定性。",
    },
    p4: {
      title: "动力总成支架 NVH 改善",
      client: "零部件合作方",
      category: "结构与耐久解析",
      description: "通过振动传递路径分析，优化支架形状与紧固条件。",
    },
    p5: {
      title: "样件试验计划与故障分析",
      client: "整车合作方",
      category: "试验与验证",
      description: "基于耐久试验结果查明故障机理，并提出设计改进方向。",
    },
    p6: {
      title: "量产转换工艺布局审查",
      client: "起亚汽车合作方",
      category: "工艺与设备",
      description: "重构产线动线与夹具布置，改善节拍与质量稳定性。",
    },
  },
  news: {
    n1: {
      title: "扩大起亚电动车平台零件设计支持",
      summary: "追加承接 EV 平台相关设计与解析课题，拓展协作范围。",
      content:
        "JW Industrial Tech Services 扩大了对起亚汽车电动车平台零件设计与结构解析的支持范围，重点提升轻量化与耐久性能的平衡。",
    },
    n2: {
      title: "加强底盘零件耐久试验体系",
      summary: "为强化试验验证能力，升级了耐久试验流程。",
      content: "随着客户周期缩短，我们标准化了试验计划与数据分析流程，并缩短了结果报告周期。",
    },
    n3: {
      title: "强化出行工程合作伙伴关系",
      summary: "通过对整车与零部件企业的技术研讨，扩大合作网络。",
      content: "我们举办了设计自动化与基于 CAE 决策的技术研讨，并持续推进长期合作讨论。",
    },
  },
};

const ja: Dictionary = {
  brandName: "JW Industrial Tech Services",
  nav: {
    about: "会社紹介",
    services: "事業領域",
    projects: "プロジェクト",
    clients: "取引先",
    gallery: "ギャラリー",
    news: "ニュース",
    contact: "お問い合わせ",
  },
  hero: {
    headline: "モビリティを動かす\nエンジニアリング",
    subheadline:
      "起亜自動車とともに培った設計・解析・試験の力で、製造現場の課題を最後まで解決します。",
    ctaPrimary: "事業領域を見る",
    ctaSecondary: "お問い合わせ",
  },
  home: {
    whyTitle: "完成車基準のエンジニアリング",
    keyClient: "主要顧客",
    founded: "設立",
    clientsTitle: "主要顧客",
    clientsDesc:
      "完成車・部品パートナーとともに、設計から検証まで実務課題に対応します。",
    servicesTitle: "事業領域",
    servicesDesc:
      "産業用消耗品、機械エンジニアリング、製作・製造領域で実務支援を提供します。",
    viewAll: "すべて見る",
    projectsTitle: "主なプロジェクト",
    projectsDesc: "起亜自動車を中心に実施した最近のプロジェクトです。",
    moreProjects: "プロジェクトをもっと見る",
    newsTitle: "最新ニュース",
    ctaTitle: "課題を一緒に検討します",
    ctaDesc: "設計、解析、試験、工程 — 必要な範囲からご相談いただけます。",
    contactCta: "お問い合わせ",
  },
  aboutPage: {
    title: "会社紹介",
    mission: "ミッション",
    vision: "ビジョン",
    missionBody:
      "お客様の製品競争力を高めるエンジニアリングパートナーとして、設計品質とスケジュールの信頼を同時に守ります。",
    visionBody:
      "モビリティ転換に必要な次世代の設計・解析・試験プラットフォームを先導する企業を目指します。",
    strengthsTitle: "私たちの強み",
    strengthsDesc: "起亜自動車プロジェクトで培った実務基準が、私たちの基盤です。",
    greetingTitle: "代表挨拶",
    teamTitle: "チーム紹介",
    teamDesc: "JW Industrial Tech Services を支えるメンバーです。",
    profileTitle: "会社情報",
    labels: {
      company: "会社名",
      founded: "設立",
      keyClient: "主要顧客",
      address: "住所",
      phone: "電話",
      email: "メール",
    },
  },
  servicesPage: {
    title: "事業領域",
    description:
      "産業用消耗品、機械エンジニアリング、製作・製造までの JWITS コア事業をご紹介します。",
    coreTitle: "コアサービス",
    coreDesc:
      "Project Director JW Lee の下で、消耗品・機械エンジニアリング・製作製造を一体支援します。",
  },
  projectsPage: {
    title: "プロジェクト",
    description: "起亜自動車を主要顧客として、設計・解析・試験・工程の課題に対応してきました。",
    portfolioTitle: "プロジェクトポートフォリオ",
    searchPlaceholder: "年・顧客・プロジェクト名で検索",
    emptyLabel: "該当するプロジェクトがありません。",
    resultLabel: "{filtered} / {total}",
  },
  galleryPage: {
    title: "ギャラリー",
    description: "現場とプロジェクト活動の写真をご紹介します。",
    gridTitle: "フォトギャラリー",
    emptyLabel: "公開中の写真はまだありません。",
    cardView: "カード表示",
    listView: "リスト表示",
  },
  clientsPage: {
    title: "取引先",
    description:
      "グローバル完成車・部品パートナーとともに、設計から検証まで信頼できる技術力を積み重ねてきました。",
    eyebrow: "Directory",
    directoryTitle: "主要取引先",
    directoryDesc:
      "JW Industrial Tech Services の主要取引先をロゴとともにご紹介します。",
    emptyLabel: "公開中の取引先はまだありません。",
    noLogoLabel: "ロゴなし",
  },
  newsPage: {
    title: "ニュース・お知らせ",
    updatesTitle: "最新アップデート",
  },
  contactPage: {
    title: "お問い合わせ",
    description: "設計、解析、試験、工程エンジニアリングのご協力をお待ちしています。",
    formTitle: "プロジェクト相談",
    formDesc: "課題範囲とスケジュールをお知らせください。確認のうえご返信します。",
    address: "住所",
    registrationOffice: "Registration Office",
    apFactoryOffice: "AP 工場 · 事務所",
    koreaOffice: "韓国支社",
    phone: "電話",
    email: "メール",
    fax: "FAX",
    name: "お名前",
    company: "会社名",
    message: "お問い合わせ内容",
    submit: "送信する",
    submitting: "送信中...",
    success: "お問い合わせを受け付けました。ありがとうございます。",
    required: "*",
  },
  footer: {
    blurb: "起亜自動車を主要顧客として、設計・解析・試験・工程エンジニアリングを提供します。",
    links: "リンク",
    contact: "連絡先",
    familySites: "ファミリーサイト",
    familySitesPlaceholder: "サイトを選択",
    developedBy: "Developed by",
    admin: "管理画面",
  },
  company: {
    description:
      "JW Industrial Tech Servicesは、自動車およびモビリティ産業向けのエンジニアリングソリューションを提供します。\n起亜自動車をはじめとするグローバル完成車・部品パートナーとともに、設計から検証まで信頼できる技術力を積み重ねてきました。",
    founded: "2012",
    address:
      "24/1, 1st Floor Makers Hotel Biz 120 Doddanekundi, Marathalli Ferns City Road, Bengaluru, Bangalore KA 560037",
    apAddress:
      "Anantapur Fabrication Plant: Gana Saai Industries Industrial Estate, Pilligundla, Anantapur, Andhra Pradesh 515001, India",
    koreaAddress:
      "803-#1004, Sangsin-Hagil-ro 274-61, Hyangnam-eup, Hwaseong-si, Gyeonggi-do 18611, Korea",
    koreaBizInfo:
      "韓国法人（個人事業）· 事業者登録番号 279-35-01121（電子税務: woojinindia@outlook.com）",
    phone: "031-8015-9200",
    email: "lee@jwits.co.kr",
    fax: "031-8015-9201",
    keyClient: "起亜自動車",
  },
  strengths: [
    {
      title: "完成車の実務経験",
      description: "起亜自動車プロジェクトで検証されたプロセスと品質基準を保有しています。",
    },
    {
      title: "設計–解析–試験の一貫対応",
      description: "断絶のないエンジニアリングチェーンで開発リスクを下げ、意思決定を早めます。",
    },
    {
      title: "現場起点の問題解決",
      description: "図面や解析結果だけでなく、生産・組立・耐久現場の制約まで設計に反映します。",
    },
  ],
  clients: [
    {
      name: "起亜自動車",
      note: "主要顧客 · 設計・解析・試験・工程",
    },
    {
      name: "完成車協力会社",
      note: "部品・モジュール開発支援",
    },
    {
      name: "部品協力会社",
      note: "構造・NVH・耐久解析",
    },
  ],
  services: [
    {
      id: "consumables",
      title: "Industrial Consumables",
      description:
        "認証販売網を基盤に、市場調査から品質納品まで産業用消耗品事業を展開します。",
      items: [
        "Authorized Distributor Certificate",
        "Dealership Contract",
        "Agency Contract",
        "Market Research",
        "Research & Development",
        "Cost Down Cost Investigation",
        "Quality Delivery",
      ],
    },
    {
      id: "machinery",
      title: "Machinery Engineering",
      description:
        "プロジェクト企画から据付・移設・保全、品質管理・エンジニア供給まで機械エンジニアリングを提供します。",
      items: [
        "Project Planning",
        "Machinery Installation",
        "In-land Transportation",
        "Unloading & Unpacking",
        "Installation & Erection",
        "Dismantle",
        "Repairing & Maintenance",
        "Assistant Help, A/S",
        "Parts Trading",
        "Korean Quality Management",
        "Coordinator",
        "Leading & Control",
        "Project Supervision",
        "Mechanical / Electrical Engineer Supply",
        "Press, Assembly, Body Paint Shop Engineering",
        "Mechanical",
        "Electrical",
      ],
    },
    {
      id: "fabrication",
      title: "Machine Fabrication & Manufacturing",
      description:
        "図面開発からラック・アルミ・鉄骨製作まで、現場向けの製作・製造を行います。",
      items: [
        "Research & Development",
        "Drawing & Development",
        "Rack, Step, Pallet",
        "Aluminum Fabrication",
        "H-Beam Flooring",
        "Safety Fence, Door, Jig",
        "Steel Fabrication",
      ],
    },
    {
      id: "site-hse",
      title: "Site Operation & Hse",
      description:
        "日次作業計画・現場支援から安全・衛生・環境管理まで、サイト運営を支援します。",
      items: [
        "Create A Daily Work Plan",
        "Check In And Out",
        "Check Incoming Items",
        "Check Work Flow",
        "Commissioning Response",
        "Production Response",
        "Customer Support",
        "Tool Room Managing",
        "Site Support",
        "People Plan",
        "Hazard Identification",
        "Daily Safety And Health Training",
        "Work Time Planning",
        "Trial Run And Mass Production",
        "Stretching Before & After Work",
        "Conduct Safety Training",
        "Prevention Of Safety Accidents Between Work",
        "Prevention Of Pollution For Work",
        "Prevention Of Work Condition",
        "Prevention Of Covid-19 Infection",
      ],
    },
  ],
  projects: {
    p1: {
      title: "EV車体構造の軽量化設計",
      client: "起亜自動車",
      category: "機械据付",
      description: "EV車体主要メンバーの軽量化と剛性目標を同時に満たす設計案を導出しました。",
    },
    p2: {
      title: "シャシー部品の耐久・疲労解析",
      client: "起亜自動車",
      category: "構造・耐久解析",
      description: "実車荷重条件を反映した疲労解析で弱点を事前に特定し、設計改善を支援しました。",
    },
    p3: {
      title: "内装モジュール組立性改善",
      client: "起亜自動車",
      category: "工程・設備",
      description: "組立作業性と寸法安定性を改善する治具設計および工程検討を実施しました。",
    },
    p4: {
      title: "パワートレインブラケットNVH改善",
      client: "部品協力会社",
      category: "構造・耐久解析",
      description: "振動伝達経路分析によりブラケット形状と締結条件を最適化しました。",
    },
    p5: {
      title: "試作品試験計画および故障分析",
      client: "完成車協力会社",
      category: "試験・検証",
      description: "耐久試験結果に基づき故障メカニズムを解明し、設計改善の方向性を提示しました。",
    },
    p6: {
      title: "量産移行工程レイアウト検討",
      client: "起亜自動車協力会社",
      category: "工程・設備",
      description: "ライン動線と治具配置を再構成し、タクトタイムと品質安定性を改善しました。",
    },
  },
  news: {
    n1: {
      title: "起亜EVプラットフォーム部品設計支援を拡大",
      summary: "EVプラットフォーム関連の設計・解析案件を追加受注し、協業範囲を広げました。",
      content:
        "JW Industrial Tech Servicesは起亜自動車のEVプラットフォーム部品設計および構造解析支援範囲を拡大しました。軽量化と耐久性能のバランスを中心に設計品質を高度化しています。",
    },
    n2: {
      title: "シャシー部品耐久試験インフラを強化",
      summary: "試験・検証力強化のため、耐久試験プロセスを高度化しました。",
      content:
        "顧客要求サイクルの短縮に対応し、試験計画策定とデータ分析プロセスを標準化し、結果報告リードタイムを短縮しました。",
    },
    n3: {
      title: "モビリティエンジニアリングのパートナーシップ強化",
      summary: "完成車・部品メーカー向け技術セミナーを通じて協業ネットワークを拡大しました。",
      content:
        "設計自動化とCAEに基づく意思決定に関する技術セミナーを開催し、長期パートナーシップの議論を続けています。",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { ko, en, zh, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ko;
}
