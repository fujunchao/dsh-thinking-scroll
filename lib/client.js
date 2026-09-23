window.__ModuleLoader__.load({
  id: "dsh-thinking-scroll",
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    const SETTINGS_NAMESPACE = "thinking-scroll";
    const LOCALE_NAMESPACE = "thinking-scroll.settings";
    const STYLE_CSS_ID = "dsh-thinking-scroll/client";
    const MAX_HEIGHT_VARIABLE = "--dts-max-height";
    const FOLLOW_BOTTOM_THRESHOLD_PX = 25;

    const DEFAULTS = { maxHeightVh: 40, autoFollow: true };

    const zh = {
      title: "思考块滚动窗口",
      description: "展开的思考正文限制高度并可滚动，流式输出时自动跟随最新内容。",
      expand: "展开设置",
      collapse: "收起设置",
      loading: "正在读取配置…",
      unavailable: "当前部署没有提供此配置命名空间。",
      maxHeight: "展开限高",
      maxHeightHint: "展开后的思考正文最高占用的视口高度（20–80vh）。",
      autoFollow: "流式时自动跟随",
      autoFollowHint: "思考仍在生成且已展开时自动滚到最新内容；手动上滚会暂停，滚回底部恢复。",
      overridden: "已覆盖",
      save: "保存",
      saving: "保存中…",
      discard: "放弃修改",
      saved: "设置已保存。",
      saveFailed: "保存失败，请检查配置或服务日志。",
    };

    const en = {
      title: "Thinking scroll window",
      description: "Expanded reasoning text is capped and scrollable, following the stream live.",
      expand: "Expand settings",
      collapse: "Collapse settings",
      loading: "Loading settings…",
      unavailable: "This deployment does not expose the settings namespace.",
      maxHeight: "Expanded height cap",
      maxHeightHint: "Maximum viewport height for expanded reasoning text (20–80vh).",
      autoFollow: "Follow while streaming",
      autoFollowHint: "Keep the latest reasoning visible while it streams; scrolling up pauses, returning to the bottom resumes.",
      overridden: "Overridden",
      save: "Save",
      saving: "Saving…",
      discard: "Discard changes",
      saved: "Settings saved.",
      saveFailed: "Save failed. Check the configuration or service logs.",
    };

    const styles = `
[data-variant="think"][data-expanded] > div > div:last-child,
[data-variant="think"][data-expanded] [class$="_thinkBody"] {
  max-height: var(--dts-max-height, 40vh);
  overflow-y: auto;
}
.dts-card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}
.dts-card:hover,.dts-card[data-open=true]{border-color:var(--dsw-alias-label-dimmed)}
.dts-card[data-open=true]{background:var(--dsw-alias-bg-layer-2)}
.dts-header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:transparent;border:0;border-radius:12px;display:flex;align-items:center;gap:12px;padding:14px 16px}
.dts-header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dts-head-text{display:flex;min-width:0;flex:1;flex-direction:column;gap:4px}
.dts-name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}
.dts-description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}
.dts-chevron{color:var(--dsw-alias-label-tertiary);font-size:16px;transition:transform .16s}
.dts-card[data-open=true] .dts-chevron{transform:rotate(180deg)}
.dts-body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding:4px 0 8px}
.dts-status{color:var(--dsw-alias-label-tertiary);margin:12px 0;font-size:12px;line-height:1.5}
.dts-field{display:flex;flex-direction:column;gap:6px;padding:12px 0}
.dts-field+.dts-field{border-top:1px solid var(--dsw-alias-border-l2)}
.dts-field-head{display:flex;align-items:center;gap:8px}
.dts-label{min-width:0;flex:1;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:1.5}
.dts-badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px}
.dts-hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}
.dts-range-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center}
.dts-range{width:100%;accent-color:var(--dsw-alias-brand-primary)}
.dts-value{white-space:nowrap;color:var(--dsw-alias-label-secondary);font-size:13px;font-variant-numeric:tabular-nums}
.dts-check{display:flex;align-items:center;gap:9px;color:var(--dsw-alias-label-primary);font-size:13px}
.dts-check input{width:16px;height:16px}
.dts-footer{border-top:1px solid var(--dsw-alias-border-l2);display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:12px 0 4px}
.dts-message{min-width:0;flex:1;margin:0;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary)}
.dts-message[data-error=true]{color:var(--dsw-alias-label-error)}
.dts-button{appearance:none;font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);padding:5px 14px;font-size:13px;line-height:1.5}
.dts-button-primary{border-color:transparent;background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}
.dts-button:disabled{opacity:.4;cursor:default}
`;

    function installStyles() {
      if (typeof document === "undefined") return;
      if (document.querySelector(`style[data-plugin-css=${JSON.stringify(STYLE_CSS_ID)}]`) !== null) return;
      const tag = document.createElement("style");
      tag.dataset.plugin = "dsh-thinking-scroll";
      tag.dataset.pluginCss = STYLE_CSS_ID;
      tag.textContent = styles;
      document.head.appendChild(tag);
    }

    function normalizeConfig(value) {
      const source = value !== null && typeof value === "object" ? value : {};
      const height = Number(source.maxHeightVh);
      return {
        maxHeightVh: Number.isFinite(height)
          ? Math.min(80, Math.max(20, Math.round(height)))
          : DEFAULTS.maxHeightVh,
        autoFollow: source.autoFollow === undefined ? DEFAULTS.autoFollow : source.autoFollow === true,
      };
    }

    let currentConfig = normalizeConfig(null);

    function applyConfigToDom() {
      if (typeof document === "undefined") return;
      document.documentElement.style.setProperty(MAX_HEIGHT_VARIABLE, `${currentConfig.maxHeightVh}vh`);
    }

    // The reasoning body is the last child div inside the DisclosureRow shell:
    // root[data-variant="think"][data-expanded] > shell > (header row, body).
    // The [class$="_thinkBody"] fallback covers a future shell whose semantic
    // class suffix survives the build hash prefix.
    function bodyElementOf(block) {
      const structural = block.querySelector(":scope > div > div:last-child");
      if (structural !== null) return structural;
      return block.querySelector('[class$="_thinkBody"]');
    }

    function isNearBottom(el) {
      return el.scrollHeight - el.scrollTop - el.clientHeight <= FOLLOW_BOTTOM_THRESHOLD_PX;
    }

    // The shipped UI pins only the outer conversation scroller to the bottom;
    // once the body is height-capped, streaming text accumulates out of view.
    // Each expanded body gets a stickiness state machine: content mutations pin
    // it to the bottom while "following"; a user scroll event that leaves the
    // bottom clears the flag, scrolling back to the bottom restores it. A
    // geometric near-bottom check alone cannot distinguish "user scrolled up"
    // from "a large streamed chunk pushed the bottom away", which would stop
    // the follow permanently after one burst.
    function startFollowWatcher() {
      if (typeof document === "undefined" || typeof MutationObserver === "undefined") {
        return () => {};
      }

      const watchers = new Map();
      const PIN_EVENT_GUARD_MS = 80;

      const watchBody = (body, running) => {
        if (watchers.has(body)) return;
        const state = { following: running === true, lastPinAt: 0 };
        const onScroll = () => {
          if (Date.now() - state.lastPinAt < PIN_EVENT_GUARD_MS) return;
          state.following = isNearBottom(body);
        };
        const pin = () => {
          state.lastPinAt = Date.now();
          body.scrollTop = body.scrollHeight;
        };
        const observer = new MutationObserver(() => {
          if (body.isConnected !== true || currentConfig.autoFollow !== true) return;
          if (!state.following) return;
          pin();
        });
        body.addEventListener("scroll", onScroll, { passive: true });
        observer.observe(body, { childList: true, characterData: true, subtree: true });
        watchers.set(body, { observer, onScroll });
        if (state.following) pin();
      };

      const rescan = () => {
        for (const block of document.querySelectorAll('[data-variant="think"][data-expanded]')) {
          const body = bodyElementOf(block);
          if (body !== null) watchBody(body, block.dataset.state === "running");
        }
        for (const [body, { observer, onScroll }] of watchers) {
          if (body.isConnected !== true) {
            observer.disconnect();
            body.removeEventListener("scroll", onScroll);
            watchers.delete(body);
          }
        }
      };

      const documentObserver = new MutationObserver(rescan);
      documentObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-expanded", "data-state"],
      });
      rescan();

      return () => {
        documentObserver.disconnect();
        for (const [body, { observer, onScroll }] of watchers) {
          observer.disconnect();
          body.removeEventListener("scroll", onScroll);
        }
        watchers.clear();
      };
    }

    function useScopeSnapshot(scope) {
      return React.useSyncExternalStore(
        (listener) => scope.subscribe(listener),
        () => scope.getSnapshot(),
        () => scope.getSnapshot(),
      );
    }

    function userOverrides(snapshot, key) {
      return snapshot.user !== null
        && typeof snapshot.user === "object"
        && Object.hasOwn(snapshot.user, key);
    }

    function ThinkingScrollSettingsCard({ scope, t }) {
      const snapshot = useScopeSnapshot(scope);
      const [open, setOpen] = React.useState(false);
      const [draft, setDraft] = React.useState(() => normalizeConfig(scope.getSnapshot().value));
      const [touched, setTouched] = React.useState(false);
      const [saving, setSaving] = React.useState(false);
      const [message, setMessage] = React.useState("");
      const [failed, setFailed] = React.useState(false);

      const edit = (key, value) => {
        setDraft((current) => ({ ...current, [key]: value }));
        setTouched(true);
        setMessage("");
        setFailed(false);
      };

      React.useEffect(() => {
        if (snapshot.status !== "ready" || touched) return;
        setDraft(normalizeConfig(snapshot.value));
      }, [snapshot.status, snapshot.revision, touched]);

      const baseline = normalizeConfig(snapshot.value);
      const ready = snapshot.status === "ready";
      const dirty = ready
        && (draft.maxHeightVh !== baseline.maxHeightVh || draft.autoFollow !== baseline.autoFollow);

      const discard = () => {
        setDraft(normalizeConfig(scope.getSnapshot().value));
        setTouched(false);
        setMessage("");
        setFailed(false);
      };

      const save = async () => {
        if (saving || !dirty || !ready) return;
        setSaving(true);
        setMessage("");
        setFailed(false);
        try {
          if (draft.maxHeightVh !== baseline.maxHeightVh) await scope.set("maxHeightVh", draft.maxHeightVh);
          if (draft.autoFollow !== baseline.autoFollow) await scope.set("autoFollow", draft.autoFollow);
          const accepted = normalizeConfig(scope.getSnapshot().value);
          if (accepted.maxHeightVh !== draft.maxHeightVh || accepted.autoFollow !== draft.autoFollow) {
            throw new Error("settings write was rejected");
          }
          setDraft(accepted);
          setTouched(false);
          setMessage(t("saved"));
        } catch {
          setMessage(t("saveFailed"));
          setFailed(true);
        } finally {
          setSaving(false);
        }
      };

      let body;
      if (snapshot.status === "loading") {
        body = React.createElement("p", { className: "dts-status" }, t("loading"));
      } else if (!ready) {
        body = React.createElement("p", { className: "dts-status" }, t("unavailable"));
      } else {
        body = React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "dts-field" },
            React.createElement(
              "div",
              { className: "dts-field-head" },
              React.createElement("span", { className: "dts-label" }, t("maxHeight")),
              userOverrides(snapshot, "maxHeightVh")
                ? React.createElement("span", { className: "dts-badge" }, t("overridden"))
                : null,
            ),
            React.createElement(
              "div",
              { className: "dts-range-row" },
              React.createElement("input", {
                className: "dts-range",
                type: "range",
                min: 20,
                max: 80,
                step: 1,
                value: draft.maxHeightVh,
                disabled: saving,
                onChange: (event) => edit("maxHeightVh", Number(event.target.value)),
              }),
              React.createElement("span", { className: "dts-value" }, `${draft.maxHeightVh} vh`),
            ),
            React.createElement("p", { className: "dts-hint" }, t("maxHeightHint")),
          ),
          React.createElement(
            "div",
            { className: "dts-field" },
            React.createElement(
              "div",
              { className: "dts-field-head" },
              React.createElement("span", { className: "dts-label" }, t("autoFollow")),
              userOverrides(snapshot, "autoFollow")
                ? React.createElement("span", { className: "dts-badge" }, t("overridden"))
                : null,
            ),
            React.createElement(
              "label",
              { className: "dts-check" },
              React.createElement("input", {
                type: "checkbox",
                checked: draft.autoFollow === true,
                disabled: saving,
                onChange: (event) => edit("autoFollow", event.target.checked),
              }),
              t("autoFollow"),
            ),
            React.createElement("p", { className: "dts-hint" }, t("autoFollowHint")),
          ),
          React.createElement(
            "div",
            { className: "dts-footer" },
            React.createElement(
              "p",
              { className: "dts-message", "data-error": failed },
              message,
            ),
            React.createElement("button", {
              type: "button",
              className: "dts-button",
              disabled: saving || !dirty,
              onClick: discard,
            }, t("discard")),
            React.createElement("button", {
              type: "button",
              className: "dts-button dts-button-primary",
              disabled: saving || !dirty,
              onClick: save,
            }, t(saving ? "saving" : "save")),
          ),
        );
      }

      const title = t("title");
      return React.createElement(
        "li",
        { className: "dts-card", "data-open": open },
        React.createElement(
          "button",
          {
            type: "button",
            className: "dts-header",
            "aria-expanded": open,
            "aria-label": `${t(open ? "collapse" : "expand")}: ${title}`,
            onClick: () => setOpen((current) => !current),
          },
          React.createElement(
            "span",
            { className: "dts-head-text" },
            React.createElement("span", { className: "dts-name" }, title),
            React.createElement("span", { className: "dts-description" }, t("description")),
          ),
          dirty ? React.createElement("span", { className: "dts-badge" }, "●") : null,
          React.createElement("span", { className: "dts-chevron", "aria-hidden": true }, "⌄"),
        ),
        open ? React.createElement("div", { className: "dts-body" }, body) : null,
      );
    }

    const inject = ["slots", "locale", "settingsScope"];

    function syncFromScope(scope) {
      const snapshot = scope.getSnapshot();
      if (snapshot === null || typeof snapshot !== "object" || snapshot.status !== "ready") return;
      currentConfig = normalizeConfig({ ...currentConfig, ...snapshot.value });
      applyConfigToDom();
    }

    function apply(ctx, config) {
      currentConfig = normalizeConfig({ ...DEFAULTS, ...(config ?? {}) });
      installStyles();
      applyConfigToDom();
      const t = ctx.locale.bind(LOCALE_NAMESPACE);
      ctx.effect(() => ctx.locale.register(LOCALE_NAMESPACE, { zh, en }), "thinking-scroll: settings locale");
      const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
      ctx.effect(() => scope.subscribe(() => syncFromScope(scope)), "thinking-scroll: settings sync");
      syncFromScope(scope);
      ctx.effect(() => startFollowWatcher(), "thinking-scroll: follow watcher");
      ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
        name: "settings.plugin.item",
        key: SETTINGS_NAMESPACE,
        locale: LOCALE_NAMESPACE,
        inject: () => ({ scope, t }),
      }, ThinkingScrollSettingsCard));
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
