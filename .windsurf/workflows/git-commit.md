---
description: Git 提交规范 - 如何编写标准的 commit message 并推送代码
---

## Git 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**：提交类型（必填）
- **scope**：影响范围（选填），如模块名、文件名
- **subject**：简短描述（必填），不超过 50 个字符，结尾不加句号
- **body**：详细描述（选填），说明改动原因和内容
- **footer**：关闭 Issue 等补充信息（选填），如 `Closes #123`

---

### type 类型说明

| type       | 说明                         |
|------------|------------------------------|
| `feat`     | 新增功能                     |
| `fix`      | 修复 Bug                     |
| `docs`     | 仅修改文档                   |
| `style`    | 代码格式调整（不影响逻辑）   |
| `refactor` | 代码重构（非新增也非修复）   |
| `perf`     | 性能优化                     |
| `test`     | 添加或修改测试               |
| `chore`    | 构建流程、依赖管理等杂项     |
| `revert`   | 回退某次提交                 |

---

### 示例

```bash
# 新增功能
git commit -m "feat(login): 添加用户登录页面"

# 修复 Bug
git commit -m "fix(button): 修复点击按钮无响应的问题"

# 文档更新
git commit -m "docs: 更新 README 安装说明"

# 带 body 的完整提交
git commit -m "feat(user): 新增用户头像上传功能

支持 jpg/png 格式，大小限制 2MB，上传后自动裁剪为圆形。

Closes #42"
```

---

### 标准提交流程

1. 查看当前改动状态
```bash
git status
```

2. 添加文件到暂存区
```bash
git add .          # 添加全部改动
git add <文件路径>  # 添加指定文件
```

3. 提交代码
```bash
git commit -m "<type>(<scope>): <subject>"
```

4. 推送到远程
```bash
git push           # 已绑定远程分支时直接推送
git push -u origin main  # 首次推送绑定分支
```

---

### 注意事项

- subject 使用中文或英文均可，保持团队统一
- 每次提交只做一件事，避免把多个无关改动混在一个 commit 里
- 不要提交 `node_modules/`、`.env` 等敏感或无用文件（已在 `.gitignore` 中排除）
