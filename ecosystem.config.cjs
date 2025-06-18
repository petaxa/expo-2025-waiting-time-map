module.exports = {
  apps: [
    {
      name: "expo-waiting-map",
      port: "3002",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
