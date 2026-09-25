import z from "@deepseek-ai/schemastery";

const name = "thinking-scroll";

const SETTINGS_NAMESPACE = "thinking-scroll";

const Config = z.object({
  maxHeightVh: z.number().step(1).min(20).max(80).default(40).volatile(),
  autoFollow: z.boolean().default(true).volatile(),
});

// DSH 0.1.7 起设置表单由框架按 entry 的 volatile Config 自动生成，
// 宿主半边不再需要注册；插件行为全部在浏览器半边完成。
function apply(ctx) {
  void ctx;
}

export { Config, SETTINGS_NAMESPACE, apply, name };
