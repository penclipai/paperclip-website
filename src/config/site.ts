import { BRAND } from './brand';

export type SiteDomain = typeof BRAND.chineseDomain | typeof BRAND.internationalDomain;
type SiteLanguage = 'zh-CN' | 'en';
type OgLocale = 'zh_CN' | 'en_US';

export type AlternateLink = {
  href: string;
  hreflang: 'zh-CN' | 'en' | 'x-default';
};

type LocaleSwitch = {
  href: string;
  label: string;
};

type LegalFooter = {
  icp: string;
  publicSecurity: string;
  show: boolean;
};

type CommunityCard = {
  type: 'wechat_qr_placeholder';
  imageSrc: string;
  title: string;
  description: string;
  label: string;
  href: string;
  show: boolean;
};

type HomeContent = {
  navbar: {
    primaryLinkLabel: string;
    primaryLinkHref: string;
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
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

export type SiteContext = {
  alternateName: string;
  ctaUrl: string;
  communityCard?: CommunityCard;
  description: string;
  discordUrl: string;
  domain: SiteDomain;
  firstPartyRepoUrl: string;
  firstPartyWebsiteRepoUrl: string;
  home: HomeContent;
  isChinese: boolean;
  lang: SiteLanguage;
  legalFooter?: LegalFooter;
  localeSwitch: LocaleSwitch;
  ogLocale: OgLocale;
  path: string;
  siteUrl: string;
  title: string;
  upstreamUrl: string;
  xDefaultUrl: string;
};

const FIRST_PARTY_REPO_URL = `https://github.com/${BRAND.githubOrg}/paperclip`;
const FIRST_PARTY_WEBSITE_REPO_URL = `https://github.com/${BRAND.githubOrg}/paperclip-website`;
const UPSTREAM_REPO_URL = 'https://github.com/paperclipai/paperclip';
const DISCORD_URL = 'https://discord.gg/m4HZY7xNG3';
const WECHAT_PLACEHOLDER_IMAGE = '/wechat-community-placeholder.svg';

const DOMAIN_TO_SITE_URL: Record<SiteDomain, string> = {
  [BRAND.chineseDomain]: `https://${BRAND.chineseDomain}`,
  [BRAND.internationalDomain]: `https://${BRAND.internationalDomain}`
};

const DOMAIN_TO_DEFAULT_LANG: Record<SiteDomain, SiteLanguage> = {
  [BRAND.chineseDomain]: 'zh-CN',
  [BRAND.internationalDomain]: 'en'
};

function normalizeDomain(input?: string): SiteDomain {
  if (input === BRAND.chineseDomain || input === BRAND.internationalDomain) {
    return input;
  }

  return BRAND.internationalDomain;
}

function normalizePathname(pathname = '/'): string {
  if (!pathname) {
    return '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function isTemporaryChineseRoute(pathname: string, domain: SiteDomain): boolean {
  return domain === BRAND.internationalDomain && /^\/zh(?:\/|$)/.test(normalizePathname(pathname));
}

function resolveLanguage(pathname: string, domain: SiteDomain): SiteLanguage {
  if (isTemporaryChineseRoute(pathname, domain)) {
    return 'zh-CN';
  }

  return DOMAIN_TO_DEFAULT_LANG[domain];
}

const requestedDomain = normalizeDomain(
  process.env.PUBLIC_DOMAIN ?? import.meta.env.PUBLIC_DOMAIN
);

const zhHomeContent: HomeContent = {
  navbar: {
    primaryLinkLabel: 'GitHub',
    primaryLinkHref: FIRST_PARTY_REPO_URL,
    ctaLabel: '立即体验',
    ctaHref: FIRST_PARTY_REPO_URL
  },
  hero: {
    eyebrow: 'Paperclip 中文增强版',
    headlineLines: ['Penclip', '让智能体分工协作', '让公司持续运转'],
    lede:
      'Penclip 是面向中文用户优化的 Paperclip 版本。你可以把常用的智能体和工具接进来，分配职责、查看进度、控制权限，让团队协作和日常工作在同一套系统里持续运转。',
    primaryCtaLabel: '立即体验 Penclip',
    primaryCtaHref: FIRST_PARTY_REPO_URL,
    secondaryCtaLabel: '查看核心能力',
    secondaryCtaHref: '#features'
  },
  quickstart: {
    heading: '快速开始',
    sub:
      '开源、自托管、可审计。初始化流程会带你完成数据库、认证和首个团队空间配置，也兼容现有 Paperclip 的使用方式。',
    primaryLabel: '查看 Penclip 仓库',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: '查看快速开始 ->',
    secondaryHref: '#get-started'
  },
  cta: {
    badge: '立即开始',
    heading: '从一个仓库开始，搭建自己的 Penclip。',
    sub:
      '从 Penclip 仓库开始部署中文增强版 Paperclip，把常用智能体、任务和权限放到同一套系统里管理。',
    primaryLabel: '立即体验 Penclip',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: '查看常见问题 ->',
    secondaryHref: '#faq'
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
          { href: '#get-started', label: '智能体协作' },
          { href: '#get-started', label: '权限和预算' },
          { href: '#get-started', label: '自托管部署' }
        ]
      },
      {
        heading: '开发者',
        links: [
          { href: FIRST_PARTY_REPO_URL, label: 'Penclip GitHub' },
          { href: FIRST_PARTY_WEBSITE_REPO_URL, label: '官网源码' },
          { href: UPSTREAM_REPO_URL, label: 'Paperclip' }
        ]
      },
      {
        heading: '资源',
        links: [
          { href: '#features', label: '核心能力' },
          { href: '#faq', label: '常见问题' },
          { href: '#community', label: '微信交流群' }
        ]
      }
    ],
    copyright: `${BRAND.name}. 基于 MIT 协议开源。`
  }
};

const enHomeContent: HomeContent = {
  navbar: {
    primaryLinkLabel: 'GitHub',
    primaryLinkHref: FIRST_PARTY_REPO_URL,
    ctaLabel: 'Try Penclip',
    ctaHref: FIRST_PARTY_REPO_URL
  },
  hero: {
    eyebrow: 'Chinese-enhanced fork of Paperclip',
    headlineLines: ['Penclip', 'Open-source orchestration', 'for autonomous companies'],
    lede:
      'Self-hosted AI agent orchestration with org charts, budgets, governance, and a localization layer built for teams shipping in the China model ecosystem.',
    primaryCtaLabel: 'Try Penclip',
    primaryCtaHref: FIRST_PARTY_REPO_URL,
    secondaryCtaLabel: 'Explore features',
    secondaryCtaHref: '#features'
  },
  quickstart: {
    heading: 'Quickstart',
    sub:
      'Open source, self-hosted, and compatible with existing Paperclip workflows. Interactive setup walks you through database, auth, and your first autonomous company.',
    primaryLabel: 'Explore the Penclip repo',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: 'Go to get started ->',
    secondaryHref: '#get-started'
  },
  cta: {
    badge: 'Get started',
    heading: 'Launch a Chinese-enhanced Paperclip stack from one repo.',
    sub:
      'Start with Penclip for branded localization, self-hosted orchestration, and a clearer path for teams targeting Chinese users without giving up Paperclip compatibility.',
    primaryLabel: 'Try Penclip',
    primaryHref: FIRST_PARTY_REPO_URL,
    secondaryLabel: 'Read FAQ ->',
    secondaryHref: '#faq'
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
          { href: UPSTREAM_REPO_URL, label: 'Paperclip' }
        ]
      },
      {
        heading: 'Resources',
        links: [
          { href: '#features', label: 'Features' },
          { href: '#faq', label: 'FAQ' },
          { href: DISCORD_URL, label: 'Discord' }
        ]
      }
    ],
    copyright: `${BRAND.name}. Open source under MIT.`
  }
};

function getLocaleSwitch(pathname: string, domain: SiteDomain, lang: SiteLanguage): LocaleSwitch {
  if (domain === BRAND.chineseDomain) {
    return {
      href: DOMAIN_TO_SITE_URL[BRAND.internationalDomain],
      label: 'EN'
    };
  }

  if (lang === 'zh-CN') {
    return {
      href: '/',
      label: 'EN'
    };
  }

  return {
    href: '/zh/',
    label: '中文'
  };
}

export function getSiteForPath(
  pathname = '/',
  domain: SiteDomain = requestedDomain
): SiteContext {
  const normalizedPath = normalizePathname(pathname);
  const lang = resolveLanguage(normalizedPath, domain);
  const isChinese = lang === 'zh-CN';
  const showLegalFooter = isChinese && domain === BRAND.chineseDomain;

  return {
    domain,
    siteUrl: DOMAIN_TO_SITE_URL[domain],
    lang,
    ogLocale: isChinese ? 'zh_CN' : 'en_US',
    title: isChinese
      ? 'Penclip | 让智能体分工协作，让公司持续运转'
      : 'Penclip | Chinese-enhanced fork of Paperclip for autonomous companies',
    description: isChinese
      ? 'Penclip 是 Paperclip 的中文增强版，帮你把常用智能体和工具组织起来，分配职责、查看进度、控制权限，让团队协作和日常工作在同一套系统里持续运转。'
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
    communityCard: isChinese
      ? {
          type: 'wechat_qr_placeholder',
          imageSrc: WECHAT_PLACEHOLDER_IMAGE,
          title: '微信交流群',
          description: '社群入口筹备中，二维码后续替换为正式版本。',
          label: '查看社群占位',
          href: '#community',
          show: true
        }
      : undefined,
    isChinese,
    home: isChinese ? zhHomeContent : enHomeContent,
    legalFooter: isChinese
      ? {
          icp: 'ICP备案号申请中',
          publicSecurity: '公网安备申请中',
          show: showLegalFooter
        }
      : undefined,
    localeSwitch: getLocaleSwitch(normalizedPath, domain, lang),
    path: normalizedPath
  };
}

export const CURRENT_SITE = getSiteForPath('/');

export function getAbsoluteUrl(
  pathname = '/',
  domain: SiteDomain = requestedDomain
): string {
  return new URL(normalizePathname(pathname), DOMAIN_TO_SITE_URL[domain]).toString();
}

export function getCanonicalUrl(
  pathname = '/',
  domain: SiteDomain = requestedDomain
): string {
  return getAbsoluteUrl(pathname, domain);
}

export function getAlternateLinks(
  pathname = '/',
  _domain: SiteDomain = requestedDomain
): AlternateLink[] {
  const normalizedPath = normalizePathname(pathname);

  return [
    { hreflang: 'zh-CN', href: getAbsoluteUrl(normalizedPath, BRAND.chineseDomain) },
    { hreflang: 'en', href: getAbsoluteUrl(normalizedPath, BRAND.internationalDomain) },
    { hreflang: 'x-default', href: getAbsoluteUrl(normalizedPath, BRAND.internationalDomain) }
  ];
}

export function getRobotsContent(index = true): string {
  return index ? 'index,follow,max-image-preview:large' : 'noindex,follow';
}

export function getHomeStructuredData(pathname = '/') {
  const site = getSiteForPath(pathname);
  const url = getAbsoluteUrl(pathname, site.domain);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND.name,
      alternateName: site.alternateName,
      url,
      logo: getAbsoluteUrl('/favicon.svg', site.domain),
      sameAs: [site.firstPartyRepoUrl, site.firstPartyWebsiteRepoUrl]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: BRAND.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Linux, macOS, Windows',
      description: site.description,
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
      alternateName: site.alternateName,
      description: site.description,
      url
    }
  ];
}
