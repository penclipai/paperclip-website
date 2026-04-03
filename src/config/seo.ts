import { BRAND } from './brand';
import { getAbsoluteUrl, type AlternateLink } from './site';

export type SeoGuide = {
  href: string;
  label: string;
  title: string;
  description: string;
};

export const SEO_GUIDES: SeoGuide[] = [
  {
    href: '/paperclip-vs-paperclip-cn/',
    label: '和原版有什么区别',
    title: 'Paperclip CN 和 Paperclip 原版的区别',
    description:
      '从定位、语言支持、模型生态、部署方式和适用团队五个角度，快速看懂 Paperclip CN 和原版的差异。'
  },
  {
    href: '/paperclip-chinese-fork/',
    label: '什么是中文增强版',
    title: '什么是 Paperclip 中文增强版',
    description:
      '解释 Paperclip CN 和 Paperclip 的 Fork 关系、兼容边界，以及为什么要做面向中文团队的增强。'
  },
  {
    href: '/self-hosted-agent-collaboration/',
    label: '为什么强调自托管',
    title: '适合中文团队的自托管智能体协作平台',
    description:
      '介绍自己部署、权限控制、预算管理和任务推进这些能力，适合评估是否要把团队工作流接入 Paperclip CN。'
  },
  {
    href: '/use-cases/agent-team-operations/',
    label: '适合哪些场景',
    title: '让智能体团队协作推进日常工作',
    description:
      '用内容、运营和研发三个场景说明 Paperclip CN 更适合哪些日常协作流程。'
  }
];

const BREADCRUMB_NAMES: Record<string, string> = {
  'paperclip-vs-paperclip-cn': 'Paperclip CN 和 Paperclip 原版的区别',
  'paperclip-chinese-fork': '什么是 Paperclip 中文增强版',
  'self-hosted-agent-collaboration': '适合中文团队的自托管智能体协作平台',
  'use-cases': '使用场景',
  'agent-team-operations': '让智能体团队协作推进日常工作'
};

export function getChineseSeoAlternateLinks(pathname: string): AlternateLink[] {
  return [
    {
      hreflang: 'zh-CN',
      href: getAbsoluteUrl(pathname, BRAND.chineseDomain)
    },
    {
      hreflang: 'x-default',
      href: getAbsoluteUrl('/', BRAND.internationalDomain)
    }
  ];
}

export function getContentPageStructuredData(pathname: string, title: string, description: string) {
  const url = getAbsoluteUrl(pathname, BRAND.chineseDomain);
  const parts = pathname.split('/').filter(Boolean);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND.name,
      alternateName: 'Paperclip 中文增强版',
      url: getAbsoluteUrl('/', BRAND.chineseDomain),
      logo: getAbsoluteUrl('/favicon.svg', BRAND.chineseDomain)
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url,
      inLanguage: 'zh-CN',
      isPartOf: {
        '@type': 'WebSite',
        name: BRAND.name,
        url: getAbsoluteUrl('/', BRAND.chineseDomain)
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: BRAND.name,
          item: getAbsoluteUrl('/', BRAND.chineseDomain)
        },
        ...parts.map((part, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: BREADCRUMB_NAMES[part] ?? part,
          item: getAbsoluteUrl(`/${parts.slice(0, index + 1).join('/')}/`, BRAND.chineseDomain)
        }))
      ]
    }
  ];
}
