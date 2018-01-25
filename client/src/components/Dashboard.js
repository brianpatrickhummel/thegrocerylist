import React, { Component } from "react";
import { message } from "antd";
// import styled from "styled-components";

class Dashboard extends Component {
  renderModal() {
    if (this.props.modalIsOpen) {
      this.success();
    }
  }

  success() {
    message.config({ top: "35%" });
    const hide = message.loading(
      `WELCOME BACK, 
      ${this.props.auth.username.toUpperCase()}`
    );
    // Dismiss manually and asynchronously
    setTimeout(hide, 1000);
  }

  render() {
    return (
      <div className="dashboardContainer">
        {this.renderModal()}
        <h1>Dashboard</h1>
        <p>Instructions</p>
      </div>
    );
  }
}

export default Dashboard;
