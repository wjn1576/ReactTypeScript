# 如何编写和使用 Agent Skills

## 什么是 Agent Skill？

Agent Skill 是 Anthropic 提出的一种**给 AI Agent 装载专业能力**的标准方式。
本质是一个文件夹，里面放着指令、脚本和资源，Agent 按需动态加载。

---

## Skill 的最小结构

```
my-skill/
└── SKILL.md        # 必须有，且必须有 YAML frontmatter
```

`SKILL.md` 的格式：

```markdown
---
name: my-skill
description: 简短描述这个 Skill 能做什么（Agent 靠这个判断何时触发）
---

## 正文
在这里写详细的指令、步骤、注意事项...
```

---

## 三层渐进式加载

| 层级 | 内容 | 何时加载 |
|------|------|----------|
| 第 1 层 | `name` + `description` | 始终在 system prompt 里 |
| 第 2 层 | `SKILL.md` 正文 | Agent 判断任务匹配时读入 |
| 第 3 层 | 附加文件（如 `templates.md`） | 需要时按需加载 |

这样设计可以**节省 context window**，技能内容理论上无上限。

---

## 复杂 Skill 的目录结构

```
my-skill/
├── SKILL.md              # 核心：name/description/主指令
├── reference.md          # 参考文档（按需加载）
├── advanced.md           # 高级用法（按需加载）
└── scripts/
    └── helper.py         # 可执行脚本（Agent 可直接运行）
```

在 `SKILL.md` 中引用附加文件：

```markdown
详细模板请查看 [reference.md](./reference.md)
高级用法请查看 [advanced.md](./advanced.md)
```

---

## 编写好 Skill 的建议

1. **description 要精准**：Agent 靠 description 判断是否触发，写清楚"什么场景下用"
2. **SKILL.md 保持精简**：主文件只放核心指令，细节放附加文件
3. **互斥内容分开放**：不会同时用到的内容放在不同文件，减少 token 消耗
4. **可附带可执行脚本**：把固定流程写成脚本，比 Agent 自己生成更可靠
5. **从实际使用中迭代**：让 Agent 使用 Skill 完成任务后，把成功经验补充进 Skill

---

## 本项目 Skills 存放位置

```
.windsurf/skills/
└── folder-creator/       # 当前这个 Skill
    ├── SKILL.md
    ├── templates.md
    └── how-to-use-skills.md
```

---

## 参考资源

- [Anthropic 官方博客](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)
- [Agent Skills 开放标准](https://agentskills.io)
- [官方示例 Skills（GitHub）](https://github.com/anthropics/skills)
