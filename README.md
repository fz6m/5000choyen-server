# 5000choyen-server

5000兆元字体风格 图片的生成器 Web server api

5000choyen font style image generation server api

5000兆円風の文字を描画する Web server api

Language: 简体中文 | [English](./README-en.md) | [日本語](./README-jp.md)

### 使用

安装依赖：

```bash
  yarn
```

运行 server ：

```bash
  yarn server
```

之后打开 `http://localhost:4000/api/v1/gen?top=上の文字&bottom=下の文字` 即可得到图片：

<img src='https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe-2021/img/20210503205609.jpg' width='100%' />

### 请求参数

名字|是否必须|类型|说明
:-:|:-:|:-:|:-
`top`|是|string|上部文字
`bottom`|否|string|下部文字
`width`|否|number|固定图片宽度（不建议）
`height`|否|number|固定图片高度（不建议）
`format`|否|`png` / `jpg`|图片格式（默认为 `jpg`）
`offset`|否|number|下部文字向右的额外偏移量

### 其他

5000兆元字体风格渲染方法来自于 [Rare25 / 5000choyen](https://github.com/Rare25/5000choyen)

