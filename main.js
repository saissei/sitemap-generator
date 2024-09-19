import { extractLinksAndTitles } from './site-link-extractor.js';
import { generateWebsiteHierarchy } from './output.js';
import fs from 'node:fs';

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('URLを引数として指定してください。');
    process.exit(1);
  }
  const { links, titles } = await extractLinksAndTitles(url);

  // JSON形式のリンクデータをファイルに出力
  const linksJson = JSON.stringify(links, null, 2);
  fs.writeFileSync('links.json', linksJson, 'utf8');

  const hierarchy = generateWebsiteHierarchy(links, url);

  // 階層データをファイルに出力
  fs.writeFileSync('hierarchy.txt', hierarchy, 'utf8');
})();
