# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

一个纯 HTML/CSS/JS 的架子鼓应用，来自 JavaScript30 课程（项目 01）。按下键盘 A–L 键即可播放对应的鼓声。无构建工具、无框架、无包管理器。

## 文件结构

- `01 - JavaScript Drum Kit/index-START.html` — 起始模板，包含页面结构和 `<audio>` 元素，`<script>` 块为空。
- `01 - JavaScript Drum Kit/index-FINISHED.html` — 完成版，包含完整的 JS 逻辑。
- `01 - JavaScript Drum Kit/style.css` — 两个版本共用的样式。
- `01 - JavaScript Drum Kit/sounds/` — 每个鼓声对应的 `.wav` 音频文件。

## 如何运行

直接在浏览器中打开 `01 - JavaScript Drum Kit/index-FINISHED.html`。无需服务器，这是一个使用相对路径引用 CSS 和音频的静态页面。
