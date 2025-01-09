export default {
  e2e: {
    setupNodeEvents(on: any, config: any) {
      on("task", {
        logToCloud(message: any) {
          console.log(message);
          return null;
        },
      });
    },
  },
  projectId: "2shdx5",
};
