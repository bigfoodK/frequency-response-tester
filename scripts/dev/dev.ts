import { build } from "esbuild";
import { buildOption } from "../buildOption";
import DevServer from "./DevServer";

const port = 1234;

const devServer = new DevServer({
  root: buildOption.outdir || ".",
});

build({
  ...buildOption,
  watch: {
    onRebuild: () => devServer.emitHotReload(),
  },
  minify: false,
  sourcemap: true,
});

devServer
  .start(port)
  .then(() =>
    console.log(
      `[${new Date().toLocaleTimeString()}] 🚀 server running on http://0.0.0.0:${port}`
    )
  );
