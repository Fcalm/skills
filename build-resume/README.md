# build-resume

把简历素材（markdown/txt 草稿、聊天里口述的经历、参考排版图片）转成一份可在线编辑、可一键导出 PDF 的单页 HTML 简历。

- `assets/resume-template.html` —— 版式、打印样式、编辑控件（只改打印字号，不要动内容和脚本结构）
- `assets/resume-data.js` —— 内容存储：`window.RESUME_DATA = { version, content }`，AI 直接编辑 `content` 字段
- `scripts/export-pdf.sh` —— 无头 Edge/Chrome 导出 PDF 并报告页数

浏览器里打开 `简历.html` 后可直接编辑文字、增删板块，连接数据文件后改动自动写回 `简历数据.js`。
