// const cheerio = require('cheerio');
// const fetch = require('node-fetch');

// async function extractLinksAndTitles(url, visitedUrls = new Set()) {
//   try {
//     // ページが既に処理済みの場合は処理をスキップ
//     if (visitedUrls.has(url)) return { links: [], titles: [] };
//     visitedUrls.add(url);

//     const response = await fetch(url);
//     const html = await response.text();
//     const $ = cheerio.load(html);

//     const links = await Promise.all(
//       $('a')
//         .map(async (_, link) => {
//           const href = $(link).attr('href');
//           const text = $(link).text().trim();
//           const { links: childLinks, titles: childTitles } =
//             await extractLinksAndTitles(href, visitedUrls);
//           return { href, text, childLinks, childTitles };
//         })
//         .get()
//     );

//     const titles = $('title')
//       .map((_, title) => $(title).text().trim())
//       .get();

//     return { links, titles };
//   } catch (error) {
//     console.error('Error extracting links and titles:', error);
//     return { links: [], titles: [] };
//   }
// }

import { extractLinksAndTitles } from './site-link-extractor.js';

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('URLを引数として指定してください。');
    process.exit(1);
  }
  const { links, titles } = await extractLinksAndTitles(url);
  // console.log('Links:', links);
  console.log('Titles:', titles);
  console.log(JSON.stringify(links, null, 2));
})();
