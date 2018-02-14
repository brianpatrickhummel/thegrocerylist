import React, { Component } from "react";
import { connect } from "react-redux";
import UserAccounts from "./UserAccounts";

class Preferences extends Component {
  render() {
    return <UserAccounts />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Preferences);
