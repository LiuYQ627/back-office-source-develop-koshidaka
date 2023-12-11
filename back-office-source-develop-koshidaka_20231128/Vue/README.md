# front-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## S3へのデプロイ
### 1. モジュールの準備
`dist`ディレクトリ以下にデプロイするファイルを配置してください。

### 2. aws configureを実行
注文サービス向けAWSアカウントのIAMユーザのアクセスキー、シークレットアクセスキーを使用し、`aws configure`を実施してください。  
リージョンは`ap-northeast-1`を指定してください。

### 3. デプロイスクリプトの実行
コマンドラインから`s3_push.ps1`を実行してください。引数にデプロイ先環境(`isb-dev`)を指定してください。
```
# isb-devにデプロイする場合
./s3_push.ps1 isb-dev
```
※PowershellのExecutionPolicy関連のエラーが発生する場合はコマンドの頭に`powershell -ExecutionPolicy bypass`を付与して実行してください。
