export default {
  // ...
  build: {
    rollupOptions: {
      output: {
        mimeTypes: {
          ts: "application/javascript",
        },
      },
    },
  },
};
