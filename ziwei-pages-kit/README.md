# 紫微斗数 · 一键免费部署套件

把 [Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu) 这个开源排盘仓库，**免费、零服务器、零配置**地部署成一个任何人都能直接打开使用的网站：输入出生年月日时，即可获得与上游仓库**完全一致**的排盘与格局解读。

---

## 这个方案能给你什么 / 不能给你什么（先说清楚）

- ✅ **完全免费**：用 GitHub Pages（GitHub 自带，永久免费，无需任何付费服务）。
- ✅ **完全一致的运算结果**：排盘引擎（`lib/ziwei/algorithm.ts` 等）**一字未改**，在你部署的站点上起出的命盘、四化、格局，与上游仓库完全相同。
- ✅ **自动同步**：工作流每天自动拉取上游最新代码重新构建发布；上游一更新，你的站点次日自动跟上。
- ✅ **普通用户直接用**：访客只需打开网址 → 点「起盘」→ 填出生信息，浏览器内即时算完，**数据不出本机**。

> ⚠️ **关于"AI 解读"的重要说明**：上游开源版**本身不含** AI 解读后端（`/api/interpret` 未开源）。所以在原仓库里，解读面板会显示「开源版不含 AI 解读接口」。本部署**忠实复现这一行为**——这是上游的真实状态，不是部署问题。若想要 AI 解读，需要你自己接一个 LLM 后端（需 API Key，已超出"免费零配置"范畴，本套件不含）。除 AI 解读外，排盘 + 格局 + 古籍/知识库内容均完整可用，且与上游一致。

---

## 5 分钟部署步骤

### 第 1 步：建一个仓库
在你的 GitHub 新建一个仓库，**仓库名必须**为 `<你的用户名>.github.io`（例如用户叫 `xiaoming`，就建 `xiaoming.github.io`）。
> 这样站点会发布在根路径 `https://<你的用户名>.github.io/`，无需任何路径配置。

### 第 2 步：把本套件的文件传上去
把本目录里的以下文件/文件夹上传到该仓库（直接拖进去或 git push 均可）：
```
.github/workflows/sync-deploy.yml
overlay/next.config.js
README.md   （可选）
```
> 只需这 2 个关键文件，不碰上游任何源码。

### 第 3 步：开启 GitHub Pages
进入仓库 `Settings → Pages → Build and deployment → Source`，选择 **GitHub Actions**，保存。

### 第 4 步：跑一次部署
进入仓库 `Actions` 标签页 → 找到 **Sync & Deploy to GitHub Pages** → `Run workflow` → 确认。
首次构建约 3–5 分钟。完成后，打开 `https://<你的用户名>.github.io/` 即可使用。

---

## 之后怎么用 / 怎么更新

- **普通访客**：直接打开网址，点「紫微斗数排盘」→ 输入出生年月日时（公历/农历、性别）→ 立即看到命盘与格局解读。
- **自动同步上游**：每天 UTC 03:17 自动重新拉取上游最新版并发布。你什么都不用做。
- **手动立即更新**：在 `Actions` 页面点 `Run workflow` 即可马上同步一次。
- **换绑自定义域名**（可选）：在 Pages 设置里填自定义域名，并按需在 `sync-deploy.yml` 的 `NEXT_PUBLIC_SITE_URL` 改为你的域名。

---

## 如果你不是用 `<用户名>.github.io`

若仓库名是普通项目名（如 `ziwei`），站点会发布在 `https://<用户名>.github.io/ziwei/`。
此时需在 `sync-deploy.yml` 把构建环境变量改成：
```yaml
env:
  NEXT_PUBLIC_SITE_URL: https://${{ github.repository_owner }}.github.io/ziwei
  BASE_PATH: '/ziwei'     # 改成你的仓库名（含前导斜杠）
```
（用户页部署则保持 `BASE_PATH: ''` 即可。）

---

## 技术说明（部署者参考）

- 工作流每次运行都 `git clone --depth 1` 上游最新代码，叠加仅含 `output: 'export'` 的 `next.config.js`，再构建为纯静态文件发布。
- 除"开启静态导出"外，另做了两处**不影响排盘/解读**的最小改动：
  1. 移除 `app/layout.tsx` 里的 Vercel 专属分析组件（在非 Vercel 免费托管上无意义且会产生外部请求）。
  2. 为 `robots.ts` / `sitemap.ts` 补 `export const dynamic = "force-static"`（Next 16 静态导出的硬性要求）。
- 排盘内核、格局知识库、古籍库、倪师原话知识库均原样保留，因此运算结果与上游**逐字一致**。

## 许可
代码 MIT / 数据 CC BY 4.0 / 古籍公版；倪海厦《天纪》原话仅限非商用。公开部署时请遵守非商用条款。
