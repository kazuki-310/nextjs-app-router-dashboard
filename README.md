# Learn Next.js を元に App Router 周りの機能を学習していきます。

## データフェッチ

App Router のデータフェッチにまつわる基本的な考え方について
基本的にはデータフェッチは、Client Components ではなく Server Components で行うべき。

- パフォーマンスと設計のトレードオフ
  - クライアント・サーバー間の通信は、物理的距離や不安定なネットワーク環境の影響で多くの場合低速です。そのため、パフォーマンス観点では通信回数が少ないことが望ましいですが、通信回数とシンプルな設計はトレードオフになりがちです。
- バンドルサイズの増加

### コロケーション

App Router では Server Components でのデータフェッチが利用可能なので、できるだけ末端のコンポーネントへデータフェッチをコロケーションすることを推奨されている。
末端のコンポーネントでデータフェッチを行うと、ページ全体を通して重複するリクエストが発生する可能性が高まります。App Router はこれに対処するため、レンダリング中の同一リクエストをメモ化し排除する Request Memoization を実装しています。
オプションの指定ミスにより Request Memoization が効かないことなどがないよう、複数のコンポーネントで利用しうるデータフェッチ処理はデータフェッチ層として分離しましょう。

```
export async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    // 独自ヘッダーなど
  });
  return res.json();
}
```

- ファイル構成

```
前述のgetProduct()を分離する場合、筆者なら以下のいずれかのような形でファイルを分離します。データフェッチ層が多い場合にはより細かく分離すると良いでしょう。

app/products/fetcher.ts
app/products/_lib/fetcher.ts
app/products/_lib/fetcher/product.ts
```

### N+1 と DataLoader

ページレンダリング時に `getPosts()` を 1 回と `getUser()` を N 回呼び出すことになり、ページ全体では以下のような N+1 回のデータフェッチが発生します。
この時の対処法としては以下がある。

- API 側では `https://dummyjson.com/users/?id=1&id=2&id=3...` のように、id を複数指定して User 情報を一括で取得できるよう設計するパターン
- DataLoader を使用するパターン

### 細粒度の REST API 設計

バックエンドの REST API 設計は、Next.js 側の設計にも大きく影響をもたらします。App Router(React Server Components) におけるバックエンド API は、細粒度な単位に分割されていることが望ましく、可能な限りこれを意識した設計を行いましょう。

- App Router においては、Server Components によってデータフェッチのコロケーションや分割が容易になったためコードやロジックの重複が発生しづらくなりました。このため、App Router は細粒度で設計された REST API と非常に相性が良いと言えます。

## コンポーネント設計

### Client Components のユースケース

- クライアントサイド処理
  `onClick()` や `onChange()` といったイベントハンドラの利用
  状態 `hooks(useState()やuseReducer()など)やライフサイクルhooks(useEffect())` などの利用
  ブラウザ API の利用
- サードパーティコンポーネント
- RSC Payload 転送量の削減
  Client Components を含む JavaScript バンドルは 1 回しかロードされませんが、Server Components はレンダリングされるたびに RSC Payload が転送されます。そのため、繰り返しレンダリングされるコンポーネントは RSC Payload の転送量を削減する目的で Client Components にすることが望ましい場合があります

### Container/Presentational パターン

データ取得は Container Components・データの参照は Presentational Components に分離し、テスト容易性を向上させましょう。
React Server Components における Container/Presentational パターンは従来のものとは異なり、Container Components はデータフェッチなどのサーバーサイド処理のみを担います。一方 Presentational Components は、データフェッチを含まない Shared Components もしくは Client Components を指します。

- Container 1st な設計とディレクトリ構成

```
app
├── <Segment>
│  ├── page.tsx
│  ├── layout.tsx
│  ├── _containers
│  │  ├── <Container Name>
│  │  │  ├── index.tsx
│  │  │  ├── container.tsx
│  │  │  ├── presentational.tsx
│  │  │  └── ...
│  │  └── ...
│  ├── _components // 汎用的なClient Components
│  ├── _lib // 汎用的な関数など
│  └── ...
└── ...
```

### 参考資料

- [Learn Next.js](https://nextjs.org/learn)
- [Next.js の考え方](https://zenn.dev/akfm/books/nextjs-basic-principle)
