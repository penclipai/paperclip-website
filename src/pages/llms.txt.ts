import { BRAND } from '../config/brand';
import { CURRENT_SITE, getAbsoluteUrl } from '../config/site';

export const prerender = true;

export function GET() {
  const body = CURRENT_SITE.isChinese
    ? `# ${BRAND.name}

> ${BRAND.fullName}

${BRAND.name} 是 Paperclip 的中文增强 Fork，面向中国团队优化自托管多智能体编排体验。你可以定义业务目标、组织 AI 员工、设置预算与治理规则，并在一个控制面中持续运营你的 AI 公司。

## 快速开始

访问以下仓库开始体验 ${BRAND.name}：

${CURRENT_SITE.firstPartyRepoUrl}

如果你需要参考上游能力与兼容语义，可查看：

${CURRENT_SITE.upstreamUrl}

## 站点信息

- Website: ${getAbsoluteUrl('/')}
- Domain: ${CURRENT_SITE.domain}
- GitHub: ${CURRENT_SITE.firstPartyRepoUrl}
- Upstream: ${CURRENT_SITE.upstreamUrl}
`
    : `# ${BRAND.name}

> Chinese-enhanced fork of Paperclip for autonomous companies.

${BRAND.name} is a Chinese-enhanced Paperclip fork for teams that want self-hosted AI agent orchestration, localized UX, and better support for the China model ecosystem without giving up upstream compatibility.

## Getting Started

Start with the ${BRAND.name} repository:

${CURRENT_SITE.firstPartyRepoUrl}

Reference the upstream project here:

${CURRENT_SITE.upstreamUrl}

## Site Info

- Website: ${getAbsoluteUrl('/')}
- Domain: ${CURRENT_SITE.domain}
- GitHub: ${CURRENT_SITE.firstPartyRepoUrl}
- Upstream: ${CURRENT_SITE.upstreamUrl}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
