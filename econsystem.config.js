module.exports = {
    apps: [
      {
        name: "blog-end",
        script: "./src/main.ts",
        interpreter: "./node_modules/.bin/ts-node",
        exec_mode: "cluster",
      },
    ],
  };
