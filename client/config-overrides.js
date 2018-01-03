const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = (config, env) => {
  config = injectBabelPlugin(["import", { libraryName: "antd", style: true }], config);
  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@body-background": "#6c4c4c",
      "@btn-primary-color": "#2e0f10",
      "@btn-primary-bg ": " @btn-primary-color"
    }
  })(config, env);

  return config;
};
