const path = require("path");

module.exports = {
  alias: {
    "react-window-paginated": path.resolve(__dirname, "../src")
  },
  extensions: [".js", ".jsx", ".json"],
  modules: [path.join(__dirname, "./"), "node_modules"]
};
