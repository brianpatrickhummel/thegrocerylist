import React, { Component } from "react";
import { connect } from "react-redux";
import PrimaryAccounts from "./PrimaryAccounts";

class Preferences extends Component {
  render() {
    return <PrimaryAccounts />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Preferences);
