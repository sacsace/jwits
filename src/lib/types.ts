export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  published: boolean;
};

export type ProjectItem = {
  id: string;
  year: string;
  month: string;
  place: string;
  relatedAuto: string;
  customer: string;
  workType: string;
  manufacturing: string;
  workDetail: string;
  projectName: string;
  published: boolean;
  featured: boolean;
};

export type InquiryItem = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
};

export type GreetingContent = {
  title: string;
  name: string;
  role: string;
  message: string;
  imageUrl: string;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
  published: boolean;
};

export type ClientCompany = {
  id: string;
  name: string;
  location: string;
  note: string;
  logoUrl: string;
  order: number;
  published: boolean;
};

export type SiteContent = {
  company: {
    name: string;
    nameEn: string;
    tagline: string;
    description: string;
    founded: string;
    address: string;
    phone: string;
    email: string;
    fax: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    mission: string;
    vision: string;
    strengths: { title: string; description: string }[];
  };
  services: {
    id: string;
    title: string;
    description: string;
    items: string[];
  }[];
};

export type AppData = {
  content: SiteContent;
  greeting: GreetingContent;
  team: TeamMember[];
  clients: ClientCompany[];
  news: NewsItem[];
  projects: ProjectItem[];
  inquiries: InquiryItem[];
};
