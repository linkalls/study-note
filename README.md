This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Docker を使用した起動方法

### 必要なもの
- Docker Engine
- Docker Compose

### セットアップ
1. リポジトリをクローンします。
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. 環境変数ファイル `.env.local` を作成します。`.env.example` をコピーして必要な値を設定してください。
   ```bash
   cp .env.example .env.local
   # .env.local ファイルを編集して、特に以下の項目に必要な値を設定します:
   # GITHUB_ID, GITHUB_SECRET, NEXTAUTH_SECRET
   # POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB (docker-compose内で使用)
   # POSTGRES_URL (docker-compose内でappコンテナがdbコンテナに接続するために使用するURL。通常は .env.example のデフォルト値のままでOK)
   ```

### 開発モードでの起動
ホットリロードが有効になります。Next.jsアプリケーションは `http://localhost:3000` でアクセス可能になります。
PostgreSQLは `localhost:5432` でアクセス可能です。

```bash
docker-compose up -d app
```
ログを確認する場合:
```bash
docker-compose logs -f app
```

### 本番モードでの起動 (シミュレーション)
最適化されたビルドが実行されます。Next.jsアプリケーションは `http://localhost:3001` でアクセス可能になります。

```bash
docker-compose up -d app_prod
```
ログを確認する場合:
```bash
docker-compose logs -f app_prod
```

### 停止方法
```bash
docker-compose down
```
データベースのデータを永続化ボリュームごと削除する場合は以下も実行します:
```bash
docker-compose down -v
```
