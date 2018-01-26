import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

class Dashboard extends Component {
  state = {
    modalIsOpen: false,
    count: 0
  };

  componentDidMount() {
    // Display welcome modal when user first logs in
    if (!this.state.modalIsOpen && this.state.count === 0) {
      this.setState({ modalIsOpen: true, count: 1 });
    }
  }

  componentDidUpdate() {
    if (this.props.auth && this.state.modalIsOpen) {
      this.success();
    }
  }

  renderModal() {}

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
        <h1>Dashboard</h1>
        <p>Instructions</p>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
