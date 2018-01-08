const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = (config, env) => {
  config = injectBabelPlugin(["import", { libraryName: "antd", style: true }], config);
  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@font-family": "Futura",
      "@body-background": "#6c4c4c",
      "@btn-primary-color": "#FFF",
      "@btn-primary-bg": "#2e0f10",
      "@layout-header-background": "#5d3c3d",
      "@layout-body-background": "#bdb6b6"
    }
  })(config, env);

  return config;
};
