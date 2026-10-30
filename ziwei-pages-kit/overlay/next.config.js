/** @type {import('next').NextConfig} */
// 该文件由部署工作流叠加到上游仓库，仅启用静态导出，不改动任何排盘/解读逻辑。
// BASE_PATH 仅在「项目页」(非 <用户名>.github.io) 部署时需要设置，用户页留空即可。
const basePath = process.env.BASE_PATH || '';
const nextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  transpilePackages: ['lunar-javascript'],
};

module.exports = nextConfig;
