# Official Language Map（公用語マップ）

世界各国の公用語を表示するインタラクティブな地図アプリケーションです。React + TypeScript + MapLibre GL + PMTilesで構築されています。

## 🌍 機能

### 基本機能
- **インタラクティブな世界地図**: MapLibre GLによる高性能な地図表示
- **公用語情報の表示**: 各国をクリックすると公用語情報をポップアップで表示
- **言語フィルタリング**: プルダウンメニューから特定の言語を選択して、その言語を公用語とする国をハイライト表示

### 対応言語
以下の言語でフィルタリングが可能です：
- 英語（英国式・米国式）
- フランス語、スペイン語、ポルトガル語、ドイツ語
- アラビア語、ロシア語、中国語
- その他30以上の言語

### 技術的特徴
- **PMTiles形式**: 効率的なベクタータイル配信
- **レスポンシブデザイン**: デスクトップ・モバイル対応
- **GitHub Pages**: 静的サイトとして自動デプロイ

## デモ
[GitHub Pagesで公開中](https://hirofumikanda.github.io/official-language-map/)

## 🚀 開発環境のセットアップ

### 必要な環境
- Node.js 18以上
- npm

### インストール
```bash
git clone https://github.com/hirofumikanda/official-language-map.git
cd official-language-map
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

## 📁 プロジェクト構造

```
src/
├── components/
│   └── MapView.tsx          # メイン地図コンポーネント
├── utils/
│   ├── onMapLoad.ts         # 地図読み込み時の処理（国旗画像登録）
│   ├── popup.ts             # クリック時のポップアップ処理
│   └── pointer.ts           # マウスオーバー時のカーソル変更
├── App.tsx                  # アプリケーションルート
└── main.tsx                 # エントリーポイント

public/
├── data/
│   └── official_languages.pmtiles  # ベクタータイルデータ
├── styles/
│   └── style.json           # MapLibre GLスタイル定義
├── img/                     # 国旗画像
└── font/                    # カスタムフォント
```

## 🎯 使い方

1. **地図の操作**
   - マウスドラッグ：地図の移動
   - マウスホイール：ズームイン/アウト
   - 国境上でのマウスオーバー：カーソルがポインターに変化

2. **公用語情報の確認**
   - 任意の国をクリック：その国の公用語がポップアップで表示

3. **言語フィルタリング**
   - 左上のプルダウンメニューから言語を選択
   - 選択した言語を公用語とする国が赤色でハイライト
   - その他の国は薄いグレー表示
   - "すべての言語"を選択すると元の表示に戻る

## 📦 依存関係

### 主要ライブラリ
- **React 19**: UIライブラリ
- **MapLibre GL 5.6**: オープンソース地図ライブラリ
- **PMTiles 4.3**: 効率的なベクタータイル形式
- **Vite 7.0**: 高速ビルドツール

### 開発依存関係
- **TypeScript**: 型安全性
- **ESLint**: コード品質管理
- **gh-pages**: GitHub Pagesデプロイ

## 📄 ライセンス

MIT
