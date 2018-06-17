// Ant Designs Configuration Overrides
// customize build without ejecting create-react-app

const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(["import", { libraryName: "antd", style: true }], config);
  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@font-family": "Futura",
      "@body-background": "rgba(105,67,69,1)",
      "@btn-primary-color": "#FFF",
      "@btn-primary-bg": "rgba(105,67,69,0.85)",
      "@layout-header-background": "rgba(105,67,69,1)",
      "@layout-body-background": "#bdb6b6",
      "@tooltip-bg": "rgba(109, 81, 81, 0.65)",
      "@tooltip-color": "white",
      "@menu-collapsed-width": "50px"
    }
  })(config, env);

  return config;
};
