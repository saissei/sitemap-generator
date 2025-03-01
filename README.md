# プロジェクトの概要

このプロジェクトは、指定されたウェブサイトのリンクとタイトルを抽出し、階層構造を生成するツールです。抽出されたリンクは JSON 形式で保存され、階層構造はテキストファイルとして保存されます。

## 主な仕様

- `main.js`:

  - ウェブサイトの URL を引数として受け取り、リンクとタイトルを抽出します。
  - 抽出されたリンクを`links.json`ファイルに保存します。
  - リンクの階層構造を`hierarchy.txt`ファイルに保存します。

- `parse.js`:
  - `links.json`ファイルを読み込み、リンクを再度パースしてコンソールに出力します。

## 使用方法

### 1. 必要なモジュールのインストール

プロジェクトのルートディレクトリで以下のコマンドを実行して、必要なモジュールをインストールしてください。

```bash
sh
npm install
```

### 2. ウェブサイトのリンクとタイトルを抽出

以下のコマンドを実行して、指定された URL のリンクとタイトルを抽出します。

```bash
$ node main.js <URL>

[例]:
$ node main.js https://example.com
```

このコマンドを実行すると、`links.json`と`hierarchy.txt`ファイルが生成されます。

### 3. 抽出されたリンクの再パース

`links.json`ファイルからリンクを再度パースしてコンソールに出力するには、以下のコマンドを実行します。

```bash
$ node parse.js > {output_file_name}

[例]:
$ node parse.js > sitemap.md # markdown形式なので.mdで出力していますが、.txtでも構いません
```

## 除外パスの設定

特定のパスを除外したい場合は、`site-link-extractor.js`ファイル内の`excludedPaths`変数を編集してください。

```javascript:site-link-extractor.js
const excludedPaths = ['/news', '/example']; // ここに除外したいパスを追加
```

## インターバルの設定

各ページのリクエスト間の待機時間を変更したい場合は、`site-link-extractor.js`ファイル内の`REQUEST_INTERVAL`変数を編集してください。

```javascript:site-link-extractor.js
const REQUEST_INTERVAL = 5000; // ミリ秒単位で待機時間を設定
```

## 制限事項

- ウェブサイトの構造によっては、リンクの抽出が正確に行われない場合があります。
- 大規模なウェブサイトでは、処理に時間がかかることがあります。

## エラーハンドリング

- ファイルの読み書きに失敗した場合、詳細なエラーメッセージがコンソールに出力されます。
- URL が指定されていない場合、エラーメッセージが表示され、プロセスが終了します。
