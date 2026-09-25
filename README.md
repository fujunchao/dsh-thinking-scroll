# dsh-thinking-scroll

DeepSeek Harness (dsh) web 插件：主聊天流的"思考"块展开后正文限高（默认 40vh）并可滚动，标题行（折叠按钮）始终留在滚动容器外；流式输出中展开时正文自动钉底跟随，手动上滚即暂停、滚回底部恢复。

## 配置

设置 → 插件 → "思考块滚动窗口" 卡片可调：

- **展开限高** `maxHeightVh`：20–80（视口百分比），默认 40。
- **流式时自动跟随** `autoFollow`：默认开启。

也可在 profile 的 `cordis.patch.yml` insert 条目里写默认值：

```yaml
- insert:
    - id: thinking-scroll
      name: 'dsh-thinking-scroll'
      config:
        maxHeightVh: 40
        autoFollow: true
```

## 原理

- 纯浏览器侧改造：CSS 限高命中契约属性 `[data-variant="think"][data-expanded]`（结构选择器 + `[class$="_thinkBody"]` 兜底），不改 React 行为。
- 自动跟随：对每个已展开思考正文挂 MutationObserver（characterData/subtree），在用户处于底部 25px 内时 `scrollTop = scrollHeight`。
- 宿主半边仅在 settings 服务可用时注册命名空间（回调式注入，缺失时静默跳过）。

## 版本要求

- v0.2.0 起需要 DSH `0.1.7-rc.2`+（settings 系统改用 volatile Config + `configForms`/`plugins.item`）。
- v0.1.x 适配 DSH `0.1.5-rc.x` 的 `settingsScope`/`settings.plugin.item` 接线。

## 安装（link: 本地开发）

```bash
dsh plugin --profile web add link:/home/jueshi/dsh-plugins/dsh-thinking-scroll
# 然后在 ~/.dsh/profiles/web/cordis.patch.yml 加 insert 条目（见上）
systemctl --user restart dsh-web
```

改 `lib/client.js` 后由 client-hmr 自动热更新，无需重启。
