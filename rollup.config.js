import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";
import { version } from "./package.json";

const externals = [];

const uglifyOutput = (config) => {
  return [
    config,
    {
      ...config,
      file: config.file.replace(".js", ".min.js"),
      plugins: [
        uglify({
          output: {
            comments(node, comment) {
              if (comment.type === "comment2") {
                return /svg-arc-center-endpoint version /i.test(comment.value);
              }
              return false;
            },
          },
        }),
      ],
    },
  ];
};

const configs = [
  {
    input: "src/index.ts",
    output: uglifyOutput({
      banner: `/* svg-arc-center-endpoint version ${version} */`,
      file: "dist/index.js",
      format: "umd",
      name: "svgArcCenterEndpoint",
      globals: {},
    }),
    plugins: [typescript()],
  },
];

const rollupConfig = configs.map((c) => ({
  plugins: [typescript()],
  external: (id) => {
    for (const external of externals) {
      if (external.test(id)) {
        return true;
      }
    }
    return false;
  },
  ...c,
}));

export default rollupConfig;
