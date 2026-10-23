const isPages=process.env.GITHUB_PAGES==='true';
const repo='/AION2-Build-Planner';
/** @type {import('next').NextConfig} */
const config={output:'export',trailingSlash:true,images:{unoptimized:true},...(isPages?{basePath:repo,assetPrefix:repo+'/'}:{})};
export default config;
