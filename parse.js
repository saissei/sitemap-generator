import fs from 'node:fs';

function printLinks(links, indent = 0) {
  for (const link of links) {
    const indentation = ' '.repeat(indent);
    console.log(`${indentation}- [${link.text}](${link.href})`);
    if (link.childLinks && link.childLinks.length > 0) {
      printLinks(link.childLinks, indent + 2);
    }
  }
}

function main() {
  fs.readFile('links.json', 'utf8', (err, data) => {
    if (err) {
      console.error('ファイルの読み込みに失敗しました:', err);
      return;
    }
    const links = JSON.parse(data);
    printLinks(links);
  });
}

main();
