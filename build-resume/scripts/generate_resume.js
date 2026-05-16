const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  BorderStyle, TabStopType, TabStopPosition
} = require("docx");

// A4 page size
const PAGE_WIDTH = 11906;
const PAGE_HEIGHT = 16838;
const MARGIN = 1440; // 1 inch
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 9026

const FONT = "Microsoft YaHei";
const FONT_SONG = "SimSun";
const COLOR_PRIMARY = "1A1A1A";
const COLOR_SECONDARY = "2E75B6";
const COLOR_GRAY = "666666";

function sectionTitle(text) {
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_SECONDARY, space: 4 } },
    children: [
      new TextRun({ text, font: FONT, size: 26, bold: true, color: COLOR_PRIMARY }),
    ],
  });
}

function bullet(text, boldPrefix) {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix, font: FONT, size: 20, bold: true, color: COLOR_PRIMARY }));
  }
  children.push(new TextRun({ text, font: FONT, size: 20, color: COLOR_PRIMARY }));
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 360 },
    children,
  });
}

function subHeader(leftText, rightText) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: leftText, font: FONT, size: 22, bold: true, color: COLOR_PRIMARY }),
      new TextRun({ text: "\t" + rightText, font: FONT, size: 20, color: COLOR_GRAY }),
    ],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 20 } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
        margin: { top: 1200, right: MARGIN, bottom: 1200, left: MARGIN },
      },
    },
    children: [
      // Name
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({ text: "范炜乾", font: FONT, size: 44, bold: true, color: COLOR_PRIMARY }),
        ],
      }),

      // Contact
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "137-2490-8557  |  3282167452@qq.com", font: FONT, size: 20, color: COLOR_GRAY }),
        ],
      }),

      // Job target
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "求职意向：产品运营实习生", font: FONT, size: 20, color: COLOR_PRIMARY }),
        ],
      }),

      // ============ 教育经历 ============
      sectionTitle("教育经历"),
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({ text: "南昌大学（211 / 双一流）", font: FONT, size: 22, bold: true, color: COLOR_PRIMARY }),
          new TextRun({ text: "  ·  本科  ·  工商管理", font: FONT, size: 20, color: COLOR_PRIMARY }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "2023.09 - 2027.06", font: FONT, size: 20, color: COLOR_GRAY }),
        ],
      }),

      // ============ 项目经历 ============
      sectionTitle("项目经历"),

      // Project 1
      subHeader("「校园查」微信小程序  |  产品负责人", "2024.09 - 2025.03"),
      bullet("针对大学生校园闲置物品交易信息分散、匹配效率低的痛点，通过线上问卷调研 50+ 名目标用户，提取核心诉求并梳理出 V1.0 版本功能需求清单。", "需求分析："),
      bullet("设计“邀请码裂变”机制——新用户输入老用户邀请码后双方各获一次帖子置顶权益，拉新人数越多赠送越多，上线后自然裂变获取数百名用户。", "增长设计："),
      bullet("深度体验狐友等同类产品，参考其社交互动设计，新增私信和评论功能，使用户日均互动频次提升约 30%。", "竞品优化："),
      bullet("在无技术背景的情况下，熟练运用 Claude Code 辅助编写前后端逻辑，成功解决 20+ 个代码报错问题，将原计划开发周期缩短约 40%，实现小程序成功上线。", "AI辅研："),
      bullet("独立完成产品业务流程图与核心页面原型设计，编写完整 PRD，精简非核心功能，将用户发布二手商品的路径缩短至 3 步内。", "产品设计："),

      // Project 2
      subHeader("To-Do App 开发项目  |  产品负责人", "2024.03 - 2024.06"),
      bullet("深度体验滴答清单、番茄ToDo、Microsoft To Do 等 5 款主流任务管理产品，输出竞品分析报告，定位“极简记录 + 强效提醒”差异化切入点。", "竞品分析："),
      bullet("主导规划任务创建、分类标签、状态追踪等核心模块，前端使用 Flutter、后端使用 FastAPI，借助 Claude Code 协助完成代码生成，实现从概念到高保真 Demo 的转化。", "功能落地："),
      bullet("组织 15 名内测用户进行产品体验，收集并整理有效反馈，针对性优化交互细节（如减少创建任务的输入层级），使产品核心功能完成率提升约 25%。", "迭代优化："),

      // ============ 实习经历 ============
      sectionTitle("实习经历"),
      subHeader("校园创业团队  |  产品运营（兼职）", "2024.06 - 2024.09"),
      bullet("协助校内创业团队完成一款本地生活小程序的冷启动运营，负责社群搭建与内容维护，3 个月内积累 300+ 种子用户。"),
      bullet("建立基础数据监控表（Excel + Python），跟踪日活、留存、转化率等核心指标，每周输出运营数据周报，推动产品功能优化。"),
      bullet("跨部门协作：联动设计、开发、外联团队推进运营活动落地，主导策划 2 场线上推广活动，活动期间 DAU 提升约 50%。"),

      // ============ 个人优势 ============
      sectionTitle("个人优势"),
      bullet("具备独立的产品规划与运营落地能力，熟练掌握需求拆解、竞品分析、用户增长设计，能输出规范的产品需求文档（PRD），有从 0 到 1 完整上线产品的实战经验。", "产品运营能力："),
      bullet("深度掌握 Claude Code 等前沿 AI 工具在实际业务中的应用，能够借助 AI 辅助进行代码编写、需求梳理与效率提升，具备极强的新技术学习能力与人机协作意识。", "AI 工具应用："),
      bullet("依托工商管理专业背景，具备扎实的商业逻辑与市场洞察力；懂得以用户价值为导向，能从业务目标、用户体验和实现成本三个维度综合评估产品方案。", "商业思维："),

      // Skills
      new Paragraph({
        spacing: { before: 280, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_SECONDARY, space: 4 } },
        children: [
          new TextRun({ text: "专业技能", font: FONT, size: 26, bold: true, color: COLOR_PRIMARY }),
        ],
      }),
      new Paragraph({
        spacing: { before: 80, after: 40 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: "SQL、Python、Excel、Claude Code / AI 辅助开发、PRD 撰写、竞品分析、用户增长设计、数据分析、英语 CET-6", font: FONT, size: 20, color: COLOR_PRIMARY }),
        ],
      }),
    ],
  }],
});

const outputPath = "C:/Users/fanweiqian/Desktop/简历/build-resume/output/简历_范炜乾_产品运营实习生.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log("Resume saved to:", outputPath);
  console.log("File size:", buffer.length, "bytes");
}).catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
