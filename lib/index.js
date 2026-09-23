import z from "@deepseek-ai/schemastery";

const name = "thinking-scroll";

const SETTINGS_NAMESPACE = "thinking-scroll";

const Config = z.object({
  maxHeightVh: z.number().step(1).min(20).max(80).default(40),
  autoFollow: z.boolean().default(true),
});

function apply(ctx, config) {
  ctx.inject(["settings"], (settingsCtx) => {
    settingsCtx.settings.installSection(ctx, SETTINGS_NAMESPACE, Config, config ?? {}, {
      setSource: () => {},
      onChange: () => {},
    });
  });
}

export { Config, SETTINGS_NAMESPACE, apply, name };
