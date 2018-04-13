import React from "react";
import ReactDOM from "react-dom";

import SearchResultsSingle from "./SearchResultsSingle";

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.rootSelector = document.getElementById("recipe-info");
    this.container = document.createElement("div");
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<SearchResultsSingle {...this.props} />, this.container);
  }
}

export default Portal;
