import type { AppData } from "./types";

export const defaultData: AppData = {
  content: {
    company: {
      name: "JW Industrial Tech Services",
      nameEn: "JW Industrial Tech Services",
      tagline: "Precision Engineering for Mobility",
      description:
        "JW Industrial Tech Services provides engineering solutions for the automotive and mobility industries. Together with Kia Motors and global OEM/parts partners, we have built trusted capabilities from design through validation.",
      founded: "2012",
      address:
        "24/1, 1st Floor Makers Hotel Biz 120 Doddanekundi, Marathalli Ferns City Road, Bengaluru, Bangalore KA 560037",
      phone: "031-8015-9200",
      email: "lee@jwits.co.kr",
      fax: "031-8015-9201",
    },
    hero: {
      headline: "모빌리티를 움직이는\n엔지니어링",
      subheadline:
        "기아자동차와 함께 성장한 설계·해석·시험 역량으로, 제조 현장의 문제를 끝까지 풀어냅니다.",
      ctaPrimary: "사업 영역 보기",
      ctaSecondary: "문의하기",
    },
    about: {
      mission:
        "고객의 제품 경쟁력을 높이는 엔지니어링 파트너로서, 설계 품질과 일정 신뢰를 동시에 지키겠습니다.",
      vision:
        "모빌리티 전환 시대에 필요한 차세대 설계·해석·시험 플랫폼을 선도하는 엔지니어링 기업이 됩니다.",
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
    },
    services: [
      {
        id: "design",
        title: "기계 설계",
        description:
          "차체·샤시·의장 부품의 컨셉부터 상세 설계까지, 양산성을 고려한 설계를 수행합니다.",
        items: ["3D CAD 모델링", "DFM/DFA 검토", "공차·체결 설계", "도면 표준화"],
      },
      {
        id: "cae",
        title: "구조·내구 해석",
        description:
          "정적/동적 하중, 충돌·진동·피로 해석을 통해 설계 단계의 리스크를 조기에 제거합니다.",
        items: ["구조 해석", "NVH 해석", "피로·내구 해석", "경량화 최적화"],
      },
      {
        id: "test",
        title: "시험·검증",
        description:
          "시제품 평가와 시험 계획 수립부터 결과 리포팅까지 개발 검증을 지원합니다.",
        items: ["시험 계획 수립", "시제품 평가", "고장 분석", "개선안 도출"],
      },
      {
        id: "process",
        title: "공정·설비 엔지니어링",
        description:
          "양산 전환을 위한 공정 설계와 지그·설비 엔지니어링으로 생산 안정성을 높입니다.",
        items: ["공정 레이아웃", "지그·치구 설계", "작업성 검토", "양산 이슈 대응"],
      },
    ],
  },
  greeting: {
    title: "대표 인사말",
    name: "Lee",
    role: "대표이사",
    message:
      "JW Industrial Tech Services를 찾아주셔서 감사합니다.\n기아자동차를 비롯한 파트너와 함께 쌓아온 설계·해석·시험 역량을 바탕으로, 고객의 과제를 끝까지 해결하는 엔지니어링 파트너가 되겠습니다.",
    imageUrl: "",
    published: true,
  },
  team: [
    {
      id: "t1",
      name: "Lee",
      role: "대표이사",
      bio: "모빌리티 엔지니어링과 프로젝트 총괄을 담당합니다.",
      imageUrl: "",
      order: 1,
      published: true,
    },
  ],
  news: [
    {
      id: "n1",
      title: "기아 전기차 플랫폼 부품 설계 지원 확대",
      summary: "EV 플랫폼 관련 설계·해석 과제를 추가 수주하며 협업 범위를 넓혔습니다.",
      content:
        "JW Industrial Tech Services는 기아자동차 전기차 플랫폼 부품 설계 및 구조 해석 지원 범위를 확대했습니다. 경량화와 내구 성능의 균형을 중심으로 설계 품질을 고도화하고 있습니다.",
      publishedAt: "2026-03-12",
      published: true,
    },
    {
      id: "n2",
      title: "샤시 부품 내구 시험 인프라 보강",
      summary: "시험·검증 역량 강화를 위해 내구 시험 프로세스를 고도화했습니다.",
      content:
        "고객 요구 주기가 짧아짐에 따라 시험 계획 수립과 데이터 분석 프로세스를 표준화하고, 결과 보고 리드타임을 단축했습니다.",
      publishedAt: "2026-01-20",
      published: true,
    },
    {
      id: "n3",
      title: "JW Industrial Tech Services, 모빌리티 엔지니어링 파트너십 강화",
      summary: "완성차·부품사 대상 기술 세미나를 통해 협업 네트워크를 확대했습니다.",
      content:
        "설계 자동화와 CAE 기반 의사결정에 대한 기술 세미나를 개최하고, 장기 파트너십 논의를 이어가고 있습니다.",
      publishedAt: "2025-11-05",
      published: true,
    },
  ],
  projects: [
    {
      id: "p1",
      title: "전기차 차체 구조 경량화 설계",
      client: "기아자동차",
      category: "기계 설계",
      description:
        "전기차 차체 주요 멤버의 경량화와 강성 목표를 동시에 만족하는 설계안을 도출했습니다.",
      year: "2025",
      featured: true,
    },
    {
      id: "p2",
      title: "샤시 부품 내구·피로 해석",
      client: "기아자동차",
      category: "구조·내구 해석",
      description:
        "실차 하중 조건을 반영한 피로 해석으로 취약부를 사전 식별하고 설계 개선을 지원했습니다.",
      year: "2025",
      featured: true,
    },
    {
      id: "p3",
      title: "의장 모듈 조립성 개선",
      client: "기아자동차",
      category: "공정·설비",
      description:
        "조립 작업성과 치수 안정성을 개선하는 지그 설계 및 공정 검토를 수행했습니다.",
      year: "2024",
      featured: true,
    },
    {
      id: "p4",
      title: "파워트레인 브라켓 NVH 개선",
      client: "부품 협력사",
      category: "구조·내구 해석",
      description:
        "진동 전달 경로 분석을 통해 브라켓 형상과 체결 조건을 최적화했습니다.",
      year: "2024",
      featured: false,
    },
    {
      id: "p5",
      title: "시제품 시험 계획 및 고장 분석",
      client: "완성차 협력사",
      category: "시험·검증",
      description:
        "내구 시험 결과 기반 고장 메커니즘을 규명하고 설계 개선 방향을 제시했습니다.",
      year: "2023",
      featured: false,
    },
    {
      id: "p6",
      title: "양산 전환 공정 레이아웃 검토",
      client: "기아자동차 협력사",
      category: "공정·설비",
      description:
        "라인 작업 동선과 치구 배치를 재구성해 택트타임과 품질 안정성을 개선했습니다.",
      year: "2023",
      featured: false,
    },
  ],
  inquiries: [],
};
