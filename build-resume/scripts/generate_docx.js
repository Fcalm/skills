const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, TabStopType, TabStopPosition,
  HeadingLevel
} = require("docx");

// Constants
const BLUE = "2E75B6";
const A4_WIDTH = 11906;
const A4_HEIGHT = 16838;
const MARGIN = 1200; // slightly less than 1 inch to help fit on one page
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN;

// Font sizes in half-points
const SAN_HAO = 32;  // 三号 = 16pt
const WU_HAO = 21;   // 五号 = 10.5pt

// Blue divider paragraph
function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 200, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 }
    },
    children: [
      new TextRun({ text, font: "Arial", size: 22, bold: true, color: BLUE })
    ]
  });
}

// Helper for normal text paragraphs
function textPara(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 60, line: 312 }, // 1.3 line spacing
    alignment: opts.alignment || AlignmentType.LEFT,
    children: [new TextRun({ text, font: "Arial", size: opts.size || WU_HAO, bold: opts.bold || false })]
  });
}

// Name + contact same-line paragraph
function nameContactLine(name, phone, email) {
  return new Paragraph({
    spacing: { after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: name, font: "Arial", size: SAN_HAO, bold: false }),
      new TextRun({ text: `\t${phone} | ${email}`, font: "Arial", size: WU_HAO })
    ]
  });
}

// Education line with right-aligned time
function educationLine(school, degree, major, time) {
  return new Paragraph({
    spacing: { after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: `${school} · ${degree} · ${major}`, font: "Arial", size: WU_HAO }),
      new TextRun({ text: `\t${time}`, font: "Arial", size: WU_HAO })
    ]
  });
}

// Experience item
function experienceBlock(item) {
  const header = new Paragraph({
    spacing: { before: 80, after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: `${item.title} | ${item.role}`, font: "Arial", size: WU_HAO, bold: true }),
      new TextRun({ text: `\t${item.time}`, font: "Arial", size: WU_HAO })
    ]
  });

  const points = item.points.slice(0, 3).map((point, i) =>
    new Paragraph({
      spacing: { after: i < item.points.length - 1 ? 20 : 60 },
      indent: { left: 360 },
      children: [new TextRun({ text: `• ${point}`, font: "Arial", size: WU_HAO })]
    })
  );

  return [header, ...points];
}

// Build the document
const name = "范炜乾";
const phone = "138-xxxx-xxxx";
const email = "fanweiqian@qq.com";
const target = "产品经理";

const education = {
  school: "南昌大学 · 211/双一流",
  degree: "本科",
  major: "工商管理",
  time: "2022.09 - 2026.06"
};

const projects = [
  {
    title: "微信小程序开发项目",
    role: "产品负责人",
    time: "2023.09 - 2023.12",
    points: [
      "针对大学生校园闲置物品交易痛点，通过线上问卷调研 50+ 名目标用户，梳理 V1.0 功能需求清单",
      "独立完成产品业务流程图与核心页面原型设计，将用户核心操作路径缩短至 3 步内",
      "熟练运用 Claude Code 辅助编写前后端逻辑，成功解决 20+ 个代码报错，开发周期缩短 40%"
    ]
  },
  {
    title: "To-Do App 开发项目",
    role: "产品负责人",
    time: "2024.01 - 2024.04",
    points: [
      "深度体验 5 款主流任务管理产品，输出竞品分析报告，定位“极简记录+强效提醒”差异化切入点",
      "主导规划任务创建、分类标签、状态追踪等核心模块，借助 Claude Code 实现从概念到高保真 Demo 转化",
      "组织 10 名内测用户收集 15 份有效反馈，针对性优化 3 处交互细节，核心功能留存率提升 25%"
    ]
  }
];

const skills = [
  "需求分析与 PRD 撰写",
  "竞品分析与市场调研",
  "流程图与原型设计",
  "Claude Code / ChatGPT 深度应用",
  "SQL 数据分析"
];

const strengthsText = "依托工商管理专业背景，具备扎实的商业逻辑与市场洞察力；善于从业务目标、用户体验和实现成本三个维度综合评估产品方案；对 AI 工具在人机协作场景中的应用有深入理解和实践经验";

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: WU_HAO } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: A4_WIDTH, height: A4_HEIGHT },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    children: [
      // Name + Contact on same line
      nameContactLine(name, phone, email),

      // 求职意向
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "求职意向：", font: "Arial", size: WU_HAO, bold: true }),
          new TextRun({ text: target, font: "Arial", size: WU_HAO })
        ]
      }),

      // 教育经历
      sectionHeader("教育经历"),
      educationLine(education.school, education.degree, education.major, education.time),

      // 项目经历
      sectionHeader("项目经历"),
      ...projects.flatMap(p => experienceBlock(p)),

      // 实习经历
      sectionHeader("实习经历"),
      textPara("（无）"),

      // 个人优势
      sectionHeader("个人优势"),
      textPara(skills.join("、"), { after: 80 }),
      textPara(strengthsText),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "C:/Users/fanweiqian/Desktop/简历/build-resume/output/简历_范炜乾_产品经理.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("OK: " + outPath);
}).catch(err => {
  console.error("ERROR: " + err.message);
  process.exit(1);
});
