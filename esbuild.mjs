import * as esbuild from "esbuild";

import fs from "fs";

const jsdomPatch = {
  name: "jsdom-patch",
  setup(build) {
    build.onLoad(
      { filter: /jsdom\/living\/xhr\/XMLHttpRequest-impl\.js$/ },
      async (args) => {
        let contents = await fs.promises.readFile(args.path, "utf8");

        contents = contents.replace(
          'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
          `const syncWorkerFile = null;`
        );

        return { contents, loader: "js" };
      }
    );
  },
};

await esbuild.build({
  entryPoints: ["index.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/index.cjs",
  plugins: [jsdomPatch],
});
