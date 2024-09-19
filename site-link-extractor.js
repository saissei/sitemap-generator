import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import url from 'node:url';

import https from 'node:https';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  ciphers:
    'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256',
  minVersion: 'TLSv1.2',
});
// 待機時間 (ミリ秒)
const REQUEST_INTERVAL = 5000;

export async function extractLinksAndTitles(
  baseUrl,
  excludedPaths = ['/news'],
  visitedUrls = new Set(),
  depth = 0,
  maxDepth = 4
) {
  try {
    // ページが既に処理済みの場合は処理をスキップ
    if (visitedUrls.has(baseUrl)) return { links: [], titles: [] };
    visitedUrls.add(baseUrl);

    // 待機
    await new Promise((resolve) => setTimeout(resolve, REQUEST_INTERVAL));

    const response = await fetch(baseUrl, {
      agent: httpsAgent,
      timeout: 10000,
    });
    if (!response.ok) {
      console.error(
        `Error fetching ${baseUrl}: ${response.status} - ${response.statusText}`
      );
      return { links: [], titles: [] };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const domain = new URL(baseUrl).hostname;

    const links = [];
    for (const link of $('a')) {
      const href = $(link).attr('href');
      // 引数のドメインと同じドメインのみ抽出する
      if (href?.startsWith('https://') && new URL(href).hostname === domain) {
        const absoluteUrl = new URL(href, baseUrl).toString();
        const urlObj = new URL(absoluteUrl);
        // 除外するサブパスに含まれない場合のみ処理する
        if (!excludedPaths.some((path) => urlObj.pathname.includes(path))) {
          const text = $(link).text().trim();
          if (depth < maxDepth) {
            const { links: childLinks, titles: childTitles } =
              await extractLinksAndTitles(
                absoluteUrl,
                excludedPaths,
                visitedUrls,
                depth + 1,
                maxDepth
              );
            links.push({ href: absoluteUrl, text, childLinks, childTitles });
          } else {
            links.push({ href: absoluteUrl, text });
          }
        }
      }
    }

    const titles = $('title')
      .map((_, title) => $(title).text().trim())
      .get();

    return { links, titles };
  } catch (error) {
    console.error('Error extracting links and titles:', error);
    return { links: [], titles: [] };
  }
}
