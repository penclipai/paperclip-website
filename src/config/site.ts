import { BRAND } from './brand';

type SiteDomain = typeof BRAND.chineseDomain | typeof BRAND.internationalDomain;
type SiteLanguage = 'zh-CN' | 'en';
type AlternateLink = {
  href: string;
  hreflang: 'zh-CN' | 'en' | 'x-default';
};

type HomeContent = {
  navbar: {
    primaryLinkLabel: string;
    primaryLinkHref: string;
    secondaryLinkLabel: string;
    secondaryLinkHref: string;
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    headlineLines: [string, string, string];
    lede: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  quickstart: {
    heading: string;
    sub: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  cta: {
    badge: string;
    heading: string;
    sub: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footer: {
    columns: Array<{
      heading: string;
      links: Array<{ href: string; label: string }>;
    }>;
    copyright: string;
  };
};

const FIRST_PARTY_REPO_URL = `https://github.com/${BRAND.githubOrg}/paperclip`;
const FIRST_PARTY_WEBSITE_REPO_URL = `https://github.com/${BRAND.githubOrg}/paperclip-website`;
const UPSTREAM_REPO_URL = 'https://github.com/paperclipai/paperclip';
const DISCORD_URL = 'https://discord.gg/m4HZY7xNG3';

const DOMAIN_TO_SITE_URL: Record<SiteDomain, string> = {
  [BRAND.chineseDomain]: `https://${BRAND.chineseDomain}`,
  [BRAND.internationalDomain]: `https://${BRAND.internationalDomain}`
};

const DOMAIN_TO_LANG: Record<SiteDomain, SiteLanguage> = {
  [BRAND.chineseDomain]: 'zh-CN',
  [BRAND.internationalDomain]: 'en'
};

function normalizeDomain(input?: string): SiteDomain {
  if (input === BRAND.chineseDomain || input === BRAND.internationalDomain) {
    return input;
  }

  return BRAND.internationalDomain;
}

const requestedDomain = normalizeDomain(
  process.env.PUBLIC_DOMAIN ?? import.meta.env.PUBLIC_DOMAIN
);

const isChinese = requestedDomain === BRAND.chineseDomain;

const zhHomeContent: HomeContent = {
  navbar: {
    primaryLinkLabel: 'GitHub',
    primaryLinkHref: FIRST_PARTY_REPO_URL,
    secondaryLinkLabel: '上游 Paperclip',
    secondaryLinkHref: UPSTREAM_REPO_URL,
    ctaLabel: '立即体验',
    ctaHref: FIRST_PARTY_REPO_URL
  },
  hero: {
    headlineLines: ['Penclip', 'Paperclip 中文增强版', '零人力公司操作系统'],
    lede:
      '面向中国团队优化的自托管多智能体编排平台。组织架构、预算治理、任务协作与国产大模型支持，统一落在一个控制面里。',
    primaryCtaLabel: '立即体验 Penclip',
    primaryCtaHref: FIRST_PARTY_REPO_URL,
    secondaryCtaLabel: '查看上游 Paperclip',
    secondaryCtaHref: UPSTREAM_REPO_URL
  },
  quickstart: {
    heading: '快速开始',
    sub:
      '开源、自托管、可审计。交互式初始化会带你完成数据库、认证和第一家 AI 公司配置。兼容现有 Paperclip 工作流与自托管部署方式。',
    primaryLabel: '查看 Penclip 仓库',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: '查看上游 Paperclip 文档 ->',
    secondaryHref: UPSTREAM_REPO_URL
  },
  cta: {
    badge: '立即开始',
    heading: '从想法到自动运转的 AI 公司，只差一个仓库。',
    sub:
      '从 Penclip 仓库开始搭建你的中文增强版 Paperclip 实例。保留自托管能力，同时获得更适合中国团队的品牌、文案与落地体验。',
    primaryLabel: '立即体验 Penclip',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: '查看上游 Paperclip ->',
    secondaryHref: UPSTREAM_REPO_URL
  },
  footer: {
    columns: [
      {
        heading: '产品',
        links: [
          { href: '#get-started', label: '立即开始' },
          { href: '#get-started', label: '快速开始' }
        ]
      },
      {
        heading: '能力',
        links: [
          { href: '#get-started', label: '多智能体编排' },
          { href: '#get-started', label: '治理与预算' },
          { href: '#get-started', label: '自托管部署' }
        ]
      },
      {
        heading: '开发者',
        links: [
          { href: FIRST_PARTY_REPO_URL, label: 'Penclip GitHub' },
          { href: FIRST_PARTY_WEBSITE_REPO_URL, label: '官网源码' },
          { href: UPSTREAM_REPO_URL, label: 'Upstream Paperclip' }
        ]
      },
      {
        heading: '资源',
        links: [
          { href: UPSTREAM_REPO_URL, label: '上游文档' },
          { href: UPSTREAM_REPO_URL, label: 'MIT License' },
          { href: DISCORD_URL, label: 'Discord' }
        ]
      }
    ],
    copyright: `${BRAND.name}. Open source under MIT.`
  }
};

const enHomeContent: HomeContent = {
  navbar: {
    primaryLinkLabel: 'GitHub',
    primaryLinkHref: FIRST_PARTY_REPO_URL,
    secondaryLinkLabel: 'Upstream Paperclip',
    secondaryLinkHref: UPSTREAM_REPO_URL,
    ctaLabel: 'Try Penclip',
    ctaHref: FIRST_PARTY_REPO_URL
  },
  hero: {
    headlineLines: ['Penclip', 'Chinese-enhanced fork of Paperclip', 'for autonomous companies'],
    lede:
      'Self-hosted AI agent orchestration with org charts, budgets, governance, and a localization layer built for teams shipping in the China model ecosystem.',
    primaryCtaLabel: 'Try Penclip',
    primaryCtaHref: FIRST_PARTY_REPO_URL,
    secondaryCtaLabel: 'View upstream Paperclip',
    secondaryCtaHref: UPSTREAM_REPO_URL
  },
  quickstart: {
    heading: 'Quickstart',
    sub:
      'Open source, self-hosted, and compatible with existing Paperclip workflows. Interactive setup walks you through database, auth, and your first autonomous company.',
    primaryLabel: 'Explore the Penclip repo',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: 'Read upstream Paperclip docs ->',
    secondaryHref: UPSTREAM_REPO_URL
  },
  cta: {
    badge: 'Get started',
    heading: 'Launch a Chinese-enhanced Paperclip stack from one repo.',
    sub:
      'Start with Penclip for branded localization, self-hosted orchestration, and a clearer path for teams targeting Chinese users without giving up Paperclip compatibility.',
    primaryLabel: 'Try Penclip',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: 'Read upstream Paperclip ->',
    secondaryHref: UPSTREAM_REPO_URL
  },
  footer: {
    columns: [
      {
        heading: 'Product',
        links: [
          { href: '#get-started', label: 'Get started' },
          { href: '#get-started', label: 'Quickstart' }
        ]
      },
      {
        heading: 'Platform',
        links: [
          { href: '#get-started', label: 'Agent orchestration' },
          { href: '#get-started', label: 'Governance' },
          { href: '#get-started', label: 'Self-hosted' }
        ]
      },
      {
        heading: 'Developers',
        links: [
          { href: FIRST_PARTY_REPO_URL, label: 'Penclip GitHub' },
          { href: FIRST_PARTY_WEBSITE_REPO_URL, label: 'Website source' },
          { href: UPSTREAM_REPO_URL, label: 'Upstream Paperclip' }
        ]
      },
      {
        heading: 'Resources',
        links: [
          { href: UPSTREAM_REPO_URL, label: 'Upstream docs' },
          { href: UPSTREAM_REPO_URL, label: 'MIT License' },
          { href: DISCORD_URL, label: 'Discord' }
        ]
      }
    ],
    copyright: `${BRAND.name}. Open source under MIT.`
  }
};

export const CURRENT_SITE = {
  domain: requestedDomain,
  siteUrl: DOMAIN_TO_SITE_URL[requestedDomain],
  lang: DOMAIN_TO_LANG[requestedDomain],
  ogLocale: isChinese ? 'zh_CN' : 'en_US',
  title: isChinese
    ? 'Penclip | Paperclip 中文增强版，零人力公司操作系统'
    : 'Penclip | Chinese-enhanced fork of Paperclip for autonomous companies',
  description: isChinese
    ? 'Penclip 是 Paperclip 的中文增强 Fork，面向中国团队优化，支持自托管、多智能体编排、组织架构、预算治理与国产大模型生态。'
    : 'Penclip is a Chinese-enhanced Paperclip fork focused on localized UX, self-hosted AI agent orchestration, and support for the China model ecosystem.',
  alternateName: isChinese
    ? 'Penclip, Paperclip 中文增强版'
    : 'Penclip, Chinese-enhanced fork of Paperclip',
  ctaUrl: FIRST_PARTY_REPO_URL,
  upstreamUrl: UPSTREAM_REPO_URL,
  xDefaultUrl: DOMAIN_TO_SITE_URL[BRAND.internationalDomain],
  firstPartyRepoUrl: FIRST_PARTY_REPO_URL,
  firstPartyWebsiteRepoUrl: FIRST_PARTY_WEBSITE_REPO_URL,
  discordUrl: DISCORD_URL,
  isChinese,
  home: isChinese ? zhHomeContent : enHomeContent
} as const;

export function getAbsoluteUrl(pathname = '/', domain: SiteDomain = requestedDomain): string {
  return new URL(pathname, DOMAIN_TO_SITE_URL[domain]).toString();
}

export function getCanonicalUrl(pathname = '/'): string {
  return getAbsoluteUrl(pathname, requestedDomain);
}

export function getAlternateLinks(pathname = '/'): AlternateLink[] {
  return [
    { hreflang: 'zh-CN', href: getAbsoluteUrl(pathname, BRAND.chineseDomain) },
    { hreflang: 'en', href: getAbsoluteUrl(pathname, BRAND.internationalDomain) },
    { hreflang: 'x-default', href: getAbsoluteUrl(pathname, BRAND.internationalDomain) }
  ];
}

export function getRobotsContent(index = true): string {
  return index ? 'index,follow,max-image-preview:large' : 'noindex,follow';
}

export function getHomeStructuredData() {
  const url = getAbsoluteUrl('/');

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND.name,
      alternateName: CURRENT_SITE.alternateName,
      url,
      logo: getAbsoluteUrl('/og.png'),
      sameAs: [CURRENT_SITE.firstPartyRepoUrl, CURRENT_SITE.firstPartyWebsiteRepoUrl]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: BRAND.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Linux, macOS, Windows',
      description: CURRENT_SITE.description,
      url,
      sourceOrganization: {
        '@type': 'Organization',
        name: BRAND.name
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: BRAND.name,
      alternateName: CURRENT_SITE.alternateName,
      description: CURRENT_SITE.description,
      url
    }
  ];
}
