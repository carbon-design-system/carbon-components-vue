module.exports = {
  configureWebpack: config => {
    config.resolve.extensions.push(".js", ".vue", ".json", ".jsonl");

    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  }
};
