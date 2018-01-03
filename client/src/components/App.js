import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import Landing from "./Landing";

class App extends Component {
  componentDidMount() {}

  render() {
    const Wrapper = styled.div`
      font-family: "Cassanet";
      height: 100%;
    `;

    return (
      <div>
        <BrowserRouter>
          <Wrapper>
            <Route exact path="/" component={Landing} />
          </Wrapper>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {})(App);
