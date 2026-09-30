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
  title: string;
  client: string;
  category: string;
  description: string;
  year: string;
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
  news: NewsItem[];
  projects: ProjectItem[];
  inquiries: InquiryItem[];
};
