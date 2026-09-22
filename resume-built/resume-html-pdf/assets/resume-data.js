// ============================================================
// 简历内容数据文件（存储层）
// - AI 修改内容：直接编辑下方 content 字段（保持 HTML 结构），改完把 version 加 1
// - 用户修改：在浏览器里打开 简历.html 编辑，改动会自动写回本文件
// - 简历.html 只负责模板样式和编辑控件，不存内容
// ============================================================
window.RESUME_DATA = {
  version: 894,
  content: `
  <!-- ================= 个人信息 / 教育经历 ================= -->
  <div class="header">
    <div class="contact">
      <span class="name">范炜乾</span><span class="sep">|</span>13724908557<span class="sep">|</span>3282167452@qq.com<span class="sep">|</span>
      <a href="https://github.com/Fcalm" target="_blank">
        <svg class="github-icon" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>github.com/Fcalm
      </a>
    </div>
    <div class="edu"><b>南昌大学&nbsp;</b>本科<span class="sep">|</span>工商管理<span class="sep">|</span>2023.09~至今（27届毕业）</div>
  </div>

  <!-- ================= 项目经历 ================= -->
  <div class="section-title">项目经历</div>

  <!-- ---------- 项目一：Avery ---------- -->
  <div class="entry-title">Avery——辅助求职 Agent <span class="role">｜ 项目owner</span></div>
  <div class="link-row"><a href="https://github.com/Fcalm/Avery" target="_blank">github.com/Fcalm/Avery</a></div>

  <ul class="l1">
    <li><span class="lead">项目简介：</span>求职者需针对不同岗位反复修改简历、在海量招聘信息中筛选并手动投递，传统求职辅助工具（投递插件、简历优化工具）需要多次的人工核验和执行，无法让用户从投递中真正解放。Avery 可以根据 JD 生成匹配的简历版本，能根据要求每天检索岗位并批量投递，将时间和精力还给用户，提升求职效率。</li>
    <li><span class="lead">产品定义：</span>
      <ul class="l2">
        <li><b>能力边界</b>：Avery 可以辅助用户完成求职路上的大多数事情，但其他非求职类的事情从系统提示词和工具白名单层面就被杜绝——这是为了在保证 Agent 能力的情况下尽可能地<b>降低用户风险</b>。</li>
        <li><b>权限分级</b>：设计了三级确认权限。一级放行只读工具；二级放行低风险工具；三级放行大部分工具，但仍保留部分危险工具无论如何<b>必须请求用户确认</b>。</li>
        <li><b>纠错机制</b>：当模型生成的简历出现<b>严重幻觉</b>（如编造经历、证书）时，触发错误并退回要求修改；同一指纹的工具调用连续失败 2 次后注入消息提醒模型，<b>防止模型陷入调用失败循环</b>。</li>
      </ul>
    </li>
    <li><span class="lead">业务场景评估体系：</span>根据业务场景设计 6 个评测集及对应 Rubric，覆盖<b>简历质量、安全性、投递完成率</b>三大维度；采用 LLM-as-Judge + 固定结果检验来评分，通过多次迭代将简历质量评分（描述结构、JD 匹配度等指标）提升 <b>15%（75→87）</b>，投递完成率<b>从 30% 提升至 95%</b>。</li>
    <li><span class="lead">成本控制：<span style="font-weight: normal;">通过稳定上下文前缀，设计工作状态栏和 SKILL 制定工作流程，将每个投递任务的平均 token 控制在 </span>50k 以内<span style="font-weight: normal;">，</span>缓存命中率高达 93%<span style="font-weight: normal;">（使用 deepseek 的 api 得出的测试结果，长轮对话下更高）</span></span>。</li>
  </ul>

  <!-- ---------- 项目二：Agentic RAG ---------- -->
  <div class="entry-title">Agentic RAG——企业知识问答 Agent <span class="role">｜ 项目owner</span></div>
  <div class="link-row"><a href="https://github.com/Fcalm/Agentic-RAG" target="_blank">github.com/Fcalm/Agentic-RAG</a></div>

  <ul class="l1">
    <li><span class="lead">项目简介：<span style="font-weight: normal;">企业知识分散在多类文档中，员工查找信息耗时，传统关键词搜索无法理解问题语义、也无法处理跨文档问题。根据这个痛点设计并实现了面向企业人员的知识问答 Agent，将 RAG 定义为 Agent 的可选工具而非固定流程，由 Agent 根据问题类型决定是否检索、如何检索、检索失败怎么办。</span></span></li><li><span class="lead">文档分块与检索<span style="font-weight: normal;">：针对企业散落的文档，使用固定 token 切分文档+</span>三层树状结构索引<span style="font-weight: normal;">的策略——原始文档层用于精确召回，聚类摘要层用于主题定位，高精度摘要层用于答案抽取，</span>平均召回时长 8s<span style="font-weight: normal;">，兼顾召回速度与精度。</span></span></li><li><span class="lead">问题处理管线<span style="font-weight: normal;">：单一事实的简短问题由本地规则直接放行；其余问题由 flash 模型判断“简单/复杂”并改写、拆解为2-4 个子问题，每个子问题在并行检索后统一去重合成，</span>平均处理时间 3 秒<span style="font-weight: normal;">。相较纯 pro 模型的处理耗时</span>减少 2 秒<span style="font-weight: normal;">。（使用 deepseek-v4 的两款模型进行测试）</span></span></li>
    <li><b>检索质量评判机制：</b>使用评判模型判断答案质量并决定下一步行动——证据充分直接回答；证据不足时仅允许一次重试；问题歧义时向用户发起可交互的澄清式反问；知识库无答案时明确拒答而非强行生成。评判模型失败时显式报错，不静默回退。从机制上<b>抑制幻觉</b>。</li>
  </ul>

  <!-- ================= 核心能力 ================= -->
  <div class="section-title">核心能力</div>

  <ul class="l1">
    <li><b>产品需求转化</b>：善于从模糊业务需求中提炼出 Agent 所需能力并设计能力边界，能将需求转化为明确的工程设计方案。</li>
    <li><b>技术理解</b>：理解大模型原理，对 Prompt、Context、Harness 工程有自己的见解，能参与 Agent 评测设计，能与开发团队共同定义工具描述和评测标准。</li>
    <li><b>跨团队协作</b>：管理学背景，具备跨团队沟通与项目推进经验，擅长资源分配与风险管控。</li>
    <li><b>成本与风险意识</b>：能结合业务场景制定模型选型策略和预算机制，对高风险操作设计多层确认，平衡效果与成本。</li><li><b>数据分析与指标设计：</b>了解基础的 SQL 语句，能使用 AI 辅助完成数据分析工作；能根据业务目标设计数据指标，用过数据持续驱动产品迭代。</li>
  </ul>
`
};
