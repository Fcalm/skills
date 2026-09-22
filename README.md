# skills

我的 Agent skills 集合：按用途沉淀可复用的工作流，每个 skill 一个目录，由 `SKILL.md` 描述触发条件与执行步骤。

## Skills 索引

| Skill | 简介 |
|---|---|
| [resume-built](./resume-built/) | 简历制作流水线的路由 skill：索引并分发到两个次级 skill —— `resume-context`（内容写作：章节结构、JD 提炼、STAR 写经历）与 `resume-html-pdf`（渲染交付：HTML 模板、在线编辑、一页 PDF 导出） |

> 新增 skill：在本表追加一行（链接到 skill 目录 + 一句话简介），并同步更新下方目录结构。

## 目录结构

```
skills/
├── README.md
└── resume-built/
    ├── SKILL.md              # 路由：次级 skill 索引与分发规则
    ├── resume-context/       # 次级 skill：简历内容写作
    └── resume-html-pdf/      # 次级 skill：HTML 渲染与 PDF 导出
```

## 安装与使用

- 全局使用：把 skill 目录复制到 `~/.agents/skills/`；项目内使用：复制到 `<project>/.agents/skills/`，ZCode 会自动发现。
- 次级 skill 不单独安装，由 `resume-built` 的分发规则按需读取。
