const fs = require("fs");
const { execSync } = require("child_process");

const baseUrl = "https://bobbyx208.github.io";

const files = ["index.html"];

const urls = files.map(file => {
  const lastmod = execSync(`git log -1 --format=%cI ${file}`).toString().trim();

  return `
  <url>
    <loc>${baseUrl}/${file === "index.html" ? "" : file}</loc>
    <lastmod>${lastmod.split("T")[0]}</lastmod>
  </url>`;
}).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);