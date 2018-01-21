import React, { Component } from "react";
// import styled from "styled-components";
import { Layout } from "antd";
import "./index.css";
const { Header } = Layout;

class HeaderBar extends Component {
  render() {
    return (
      <Header>
        <h1>Header Component</h1>
      </Header>
    );
  }
}

export default HeaderBar;
