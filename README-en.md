# 5000choyen-server

5000choyen font style image generation server api

Language: [简体中文](./README.md) | English | [日本語](./README-jp.md)

### Usage

install dependencies:

```bash
  yarn
```

start web server:

```bash
  yarn server
```

open `http://localhost:4000/api/v1/gen?top=上の文字&bottom=下の文字` :

<img src='https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe-2021/img/20210503205609.jpg' width='100%' />

### Request query

name|required|type|description
:-:|:-:|:-:|:-
`top`|yes|string|top render text
`bottom`|no|string|bottom render text
`width`|no|number|fixed image width (not recommended)
`height`|no|number|fixed image height (not recommended)
`format`|no|`png` / `jpg`|image format (default: `jpg`)
`offset`|no|number|bottom text right extra offset

### Other

5000choyen font style render methods from [Rare25 / 5000choyen](https://github.com/Rare25/5000choyen)

