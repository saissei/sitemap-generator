/**
 * ウェブサイトの階層を生成する関数
 * @param {Array} data - 階層データの配列
 * @param {string} baseUrl - 置換するベースURL
 * @returns {string} - フォーマットされた階層文字列
 */

export function generateWebsiteHierarchy(data, baseUrl) {
  const hierarchy = [];

  /**
   * 階層を構築するヘルパー関数
   * @param {Array} items - 階層データの配列
   * @param {string} prefix - 階層のプレフィックス
   */
  function buildHierarchy(items, prefix = '') {
    for (const item of items) {
      const title = item.text;
      const href = item.href.replace(baseUrl, '');
      const formattedItem = `- ${title}                                                           ${href}`;
      hierarchy.push(formattedItem);

      if (item.childLinks && item.childLinks.length > 0) {
        // nullチェックを追加
        buildHierarchy(item.childLinks, `${prefix}  `);
      }
    }
  }

  buildHierarchy(data);
  return hierarchy.join('\n');
}
