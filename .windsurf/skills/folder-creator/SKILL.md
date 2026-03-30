---
name: folder-creator
description: 帮助用户创建项目文件夹结构，支持常见的 React、Node.js、前端工程等目录模板，也可按自定义需求生成任意目录树。
---

# Folder Creator Skill

## 功能说明

本 Skill 帮助你快速创建项目目录结构。支持以下两种模式：

1. **模板模式**：使用预设模板一键生成（见 [templates.md](./templates.md)）
2. **自定义模式**：根据你描述的需求，生成任意目录结构

## 使用方式

直接告诉我你想创建什么项目，例如：
- "帮我创建一个 React + TypeScript 项目结构"
- "创建一个 Node.js API 项目的目录"
- "我想要 stage2/day01 这样的学习目录"

## 创建目录的命令

在 Windows PowerShell 中使用以下命令创建目录和文件：

```powershell
# 创建单个目录
New-Item -ItemType Directory -Path "路径\目录名"

# 递归创建多级目录
New-Item -ItemType Directory -Force -Path "路径\a\b\c"

# 创建空文件
New-Item -ItemType File -Path "路径\文件名.txt"

# 批量创建（示例）
@("src", "src\components", "src\pages", "public") | ForEach-Object {
    New-Item -ItemType Directory -Force -Path $_
}
```

## 注意事项

- 创建前请确认路径是否正确
- 如需在已有项目中添加目录，避免覆盖现有文件
- 详细模板请查看 [templates.md](./templates.md)
- 想了解如何编写自己的 Skill，请查看 [how-to-use-skills.md](./how-to-use-skills.md)
