import React from "react";
import ReactDOM from "react-dom";

import SavedResultsSingle from "./SavedResultsSingle";

class Portal extends React.Component {
  rootSelector = document.getElementById("recipe-info");
  container = document.createElement("div");

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<SavedResultsSingle {...this.props} />, this.container);
  }
}

export default Portal;
