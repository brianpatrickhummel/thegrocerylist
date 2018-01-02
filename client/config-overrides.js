const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = (config, env) => {
  config = injectBabelPlugin(["import", { libraryName: "antd", style: true }], config);
  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@body-background": "#6c4c4c" }
  })(config, env);

  return config;
};
