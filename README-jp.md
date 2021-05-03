# 5000choyen-server

5000兆円風の文字を描画する Web server api

Language: [简体中文](./README.md) | [English](./README-en.md) | 日本語

### 使い方

依頼をインストール：

```bash
  yarn
```

サーバを起動：

```bash
  yarn server
```

後で `http://localhost:4000/api/v1/gen?top=上の文字&bottom=下の文字` で閲覧できる：

<img src='https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe-2021/img/20210503205609.jpg' width='80%' />

### パスのパラメータ

名称|必須|タイプ|説明
:-:|:-:|:-:|:-
`top`|○|string|上の文字
`bottom`|✖︎|string|下の文字
`width`|✖︎|number|画像の幅を固定 (レコメンドなし)
`height`|✖︎|number|画像の高さを固定 (レコメンドなし)
`format`|✖︎|`png` / `jpg`|ファイル形式 (デフォルト: `jpg`)
`offset`|✖︎|number|下の文字が右へ追加のオフセット

### ほか

5000兆円風の文字をレンダする方法のもとはここでご覧になれます [Rare25 / 5000choyen](https://github.com/Rare25/5000choyen)



